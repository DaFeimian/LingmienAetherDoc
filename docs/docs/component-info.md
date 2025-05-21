---
title: 基础说明
order: 0
toc: content
group:
  title: 配置组件
  order: 2
---

:::warning{title=注意}
- Json文件应当放置在资源包根目录的modconfigs文件夹下(需手动创建)
- 标准的Json格式是不支持注释的！
:::

# 基础说明
## Json放置路径

<Tree>
  <ul>
    <li>
      behavior_pack_***<small>行为包</small><ul></ul>
    </li>
    <li>
      resource_pack_***<small>资源包</small><ul>
        <li>
            modconfigs<small>配置组件文件夹</small><ul>
                <li>***<small>自建文件夹分类，可以防止冲突覆盖，JsonId为'***/{JsonId}'</small><ul></ul></li>
                <li>{JsonId}.json<small>配置组件 JsonId要唯一</small></li>
            </ul>
        </li>
      </ul>
    </li>
  </ul>
</Tree>

## Json格式

```json
{
  "format_version": "1.0.10",
  "dafeimian:render": {
    "components": {
      "dafeimian:entity": {
        "animations": [
          "idle",
          "none"
        ],
        "animation_controllers": [
          "controller.animation.bgbox.idle"
        ]
      }
    }
  }
}
```

## format_version
<Badge type="info">str</Badge>声明该Json支持的灵免以太版本，不同的版本可能编写的内容形式不一样，功能类型不一样。

|可选版本|改动内容|
|:-:|:-:|
|1.0.10|新增自定义玩家渲染|
|1.1.1|新增自定义实体对话|
|1.1.2|新增自定义连招实体，合并`自定义实体对话`至`自定义功能实体`|
|1.1.3|`dafeimian:spawn_entity`组件的`offset`参数调整：旧有offset的参数(1.1.2)为[x, z, y]，新的offset的参数(1.1.3+)为[x, y, z]|
|1.1.4|新增自定义建筑结构|
|1.1.5|新增自定义表单事件|
|1.1.6|`dafeimian:chat_group`组件新增了`chat_image`参数用于显示图片|
|1.2.0|新增自定义依赖组件|

## 配置类型
在随[format_version](#format_version)同级需要声明该Json的类型，所有的配置类型都是<Badge type="info">json</Badge>

### 配置类型清单

|类型名称|描述|备注|
|:-:|:-:|:-:|
|[dafeimian:render](http://1.94.129.175:8000/docs/component-customplayerrender)|自定义玩家渲染||
|[dafeimian:chat](http://1.94.129.175:8000/docs/component-customentitychat)|自定义实体对话|仅限于1.1.1版本|
|[dafeimian:entity](http://1.94.129.175:8000/docs/component-customentityability)|自定义功能实体||
|[dafeimian:building](http://1.94.129.175:8000/docs/component-building)|自定义建筑结构||
|[dafeimian:form](http://1.94.129.175:8000/docs/component-form)|新增自定义表单事件||
|[dafeimian:config](http://1.94.129.175:8000/docs/component-config)|新增自定义依赖组件||

### 组件清单

|类型名称|描述|备注|
|:-:|:-:|:-:|
|dafeimian:boss_bar|Boss血条显示||
|dafeimian:building_data|建筑数据||
|dafeimian:building_require|建筑数据所需方块统计||
|dafeimian:building_scale|建筑数据所占范围大小||
|dafeimian:chat_group|对话组||
|dafeimian:entity|实体渲染||
|dafeimian:form_data|表单数据||
|dafeimian:require_mod|组件对前置组件的依赖推广||
|dafeimian:spawn_entity|实体生成于自定义特征结构||