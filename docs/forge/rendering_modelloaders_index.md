---
title: 模型加载-介绍
order: 4
toc: content
group:
  title: 渲染
  order: 9994
---
自定义模型加载器
====================

“模型”只是一个形状。它可以是一个简单的立方体，可以是多个立方体，可以是一个截角二十面体，或者介于两者之间的任何形状。大多数你会看到的模型将采用原生的 JSON 格式。其他格式的模型在运行时通过 `IGeometryLoader` 加载到 `IUnbakedGeometry` 中。Forge 提供了用于 WaveFront OBJ 文件、桶、复合模型、不同渲染层的模型，以及对原生 `builtin/generated` 物品模型的重新实现的默认实现。大多数情况下，人们并不关心是谁加载了模型或其格式为何，因为这些模型最终都会在代码中被表示为 `BakedModel`。

!!! 警告
    在模型 JSON 的顶级 `loader` 项中指定自定义模型加载器将导致 `elements` 项被忽略，除非自定义加载器使用了它。所有其他原生项仍会加载并可在未烘焙的 `BlockModel` 表示中使用，并且可能在自定义加载器之外被使用。

WaveFront OBJ 模型
--------------------

Forge 为 `.obj` 文件格式添加了一个加载器。要使用这些模型，JSON 必须引用 `forge:obj` 加载器。此加载器接受任何位于注册命名空间中的模型位置，并且路径以 `.obj` 结尾。`.mtl` 文件应放置在与 `.obj` 文件相同的位置并具有相同的名称，以便自动使用。可能需要手动编辑 `.mtl` 文件，以更改指向 JSON 中定义的纹理的路径。此外，纹理的 V 轴可能会翻转，这取决于创建模型的外部程序（即 V = 0 可能是底部边缘，而不是顶部）。这可以在建模程序本身中纠正，或者在模型 JSON 中这样进行：

```js
{
  // 添加以下行，与 'model' 声明处于同一级别
  "loader": "forge:obj",
  "flip_v": true,
  "model": "examplemod:models/block/model.obj",
  "textures": {
    // 可以在 .mtl 中使用 #texture0 引用
    "texture0": "minecraft:block/dirt",
    "particle": "minecraft:block/dirt"
  }
}
```