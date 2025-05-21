---
title: 摄像机
order: 6
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[CameraMotionRun](#cameramotionrun)|<font color=blue>客户端</font>|普通视角摇晃运行|
|[ResetCameraMotion](#resetcameramotion)|<font color=blue>客户端</font>|重置镜头跟随|
|[HighCameraMotionRun](#highcameramotionrun)|<font color=blue>客户端</font>|高处视角摇晃运行|
|[GetDeltaCameraMotion](#getdeltacameramotion)|<font color=blue>客户端</font>|获取玩家摄像机运动单位差值|
|[SetPerspective](#setperspective)|<font color=blue>客户端</font>|获取或设置玩家人称视角|
|[ComputePitchYaw](#computepitchyaw)|<font color=blue>客户端</font>|根据两个坐标，计算目标坐标相对于主坐标的俯仰角，偏航角|
|[CameraLookAtTargetRun](#cameralookattargetrun)|<font color=blue>客户端</font>|玩家看向目标坐标视角运动器|

------------
### <a id="cameramotionrun"></a>CameraMotionRun
<font color=blue>客户端</font><br>
- 描述<br>
  普通视角摇晃运行，使用客户端Tick直接调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|FloatingCoefficient|float|浮动系数|
|ResetCoefficient|float|重置系数|
|MotionLimit|float|跟随限度(角度)|
|LinearCoefficient|float|线性系数(0~1)|
|AppressLimit|float|趋近限度(0~1)|
|FloatingSppedLimit|float|速度限度|

- 返回值<br>
  DefaultCameraRot_z, MotionBlurRot_y (tuple)

- 备注<br>
  正为左，负为右，用于调用自定义Molang，MotionBlurRot_y为动态模糊所用

- 示例
空
------------
### <a id="resetcameramotion"></a>ResetCameraMotion
<font color=blue>客户端</font><br>
- 描述<br>
  重置镜头跟随

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|无|无|无|

- 返回值<br>
  是否设置成功(bool)

- 备注<br>
  无

- 示例
空
------------
### <a id="highcameramotionrun"></a>HighCameraMotionRun
<font color=blue>客户端</font><br>
- 描述<br>
  高处视角摇晃运行，使用客户端Tick直接调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|FloatingCoefficient|float|浮动系数|
|MotionLimit|float|跟随限度(角度)|
|LinearCoefficient|float|线性系数(0~1)|
|AppressLimit|float|趋近限度(0~1)|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------
### <a id="getdeltacameramotion"></a>GetDeltaCameraMotion
<font color=blue>客户端</font><br>
- 描述<br>
  获取玩家摄像机运动单位差值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|IsAbs|bool|是否返回绝对值|

- 返回值<br>
  DeltaRot_x, DeltaRot_y, DeltaRot_z (tuple)

- 备注<br>
  后续可加其他参数调整

- 示例
空
------------
### <a id="setperspective"></a>SetPerspective
<font color=blue>客户端</font><br>
- 描述<br>
  获取或设置玩家人称视角

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|NewPerspective|int|设置新的人称，默认为None，则效果为Get|

- 返回值<br>
  返回最新的人称结果 (int)

- 备注<br>
  空

- 示例
空
------------

### <a id="computepitchyaw"></a>ComputePitchYaw
<font color=blue>客户端</font><br>
- 描述<br>
  根据两个坐标，计算目标坐标相对于主坐标的俯仰角，偏航角

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|MainPos|tuple|主坐标|
|TargetPos|tuple|目标坐标|

- 返回值<br>
  俯仰角，偏航角 (tuple)

- 备注<br>
  空

- 示例
空
------------

### <a id="cameralookattargetrun"></a>CameraLookAtTargetRun
<font color=blue>客户端</font><br>
- 描述<br>
  玩家看向目标坐标视角运动器，使用客户端Tick直接调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|TargetPos|tuple|目标三维坐标|
|SmoothingFactor|float|非线性系数(选填)|
|OffsetPitch|float|俯仰角偏移角度(选填)|
|OffsetYaw|float|偏航角偏移角度(选填)|

- 返回值<br>
  无

- 备注<br>
  空

- 示例
空
------------
### <a id="前往附件"></a>前往附件