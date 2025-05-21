---
title: 菜单
order: 0
toc: content
group:
  title: 用户界面
  order: 9993
---
# 菜单

菜单是一种用于图形用户界面（GUI）后台的类型；它们处理与某些表示数据持有者进行交互的逻辑。菜单本身不是数据持有者。它们是视图，允许用户间接地修改内部数据持有者的状态。因此，数据持有者不应直接与任何菜单耦合，而应传递数据引用以调用和修改。

## `MenuType`

菜单可以动态创建和移除，因此不是注册对象。为此，将另一个工厂对象注册，用于轻松创建和引用菜单的*类型*。对于菜单，这种类型就是`MenuType`。

`MenuType`必须[注册]。

### `MenuSupplier`

通过在构造函数中传入`MenuSupplier`和`FeatureFlagSet`来创建一个`MenuType`。`MenuSupplier`代表一个函数，该函数接收容器的id和查看菜单的玩家库存，并返回一个新创建的[`AbstractContainerMenu`][acm]。

```java
// 对于某个 DeferredRegister<MenuType<?>> REGISTER
public static final RegistryObject<MenuType<MyMenu>> MY_MENU = REGISTER.register("my_menu", () -> new MenuType(MyMenu::new, FeatureFlags.DEFAULT_FLAGS));

// 在MyMenu中，一个AbstractContainerMenu子类
public MyMenu(int containerId, Inventory playerInv) {
  super(MY_MENU.get(), containerId);
  // ...
}
```

!!! 注意
    容器标识符对于每个玩家是唯一的。这意味着即使两个不同的玩家正在查看相同的数据持有者，其上相同的容器id也会代表两个不同的菜单。

`MenuSupplier`通常负责在客户端上创建菜单，并使用虚拟数据引用来存储和与来自服务器数据持有者的同步信息交互。

### `IContainerFactory`

如果客户端需要额外的信息（例如，数据持有者在世界中的位置），则可以使用`IContainerFactory`子类。除了容器id和玩家库存之外，这还提供了一个`FriendlyByteBuf`，可以存储从服务器发送的额外信息。通过`IForgeMenuType#create`可以使用`IContainerFactory`创建一个`MenuType`。

```java
// 对于某个 DeferredRegister<MenuType<?>> REGISTER
public static final RegistryObject<MenuType<MyMenuExtra>> MY_MENU_EXTRA = REGISTER.register("my_menu_extra", () -> IForgeMenuType.create(MyMenu::new));

// 在MyMenuExtra中，一个AbstractContainerMenu子类
public MyMenuExtra(int containerId, Inventory playerInv, FriendlyByteBuf extraData) {
  super(MY_MENU_EXTRA.get(), containerId);
  // 从缓冲区存储额外数据
  // ...
}
```

## `AbstractContainerMenu`

所有菜单都是从`AbstractContainerMenu`扩展的。菜单接受两个参数，[`MenuType`][mt]，代表菜单自身的类型，以及容器id，代表当前访问者的菜单的唯一标识符。

!!! 重要
    玩家一次最多只能打开100个独特的菜单。

每个菜单应包含两个构造函数：一个用于在服务器上初始化菜单，一个用于在客户端上初始化菜单。用于在客户端上初始化菜单的构造函数是提供给`MenuType`的一个。服务器菜单构造函数包含的任何字段，在客户端菜单构造函数中应有一些默认值。

```java
// 客户端菜单构造函数
public MyMenu(int containerId, Inventory playerInventory) {
  this(containerId, playerInventory);
}

// 服务器菜单构造函数
public MyMenu(int containerId, Inventory playerInventory) {
  // ...
}
```

每个菜单实现必须实现两个方法：`#stillValid`和[`#quickMoveStack`][qms]。

### `#stillValid`和`ContainerLevelAccess`

`#stillValid`确定给定玩家的菜单是否应保持打开状态。这通常指向静态的`#stillValid`，该方法接收`ContainerLevelAccess`、玩家及此菜单附着的`Block`。对于此方法，客户端菜单必须始终返回`true`，这是默认情况下会执行的。此实现检查玩家是否在数据存储对象所在的八个方块内。

