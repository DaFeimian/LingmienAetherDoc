---
title: 服务端-配方生成
order: 3
toc: content
group:
  title: 数据生成器
  order: 9996
---
配方生成
=================

通过继承 `RecipeProvider` 并实现 `#buildRecipes` 方法，可以为一个 mod 生成配方。一旦消费者接受了一个 `FinishedRecipe` 视图，此配方就被提供用于数据生成。`FinishedRecipe` 可以手动创建并提供，或者为了方便，可使用 `RecipeBuilder` 创建。

实现后，必须将提供者[添加][datagen]到 `DataGenerator` 中。

```java
// 在 MOD 事件总线
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 告诉生成器仅在生成服务器数据时运行
        event.includeServer(),
        MyRecipeProvider::new
    );
}
```

`RecipeBuilder`
---------------

`RecipeBuilder` 是一个方便的实现用于创建 `FinishedRecipe` 来生成。它提供了解锁、分组、保存和获取配方结果的基本定义。通过 `#unlockedBy`、`#group`、`#save` 和 `#getResult` 分别完成这些操作。

!!! 注意
    在配方中，[`ItemStack` 输出][stack] 在原版配方构建器中不受支持。必须以不同方式构建 `FinishedRecipe`，以便现有的原版配方序列化器生成此数据。

!!! 警告
    生成的物品结果必须指定有效的 `RecipeCategory`；否则，将抛出 `NullPointerException`。

除 [`SpecialRecipeBuilder`] 之外的所有配方构建器都需要指定进度标准。如果玩家之前使用过该配方，所有配方都会生成一个解锁条件。然而，必须指定一个额外的条件，使玩家无需任何事先知识即可获得配方。如果指定的任何条件为真，玩家将获得配方书中的配方。

!!! 小贴士
    配方条件通常使用 `InventoryChangeTrigger` 在用户的库存中存在某些物品时解锁其配方。

### ShapedRecipeBuilder

`ShapedRecipeBuilder` 用于生成形状配方。构建器可以通过 `#shaped` 初始化。可以在保存之前指定配方组、输入符号模式、成分的符号定义及配方的解锁条件。

```java
// 在 RecipeProvider#buildRecipes(writer)
ShapedRecipeBuilder builder = ShapedRecipeBuilder.shaped(RecipeCategory.MISC, result)
  .pattern("a a") // 创建配方模式
  .define('a', item) // 定义符号代表的内容
  .unlockedBy("criteria", criteria) // 配方的解锁方式
  .save(writer); // 添加数据到构建器
```

#### 额外验证检查

在构建之前，形状配方会进行一些额外验证检查：

* 必须定义一个模式并至少包含一个以上的物品。
* 所有模式行必须具有相同的宽度。
* 符号不能定义超过一次。
* 空格字符（`' '`）保留用于表示槽中无物品，因此不能定义。
* 用户定义的所有符号必须在模式中使用。

### ShapelessRecipeBuilder

`ShapelessRecipeBuilder` 用于生成无序配方。构建器可以通过 `#shapeless` 初始化。可以在保存之前指定配方组、输入成分及配方的解锁条件。

```java
// 在 RecipeProvider#buildRecipes(writer)
ShapelessRecipeBuilder builder = ShapelessRecipeBuilder.shapeless(RecipeCategory.MISC, result)
  .requires(item) // 将物品加入配方
  .unlockedBy("criteria", criteria) // 配方的解锁方式
  .save(writer); // 添加数据到构建器
```

### SimpleCookingRecipeBuilder

`SimpleCookingRecipeBuilder` 用于生成熔炼、爆破、熏烤和营火烹饪配方。此外，使用 `SimpleCookingSerializer` 的自定义烹饪配方也可以通过此构建器进行数据生成。可以通过` #smelting`、`#blasting`、`#smoking`、`#campfireCooking` 或 `#cooking` 分别初始化构建器。可以在保存之前指定配方组及配方的解锁条件。

```java
// 在 RecipeProvider#buildRecipes(writer)
SimpleCookingRecipeBuilder builder = SimpleCookingRecipeBuilder.smelting(input, RecipeCategory.MISC, result, experience, cookingTime)
  .unlockedBy("criteria", criteria) // 配方的解锁方式
  .save(writer); // 添加数据到构建器
```

### SingleItemRecipeBuilder

`SingleItemRecipeBuilder` 用于生成切石机配方。此外，使用类似 `SingleItemRecipe$Serializer` 的序列化器的自定义单物品配方也可以通过此构建器进行数据生成。可以通过 `#stonecutting` 或构造函数初始化构建器。可以在保存之前指定配方组及配方的解锁条件。

