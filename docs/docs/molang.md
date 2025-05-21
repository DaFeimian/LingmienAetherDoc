---
title: MoLang
order: 8
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[QueryInit](#queryinit)|<font color=blue>客户端</font>|自定义Molang注册并创建|
|[QueryGet](#queryget)|<font color=blue>客户端</font>|获取自定义Molang函数的值|
|[QueryMolangGet](#querymolangget)|<font color=blue>客户端</font>|获取原版Molang函数的值|
|[QuerySet](#queryset)|<font color=blue>客户端</font>|设置自定义Molang函数的值|

------------
### <a id="queryinit"></a>QueryInit
<font color=blue>客户端</font><br>
- 描述<br>
  自定义Molang注册并创建，需要在客户端事件'OnLocalPlayerStopLoading'下使用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|QueryName|str|函数名称|
|InitValue|float|函数初始数值|

- 返回值<br>
  无

- 备注<br>
  会自动补全为query.mod.xxx

- 示例
空
------------
### <a id="QueryGet"></a>QueryGet
<font color=blue>客户端</font><br>
- 描述<br>
  获取自定义Molang函数的值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|QueryName|str|函数名称|

- 返回值<br>
  自定义Molang函数的值(float)

- 备注<br>
  无

- 示例
空
------------

### <a id="QueryMolangGet"></a>QueryMolangGet
<font color=blue>客户端</font><br>
- 描述<br>
  获取原版Molang函数的值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|QueryName|str|函数名称|

- 返回值<br>
  原版Molang函数的值(float)

- 备注<br>
  无

- 示例
空
------------

### <a id="QuerySet"></a>QuerySet
<font color=blue>客户端</font><br>
- 描述<br>
  设置自定义Molang函数的值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|QueryName|str|函数名称|
|Value|float|对应函数的值|

- 返回值<br>
  设置的值(float)

- 备注<br>
  无

- 示例
空
------------
### <a id="前往附件"></a>前往附件