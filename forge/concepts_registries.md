---
title: 注册表
order: 0
toc: content
group:
  title: 核心概念
  order: 9985
---
注册表
==========

注册是将一个模组的对象（例如物品、方块、声音等）引入并使其在游戏中被识别的过程。注册非常重要，因为如果未进行注册，游戏将无法识别这些对象，从而导致无法解释的行为和崩溃。

游戏中大多数需要注册的事项都由 Forge 注册表处理。注册表类似于一个映射对象，用于将键与值关联。Forge 使用 `ResourceLocation` 作为键来注册对象，这使得 `ResourceLocation` 可以作为对象的“注册名”。

每种可注册对象类型都有其专用的注册表。要查看由 Forge 包装的所有注册表，可以查看 `ForgeRegistries` 类。在同一个注册表中，所有注册名必须是唯一的。但是，不同注册表中的名称不会发生冲突。例如，有一个 `Block` 注册表和一个 `Item` 注册表，一个 `Block` 和一个 `Item` 可以使用相同的名称 `example:thing` 注册而不导致冲突；然而，如果两个不同的 `Block` 或 `Item` 使用相同的名称注册，后一个对象将覆盖第一个对象。

注册方法
------------------

有两种合适的方法来注册对象：使用 `DeferredRegister` 类和 `RegisterEvent` 生命周期事件。

### DeferredRegister

`DeferredRegister` 是推荐的注册对象的方法。它允许使用和便利的静态初始化程序，同时避免与其相关的问题。它简单地维护一个条目的供应商列表，并在 `RegisterEvent` 期间从这些供应商注册对象。

下面是一个模组注册一个自定义方块的示例：

```java
private static final DeferredRegister<Block> BLOCKS = DeferredRegister.create(ForgeRegistries.BLOCKS, MODID);

public static final RegistryObject<Block> ROCK_BLOCK = BLOCKS.register("rock", () -> new Block(BlockBehaviour.Properties.of().mapColor(MapColor.STONE)));

public ExampleMod() {
  BLOCKS.register(FMLJavaModLoadingContext.get().getModEventBus());
}
```

### `RegisterEvent`

`RegisterEvent`是注册对象的另一种方法。此事件在模组构造函数之后、加载配置之前为每个注册表触发。通过向 `#register` 传入注册表键、注册对象的名称以及对象本身来注册对象。还有一个额外的 `#register` 重载方法，该方法使用一个消费助手来注册具有给定名称的对象。建议使用此方法来避免不必要的对象创建。

这是一个示例：（事件处理程序注册到模组事件总线上）

```java
@SubscribeEvent
public void register(RegisterEvent event) {
  event.register(ForgeRegistries.Keys.BLOCKS,
    helper -> {
      helper.register(new ResourceLocation(MODID, "example_block_1"), new Block(...));
      helper.register(new ResourceLocation(MODID, "example_block_2"), new Block(...));
      helper.register(new ResourceLocation(MODID, "example_block_3"), new Block(...));
      // ...
    }
  );
}
```

### 非 Forge 注册表

并不是所有的注册表都由 Forge 包装。它们可以是静态注册表，例如 `LootItemConditionType`，这类注册表是安全的。同时还有动态注册表，例如 `ConfiguredFeature` 和其他一些通常以 JSON 表示的世界生成注册表。`DeferredRegister#create` 有一个重载方法，允许模组开发者指定要为其创建 `RegistryObject` 的原版注册表的注册表键。注册方法和附加到模组事件总线的方法与其他 `DeferredRegister` 一样。

!!! 重要
    动态注册表对象只能通过数据文件（例如 JSON）注册，不能在代码中注册。

```java
private static final DeferredRegister<LootItemConditionType> REGISTER = DeferredRegister.create(Registries.LOOT_CONDITION_TYPE, "examplemod");

public static final RegistryObject<LootItemConditionType> EXAMPLE_LOOT_ITEM_CONDITION_TYPE = REGISTER.register("example_loot_item_condition_type", () -> new LootItemConditionType(...));
```

