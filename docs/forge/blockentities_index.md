---
title: 介绍
order: 0
toc: content
group:
  title: 方块实体
  order: 9990
---
# BlockEntities

`BlockEntities` 类似于绑定到方块的简化版 `Entities`。它们用于存储动态数据、执行基于 tick 的任务以及动态渲染。在原版 Minecraft 中，一些例子包括处理箱子的库存、熔炉的熔炼逻辑或信标的区域效果。在模组中有更复杂的例子，比如采石场、分拣机、管道和显示器。

!!! 注意
    `BlockEntities` 并不是解决所有问题的方案，如果错误地使用，它们可能会导致延迟。尽量避免过多使用。

## 注册

Block Entities 是动态创建和移除的，因此它们本身并不是注册对象。

为了创建一个 `BlockEntity`，您需要扩展 `BlockEntity` 类。因此，需要注册另一个对象以便于创建和引用这种动态对象的*类型*。对于一个 `BlockEntity`，这些被称为 `BlockEntityType`。

`BlockEntityType` 可以像其他注册对象一样被[注册][registration]。要构建一个 `BlockEntityType`，可以通过 `BlockEntityType$Builder#of` 使用其构建器形式。它接收两个参数：一个 `BlockEntityType$BlockEntitySupplier`，它接受 `BlockPos` 和 `BlockState` 来创建关联的 `BlockEntity` 的新实例，以及一个 `Block` 的可变参数，此 `BlockEntity` 可以附加到这些 `Block` 上。通过调用 `BlockEntityType$Builder#build` 来构建 `BlockEntityType`。它接收一个代表类型安全引用的 `Type`，用于在 `DataFixer` 中引用此注册对象。由于 `DataFixer` 是用于模组的可选系统，这个参数可以传递为 `null`。

```java
// 对于某个 DeferredRegister<BlockEntityType<?>> REGISTER
public static final RegistryObject<BlockEntityType<MyBE>> MY_BE = REGISTER.register("mybe", () -> BlockEntityType.Builder.of(MyBE::new, validBlocks).build(null));

// 在 MyBE 中，一个 BlockEntity 的子类
public MyBE(BlockPos pos, BlockState state) {
  super(MY_BE.get(), pos, state);
}
```

## 创建一个 `BlockEntity`

要创建一个 `BlockEntity` 并将其附加到某个 `Block`，必须在您的 `Block` 子类中实现 `EntityBlock` 接口。方法 `EntityBlock#newBlockEntity(BlockPos, BlockState)` 必须被实现并返回您的 `BlockEntity` 的新实例。

## 在 `BlockEntity` 中存储数据

为了保存数据，请重写以下两个方法：
```java
BlockEntity#saveAdditional(CompoundTag tag)

BlockEntity#load(CompoundTag tag)
```
这些方法在包含 `BlockEntity` 的 `LevelChunk` 从标签加载或保存到标签时调用。使用它们来读写您的块实体类中的字段。

!!! 注意
		每当您的数据更改时，您需要调用 `BlockEntity#setChanged`；否则，在保存关卡时，可能会跳过包含您 `BlockEntity` 的 `LevelChunk`。

!!! 重要
		调用 `super` 方法非常重要！

    标签名称 `id`、`x`、`y`、`z`、`ForgeData` 和 `ForgeCaps` 被 `super` 方法保留。

## `BlockEntities` 的 Ticking

如果您需要一个 ticking 的 `BlockEntity`，例如跟踪熔炼过程中的进度，则必须在 `EntityBlock` 中实现并重写另一个方法：`EntityBlock#getTicker(Level, BlockState, BlockEntityType)`。这可以根据用户所在的逻辑侧实现不同的 ticker，或者只实现一个通用的 ticker。在任何情况下，都必须返回一个 `BlockEntityTicker`。由于这是一个功能接口，它可以仅采用代表 ticker 的方法：

