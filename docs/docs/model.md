---
title: 模型
order: 2
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[ModelAnimationControllerInit](#ModelAnimationControllerInit)|<font color=blue>客户端</font>|骨骼模型动画控制器系统初始化|
|[ModelAnimationControllerTick](#ModelAnimationControllerTick)|<font color=blue>客户端</font>|骨骼模型动画控制器逻辑运行|
|[ModelAnimationControllerTranslateState](#ModelAnimationControllerTranslateState)|<font color=blue>客户端</font>|骨骼模型动画控制器转化新状态并播放动画等|
|[GetModelAnimationControllerStateDictByStateName](#GetModelAnimationControllerStateDictByStateName)|<font color=blue>客户端</font>|获取骨骼模型动画控制器的状态dict|
|[PlayModelAnimation](#PlayModelAnimation)|<font color=blue>客户端</font>|播放骨骼模型动画|
|[GetModelAnimationControllerStateTransitionResult](#GetModelAnimationControllerStateTransitionResult)|<font color=blue>客户端</font>|获取骨骼模型动画控制器状态转化结果dict|
|[EvaluateMolangExpression](#EvaluateMolangExpression)|<font color=blue>客户端</font>|获取骨骼模型动画控制器状态的条件转化结果|

------------
### <a id="ModelAnimationControllerInit"></a>ModelAnimationControllerInit
<font color=blue>客户端</font><br>
- 描述<br>
  骨骼模型动画控制器系统初始化，目前一个骨骼模型只支持一个动画控制器和单个动画

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|dfmJsonDict|dict|jsondict|

- 返回值<br>
  返回初始动画名(list)

- 备注<br>
  - 将会使用自定义Attr存储于玩家身上，key为ModelAnimationController
  - 服务端需要有名为ModelAnimationControllerInitEvent的监听客户端事件
  - 将传参args中的PLayerId AttrValue以key为ModelAnimationController存入

- 示例
空
------------

### <a id="ModelAnimationControllerTick"></a>ModelAnimationControllerTick
<font color=blue>客户端</font><br>
- 描述<br>
  骨骼模型动画控制器逻辑运行，需要Tick化，当动画存在translation变化的时候，才会进行广播通信

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|*args|tuple|逻辑运行参数|

- 返回值<br>
  无

- 备注<br>
  - 服务端需要有名为ModelAnimationControllerTranslateStateEvent的监听客户端事件用于修改Attr和广播
  - 事件参数：PlayerId，ModAttrKey，NewState，StateDict

- 示例
空
------------

### <a id="ModelAnimationControllerTranslateState"></a>ModelAnimationControllerTranslateState
<font color=blue>客户端</font><br>
- 描述<br>
  骨骼模型动画控制器转化新状态并播放动画等， 需要进行服务端广播后客户端接收调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------

### <a id="GetModelAnimationControllerStateDictByStateName"></a>GetModelAnimationControllerStateDictByStateName
<font color=blue>客户端</font><br>
- 描述<br>
  获取骨骼模型动画控制器的状态dict

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|StateName|str|状态名称|
|StateList|list|状态dict列表|

- 返回值<br>
  返回该状态dict(dict)

- 备注<br>
  无

- 示例
空
------------

### <a id="PlayModelAnimation"></a>PlayModelAnimation
<font color=blue>客户端</font><br>
- 描述<br>
  播放骨骼模型动画

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|AnimationName|str|动画名称|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------

### <a id="GetModelAnimationControllerStateTransitionResult"></a>GetModelAnimationControllerStateTransitionResult
<font color=blue>客户端</font><br>
- 描述<br>
  获取骨骼模型动画控制器状态转化结果dict，目前只适合简单的动画控制器，不能使用简写，必须使用标准表达式

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|DictList|list|动画控制器transitions的dictlist条件|

- 返回值<br>
  返回所有条件结果dict(dict)

- 备注<br>
  无

- 示例
空
------------

### <a id="EvaluateMolangExpression"></a>EvaluateMolangExpression
<font color=blue>客户端</font><br>
- 描述<br>
  获取骨骼模型动画控制器状态的条件转化结果

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|expression|str|转化条件|

- 返回值<br>
  该条件结果(bool)

- 备注<br>
  无

- 示例
空
------------
### <a id="前往附件"></a>前往附件