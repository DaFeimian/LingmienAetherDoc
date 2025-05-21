---
title: 客户端-模型生成
order: 1
toc: content
group:
  title: 数据生成器
  order: 9996
---
模型生成
====

默认情况下，可以生成[模型]或方块状态的模型。每个模型都提供了生成必要JSON的方法（模型使用`ModelBuilder#toJson`，方块状态使用`IGeneratedBlockState#toJson`）。实现之后，必须将[相关的提供者][provider] [添加][datagen]到`DataGenerator`中。

```java
// 在 MOD 事件总线上
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    DataGenerator gen = event.getGenerator();
    ExistingFileHelper efh = event.getExistingFileHelper();

    gen.addProvider(
        // 仅在客户端资产生成时才运行生成器
        event.includeClient(),
        output -> new MyItemModelProvider(output, MOD_ID, efh)
    );
    gen.addProvider(
        event.includeClient(),
        output -> new MyBlockStateProvider(output, MOD_ID, efh)
    );
}
```

模型文件
--------

`ModelFile`作为一个提供者所引用或生成的所有模型的基础。每个模型文件存储相对于`models`子目录的位置，并可以断言文件是否存在。

### 已存在的模型文件

`ExistingModelFile`是`ModelFile`的一个子类，通过[`ExistingFileHelper#exists`][efh]检查模型是否已经存在于`models`子目录中。所有非生成的模型通常通过`ExistingModelFile`引用。

### 未检查的模型文件

`UncheckedModelFile`是`ModelFile`的一个子类，假定指定的模型存在于某个位置中。

!!! 注意
    不应出现使用`UncheckedModelFile`来引用模型的情况。如果出现这种情况，则说明相关资源未被`ExistingFileHelper`正确跟踪。

模型构建器
--------------

`ModelBuilder`表示一个待生成的`ModelFile`。它包含关于模型的所有数据：其父级、面、纹理、变换、光照和[加载器]。

!!! 提示
    虽然可以生成复杂模型，但建议先使用建模软件来构建这些模型。然后，数据提供者可以通过父复杂模型中定义的引用生成应用了特定纹理的子模型。

构建器的父级（通过`ModelBuilder#parent`）可以是任何`ModelFile`：无论是生成的还是已存在的。生成的文件将被立即添加到`ModelProvider`中。构建器本身可以作为父级传递，或者可以提供一个`ResourceLocation`。

!!! 警告
    如果在传递`ResourceLocation`时，父模型没有在子模型之前生成，则会抛出异常。

模型中的每个元素（通过`ModelBuilder#element`）被定义为使用两个三维点（分别为`ElementBuilder#from`和`#to`）的立方体，其中每个轴被限制在`[-16,32]`的值范围内（含-16和32）。立方体的每个面（`ElementBuilder#face`）都可以指定该面在何时被遮罩（`FaceBuilder#cullface`）、[色调索引][color]（`FaceBuilder#tintindex`）、纹理引用自`textures`键（`FaceBuilder#texture`）、纹理上的UV坐标（`FaceBuilder#uvs`）和以90度为单位的旋转（`FaceBuilder#rotation`）。

!!! 注意
    推荐对于在任何轴上超过`[0,16]`界限的方块模型，将其拆分为多个方块，例如对于多方块结构，以避免光照和遮挡问题。

每个立方体还可以围绕指定的点（`RotationBuilder#origin`）在给定的轴（`RotationBuilder#axis`）进行22.5度为单位的旋转（`RotationBuilder#angle`）。立方体相对于整个模型也可以缩放所有面（`RotationBuilder#rescale`）。立方体还可以确定其阴影是否应该被渲染（`ElementBuilder#shade`）。

每个模型定义了一组纹理键（`ModelBuilder#texture`），指向位置或引用。然后，任何元素都可以通过以`#`为前缀来引用每个键（纹理键`example`可以在元素中使用`#example`引用）。位置指定纹理在`assets/<namespace>/textures/<path>.png`中的位置。引用则是任何父模型可以用作键来为当前模型定义纹理。

