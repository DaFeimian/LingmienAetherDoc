---
title: 模型加载-BakedModel
order: 5
toc: content
group:
  title: 渲染
  order: 9994
---
`BakedModel`
=============

`BakedModel` 是调用 `UnbakedModel#bake` 对于原版模型加载器或 `IUnbakedGeometry#bake` 对于自定义模型加载器后的结果。与单纯表示形状而没有任何物品或方块概念的 `UnbakedModel` 或 `IUnbakedGeometry` 不同，`BakedModel` 并没有那么抽象。它表示被优化和简化到几乎可以直接发送到 GPU 的几何体。它还可以处理物品或方块的状态以改变模型。

在大多数情况下，实际上不需要手动实现此接口。可以使用现有的实现之一。

### `getOverrides`

返回用于此模型的 [`ItemOverrides`][overrides]。仅当此模型作为物品渲染时才使用此项。

### `useAmbientOcclusion`

如果模型在关卡中作为方块渲染，并且该方块不发光且启用了环境光遮蔽，模型将以[环境光遮蔽](ambocc) 的方式渲染。

### `isGui3d`

如果模型作为物品在库存中、以实体形式在地面上、在物品展示框中等被渲染，这使得模型看起来“平坦”。在 GUI 中，这也会禁用照明。

### `isCustomRenderer`

!!! 重要
    除非你知道自己在做什么，否则只需 `return false` 并继续。

将此作为物品渲染时，返回 `true` 会导致模型不被渲染，而是回退到 `BlockEntityWithoutLevelRenderer#renderByItem`。对于某些原版物品如箱子和旗帜，此方法硬编码为从物品中复制数据到 `BlockEntity`，然后使用 `BlockEntityRenderer` 来渲染该块实体以替代物品。对于所有其他物品，它将使用 `IClientItemExtensions#getCustomRenderer` 提供的 `BlockEntityWithoutLevelRenderer` 实例。有关更多信息，请参考 [BlockEntityWithoutLevelRenderer][bewlr] 页面。

### `getParticleIcon`

粒子应该使用的纹理。对于方块来说，当实体落在其上时、当它破碎时等会显示。对于物品来说，当它破碎或被食用时会显示。

!!! 重要
    无参数的原版方法已被弃用，建议使用 `#getParticleIcon(ModelData)`，因为模型数据可能会影响特定模型的渲染方式。

### <s>`getTransforms`</s>

建议实现 `#applyTransform` 来替代。默认实现如果 `#applyTransform` 被实现则是可以的。参见 [Transform][transform]。

### `applyTransform`

参见 [Transform][transform]。

### `getQuads`

这是 `BakedModel` 的主要方法。它返回一个 `BakedQuad` 的列表：这些对象包含将用于渲染模型的低级顶点数据。如果模型被渲染成方块，那么传入的 `BlockState` 非空。如果模型被渲染为物品，`#getOverrides` 返回的 `ItemOverrides` 负责处理物品状态，此时 `BlockState` 参数将是 `null`。

!!! 注意 
    `BakedQuad` 中顶点的原点是底部西北角。顶点坐标值小于 0 或大于 1 将使顶点位于方块之外。为了避免照明问题，请按逆时针顺序提供顶点。

传入的 `Direction` 用于面剔除。如果所渲染的另一个方块相邻的面是遮光的，那么与该面的相关面将不会被渲染。如果该参数为 `null`，所有与某个面无关的面将被返回（这些面永远不会被剔除）。

`rand` 参数是一个 Random 实例。

它还接受一个非空的 `ModelData` 实例。可以使用它通过 `ModelProperty`s 定义在渲染特定模型时的额外数据。例如，一个这样的属性就是 `CompositeModel$Data`，它用于存储使用 `forge:composite` 模型加载器的模型的任何附加子模型数据。

请注意，此方法被调用的频率非常高：每个关卡中的每个方块的非剔除面组合和支持的方块渲染层组合（0 到 28 次之间）的每种情况都调用一次。此方法应尽可能快，并且可能需要大量缓存。

[overrides]: ./itemoverrides.md
[ambocc]: https://en.wikipedia.org/wiki/Ambient_occlusion
[bewlr]: ../../items/bewlr.md
[transform]: ./transform.md