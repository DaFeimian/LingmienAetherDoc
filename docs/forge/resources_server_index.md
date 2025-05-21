---
title: 服务端-数据包
order: 4
toc: content
group:
  title: 资源包
  order: 9995
---
数据包
=========
在 1.13 版本中，Mojang 将[数据包][datapack]加入到了基础游戏中。它们允许通过 `data` 目录修改逻辑服务器的文件。这包括进阶、战利品表、结构、配方、标签等。Forge 和你的模组也可以拥有数据包。因此，任何用户都可以修改此目录中定义的所有配方、战利品表和其他数据。

### 创建数据包
数据包存储在项目资源的 `data` 目录中。
你的模组可以拥有多个数据域，因为你可以添加或修改已有的数据包，比如原版的、Forge的或其他模组的。
你可以按照[这里][createdatapack]的步骤来创建任何数据包。

更多阅读：[资源位置][resourcelocation]

[datapack]: https://minecraft.wiki/w/Data_pack
[createdatapack]: https://minecraft.wiki/w/Tutorials/Creating_a_data_pack
[resourcelocation]: ../../concepts/resources.md#ResourceLocation