```java
// 在 RecipeProvider#buildRecipes(writer)
SingleItemRecipeBuilder builder = SingleItemRecipeBuilder.stonecutting(input, RecipeCategory.MISC, result)
  .unlockedBy("criteria", criteria) // 配方的解锁方式
  .save(writer); // 添加数据到构建器
```

非`RecipeBuilder`构建器
----------------------------

由于缺少所有上述配方使用的功能，一些配方构建器不实现 `RecipeBuilder`。

### SmithingTransformRecipeBuilder

`SmithingTransformRecipeBuilder` 用于生成改造物品的锻造配方。此外，使用类似 `SmithingTransformRecipe$Serializer` 的序列化器的自定义配方也可以通过此构建器进行数据生成。可以通过 `#smithing` 或构造函数初始化构建器。可以在保存之前指定配方的解锁条件。

```java
// 在 RecipeProvider#buildRecipes(writer)
SmithingTransformRecipeBuilder builder = SmithingTransformRecipeBuilder.smithing(template, base, addition, RecipeCategory.MISC, result)
  .unlocks("criteria", criteria) // 配方的解锁方式
  .save(writer, name); // 添加数据到构建器
```

### SmithingTrimRecipeBuilder

`SmithingTrimRecipeBuilder` 用于生成盔甲细化的锻造配方。此外，使用类似 `SmithingTrimRecipe$Serializer` 的序列化器的自定义升级配方也可以通过此构建器进行数据生成。可以通过 `#smithingTrim` 或构造函数初始化构建器。可以在保存之前指定配方的解锁条件。

```java
// 在 RecipeProvider#buildRecipes(writer)
SmithingTrimRecipe builder = SmithingTrimRecipe.smithingTrim(template, base, addition, RecipeCategory.MISC)
  .unlocks("criteria", criteria) // 配方的解锁方式
  .save(writer, name); // 添加数据到构建器
```

### SpecialRecipeBuilder

`SpecialRecipeBuilder` 用于生成动态配方（如染色盔甲、烟花等）无法轻易受限于配方 JSON 格式的空 JSON。可通过 `#special` 初始化构建器。

```java
// 在 RecipeProvider#buildRecipes(writer)
SpecialRecipeBuilder.special(dynamicRecipeSerializer)
  .save(writer, name); // 添加数据到构建器
```

条件配方
-------------------

通过 `ConditionalRecipe$Builder` 也可以数据生成[条件配方][conditional]。构建器可以使用 `#builder` 获取。

每个配方的条件通过首先调用 `#addCondition` 指定，然后在指定所有条件后调用 `#addRecipe`。程序员可以根据需要重复此过程多次。

在指定所有配方后，可以使用 `#generateAdvancement` 为每个配方添加进度。可选地，可以使用 `#setAdvancement` 设置条件进度。

```java
// 在 RecipeProvider#buildRecipes(writer)
ConditionalRecipe.builder()
  // 为配方添加条件
  .addCondition(...)
  // 添加当条件为真时返回的配方
  .addRecipe(...)

  // 为下一个配方添加下一个条件
  .addCondition(...)
  // 添加当下一个条件为真时返回的下一个配方
  .addRecipe(...)

  // 创建条件进度，使用上述配方中的条件和解锁进度
  .generateAdvancement()
  .build(writer, name);
```

### IConditionBuilder

为了简化为条件配方添加条件，而不必手动构建每个条件实例的实例，扩展的 `RecipeProvider` 可以实现 `IConditionBuilder`。此接口增加了方法来轻松构造条件实例。

```java
// 在 ConditionalRecipe$Builder#addCondition
(
  // 如果 'examplemod:example_item'
  // 或 'examplemod:example_item2' 存在
  // 且非 FALSE

  // 方法由 IConditionBuilder 定义
  and( 
    or(
      itemExists("examplemod", "example_item"),
      itemExists("examplemod", "example_item2")
    ),
    not(
      FALSE()
    )
  )
)
```

自定义配方序列化器
-------------------------

通过创建可以构造 `FinishedRecipe` 的构建器，可以数据生成自定义配方序列化器。结束的配方将配方数据及其解锁进度（如果存在）编码为 JSON。此外，还指定了配方的名称和序列化器，以便知道写入的位置以及加载时解码对象的方式。一旦构建了 `FinishedRecipe`，只需将其传递给由 `RecipeProvider#buildRecipes` 提供的 `Consumer` 即可。

!!! 小贴士
    `FinishedRecipe`s 功能足够灵活，任何对象转换都可以数据生成，而不仅仅是物品。

[datagen]: ../index.md#data-providers
[ingredients]: ../../resources/server/recipes/ingredients.md#forge-types
[stack]: ../../resources/server/recipes/index.md#recipe-itemstack-result
[conditional]: ../../resources/server/conditional.md
[special]: #specialrecipebuilder