---
title: 介绍
order: 0
toc: content
group:
  title: 物品
  order: 9988
---
物品
=====

与方块一起，物品是大多数模组的关键组成部分。方块构成了你周围的世界，物品则存在于物品栏中。

创建物品
----------------

### 基础物品

不需要特殊功能的基础物品（比如木棍或糖）不需要自定义类。你可以通过使用 `Item` 类和 `Item$Properties` 对象来创建一个物品。这个 `Item$Properties` 对象可以通过构造函数创建，并通过调用其方法进行定制。例如：

|      方法         |                  描述                         |
|:-----------------:|:---------------------------------------------|
| `requiredFeatures` | 设置在 `CreativeModeTab` 中查看此物品所需的 `FeatureFlag`。|
| `durability`      | 设置此物品的最大耐久值。如果大于 `0`，则添加两个物品属性“受损”和“伤害”。 |
| `stacksTo`        | 设置最大堆叠大小。你无法拥有一个既可受损又可堆叠的物品。|
| `setNoRepair`     | 即使物品可受损，也使此物品无法修复。        |
| `craftRemainder`  | 设置此物品的容器物品，就像岩浆桶用完后给你一个空桶一样。 |

上述方法是可链式调用的，这意味着它们会 `return this` 以便于连续调用。

### 高级物品

如上设置物品属性仅适用于简单物品。如果你需要更复杂的物品，应该继承 `Item` 类并重写其方法。

## 创造模式标签

可以通过 [mod 事件总线][modbus] 上的 `BuildCreativeModeTabContentsEvent` 将物品添加到 `CreativeModeTab`。通过 `#accept` 可以无需额外配置地添加物品。

```java
// 注册到 MOD 事件总线
// 假设我们有名为 ITEM 和 BLOCK 的 RegistryObject<Item> 和 RegistryObject<Block>
@SubscribeEvent
public void buildContents(BuildCreativeModeTabContentsEvent event) {
  // 添加到材料标签
  if (event.getTabKey() == CreativeModeTabs.INGREDIENTS) {
    event.accept(ITEM);
    event.accept(BLOCK); // 接受一个 ItemLike，假设方块已经注册为物品
  }
}
```

你还可以在 `FeatureFlagSet` 中通过 `FeatureFlag` 以及一个布尔值来判断玩家是否有权限查看操作员创造模式标签，从而启用或禁用物品的添加。

### 自定义创造模式标签

必须[注册][registering]一个自定义的 `CreativeModeTab`。构建器可以通过 `CreativeModeTab#builder` 创建。标签可以设置标题、图标、默认物品以及其他多个属性。此外，Forge 提供了额外的方法来定制标签的图像、标签和插槽颜色，标签应该排列的位置等。

```java
// 假设我们有一个名为 REGISTRAR 的 DeferredRegister<CreativeModeTab>
// 假设我们有名为 ITEM 和 BLOCK 的 RegistryObject<Item> 和 RegistryObject<Block>
public static final RegistryObject<CreativeModeTab> EXAMPLE_TAB = REGISTRAR.register("example", () -> CreativeModeTab.builder()
  // 设置标签显示的名称
  .title(Component.translatable("item_group." + MOD_ID + ".example"))
  // 设置创造模式标签的图标
  .icon(() -> new ItemStack(ITEM.get()))
  // 添加默认物品到标签中
  .displayItems((params, output) -> {
    output.accept(ITEM.get());
    output.accept(BLOCK.get());
  })
  .build()
);
```

注册一个物品
-------------------

物品必须[注册][registering]才能正常运行。

[modbus]: ../concepts/events.md#mod-event-bus
[registering]: ../concepts/registries.md#methods-for-registering