!!! 注意
    一些类本身无法直接注册。相反，需要注册 `*Type` 类，并在其构造函数中使用。例如，`BlockEntity` 有 `BlockEntityType`，`Entity` 有 `EntityType`。这些 `*Type` 类是简单地根据需求创建包含类型的工厂。

    这些工厂通过使用其 `*Type$Builder` 类创建。例如：（`REGISTER` 指一个 `DeferredRegister<BlockEntityType>`）
    ```java
    public static final RegistryObject<BlockEntityType<ExampleBlockEntity>> EXAMPLE_BLOCK_ENTITY = REGISTER.register(
      "example_block_entity", () -> BlockEntityType.Builder.of(ExampleBlockEntity::new, EXAMPLE_BLOCK.get()).build(null)
    );
    ```

引用注册对象
------------------------------

注册对象不应存储在字段中。当它们被创建和注册时，它们应每次 `RegisterEvent` 为该注册表触发时重新创建和注册。这是为了在 Forge 的未来版本中允许动态加载和卸载模组。

注册对象必须始终通过 `RegistryObject` 或带有 `@ObjectHolder` 的字段引用。

### 使用 RegistryObject

`RegistryObject` 可以在注册对象可用后用于检索对注册对象的引用。这些对象由 `DeferredRegister` 用于返回对注册对象的引用。在为其注册表调用 `RegisterEvent` 后，其引用会更新，伴随着 `@ObjectHolder` 注释。

要获得 `RegistryObject`，可通过 `RegistryObject#create` 调用，使用 `ResourceLocation` 和可注册对象的 `IForgeRegistry`。也可以通过提供注册表名称来使用自定义注册表。将 `RegistryObject` 存储在 `public static final` 字段中，并在需要注册对象时调用 `#get`。

以下是使用 `RegistryObject` 的示例：

```java
public static final RegistryObject<Item> BOW = RegistryObject.create(new ResourceLocation("minecraft:bow"), ForgeRegistries.ITEMS);

// 假设 'neomagicae:mana_type' 是一个合法注册表，'neomagicae:coffeinum' 是注册表中的合法对象
public static final RegistryObject<ManaType> COFFEINUM = RegistryObject.create(new ResourceLocation("neomagicae", "coffeinum"), new ResourceLocation("neomagicae", "mana_type"), "neomagicae"); 
```

### 使用 @ObjectHolder

可以通过为类或字段添加 `@ObjectHolder` 注释，并提供足够的信息来构造一个 `ResourceLocation`，从而将注册表中的对象注入到 `public static` 字段中，以在一个特定注册表中的特定对象进行标识。

`@ObjectHolder` 的规则如下：

* 如果类带有 `@ObjectHolder` 注释，其值将是所有字段的默认命名空间（如果未明确定义）
* 如果类带有 `@Mod` 注释，modid 将是所有注释字段的默认命名空间（如果未明确定义）
* 某字段在以下情况下被视为注入对象的候选项：
  * 至少具有 `public static` 修饰符；
  * **字段** 带有 `@ObjectHolder` 注释，并且：
    * 名称值被明确定义；以及
    * 注册表名称值被明确定义
  * _如果字段没有相应的注册表或名称，将抛出编译时异常。_
* _如果生成的 `ResourceLocation` 不完整或无效（路径中有无效字符），将抛出异常。_
* 如果没有其他错误或异常发生，则该字段将被注入。
* 如果所有上述规则均不适用，则不会采取任何措施（并且可能会记录一条消息）。

`@ObjectHolder` 注释的字段将在为其注册表调用 `RegisterEvent` 后，与 `RegistryObject` 一起被注入。

!!! 注意
    如果在对象注入时，注册表中不存在该对象，将记录一条调试消息，不会注入任何值。

由于这些规则相对复杂，以下是一些示例：

```java
class Holder {
  @ObjectHolder(registryName = "minecraft:enchantment", value = "minecraft:flame")
  public static final Enchantment flame = null;     // 注释存在。[public static] 是必要的。[final] 是可选的。
                                                    // 注册表名称是明确定义的："minecraft:enchantment"
                                                    // 资源位置是明确定义的："minecraft:flame"
                                                    // 注入对象："minecraft:flame"，来源于 [Enchantment] 注册表

  public static final Biome ice_flat = null;        // 字段上没有注释。
                                                    // 因此，忽略此字段。

  @ObjectHolder("minecraft:creeper")
  public static Entity creeper = null;              // 注释存在。[public static] 是必要的。
                                                    // 字段上没有指定注册表。
                                                    // 因此，这将导致一个编译时异常。

  @ObjectHolder(registryName = "potion")
  public static final Potion levitation = null;     // 注释存在。[public static] 是必要的。[final] 是可选的。
                                                    // 注册表名称是明确定义的："minecraft:potion"
                                                    // 字段上没有指定资源位置
                                                    // 因此，这将导致一个编译时异常。
}
```

