---
title: 客户端-资源包
order: 0
toc: content
group:
  title: 资源包
  order: 9995
---
资源包
==============

[资源包][respack]允许通过`assets`目录自定义客户端资源。这包括纹理、模型、音效、本地化等。你的模组（以及Forge本身）也可以拥有资源包。因此，任何用户都可以修改此目录中定义的所有纹理、模型和其他资产。

### 创建资源包
资源包存储在项目的资源文件夹内。`assets`目录包含包的内容，而包本身通过与`assets`文件夹并排的`pack.mcmeta`定义。
你的模组可以有多个资产域，因为你可以添加或修改已经存在的资源包，比如原版的、Forge的或其他模组的。
你可以按照[Minecraft Wiki上的步骤][createrespack]来创建任何资源包。

进一步阅读：[资源位置][resourcelocation]

[respack]: https://minecraft.wiki/w/Resource_Pack
[createrespack]: https://minecraft.wiki/w/Tutorials/Creating_a_resource_pack
[resourcelocation]: ../../concepts/resources.md#ResourceLocation