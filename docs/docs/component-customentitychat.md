---
title: 自定义实体聊天
order: 2
toc: content
group:
  title: 配置组件
  order: 2
---

# 自定义实体聊天

## 描述
结合接口[RegisterEntityChat](http://1.94.129.175:8000/docs/message#registerentitychat)注册实体的聊天对话功能或绑定触发函数。

## 示例
```json
{
  "format_version": "1.1.1",
  "dafeimian:chat": {
    "description": {
      "name": "希默尔",
      "mod_name": "custommod",
      "client_system_name": "modClientSystem"
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
      }
    }
  }
}
```

## description
<Badge type="info">json</Badge>该Json所需描述信息

### name
<Badge type="success">选填</Badge><Badge type="info">str</Badge>对话时显示的对话名称，不填写则默认获取游戏引擎中该实体的自定义名称

### mod_name
<Badge type="error">必需</Badge><Badge type="info">str</Badge>对话绑定触发函数所在的mod名称

### client_system_name
<Badge type="error">必需</Badge><Badge type="info">str</Badge>对话绑定触发函数所在的mod客户端实例名称

## component_groups
<Badge type="info">json</Badge>该Json类型的组件组，可理解为定义了一套预设组件库

## components
<Badge type="info">json</Badge>该Json类型的组件库

### dafeimian:chat_group
<Badge type="error">必需</Badge><Badge type="info">json</Badge>对话组
:::warning{title=注意}
- components中包含的dafeimian:chat_group必须有init参数
- component_groups中自定义的对话组的dafeimian:chat_group中无需包含init参数
:::

|名称|类型|默认值|描述|
|:-:|:-:|:-:|:-:|
|init|list|[]|首次尝试对话时显示的选项，对应component_groups自定义的Key|
|sound_name|str||该对话音效名称|
|sound_timer|float|1|该对话音效时长|
|chat_content|str||改对话显示信息|
|function_name|str|''|该对话触发时，调用的函数名称，可选一个参数接受该对话选项名称用于辨别|
|interact|list|[]|对话结束后玩家选择对话按钮列表，对应component_groups自定义的Key，不填写时则结束对话|