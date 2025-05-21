---
title: 代理微软原生UI
order: 9
group:
  title: 开发指南
  order: 3
---
## 注册代理UI
> 在Python中,instance(实例)是指由类创建的一个具体对象

```python
NativeScreenManager = clientApi.GetNativeScreenManagerCls()
# 暂停界面
NativeScreenManager.instance().RegisterScreenProxy(
	"pause.pause_screen", '{0}.ModClient.uiScript.{1}.{1}Screen'.format(config.ScriptsName, 'dfm_san')
)
# 或者
NativeScreenManager.RegisterScreenProxy(
	"pause.pause_screen", '{0}.ModClient.uiScript.{1}.{1}Screen'.format(config.ScriptsName, 'dfm_san')
)
```

## UI脚本文件
`OnCreate`表示所代理的这个界面创建的时候的函数，其他一看都懂。根据`Python`语法，在`OnCreate`的时候自然也会先过一下`__init__`
```python
# -*- coding: utf-8 -*-

import mod.client.extraClientApi as clientApi


levelId = clientApi.GetLevelId()
ScreenProxy = clientApi.GetUIScreenProxyCls()  # 获取代理基类
AllLootItemId = []


class dfm_sanScreen(ScreenProxy):
    def __init__(self, screenName, screenNode):
        print "dfm_sanUI========================"
        ScreenProxy.__init__(self, screenName, screenNode)
        pass

    def OnCreate(self):
        print 'OnCreate'

    def OnDestroy(self):
        print 'OnDestroy'

    def OnTick(self):
        pass

    def GetCustomUIControl(self):
        pass
```

## 官方示例
```python
# -*- coding: utf-8 -*-
import client.extraClientApi as clientApi
from client.ui.viewBinder import ViewBinder
CustomUIScreenProxy = clientApi.GetUIScreenProxyCls()


class PauseScreenProxy(CustomUIScreenProxy):
	def __init__(self, screenName, screenNode):
		CustomUIScreenProxy.__init__(self, screenName, screenNode)

	def OnCreate(self):
		print("PauseScreenProxy Create")
		# 在pause.pause_screen被pushed的时候创建一个button以及一个toggle
		self.createCustomButtonAndToggle()

	def OnDestroy(self):
		print("PauseScreenProxy Destroy")

	def OnTick(self):
		pass

	def createCustomButtonAndToggle(self):
		screen = self.GetScreenNode()
		# 使用UI调试工具获取对应的路径，注意，随着版本更新，这个原生界面上的控件路径是可能会改变的。
		button_panel_path = "variables_button_mappings_and_controls/safezone_screen_matrix/inner_matrix/safezone_screen_panel/root_screen_panel/pause_screen_main_panels/menu/the_rest_panel/pause_menu/menu_button_control/menu_background/button_panel"
		# 获取存放button的stack_panel
		button_panel = screen.GetBaseUIControl(button_panel_path)
		# 添加一小段垂直间隙，这里使用的都是pause命名空间的控件，
		# 当然可以用别的命名空间，为了和pause界面的控件样式一样，就用了这个"pause.vertical_padding"和"pause.pause_button_template"
		verticalPadding = screen.CreateChildControl("pause.vertical_padding", "myPadding", button_panel)
		# 创建Button
		myButton = screen.CreateChildControl("pause.pause_button_template", "myButton", button_panel).asButton()
		# Button的四个控件都需要修改文本
		button_states = ["default", "hover", "pressed", "locked"]
		for s in button_states:
			label_path = "/{}/button_content/common_buttons.new_ui_binding_button_label".format(s)
			label = myButton.GetChildByName(label_path).asLabel()
			label.SetText("我的按钮", True)
		# 添加注册回调，需要注意，如果这里获取的是原生界面中原来有的控件，那么注册回调将会将该控件原有的回调给清除（比如原生界面的逻辑）
		myButton.AddTouchEventParams({"isSwallow": True})
		myButton.SetButtonTouchDownCallback(self.onCustomButtonClicked)

		# 创建Toggle，并且本类支持binding，见本类方法 onToggleChanged
		toggle = screen.CreateChildControl("UIDemo.mytoggle", "myToggle", button_panel)

	def onCustomButtonClicked(self, args):
		print("onCustomButtonClicked: {}".format(args))

	@ViewBinder.binding(ViewBinder.BF_ToggleChanged, "#myMod.myToggle")
	def onToggleChanged(self, args):
		"""
		proxy也支持binding
		"""
		print("myToggle onToggleChanged: {}".format(args))
```