```java
// 在一些 Block 子类内部
@Nullable
@Override
public <T extends BlockEntity> BlockEntityTicker<T> getTicker(Level level, BlockState state, BlockEntityType<T> type) {
  return type == MyBlockEntityTypes.MYBE.get() ? MyBlockEntity::tick : null;
}

// 在 MyBlockEntity 内部
public static void tick(Level level, BlockPos pos, BlockState state, MyBlockEntity blockEntity) {
  // 执行操作
}
```

!!! 注意
    此方法每 tick 调用一次；因此，应避免在此处进行复杂计算。如果可能，应每 X 个 tick 执行更复杂的计算。（一秒内的 tick 数可能低于 20（20）但不会高于）

## 同步数据到客户端

有三种方式将数据同步到客户端：在区块加载时同步、在块更新时同步，以及使用自定义网络消息。

### 在 LevelChunk 加载时同步

为此您需要重写
```java
BlockEntity#getUpdateTag()

IForgeBlockEntity#handleUpdateTag(CompoundTag tag)
```
这很简单，第一种方法收集应发送给客户端的数据，而第二种方法处理这些数据。如果您的 `BlockEntity` 不包含很多数据，您可能可以使用 [在您的 `BlockEntity` 中存储数据][storing-data] 部分提供的方法。

!!! 重要
    为 `BlockEntities` 同步过多/无用的数据可能会导致网络拥堵。您应该通过在客户端需要信息时只发出必要的信息来优化网络使用。例如，通常不需要在更新标签中发送块实体的库存，因为这可以通过其 [`AbstractContainerMenu`][menu] 同步。

### 在块更新时同步

此方法稍微复杂一些，但您只需要重写两三个方法。
这是一个简单的实现示例：
```java
@Override
public CompoundTag getUpdateTag() {
  CompoundTag tag = new CompoundTag();
  // 将您的数据写入标签
  return tag;
}

@Override
public Packet<ClientGamePacketListener> getUpdatePacket() {
  // 将从 #getUpdateTag 获取标签
  return ClientboundBlockEntityDataPacket.create(this);
}

// 可以重写 IForgeBlockEntity#onDataPacket。默认情况下，这将推迟到 #load。
```
静态构造函数 `ClientboundBlockEntityDataPacket#create` 接收：

* `BlockEntity`。
* 从 `BlockEntity` 获取 `CompoundTag` 的可选函数。默认情况下，这使用 `BlockEntity#getUpdateTag`。

现在，要发送数据包，必须在服务器上发出更新通知。
```java
Level#sendBlockUpdated(BlockPos pos, BlockState oldState, BlockState newState, int flags)
```
`pos` 应为您的 `BlockEntity` 的位置。
对于 `oldState` 和 `newState`，您可以传递该位置的当前 `BlockState`。
`flags` 是一个位掩码，应包含 `2`，这将同步更改到客户端。有关更多信息以及其他标志，请参阅 `Block`。标志 `2` 等价于 `Block#UPDATE_CLIENTS`。

### 使用自定义网络消息同步

这种同步方式可能是最复杂的，但通常是最优化的，因为您可以确保只有需要同步的数据实际被同步。在尝试此操作之前，您应首先查看 [`Networking`][networking] 部分，特别是 [`SimpleImpl`][simple_impl]。
一旦创建了自定义网络消息，您可以使用 `SimpleChannel#send(PacketDistributor$PacketTarget, MSG)` 将其发送给加载了 `BlockEntity` 的所有用户。

!!! 警告
    进行安全检查非常重要，当消息到达玩家时，`BlockEntity` 可能已经被销毁或替换！您还应检查区块是否已加载（`Level#hasChunkAt(BlockPos)`）。

[registration]: ../concepts/registries.md#methods-for-registering
[storing-data]: #storing-data-within-your-blockentity
[menu]: ../gui/menus.md
[networking]: ../networking/index.md
[simple_impl]: ../networking/simpleimpl.md