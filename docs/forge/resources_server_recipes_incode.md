---
title: 服务端-配方-非数据包配方
order: 8
toc: content
group:
  title: 资源包
  order: 9995
---
非数据包配方
================

并不是所有的配方都足够简单或迁移到了使用数据驱动的配方。一些子系统仍然需要在代码库中进行修改，以支持添加新的配方。

酿造配方
---------------

酿造是为数不多的仍然存在于代码中的配方之一。酿造配方作为引导程序的一部分，被添加到 `PotionBrewing` 中，用于其容器、容器配方和药水混合物。为了扩展现有系统，Forge 允许通过在 `FMLCommonSetupEvent` 中调用 `BrewingRecipeRegistry#addRecipe` 来添加酿造配方。

!!! 警告
    `BrewingRecipeRegistry#addRecipe` 必须通过 `#enqueueWork` 在同步工作队列中调用，因为该方法不是线程安全的。

默认实现在标准实现中需要输入材料、催化剂材料和堆栈输出。此外，还可以提供一个 `IBrewingRecipe` 实例来进行转换。

### IBrewingRecipe

`IBrewingRecipe` 是一个伪 `Recipe` 接口，它检查输入和催化剂是否有效，并在有效的情况下提供关联的输出。这通过 `#isInput`、`#isIngredient` 和 `#getOutput` 来实现。输出方法可以访问输入和催化剂堆栈以构建结果。

!!! 重要
    在 `ItemStack` 或 `CompoundTag` 之间复制数据时，确保使用它们各自的 `#copy` 方法来创建独特实例。

没有类似于原版的添加额外药水容器或药水混合物的包装器。将需要添加新的 `IBrewingRecipe` 实现来复制此行为。

铁砧配方
-------------

铁砧负责接受损坏的输入，并给予一定数量的材料或相似的输入，从而减少输入结果上的一些损坏。因此，其系统不易于数据驱动。然而，由于铁砧配方是输入加上一些材料等于某些输出，当用户具有所需的经验等级时，可以通过 `AnvilUpdateEvent` 修饰创建伪配方系统。这会接收输入和材料，并允许模组开发者指定输出、经验等级消耗以及用于输出的材料数量。事件也可以通过 [取消] 来阻止任何输出。

```java
// 检查左侧和右侧物品是否正确
// 当正确时，设置输出、经验等级消耗和材料数量
public void updateAnvil(AnvilUpdateEvent event) {
  if (event.getLeft().is(...) && event.getRight().is(...)) {
    event.setOutput(...);
    event.setCost(...);
    event.setMaterialCost(...);
  }
}
```

更新事件必须 [附加] 到 Forge 事件总线。

织布机配方
-------------

织布机负责将染料和图案（无论是来自织布机还是物品）应用于旗帜。虽然旗帜和染料必须分别是 `BannerItem` 或 `DyeItem`，但自定义图案可以创建并在织布机中应用。旗帜图案可以通过 [注册] `BannerPattern` 来创建。

!!! 重要
    在 `minecraft:no_item_required` 标签中的 `BannerPattern` 会在织布机中显示为一个选项。不在此标签中的图案必须有一个伴随的 `BannerPatternItem` 以及一个关联的标签才能使用。

```java
private static final DeferredRegister<BannerPattern> REGISTER = DeferredRegister.create(Registries.BANNER_PATTERN, "examplemod");

// 接收需要通过网络发送的图案名称
public static final BannerPattern EXAMPLE_PATTERN = REGISTER.register("example_pattern", () -> new BannerPattern("examplemod:ep"));
```

[recipe]: ./custom.md#recipe
[cancel]: ../../../concepts/events.md#canceling
[attached]: ../../../concepts/events.md#creating-an-event-handler
[registering]: ../../../concepts/registries.md#registries-that-arent-forge-registries