模型还可以针对任何定义的透视图进行变换（`ModelBuilder#transforms`）（如第一人称左手视角、UI界面、地面等）。对于任何透视图（`TransformsBuilder#transform`），可以设置旋转（`TransformVecBuilder#rotation`）、平移（`TransformVecBuilder#translation`）和缩放（`TransformVecBuilder#scale`）。

最后，模型可以设置是否在某一层级使用环境遮罩（`ModelBuilder#ao`），以及从何处点亮和阴影模型`ModelBuilder#guiLight`。

### `BlockModelBuilder`

`BlockModelBuilder`表示一个待生成的方块模型。除了`ModelBuilder`外，还可以生成对整个模型的变换（`BlockModelBuilder#rootTransform`）。根可以被平移（`RootTransformBuilder#transform`）、旋转（`RootTransformBuilder#rotation`, `RootTransformBuilder#postRotation`）和缩放（`RootTransformBuilder#scale`），无论是单个还是围绕某个原点的全部变换（`RootTransformBuilder#transform`）。

### `ItemModelBuilder`

`ItemModelBuilder`代表一个待生成的物品模型。除了`ModelBuilder`之外，重写（`OverrideBuilder#override`）也可以生成。应用于模型的每个重写都可以为给定的属性应用条件，这必须大于指定的值（`OverrideBuilder#predicate`）。如果条件满足，则渲染指定的模型（`OverrideBuilder#model`）而不是当前模型。

模型提供者
---------------

`ModelProvider`子类负责生成构建好的`ModelBuilder`s。提供者需要输入生成器、mod id、在`models`文件夹内生成的子目录、`ModelBuilder`工厂以及现有文件帮助器。每个提供者子类必须实现`#registerModels`。

该提供者包含基本方法，用于创建`ModelBuilder`或提供方便的方式获取纹理或模型引用：

方法               | 描述
:---:                | :---
`getBuilder`         | 在提供者的子目录中为给定的mod id创建一个新的`ModelBuilder`。
`withExistingParent` | 为给定的父级创建一个新的`ModelBuilder`。当父级不是由构建器生成时使用。
`mcLoc`              | 为`minecraft`命名空间中的路径创建一个`ResourceLocation`。
`modLoc`             | 为给定mod id命名空间中的路径创建一个`ResourceLocation`。

此外，还提供了几个帮助类以使用原版模板轻松生成常见模型。大多数用于方块模型，只有少数是通用的。

!!! 注意
    虽然模型位于特定的子目录中，但这并不意味着不能通过该子目录中模型以外的模型引用。从通常意义上讲，这表示该模型被用于该类型的对象。

### `BlockModelProvider`

`BlockModelProvider`用于通过`BlockModelBuilder`在`block`文件夹中生成方块模型。方块模型通常应以`minecraft:block/block`或其子模型之一为父模型，以用于物品模型。

!!! 注意
    方块模型及其对应的物品模型非通过`BlockModelProvider`和`ItemModelProvider`的直接子类生成，而通常是通过[`BlockStateProvider`][blockstateprovider]。

### `ItemModelProvider`

`ItemModelProvider`用于通过`ItemModelBuilder`在`item`文件夹中生成物品模型。大多数物品模型以`item/generated`为父模型，并使用`layer0`指定其纹理，可以通过`#singleTexture`完成此操作。

!!! 注意
    `item/generated`可以支持五个纹理层叠加：`layer0`、`layer1`、`layer2`、`layer3`和`layer4`。

```java
// 在某个ItemModelProvider#registerModels中

// 将生成'assets/<modid>/models/item/example_item.json'
// 父级将是'minecraft:item/generated'
// 对于纹理键'layer0'
// 它将在'assets/<modid>/textures/item/example_item.png'中
this.basicItem(EXAMPLE_ITEM.get());
```

!!! 注意
    方块的物品模型应通常以现有方块模型为父级，而不是为物品生成一个单独的模型。

方块状态提供者
--------------------

`BlockStateProvider`负责为`blockstates`生成[方块状态JSON][blockstate]、为特定方块生成`models/block`中的方块模型和`models/item`中的物品模型。该提供者需传入数据生成器、mod id和现有文件帮助器。每个`BlockStateProvider`子类必须实现`#registerStatesAndModels`。

