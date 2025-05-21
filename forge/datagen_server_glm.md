---
title: 服务端-全局战利品修改器生成
order: 6
toc: content
group:
  title: 数据生成器
  order: 9996
---
全局战利品修改器生成
================================

[全局战利品修改器（GLMs）][glm] 可以通过继承 `GlobalLootModifierProvider` 并实现 `#start` 方法为一个模组生成。每个 GLM 可以通过调用 `#add` 方法，并指定修改器的名称和要序列化的[修改器实例][instance]来添加生成。实现之后，提供者必须被[添加][datagen]到 `DataGenerator` 中。

```java
// 在MOD事件总线上
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 告诉生成器仅在服务器数据生成时运行
        event.includeServer(),
        output -> new MyGlobalLootModifierProvider(output, MOD_ID)
    );
}

// 在某个 GlobalLootModifierProvider#start 中
this.add("example_modifier", new ExampleModifier(
  new LootItemCondition[] {
    WeatherCheck.weather().setRaining(true).build() // 在下雨时执行
  },
  "val1",
  10,
  Items.DIRT
));
```

[glm]: ../../resources/server/glm.md
[instance]: ../../resources/server/glm.md#igloballootmodifier
[datagen]: ../index.md#data-providers