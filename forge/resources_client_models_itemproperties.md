---
title: 客户端-模型-物品属性
order: 3
toc: content
group:
  title: 资源包
  order: 9995
---
物品属性
===============

物品属性是一种将物品的“属性”暴露给模型系统的方式。一个例子是弓，其中最重要的属性是弓被拉开的距离。此信息随后用于为弓选择模型，并为其拉动创建动画。

物品属性为注册的每个 `ItemStack` 分配一个特定的 `float` 值，原版物品模型定义可以使用这些值来定义“重载”，即物品默认为某个模型，但是如果重载匹配，则覆盖模型并使用另一个模型。它们主要有用之处在于它们是连续的。例如，弓使用物品属性来定义其拉动动画。物品模型由“浮点”数值谓词决定，这个数值不限，但通常在 `0.0F` 到 `1.0F` 之间。这使得资源包可以在这个范围内为弓的拉动动画添加任意数量的模型，而不是局限于动画中的四个“槽”。指南针和时钟也是如此。

为物品添加属性
--------------------------

使用 `ItemProperties#register` 向某个物品添加属性。`Item` 参数是属性要附加到的物品（例如 `ExampleItems#APPLE`）。`ResourceLocation` 参数是赋予属性的名称（例如 `new ResourceLocation("pull")`）。`ItemPropertyFunction` 是一个功能接口，接收 `ItemStack`、它所在的 `ClientLevel`（可能为 null）、持有它的 `LivingEntity`（可能为 null）、包含持有实体 id 的 `int`（可能为 `0`），返回该属性的 `float` 值。对于模组自定义的物品属性，建议使用模组的 id 作为命名空间（例如 `examplemod:property` 而不是仅仅 `property`，因为那意味着 `minecraft:property`）。这些应该在 `FMLClientSetupEvent` 中完成。此外，还有另一种方法 `ItemProperties#registerGeneric`，用于为所有物品添加属性，不需要以 `Item` 作为其参数，因为所有物品都会应用此属性。

!!! 重要
    使用 `FMLClientSetupEvent#enqueueWork` 来进行这些任务，因为 `ItemProperties` 中的数据结构不是线程安全的。

!!! 注意
    `ItemPropertyFunction` 被 Mojang 标记为过时，建议使用子接口 `ClampedItemPropertyFunction`，将结果限制在 `0` 和 `1` 之间。

使用重载
---------------

重载格式可以在 [wiki][format] 上查看，一个很好的例子可以在 `model/item/bow.json` 中找到。参考下面的假设例子，一个具有 `examplemod:power` 属性的物品。如果值没有匹配，则默认使用当前模型，但是如果有多个匹配，则会选择列表中的最后一个匹配项。

!!! 重要
    一个谓词适用于所有大于或等于给定值的数值。

```js
{
  "parent": "item/generated",
  "textures": {
    // 默认
    "layer0": "examplemod:items/example_partial"
  },
  "overrides": [
    {
      // power >= .75
      "predicate": {
        "examplemod:power": 0.75
      },
      "model": "examplemod:item/example_powered"
    }
  ]
}
```

下面是支持代码的假设片段。与旧版本（低于 1.16.x）不同，这仅需要在客户端上完成，因为 `ItemProperties` 在服务器上不存在。

```java
private void setup(final FMLClientSetupEvent event)
{
  event.enqueueWork(() ->
  {
    ItemProperties.register(ExampleItems.APPLE, 
      new ResourceLocation(ExampleMod.MODID, "pulling"), (stack, level, living, id) -> {
        return living != null && living.isUsingItem() && living.getUseItem() == stack ? 1.0F : 0.0F;
      });
  });
}
```

[format]: https://minecraft.wiki/w/Tutorials/Models#Item_models