`ContainerLevelAccess`在封闭范围内提供块的当前位置和位置。在服务器上构建菜单时，可以通过调用`ContainerLevelAccess#create`创建一个新的访问。客户端菜单构造函数可以传递`ContainerLevelAccess#NULL`，这将不起作用。

```java
// 客户端菜单构造函数
public MyMenuAccess(int containerId, Inventory playerInventory) {
  this(containerId, playerInventory, ContainerLevelAccess.NULL);
}

// 服务器菜单构造函数
public MyMenuAccess(int containerId, Inventory playerInventory, ContainerLevelAccess access) {
  // ...
}

// 假设此菜单附加到 RegistryObject<Block> MY_BLOCK
@Override
public boolean stillValid(Player player) {
  return AbstractContainerMenu.stillValid(this.access, player, MY_BLOCK.get());
}
```

### 数据同步

某些数据需要在服务器和客户端上存在以便向玩家显示。为此，实现了一层基本的数据同步层，以便当前数据与最后同步到客户端的数据不匹配时进行同步。对于玩家，这会在每个tick中进行检查。

Minecraft默认支持两种形式的数据同步：通过`Slot`的`ItemStack`和通过`DataSlot`的整数。`Slot`和`DataSlot`是持有数据存储引用的视图，玩家在屏幕上可以假设操作有效的情况下进行修改。它们可以通过`#addSlot`和`#addDataSlot`添加到菜单中。

!!! 注意
    由于`Container`为`Slot`使用的已被Forge弃用，建议使用[`IItemHandler`能力][cap]，其余的解释将围绕能力变体：`SlotItemHandler`进行。

`SlotItemHandler`包含四个参数：`IItemHandler`表示栈所在的库存，栈具体代表的索引以及相对于`AbstractContainerScreen#leftPos`和`#topPos`渲染的槽位置的左上角坐标。客户端菜单构造函数应始终提供大小相同的空库存实例。

在大多数情况下，菜单包含的任何槽位将首先添加，然后是玩家库存，最后是玩家热键区。要从菜单访问任何单个`Slot`，必须根据添加槽位的顺序计算索引。

`DataSlot`是一个抽象类，应该实现一个getter和setter以引用存储在数据存储对象中的数据。客户端菜单构造函数应始终通过`DataSlot#standalone`提供一个新实例。

这些，以及槽位，在每次初始化新菜单时应重新创建。

!!! 警告
    尽管`DataSlot`存储一个整数，但由于它通过网络发送值的方式，实际上限制为一个**短整数**（-32768到32767）。整数的16个高位被忽略。

```java
// 假设我们有一个大小为5的数据对象的库存
// 假设每次初始化服务器菜单时构造了一个 DataSlot

// 客户端菜单构造函数
public MyMenuAccess(int containerId, Inventory playerInventory) {
  this(containerId, playerInventory, new ItemStackHandler(5), DataSlot.standalone());
}

// 服务器菜单构造函数
public MyMenuAccess(int containerId, Inventory playerInventory, IItemHandler dataInventory, DataSlot dataSingle) {
  // 检查数据库存大小是否为某个固定值
  // 然后，为数据库存添加槽位
  this.addSlot(new SlotItemHandler(dataInventory, /*...*/));

  // 为玩家库存添加槽位
  this.addSlot(new Slot(playerInventory, /*...*/));

  // 为处理的整数添加数据槽位
  this.addDataSlot(dataSingle);

  // ...
}
```

#### `ContainerData`

如果需要将多个整数同步到客户端，可以使用`ContainerData`来引用这些整数。此接口作为一个索引查找，每个索引用于表示不同的整数。也可以在数据对象本身中构造`ContainerData`，如果`ContainerData`通过`#addDataSlots`添加到菜单。该方法为接口指定的数据量创建一个新的`DataSlot`。客户端菜单构造函数应始终通过`SimpleContainerData`提供一个新实例。

```java
// 假设我们有一个大小为3的ContainerData

// 客户端菜单构造函数
public MyMenuAccess(int containerId, Inventory playerInventory) {
  this(containerId, playerInventory, new SimpleContainerData(3));
}

// 服务器菜单构造函数
public MyMenuAccess(int containerId, Inventory playerInventory, ContainerData dataMultiple) {
  // 检查 ContainerData 大小是否为某个固定值
  checkContainerDataCount(dataMultiple, 3);

  // 为处理的整数添加数据槽位
  this.addDataSlots(dataMultiple);

  // ...
}
```

