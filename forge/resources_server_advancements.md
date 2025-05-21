---
title: 服务端-进度
order: 11
toc: content
group:
  title: 资源包
  order: 9995
---
进度
============

进度是玩家可以完成的任务，可能推动游戏的进展。进度可以根据玩家直接参与的任何动作触发。

在原版中的所有进度实现都是通过JSON进行数据驱动的。这意味着不需要模组就可以创建新的进度，只需要一个[数据包][datapack]。关于如何在模组的`resources`中创建和放置这些进度的完整列表可以在[Minecraft Wiki][wiki]上找到。此外，进度可以根据现有的信息（如模组加载，物品存在等）[有条件地加载和默认][conditional]。

进度标准
--------------------

要解锁一个进度，必须满足指定的标准。标准是通过触发器跟踪的，当执行特定动作时，触发器会执行：击杀一个实体，更改一个物品栏，繁殖动物等。每当一个进度被加载到游戏中时，定义的标准会被读取并作为监听器添加到触发器中。随后一个触发器函数被调用（通常命名为`#trigger`），它会检查所有监听器是否满足进度标准的条件。进度的标准监听器只有在完成所有要求之后才会被删除。

要求定义为一个字符串数组的数组，表示进度中指定的标准的名称。当一个字符串数组的标准被满足时，进度就完成了：

```js
// 在某个进度JSON中

// 列出定义的要满足的标准
"criteria": {
  "example_criterion1": { /*...*/ },
  "example_criterion2": { /*...*/ },
  "example_criterion3": { /*...*/ },
  "example_criterion4": { /*...*/ }
},

// 只有在以下情况之一满足时，才能解锁此进度
// - 标准1和2被满足
// 或
// - 标准3和4被满足
"requirements": [
  [
    "example_criterion1",
    "example_criterion2"
  ],
  [
    "example_criterion3",
    "example_criterion4"
  ]
]
```

原版中的标准触发器列表可以在`CriteriaTriggers`中找到。此外，JSON格式在[Minecraft Wiki][triggers]上定义。

### 自定义标准触发器

可以通过为创建的`AbstractCriterionTriggerInstance`子类实现`SimpleCriterionTrigger`来创建自定义标准触发器。

### AbstractCriterionTriggerInstance子类

`AbstractCriterionTriggerInstance`表示在`criteria`对象中定义的单个标准。触发器实例负责保持定义的条件，返回输入是否符合条件，并将实例写入JSON进行数据生成。

条件通常通过构造函数传入。`AbstractCriterionTriggerInstance`的超级构造函数要求实例定义触发器的注册名称和玩家必须满足的条件作为`ContextAwarePredicate`。触发器的注册名称应直接提供给超级构造函数，而玩家的条件应作为构造函数参数。

```java
// 其中ID是触发器的注册名称
public ExampleTriggerInstance(ContextAwarePredicate player, ItemPredicate item) {
  super(ID, player);
  // 存储必须满足的物品条件
}
```

!!! 注意
    通常，触发器实例有一个静态构造函数，允许这些实例为数据生成轻松创建。可以静态导入这些静态工厂方法而不是类本身。

    ```java
    public static ExampleTriggerInstance instance(ContextAwarePredicate player, ItemPredicate item) {
      return new ExampleTriggerInstance(player, item);
    }
    ```

此外，应该重写`#serializeToJson`方法。该方法应将实例的条件添加到其他JSON数据中。

```java
@Override
public JsonObject serializeToJson(SerializationContext context) {
  JsonObject obj = super.serializeToJson(context);
  // 将条件写入json
  return obj;
}
```

最后，应添加一个方法，接受当前数据状态并返回用户是否满足必要条件。玩家的条件已经通过`SimpleCriterionTrigger#trigger(ServerPlayer, Predicate)`检查。大多数触发器实例调用此方法为`#matches`。

```java
// 由于每个实例的此方法都是独特的，因此不被重写
public boolean matches(ItemStack stack) {
  // 因为ItemPredicate与堆栈匹配，所以堆栈是输入
  return this.item.matches(stack);
}
```

### SimpleCriterionTrigger

`SimpleCriterionTrigger<T>`子类，其中`T`是触发器实例的类型，负责指定触发器的注册名称，创建触发器实例，以及检查触发器实例并在成功时运行附加监听器的方法。

触发器的注册名称是通过`#getId`提供的。这应与提供给触发器实例的注册名称匹配。

触发器实例通过`#createInstance`创建。此方法从JSON读取一个标准。

```java
@Override
public ExampleTriggerInstance createInstance(JsonObject json, ContextAwarePredicate player, DeserializationContext context) {
  // 从JSON读取条件：item
  return new ExampleTriggerInstance(player, item);
}
```

最后，定义一个方法来检查所有触发器实例，并在其条件满足时运行监听器。此方法接受`ServerPlayer`和由`AbstractCriterionTriggerInstance`子类中的匹配方法定义的其他数据。此方法应在内部调用`SimpleCriterionTrigger#trigger`以正确处理检查所有监听器。大多数触发器实例调用此方法为`#trigger`。

```java
// 由于每个触发器的此方法都是独特的，因此不被重写
public void trigger(ServerPlayer player, ItemStack stack) {
  this.trigger(player,
    // AbstractCriterionTriggerInstance子类中的条件检查方法
    triggerInstance -> triggerInstance.matches(stack)
  );
}
```

随后，应在`FMLCommonSetupEvent`期间使用`CriteriaTriggers#register`注册一个实例。

!!! 重要
    `CriteriaTriggers#register`必须通过`FMLCommonSetupEvent#enqueueWork`排入同步工作队列，因为该方法不是线程安全的。

### 调用触发器

每当被检查的动作执行时，应调用由`SimpleCriterionTrigger`子类定义的`#trigger`方法。

```java
// 在执行动作的某段代码中
// 其中EXAMPLE_CRITERIA_TRIGGER是自定义标准触发器
public void performExampleAction(ServerPlayer player, ItemStack stack) {
  // 运行代码执行动作
  EXAMPLE_CRITERIA_TRIGGER.trigger(player, stack);
}
```

进度奖励
-------------------

当进度完成时，可能会发放奖励。这些奖励可以是经验值、战利品表、配方书的配方或作为创造模式玩家执行的[函数]的组合。

```js
// 在某个进度JSON中
"rewards": {
  "experience": 10,
  "loot": [
    "minecraft:example_loot_table",
    "minecraft:example_loot_table2"
    // ...
  ],
  "recipes": [
    "minecraft:example_recipe",
    "minecraft:example_recipe2"
    // ...
  ],
  "function": "minecraft:example_function"
}
```

[datapack]: https://minecraft.wiki/w/Data_pack
[wiki]: https://minecraft.wiki/w/Advancement/JSON_format
[conditional]: ./conditional.md#implementations
[function]: https://minecraft.wiki/w/Function_(Java_Edition)
[triggers]: https://minecraft.wiki/w/Advancement/JSON_format#List_of_triggers