---
title: 服务端-配方-原料
order: 7
toc: content
group:
  title: 资源包
  order: 9995
---
原料
===========

`Ingredient`是一种用于基于物品作为输入的谓词处理器，用于检查某个`ItemStack`是否满足条件以成为配方中的有效输入。所有[原版合成配方][recipes]使用一个`Ingredient`或一个`Ingredient`列表，然后将其合并为一个单一的`Ingredient`。

自定义原料
------------------

通过将`type`设置为[原料序列化器][serializer]的名称，可以指定自定义原料，但[复合原料][compound]除外。未指定类型时，`type`默认为原版原料`minecraft:item`。自定义原料也可以在[数据生成][datagen]中轻松使用。

### Forge 类型

Forge 提供了一些额外的`Ingredient`类型供程序员实现。

#### CompoundIngredient

虽然它们在功能上是相同的，但复合原料取代了在配方中实现原料列表的方式。它们作为一个集合 OR 工作，其中传入的堆栈必须在至少一个提供的原料中。这一改变是为了允许自定义原料在列表中正常工作。因此，**不需要指定类型**。

```js
// 对于某个输入
[
  // 必须至少有一个这些原料的匹配以成功
  {
    // 原料
  },
  {
    // 自定义原料
    "type": "examplemod:example_ingredient"
  }
]
```

#### StrictNBTIngredient

`StrictNBTIngredient`精确比较`ItemStack`上的物品、损坏值和共享标签（由`IForgeItem#getShareTag`定义）。可以通过将`type`指定为`forge:nbt`来使用。

```js
// 对于某个输入
{
  "type": "forge:nbt",
  "item": "examplemod:example_item",
  "nbt": {
    // 添加 nbt 数据（必须与堆栈上的完全匹配）
  }
}
```

### PartialNBTIngredient

`PartialNBTIngredient`是[`StrictNBTIngredient`][nbt]的一个宽松版本，因为它们与单个或一组物品进行比较，并且仅比较共享标签中指定的键（由`IForgeItem#getShareTag`定义）。可以通过将`type`指定为`forge:partial_nbt`来使用。

```js
// 对于某个输入
{
  "type": "forge:partial_nbt",

  // 必须指定'item'或'items'
  // 如果两者都指定了，则只读取'item'
  "item": "examplemod:example_item",
  "items": [
    "examplemod:example_item",
    "examplemod:example_item2"
    // ...
  ],

  "nbt": {
    // 仅检查'key1'和'key2'的等价性
    // 堆栈中的所有其他键将不被检查
    "key1": "data1",
    "key2": {
      // 数据 2
    }
  }
}
```

### IntersectionIngredient

`IntersectionIngredient`作为一个集合 AND 工作，其中传入的堆栈必须匹配所有提供的原料。必须至少提供两个原料。这可以通过将`type`指定为`forge:intersection`来使用。

```js
// 对于某个输入
{
  "type": "forge:intersection",

  // 所有这些原料必须返回true才能成功
  "children": [
    {
      // 原料 1
    },
    {
      // 原料 2
    }
    // ...
  ]
}
```

### DifferenceIngredient

`DifferenceIngredient`作为一个集合减法（SUB）工作，其中传入的堆栈必须匹配第一个原料，但不能匹配第二个原料。可以通过将`type`指定为`forge:difference`来使用。

```js
// 对于某个输入
{
  "type": "forge:difference",
  "base": {
    // 堆栈所在的原料
  },
  "subtracted": {
    // 堆栈不在的原料
  }
}
```

创建自定义原料
---------------------------

自定义原料可以通过为创建的`Ingredient`子类实现`IIngredientSerializer`来创建。

!!! 提示
    自定义原料应该继承`AbstractIngredient`，因为它提供了一些有用的抽象，便于实现。

### 原料子类

对于每个原料子类，有三个重要的方法需要实现：

 方法         | 描述
:---:      | :---
getSerializer | 返回用于读取和写入原料的[序列化器]。
test        | 如果输入对该原料有效，则返回 true。
isSimple    | 如果原料与堆栈的标签匹配，则返回 false。`AbstractIngredient`子类需要定义此行为，而`Ingredient`子类默认返回`true`。

所有其他定义的方法留给读者根据需要使用，以实现原料子类。

### IIngredientSerializer

`IIngredientSerializer`子类型必须实现三个方法：

 方法         | 描述
:---:       | :---
parse (JSON) | 将`JsonObject`转换为`Ingredient`。
parse (Network) | 读取网络缓冲区以解码`Ingredient`。
write       | 将`Ingredient`写入网络缓冲区。

此外，`Ingredient`子类应实现`Ingredient#toJson`以用于[数据生成][datagen]。`AbstractIngredient`子类使`#toJson`成为一个抽象方法，要求实现该方法。

之后，应该声明一个静态实例以保存初始化的序列化器，然后使用`CraftingHelper#register`在`RecipeSerializer`的`RegisterEvent`期间或在`FMLCommonSetupEvent`期间注册。`Ingredient`子类在`Ingredient#getSerializer`中返回序列化器的静态实例。

```java
// 在某个序列化器类中
public static final ExampleIngredientSerializer INSTANCE = new ExampleIngredientSerializer();

// 在某个处理器类中
public void registerSerializers(RegisterEvent event) {
  event.register(ForgeRegistries.Keys.RECIPE_SERIALIZERS,
    helper -> CraftingHelper.register(registryName, INSTANCE)
  );
}

// 在某个原料子类中
@Override
public IIngredientSerializer<? extends Ingredient> getSerializer() {
  return INSTANCE;
}
```

!!! 提示
    如果使用`FMLCommonSetupEvent`注册原料序列化器，必须通过`FMLCommonSetupEvent#enqueueWork`将其入队到同步工作队列，因为`CraftingHelper#register`不是线程安全的。

[recipes]: https://minecraft.wiki/w/Recipe#List_of_recipe_types
[nbt]: #strictnbtingredient
[serializer]: #iingredientserializer
[compound]: #compoundingredient
[datagen]: ../../../datagen/server/recipes.md