!!! 警告
    由于`ContainerData`委托给`DataSlot`，这些也限制为一个**短整数**（-32768到32767）。

#### `#quickMoveStack`

`#quickMoveStack`是任何菜单必须实现的第二个方法。每次栈通过shift-点击或快速移动离开其当前槽位时都会调用此方法，直到该栈完全从其先前的槽位移走或没有其他地方可以存放该栈。该方法返回被快速移动的槽位中的栈的副本。

栈通常通过`#moveItemStackTo`在槽位之间移动，该方法将栈移动到第一个可用槽位。它接收要移动的栈、第一个槽位索引（包括）要尝试移动栈到的最后一个槽位索引（不包括），以及是否从第一个检查槽位到最后一个（`false`）或从最后一个到第一个（`true`）检查槽位。

在Minecraft的各个实现中，该方法的逻辑相对一致：

```java
// 假设我们有一个大小为5的数据库存
// 库存有4个输入（索引1 - 4），输出到结果槽（索引0）
// 我们还有27个玩家库存槽和9个热键区槽
// 实际槽位的索引如下：
//   - 数据库存：结果（0），输入（1 - 4）
//   - 玩家库存（5 - 31）
//   - 玩家热键区（32 - 40）
@Override
public ItemStack quickMoveStack(Player player, int quickMovedSlotIndex) {
  // 要快速移动的槽位栈
  ItemStack quickMovedStack = ItemStack.EMPTY;
  // 要快速移动的槽位
  Slot quickMovedSlot = this.slots.get(quickMovedSlotIndex) 
  
   // 如果槽位在有效范围内且槽位不为空
  if (quickMovedSlot != null && quickMovedSlot.hasItem()) {
    // 获取原始要移动的栈
    ItemStack rawStack = quickMovedSlot.getItem(); 
    // 将槽位栈设置为原始栈的副本
    quickMovedStack = rawStack.copy();

    /*
    下面的快速移动逻辑可以简化为如果在数据库存中，
    尝试移动到玩家库存/热键区，反之亦然对于不能转换数据的容器（例如箱子）。
    */

    // 如果在数据库存结果槽执行了快速移动
    if (quickMovedSlotIndex == 0) {
      // 尝试将结果槽位移动到玩家库存/热键区
      if (!this.moveItemStackTo(rawStack, 5, 41, true)) {
        // 如果不能移动，不再快速移动
        return ItemStack.EMPTY;
      }

      // 在结果槽快速移动执行逻辑
      slot.onQuickCraft(rawStack, quickMovedStack);
    }
    // 否则如果在玩家库存或热键区槽执行了快速移动
    else if (quickMovedSlotIndex >= 5 && quickMovedSlotIndex < 41) {
      // 尝试将库存/热键区槽位移动到数据库存输入槽位
      if (!this.moveItemStackTo(rawStack, 1, 5, false)) {
        // 如果不能移动且在玩家库存槽，尝试移动到热键区
        if (quickMovedSlotIndex < 32) {
          if (!this.moveItemStackTo(rawStack, 32, 41, false)) {
            // 如果不能移动，不再快速移动
            return ItemStack.EMPTY;
          }
        }
        // 否则尝试移动热键区到玩家库存槽
        else if (!this.moveItemStackTo(rawStack, 5, 32, false)) {
          // 如果不能移动，不再快速移动
          return ItemStack.EMPTY;
        }
      }
    }
    // 否则如果在数据库存输入槽执行了快速移动，尝试移动到玩家库存/热键区
    else if (!this.moveItemStackTo(rawStack, 5, 41, false)) {
      // 如果不能移动，不再快速移动
      return ItemStack.EMPTY;
    }

    if (rawStack.isEmpty()) {
      // 如果原始栈已完全从槽位移走，将槽位设置为空栈
      quickMovedSlot.set(ItemStack.EMPTY);
    } else {
      // 否则，通知槽位栈数量已更改
      quickMovedSlot.setChanged();
    }

    /*
    下面的if语句和Slot#onTake调用可以移除，
    如果菜单不表示可以转换栈的容器（例如箱子）。
    */
    if (rawStack.getCount() == quickMovedStack.getCount()) {
      // 如果原始栈无法移动到其他槽位，不再快速移动
      return ItemStack.EMPTY;
    }
    // 执行逻辑，关于如何处理剩余栈
    quickMovedSlot.onTake(player, rawStack);
  }

  return quickMovedStack; // 返回槽位栈
}
```

