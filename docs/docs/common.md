---
title: 通用
order: 1
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[InitLingmienAetherMod](#initlingmienaethermod)|<font color=red>服务端</font>|[必用]注册灵免以太模组信息|
|[SetIsDisable](#setisdisable)|<font color=red>服务端</font>|服务端设置，需要在服务端初始化后直接调用|
|[GetServerIsDisable](#getserverisdisable)|<font color=blue>客户端</font>|获取服务端设置信息|
|[AddObjectFunction](#addobkectfunction)|<font color=blue>客户端</font>|给实例添加函数库|
|[GetLingmienAetherManifest](#getlingmienaethermanifest)|<font color=blue>客户端</font>|获取灵免以太函数库清单|
|[UseServerApi](#useserverapi)|<font color=blue>客户端</font>|使用服务端接口|
|[UseClientApi](#useclientapi)|<font color=red>服务端</font>|使用客户端接口，但无法获得返回值|
|[GetIsStart](#getisstart)|<font color=blue>客户端</font>|获取玩家是否处于进入游戏状态(这里指进入灵免以太主界面后是否点击了"单人游戏")|
|[BindGameHighTickFunction](#bindgamehightickfunction)|<font color=blue>客户端</font>|绑定游戏高Tick函数|
|[Lerp](#lerp)|<font color=blue>客户端</font>|常规非线性计算|
|[SLerp](#slerp)|<font color=blue>客户端</font>|角度形非线性计算|
|[GetLingmienAetherMod](#getlingmienaethermod)|<font color=red>服务端</font>|获取已注册的灵免以太模组数据|
|[GetTwoPosLength](#gettwoposlength)|<font color=orange>双端</font>|获取目标坐标与第一坐标之间的距离|
|[DeltaDateTime](#deltadatetime)|<font color=orange>双端</font>|计算日期差值,FirstDate-SecondDate|
|[SplitListByQuantity](#splitlistbyquantity)|<font color=orange>双端</font>|按数量拆分list|
|[SortListByNumberMagnitude](#sortlistbynumbermagnitude)|<font color=orange>双端</font>|根据数字排序由Dict元素组成的List--[{}, {}, ...]|
|[SortDictByNumberMagnitude](#sortdictbynumbermagnitude)|<font color=orange>双端</font>|据数字排序由Dict元素组成的Dict--{'x':{}, 'y':{}, ...}|
|[GetDictExtremeValueKey](#getdictextremevaluekey)|<font color=orange>双端</font>|获取Dict中指定Key的极值对应的键--{'x':float, 'y':float, ...}|
|[GetPlatForm](#getplatform)|<font color=red>服务端</font>|获取服务端运行环境|

------------

### <a id="initlingmienaethermod"></a>InitLingmienAetherMod
<font color=red>服务端</font><br>
- 描述<br>
  [必用]注册灵免以太模组信息

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ModData|dict|模组信息|

- 返回值<br>
  无

- 备注<br>
ModData(dict)说明

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ModName|str|模组名称|
|Version|str|模组版本号|
|LogoPath|str|logo路径，从textures开始(选填)|
|Content|str|模组简介|

效果图：

![](http://1.94.129.175/uploads/LingmienAether/img/info-2.png)

- 示例
```python {16}
def __init__(self, namespace, systemNam)：
  ...
  self.LA = self.GetLASys('密钥')

@Event.ClientEvent('UiInitFinished')
def UiInitFinished(self, *args)
  ModData = {
      'ModName': 'Lingmien Aether',
      'Version': '1.0.2',
      'LogoPath': 'textures/ui/LA/logo_text',
      'Content': 'Lingmien Aether(灵免以太)'
                  '\n版本：1.0.2'
                  '\n制作人员：大肥免开发组\n'
                  '\nLAAPI Mod前置组件管理器',
  }
  self.LA.UseServerApi('InitLingmienAetherMod', [ModData])
```
------------

### <a id="setisdisable"></a>SetIsDisable
<font color=red>服务端</font><br>
- 描述<br>
  服务端设置，需要在服务端初始化后直接调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Type|str|设置类型|
|Bool|bool|是否启用，默认为None|

- 返回值<br>
  该设置的布尔值(bool)

- 备注<br>
  - ##### 设置类型：

  |参数名|数据类型|默认值|说明|
  |:-:|:-:|:-:|:-:|
  |AntiCheatUseServerApi|bool|True|联机大厅、网络游戏UseServerApi反作弊|
  |AntiCheatPing|bool|True|联机大厅、网络游戏弱网反作弊|
  |IsStartUI|bool|True|是否启用灵免以太主界面，禁用后主界面相关接口及功能将失效|
  |IsLobby|bool|Auto|是否为联机大厅、网络游戏环境|
  |IsLobbyKick|bool|False|是否限制玩家二次进入本房间/存档|

- 示例
```python {1,4}
def __init__(self, namespace, systemName):
    ...
    self.LA = self.GetLASys('密钥')
    self.LA.SetIsDisable('IsStartUI', False)
```
------------

### <a id="getserverisdisable"></a>GetServerIsDisable
<font color=blue>客户端</font><br>
- 描述<br>
  获取服务端设置信息

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Type|str|设置类型|

- 返回值<br>
  该设置的布尔值(bool)

- 备注<br>
  [设置类型列表](#设置类型)

- 示例
空
------------

### <a id="AddObjectFunction"></a>AddObjectFunction
<font color=blue>客户端</font><br>
- 描述<br>
  给实例添加函数库

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Manifest|list|函数库清单|

- 返回值<br>
  无

- 备注<br>
```python
def QuerySet(Value):
  pass

Manifest = [
  ('QuerySet', QuerySet, False, None, None),
  ...
]
```
tuple说明

|参数位置|数据类型|说明|
|:-:|:-:|:-:|
|0|str|添加后的函数名字|
|1|function|添加后的函数名字|
|2|bool|是否拥有装饰器(已废弃，请填写为False)|
|3|object|监听装饰器(已废弃，请填写为None)|
|4|str|事件名(已废弃，请填写为None)|

- 示例
空
------------

### <a id="getlingmienaethermanifest"></a>GetLingmienAetherManifest
<font color=blue>客户端</font><br>
- 描述<br>
  获取灵免以太函数库清单

- 参数<br>
无

- 返回值<br>
  灵免以太函数库清单(list)

- 备注<br>
  能够直接在非灵免以太客户端实例中使用一些接口，双端往返类型的通常不支持。

- 示例
```python
self.LA = self.GetLASys('密钥')
LingmienAetherManifest = self.LA.GetLingmienAetherManifest()
self.AddObjectFunction(LingmienAetherManifest)
```
------------

### <a id="useserverapi"></a>UseServerApi
<font color=blue>客户端</font><br>
- 描述<br>
  使用服务端接口，但无法获得返回值

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ApiName|str|服务端接口名称|
|ArgsList|list|服务端接口参数列表|

- 返回值<br>
  ApiId，用于获取接口返回值 (str)

- 备注<br>
该接口禁止在联机大厅、网络游戏中执行！

- 示例
```python
self.LA = self.GetLASys('密钥')
ApiId = self.LA.UseServerApi('PlaySound', [playerId, 'random.click'])
# 需要考虑玩家延迟，已防无法获取到返回值
ApiId = self.LA.UseServerApi('GetItemDictByInv', [playerId, 0, 0])
Ping = self.LA.GetPlayerPing(playerId)
# 由于ping单位为毫秒，因此使用0.02倍率计时器来进行获取
compTimer.AddTimer(0.02 * Ping, self.CallBack, ApiId)

def CallBack(self, ApiId):
  # 获取返回值
  self.LA.GetModRenderAttrByKey(playerId, ApiId)
```
------------

### <a id="useclientapi"></a>UseClientApi
<font color=red>服务端</font><br>
- 描述<br>
  使用客户端接口，但无法获得返回值

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ApiName|str|客户端接口名称|
|ArgsList|list|客户端接口参数列表|
|PlayerId|str|指定客户端玩家Id，默认为None，则广播所有客户端使用该接口|

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

### <a id="getisstart"></a>GetIsStart
<font color=blue>客户端</font><br>
- 描述<br>
  获取玩家是否处于进入游戏状态(这里指进入灵免以太主界面后是否点击了"单人游戏")

- 参数<br>
无

- 返回值<br>
玩家是否处于进入游戏状态 (bool)

- 备注<br>
无

- 示例
无
------------

### <a id="bindgamehightickfunction"></a>BindGameHighTickFunction
<font color=blue>客户端</font><br>
- 描述<br>
  绑定游戏高Tick函数

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|FunctionInstance|function|函数(无参数)，例如self.CreateMsg，不要填写成self.CreateMsg()样式|
|IsAdd|bool|是否是添加绑定，默认为True，则为添加类型反之为删除|

- 返回值<br>
无

- 备注<br>
原版MC每秒20Tick，网易MC脚本每秒30Tick，该Tick的基准以玩家当前Fps为准

- 示例
```python {7}
def __init__(self, namespace, systemName):
  ...
  self.LA = self.GetLASys('密钥')

@Event.ClientEvent('UiInitFinished')
  def UiInitFinished(self, *args):
    self.LA.BindGameHighTickFunction(self.CreateMsg)

def CreateMsg(self):
    self.LA.Msg('高刷Tick')
```
------------

### <a id="lerp"></a>Lerp
<font color=blue>客户端</font><br>
- 描述<br>
  常规非线性计算

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Start|float|开始数值|
|End|float|结束数值|
|Factor|float|非线性系数|

- 返回值<br>
线性插值后的结果 (float)

- 备注<br>
无

- 示例
无
------------

### <a id="slerp"></a>SLerp
<font color=blue>客户端</font><br>
- 描述<br>
  角度形非线性计算

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Start|float|开始角度|
|End|float|结束角度|
|Factor|float|非线性系数|

- 返回值<br>
线性插值后的结果 (float)

- 备注<br>
无

- 示例
无
------------

### <a id="getlingmimenaethermod"></a>GetLingmienAetherMod
<font color=red>服务端</font><br>
- 描述<br>
  获取已注册的灵免以太模组数据

- 参数<br>
无

- 返回值<br>
  灵免以太模组数据 (dict)

- 备注<br>
无

- 示例
无
------------

### <a id="gettwoposlength"></a>GetTwoPosLength
<font color=orange>双端</font><br>
- 描述<br>
  获取目标坐标与第一坐标之间的距离

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|FirstPos|tuple|第一三维坐标|
|TargetPos|tuple|目标三维坐标|

- 返回值<br>
  距离 (float)

- 备注<br>
无

- 示例
无
------------

### <a id="deltadatetime"></a>DeltaDateTime
<font color=orange>双端</font><br>
- 描述<br>
  计算日期差值,FirstDate-SecondDate

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|FirstDate|str|格式为%Y-%m-%d %H:%M:%S|
|SecondDate|str|格式为%Y-%m-%d %H:%M:%S|

- 返回值<br>
  差值(datetime), <type 'datetime.timedelta'>

- 备注<br>
无

- 示例
无
------------

### <a id="splitlistbyquantity"></a>SplitListByQuantity
<font color=orange>双端</font><br>
- 描述<br>
  按数量拆分list

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|List|list|需要拆分的List|
|Number|int|拆分结果：几个元素为一个新变量|

- 返回值<br>
  处理完毕之后的list (list)

- 备注<br>
无

- 示例
无
------------

### <a id="sortlistbynumbermagnitude"></a>SortListByNumberMagnitude
<font color=orange>双端</font><br>
- 描述<br>
  根据数字排序由Dict元素组成的List--[{}, {}, ...]

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|List|list|需要排序的List|
|Key|str|按List内的哪个Key排序，没有则填None|
|IsPositiveSequence|bool|是否为正序|

- 返回值<br>
  处理完毕之后的list (list)

- 备注<br>
无

- 示例
无
------------

### <a id="sortdictbynumbermagnitude"></a>SortDictByNumberMagnitude
<font color=orange>双端</font><br>
- 描述<br>
  据数字排序由Dict元素组成的Dict--{'x':{}, 'y':{}, ...}

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Dict|dict|需要排序的Dict|
|Key|str|需要排序的Dict中的Dict的Key|
|IsPositiveSequence|bool|是否为正序|
|Num|int|排出多少个|

- 返回值<br>
  处理完毕之后的dictlist (list)

- 备注<br>
无

- 示例
无
------------

### <a id="getdictextremevaluekey"></a>GetDictExtremeValueKey
<font color=orange>双端</font><br>
- 描述<br>
  获取Dict中指定Key的极值对应的键--{'x':float, 'y':float, ...}

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Dict|dict|需要获取的Dict|
|Key|str|用于比较的目标Key，字典中该Key的值用于比较|
|FindMax|bool|是否寻找最大值，默认为True|

- 返回值<br>
  极值对应的键 (any)

- 备注<br>
无

- 示例
无
------------

### <a id="getplatform"></a>GetPlatForm
<font color=red>服务端</font><br>
- 描述<br>
  获取服务端运行环境

- 参数<br>
无

- 返回值<br>
  运行环境 0：Windows平台；1：IOS；2：Android；-1：其他，例如联机大厅，阿波罗等linux服务器 (int)

- 备注<br>
无

- 示例
无
------------
### <a id="前往附件"></a>前往附件