---
title: 服务端-条件加载数据
order: 13
toc: content
group:
  title: 资源包
  order: 9995
---
条件加载数据
=========================

有时候，模组作者可能希望在不明确将其他模组设为依赖项的情况下，使用其他模组的信息来包含数据驱动的对象。其他情况下，可能需要在某些对象存在时将其替换为其他模组的条目。通过条件子系统可以实现这种需求。

实现方式
---------------

目前，条件加载已经在配方和进阶中实现。对于任何条件配方或进阶，都会加载一个条件与数据对的列表。如果列表中数据的指定条件为真，则返回该数据。否则，数据将被丢弃。

```js
{
  // 由于配方可以拥有自定义的序列化器，因此需要指定类型
  // 进阶则不需要该类型
  "type": "forge:conditional",
  
  "recipes": [ // 对于进阶则为 'advancements'
    {
      // 要检查的条件
      "conditions": [
        // 列表中的条件是以 AND 连接的
        {
          // 条件1
        },
        {
          // 条件2
        }
      ],
      "recipe": { // 对于进阶则为 'advancement'
        // 如果所有条件都成功，则使用此配方
      }
    },
    {
      // 如果之前的条件失败，则检查下一个条件
    },
  ]
}
```

条件加载的数据还可以通过 `ConditionalRecipe$Builder` 和 `ConditionalAdvancement$Builder` [数据生成][datagen].

条件
----------

通过将 `type` 设置为 [`IConditionSerializer#getID`][serializer] 指定的条件名称来指定条件。

### 真和假

布尔条件不包含任何数据，并返回条件的预期值。它们以 `forge:true` 和 `forge:false` 表示。

```js
// 对某些条件
{
  // 将始终返回真（或对于 'forge:false' 返回假）
  "type": "forge:true"
}
```

### Not, And 和 Or

布尔运算符条件包括被操作的条件，并应用以下逻辑。它们以 `forge:not`、`forge:and` 和 `forge:or` 表示。

```js
// 对某些条件
{
  // 反转存储条件的结果
  "type": "forge:not",
  "value": {
    // 一个条件
  }
}
```

```js
// 对某些条件
{
  // 将存储的条件进行 AND 操作（对于 'forge:or' 则为 OR 操作）
  "type": "forge:and",
  "values": [
    {
      // 第一个条件
    },
    {
      // 要进行 AND 操作（对于 'forge:or' 则为 OR 操作）的第二个条件
    }
  ]
}
```

### 模组加载

`ModLoadedCondition` 在指定的具有给定 ID 的模组加载到当前应用程序中时返回真。通过 `forge:mod_loaded` 表示。

```js
// 对某些条件
{
  "type": "forge:mod_loaded",
   // 如果 'examplemod' 已加载则返回真
  "modid": "examplemod"
}
```

### 项目存在

`ItemExistsCondition` 在当前应用程序中注册了给定项时返回真。通过 `forge:item_exists` 表示。

```js
// 对某些条件
{
  "type": "forge:item_exists",
   // 如果 'examplemod:example_item' 已注册则返回真
  "item": "examplemod:example_item"
}
```

### 标签为空

`TagEmptyCondition` 当给定的项目标签中没有项目时返回真。通过 `forge:tag_empty` 表示。

```js
// 对某些条件
{
  "type": "forge:tag_empty",
   // 如果 'examplemod:example_tag' 是没有条目的项目标签，则返回真
  "tag": "examplemod:example_tag"
}
```

创建自定义条件
--------------------------

可以通过实现 `ICondition` 及其相关的 `IConditionSerializer` 来创建自定义条件。

### ICondition

任何条件仅需实现两个方法：

方法 | 描述
:---:  | :---
getID  | 条件的注册名。必须等于 [`IConditionSerializer#getID`][serializer]。仅用于 [数据生成][datagen]。
test   | 如果条件满足，则返回真。

!!! 注意
    每个 `#test` 都可访问一些表示游戏状态的 `IContext`。目前，只有标签可从注册表中获取。

### IConditionSerializer

序列化器需要实现三个方法：

方法 | 描述
:---:  | :---
getID  | 条件的注册名。必须等于 [`ICondition#getID`][condition]。
read   | 从 JSON 读取条件数据。
write  | 将给定的条件数据写入 JSON。

!!! 注意
    条件序列化器不负责写入或读取序列化器的类型，这类似于 Minecraft 中的其他序列化器实现。

之后，应声明一个静态实例以保存初始化的序列化器，然后使用 `CraftingHelper#register` 在 `RecipeSerializer` 的 `RegisterEvent` 或 `FMLCommonSetupEvent` 中注册。

```java
// 在某个序列化器类中
public static final ExampleConditionSerializer INSTANCE = new ExampleConditionSerializer();

// 在某个处理类中
public void registerSerializers(RegisterEvent event) {
  event.register(ForgeRegistries.Keys.RECIPE_SERIALIZERS,
    helper -> CraftingHelper.register(INSTANCE)
  );
}
```

!!! 重要
    如果使用 `FMLCommonSetupEvent` 来注册条件序列化器，则必须通过 `FMLCommonSetupEvent#enqueueWork` 将其入队到同步工作队列中，因为 `CraftingHelper#register` 不是线程安全的。

[datagen]: ../../datagen/server/recipes.md
[serializer]: #iconditionserializer
[condition]: #icondition