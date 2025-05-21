---
title: 模型扩展-面部数据
order: 3
toc: content
group:
  title: 渲染
  order: 9994
---
面部数据
=========

在标准的“元素”模型中，可以在元素层级或面部层级指定关于一个元素的面部的附加数据。未指定其自身面部数据的面将回退到元素的面部数据，如果在元素层级没有指定面部数据，则使用默认值。

要为生成的物品模型使用此扩展，模型必须通过 `forge:item_layers` 模型加载器加载，因为标准的物品模型生成器未被扩展以读取这些额外数据。

所有的面部数据值都是可选的。

元素模型
--------------

在标准的"元素"模型中，面部数据适用于其被指定的面部，或适用于其被指定的元素中所有未拥有自身面部数据的面部。

!!!注意
    如果在一个面上指定了 `forge_data`，它将不会继承元素级别 `forge_data` 声明中的任何参数。

可以通过以下两种方式指定附加数据，如这两种示例所示：
```js
{
  "elements": [
    {
      "forge_data": {
        "color": "0xFFFF0000",
        "block_light": 15,
        "sky_light": 15,
        "ambient_occlusion": false
      },
      "faces": {
        "north": {
          "forge_data": {
            "color": "0xFFFF0000",
            "block_light": 15,
            "sky_light": 15,
            "ambient_occlusion": false
          },
          // ...
        },
        // ...
      },
      // ...
    }
  ]
}
```

生成物品模型
--------------------

在使用 `forge:item_layers` 加载器生成的物品模型中，为每一纹理层指定面部数据并适用于所有几何体（前/背面四边形和边缘四边形）。

`forge_data` 字段必须位于模型 JSON 的顶层，其中每个键值对将面部数据对象关联到层索引。

以下示例中，层 1 将被染成红色并以全亮度发光：
```js
{
  "textures": {
    "layer0": "minecraft:item/stick",
    "layer1": "minecraft:item/glowstone_dust"
  },
  "forge_data": {
    "1": {
      "color": "0xFFFF0000",
      "block_light": 15,
      "sky_light": 15,
      "ambient_occlusion": false
    }
  }
}
```

参数
----------

### 颜色

通过 `color` 条目指定一个颜色值将该颜色作为着色应用于四边形。默认为 `0xFFFFFFFF`（白色，完全不透明）。颜色必须是打包成一个32位整数的 `ARGB` 格式，可以指定为十六进制字符串（`"0xAARRGGBB"`）或作为十进制整数字面值（JSON不支持十六进制整数字面值）。

!!! 警告
    四种颜色成分会与纹理的像素相乘。省略 alpha 成分相当于将其设为0，这将使得几何体完全透明。

如果颜色值是常量，可以将其用作替代 [`BlockColor` 和 `ItemColor`][tinting]。

### 方块和天空光照

分别通过 `block_light` 和 `sky_light` 条目指定方块和/或天空光照值，将覆盖四边形的相应光照值。两个值默认为 0。值必须在 0-15（包括 0 和 15）的范围内，并在显示面部时视为相应光照类型的最小值，这意味着在世界中的相应光照类型的较高值会覆盖指定的值。

指定的光照值纯粹是客户端的，不会影响服务器的光照等级或周围方块的亮度。

### 环境光遮蔽

指定 `ambient_occlusion` 标志将配置[环境光遮蔽]对四边形的影响。默认为 `true`。此标志的行为等同于标准格式的顶层 `ambientocclusion` 标志。

![环境光遮蔽效果][ao_img]  
*左侧启用环境光遮蔽，右侧禁用环境光遮蔽，显示为平滑光照图形设置*

!!! 注意
    如果顶层 AO 标志设置为 false，则在元素或面上将此标志指定为 true 无法覆盖顶层标志。
    ```js
    {
      "ambientocclusion": false,
      "elements": [
        {
          "forge_data": {
            "ambient_occlusion": true // 无效果
          }
        }
      ]
    }
    ```

[tinting]: ../../resources/client/models/tinting.md
[AO]: https://en.wikipedia.org/wiki/Ambient_occlusion
[ao_img]: ./ambientocclusion_annotated.png