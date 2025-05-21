---
title: 模型加载-ItemOverrides
order: 7
toc: content
group:
  title: 渲染
  order: 9994
---
`ItemOverrides`
==================

`ItemOverrides` 提供了一种方式让 [`BakedModel`][baked] 处理 `ItemStack` 的状态并返回一个新的 `BakedModel`；此后，返回的模型将替换旧的模型。`ItemOverrides` 代表一个任意的函数 `(BakedModel, ItemStack, ClientLevel, LivingEntity, int)` → `BakedModel`，使其对动态模型很有用。在原版中，它用于实现物品属性重写。

### `ItemOverrides()`

给定一个 `ItemOverride` 的列表，构造函数会复制并烘焙此列表。烘焙后的重写可以通过 `#getOverrides` 访问。

### `resolve`

此方法接受一个 `BakedModel`、一个 `ItemStack`、一个 `ClientLevel`、一个 `LivingEntity` 和一个 `int` 以生成用于渲染的另一个 `BakedModel`。这里是模型可以处理其物品状态的地方。

这不应该改变当前的等级状态。

### `getOverrides`

返回一个包含此 `ItemOverrides` 使用的所有 [`BakedOverride`][override] 的不可变列表。如果没有适用的，则返回空列表。

## `BakedOverride`

此类代表一个原版物品重写，其中包含多个 `ItemOverrides$PropertyMatcher`，用于物品的属性以及在这些匹配器满足时使用的模型。它们是原版物品 JSON 模型的 `overrides` 数组中的对象：

```js
{
  // 在一个原版 JSON 物品模型中
  "overrides": [
    {
      // 这是一个 ItemOverride
      "predicate": {
        // 这是一个 Map<ResourceLocation, Float>，包含属性的名称及其最小值
        "example1:prop": 0.5
      },
      // 这是重写的 'location' 或目标模型，当上述条件匹配时使用
      "model": "example1:item/model"
    },
    {
      // 这是另一个 ItemOverride
      "predicate": {
        "example2:prop": 1
      },
      "model": "example2:item/model"
    }
  ]
}
```

[baked]: ./bakedmodel.md
[override]: #bakedoverride