---
title: 模型扩展-渲染类型
order: 1
toc: content
group:
  title: 渲染
  order: 9994
---
渲染类型
============

在JSON的顶层添加`render_type`条目可以向加载器建议模型应该使用的渲染类型。如果未指定，加载器将自行选择使用的渲染类型，通常会回退到`ItemBlockRenderTypes#getRenderLayers()`返回的渲染类型。

自定义模型加载器可能会完全忽略此字段。

!!! 注意
    从1.19版开始，这种方法比通过`ItemBlockRenderTypes#setRenderLayer()`为方块设置适用渲染类型的过时方法更为推荐。

以下是一个使用玻璃材质的镂空方块模型示例：

```js
{
  "render_type": "minecraft:cutout",
  "parent": "block/cube_all",
  "textures": {
    "all": "block/glass"
  }
}
```

原版值
--------------

以下选项及其相应的区块和实体渲染类型由Forge提供（`NamedRenderTypeManager#preRegisterVanillaRenderTypes()`）：

* `minecraft:solid`
    * 区块渲染类型：`RenderType#solid()`
    * 实体渲染类型：`ForgeRenderTypes#ITEM_LAYERED_SOLID`
    * 用于完全实心的方块（如石头）
* `minecraft:cutout`
    * 区块渲染类型：`RenderType#cutout()`
    * 实体渲染类型：`ForgeRenderTypes#ITEM_LAYERED_CUTOUT`
    * 用于任意给定像素要么完全透明要么完全不透明的方块（如玻璃方块）
* `minecraft:cutout_mipped`
    * 区块渲染类型：`RenderType#cutoutMipped()`
    * 实体渲染类型：`ForgeRenderTypes#ITEM_LAYERED_CUTOUT`
    * 区块和实体渲染类型不同是因为在实体渲染类型上使用mipmapping会导致物品显示异常
    * 用于任意给定像素要么完全透明要么完全不透明且贴图应在较远距离缩小（[mipmapping]）以避免视觉瑕疵的方块（如树叶）
* `minecraft:cutout_mipped_all`
    * 区块渲染类型：`RenderType#cutoutMipped()`
    * 实体渲染类型：`ForgeRenderTypes#ITEM_LAYERED_CUTOUT_MIPPED`
    * 用于与`minecraft:cutout_mipped`类似的情况，当物品表示也应应用mipmapping时使用
* `minecraft:translucent`
    * 区块渲染类型：`RenderType#translucent()`
    * 实体渲染类型：`ForgeRenderTypes#ITEM_LAYERED_TRANSLUCENT`
    * 用于任意给定像素可能部分透明的方块（如染色玻璃）
* `minecraft:tripwire`
    * 区块渲染类型：`RenderType#tripwire()`
    * 实体渲染类型：`ForgeRenderTypes#ITEM_LAYERED_TRANSLUCENT`
    * 区块和实体渲染类型不同是因为绊线渲染类型不适合作为实体渲染类型
    * 用于需要渲染到天气渲染目标（如绊线）上的方块

自定义值
-------------

在`RegisterNamedRenderTypesEvent`中可以注册在模型中指定的自定义命名渲染类型。此事件在模组事件总线中触发。

自定义命名渲染类型由两个或三个组件组成：

* 区块渲染类型 - 可以使用`RenderType.chunkBufferLayers()`返回列表中的任意类型
* 使用`DefaultVertexFormat.NEW_ENTITY`顶点格式的渲染类型（“实体渲染类型”）
* 当选择*Fabulous!*图形模式时使用的`DefaultVertexFormat.NEW_ENTITY`顶点格式的渲染类型（可选）

当作为区块几何的一部分渲染使用此命名渲染类型的方块时，使用区块渲染类型。  
当物品在快速和华丽图形模式（库存、地面、物品框等）中渲染时，使用所需的实体渲染类型。  
当选择*Fabulous!*图形模式时，可选的实体渲染类型以与所需实体渲染类型相同的方式使用。当所需的实体渲染类型在*Fabulous!*图形模式下不起作用的情况时（通常仅适用于半透明渲染类型），需要这种渲染类型。

```java
public static void onRegisterNamedRenderTypes(RegisterNamedRenderTypesEvent event)
{
  event.register("special_cutout", RenderType.cutout(), Sheets.cutoutBlockSheet());
  event.register("special_translucent", RenderType.translucent(), Sheets.translucentCullBlockSheet(), Sheets.translucentItemSheet());
}
```

然后可以在JSON中以`<your_mod_id>:special_cutout`和`<your_mod_id>:special_translucent`来引用这些。

[mipmapping]: https://en.wikipedia.org/wiki/Mipmap