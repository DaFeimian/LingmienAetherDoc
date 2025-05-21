---
title: 客户端-模型-介绍
order: 1
toc: content
group:
  title: 资源包
  order: 9995
---
模型
======

[模型系统][models]是Minecraft用于给方块和物品赋予形状的方法。通过模型系统，方块和物品会映射到它们的模型上，这些模型定义了它们的外观。模型系统的主要目标之一是允许通过资源包改变方块/物品的不仅仅是纹理，而是整个形状。实际上，任何添加物品或方块的模组也都包含了一个用于这些方块和物品的小型资源包。

模型文件
-----------

模型和纹理通过[`ResourceLocation`][resloc]链接，但在`ModelManager`中是使用`ModelResourceLocation`存储的。模型在不同位置的引用取决于它们是引用[方块状态][statemodel]还是[物品模型][itemmodels]，通过方块或物品的注册名来引用。方块的`ModelResourceLocation`将表示其注册名以及它当前[`BlockState`][state]的字符串化版本，而物品会通过其注册名后加`inventory`进行引用。

!!! 注意
    JSON模型仅支持立方体元素，无法表达三角楔形或类似形状。要实现更复杂的模型，必须使用其他格式。

### 纹理

与模型类似，纹理包含在资源包中，并通过`ResourceLocation`引用。在Minecraft中，[UV坐标][uv](0,0)表示纹理的**左上角**。UV坐标*总是*从0到16。如果纹理更大或更小，坐标会按比例缩放以适配。纹理还应该是正方形，纹理的边长应该是2的幂，否则会损坏mipmap（例如1x1、2x2、8x8、16x16和128x128是合适的。5x5和30x30不建议使用，因为它们不是2的幂。5x10和4x8则完全不可用，因为它们不是正方形）。只有在[动画][animated]情况下，纹理才不需要是正方形。

[models]: https://minecraft.wiki/w/Tutorials/Models#File_path
[resloc]: ../../../concepts/resources.md#resourcelocation
[statemodel]: https://minecraft.wiki/w/Tutorials/Models#Block_states
[itemmodels]: https://minecraft.wiki/w/Tutorials/Models#Item_models
[state]: ../../../blocks/states.md
[uv]: https://en.wikipedia.org/wiki/UV_mapping
[animated]: https://minecraft.wiki/w/Resource_Pack?so=search#Animation