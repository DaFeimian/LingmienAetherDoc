---
title: 消息
order: 9
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[Msg](#Msg)|<font color=blue>客户端</font>|发送消息|
|[ServerMsg](#servermsg)|<font color=red>服务端</font>|发送消息|
|[RegisterEntityChat](#registerentitychat)|<font color=red>服务端</font>|注册实体自定义聊天|

------------

### <a id="Msg"></a>Msg
<font color=blue>客户端</font><br>
- 描述<br>
  发送消息

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Msg|str|消息内容|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------

### <a id="servermsg"></a>ServerMsg
<font color=red>服务端</font><br>
- 描述<br>
  发送消息

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|Msg|str|消息内容|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------

### <a id="registerentitychat"></a>RegisterEntityChat
<font color=red>服务端</font><br>
- 描述<br>
  注册实体自定义聊天，需要在服务端初始化时调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityName|str|实体IdStr名称，例如"minecraft:zombie"|
|JsonId|str|配置组件JsonId|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------
### <a id="前往附件"></a>前往附件