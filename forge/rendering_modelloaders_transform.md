---
title: 模型加载-变换
order: 6
toc: content
group:
  title: 渲染
  order: 9994
---
变换
==========

当一个[`BakedModel`][bakedmodel]作为物品被渲染时，它可以根据渲染的变换应用特殊的处理。"变换"指的是模型在什么上下文中被渲染。可能的变换在代码中由`ItemDisplayContext`枚举表示。处理变换有两个系统：已弃用的原版系统，由`BakedModel#getTransforms`、`ItemTransforms`和`ItemTransform`组成，以及Forge系统，由方法`IForgeBakedModel#applyTransform`体现。原版代码经过修补，尽可能使用`applyTransform`而非原版系统。

`ItemDisplayContext`
---------------

`NONE` - 默认用于显示实体当没有设置上下文时，以及在Forge中当`Block`的`RenderShape`设置为`#ENTITYBLOCK_ANIMATED`时使用。

`THIRD_PERSON_LEFT_HAND`/`THIRD_PERSON_RIGHT_HAND`/`FIRST_PERSON_LEFT_HAND`/`FIRST_PERSON_RIGHT_HAND` - 第一人称值表示玩家在自己手中持有物品时。第三人称值表示当其他玩家持有物品且客户端在第三人称下看着他们时。左右手显而易见。

`HEAD` - 表示任何玩家在头盔槽位穿戴该物品时（例如南瓜）。

`GUI` - 表示物品在`Screen`中渲染时。

`GROUND` - 表示物品在级别中作为`ItemEntity`渲染时。

`FIXED` - 用于物品框架。

原版方式
---------------

原版处理变换的方式是通过`BakedModel#getTransforms`。该方法返回一个`ItemTransforms`，它是一个简单的对象，包含各种`ItemTransform`作为`public final`字段。一个`ItemTransform`代表应用于模型的旋转、平移和缩放。`ItemTransforms`是这些的容器，为除了`NONE`之外的每个`ItemDisplayContext`持有一个。在原版实现中，调用`#getTransform`时`NONE`会导致默认的变换，`ItemTransform#NO_TRANSFORM`。

整个处理变换的原版系统已被Forge弃用，大多数`BakedModel`实现应该简单地从`BakedModel#getTransforms`中`return ItemTransforms#NO_TRANSFORMS`（这是默认实现）。而是应该实现`#applyTransform`。

Forge方式
-------------

Forge处理变换的方式是`#applyTransform`，一个修补到`BakedModel`中的方法。它取代了`#getTransforms`方法。

#### `BakedModel#applyTransform`

给定一个`ItemDisplayContext`、`PoseStack`和一个布尔值决定是否应用左手的变换，此方法生成一个即将渲染的`BakedModel`。因为返回的`BakedModel`可以是一个全新的模型，此方法比原版方法更灵活（例如，在手中看起来是平纸张但在地上看起来是揉皱的）。

[bakedmodel]: ./bakedmodel.md