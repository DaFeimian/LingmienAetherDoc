---
title: 模型扩展-部件可见性
order: 2
toc: content
group:
  title: 渲染
  order: 9994
---
部件可见性
===============

在模型的 JSON 文件顶层添加 `visibility` 条目可以控制模型不同部件的可见性，以决定这些部件是否应该被纳入最终的 [`BakedModel`][bakedmodel] 中。一个“部件”的定义取决于加载此模型的模型加载器，定制的模型加载器可以完全忽略此条目。在 Forge 提供的模型加载器中，只有[复合模型加载器][composite]和 [OBJ 模型加载器][obj] 利用了此功能。可见性条目以 `"部件名称": boolean` 的形式指定。

以下是一个包含两个部件的复合模型的示例，其中第二个部件不会被烘焙到最终模型中，有两个子模型分别覆盖了该可见性设置，以显示仅第一个部件和两个部件：

```js
// mycompositemodel.json
{
  "loader": "forge:composite",
  "children": {
    "part_one": {
      "parent": "mymod:mypartmodel_one"
    },
    "part_two": {
      "parent": "mymod:mypartmodel_two"
    }
  },
  "visibility": {
    "part_two": false
  }
}

// mycompositechild_one.json
{
  "parent": "mymod:mycompositemodel",
  "visibility": {
    "part_one": false,
    "part_two": true
  }
}

// mycompositechild_two.json
{
  "parent": "mymod:mycompositemodel",
  "visibility": {
    "part_two": true
  }
}
```

给定部件的可见性通过先检查模型是否为该部件指定了可见性来确定，如果没有指定，则递归检查模型的父级，直到找到某个条目，或者没有进一步的父级可以检查，这种情况下可见性默认为 true。

这允许如下设置，多个模型使用单一复合模型的不同部件：

1. 一个复合模型指定多个组件
2. 多个模型将此复合模型指定为它们的父级
3. 这些子模型分别为部件指定不同的可见性

[bakedmodel]: ../modelloaders/bakedmodel.md
[composite]: ../modelloaders/index.md/#composite-models
[obj]: ../modelloaders/index.md/#wavefront-obj-models