## 打开一个菜单

一旦注册了菜单类型，菜单本身已完成，并附加了一个[屏幕]，玩家就可以打开菜单。在逻辑服务器上调用`ServerPlayer#openMenu`可以打开菜单。该方法接受服务器端菜单的`MenuProvider`，如果需要同步更多数据到客户端，还可以选择`FriendlyByteBuf`。

!!! 注意
    带`FriendlyByteBuf`参数的`ServerPlayer#openMenu`应仅在使用[`IContainerFactory`][icf]创建菜单类型时使用。

#### `MenuProvider`

`MenuProvider`是一个包含两个方法的接口：`#createMenu`，用于创建服务器实例的菜单，以及`#getDisplayName`，用于返回包含菜单标题的组件以传递给[屏幕]。`#createMenu`方法包含三个参数：菜单的容器id、打开菜单的玩家库存和打开菜单的玩家。

`MenuProvider`可以通过`SimpleMenuProvider`轻松创建，后者接收一个用于创建服务器菜单的方法引用和菜单的标题。

```java
// 在一些实现中
serverPlayer.openMenu(new SimpleMenuProvider(
  (containerId, playerInventory, player) -> new MyMenu(containerId, playerInventory),
  Component.translatable("menu.title.examplemod.mymenu")
 ));
```

### 常见实现

菜单通常在某种玩家交互时打开（例如，当一个方块或实体被右键点击时）。

#### 方块实现

方块通常通过覆盖`BlockBehaviour#use`实现菜单。如果在逻辑客户端上，交互返回`InteractionResult#SUCCESS`。否则，打开菜单并返回`InteractionResult#CONSUME`。

`MenuProvider`应通过覆盖`BlockBehaviour#getMenuProvider`实现。原版方法使用它在旁观模式下查看菜单。

```java
// 在某个Block子类中
@Override
public MenuProvider getMenuProvider(BlockState state, Level level, BlockPos pos) {
  return new SimpleMenuProvider(/* ... */);
}

@Override
public InteractionResult use(BlockState state, Level level, BlockPos pos, Player player, InteractionHand hand, BlockHitResult result) {
  if (!level.isClientSide && player instanceof ServerPlayer serverPlayer) {
    serverPlayer.openMenu(state.getMenuProvider(level, pos));
  }
  return InteractionResult.sidedSuccess(level.isClientSide);
}
```

!!! 注意
    这是实现逻辑的最简单方法，而不是唯一方法。如果您希望方块只在某些条件下打开菜单，那么仍需要对这些条件进行一些数据同步到客户端，以返回`InteractionResult#PASS`或`#FAIL`如果条件不满足。

#### 生物实体实现

生物实体通常通过覆盖`Mob#mobInteract`实现菜单。这类似于方块实现方式，唯一的不同是`Mob`本身应实现`MenuProvider`以支持旁观模式查看。

```java
public class MyMob extends Mob implements MenuProvider {
  // ...

  @Override
  public InteractionResult mobInteract(Player player, InteractionHand hand) {
    if (!this.level.isClientSide && player instanceof ServerPlayer serverPlayer) {
      serverPlayer.openMenu(this);
    }
    return InteractionResult.sidedSuccess(this.level.isClientSide);
  }
}
```

!!! 注意
    再次强调，这是实现逻辑的最简单方法，而不是唯一方法。

[registered]: ../concepts/registries.md#methods-for-registering
[acm]: #abstractcontainermenu
[mt]: #menutype
[qms]: #quickmovestack
[cap]: ../datastorage/capabilities.md#forge-provided-capabilities
[screen]: ./screens.md
[icf]: #icontainerfactory