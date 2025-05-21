---
title: 方块状态
order: 1
toc: content
group:
  title: 方块
  order: 9986
---
方块状态
============

遗留行为
---------------------------------------

在 Minecraft 1.7 及更早的版本中，需要存储放置或状态数据但没有使用方块实体（BlockEntities）的方块使用 **元数据**。元数据是与方块一起存储的额外数字，允许在一个方块内实现不同的旋转、朝向，甚至完全不同的行为。

然而，元数据系统既令人困惑又有限，因为它仅作为方块 ID 附带的一个数字存储，除了代码中的注释外没有其他意义。例如，实现一个可以面向某个方向并位于方块空间的上半部分或下半部分的方块（如楼梯）：

```Java
switch (meta) {
  case 0: { ... } // 朝南且在方块的下半部分
  case 1: { ... } // 朝南且在方块的上半部分
  case 2: { ... } // 朝北且在方块的下半部分
  case 3: { ... } // 朝北且在方块的上半部分
  // ... 等等 ...
}
```

由于这些数字本身不具备意义，除非可以访问源代码和注释，否则没人能够理解它们代表什么。

状态的引入
---------------------------------------

在 Minecraft 1.8 及之后的版本中，元数据系统以及方块 ID 系统被弃用，并最终被 **方块状态系统** 取代。方块状态系统将方块属性的细节与方块的其他行为进行了抽象化。

方块的每个 *属性* 由一个 `Property<?>` 实例描述。方块属性的例子包括乐器（`EnumProperty<NoteBlockInstrument>`）、朝向（`DirectionProperty`）、是否通电（`Property<Boolean>`）等。每个属性的值由 `Property<T>` 参数化的类型 `T` 决定。

可以从 `Block` 和其属性及其关联值的映射构建一个独特的对，这个独特的对称为 `BlockState`。

之前没有意义的元数据值系统被用方块属性系统取代，这使得解释和处理更加简便。以前，朝东且被按下或通电的石质按钮表示为 "`minecraft:stone_button` with metadata `9`"。现在，它表示为 "`minecraft:stone_button[facing=east,powered=true]`"。

方块状态的正确使用
---------------------------------------

`BlockState` 系统是一个灵活且强大的系统，但也有其局限性。`BlockState` 是不可变的，并且其属性的所有组合都在游戏启动时生成。这意味着具有许多属性和可能值的 `BlockState` 会减慢游戏的加载，并让尝试理解您方块逻辑的人感到困惑。

并不是所有方块和情况都需要使用 `BlockState`；只有方块的最基本属性应被放入 `BlockState` 中，其他情况最好使用 `BlockEntity` 或作为一个独立的 `Block`。始终考虑您是否真正需要使用方块状态。

!!! 注意
    一个好的经验法则是：**如果它有不同的名称，那么它应该是一个独立的方块**。

例如制作椅子方块：椅子的*方向*应为一个*属性*，而不同*木材种类*则应分成不同的方块。
一个面朝东的"橡木椅子"（`oak_chair[facing=east]`）与一个面朝西的"云杉椅子"（`spruce_chair[facing=west]`）是不同的。

实现方块状态
---------------------------------------

在您的 Block 类中，为您的 Block 拥有的每个属性创建或引用 `static final` 的 `Property<?>` 对象。您可以随意创建您自己的 `Property<?>` 实现，但本文不涵盖具体的创建方法。原版代码提供了几个便捷的实现：

* `IntegerProperty`
    * 实现 `Property<Integer>`。定义一个持有整数值的属性。
    * 通过调用 `IntegerProperty#create(String propertyName, int minimum, int maximum)` 创建。
* `BooleanProperty`
    * 实现 `Property<Boolean>`。定义一个持有 `true` 或 `false` 的属性。
    * 通过调用 `BooleanProperty#create(String propertyName)` 创建。
* `EnumProperty<E extends Enum<E>>`
    * 实现 `Property<E>`。定义一个可以采用 Enum 类值的属性。
    * 通过调用 `EnumProperty#create(String propertyName, Class<E> enumClass)` 创建。
    * 也可以只使用 Enum 值的一个子集（例如 16 个 `DyeColor` 中的 4 个）。请参阅 `EnumProperty#create` 的重载。
* `DirectionProperty`
    * 这是 `EnumProperty<Direction>` 的便捷实现。
    * 还提供了几个便捷的谓词。比如，要获取表示基本方向的属性，调用 `DirectionProperty.create("<name>", Direction.Plane.HORIZONTAL)`；要获取 X 方向的属性，调用 `DirectionProperty.create("<name>", Direction.Axis.X)`。

类 `BlockStateProperties` 包含了共享的原版属性，应该尽量使用或参考这些属性，而不是创建自己的属性。

当您准备好所需的 `Property<>` 对象后，覆盖您的 Block 类中的 `Block#createBlockStateDefinition(StateDefinition$Builder)` 方法。在该方法中，调用 `StateDefinition$Builder#add(...)`，参数为您希望方块拥有的每个 `Property<?>`。

每个方块还将拥有一个自动选择的“默认”状态。您可以通过在构造函数中调用 `Block#registerDefaultState(BlockState)` 方法来更改此“默认”状态。放置方块时，将成为此“默认”状态。 `DoorBlock` 的一个示例：

```Java
this.registerDefaultState(
  this.stateDefinition.any()
    .setValue(FACING, Direction.NORTH)
    .setValue(OPEN, false)
    .setValue(HINGE, DoorHingeSide.LEFT)
    .setValue(POWERED, false)
    .setValue(HALF, DoubleBlockHalf.LOWER)
);
```

如果您希望更改放置方块时使用的 `BlockState`，可以重写 `Block#getStateForPlacement(BlockPlaceContext)`。这可以用于例如根据玩家放置方块时站立的位置来设置方块方向。

由于 `BlockState` 是不可变的，并且其属性的所有组合在游戏启动时生成，因此调用 `BlockState#setValue(Property<T>, T)` 将只是去 `Block` 的 `StateHolder` 请求您想要的值组合的 `BlockState`。

由于所有可能的 `BlockState` 在启动时生成，您可以并被鼓励使用引用相等运算符 (`==`) 来检查两个 `BlockState` 是否相等。

使用 `BlockState`
---------------------

您可以通过调用 `BlockState#getValue(Property<?>)` 并传递您要获取值的属性来获取属性的值。
如果您想获得具有不同值组合的 `BlockState`，只需调用 `BlockState#setValue(Property<T>, T)` 并传递属性及其值。

您可以使用 `Level#setBlockAndUpdate(BlockPos, BlockState)` 和 `Level#getBlockState(BlockPos)` 在关卡中获取和放置 `BlockState`。如果要放置一个 `Block`，调用 `Block#defaultBlockState()` 以获取“默认”状态，并按照上述方式使用对 `BlockState#setValue(Property<T>, T)` 的后续调用来实现所需状态。