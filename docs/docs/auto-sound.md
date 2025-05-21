---
title: 自动提审
order: 10
toc: content
group:
  title: 自动化开发
  order: 3
---


# 灵免以太自动化提审
可以完成add-ons的基本提审操作。

|参数名|数据类型|默认值|说明|
|:-:|:-:|:-:|:-:|
|mod_name|str||组件名称|
|is_original|bool|true|是否原创(暂时只能为是)|
|mod_tag|list|[]|组件标签(暂时仅支持一个)|
|mod_participation_info|str|''|组件活动说明|
|is_associated|json|{}|关联组件(暂时没用)|
|price_data|json|{"type": "free"}|价格数据，不写则为免费|
|mod_info|str||组件详情简介|
|mod_type|str||组件主类别|
|mod_subtype|str||组件次类别|

- is_associated
  |参数名|数据类型|默认值|说明|
  |:-:|:-:|:-:|:-:|
  |is_main_pack|bool||是否为主包|
  |mod_name|str||关联组件名称|

- price_data
  |参数名|数据类型|默认值|说明|
  |:-:|:-:|:-:|:-:|
  |type|str||diamond钻石，暂不支持绿宝石|
  |value|str||价格档位全称，免费不用填写|


```json
{
  "format_version": "1.1.6",
  "dafeimian:mod": {
    "description": {
      "mod_name": "连锁采集",
      "is_original": true,
      "mod_tag": ["工具"],
      "mod_participation_info": "活动说明活动说明",
      "is_associated": {
        "is_main_pack": false,
        "mod_name": "镭射炮"
      },
      "price_data": {
        "type": "diamond",
        "value": "第1档直购定价：300钻石"
      },
      "mod_info": "这是组件详情简介",
      "mod_type": "add_ons",
      "mod_subtype": "玩法拓展"
    }
  }
}
```