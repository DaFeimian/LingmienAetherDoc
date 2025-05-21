---
title: 微软Molang语言
order: 13
group:
  title: 开发指南
  order: 3
---

- 函数表版本：1.18.30
- 由于是新版Molang的函数，有一些变化可以看咩咩的[国际版最新Molang与中国版1.18.30的Molang](http://120.48.57.4/docs/bedrock-dev/molang_between_international_and_china_1_18_30)篇文章
- 大部分来源于[bedrock.dev](https://bedrock.dev/zh/docs/beta/Molang "bedrock.dev")，并对其内容进行机翻+人工翻译，以及一些肥免自己的理解，这里只是给了一些常用函数介绍和示例，搜函数的时候还是到这里搜[bedrock.dev](https://bedrock.dev/zh/docs/beta/Molang "bedrock.dev")
- Molang方面的话<span style="color:red;">**lonel**</span>应该是比我擅长的~

# <center>索引</center>
- [版本变化情况](#版本变化情况)

- [基本语法](#基本语法)

- [基本算法](#基本算法)

- [逻辑语法](#逻辑语法)

- [查询函数](#查询函数)

- [常用实体查询列表](#常用实体查询列表)

## 版本变化情况[](@版本变化情况)
`1.18.20`终于可以自然的<code>(A&&B)&#124;&#124;C</code>了！

|包体的min_engine_version|描述|
|:-:|:-|
|1.17.0|添加了对版本化更改的初始支持（就是指可以使用`min_engine_version`来控制Molang的版本，详见咩咩的[国际版最新Molang与中国版1.18.30的Molang](http://120.48.57.4/docs/bedrock-dev/molang_between_international_and_china_1_18_30)篇文章）|
|1.17.30|修复了`query.item_remaining_use_duration`从刻度到秒的转换（乘以20而不是除法）。还修复了该查询中的规范化逻辑，使其从1向下变为0，而不是从0向上变为1。|
|1.17.40|为以前运行的无效表达式添加了一些新的错误消息，这些错误消息可能会产生意外结果。例如“'text'+1”现在将导致内容错误。|
|1.17.40|添加了对括号或方括号中过多运算符的错误检测，例如：“1+（2 3）”。还为遇到未知令牌时添加了更明确的错误检测。|
|1.18.10|固定的条件（三元）运算符结合性。以前嵌套的条件表达式，如`A?B:C?D:E`会评估为`(A？B:C)?D:E`。现在他们的评价是`A?B:(C?D:E)`。|
|1.18.20|修正了逻辑`AND`在逻辑`OR`之前求值，以及比较运算符在相等运算符之前求值的问题。例如，<code>A&&B&#124;&#124;C</code>现在的计算结果为<code>(A&&B)&#124;&#124;C</code>，而不是<code>A&&(B&#124;&#124;C)</code>。而`A<B==C>D`现在被求值为`(A<B)==(C>D)`，而不是‘`((A<B)==C)>D`。|
|1.19.60|修复了一个错误，即在除以一个动态确定的负变量时，结果会变成除以该数字的绝对值（正值），而不是负数。|
|1.20.0|修复了`query.cape_flap_amount`使用错误的玩家旋转（头部旋转而不是身体旋转）的问题。|


## 基本语法[](@基本语法)
跟`python`中的条件写法很相似

`1.18.20`终于可以自然的<code>(A&&B)&#124;&#124;C</code>了！

|名称|Molang表达|Python表达|备注|
|:-:|:-:|:-:|:-:|
|或|&#124;&#124;|or||
|且|&&|and||
|非|!|not|Molang的非也是写在前面|

其他的大于、小于、等于这些都和`python`一样`< <= >= > == !=`，更加复杂的可以看[这里](https://bedrock.dev/zh/docs/beta/Molang#Keywords)。

Molang中`query.xxx`只有`1.0`和`0.0`两种值时，分别相当于Bool的`ture`和`false`.在`bedrock.dev`网站中描述通常为`"Returns 1.0 if the entity is moving, else it returns 0.0"`.

因此，下列示例中的`query.can_climb || query.is_moving`就相当于`query.can_climb == 1.0 || query.is_moving == 1.0`

- 基于实体播放动画条件的示例
```
# Molang
query.can_climb || query.is_moving  # 拥有攀爬能力(拥有攀爬能力组件)或正在移动的时候播放此动画
query.can_climb && query.is_moving  # 拥有攀爬能力(拥有攀爬能力组件)且正在移动的时候播放此动画
!query.can_climb  # 没有攀爬能力(拥有攀爬能力组件)的时候播放此动画
```
```
# 上述示例中在Python条件中表达式如下
query.can_climb or query.is_moving  # 拥有攀爬能力(拥有攀爬能力组件)或正在移动的时候播放此动画
query.can_climb and query.is_moving  # 拥有攀爬能力(拥有攀爬能力组件)且正在移动的时候播放此动画
not query.can_climb  # 没有攀爬能力(拥有攀爬能力组件)的时候播放此动画
```

## 基本算法[](@基本算法)
跟`python`中的条件写法**也**很相似！`math.xxx`、`+-*/`等，更加复杂的可以看[这里](https://bedrock.dev/zh/docs/beta/Molang#Math%20Functions)。其中常用的有如下几个

|名称|描述|
|:-:|:-:|
|math.abs(value)|对value取绝对值|
|math.max(A, B)|对A，B取最大值|
|math.min(A, B)|对A，B取最小值|
|math.sqrt(value)|对value取平方根|
|math.random(low, high)|介于low和high之间取随机值，包括low和high|
|math.random_integer(low, high)|介于low和high之间取随机整数值，包括low和high|
|math.ceil(value)|对value入位取整|
|math.acos(value)|对value取反余弦|
|math.asin(value)|对value取反正弦|
|math.asin(value)|对value取反正切|
|math.cos(value)|对value取正弦|
|math.sin(value)|对value取余弦|
|math.tan(value)|对value取正切|

三角函数就可以做移动动画，根据移动距离，反求腿部角度，防止走路打滑样的
- 基于实体播放动画条件的示例
```json
// 例如在animation的bone rotation中的Molang表达式
"rotation": [
	"math.min(-query.target_x_rotation/1.65 , 10 ) + math.min(query.target_y_rotation/2.5 , 0 ) + variable.speed",
	"0",
	"math.max(-variable.speed*1.5 , -30)"
]
```

## 逻辑语法[](@逻辑语法)
这里只列出常用的"if"条件语法，更多内容去[这里](https://bedrock.dev/zh/docs/beta/Molang#Conditionals)

|符号|描述|
|:-:|:-:|
|?，?:|相当于python中的if|

#### 介绍：
- `?`：`A ? B`,当A布尔为ture时，后面的B才会运行
```python
# 相当于python中的
if A:
	B
```

- `?:`：`A ? B : C`,当A布尔为ture时执行B，反之执行C
```python
# 相当于python中的
if A:
	B
else:
	C
```

当然，如果你的B或C的内容很多，可以使用`{}`域定界,像`SQL`样的，每一行需要以`;`结尾，示例如下
```
query.ground_speed < 5 ? {
  v.camera_x = query.rotation_to_camera(0);
  v.camera_y = query.rotation_to_camera(1);
  v.a = math.abs(v.camera_x * v.camera_y);
}
```

## 查询函数[](@查询函数)
这个**lonel**更擅长~我也只是在`resource_pack`的实体json中定义过一些变量什么的。例如[《终极生物萌化》](#附件)中的`resource_pack`的`skeleton.entity.json`中：

“variables” 可以设置变量公开给其他实体访问 让其他实体使用该变量
”initialize“ 可以定义变量值并初始化 每个变量都需要要初始化，不然可能会报错并因各种问题使变量无法使用
”pre_animation“ 可以为变量值设置不断更新的值 刷新频率为帧数 在此处赋值的变量在生物存活期间将会不断更新
```json
{
  "format_version": "1.8.0",
  "minecraft:client_entity": {
  	"description": {
	  "scripts":{
		"variables": {
		    "variable.speed": "public" //公开 variable.speed 变量
		},
		"initialize": [
			"variable.head_x_roa = 0.0;",
			"variable.vertical_speed = 0.0;",
			"variable.speed = 0.0;"  //初始化 variable.speed 变量为 0.0
				],
			]
		}
        "pre_animation":[
          	"variable.head_x_roa = math.min(query.target_x_rotation/1.65 , 22.5 );",
          	"variable.vertical_speed = query.vertical_speed;",
          	"variable.speed = query.ground_speed * 5;" //更新 variable.speed 变量为 query.ground_speed * 5 不间断
        	]
      	},
	  	...
	  }
  }
}
```
然后就在`animations`里直接使用了这些变量~

```json
{
	"format_version": "1.8.0",
	"animations": {
		"animation.skeleton.look_at_target": {
			"loop": true,
			"bones": {
				"backhai": {
					"rotation": ["-query.target_x_rotation/1.65 + math.abs(query.target_y_rotation/2.5) + variable.speed", "0", "0"]
				},
				"zuotoufa": {
					"rotation": [
						"math.min(-query.target_x_rotation/1.65 , 10 ) + math.min(query.target_y_rotation/2.5 , 0 ) + variable.speed",
						"0",
						"math.max(-variable.speed*1.5 , -30)"
					]
				},
				"backhair3": {
					"rotation": ["math.min(-query.target_x_rotation/1.65 , 10 ) + math.abs(query.target_y_rotation/2.5) + variable.speed", "0", "-variable.speed/2"]
				},
				"QianTouFa3": {
					"rotation": [
						"math.min(-query.target_x_rotation/1.65 , 10 ) + math.min(query.target_y_rotation/2.5 , 0 ) + variable.speed",
						"0",
						"math.max(-variable.speed*1.5 , -30)"
					]
				},
				"youtoufa": {
					"rotation": [
						"math.min(-query.target_x_rotation/1.65 , 10 ) + math.min(-query.target_y_rotation/2.5 , 0 ) + variable.speed",
						0,
						"math.min(variable.speed*1.5 , 30)"
					]
				},
				"backhair2": {
					"rotation": ["math.min(-query.target_x_rotation/1.65 , 10 ) + math.abs(-query.target_y_rotation/2.5) + variable.speed", 0, "variable.speed/2"]
				},
				"QianTouFa2": {
					"rotation": [
						"math.min(-query.target_x_rotation/1.65 , 10 ) + math.min(-query.target_y_rotation/2.5 , 0 ) + variable.speed",
						0,
						"math.min(variable.speed*1.5 , 30)"
					]
				},
				"zuoqianfa": {
					"rotation": ["math.max(query.vertical_speed * 5 , -15)", "0", "0"]
				},
				"youqianfa": {
					"rotation": ["math.max(query.vertical_speed * 5 , -15)", "0", "0"]
				},
				"head": {
					"relative_to": {
						"rotation": "entity"
					},
					"rotation": ["math.min(query.target_x_rotation/1.65 , 22.5 )", "query.target_y_rotation", 0]
				},
				"Arm_Right": {
					"rotation": ["0", "0", "math.min(math.abs(query.vertical_speed * 5) , 120)"]
				},
				"Arm_Left": {
					"rotation": ["0", "0", "math.max(-math.abs(query.vertical_speed * 5) , -120)"]
				},
				"tail": {
					"rotation": ["query.ground_speed * 2.5", "0", "0"]
				},
				"bone11": {
					"rotation": ["query.ground_speed * 2.5", "0", "0"]
				},
				"bone6": {
					"rotation": ["query.ground_speed * 2.5", "0", "0"]
				},
				"bone5": {
					"rotation": ["query.ground_speed * 2.5", "0", "0"]
				},
				"eyeright": {
					"position": ["-query.target_y_rotation/270", "-query.target_x_rotation/270", 0]
				},
				"eyeleft": {
					"position": ["-query.target_y_rotation/270", "-query.target_x_rotation/270", 0]
				}
			}
		},
		...
	}
}
```

## <span style="color:green">常用</span>实体查询列表[](@常用实体查询列表)
还没写呢~这里只列出一些常用函数，更多内容去[这里](https://bedrock.dev/zh/docs/beta/Molang#List%20of%20Entity%20Queries)