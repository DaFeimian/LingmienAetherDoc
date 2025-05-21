---
title: 服务端-配方-介绍
order: 5
toc: content
group:
  title: 资源包
  order: 9995
---
配方
=======

在Minecraft世界中，配方是一种将若干对象转化为其他对象的方法。虽然原版系统仅涉及物品转换，但整个系统可以扩展以使用程序员创建的任何对象。

数据驱动的配方
-------------------

原版中的大多数配方实现都是通过JSON数据驱动的。这意味着创建新配方不需要模组，只需要一个[数据包][datapack]。如何在模组的`resources`文件夹中创建和放置这些配方的完整列表可以在[Minecraft Wiki][wiki]上找到。

可以通过完成一个[进度][advancement]作为奖励，在配方书中获得一个配方。配方进度始终以`minecraft:recipes/root`作为父级，以免出现在进度屏幕上。获取配方进度的默认标准是检查用户是否通过使用一次配方或通过类似`/recipe`的命令获得了该配方：

```js
// 在某些配方进度json中
"has_the_recipe": { // 标准标签
  // 成功条件：使用了examplemod:example_recipe
  "trigger": "minecraft:recipe_unlocked",
  "conditions": {
    "recipe": "examplemod:example_recipe"
  }
}
//...
"requirements": [
  [
    "has_the_recipe"
    // ... 其他可以通过逻辑或解锁配方的标准标签
  ]
]
```

数据驱动的配方及其解锁进度可以通过`RecipeProvider`[生成][datagen]。

配方管理器
--------------

配方是通过`RecipeManager`加载和存储的。与获取可用配方相关的任何操作都由此管理器处理。有两个重要的方法需要了解：

 方法          | 描述
 :---:        | :---
`getRecipeFor`  | 获取与当前输入匹配的第一个配方。
`getRecipesFor` | 获取与当前输入匹配的所有配方。

每个方法都接受一个`RecipeType`，它表示应用配方的方法（合成、熔炼等），一个`Container`用于保存输入的配置，以及随同容器传递给`Recipe#matches`的当前级别。

!!! 重要
    Forge提供了`RecipeWrapper`实用类，它扩展了`Container`以封装在`IItemHandler`周围并将其传递给需要`Container`参数的方法。

    ```java
    // 在某个方法中使用IItemHandlerModifiable handler
    recipeManger.getRecipeFor(RecipeType.CRAFTING, new RecipeWrapper(handler), level);
    ```

附加功能
-------------------

Forge为配方架构及其实现提供了一些附加行为，以便更好地控制系统。

### 配方物品堆结果

除`minecraft:stonecutting`配方外，所有原版配方序列化器都会扩展`result`标签，以完整的`ItemStack`作为`JsonObject`，而不只是某些情况下的物品名称和数量。

```js
// 在某些配方JSON中
"result": {
  // 注册表中要作为结果给出的物品名称
  "item": "examplemod:example_item",
  // 返回物品的数量
  "count": 4,
  // 堆的标签数据，也可以是字符串
  "nbt": {
      // 在这里添加标签数据
  }
}
```

!!! 注意
    `nbt`标签可以是一个字符串，包含字符串化的NBT（或SNBT），用于无法正确表示为JSON对象的数据（如`IntArrayTag`）。

### 条件配方

配方及其解锁进度可以根据所呈现的信息（模组已加载、物品存在等）[有条件地加载和默认][conditional]。

### 较大合成网格

默认情况下，原版声明合成网格的最大宽度和高度为3x3的方格。这可以通过在`FMLCommonSetupEvent`中调用`ShapedRecipe#setCraftingSize`并设置新的宽度和高度来扩展。

!!! 警告
    `ShapedRecipe#setCraftingSize` **不是**线程安全的。因此，应该通过`FMLCommonSetupEvent#enqueueWork`将它排入同步工作队列中。

较大的配方合成网格可以通过[数据生成][datagen]。

### 成分类型

添加了一些额外的[成分类型][ingredients]，允许配方有检查标签数据的输入或将多个成分合并为单个输入检查器。

[datapack]: https://minecraft.wiki/w/Data_pack
[wiki]: https://minecraft.wiki/w/Recipe
[advancement]: ../advancements.md
[datagen]: ../../../datagen/server/recipes.md
[cap]: ../../../datastorage/capabilities.md
[conditional]: ../conditional.md#implementations
[ingredients]: ./ingredients.md#forge-types