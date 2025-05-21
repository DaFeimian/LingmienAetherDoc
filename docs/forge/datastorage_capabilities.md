---
title: 能力系统
order: 0
toc: content
group:
  title: 数据存储
  order: 9992
---
能力系统
=====================

能力允许以动态和灵活的方式暴露功能，而无需直接实现多个接口。

一般来说，每个能力都通过接口形式提供一个功能。

Forge为BlockEntities、Entities、ItemStacks、Levels和LevelChunks添加了能力支持，可以通过事件附加或在对象的自定义实现中重写能力方法来暴露这些功能。这将在以下章节中更详细地解释。

Forge提供的能力
---------------------------

Forge提供了三个能力：`IItemHandler`、`IFluidHandler`和`IEnergyStorage`。

`IItemHandler`提供了处理库存槽的接口。它可以应用于BlockEntities（如箱子、机器等）、Entities（如玩家额外槽位、怪物/生物的库存/背包）或ItemStacks（如便携背包等）。它用一个支持自动化的系统替换了旧的`Container`和`WorldlyContainer`。

`IFluidHandler`提供了处理流体库存的接口。它同样可以应用于BlockEntities、Entities或ItemStacks。

`IEnergyStorage`提供了处理能量容器的接口。它可以应用于BlockEntities、Entities或ItemStacks。它基于TeamCoFH的RedstoneFlux API。

使用已有的能力
----------------------------

如前所述，BlockEntities、Entities和ItemStacks通过`ICapabilityProvider`接口实现了能力提供者功能。此接口添加了方法`#getCapability`，可用于查询关联提供者对象中存在的能力。

为了获取一个能力，您需要通过其唯一实例来引用它。对于`IItemHandler`，此能力主要存储在`ForgeCapabilities#ITEM_HANDLER`中，但也可以通过使用`CapabilityManager#get`获取其他实例引用。

```java
public static final Capability<IItemHandler> ITEM_HANDLER = CapabilityManager.get(new CapabilityToken<>(){});
```

调用时，`CapabilityManager#get`会提供一个非null的能力给您关联的类型。匿名的`CapabilityToken`允许Forge保持一个软依赖系统，同时仍拥有获取正确能力所需的泛型信息。

!!! 重要
    即使您始终拥有一个非null的能力，这并不意味着该能力本身是可用或已注册的。这可以通过`Capability#isRegistered`进行检查。

`#getCapability`方法有第二个参数，类型为`Direction`，可以用来请求特定面的实例。如果传递了`null`，可以假设请求来自块内部或某些侧面没有意义的地方，如不同的维度。在这种情况下，将请求一个不关心面的通用能力实例。`#getCapability`的返回类型将对应于传递给方法的能力中声明类型的`LazyOptional`。对于物品处理器能力，这就是`LazyOptional<IItemHandler>`。如果特定提供者不可用该能力，则它将返回一个空的`LazyOptional`。

暴露一个能力
---------------------

为了暴露一个能力，您首先需要基本能力类型的一个实例。请注意，您应为每个保留该能力的对象分配一个单独的实例，因为该能力很可能与其包含的对象相关联。

对于`IItemHandler`，默认实现使用`ItemStackHandler`类，该类在构造函数中有一个可选参数，用于指定槽的数量。但是，应避免依赖这些默认实现的存在，因为能力系统的目的是防止在能力不存在的情况下的加载错误，因此实例化应在检查能力是否已注册的测试后进行（参见上一节关于`CapabilityManager#get`的备注）。

一旦有了自己的能力接口实例，您将希望通知能力系统的用户，您暴露了该能力并提供接口引用的`LazyOptional`。这可以通过重写`#getCapability`方法来完成，并将能力实例与您正在暴露的能力进行比较。 如果机器有不同的槽基于查询的侧面，可以通过`side`参数进行测试。对于实体和物品堆栈，此参数可以忽略，但仍可以将其视为上下文，例如玩家的不同护甲槽（`Direction#UP`暴露玩家的头盔槽），或有关库存中周围块的信息（`Direction#WEST`暴露熔炉的输入槽）。请不要忘记回退到`super`，否则现有的附加能力将停止工作。

能力必须在提供者的生命周期结束时通过`LazyOptional#invalidate`失效。对于拥有的BlockEntities和Entities，`LazyOptional`可以在`#invalidateCaps`中失效。对于非拥有的提供者，应传递一个提供失效的可运行对象到`AttachCapabilitiesEvent#addListener`。

```java
// 在您的BlockEntity子类中的某处
LazyOptional<IItemHandler> inventoryHandlerLazyOptional;

// 提供的实例（例如 () -> inventoryHandler）
// 确保延迟性，因为初始化应仅在需要时进行
inventoryHandlerLazyOptional = LazyOptional.of(inventoryHandlerSupplier);

@Override
public <T> LazyOptional<T> getCapability(Capability<T> cap, Direction side) {
  if (cap == ForgeCapabilities.ITEM_HANDLER) {
    return inventoryHandlerLazyOptional.cast();
  }
  return super.getCapability(cap, side);
}

@Override
public void invalidateCaps() {
  super.invalidateCaps();
  inventoryHandlerLazyOptional.invalidate();
}
```

