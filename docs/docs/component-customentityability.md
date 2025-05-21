---
title: 自定义功能实体
order: 3
toc: content
group:
  title: 配置组件
  order: 2
---

# 自定义功能实体

## 描述
结合接口[RegisterEntityAbility](http://1.94.129.175:8000/docs/message#registerentitychat)注册实体的功能。

## 示例
```json
{
  "format_version": "1.1.2",
  "dafeimian:entity": {
    "description": {
      "name": "希默尔",
      "mod_name": "custommod",
      "client_system_name": "modClientSystem",
      "server_system_name": "modServerSystem"
    },
    "component_groups": {
      "请问你是？": {
        "dafeimian:chat_group": {
          "sound_name": "customsoundname",
          "sound_timer": 1.5,
          "chat_content": "我是希默尔这个天空村庄的商人，我有很多奇妙的东西如果你有金币的话我可以卖给你",
          "function_name": "customfunction",
          "interact": ["天空村庄的村民好像都很讨厌那些生活在大树上的家伙", "为什么你们的村庄可以飞在天上？"]
        }
      },
      "天空村庄的村民好像都很讨厌那些生活在大树上的家伙": {
        "dafeimian:chat_group": {
          "sound_name": "customsoundname",
          "sound_timer": 1.5,
          "chat_content": "那是一群恶劣的家伙，他们阴险狡诈，自私自利。你知道吗当年我们和他们一起并肩作战他们居然背叛了我们！",
          "interact": ["并肩作战？当年到底发生了什么？"]
        }
      },
      "并肩作战？当年到底发生了什么？": {
        "dafeimian:chat_group": {
          "sound_name": "customsoundname",
          "sound_timer": 1.5,
          "chat_content": "我还记得那是个冬天，我们和血妖决战，迟迟不见那群树妖的身影。树妖骗了我们！根本没有援军，我们的大军全军覆没！"
        }
      },
      "为什么你们的村庄可以飞在天上？": {
        "dafeimian:chat_group": {
          "sound_name": "customsoundname",
          "sound_timer": 1.5,
          "chat_content": "这是因为我们有天空之神的保护，我们都信奉天空之神。神让我们的部落飞上天空给予了我们飞行的能力",
          "interact": ["并肩作战？当年到底发生了什么？"]
        }
      }
    },
    "components": {
      "dafeimian:chat_group": {
        "init": ["请问你是？"]
      },
      "dafeimian:spawn_entity": {
        "feature_rule": "custom:feature_rule",
        "offset": [0, -6]
      },
      "dafeimian:combo_attack": {
        "attack_timer": 0,
        "custom_logic": "customfucton",
        "attack_data": [
          {
            "attack_time": 5.25,
            "damage": 80,
            "damage_timer": [2.04, 3.88],
            "is_can_see": true,
            "radius": 7.5,
            "angle": 150,
            "sfx_list": [
              {
                "id": "custom_sfx",
                "sfx_timer": [1.0],
                "face_camera": true,
                "offset": [-3, 3, 0],
                "rotation": [0, 0, 0],
                "scale": [3, 3, 3],
                "destroy_timer": 1.0,
                "is_json": true
              }
            ],
            "sound_list": [
              {
                "id": "custom_sound",
                "percent": 0.1,
                "sound_timer": [1]
              }
            ]
          }
        ]
      }
    }
  }
}
```

## description
<Badge type="info">json</Badge>该Json所需描述信息

### name
<Badge type="info">str</Badge>不填写则默认获取游戏引擎中该实体的自定义名称

### mod_name
<Badge type="info">str</Badge>组件中绑定触发函数所在的mod名称

### client_system_name
<Badge type="info">str</Badge>组件中绑定触发客户端函数所在的mod客户端实例名称

### server_system_name
<Badge type="info">str</Badge>组件中绑定触发服务端函数所在的mod客户端实例名称

## component_groups
<Badge type="info">json</Badge>该Json类型的组件组，可理解为定义了一套预设组件库

## components
<Badge type="info">json</Badge>该Json类型的组件库，可以选择一些组件来组装功能，并不是需要全部填写。

### dafeimian:boss_bar
<Badge type="info">json</Badge>Boss血条显示

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|empty_image|str|""|空血条贴图路径，例如textures/ui/empty|
|filled_image|str|""|满血条贴图路径，例如textures/ui/filled|


### dafeimian:chat_group
<Badge type="info">json</Badge>对话组
:::warning{title=使用注意}
- components中包含的dafeimian:chat_group必须有init参数
- component_groups中自定义的对话组的dafeimian:chat_group中无需包含init参数
:::

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|init|list|[]|首次尝试对话时显示的选项，对应component_groups自定义的Key|
|sound_name|str||该对话音效名称|
|sound_timer|float|1|该对话音效时长|
|chat_content|str||该对话显示信息|
|iamge_content|str||该对话显示的图片路径，例如textures/ui/demo|
|function_name|str|''|该对话触发时，调用的函数名称，可选一个参数接受该对话选项名称用于辨别|
|interact|list|[]|对话结束后玩家选择对话按钮列表，对应component_groups自定义的Key，不填写时则结束对话|

### dafeimian:combo_attack
<Badge type="info">json</Badge>多连招实体
:::warning{title=使用注意}
- 多连招实体的entity json应当使用自动化程序中的`自定义连招实体`创建，而不是*自定义Boss实体*
- 需要手动配置[注册连招动画](http://1.94.129.175:8000/docs/dlc_heixiyou_boss#%E5%AF%BC%E5%85%A5%E5%8A%A8%E7%94%BB%E6%96%87%E4%BB%B6%E5%B9%B6%E5%A4%84%E7%90%86%E5%AE%9E%E4%BD%93%E5%8A%A8%E7%94%BB)
:::

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|attack_timer|float|0|招式衔接延迟时间|
|custom_logic|str|""|自定义服务端连招逻辑函数，用于重写连招逻辑|
|attack_data|list||招式数据|

#### custom_logic
需要接收一个dict类型参数

  |名称|类型|描述|
  |:-:|:-:|:-:|
  |EntityId|str|实体id|
  |JsonData|dict|该实体所使用的自定义功能实体Json配置|

#### attack_data
里面可以装很多个如下样式json/dict，每一个都是一种招式

  |名称|类型|默认值|描述|
  |:-:|:-:|:-:|:-:|
  |attack_time|float||该招式完整动画时间|
  |function_name|str||该对话触发时，调用的本json定义的服务端的函数名称，并携带一个实体招式数据参数|
  |damage|int|0|该招式伤害|
  |damage_timer|list|[]|该招式造成伤害的时间列表|
  |is_can_see|bool|true|该招式是否需要实体看得见的目标才能造成伤害|
  |radius|float|3.0|该招式造成伤害的距离|
  |angle|int|120|该招式造成伤害的视线角度|
  |motion|list|[0, 0, 0]|该招式的位移向量，[1, 1, 1]表示向前|
  |motion_time|float|0.1|该招式的位移时间|
  |sfx_list|list|[]|该招式造成伤害时的特效列表|
  |sound_list|list|[]|该招式造成伤害时的播放的音效列表|

#### attack_data的function_name实体招式数据参数
由于ComboDict为attack_data，因此可以给attack_data中自定义一些Key，以用于仅绑定一个函数，靠Key的值来区分招式。

  |名称|类型|默认值|描述|
  |:-:|:-:|:-:|:-:|
  |EntityId|str||释放该招式的实体Id|
  |ComboDict|dict||该招式的数据，即attack_data|

  :::code-group

  ```json {15,16} [自定义实体数据]
  {
    "format_version": "1.1.2",
    "dafeimian:entity": {
      "description": {
        "mod_name": "Demo",
        "client_system_name": "DemoClientSystem",
        "server_system_name": "DemoServerSystem"
      },
      "components": {
        "dafeimian:combo_attack": {
          "attack_timer": 0,
          "attack_data": [
            {
              "attack_time": 4.04,
              "combo_name": "吼叫",
              "function_name": "Test",
              "damage": 2,
              "damage_timer": [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0],
              "is_can_see": true,
              "radius": 7.5,
              "angle": 150,
              "sfx_list": [
                {
                  "id": "ailian_attack",
                  "face_camera": false,
                  "offset": [-3, 3, 0],
                  "rotation": [0, 0, 0],
                  "scale": [3, 3, 3]
                }
              ],
              "sound_list": [
                {
                  "id": "yangfashi1",
                  "sound_timer": [0.10]
                }
              ]
            },
            {
              "attack_time": 4.04,
              "combo_name": "喷火",
              "function_name": "Test",
              "damage": 2,
              "damage_timer": [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0],
              "is_can_see": true,
              "radius": 7.5,
              "angle": 150,
              "sfx_list": [
                {
                  "id": "ailian_attack",
                  "face_camera": false,
                  "offset": [-3, 3, 0],
                  "rotation": [0, 0, 0],
                  "scale": [3, 3, 3]
                }
              ],
              "sound_list": [
                {
                  "id": "yangfashi1",
                  "sound_timer": [0.10]
                }
              ]
            }
          ]
        }
      }
    }
  }
  ```

  ```python [服务端]
  import ...
  from ServerLingmienAether import ServerLingmienAether

  class ***ServerSystem(ClientSystem, ServerLingmienAether):  # 继承补全库，方便接口补全编写代码
  def __init__(self, namespace, systemName):
    ...
    # 调用接口系统
    self.LA = self.GetLASys('密钥')
    self.LA.RegisterEntityAbility('dfm:julongzhixin', 'myboss')

  def Test(self, args):
    print args['ComboDict']['id']
    # 得出结果为，吼叫或其他招式
  ```

  :::

#### sfx_list
里面可以装很多个如下样式json/dict，每一个都是一种特效播放

  |名称|类型|默认值|描述|
  |:-:|:-:|:-:|:-:|
  |id|str||特效id|
  |sfx_timer|list|damage_timer|该特效播放的时间列表，默认根据造成伤害时播放|
  |face_camera|bool|false|该特效是否面向摄像机|
  |offset|list|[0, 0, 0]|该特效的偏移坐标|
  |rotation|list|[0, 0, 0]|该特效的旋转角度|
  |scale|list|[1, 1, 1]|该特效的大小|
  |destroy_timer|float|null|该特效的销毁时间|
  |is_json|bool|false|该特效是否使用json预设|
  |is_particle|bool|false|该特效是否为粒子特效|

#### sound_list
里面可以装很多个如下样式json/dict，每一个都是一种音效播放

  |名称|类型|默认值|描述|
  |:-:|:-:|:-:|:-:|
  |id|str||音效id|
  |percent|float|1.0|该音效播放概率，1.0表示100%一定播放|
  |sound_timer|list|damage_timer|该音效播放的时间列表，默认根据造成伤害时播放|


### dafeimian:spawn_entity
<Badge type="info">json</Badge>实体生成于自定义特征结构

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|feature_rule|str||自定义特征规则|
|offset|list|[0, 0, 0]|生成三维坐标偏移，该项存在[版本改动](http://1.94.129.175:8000/docs/component-info#format_version)|
|dimension_id|list|[0]|生成的维度列表|
|number|int|1|生成数量|