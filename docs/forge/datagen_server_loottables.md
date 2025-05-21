---
title: 服务端-掉落表生成
order: 4
toc: content
group:
  title: 数据生成器
  order: 9996
---
掉落表生成
=====================

可以通过构造一个新的 `LootTableProvider` 并提供 `LootTableProvider$SubProviderEntry` 为模组生成[掉落表][loottable]。该提供者必须[添加][datagen]到 `DataGenerator` 中。

```java
// 在 MOD 事件总线上
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 告知生成器仅在服务器数据生成时运行
        event.includeServer(),
        output -> new MyLootTableProvider(
          output,
          // 指定需要生成的表的注册名称，或可以留空
          Collections.emptySet(),
          // 生成掉落的子提供者
          List.of(subProvider1, subProvider2, /*...*/)
        )
    );
}
```

`LootTableSubProvider`
----------------------

每个 `LootTableProvider$SubProviderEntry` 接受一个提供的 `LootTableSubProvider`，用于生成一个给定 `LootContextParamSet` 的掉落表。`LootTableSubProvider` 包含一个方法，该方法接受一个生成表的写入者（`BiConsumer<ResourceLocation, LootTable.Builder>`）。

```java
public class ExampleSubProvider implements LootTableSubProvider {

  // 用于创建包装供应者的工厂方法
  public ExampleSubProvider() {}

  // 用于生成掉落表的方法
  @Override
  public void generate(BiConsumer<ResourceLocation, LootTable.Builder> writer) {
    // 通过调用 writer#accept 生成掉落表
  }
}
```

然后可以将表添加到 `LootTableProvider#getTables` 中适用于任何可用的 `LootContextParamSet`：

```java
// 在传递给 LootTableProvider 构造函数的列表中
new LootTableProvider.SubProviderEntry(
  ExampleSubProvider::new,
  // 'empty' 参数集的掉落表生成器
  LootContextParamSets.EMPTY
)
```

### `BlockLootSubProvider` 和 `EntityLootSubProvider` 子类

对于 `LootContextParamSets#BLOCK` 和 `#ENTITY`，有特殊类型（分别为 `BlockLootSubProvider` 和 `EntityLootSubProvider`），它们提供了额外的辅助方法来创建和验证掉落表。

`BlockLootSubProvider` 的构造函数接收一个物品列表，这些物品为爆炸抗性，以确定当方块被爆炸时是否可以生成掉落表，和一个 `FeatureFlagSet`，确定方块是否被启用以便生成掉落表。

```java
// 在一些 BlockLootSubProvider 子类中
public MyBlockLootSubProvider() {
  super(Collections.emptySet(), FeatureFlags.REGISTRY.allFlags());
}
```

`EntityLootSubProvider` 的构造函数接收一个 `FeatureFlagSet`，以确定是否启用实体类型以便生成掉落表。

```java
// 在一些 EntityLootSubProvider 子类中
public MyEntityLootSubProvider() {
  super(FeatureFlags.REGISTRY.allFlags());
}
```

要使用它们，必须将所有注册对象分别提供给 `BlockLootSubProvider#getKnownBlocks` 和 `EntityLootSubProvider#getKnownEntityTypes`。这些方法是为了确保可迭代物中的所有对象都有一个掉落表。

!!! 提示
    如果使用 `DeferredRegister` 来注册模组的对象，那么 `#getKnown*` 方法可以通过 `DeferredRegister#getEntries` 提供条目：

    ```java
    // 在某些 DeferredRegister BLOCK_REGISTRAR 的 BlockLootSubProvider 子类中
    @Override
    protected Iterable<Block> getKnownBlocks() {
      return BLOCK_REGISTRAR.getEntries() // 获取所有注册条目
        .stream() // 流式传输包装对象
        .flatMap(RegistryObject::stream) // 获取可用对象
        ::iterator; // 创建可迭代物
    }
    ```

可以通过实现 `#generate` 方法来添加掉落表。

```java
// 在某些 BlockLootSubProvider 子类中
@Override
public void generate() {
  // 在此添加掉落表
}
```

掉落表构建器
-------------------

要生成掉落表，它们作为一个 `LootTable$Builder` 被 `LootTableSubProvider` 接受。之后，指定的 `LootContextParamSet` 在 `LootTableProvider$SubProviderEntry` 中设置，然后通过 `#build` 构建。在构建之前，构建器可以指定条目、条件和修饰符，这些会影响掉落表的功能。

!!! 注意
    掉落表的功能非常广泛，本文档不会全面覆盖。相反，将简要介绍每个组件。每个组件的特定子类型可以使用 IDE 找到。其实现将留给读者作为练习。

### LootTable

掉落表是基础对象，可以使用 `LootTable#lootTable` 转换为所需的 `LootTable$Builder`。掉落表可以通过应用指定顺序的池列表（通过 `#withPool`）和函数（通过 `#apply`）来修改这些池的结果物品。

### LootPool

掉落池表示一个操作组，可以使用 `LootPool#lootPool` 生成一个 `LootPool$Builder`。每个掉落池可以指定定义池中操作的条目（通过 `#add`）、定义是否应执行池中操作的条件（通过 `#when`），以及修改条目结果物品的函数（通过 `#apply`）。每个池可以执行多次（通过 `#setRolls`）。此外，还可以指定由执行者的运气修改的额外执行次数（通过 `#setBonusRolls`）。

### LootPoolEntryContainer

掉落条目定义了被选择时的操作，通常是生成物品。每个条目都有一个关联的、[已注册] `LootPoolEntryType`。它们也有自己的关联构建器，继承自 `LootPoolEntryContainer$Builder`。多个条目可以同时执行（通过 `#append`），或顺序执行直到一个失败（通过 `#then`）。此外，条目可以在失败时默认执行另一个条目（通过 `#otherwise`）。

### LootItemCondition

掉落条件定义了某个操作执行所需满足的条件。每个条件都有一个关联的、[已注册] `LootItemConditionType`。它们也有自己的关联构建器，继承自 `LootItemCondition$Builder`。默认情况下，指定的所有掉落条件都必须为真才能执行操作。也可以指定掉落条件，以便只有一个返回真（通过 `#or`）。此外，条件的结果输出可以被反转（通过 `#invert`）。

### LootItemFunction

掉落函数在传递给输出之前修改执行的结果。每个函数都有一个关联的、[已注册] `LootItemFunctionType`。它们也有自己的关联构建器，继承自 `LootItemFunction$Builder`。

#### NbtProvider

NBT 提供者是由 `CopyNbtFunction` 定义的函数的特殊类型。它们定义从何处提取标签信息。每个提供者都有一个关联的、[已注册] `LootNbtProviderType`。

### NumberProvider

数字提供者决定掉落池的执行次数。每个提供者都有一个关联的、[已注册] `LootNumberProviderType`。

#### ScoreboardNameProvider

记分板提供者是由 `ScoreboardValue` 定义的特殊类型的数字提供者。它们定义拉取要执行的滚版本数的记分板名称。每个提供者都有一个关联的、[已注册] `LootScoreProviderType`。

[loottable]: ../../resources/server/loottables.md
[datagen]: ../index.md#data-providers
[registered]: ../../concepts/registries.md#registries-that-arent-forge-registries