提供者包含用于生成方块状态JSON和方块模型的基本方法。物品模型必须单独生成，因为方块状态JSON可能定义了多个用于不同上下文的模型。不过，modder在处理更复杂的任务时，应该注意有很多常见的方法：

方法                | 描述
:---:                 | :---
`models`              | 获取用于生成物品方块模型的[`BlockModelProvider`][blockmodels]。
`itemModels`          | 获取用于生成物品方块模型的[`ItemModelProvider`][itemmodels]。
`modLoc`              | 为给定mod id命名空间中的路径创建一个`ResourceLocation`。
`mcLoc`               | 为`minecraft`命名空间中的路径创建一个`ResourceLocation`。
`blockTexture`        | 引用在`textures/block`中的与方块同名的纹理。
`simpleBlockItem`     | 为给定的相关模型文件创建一个方块的物品模型。
`simpleBlockWithItem` | 使用方块模型作为其父级，为方块模型和物品模型创建一个单一的方块状态。

一个方块状态JSON由变体或条件组成。每个变体或条件引用一个`ConfiguredModelList`：一个`ConfiguredModel`s的列表。每个配置模型包含模型文件（通过`ConfiguredModel$Builder#modelFile`），以90度为单位的X和Y旋转（分别通过`#rotationX`和`rotationY`），在方块状态JSON中旋转模型时纹理是否也随之旋转（通过`#uvLock`），以及模型在列表中出现的权重（通过`#weight`）。

构建器（`ConfiguredModel#builder`）还可以通过创建下一个模型（`#nextModel`）并重复设置，直到调用`#build`来创建`ConfiguredModel`s数组。

### `VariantBlockStateBuilder`

变体可以使用`BlockStateProvider#getVariantBuilder`生成。每个变体指定一个[属性](`PartialBlockstate`)列表，当匹配到层级中的`BlockState`时，将从相应的模型列表中选择一个模型进行显示。如果存在任何未被定义的变体覆盖的`BlockState`，则会抛出异常。对于任何`BlockState`，只有一个变体可以为真。

通常使用以下三种方法之一定义`PartialBlockstate`：

方法               | 描述
:---:                | :---
`partialState`       | 创建一个待定义的`PartialBlockstate`。
`forAllStates`       | 定义一个函数，其中给定的`BlockState`由一个`ConfiguredModel`s数组表示。
`forAllStatesExcept` | 定义一个类似于`#forAllStates`的函数；不过，它还明确指定不影响渲染的属性。

对于`PartialBlockstate`，可以指定定义的属性（`#with`）。配置的模型可被设置（`#setModels`）、追加到现有模型中（`#addModels`），或构建（`#modelForState`，然后一旦完成不通过`#ConfiguredModel$Builder#build`而用`#ConfiguredModel$Builder#addModel`）。

```java
// 在某个BlockStateProvider#registerStatesAndModels中

// EXAMPLE_BLOCK_1：具有属性BlockStateProperties#AXIS
this.getVariantBuilder(EXAMPLE_BLOCK_1) // 获取变体构建器
  .partialState() // 创建部分状态
  .with(AXIS, Axis.Y) // 当BlockState的AXIS = Y时
    .modelForState() // 当AXIS = Y时设置模型
    .modelFile(yModelFile1) // 可以显示'yModelFile1'
    .nextModel() // 当AXIS = Y时再添加一个模型
    .modelFile(yModelFile2) // 可以显示'yModelFile2'
    .weight(2) // 会2/3的时间显示'yModelFile2'
    .addModel() // 当AXIS = Y时最终确定模型
  .with(AXIS, Axis.Z) // 当BlockState的AXIS = Z时
    .modelForState() // 当AXIS = Z时设置模型
    .modelFile(hModelFile) // 可以显示'hModelFile'
    .addModel() // 当AXIS = Z时最终确定模型
  .with(AXIS, Axis.X)  // 当BlockState的AXIS = X时
    .modelForState() // 设置模型当AXIS = X
    .modelFile(hModelFile) // 可以显示'hModelFile'
    .rotationY(90) // 将'hModelFile'在Y轴上旋转90度
    .addModel(); // 当AXIS = X时最终确定模型

// EXAMPLE_BLOCK_2：具有属性BlockStateProperties#HORIZONTAL_FACING
this.getVariantBuilder(EXAMPLE_BLOCK_2) // 获取变体构建器
  .forAllStates(state -> // 对于所有可能的状态
    ConfiguredModel.builder() // 创建配置模型构建器
      .modelFile(modelFile) // 可以显示'modelFile'
      .rotationY((int) state.getValue(HORIZONTAL_FACING).toYRot()) // 根据属性来在Y轴上旋转'modelFile'
      .build() // 创建配置的模型数组
  );

// EXAMPLE_BLOCK_3：具有属性BlockStateProperties#HORIZONTAL_FACING, BlockStateProperties#WATERLOGGED
this.getVariantBuilder(EXAMPLE_BLOCK_3) // 获取变体构建器
  .forAllStatesExcept(state -> // 对于所有HORIZONTAL_FACING状态
    ConfiguredModel.builder() // 创建配置模型构建器
      .modelFile(modelFile) // 可以显示'modelFile'
      .rotationY((int) state.getValue(HORIZONTAL_FACING).toYRot()) // 根据属性来在Y轴上旋转'modelFile'
      .build(), // 创建配置的模型数组
  WATERLOGGED); // 忽略WATERLOGGED属性
```

