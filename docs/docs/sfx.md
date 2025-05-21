---
title: 特效
order: 3
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[RealPlaySfx](#realplaysfx)|<font color=blue>客户端</font>|真正的特效播放，不广播则只能自己看到|
|[PlaySfxToEveryBody](#playsfxtoeverybody)|<font color=blue>客户端</font>|播放特效(自动广播)|
|[WorldPlaySfx](#worldplaysfx)|<font color=blue>客户端</font>|真正的在世界中特效播放，不广播则只能自己看到|
|[WorldSfxToEveryBody](#worldsfxtoeverybody)|<font color=blue>客户端</font>|在世界中播放特效(自动广播)|
|[AreaSfx](#areasfx)|<font color=blue>客户端</font>|创建区域包围盒特效|
|[ClearAreaSfx](#clearareasfx)|<font color=blue>客户端</font>|销毁区域包围盒特效|

------------

### <a id="realplaysfx"></a>RealPlaySfx
<font color=blue>客户端</font><br>
- 描述<br>
  真正的特效播放，不广播则只能自己看到

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|特效绑定的实体Id，现在将不再局限于玩家Id|
|SfxId|str|特效Id|
|FaceCamara|bool|是否面向摄像机|
|Offset|tuple|特效偏移三维相对坐标|
|Rot|tuple|特效旋转三维坐标|
|Scale|tuple|特效大小倍数三维坐标|
|DestroyTimer|float|特效销毁时间，默认为None|
|IsJson|bool|是否为json预设特效，默认为False|
|IsParticle|bool|是否为中国版粒子特效，默认为False|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------
### <a id="playsfxtoeverybody"></a>PlaySfxToEveryBody
<font color=blue>客户端</font><br>
- 描述<br>
  播放特效(自动广播)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|SfxList|dictlist|特效列表|

- 返回值<br>
  无

- 备注<br>
  特效dict数据示例

```python
SfxList = [
  {
    'Id': str,  # 特效Id
    'SfxTimer': float,  # 特效播放延迟
    'EntityId': str, # 特效绑定的实体Id
    'FaceCamera': bool, # 是否面向摄像机
    'Offset': tuple(float, float, float),    # 特效偏移
    'Rot': tuple(float, float, float),   # 特效旋转
    'Scale': tuple(float, float, float),    # 特效大小
    'DestroyTimer': float,     # 特效销毁时间
    'IsJson': bool,  # 是否为json预设特效
    'IsParticle': bool    # 是否为中国版粒子特效
  },
  ...
]
```

- 示例
空
------------

### <a id="worldplaysfx"></a>WorldPlaySfx
<font color=blue>客户端</font><br>
- 描述<br>
  真正的在世界中特效播放，不广播则只能自己看到

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|SfxId|str|特效Id|
|Pos|tuple|特效三维坐标|
|Rot|tuple|特效旋转三维坐标|
|Scale|tuple|特效大小倍数三维坐标|
|FaceCamara|bool|是否面向摄像机|
|DestroyTimer|float|特效销毁时间，默认为None|
|IsJson|bool|是否为json预设特效，默认为False|
|IsParticle|bool|是否为中国版粒子特效，默认为False|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------
### <a id="worldsfxtoeverybody"></a>WorldSfxToEveryBody
<font color=blue>客户端</font><br>
- 描述<br>
  在世界中播放特效(自动广播)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|SfxList|dictlist|特效列表|

- 返回值<br>
  无

- 备注<br>
  特效dict数据示例

```python
SfxList = [
  {
    'Id': str,  # 特效Id
    'SfxTimer': float,  # 特效播放延迟
    'FaceCamera': bool, # 是否面向摄像机
    'Pos': tuple(float, float, float),    # 特效坐标
    'Rot': tuple(float, float, float),   # 特效旋转
    'Scale': tuple(float, float, float),    # 特效大小
    'DestroyTimerTime': float,     # 特效销毁时间
    'IsJson': bool,  # 是否为json预设特效
    'IsParticle': bool    # 是否为中国版粒子特效
  },
  ...
]
```

- 示例
空
------------

### <a id="areasfx"></a>AreaSfx
<font color=blue>客户端</font><br>
- 描述<br>
  创建区域包围盒特效

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|FirstPos|str|起始三维坐标|
|SecondPos|str|终点三维坐标|
|EffectJson|bool|序列帧特效JsonId，必须为16x16贴图序列帧特效，贴图总缩放系数为(1, 1, 1)|
|SaveKey|tuple|包围盒特效存储Key，唯一|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------

### <a id="clearareasfx"></a>ClearAreaSfx
<font color=blue>客户端</font><br>
- 描述<br>
  销毁区域包围盒特效

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|SaveKey|str|包围盒特效存储Key，唯一|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------
### <a id="前往附件"></a>前往附件


