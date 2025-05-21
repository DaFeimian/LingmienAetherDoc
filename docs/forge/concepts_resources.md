---
title: 资源
order: 4
toc: content
group:
  title: 核心概念
  order: 9985
---
资源
=========

资源是在游戏中使用的额外数据，存储在数据文件中，而不是代码中。 
《Minecraft》有两个主要的资源系统：一个在逻辑客户端上用于视觉效果，如模型、纹理和本地化，称为`assets`；另一个在逻辑服务器上用于游戏玩法，如配方和战利品表，称为`data`。
[资源包][respack]控制前者，而[数据包][datapack]控制后者。

在默认的模组开发套件中，assets和data目录位于项目的`src/main/resources`目录下。

当多个资源包或数据包启用时，它们会被合并。通常情况下，位于堆栈顶部包中的文件会覆盖下面的文件；然而，对于某些文件，如本地化文件和标签，数据实际上是以内容的方式合并的。模组在其`resources`目录中定义资源和数据包，但它们被视作"Mod Resources"包的子集。模组资源包无法被禁用，但可以被其他资源包覆盖。可以使用原版的`/datapack`命令禁用模组数据包。

所有的资源都应该使用蛇形命名法的路径和文件名（小写并使用“_”作为单词边界），在1.11及以上版本中强制执行。

`ResourceLocation`
------------------

Minecraft使用`ResourceLocation`来识别资源。一个`ResourceLocation`包含两部分：命名空间和路径。它通常指向`assets/<namespace>/<ctx>/<path>`下的资源，其中`ctx`是一个基于`ResourceLocation`使用场景的上下文相关路径片段。当一个`ResourceLocation`以字符串形式读写时，它显示为`<namespace>:<path>`。如果省略命名空间和冒号，当字符串被读入`ResourceLocation`时，命名空间默认为`"minecraft"`。一个模组应该将其资源放入一个与其mod id相同名称的命名空间中（例如，一个id为`examplemod`的模组应该将其资源分别放在`assets/examplemod`和`data/examplemod`中，指向这些文件的`ResourceLocation`看起来像`examplemod:<path>`）。这不是强制要求的，在某些情况下，使用不同（甚至多个）命名空间是非常有利的。`ResourceLocation`也在资源系统之外使用，因为它们恰好是唯一标识对象的好方法（例如，[注册表][registries]）。

[respack]: ../resources/client/index.md
[datapack]: ../resources/server/index.md
[registries]: ./registries.md