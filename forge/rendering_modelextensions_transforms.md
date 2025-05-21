---
title: 模型扩展-根变换
order: 0
toc: content
group:
  title: 渲染
  order: 9994
---
根变换
===============

在模型 JSON 的顶层添加 `transform` 条目，建议加载器在方块模型的 [blockstate] 文件旋转前和物品模型的[display transforms][displaytransform]之前对所有几何体应用一个变换。可以通过 `IGeometryBakingContext#getRootTransform()` 在 `IUnbakedGeometry#bake()` 中获得该变换。

自定义模型加载器可以完全忽略此字段。

根变换可以用以下两种格式指定：

1. 一个 JSON 对象，包含一个 `matrix` 条目，内含一个以嵌套 JSON 数组形式表示的原始变换矩阵，最后一行省略（3*4 矩阵，行主顺序）。矩阵按以下顺序组合：平移、左旋转、缩放、右旋转和变换原点。结构示例：
    ```js
    "transform": {
        "matrix": [
            [ 0, 0, 0, 0 ],
            [ 0, 0, 0, 0 ],
            [ 0, 0, 0, 0 ]
        ]
    }
    ```
2. 一个 JSON 对象，包含以下任意组合的可选条目：
    * `origin`：用于旋转和缩放的原点
    * `translation`：相对平移
    * `rotation` 或 `left_rotation`：在缩放前应用的围绕平移原点的旋转
    * `scale`：相对于平移原点的缩放
    * `right_rotation` 或 `post_rotation`：在缩放后应用的围绕平移原点的旋转

逐项指定
-------------------------

如果变换是以选项4中提到的条目组合方式指定的，这些条目将按 `translation`、`left_rotation`、`scale`、`right_rotation` 的顺序应用。  
变换在最后一步移动至指定原点。

```js
{
    "transform": {
        "origin": "center",
        "translation": [ 0, 0.5, 0 ],
        "rotation": { "y": 45 }
    },
    // ...
}
```

元素定义如下：

### 原点

原点可以指定为一个包含三个浮点值的数组，表示三维向量：`[ x, y, z ]`，或者是以下三个默认值之一：

* `"corner"` (0, 0, 0)
* `"center"` (.5, .5, .5)
* `"opposing-corner"` (1, 1, 1)

如果未指定原点，则默认为 `"opposing-corner"`。

### 平移

平移必须指定为包含三个浮点值的数组，表示三维向量：`[ x, y, z ]`，如果不存在则默认为 (0, 0, 0)。

### 左旋转和右旋转

旋转可以通过以下四种方式中的任意一种指定：

* 单个 JSON 对象，具有单个轴=》旋转度数映射：`{ "x": 90 }`
* 具有上述格式的任意数量 JSON 对象的数组（按指定顺序应用）：`[ { "x": 90 }, { "y": 45 }, { "x": -22.5 } ]`
* 包含3个浮点值的数组，指定围绕每个轴的旋转度数：`[ 90, 180, 45 ]`
* 包含4个浮点值的数组，直接指定四元数：`[ 0.38268346, 0, 0, 0.9238795 ]`（示例等于围绕 X 轴旋转45度）

如果未指定相应的旋转，将默认为无旋转。

### 缩放

缩放必须指定为一个包含三个浮点值的数组，表示三维向量：`[ x, y, z ]`，如果不存在则默认为 (1, 1, 1)。

[blockstate]: https://minecraft.wiki/w/Tutorials/Models#Block_states
[displaytransform]: ../modelloaders/transform.md