---
title: 不死图腾弹窗动画
order: 16
group:
  title: 开发指南
  order: 3
---

> 本Demo为纯json实现，可以使用网易的[`CreateComponent`](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI/%E6%8E%A5%E5%8F%A3/%E9%80%9A%E7%94%A8/Component.html?catalog=1#createcomponent)接口来进行更灵活的运用

- 优点
直接调用原版预设，不需要自己又重新设计

- 缺点
纯json时需要修改`player.json`导致模组兼容性差，适用于`联机大厅`场景使用，但可以通过网易的[`CreateComponent`](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI/%E6%8E%A5%E5%8F%A3/%E9%80%9A%E7%94%A8/Component.html?catalog=1#createcomponent)接口弥补此项短板。

## 效果图
![](http://1.94.129.175/uploads/spell_effect/images/m_5398237f6d3c7c6d5f501824a80c2404_r.png)

## Demo介绍
- 触发条件：穿着全套**自定义盔甲**时`tws:richiron1...`等内容

- 触发效果：获得药水效果及图腾动画效果

- Demo附件：[`player.json`](#附件)为bp内容，里面写的是**自定义盔甲**的条件，可以自己改。

### 条件代码(省略重复部分)
在`player.json`的`"components"`中添加一个环境检测器组件(`"minecraft:environment_sensor"`)，这个可以条件检测可以直接不用，改用**中国版脚本**就可以。
```json
"minecraft:environment_sensor": {
        "triggers": [
          ...
          {
            "filters": {
              "all_of": [
                {
                  "test": "has_equipment",
                  "subject": "self",
                  "domain": "head",
                  "operator": "equals",
                  "value": "tws:richiron1"
                },
                {
                  "test": "has_equipment",
                  "subject": "self",
                  "domain": "torso",
                  "operator": "equals",
                  "value": "tws:richiron2"
                },
                {
                  "test": "has_equipment",
                  "subject": "self",
                  "domain": "leg",
                  "operator": "equals",
                  "value": "tws:richiron3"
                },
                {
                  "test": "has_equipment",
                  "subject": "self",
                  "domain": "feet",
                  "operator": "equals",
                  "value": "tws:richiron4"
                }
              ]
            },
            "event": "tws:richiron"
          },
		  ...
        ]
      }
```
### 事件代码
通过环境检测器组件(`"minecraft:environment_sensor"`)触发`events`事件，给玩家添加一个`"component_groups"`中的一个组
```json
"events":{
	...
	"tws:richnether": {
		"add": {
			"component_groups": [
				"tws:richnether"
			  ]
		}
	},
	...
}
```
### 效果代码
这样当玩家满足环境检测器的条件后，就会新增名为`"tws:richnether"`的`"component_groups"`，那么玩家也就自然而然的拥有了`"tws:richnether"`中的对应属性。
```json
"component_groups":{
	...
	"tws:richiron": {
		"minecraft:spell_effects": {
			"add_effects": [
				{
              		"effect": "speed",
              		"duration": 1,
              		"amplifier": 0,
              		"display_on_screen_animation": true,
              		"hideParticles": true
            	},
            	{
              		"effect": "health_boost",
              		"duration": 1,
              		"amplifier": 2,
              		"display_on_screen_animation": true,
              		"hideParticles": true
            	}
          	]
        }
	},
	...
}
```
> 因为Demo中的环境检测器是写在公共组`"component"`里的，所以当满足条件时，会一直触发`events`事件，就会一直给玩家`add_effects`，所以如果想在没效果的时候才进行环境检测可以把环境检测器写在`"component_groups"`里，然后`events`给一个出生的时候就自带这个环境检测器，当进入到了`"minecraft:spell_effects"`里的时候，事件就删除掉出生时自带环境检测器的`"component_groups"`，并且在`"minecraft:spell_effects"`所在的`"component_groups"`中添加环境检测器检测玩家是否脱下装备（不满足条件），然后再触发`events`事件删除`"minecraft:spell_effects"`所在的`"component_groups"`添加出生的时候就自带这个环境检测器的`"component_groups"`

那么图腾动画效果的核心就是`"minecraft:spell_effects"`组件中的`display_on_screen_animation`参数。
### minecraft:spell_effects[](@关键点)
- 描述
定义添加此组件时要向实体添加和删除的生物效果。

- 参数

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|add_effects|列表||药水效果列表|
|remove_effects|字符串||想要删除的药水效果名称|

#### add_effects

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|effect|字符串||药水效果名称，等效于`/effect`指令中`<effect: Effect>`的参数|
|duration|int|10(应该是)|持续时间(单位:秒)，等效于`/effect`指令中的`<seconds: int>`参数|
|amplifier|int|0(应该是)|药水强度等级，等效于`/effect`指令中的`<amplifier: int>`参数|
|display_on_screen_animation|bool|false(应该是)|是否播放显示在屏幕中的动画，这个就是`不死图腾`的那个动画效果|
|hideParticles|bool|false(应该是)|是否隐藏药水粒子，等效于`/effect`指令中的`<hideParticles: Boolean>`参数|

![](http://1.94.129.175/uploads/spell_effect/images/m_60b472bf5f08f70f4b4912f597d9c687_r.png)

- `"minecraft:spell_effects"`组件示例
```json
"minecraft:spell_effects": {
	"add_effects": [
		{
			"effect": "speed",
			"duration": 1,
			"amplifier": 0,
			"display_on_screen_animation": true,
			"hideParticles": true
		},
	...
}
```
[](@附件)