!!! 提示
    如果只在给定对象上暴露一个能力，您可以使用`Capability#orEmpty`作为if/else语句的替代。

    ```java
    @Override
    public <T> LazyOptional<T> getCapability(Capability<T> cap, Direction side) {
      return ForgeCapabilities.ITEM_HANDLER.orEmpty(cap, inventoryHandlerLazyOptional);
    }
    ```

`Item` 是一个特殊情况，因为它们的能力提供者存储在`ItemStack`上。取而代之的，能力应该通过`Item#initCapabilities`附加。这应该在堆栈的生命周期内持有您的能力。

强烈建议在代码中使用直接检查来测试能力，而不是尝试依赖于映射或其他数据结构，因为能力测试可以在每tick中由许多对象完成，并且他们需要尽可能快速以避免减慢游戏速度。

附加能力
----------------------

如前所述，将能力附加到现有提供者，`Level`s和`LevelChunk`s可以使用`AttachCapabilitiesEvent`来完成。所有可以提供能力的对象使用相同的事件。`AttachCapabilitiesEvent`有5种有效的泛型类型提供以下事件：

* `AttachCapabilitiesEvent<Entity>`：仅对实体触发。
* `AttachCapabilitiesEvent<BlockEntity>`：仅对块实体触发。
* `AttachCapabilitiesEvent<ItemStack>`：仅对物品堆栈触发。
* `AttachCapabilitiesEvent<Level>`：仅对等级触发。
* `AttachCapabilitiesEvent<LevelChunk>`：仅对等级块触发。

泛型类型不能比上述类型更具体。例如：如果您想为`Player`附加能力，您需要订阅`AttachCapabilitiesEvent<Entity>`，然后在附加能力前确定提供的对象是`Player`。

在所有情况下，事件都有一个`#addCapability`方法，可以用来将能力附加到目标对象。您并不是直接将能力本身添加到列表，而是添加能力提供者，后者有机会仅从某些侧面返回能力。虽然提供者只需实现`ICapabilityProvider`，但如果能力需要持久存储数据，可以实现`ICapabilitySerializable<T extends Tag>`，该接口除了返回能力外，还将提供标签保存/加载功能。

有关如何实现`ICapabilityProvider`的信息，请参阅[暴露能力][expose]部分。

创建自己的能力
----------------------------

可以通过两种方法之一注册能力：`RegisterCapabilitiesEvent`或`@AutoRegisterCapability`。

### RegisterCapabilitiesEvent

可以通过向`#register`方法提供能力类型的类来使用`RegisterCapabilitiesEvent`注册能力。事件在mod事件总线上[处理]。

```java
@SubscribeEvent
public void registerCaps(RegisterCapabilitiesEvent event) {
  event.register(IExampleCapability.class);
}
```

### @AutoRegisterCapability

能力通过在能力类型上添加`@AutoRegisterCapability`注解来注册。

```java
@AutoRegisterCapability
public interface IExampleCapability {
  // ...
}
```

持久化LevelChunk和BlockEntity能力
--------------------------------------------

与Levels、Entities和ItemStacks不同，LevelChunks和BlockEntities仅在被标记为脏时写入磁盘。因此，对于具有持久状态的LevelChunk或BlockEntity的能力实现，应确保每当其状态更改时，其拥有者被标记为脏。

通常用于BlockEntities库存的`ItemStackHandler`有一个可重写的方法`void onContentsChanged(int slot)`，旨在用于将BlockEntity标记为脏。

```java
public class MyBlockEntity extends BlockEntity {

  private final IItemHandler inventory = new ItemStackHandler(...) {
    @Override
    protected void onContentsChanged(int slot) {
      super.onContentsChanged(slot);
      setChanged();
    }
  }

  // ...
}
```

与客户端同步数据
-------------------------------

默认情况下，能力数据不会发送到客户端。为了改变这一点，mod必须使用包管理自己的同步代码。

有三种不同的情况，您可能需要发送同步包，所有这些情况都是可选的：

1. 当实体在等级中生成或块被放置时，您可能需要与客户端共享初始化分配的值。
2. 当已存储数据发生变化时，您可能需要通知部分或所有观看的客户端。
3. 当新客户端开始查看实体或块时，您可能需要通知它现有的数据。

有关实现网络包的更多信息，请参阅[网络][network]页面。

死后维持持久性
------------------------------

在默认情况下，能力数据不会在死亡时保留。要改变这一点，当玩家实体在重生过程中被克隆时，必须手动复制数据。

这可以通过`PlayerEvent$Clone`完成，读取原始实体的数据并将其分配给新实体。在此事件中，`#isWasDeath`方法可用于区分死后重生和从末路回归。这一点很重要，因为从末路回归时数据已经存在，因此在这种情况下要小心不要重复值。

[expose]: #暴露一个能力
[handled]: ../concepts/events.md#创建事件处理器
[network]: ../networking/index.md