### `MultiPartBlockStateBuilder`

多部分可以使用`BlockStateProvider#getMultipartBuilder`生成。每个部分（`MultiPartBlockStateBuilder#part`）指定一组属性条件，当匹配到层级中的`BlockState`时，模型列表中的一个模型将显示。所有条件组匹配的`BlockState`将显示其选择的模型，并在彼此之上叠加显示。

对于任何部分（通过`ConfiguredModel$Builder#addModel`获得），当属性是指定值之一时，可以添加条件（通过`#condition`）。条件必须全部成功，或者当设置`#useOr`时至少一个必须成功。条件可以分组（通过`#nestedGroup`），只要当前组只包含其他组而不是单个条件。条件组合可以通过`#endNestedGroup`离开，给定的部分可以通过`#end`完成。

```java
// 在某个BlockStateProvider#registerStatesAndModels中

// 红石线
this.getMultipartBuilder(REDSTONE) // 获取多部件构建器
  .part() // 创建部分
    .modelFile(redstoneDot) // 可以显示'redstoneDot'
    .addModel() // 当...
    .useOr() // 至少以下条件有一个为真时显示'redstoneDot'
    .nestedGroup() // 当所有分组条件都为真时为真
      .condition(WEST_REDSTONE, NONE) // 当WEST_REDSTONE为NONE时为真
      .condition(EAST_REDSTONE, NONE) // 当EAST_REDSTONE为NONE时为真
      .condition(SOUTH_REDSTONE, NONE) // 当SOUTH_REDSTONE为.NONE时为真
      .condition(NORTH_REDSTONE, NONE) // 当NORTH_REDSTONE为NONE时为真
    .endNestedGroup() // 结束组
    .nestedGroup() // 当所有分组条件都为真时为真
      .condition(EAST_REDSTONE, SIDE, UP) // 当EAST_REDSTONE为SIDE或UP时为真
      .condition(NORTH_REDSTONE, SIDE, UP) // 当NORTH_REDSTONE为SIDE或UP时为真
    .endNestedGroup() // 结束组
    .nestedGroup() // 当所有分组条件都为真时为真
      .condition(EAST_REDSTONE, SIDE, UP) // 当EAST_REDSTONE为SIDE或UP时为真
      .condition(SOUTH_REDSTONE, SIDE, UP) // 当SOUTH_REDSTONE为SIDE或UP时为真
    .endNestedGroup() // 结束组
    .nestedGroup() // 当所有分组条件都为真时为真
      .condition(WEST_REDSTONE, SIDE, UP) // 当WEST_REDSTONE为SIDE或UP时为真
      .condition(SOUTH_REDSTONE, SIDE, UP) // 当SOUTH_REDSTONE为SIDE或UP时为真
    .endNestedGroup() // 结束组
    .nestedGroup() // 当所有分组条件都为真时为真
      .condition(WEST_REDSTONE, SIDE, UP) // 当WEST_REDSTONE为SIDE或UP时为真
      .condition(NORTH_REDSTONE, SIDE, UP) // 当NORTH_REDSTONE为SIDE或UP时为真
    .endNestedGroup() // 结束组
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneSide0) // 可以显示'redstoneSide0'
    .addModel() // 条件...
    .condition(NORTH_REDSTONE, SIDE, UP) // NORTH_REDSTONE为SIDE或UP
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneSideAlt0) // 可以显示'redstoneSideAlt0'
    .addModel() // 条件...
    .condition(SOUTH_REDSTONE, SIDE, UP) // SOUTH_REDSTONE为SIDE或UP
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneSideAlt1) // 可以显示'redstoneSideAlt1'
    .rotationY(270) // 将'redstoneSideAlt1'在Y轴上旋转270度
    .addModel() // 条件...
    .condition(EAST_REDSTONE, SIDE, UP) // EAST_REDSTONE为SIDE或UP
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneSide1) // 可以显示'redstoneSide1'
    .rotationY(270) // 将'redstoneSide1'在Y轴上旋转270度
    .addModel() // 条件...
    .condition(WEST_REDSTONE, SIDE, UP) // WEST_REDSTONE为SIDE或UP
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneUp) // 可以显示'redstoneUp'
    .addModel() // 条件...
    .condition(NORTH_REDSTONE, UP) // NORTH_REDSTONE为UP
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneUp) // 可以显示'redstoneUp'
    .rotationY(90) // 将'redstoneUp'在Y轴上旋转90度
    .addModel() // 条件...
    .condition(EAST_REDSTONE, UP) // EAST_REDSTONE为UP
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneUp) // 可以显示'redstoneUp'
    .rotationY(180) // 将'redstoneUp'在Y轴上旋转180度
    .addModel() // 条件...
    .condition(SOUTH_REDSTONE, UP) // SOUTH_REDSTONE为UP
    .end() // 完成部分
  .part() // 创建部分
    .modelFile(redstoneUp) // 可以显示'redstoneUp'
    .rotationY(270) // 将'redstoneUp'在Y轴上旋转270度
    .addModel() // 条件...
    .condition(WEST_REDSTONE, UP) // WEST_REDSTONE为UP
    .end(); // 完成部分
```

