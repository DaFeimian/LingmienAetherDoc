---
title: 服务端-标签
order: 11
toc: content
group:
  title: 资源包
  order: 9995
---
标签
====

在游戏中，标签是用于将相关对象组合在一起并进行快速成员检查的广义对象集。

声明您自己的分组
----------------------------
标签在您的模组的数据包中声明。例如，一个标识符为 `modid:foo/tagname` 的 `TagKey<Block>` 会引用位于 `/data/<modid>/tags/blocks/foo/tagname.json` 的标签。用于 `Block`、`Item`、`EntityType`、`Fluid` 和 `GameEvent` 的标签在其文件夹位置使用复数形式，而所有其他注册表使用单数形式（`EntityType` 使用文件夹 `entity_types`，而 `Potion` 使用文件夹 `potion`）。

类似地，您可以通过声明自己的 JSON 文件来附加或覆盖其他域中的标签，例如 Vanilla。举例来说，要将您自己的模组的树苗添加到 Vanilla 的树苗标签中，您需要在 `/data/minecraft/tags/blocks/saplings.json` 中指定，如果 `replace` 选项为 false，Vanilla 会在重载时将所有内容合并为一个标签。如果 `replace` 为 true，则在指定 `replace` 的 json 之前的所有条目将会被移除。列出的且不存在的值会导致标签出错，除非该值以 `id` 字符串和 `required` 布尔值设置为 false 的形式列出，如以下示例所示：

```js
{
  "replace": false,
  "values": [
    "minecraft:gold_ingot",
    "mymod:my_ingot",
    {
      "id": "othermod:ingot_other",
      "required": false
    }
  ]
}
```

参见 [Vanilla wiki][tags] 以了解基础语法的描述。

Vanilla 语法还有一个 Forge 扩展。您可以声明与 `values` 数组格式相同的 `remove` 数组。在这里列出的任何值都将从标签中移除。这是 Vanilla `replace` 选项的更细粒度版本。

在代码中使用标签
-----------------
所有注册表的标签在登录和重载时会自动从服务器发送到任何远程客户端。`Block`、`Item`、`EntityType`、`Fluid` 和 `GameEvent` 具有特殊情况，因为它们有 `Holder`，允许通过对象本身访问可用标签。

!!! 注意
    侵入式 `Holder` 可能会在 Minecraft 的未来版本中被移除。如果它们被移除，可使用以下方法查询关联的 `Holder`。

### ITagManager

Forge 包装的注册表通过 `ITagManager` 提供创建和管理标签的附加帮助，可通过 `IForgeRegistry#tags` 获取。标签可以使用 `#createTagKey` 或 `#createOptionalTagKey` 创建。标签或注册表对象也可以使用 `#getTag` 或 `#getReverseTag` 检查。

#### 自定义注册表

自定义注册表可以在构建其 `DeferredRegister` 时分别通过 `#createTagKey` 或 `#createOptionalTagKey` 创建标签。然后可以使用通过调用 `DeferredRegister#makeRegistry` 获得的 `IForgeRegistry` 来检查它们的标签或注册表对象。

### 引用标签

创建标签包装器的方法有四种：

方法                           | 用途
:---:                           | :---
`*Tags#create`                  | `BannerPattern`、`Biome`、`Block`、`CatVariant`、`DamageType`、`EntityType`、`FlatLevelGeneratorPreset`、`Fluid`、`GameEvent`、`Instrument`、`Item`、`PaintingVariant`、`PoiType`、`Structure` 和 `WorldPreset`，其中 `*` 代表这些类型之一。
`ITagManager#createTagKey`      | Forge 包装的 Vanilla 注册表，注册表可从 `ForgeRegistries` 获得。
`DeferredRegister#createTagKey` | 自定义 Forge 注册表。
`TagKey#create`                 | 无 Forge 包装的 Vanilla 注册表，注册表可从 `Registry` 获得。

注册表对象可以通过其 `Holder` 或分别通过 `ITag`/`IReverseTag` 来检查其标签或注册表对象。

Vanilla 注册表对象可以使用 `Registry#getHolder` 或 `Registry#getHolderOrThrow` 获取其关联的持有人，然后使用 `Holder#is` 比较注册表对象是否具有标签。

Forge 注册表对象可以使用 `ITagManager#getTag` 或 `ITagManager#getReverseTag` 获取其标签定义，然后分别使用 `ITag#contains` 或 `IReverseTag#containsTag` 比较注册表对象是否具有标签。

持有标签的注册表对象在它们的注册表对象或状态感知类中包含一个名为 `#is` 的方法，用于检查对象是否属于某个标签。

例如：
```java
public static final TagKey<Item> myItemTag = ItemTags.create(new ResourceLocation("mymod", "myitemgroup"));

public static final TagKey<Potion> myPotionTag = ForgeRegistries.POTIONS.tags().createTagKey(new ResourceLocation("mymod", "mypotiongroup"));

public static final TagKey<VillagerType> myVillagerTypeTag = TagKey.create(Registries.VILLAGER_TYPE, new ResourceLocation("mymod", "myvillagertypegroup"));

// 在某个方法中：

ItemStack stack = /*...*/;
boolean isInItemGroup = stack.is(myItemTag);

Potion potion = /*...*/;
boolean isInPotionGroup  = ForgeRegistries.POTIONS.tags().getTag(myPotionTag).contains(potion);

ResourceKey<VillagerType> villagerTypeKey = /*...*/;
boolean isInVillagerTypeGroup = BuiltInRegistries.VILLAGER_TYPE.getHolder(villagerTypeKey).map(holder -> holder.is(myVillagerTypeTag)).orElse(false);
```

约定
-----------

有几个约定可以帮助促进生态系统中的兼容性：

* 如果有适合您的方块或物品的 Vanilla 标签，请将其添加到该标签中。请参见 [Vanilla 标签列表][taglist]。
* 如果有适合您的方块或物品的 Forge 标签，请将其添加到该标签中。Forge 声明的标签列表可以在 [GitHub][forgetags] 上查看。
* 如果存在您认为应该由社区共享的一组内容，请使用 `forge` 命名空间而不是您的模组 ID。
* 标签命名规范应遵循 Vanilla 规范。特别是，物品和方块分组是复数形式而不是单数形式（例如，`minecraft:logs`，`minecraft:saplings`）。
* 物品标签应根据其类型分类到子目录中（例如，`forge:ingots/iron`，`forge:nuggets/brass` 等）。

从矿石字典迁移
----------------------------

* 对于配方，标签可以直接在 Vanilla 配方格式中使用（请参见下文）。
* 对于代码中的匹配项，请参见上面的部分。
* 如果您正在声明一种新的物品分组，请遵循一些命名约定：
  * 使用 `domain:type/material`。当名称是所有模组作者都应采用的通用名称时，请使用 `forge` 域。
  * 例如，黄铜锭应在 `forge:ingots/brass` 标签下注册，钴块则在 `forge:nuggets/cobalt` 标签下注册。

在配方和进度中使用标签
--------------------------------

标签由 Vanilla 直接支持。有关使用详细信息，请参见相应的 Vanilla wiki 页面 [配方] 和 [进度]。

[datapack]: ./index.md
[tags]: https://minecraft.wiki/w/Tag#JSON_format
[taglist]: https://minecraft.wiki/w/Tag#List_of_tags
[forgetags]: https://github.com/MinecraftForge/MinecraftForge/tree/1.19.x/src/generated/resources/data/forge/tags
[recipes]: https://minecraft.wiki/w/Recipe#JSON_format
[advancements]: https://minecraft.wiki/w/Advancement