创建自定义 Forge 注册表
--------------------------------

自定义注册表通常可以是简单的键到值的映射。这是一种常用的风格；然而，它强制要求注册表的存在作为硬性依赖。它也要求任何需要在客户端与服务端之间同步的数据必须手动进行。自定义 Forge 注册表提供了一种简单的替代方案来创建软性依赖，同时提供了更好的管理和在客户端与服务端之间的自动同步（除非另行告诉）。由于对象也使用 Forge 注册表，注册变得标准化。

自定义 Forge 注册表是在 `NewRegistryEvent` 或 `DeferredRegister` 的帮助下通过 `RegistryBuilder` 创建的。`RegistryBuilder` 类接受各种参数（如注册表名称、id 范围以及注册表上发生的各种事件的回调）。在 `NewRegistryEvent` 触发结束后，新注册表会注册到 `RegistryManager`。

任何新创建的注册表都应使用其相关的[注册方法][registration]来注册关联的对象。

### 使用 NewRegistryEvent

使用 `NewRegistryEvent` 时，通过 `RegistryBuilder` 调用 `#create` 将返回一个被 Supplier 包装的注册表。`NewRegistryEvent` 完成发布到模组事件总线后，可以访问提供的注册表。 在 `NewRegistryEvent` 结束触发前从供应商获取自定义注册表将导致返回 `null` 值。

#### 新的数据包注册表

可以使用模组事件总线上的 `DataPackRegistryEvent$NewRegistry` 事件添加新的数据包注册表。通过传入代表注册表名称的 `ResourceKey` 和用于从 JSON 进行编码解码数据的 `Codec` 来创建注册表。可选地，还可以提供一个 `Codec` 来同步数据包注册表到客户端。

!!! 重要
    数据包注册表不能用 `DeferredRegister` 创建。它们只能通过事件创建。

### 使用 DeferredRegister

通过 `DeferredRegister` 方法又是上述事件的一个包装。一旦在常量字段中使用包含注册表名称和模组 id 的 `#create` 重载来创建 `DeferredRegister`，便可以通过 `DeferredRegister#makeRegistry` 来构建注册表。这需要一个包含任何额外配置的 `RegistryBuilder`。默认情况下，该方法已经填充了 `#setName`。由于该方法可以随时返回，因此返回了 `IForgeRegistry` 的一个 wrapper。 在 `NewRegistryEvent` 触发前，从供应商获取自定义注册表将导致返回 `null` 值。

!!! 重要
    `DeferredRegister#makeRegistry` 必须在 `#register` 将 `DeferredRegister` 添加到模组事件总线之前调用。`#makeRegistry` 也在 `NewRegistryEvent` 期间使用 `#register` 方法创建注册表。

处理缺失条目
------------------------

有时某些注册表对象在模组更新或更有可能是移除时将不再存在。可以在第三个注册表事件 `MissingMappingsEvent` 中指定处理缺失映射的操作。在此事件中，可通过注册表键和 mod id 使用 `#getMappings` 获取缺失映射列表，或通过 `#getAllMappings` 获取所有映射。

!!! 重要
    `MissingMappingsEvent` 在 **Forge** 事件总线上触发。

对于每个 `Mapping`，可以选择四种映射类型之一来处理缺失的条目：

| 操作  | 描述                   |
| :---: | :-------------------- |
| IGNORE | 忽略缺失的条目并放弃映射。    |
|  WARN  | 生成一条警告到日志中。         |
|  FAIL  | 阻止世界加载。               |
| REMAP  | 将条目重映射到已注册的非空对象。 |

如果未指定操作，则默认操作会通知用户关于缺失条目的信息以及他们是否仍然希望加载世界。除了重映射之外，所有操作都会阻止任何其他注册对象取代现有 id，以防相关条目重新加入游戏。

[ResourceLocation]: ./resources.md#resourcelocation
[registration]: #methods-for-registering
[event]: ./events.md
[blockentity]: ../blockentities/index.md