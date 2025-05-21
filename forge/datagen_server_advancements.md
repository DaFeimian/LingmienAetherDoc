---
title: 服务端-进阶生成
order: 5
toc: content
group:
  title: 数据生成器
  order: 9996
---
进阶生成
======================

可以通过构造一个新的 `AdvancementProvider` 并提供 `AdvancementSubProvider` 来为模组生成[晋升]。晋升可以手动创建并提供，也可以为了方便使用 `Advancement$Builder` 来创建。必须在 `DataGenerator` 中[添加][datagen]提供器。

!!! 注意
    Forge 提供了一个 `AdvancementProvider` 的扩展，称为 `ForgeAdvancementProvider`，它在生成晋升时集成得更好。因此，本文档将使用 `ForgeAdvancementProvider` 以及子提供接口 `ForgeAdvancementProvider$AdvancementGenerator`。

```java
// 在 MOD 事件总线上
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 告诉生成器仅在生成服务器数据时运行
        event.includeServer(),
        output -> new ForgeAdvancementProvider(
          output,
          event.getLookupProvider(),
          event.getExistingFileHelper(),
          // 生成晋升的子提供器
          List.of(subProvider1, subProvider2, /*...*/)
        )
    );
}
```

`ForgeAdvancementProvider$AdvancementGenerator`
-----------------------------------------------

`ForgeAdvancementProvider$AdvancementGenerator` 负责生成晋升，包含一个方法，该方法接收一个注册表查找、写入器（`Consumer<Advancement>`）以及现有文件助手。

```java
// 在 ForgeAdvancementProvider$AdvancementGenerator 的某个子类中或作为一个 lambda 引用

@Override
public void generate(HolderLookup.Provider registries, Consumer<Advancement> writer, ExistingFileHelper existingFileHelper) {
  // 在此构建晋升
}
```

`Advancement$Builder`
---------------------

`Advancement$Builder` 是一个便捷实现，用于创建将要生成的 `Advancement`。它允许定义父晋升、显示信息、完成晋升后的奖励，以及解锁该晋升的要求。要创建一个 `Advancement`，只需指定要求即可。

尽管不是必需的，但有很多重要的方法需要了解：

方法        | 描述
:---:       | :---
`parent`    | 设置此晋升直接链接到的晋升。可以指定晋升的名称或晋升本身（如果它是由模组开发者生成的）。
`display`   | 设置要显示到聊天、提示和晋升屏幕的信息。
`rewards`   | 设置完成此晋升时获得的奖励。
`addCriterion` | 为晋升添加一个条件。
`requirements` | 指定是否必须所有条件都返回 true 或至少一个条件返回 true。可以使用额外的重载来混合匹配这些操作。

一旦 `Advancement$Builder` 准备好构建，应该调用 `#save` 方法，该方法接收写入器、晋升的注册名和用于检查提供的父级是否存在的文件助手。

```java
// 在某个 ForgeAdvancementProvider$AdvancementGenerator#generate(registries, writer, existingFileHelper) 中
Advancement example = Advancement.Builder.advancement()
  .addCriterion("example_criterion", triggerInstance) // 晋升如何解锁
  .save(writer, name, existingFileHelper); // 将数据添加到构建器
```

[晋升]: ../../resources/server/advancements.md
[datagen]: ../index.md#data-providers
[条件]: ../../resources/server/conditional.md