模型加载器构建器
---------------------

对于给定的`ModelBuilder`，也可以生成自定义模型加载器。自定义模型加载器是`CustomLoaderBuilder`的子类，并可以通过`#customLoader`应用到`ModelBuilder`。传入的工厂方法创建一个新的加载器构建器，可以进行配置。当所有更改完成后，自定义加载器可以通过`CustomLoaderBuilder#end`返回到`ModelBuilder`。

模型构建器                       | 工厂方法 | 描述
:---:                               | :---:          | :---
`DynamicFluidContainerModelBuilder` | `#begin`       | 生成指定流体的桶模型。
`CompositeModelBuilder`             | `#begin`       | 生成一个由多个模型组成的模型。
`ItemLayersModelBuilder`            | `#begin`       | 生成一个“item/generated”模型的Forge实现。
`SeparateTransformsModelBuilder`    | `#begin`       | 根据指定的[变换]生成一个模型。
`ObjModelBuilder`                   | `#begin`       | 生成一个[OBJ模型][obj]。

```java
// 对于某个BlockModelBuilder构建器
builder.customLoader(ObjModelBuilder::begin) // 自定义加载器“forge:obj”
  .modelLocation(modLoc("models/block/model.obj")) // 设置OBJ模型的位置
  .flipV(true) // 翻转提供的.mtl纹理中的V坐标
  .end() // 完成自定义加载器配置
.texture("particle", mcLoc("block/dirt")) // 将粒子纹理设置为泥土
.texture("texture0", mcLoc("block/dirt")); // 将“texture0”纹理设置为泥土
```

自定义模型加载器构建器
----------------------------

通过扩展`CustomLoaderBuilder`可以创建自定义加载器构建器。构造函数仍可以具有`protected`的可见性，并将`ResourceLocation`硬编码为通过`ModelEvent$RegisterGeometryLoaders#register`注册的加载器id。然后可以通过静态工厂方法或构造函数初始化构建器。

