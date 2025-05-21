---
title: 服务端-数据包注册对象生成
order: 7
toc: content
group:
  title: 数据生成器
  order: 9996
---
数据包注册对象生成
==================================

可以通过构建新的 `DatapackBuiltinEntriesProvider` 并提供一个带有新对象的 `RegistrySetBuilder` 来为 mod 生成数据包注册对象。必须将提供程序[添加][datagen]到 `DataGenerator` 中。

!!! 注意
    `DatapackBuiltinEntriesProvider` 是 `RegistriesDatapackGenerator` 的一个 Forge 扩展，它能够正确处理引用现有数据包注册对象而不使条目崩溃。因此，本文档将使用 `DatapackBuiltinEntriesProvider`。

```java
// 在 MOD 事件总线上
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 告诉生成器仅在生成服务器数据时运行
        event.includeServer(),
        output -> new DatapackBuiltinEntriesProvider(
          output,
          event.getLookupProvider(),
          // 包含要生成的数据包注册对象的构造器
          new RegistrySetBuilder().add(/* ... */),
          // 要生成其数据包注册对象的 mod id 集合
          Set.of(MOD_ID)
        )
    );
}
```

`RegistrySetBuilder`
--------------------

`RegistrySetBuilder` 负责构建游戏中使用的所有数据包注册对象。构造器可以为注册表新增条目，然后可以将对象注册到该注册表中。

首先，可以通过调用构造函数初始化 `RegistrySetBuilder` 的新实例。然后，可以调用 `#add` 方法（需要传入注册表的 `ResourceKey`、包含 `BootstapContext` 的 `RegistryBootstrap` 消费者以及一个可选的 `Lifecycle` 参数以指示注册表的当前生命周期状态）来处理特定注册表的注册。

```java
new RegistrySetBuilder()
  // 创建配置特性
  .add(Registries.CONFIGURED_FEATURE, bootstrap -> {
    // 在此注册配置特性
  })
  // 创建放置特性
  .add(Registries.PLACED_FEATURE, bootstrap -> {
    // 在此注册放置特性
  });
```

!!! 注意
    通过 Forge 创建的数据包注册表也可以使用该构造器生成其对象，仅需传入相关的 `ResourceKey` 即可。

使用 `BootstapContext` 注册
----------------------------------

构造器提供的 `BootstapContext` 中的 `#register` 方法可用于注册对象。它需要传入表示对象注册表名称的 `ResourceKey`，要注册的对象，和一个可选的 `Lifecycle` 参数以指示注册对象的当前生命周期状态。

```java
public static final ResourceKey<ConfiguredFeature<?, ?>> EXAMPLE_CONFIGURED_FEATURE = ResourceKey.create(
  Registries.CONFIGURED_FEATURE,
  new ResourceLocation(MOD_ID, "example_configured_feature")
);

// 在某个常量位置或参数中
new RegistrySetBuilder()
  // 创建配置特性
  .add(Registries.CONFIGURED_FEATURE, bootstrap -> {
    // 在此注册配置特性
    bootstrap.register(
      // 配置特性的资源键
      EXAMPLE_CONFIGURED_FEATURE,
      new ConfiguredFeature<>(
        Feature.ORE, // 创建矿石特性
        new OreConfiguration(
          List.of(), // 不执行任何操作
          8 // 每组最多8个
        )
      )
    );
  })
  // 创建放置特性
  .add(Registries.PLACED_FEATURE, bootstrap -> {
    // 在此注册放置特性
  });
```

### 数据包注册对象查找

有时，数据包注册对象可能需要使用其他数据包注册对象或包含数据包注册对象的标签。在这种情况下，可以使用 `BootstapContext#lookup` 查找另一个数据包注册表，以获取 `HolderGetter`。从那里可以通过传入相关键来使用 `#getOrThrow` 获取数据包注册对象的 `Holder$Reference` 或标签的 `HolderSet$Named`。

```java
public static final ResourceKey<ConfiguredFeature<?, ?>> EXAMPLE_CONFIGURED_FEATURE = ResourceKey.create(
  Registries.CONFIGURED_FEATURE,
  new ResourceLocation(MOD_ID, "example_configured_feature")
);

public static final ResourceKey<PlacedFeature> EXAMPLE_PLACED_FEATURE = ResourceKey.create(
  Registries.PLACED_FEATURE,
  new ResourceLocation(MOD_ID, "example_placed_feature")
);

// 在某个常量位置或参数中
new RegistrySetBuilder()
  // 创建配置特性
  .add(Registries.CONFIGURED_FEATURE, bootstrap -> {
    // 在此注册配置特性
    bootstrap.register(
      // 配置特性的资源键
      EXAMPLE_CONFIGURED_FEATURE,
      new ConfiguredFeature(/* ... */)
    );
  })
  // 创建放置特性
  .add(Registries.PLACED_FEATURE, bootstrap -> {
    // 在此注册放置特性

    // 获取配置特性注册表
    HolderGetter<ConfiguredFeature<?, ?>> configured = bootstrap.lookup(Registries.CONFIGURED_FEATURE);

    bootstrap.register(
      // 放置特性的资源键
      EXAMPLE_PLACED_FEATURE,
      new PlacedFeature(
        configured.getOrThrow(EXAMPLE_CONFIGURED_FEATURE), // 获取配置特性
        List.of() // 不对放置位置进行操作
      )
    )
  });
```

[datagen]: ../index.md#data-providers