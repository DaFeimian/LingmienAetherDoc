---
title: 音效
order: 13
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[PlaySound](#playsound)|<font color=red>服务端</font>|播放音效(全局)|
|[PlayUISound](#playuisound)|<font color=red>服务端</font>|播放音效(个人)|

------------

### <a id="playsound"></a>PlaySound
<font color=red>服务端</font><br>
- 描述<br>
  播放音效(全局)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|SoundName|str|音效名称|
|ClearStop|bool|是否清除同名播放音效，防止音效重叠，默认为False|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------

### <a id="playuisound"></a>PlayUISound
<font color=red>服务端</font><br>
- 描述<br>
  播放音效(个人)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|SoundName|str|音效名称|
|ClearStop|bool|是否清除同名播放音效，防止音效重叠，默认为False|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------
### <a id="前往附件"></a>前往附件
