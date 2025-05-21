---
title: 服务端-标签生成
order: 3
toc: content
group:
  title: 数据生成器
  order: 9996
---
标签生成
==============

可以通过继承 `TagsProvider` 并实现 `#addTags` 来为一个mod生成[标签]。实现后，必须将提供者[添加][datagen]到 `DataGenerator` 中。

```java
// 在MOD事件总线
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 指示生成器仅在生成服务器数据时运行
        event.includeServer(),
        // 扩展 net.minecraftforge.common.data.BlockTagsProvider
        output -> new MyBlockTagsProvider(
          output,  // 输出参数
          event.getLookupProvider(),  // 查找提供者
          MOD_ID,  // 模组ID
          event.getExistingFileHelper()  // 文件帮助
        )
    );
}
```

`TagsProvider`
--------------

标签提供者有两个用于生成标签的方法：通过 `#tag` 使用对象和其他标签创建标签，或者通过 `#getOrCreateRawBuilder` 使用其他对象类型的标签生成标签数据。

!!! 注意
    通常，除非一个注册表包含其他注册表对象的表示（例如方块在物品栏中有物品表示来获取方块），否则提供者不会直接调用 `#getOrCreateRawBuilder`。

当调用 `#tag` 时，会创建一个 `TagAppender`，它充当添加到标签中的元素的可链接消费者：

方法           | 描述
:---:            | :---
`add`            | 通过其资源键将对象添加到标签中。 
`addOptional`    | 通过其名称将对象添加到标签中。如果对象不存在，则在加载时将跳过该对象。
`addTag`         | 通过其标签键将标签添加到标签中。内部标签中的所有元素现在都是外部标签的一部分。
`addOptionalTag` | 通过其名称将标签添加到标签中。如果标签不存在，则在加载时将跳过该标签。
`replace`        | 当为 `true` 时，所有先前从其他数据包加载的条目将被丢弃。如果此数据包之后加载了另一个数据包，则仍将条目追加到标签中。
`remove`         | 通过其名称或键从标签中移除对象或标签。

```java
// 在某个 TagProvider#addTags 中
this.tag(EXAMPLE_TAG)
  .add(EXAMPLE_OBJECT) // 将对象添加到标签中
  .addOptional(new ResourceLocation("othermod", "other_object")) // 将其他mod中的对象添加到标签中

this.tag(EXAMPLE_TAG_2)
  .addTag(EXAMPLE_TAG) // 将标签添加到标签中
  .remove(EXAMPLE_OBJECT) // 从标签中移除此对象
```

!!! 重要
    如果mod的标签软依赖于另一个mod的标签（即运行时可能存在也可能不存在该mod），应使用可选方法引用其他mod的标签。

### 已有的提供者

Minecraft为某些注册表包含几个可以继承的标签提供者。此外，一些提供者包含额外的帮助方法以更轻松地创建标签。

注册表对象类型         | 标签提供者
:---:                        | :---
`Block`                      | `BlockTagsProvider`\*
`Item`                       | `ItemTagsProvider`
`EntityType`                 | `EntityTypeTagsProvider`
`Fluid`                      | `FluidTagsProvider`
`GameEvent`                  | `GameEventTagsProvider`
`Biome`                      | `BiomeTagsProvider`
`FlatLevelGeneratorPreset`   | `FlatLevelGeneratorPresetTagsProvider`
`WorldPreset`                | `WorldPresetTagsProvider`
`Structure`                  | `StructureTagsProvider`
`PoiType`                    | `PoiTypeTagsProvider`
`BannerPattern`              | `BannerPatternTagsProvider`
`CatVariant`                 | `CatVariantTagsProvider`
`PaintingVariant`            | `PaintingVariantTagsProvider`
`Instrument`                 | `InstrumentTagsProvider`
`DamageType`                 | `DamageTypeTagsProvider`

\* `BlockTagsProvider` 是Forge添加的 `TagsProvider`。

#### `ItemTagsProvider#copy`

方块有物品表示以在物品栏中获取它们。因此，许多方块标签也可以是物品标签。为了轻松生成与方块标签有相同条目的物品标签，可以使用 `#copy` 方法，它接受要复制的方块标签和要复制到的物品标签。

```java
//在 ItemTagsProvider#addTags 中
this.copy(EXAMPLE_BLOCK_TAG, EXAMPLE_ITEM_TAG);
```

自定义标签提供者
--------------------

可以通过一个接受注册表键来生成标签的 `TagsProvider` 子类创建一个自定义标签提供者。

```java
public RecipeTypeTagsProvider(PackOutput output, CompletableFuture<HolderLookup.Provider> registries, ExistingFileHelper fileHelper) {
  super(output, Registries.RECIPE_TYPE, registries, MOD_ID, fileHelper);
}
```

### 内在持有者标签提供者

一种特殊类型的 `TagProvider` 是 `IntrinsicHolderTagsProvider`。当通过该提供者使用 `#tag` 创建标签时，可以使用对象本身通过 `#add` 将其添加到标签中。为此，构造函数中提供了一个函数以将对象转换为其 `ResourceKey`。

```java
// `IntrinsicHolderTagsProvider` 的子类型
public AttributeTagsProvider(PackOutput output, CompletableFuture<HolderLookup.Provider> registries, ExistingFileHelper fileHelper) {
  super(
    output,
    ForgeRegistries.Keys.ATTRIBUTES,
    registries,
    attribute -> ForgeRegistries.ATTRIBUTES.getResourceKey(attribute).get(),
    MOD_ID,
    fileHelper
  );
}
```

[tags]: ../../resources/server/tags.md
[datagen]: ../index.md#data-providers
[custom]: ../../concepts/registries.md#creating-custom-forge-registries