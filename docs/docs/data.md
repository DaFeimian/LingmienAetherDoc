---
title: 数据
order: 10
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[SetModRenderAttrByKey](#setmodrenderattrbykey)|<font color=red>服务端</font>|设置存储于实体数据新的值(仅限于本存档)|
|[GetModRenderAttrByKey](#getmodrenderattrbykey)|<font color=orange>双端</font>|获取存储于实体数据的值|
|[LocalConfigData](#localconfigdata)|<font color=blue>客户端</font>|存储或获取本地存储数据|
|[GetModConfigValue](#getmodconfigvalue)|<font color=blue>客户端</font>|获取模组设置的值，没有则返回None|

------------

### <a id="setmodrenderattrbykey"></a>SetModRenderAttrByKey
<font color=red>服务端</font><br>
- 描述<br>
  设置存储于实体数据新的值(仅限于本存档)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体id|
|DataKey|str|数据Key|
|Value|dict|数据值|

- 返回值<br>
  无

- 备注<br>
  当EntityId为自定义str时，存档效果将失效

- 示例
空
------------

### <a id="getmodrenderattrbykey"></a>GetModRenderAttrByKey
<font color=orange>双端</font><br>
- 描述<br>
  获取存储于实体数据的值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体id|
|DataKey|str|数据Key|

- 返回值<br>
  SetModRenderAttrByKey存储的数据(dict)

- 备注<br>
  无

- 示例
空
------------

### <a id="localconfigdata"></a>LocalConfigData
<font color=blue>客户端</font><br>
- 描述<br>
  存储或获取本地存储数据

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Key|str|数据的名称，用于区别不同的本地数据|
|Dict|dict|数据内容，默认为None则为获取并返回该Key的数据，反之不为None则是存储数据|
|IsGlobal|bool|为True时是全局配置，否则为存档配置，默认为False|

- 返回值<br>
  存储或获取本地存储数据 (dict)

- 备注<br>
  无

- 示例
空
------------

### <a id="getmodconfigvalue"></a>GetModConfigValue
<font color=blue>客户端</font><br>
- 描述<br>
  获取模组设置的值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ModName|str|指config.ModName|
|Key|str|对应设置配置数据中的[Key](/docs/ability.md#registermodsettingconfig)|

- 返回值<br>
  模组设置的值，没有则返回None (bool, float, int, str)

- 备注<br>
  无

- 示例
空
------------
### <a id="前往附件"></a>前往附件