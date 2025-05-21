---
title: 控制
order: 17
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[BindKeyPress](#bindkeypress)|<font color=blue>客户端</font>|绑定或取消绑定键盘按键|
|[BindGamepadTriggerPress](#bindgamepadtriggerpress)|<font color=blue>客户端</font>|绑定手柄扳机，右扳机将会屏蔽原版攻击逻辑|
|[BindGamepadKeyPress](#bindgamepadkeypress)|<font color=blue>客户端</font>|绑定手柄按键|
|[GetPlayerCtrl](#getplayerctrl)|<font color=blue>客户端</font>|获取玩家的操控模式|
|[ResetAutoCtrl](#resetautoctrl)|<font color=blue>客户端</font>|重置到自动控制模式|

------------

### <a id="bindkeypress"></a>BindKeyPress
<font color=blue>客户端</font><br>
- 描述<br>
  绑定或取消绑定键盘按键

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Key|str|绑定的按键编号|
|IsDown|bool|是否按下时触发，取消绑定时，该参数无意义|
|Object|object|[可用，但现已不推荐]该函数所在的客户端实例，取消绑定时，该参数无意义|
|FunctionName|str|[可用，但现已不推荐]触发的函数名称(无参数)，取消绑定时，该参数无意义|
|ScreenName|str|只在该界面名称下触发，默认为None，则不根据界面情况执行，取消绑定时，该参数无意义|
|IsAdd|bool|是否是添加绑定，默认为True，则为添加类型反之为删除|
|FunctionInstance|function|函数(无参数)，例如self.CreateMsg，不要填写成self.CreateMsg()样式，默认为None|

- 返回值<br>
是否成功 (bool)

- 备注<br>
按键编号
```python
class KeyBoardType:
	KEY_GOBACK = 4			# 旧版本遗留，已弃用
	KEY_MOUSE_LEFT = -99 	# 鼠标左键
	KEY_MOUSE_RIGHT = -98 	# 鼠标右键
	KEY_MOUSE_Middle = -97 	# 鼠标中键

	KEY_BACKSPACE = 8		# Backspace键	
	KEY_TAB = 9				# Tab键
	KEY_RETURN = 13			# 回车键
	KEY_PAUSE = 19			# PAUSE键

	KEY_LSHIFT = 16			# SHIFT键		
	KEY_CONTROL = 17		# CONTROL键
	KEY_MENU = 18			# ALT键
	KEY_CAPS_LOCK = 20		# CAPS LOCK键(大小写键)
	KEY_ESCAPE = 27			# Esc键
	KEY_SPACE = 32			# 空格键
	KEY_PG_UP = 33			# Page Up键
	KEY_PG_DOWN = 34		# Page Down键
	KEY_END = 35			# End键
	KEY_HOME = 36			# Home键

	KEY_LEFT = 37			# 方向左键(←)
	KEY_UP = 38				# 方向上键(↑)
	KEY_RIGHT = 39			# 方向右键(→)
	KEY_DOWN = 40			# 方向下键(↓)
	KEY_INSERT = 45			# Insert键
	KEY_DELETE = 46			# Delete键

	KEY_0 = 48				# 数字0(大键盘不是小键盘，48~57同)
	KEY_1 = 49				# 数字1
	KEY_2 = 50				# 数字2
	KEY_3 = 51				# 数字3
	KEY_4 = 52				# 数字4
	KEY_5 = 53				# 数字5
	KEY_6 = 54				# 数字6
	KEY_7 = 55				# 数字7
	KEY_8 = 56				# 数字8
	KEY_9 = 57				# 数字9

	KEY_A = 65				# A键
	KEY_B = 66				# B键
	KEY_C = 67				# C键
	KEY_D = 68				# D键
	KEY_E = 69				# E键				
	KEY_F = 70				# F键
	KEY_G = 71				# G键
	KEY_H = 72				# H键
	KEY_I = 73				# I键
	KEY_J = 74				# J键
	KEY_K = 75				# K键
	KEY_L = 76				# L键
	KEY_M = 77				# M键
	KEY_N = 78				# N键
	KEY_O = 79				# O键
	KEY_P = 80				# P键
	KEY_Q = 81				# Q键
	KEY_R = 82				# R键
	KEY_S = 83				# S键
	KEY_T = 84				# T键
	KEY_U = 85				# U键
	KEY_V = 86				# V键
	KEY_W = 87				# W键
	KEY_X = 88				# X键
	KEY_Y = 89				# Y键
	KEY_Z = 90				# Z键

	KEY_NUMPAD0 = 96		# 数字0(小键盘，96~111同)
	KEY_NUMPAD1 = 97		# 数字1
	KEY_NUMPAD2 = 98		# 数字2
	KEY_NUMPAD3 = 99		# 数字3
	KEY_NUMPAD4 = 100		# 数字4
	KEY_NUMPAD5 = 101		# 数字5
	KEY_NUMPAD6 = 102		# 数字6
	KEY_NUMPAD7 = 103		# 数字7
	KEY_NUMPAD8 = 104		# 数字8
	KEY_NUMPAD9 = 105		# 数字9
	KEY_MULTIPLY = 106		# 乘号键(×)
	KEY_ADD = 107			# 加号键(+)

	KEY_SUBTRACT = 109		# 减号键(-)
	KEY_DECIMAL = 110		# 小数点(.)
	KEY_DIVIDE = 111		# 除法键(/)
	KEY_F1 = 112			# 功能键F1
	KEY_F2 = 113			# 功能键F2
	KEY_F3 = 114			# 功能键F3
	KEY_F4 = 115			# 功能键F4
	KEY_F5 = 116			# 功能键F5
	KEY_F6 = 117			# 功能键F6
	KEY_F7 = 118			# 功能键F7
	KEY_F8 = 119			# 功能键F8
	KEY_F9 = 120			# 功能键F9
	KEY_F10 = 121			# 功能键F10
	KEY_F11 = 122			# 功能键F11
	KEY_F12 = 123			# 功能键F12
	KEY_F13 = 124			# 功能键F13

	KEY_NUM_LOCK = 144		# Num Lock键
	KEY_SCROLL = 145		# Scroll Lock键

	KEY_SEMICOLON = 186		# : ; 键
	KEY_EQUALS = 187		# = + 键
	KEY_COMMA = 188			# , < 键
	KEY_MINUS = 189			# - _ 键
	KEY_PERIOD = 190		# . > 键
	KEY_SLASH = 191			# / ? 键
	KEY_GRAVE = 192			# ` ~ 键

	KEY_LBRACKET = 219		# [ { 键
	KEY_BACKSLASH = 220		# \ | 键
	KEY_RBRACKET = 221		# ] } 键
	KEY_APOSTRAPHE = 222	# ' " 键
```

- 示例
```python {15,16,20,23}
  def __init__(self, namespace, systemName):
      ...
      self.LA = self.GetLASys('密钥')

  @Event.ClientEvent('UiInitFinished')
  def UiInitFinished(self, *args):
      ModData = {
          'ModName': '测试模组',
          'Version': '1.0.0',
          'LogoPath': 'textures/ui/LA/logo_text',
          'Content': '测试模组'
                      '\n这只是一个灵免以太测试用的模组',
      }
      self.LA.UseServerApi('InitLingmienAetherMod', [ModData])
      self.LA.BindKeyPress('49', True, self, 'Press1')
      self.LA.BindKeyPress('50', True, self, 'Press2')

  def Press1(self):
      self.LA.Msg('我按下了1，下次再按就没有用了')
      self.LA.BindKeyPress('49', False, self, '123123', IsAdd=False)

  def Press2(self):
      self.LA.Msg('我按下了2')
```
------------

### <a id="bindgamepadtriggerpress"></a>BindGamepadTriggerPress
<font color=blue>客户端</font><br>
- 描述<br>
  绑定手柄扳机，右扳机将会屏蔽原版攻击逻辑

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|GamepadTriggerKey|int|0: 左扳机, 1: 右扳机|
|Object|object|[可用，但现已不推荐]客户端实例，传入None则为取消绑定|
|FunctionName|str|[可用，但现已不推荐]触发的函数名称(1参数'Up','Down',表示扳机类型)，传入None则为取消绑定|
|Type|str|绑定类型'Up'扳机抬起，扳机按下'Down'，默认为'Down'，'Up'部分手柄不兼容！|
|FunctionInstance|function|函数(1参数'Up','Down',表示按键类型)，例如self.CreateMsg，不要填写成self.CreateMsg()样式，默认为None|

- 返回值<br>
无

- 备注<br>
手柄示意图

![](http://1.94.129.175/uploads/LingmienAether/img/info-6.png)

- 示例
```python {17}
  def __init__(self, namespace, systemName):
      ...
      self.LA = self.GetLASys('密钥')

  @Event.ClientEvent('UiInitFinished')
  def UiInitFinished(self, *args):
      ModData = {
          'ModName': '测试模组',
          'Version': '1.0.0',
          'LogoPath': 'textures/ui/LA/logo_text',
          'Content': '测试模组'
                      '\n这只是一个灵免以太测试用的模组',
      }
      self.LA.UseServerApi('InitLingmienAetherMod', [ModData])
      self.LA.BindKeyPress('49', True, self, 'Press1')
      self.LA.BindKeyPress('50', True, self, 'Press2')
      self.LA.BindGamepadTriggerPress(1, self, 'Gamepad', 'Down')

  def Press1(self):
      self.LA.Msg('我按下了1，下次再按就没有用了')
      self.LA.BindKeyPress('49', False, self, '123123', IsAdd=False)

  def Gamepad(self, Type):
    self.LA.Msg('右扳机{0}'.format(Type))
```
------------

### <a id="bindgamepadkeypress"></a>BindGamepadKeyPress
<font color=blue>客户端</font><br>
- 描述<br>
  绑定手柄按键

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|GamepadKey|int|仅支持以下几个，其他的控制存在冲突 2: B, 3: X, 4: Y, 9: LS, 10: RS, 11: LB, 12: RB, 13: VIEW|
|Object|object|[可用，但现已不推荐]客户端实例，传入None则为取消绑定|
|FunctionName|str|[可用，但现已不推荐]触发的函数名称(1参数'Up','Down')，传入None则为取消绑定|
|FunctionInstance|function|函数(1参数'Up','Down',表示按键类型)，例如self.CreateMsg，不要填写成self.CreateMsg()样式，默认为None|

- 返回值<br>
无

- 备注<br>
手柄示意图

![](http://1.94.129.175/uploads/LingmienAether/img/info-6.png)

- 示例
无
------------
### <a id="getplayerctrl"></a>GetPlayerCtrl
<font color=blue>客户端</font><br>
- 描述<br>
  获取玩家的操控模式

- 参数<br>
无

- 返回值<br>
操作模式(0键鼠,1触控,2手柄) (int)

- 备注<br>
无

- 示例
无

------------
### <a id="resetautoctrl"></a>ResetAutoCtrl
<font color=blue>客户端</font><br>
- 描述<br>
  重置到自动控制模式

- 参数<br>
无

- 返回值<br>
无

- 备注<br>
无

- 示例
无
------------
### <a id="前往附件"></a>前往附件