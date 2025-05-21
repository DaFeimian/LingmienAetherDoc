---
title: 玩家
order: 16
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[GetFrictionAllData](#getfrictionalldata)|<font color=blue>客户端</font>|获取本接口的所有参数|
|[SetPlayerFriction](#setplayerfriction)|<font color=blue>客户端</font>|设置玩家是否有摩擦力|
|[FrictionMath](#frictionmath)|<font color=blue>客户端</font>|摩擦力计算|
|[FrictionPlay](#frictionplay)|<font color=blue>客户端</font>|在客户端Tick调用，用于实现摩擦力效果|
|[ResetFriction](#resetfriction)|<font color=blue>客户端</font>|重置摩擦力|
|[SetPlayerGameMode](#setplayergamemode)|<font color=red>服务端</font>|获取或设置玩家游戏模式|
|[GetPlayerName](#getplayername)|<font color=orange>双端</font>|获取玩家名称|
|[GetPlayerFps](#getplayerfps)|<font color=blue>客户端</font>|获取玩家当前FPS|
|[GetPlayerDimension](#getplayerdimension)|<font color=orange>双端</font>|获取玩家所在维度|
|[GetPlayerPing](#getplayerping)|<font color=orange>双端</font>|获取玩家延迟|
|[SetPlayerRender](#setplayerrender)|<font color=orange>双端</font>|设置玩家自定义渲染，自动广播给所有玩家|
|[ResetPlayerRender](#resetplayerrender)|<font color=orange>双端</font>|重置玩家自定义渲染，自动广播给所有玩家|

------------

### <a id="getfrictionalldata"></a>GetFrictionAllData
<font color=blue>客户端</font><br>
- 描述<br>
获取本接口的所有参数

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|无|无|无|

- 返回值<br>
{
"MoveTime": MoveTime,
"StartMove": StartMove,
"LastMotionData": LastMotionData,
"PlayerMotion": PlayerMotion
}

- 备注<br>
无

- 示例
空
------------

### <a id="setplayerfriction"></a>SetPlayerFriction
<font color=blue>客户端</font><br>
- 描述<br>
设置玩家是否有摩擦力

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Bool|bool|是否有摩擦力|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="frictionmath"></a>FrictionMath
<font color=blue>客户端</font><br>
- 描述<br>
摩擦力计算，过一段时间后(0.01s)，使用AddTimer调用ResetFriction

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|IsStartMove|bool|是否正在移动|

- 返回值<br>
无

- 备注<br>
需要在客户端Tick调用FrictionPlay

- 示例
空
------------

### <a id="frictionplay"></a>FrictionPlay
<font color=blue>客户端</font><br>
- 描述<br>
在客户端Tick调用，用于实现摩擦力效果

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|无|无|无|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="resetfriction"></a>ResetFriction
<font color=blue>客户端</font><br>
- 描述<br>
重置摩擦力

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|IsOccupy|bool|是否有其他优先级内容占用|

- 返回值<br>
Bool, None 是否需要再次Reset

- 备注<br>
无

- 示例
空
------------

### <a id="setplayergamemode"></a>SetPlayerGameMode
<font color=red>服务端</font><br>
- 描述<br>
获取或设置玩家游戏模式

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|GameMode|int|游戏模式，默认为None，则不设置，返回当前玩家游戏模式|

- 返回值<br>
  当前玩家游戏模式 (int)

- 备注<br>
无

- 示例
空
------------

### <a id="getplayername"></a>GetPlayerName
<font color=orange>双端</font><br>
- 描述<br>
获取玩家名称

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 客户端参数
无

- 返回值<br>
  玩家名称 (str)

- 备注<br>
无

- 示例
空
------------

### <a id="getplayerfps"></a>GetPlayerFps
<font color=blue>客户端</font><br>
- 描述<br>
获取玩家当前FPS

- 参数
无

- 返回值<br>
  玩家当前FPS (float)

- 备注<br>
无

- 示例
空
------------

### <a id="getplayerdimension"></a>GetPlayerDimension
<font color=orange>双端</font><br>
- 描述<br>
获取玩家所在维度

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 客户端参数
无

- 返回值<br>
  维度id (int)

- 备注<br>
无

- 示例
空
------------

### <a id="getplayerping"></a>GetPlayerPing
<font color=orange>双端</font><br>
- 描述<br>
获取玩家延迟

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 客户端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 返回值<br>
  玩家当前延迟(单位:ms) (int)

- 备注<br>
无

- 示例
空
------------

### <a id="setplayerrender"></a>SetPlayerRender
<font color=orange>双端</font><br>
- 描述<br>
设置玩家[自定义渲染](http://1.94.129.175:8000/docs/component-customplayerrender#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%8E%A9%E5%AE%B6%E6%B8%B2%E6%9F%93)，自动广播给所有玩家

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|JsonId|str|配置组件JsonId|
|PlayerId|str|渲染的玩家id|

- 客户端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|JsonId|str|配置组件JsonId|
|PlayerId|str|渲染的玩家id，默认为该客户端玩家id|

- 返回值<br>
  无

- 备注<br>
无

- 示例
空
------------

### <a id="resetplayerrender"></a>ResetPlayerRender
<font color=orange>双端</font><br>
- 描述<br>
重置玩家[自定义渲染](http://1.94.129.175:8000/docs/component-customplayerrender#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%8E%A9%E5%AE%B6%E6%B8%B2%E6%9F%93)，自动广播给所有玩家

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|JsonId|str|需要重置的配置组件JsonId|
|PlayerId|str|渲染的玩家id|

- 客户端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|JsonId|str|需要重置的配置组件JsonId|
|PlayerId|str|渲染的玩家id，默认为该客户端玩家id|

- 返回值<br>
  无

- 备注<br>
无

- 示例
空
------------
### <a id="前往附件"></a>前往附件