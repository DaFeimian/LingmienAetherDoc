---
title: 自定义玩家渲染
order: 1
toc: content
group:
  title: 配置组件
  order: 2
---

# 自定义玩家渲染

:::success{title=太棒了}
- 使用自动化程序创建[自定义玩家渲染](http://1.94.129.175:8000/docs/auto-customplayerrender)帮助你快速导入资产和编写自定义玩家渲染Json
- 原本需要2~4小时的开发周期，现仅需*5分钟*！
:::

## 描述
如果没有指定渲染控制器，将会自动使用名为`geometry.{JsonId}`的模型及位于资源包`/textures/entity/{JsonId}`的模型贴图

## 示例
```json
{
  "format_version": "1.2.1",
  "dafeimian:render": {
    "components": {
      "dafeimian:entity": {
        "animations": [
          "idle",
          "none"
        ],
        "animation_controllers": [
          "controller.animation.bgbox.idle"
        ],
        "render_controllers": [
          {
            "controller.render.la": "!query.mod.la"
          },
          {
            "controller.render.is_la": "query.mod.la"
          }
        ],
        "material_by_render_controller": {
          "la": "dfm_nolight"
        },
        "geometry_by_render_controller": {
          "la": "geometry.bgbox"
        },
        "texture_by_render_controller": {
          "la": "textures/entity/bgbox",
          "is_la": "textures/entity/bgbox_mohu"
        }
      }
    }
  }
}
```

## components
<Badge type="info">json</Badge>该Json类型的组件库

### dafeimian:entity
<Badge type="error">必需</Badge><Badge type="info">json</Badge>自定义玩家实体渲染

:::info{title=提示}
- animations动画Id列表可以填写*完整动画Id*(animation.xxx.zzz)，也可以填写*短动画Id*(zzz)，将会自动补全为(animation.{JsonId}.zzz)，这将指定`xxx`
- 例如：一个名为dafeimian.json的自定义玩家渲染Json，我将animations动画Id列表中填写`animation.player.idle`和`walk`，那么实际渲染的完整动画Id为
    - animation.player.idle
    - animation.dafeimian.walk
- 如果将animations动画Id列表中填写`animation.player.idle`和`idle`，这是不被允许的，因为两者*动画键*将被命名为`idle`，对此该配置组件暂未进行区分规避*动画键*
:::

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|animations|list|[]|动画Id列表|
|animation_controllers|list|[]|动画控制器|
|material|str|entity_alphatest_netease|默认渲染控制器的渲染材质|
|render_controllers|list|[]|指定自定义渲染控制器，否则使用默认渲染控制器|
|material_by_render_controller|json|{}|当指定自定义渲染控制器时，为该渲染控制器指定材质|
|geometry_by_render_controller|json|{}|当指定自定义渲染控制器时，为该渲染控制器指定模型|
|texture_by_render_controller|json|{}|当指定自定义渲染控制器时，为该渲染控制器指定纹理|

#### render_controllers
<Badge type="info">str, json</Badge>指定自定义渲染控制器，可以添加条件

#### material_by_render_controller
<Badge type="info">json</Badge>为渲染控制器指定材质，其中key为渲染控制器指定材质Key，value为该材质Key使用的材质Id

#### geometry_by_render_controller
<Badge type="info">json</Badge>为渲染控制器指定模型，其中key为渲染控制器指定模型Key，value为该模型Key使用的模型Id

#### texture_by_render_controller
<Badge type="info">json</Badge>为渲染控制器指定纹理，其中key为渲染控制器指定纹理Key，value为该纹理Key使用的纹理路径

### dafeimian:hide_item_inhand
<Badge type="success">选填</Badge><Badge type="info">int</Badge>隐藏手中物品，仅可取值如下：
- 0： 表示第一人称和第三人称下均隐藏手持物品
- 1： 表示仅隐藏第三人称下的手持物品
- 2： 表示仅隐藏第一人称下的手持物品