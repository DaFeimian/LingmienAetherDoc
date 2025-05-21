---
title: UI
order: 7
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[BindPlayerStartFunction](#bindplayerstartfunction)|<font color=blue>客户端</font>|绑定玩家点击灵免以太主界面进入游戏后的函数|
|[CreateDefaultUI](#createdefaultui)|<font color=blue>客户端</font>|常规UI注册并创建|
|[CreateUIByEntity](#createuibyentity)|<font color=blue>客户端</font>|常规实体UI注册并创建|
|[RegisterUI](#registerui)|<font color=blue>客户端</font>|注册UI，不要重复注册损耗性能！|
|[GetLingmienAetherUIObject](#getlingmienaetheruiobject)|<font color=blue>客户端</font>|获取灵免以太主界面UI实例|
|[GetUIObject](#getuiobject)|<font color=blue>客户端</font>|获取UI实例|
|[SetButtonUpEvent](#setbuttonupevent)|<font color=blue>客户端</font>|设置按钮弹起回调事件|
|[SetButtonDownEvent](#setbuttondownevent)|<font color=blue>客户端</font>|设置按钮按下回调事件|
|[CloseVisibleAndOpenVisible](#closevisibleandopenvisible)|<font color=blue>客户端</font>|关闭一个控件显示和显示另一个控件|
|[ResetAnimation](#resetanimation)|<font color=blue>客户端</font>|重制UI动画|
|[SetLabelText](#setlabeltext)|<font color=blue>客户端</font>|获取或设置文本控件文字|
|[SetProgressBarValue](#setprogressbarvalue)|<font color=blue>客户端</font>|设置进度条控件的比例|
|[SetImagePath](#setimagepath)|<font color=blue>客户端</font>|设置图像控件显示的图片路径|
|[SetItemRender](#setitemrender)|<font color=blue>客户端</font>|设置物品渲染控件显示的物品内容|
|[SetImageAndTextColor](#setimageandtextcolor)|<font color=blue>客户端</font>|设置图像控件或文本控件的颜色|
|[SetEditText](#setedittext)|<font color=blue>客户端</font>|获取或设置输入框控件文字|
|[SetUIVisible](#setuivisible)|<font color=blue>客户端</font>|获取或设置UI控件的显示|
|[OpenLA](#openla)|<font color=blue>客户端</font>|模拟打开灵免以太主界面|
|[GetScrollViewChildPath](#getscrollviewchildpath)|<font color=blue>客户端</font>|获取滚动列表控件的子控件路径(无法通过绝对路径获取，只能使用该接口，然后使用相对路径获取其绑定的子控件内容)|
|[GetCloneListByDemoPath](#getclonelistbydemopath)|<font color=blue>客户端</font>|根据复制的UI路径获取该Demo复制后的结果列表|
|[CloneUIControl](#cloneuicontrol)|<font color=blue>客户端</font>|复制并粘贴UI到指定路径并指定名字|
|[DeleteUIControl](#deleteuicontrol)|<font color=blue>客户端</font>|删除UI控件|

------------
### <a id="bindplayerstartfunction"></a>BindPlayerStartFunction
:::warning{title=注意}
请使用该接口绑定函数，在绑定的函数中创建UI，以防止界面混乱！
:::
<font color=blue>客户端</font><br>
- 描述<br>
  绑定玩家点击灵免以太主界面进入游戏后的函数

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|FunctionInstance|function|函数(无参数)，例如self.CreateMsg，不要填写成self.CreateMsg()样式|
|IsAdd|bool|是否是添加绑定，默认为True，则为添加类型反之为删除|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------
### [](@createdefaultui)CreateDefaultUI
<font color=blue>客户端</font><br>
- 描述<br>
常规UI注册并创建
- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ModName|str|模组名称|
|UiName|str|UI界面名称|
|ScriptsName|str|脚本文件夹名称|
|AllValue|bool|'/all'界面是否显示|

- 返回值<br>
是否成功(bool)

- 备注<br>
需要在对应路径创建ui脚本文件，命名为{UIName}.py，这里的{UIName}为`界面编辑器`中新建的***界面名称***。
:::warning{title=注意}
`界面编辑器`制作的UI需要有一个名为`all`的`panel`类型控件，推荐将所有的UI内容放置于`all`下面。
:::

<Tree>
  <ul>
    <li>
      ***Scripts<small>脚本文件夹</small>
      <ul>
      <li>***Common<ul>
        <li>__init__.py</li>
        <li>config.py</li>
      </ul></li>
      <li>ModClient<small>客户端文件夹</small><ul>
        <li>uiScript<small>UI脚本文件夹</small><ul>
          <li>__init__.py</li>
          <li>{UIName}.py<small>对应{UIName}的脚本文件</small></li>
        </ul></li>
        <li>__init__.py</li>
        <li>ClientEventList</li>
        <li>ClientLingmienAether.py</li>
        <li>EventApi.py<small>客户端监听事件装饰器</small></li>
        <li>GlobalClientSystem.py</li>
      </ul></li>
      <li>ModServer<small>服务端文件夹</small><ul>
        <li>...</li>
      </ul></li>
      <li>__init__.py</li>
      <li>modMain.py</li>
      </ul>
    </li>
  </ul>
</Tree>

假设UIName为demo,则demo.py文件样式:
:::info{title=提示}
其中拥有两个常用的继承函数:<br>
Create: UI创建成功时调用该函数<br>
Update: UI创建后的Tick函数
:::

```python {6,10-11,13-14}
# -*- coding: utf-8 -*-
import mod.client.extraClientApi as clientApi

ScreenNode = clientApi.GetScreenNodeCls()  # 获得ScreenNode类

class demoScreen(ScreenNode):   # 固定名称 {UIName}Screen
  def __init__(self, namespace, name, param):
    ScreenNode.__init__(self, namespace, name, param)

  def Create(self):
    pass
    
  def Update(self):
    pass
```

- 示例
```python
@Event.ClientEvent('UiInitFinished')
def UIInit(self, *args):
  self.LA.CreateDefaultUI('mymod', 'myui', 'mymodscriptsname', True)
```
------------
### <a id="createuibyentity"></a>CreateUIByEntity
:::error{title=注意}
同CreateDefaultUI接口需要UI脚本文件

实体UI需要用一个大的面板类型控件装下里面的内容，且大的面板控件需要使用绝对尺寸px，而子控件需要使用百分比尺寸。
:::
<font color=blue>客户端</font><br>
- 描述<br>
  常规实体UI创建，需要使用RegisterUI注册UI才能创建

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ModName|str|模组名称|
|UiName|str|Ui界面名称|
|EntityId|str|绑定实体|
|Scale|int|是否动态缩放头顶UI的大小|
|Offset|tuple|xyz偏移|

- 返回值<br>
  该实体UI实例，注意：GetUIObject无法获取实error体UI类型 (object)

- 备注<br>
  - Scale值为(0 / 1)，意为绑定实体的UI是否会自动根据实体与本地玩家的距离动态缩放大小，默认值为1，即会动态缩放头顶UI的大小。
  - 实体UI需要用一个大的面板类型控件装下里面的内容，且大的面板控件需要使用绝对尺寸px，而子控件需要使用百分比尺寸。

- 示例
空

------------
### <a id="registerui"></a>RegisterUI
:::warning{title=注意}
不要重复注册损耗性能！
:::
<font color=blue>客户端</font><br>
- 描述<br>
  注册UI，不要重复注册损耗性能！

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ModName|str|模组名称|
|UiName|str|Ui界面名称|
|ScriptsName|str|脚本文件夹名称|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
空
------------

### <a id="getlingmienaetheruiobject"></a>GetLingmienAetherUIObject
<font color=blue>客户端</font><br>
- 描述<br>
  获取灵免以太主界面UI实例

- 参数<br>
无

- 返回值<br>
返回灵免以太主界面UI实例 (object)

- 备注<br>
无

- 示例
无
------------

### <a id="getuiobject"></a>GetUIObject
<font color=blue>客户端</font><br>
- 描述<br>
  获取UI实例

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ModName|str|模组名称|
|UIName|str|UI名称|

- 返回值<br>
返回对应UI实例 (object)

- 备注<br>
无

- 示例
无
------------

### <a id="setbuttonupevent"></a>SetButtonUpEvent
<font color=blue>客户端</font><br>
- 描述<br>
  设置按钮弹起回调事件

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ButtonPath|str|按钮类型控件路径|
|FuncName|str|回调函数名称，需要有一个参数接收事件返回的dict参数|
|FuncObject|object|回调函数所在的实例，默认为None，则调用UI实例中的函数|

- 返回值<br>
是否成功 (bool)

- 备注<br>
无

- 示例
无
------------

### <a id="setbuttondownevent"></a>SetButtonDownEvent
<font color=blue>客户端</font><br>
- 描述<br>
  设置按钮按下回调事件

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ButtonPath|str|按钮类型控件路径|
|FuncName|str|回调函数名称，需要有一个参数接收事件返回的dict参数|
|FuncObject|object|回调函数所在的实例，默认为None，则调用UI实例中的函数|

- 返回值<br>
是否成功 (bool)

- 备注<br>
无

- 示例
无
------------

### <a id="closevisibleandopenvisible"></a>CloseVisibleAndOpenVisible
<font color=blue>客户端</font><br>
- 描述<br>
  关闭一个控件显示和显示另一个控件

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ClosedPath|str|关闭显示的控件路径|
|OpenedPath|str|开启显示的控件路径|

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

### <a id="resetanimation"></a>ResetAnimation
<font color=blue>客户端</font><br>
- 描述<br>
  重制UI动画

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|Path|str|控件路径|

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

### <a id="setlabeltext"></a>SetLabelText
<font color=blue>客户端</font><br>
- 描述<br>
  获取或设置文本控件文字

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|LabelPath|str|文本类型控件路径|
|Text|str|需要设置的文字，默认为None，则不设置，返回当前文本控件的文字|

- 返回值<br>
  当前文本控件的文字 (str)

- 备注<br>
无

- 示例
无

------------

### <a id="setprogressbarvalue"></a>SetProgressBarValue
<font color=blue>客户端</font><br>
- 描述<br>
  设置进度条控件的比例

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ProgressPath|str|进度条类型控件路径|
|Percent|float|需要设置进度条的比例，1为100%|

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

### <a id="setimagepath"></a>SetImagePath
<font color=blue>客户端</font><br>
- 描述<br>
  设置图像控件显示的图片路径

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ImagePath|str|图像类型控件路径|
|TexturePath|str|需要设置图像所显示的图片路径，例如'textures/ui/LingmienAether'|

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

### <a id="SetItemRender"></a>SetItemRender
<font color=blue>客户端</font><br>
- 描述<br>
  设置物品渲染控件显示的物品内容

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ItemRenderPath|str|物品渲染类型控件路径|
|ItemName|str|物品名称，例如'minecraft:stick'|
|AuxValue|int|物品特殊值，默认为0(选填)|

- 返回值<br>
  是否成功 (bool)

- 备注<br>
无

- 示例
无
------------

### <a id="setimageandtextcolor"></a>SetImageAndTextColor
<font color=blue>客户端</font><br>
- 描述<br>
  设置图像控件或文本控件的颜色

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|UIPath|str|图像控件或文本控件的路径|
|Color|tuple|颜色RGB(r, g, b)，取值[0, 1]表示各色泽的百分比，及1=255|

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

### <a id="setedittext"></a>SetEditText
<font color=blue>客户端</font><br>
- 描述<br>
  获取或设置输入框控件文字

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|EditPath|str|输入框类型控件路径|
|Text|str|需要设置的文字，默认为None，则不设置，返回当前文本控件的文字|

- 返回值<br>
  当前文本控件的文字 (str)

- 备注<br>
无

- 示例
无
------------

### <a id="setuivisible"></a>SetUIVisible
<font color=blue>客户端</font><br>
- 描述<br>
  获取或设置UI控件的显示

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ControlPath|str|控件路径|
|IsVisible|str|是否显示，默认为None，则不设置，返回当前UI控件是否显示|

- 返回值<br>
  当前UI控件是否显示 (bool)

- 备注<br>
无

- 示例
无
------------

### <a id="openla"></a>OpenLA
<font color=blue>客户端</font><br>
- 描述<br>
  模拟打开灵免以太主界面

- 参数<br>
无

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

### <a id="getscrollviewchildpath"></a>GetScrollViewChildPath
<font color=blue>客户端</font><br>
- 描述<br>
  获取滚动列表控件的子控件路径

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|ScrollViewPath|str|滚动列表控件类型的路径|

- 返回值<br>
  子控件路径 (str)

- 备注<br>
无法通过绝对路径获取，只能使用该接口，然后使用相对路径获取其绑定的子控件内容

- 示例
无
------------

### <a id="getclonelistbydemopath"></a>GetCloneListByDemoPath
<font color=blue>客户端</font><br>
- 描述<br>
  根据复制的UI路径获取该Demo复制后的结果列表

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|DemoPath|str|复制的UI路径|

- 返回值<br>
  复制的ResultName列表 (list)

- 备注<br>
无

- 示例
无
------------

### <a id="cloneuicontrol"></a>CloneUIControl
<font color=blue>客户端</font><br>
- 描述<br>
  复制并粘贴UI到指定路径并指定名字

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|DemoPath|str|复制的UI路径|
|ResultPath|str|粘贴的UI路径，会粘贴在该目录下|
|ResultNameList|list|粘贴后重命名的名字列表(不能重复)|
|IsClear|bool|是否清理之前所Clone的同Demo的内容，默认为True|

- 返回值<br>
  粘贴后的UI路径数据，key为粘贴后重命名的名字 (dict)

- 备注<br>
无

- 示例
```python
def CloneModList(self, *args):
    ModDataDict = ModAttr.GetAttr(GlobalConfig.ModDataAttrKey)
    ModNameList = ModDataDict.keys()
    ScrollViewPath = self.LA.GetScrollViewChildPath(self, '/all/mod/left/scoreview')
    ResultPath = ScrollViewPath + '/list'
    DemoPath = ScrollViewPath + '/list/demo'
    ClonePathDict = self.LA.CloneUIControl(self, DemoPath, ResultPath, ModNameList)
    # 根据所返回的UI路径数据，对粘贴后的内容进行修改
    for ModName, ClonePanelPath in ClonePathDict.items():
        ModData = ModDataDict[ModName]
        UIEvent.SetButtonUpEvent(self, ClonePanelPath + '/button', 'SelectModList')
        self.GetBaseUIControl(ClonePanelPath + '/title').asLabel().SetText(ModName)
        self.GetBaseUIControl(ClonePanelPath + '/title/version').asLabel().SetText(ModData.get('Version', '未知'))
        self.GetBaseUIControl(ClonePanelPath).SetVisible(True, False)
```
------------

### <a id="deleteuicontrol"></a>DeleteUIControl
<font color=blue>客户端</font><br>
- 描述<br>
  删除UI控件

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|UIObject|object|UI实例|
|DeletePath|str|删除的UI路径|
- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------

[](@前往附件)