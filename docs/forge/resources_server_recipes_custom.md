---
title: 服务端-配方-自定义配方
order: 6
toc: content
group:
  title: 资源包
  order: 9995
---
自定义配方
=============

每个配方定义由三个组件组成：持有数据并通过提供的输入处理执行逻辑的 `Recipe` 实现、代表配方使用类别或上下文的 `RecipeType`，以及负责解码和网络通信配方数据的 `RecipeSerializer`。如何选择使用配方取决于实现者。

配方
------

`Recipe` 接口描述了配方数据和执行逻辑，包括匹配输入和提供相关结果。由于配方子系统默认执行物品转换，输入通过 `Container` 子类型提供。

!!! 重要
    传递给配方的 `Container` 应视为其内容不可变。任何可变操作应在输入的副本上通过 `ItemStack#copy` 执行。

要从管理器获取配方实例，`#matches` 必须返回 true。此方法会针对提供的容器检查相关输入是否有效。可以通过调用 `Ingredient#test` 来验证 `Ingredient`。

如果选择了配方，则通过 `#assemble` 构建，该过程可能使用来自输入的数据来创建结果。

!!! 提示
    `#assemble` 应始终生成唯一的 `ItemStack`。如果不确定 `#assemble` 是否这样做，请在返回结果前调用 `ItemStack#copy`。

大多数其他方法纯粹用于与配方书集成。

```java
public record ExampleRecipe(Ingredient input, int data, ItemStack output) implements Recipe<Container> {
  // 在此实现方法
}
```

!!! 注意
    虽然在上述示例中使用了 record，但在您自己的实现中并不是必需的。

配方类型
----------

`RecipeType` 负责定义配方将被使用的类别或上下文。例如，如果一个配方要在熔炉中冶炼，则它的类型为 `RecipeType#SMELTING`。在高炉中冶炼的类型为 `RecipeType#BLASTING`。

如果现有类型没有符合的上下文，则必须 [注册][forge] 新的 `RecipeType`。

然后，在新的配方子类型中，必须通过 `Recipe#getType` 返回 `RecipeType` 实例。

```java
// 对于某个 RegistryObject<RecipeType> EXAMPLE_TYPE
// 在 ExampleRecipe 中
@Override
public RecipeType<?> getType() {
  return EXAMPLE_TYPE.get();
}
```

配方序列化器
----------------

`RecipeSerializer` 负责解码 JSON 并在网络上传输与配方子类型相关的数据。序列化器解码的每个配方都作为一个唯一的实例保存在 `RecipeManager` 中。一个 `RecipeSerializer` 必须被 [注册][forge]。

一个 `RecipeSerializer` 只需实现三个方法：

 方法       | 描述
 :---:      | :---
fromJson    | 将 JSON 解码为 `Recipe` 子类型。
toNetwork   | 将 `Recipe` 编码到缓冲区以发送给客户端。不需要编码配方标识符。
fromNetwork | 从服务器发送的缓冲区解码 `Recipe`。不需要解码配方标识符。

然后，在新的配方子类型中，必须通过 `Recipe#getSerializer` 返回 `RecipeSerializer` 实例。

```java
// 对于某个 RegistryObject<RecipeSerializer> EXAMPLE_SERIALIZER
// 在 ExampleRecipe 中
@Override
public RecipeSerializer<?> getSerializer() {
  return EXAMPLE_SERIALIZER.get();
}
```

!!! 提示
    有一些有用的方法可以简化配方数据的读写。`Ingredient` 可以使用 `#fromJson`, `#toNetwork`, 和 `#fromNetwork`，而 `ItemStack` 可以使用 `CraftingHelper#getItemStack`, `FriendlyByteBuf#writeItem`, 和 `FriendlyByteBuf#readItem`。

构建 JSON
-----------------

自定义配方 JSON 存储在与其他[配方][json]相同的地方。指定的 `type` 应表示 **配方序列化器** 的注册名称。序列化器在解码时指定任何附加数据。

```js
{
  // 自定义序列化器注册名称
  "type": "examplemod:example_serializer",
  "input": {
    // 一些输入材料
  },
  "data": 0, // 配方所需的一些数据
  "output": {
    // 一些输出堆
  }
}
```

非物品逻辑
--------------

如果配方的输入或结果不使用物品，那么 `RecipeManager` 提供的常规方法将无用。相反，要在自定义 `Recipe` 实例中添加一个额外的方法来测试配方的有效性和/或提供结果。从那里，可以通过 `RecipeManager#getAllRecipesFor` 获取所有特定 `RecipeType` 的配方，并使用新实现的方法进行检查和/或提供结果。

```java
// 在某个配方子实现 ExampleRecipe 中

// 检查位置的方块是否匹配存储的数据
boolean matches(Level level, BlockPos pos);

// 创建方块状态以设置指定位置的方块
BlockState assemble(RegistryAccess access);

// 在某个管理类中
public Optional<ExampleRecipe> getRecipeFor(Level level, BlockPos pos) {
  return level.getRecipeManager()
    .getAllRecipesFor(exampleRecipeType) // 获取所有配方
    .stream() // 查看所有配方类型
    .filter(recipe -> recipe.matches(level, pos)) // 检查配方输入是否有效
    .findFirst(); // 查找输入匹配的第一个配方
}
```

数据生成
---------------

无论输入或输出数据如何，所有自定义配方都可以用 `RecipeProvider` 创建为 [数据生成][datagen] 中的 `FinishedRecipe`。

[forge]: ../../../concepts/registries.md#methods-for-registering
[json]: https://minecraft.wiki/w/Recipe#JSON_format
[manager]: ./index.md#recipe-manager
[datagen]: ../../../datagen/server/recipes.md#custom-recipe-serializers