```java
public class ExampleLoaderBuilder<T extends ModelBuilder<T>> extends CustomLoaderBuilder<T> {
  public static <T extends ModelBuilder<T>> ExampleLoaderBuilder<T> begin(T parent, ExistingFileHelper existingFileHelper) {
    return new ExampleLoaderBuilder<>(parent, existingFileHelper);
  }

  protected ExampleLoaderBuilder(T parent, ExistingFileHelper existingFileHelper) {
    super(new ResourceLocation(MOD_ID, "example_loader"), parent, existingFileHelper);
  }
}
```

之后，加载器指定的任何配置应被添加为可链式调用的方法。

```java
// 在ExampleLoaderBuilder中
public ExampleLoaderBuilder<T> exampleInt(int example) {
  // 设置int
  return this;
}

public ExampleLoaderBuilder<T> exampleString(String example) {
  // 设置字符串
  return this;
}
```

如果指定了任何额外的配置，则应覆盖`#toJson`以写入额外的属性。

```java
// 在ExampleLoaderBuilder中
@Override
public JsonObject toJson(JsonObject json) {
  json = super.toJson(json); // 处理基础加载器属性
  // 编码自定义加载器属性
  return json;
}
```

自定义模型提供者
----------------------

自定义模型提供者需要一个`ModelBuilder`子类，定义要生成的模型的基础，以及一个`ModelProvider`子类用于生成模型。

`ModelBuilder`子类包含可专门应用于这些类型模型的任何特殊属性（例如物品模型可以有重写）。如果添加了任何其他属性，则需要覆盖`#toJson`以写入其他信息。

```java
public class ExampleModelBuilder extends ModelBuilder<ExampleModelBuilder> {
  // ...
}
```

`ModelProvider`子类不需要特殊逻辑。构造函数应硬编码`models`文件夹内的子目录和代表待生成模型的`ModelBuilder`。

```java
public class ExampleModelProvider extends ModelProvider<ExampleModelBuilder> {

  public ExampleModelProvider(PackOutput output, String modid, ExistingFileHelper existingFileHelper) {
    // 如果没有在`#getBuilder`中指定`modid`，模型将生成到'assets/<modid>/models/example'
    super(output, modid, "example", ExampleModelBuilder::new, existingFileHelper);
  }
}
```

自定义模型消费者
----------------------

自定义模型消费者类似于[`BlockStateProvider`][blockstateprovider]，可以通过手动生成模型创建。应指定并提供生成模型的`ModelProvider`子类。

```java
public class ExampleModelConsumerProvider implements IDataProvider {

  public ExampleModelConsumerProvider(PackOutput output, String modid, ExistingFileHelper existingFileHelper) {
    this.example = new ExampleModelProvider(output, modid, existingFileHelper);
  }
}
```

一旦数据提供者开始运行，`ModelProvider`子类内的模型就可以使用`ModelProvider#generateAll`生成。

```java
// 在ExampleModelConsumerProvider中
@Override
public CompletableFuture<?> run(CachedOutput cache) {
  // 填充模型提供者
  CompletableFuture<?> exampleFutures = this.example.generateAll(cache); // 生成模型

  // 运行逻辑并创建用于写入文件的CompletableFuture(s)。
  // ...

  // 假设我们有一个新的CompletableFuture providerFuture
  return CompletableFuture.allOf(exampleFutures, providerFuture);
}
```

[provider]: #模型提供者
[models]: ../../resources/client/models/index.md
[datagen]: ../index.md#数据提供者
[efh]: ../index.md#现有文件
[loader]: #自定义模型加载器构建器
[color]: ../../resources/client/models/tinting.md#blockcoloritemcolor
[overrides]: ../../resources/client/models/itemproperties.md
[blockstateprovider]: #方块状态提供者
[blockstate]: https://minecraft.wiki/w/Tutorials/Models#Block_states
[blockmodels]: #blockmodelprovider
[itemmodels]: #itemmodelprovider
[properties]: ../../blocks/states.md#implementing-block-states
[transform]: ../../rendering/modelloaders/transform.md
[obj]: ../../rendering/modelloaders/index.md#wavefront-obj-models