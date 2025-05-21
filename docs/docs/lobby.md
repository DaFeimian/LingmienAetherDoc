---
title: 联机大厅*
order: 11
toc: content
group:
  title: LAAPI
  order: 0.5
---
:::warning{title=注意}
*高难度内容，已整合为中等难度！
:::
:::success{title=太棒了}
- 轻松自定义公告活动，包含签到、文本等
- 轻松自定义商店商品，自动统计购买量
- 玩家自动跨存档保存背包数据
:::

## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[SetPlayerDataInLobby](#setplayerdatainlobby)|<font color=red>服务端</font>|设置联机大厅玩家/服务器存储数据|
|[GetPlayerDataInLobby](#getplayerdatainlobby)|<font color=red>服务端</font>|获取联机大厅玩家/服务器存储数据|
|[BindPlayerBuyItemFunction](#bindplayerbuyitemfunction)|<font color=red>服务端</font>|绑定联机大厅玩家购买商品事件函数|
|[GetPlayerLobbyUID](#getplayerlobbyuid)|<font color=red>服务端</font>|获取玩家联机大厅UID|
|[RegisterCustomLobbyNotice](#registercustomlobbynotice)|<font color=red>服务端</font>|注册自定义联机大厅公告|
|[RegisterLobbyMenuButton](#registerlobbymenubutton)|<font color=blue>客户端</font>|注册自定义联机大厅菜单按钮|
|[RebindMenuButtonFunction](#rebindmenubuttonfunction)|<font color=blue>客户端</font>|重新绑定菜单按钮触发函数|
|[SelectNotice](#selectnotice)|<font color=blue>客户端</font>|打开指定标题公告活动界面|
|[RegisterCustomLobbyPriceType](#registercustomlobbypricetype)|<font color=red>服务端</font>|注册自定义联机大厅货币类型|
|[AddPlayerCoinInLobby](#addplayercoininlobby)|<font color=red>服务端</font>|为已注册的货币进行添加或减少，仅限于联机大厅|
|[RegisterCustomLobbyStore](#registercustomlobbystore)|<font color=red>服务端</font>|注册自定义联机大厅商品，需要提前注册货币|
|[SetLobbyMenuVisible](#setlobbymenuvisible)|<font color=blue>客户端</font>|设置联机大厅菜单是否显示|
|[OpenStoreInLobby](#openstoreinlobby)|<font color=blue>客户端</font>|打开联机大厅商店界面|
|[RegisterCustomLobbyRank](#registercustomlobbyrank)|<font color=red>服务端</font>|注册联机大厅排行榜|
|[RegisterOPPlayerUIDInLobby](#regosteropplayeruidinlobby)|<font color=red>服务端</font>|注册联机大厅管理员UID|

### 网易联机大厅服务端bug
由于网易我的世界联机大厅服务器启动服务端随机顺序运行脚本，不受约束，因此需要通过以下代码获取灵免以太实例进行解决：

:::code-group

```python [服务端]
def __init__(self, namespace, systemName):
  ...
  self.AddTimes = 0
  self.GetMainPackSystem()

def GetMainPackSystem(self):
  logging.debug('{0}'.format(self.AddTimes))
  try:
      self.LA = self.GetLASys('密钥')
      if self.AddTimes <= 10:
          if not self.LA:
              compTimer.AddTimer(1.0, self.GetMainPackSystem)
              self.AddTimes += 1
          else:
              # 服务端真正初始化逻辑
              self.LA.SetIsDisable('AntiCheatUseServerApi', False)
              self.LA.SetIsDisable('IsStartUI', False)
              self.LA.SetIsDisable('IsLobby', True)
  except Exception as e:
      if self.AddTimes <= 10:
          compTimer.AddTimer(1.0, self.GetMainPackSystem)
          logging.critical('异常：{0}'.format(e))
```

``` python [客户端]
def __init__(self, namespace, systemName):
  ...
  self.AddTimes = 0
  self.GetMainPackSystem()

def GetMainPackSystem(self):
    try:
        self.LA = self.GetLASys('密钥')
        if self.AddTimes <= 10:
            if not self.LA:
                compTimer.AddTimer(1.0, self.GetMainPackSystem)
                self.AddTimes += 1
    except:
        if self.AddTimes <= 10:
            compTimer.AddTimer(1.0, self.GetMainPackSystem)
```

:::

### 联机大厅默认数据Key列表
:::warning{title=注意}
- 因此在自行编写一些存储数据的时候，应当避开原版Key
:::
#### 玩家
<Tree>
  <ul>
    <li>
      {PriceType}<small>int; 玩家该货币余额</small>
    </li>
    <li>
      All{PriceType}<small>int; 玩家对该充值类型货币总获取量(累充)</small>
    </li>
    <li>
      OffHandItemList<small>dictlist; 玩家副手物品数据</small>
    </li>
    <li>
      ArmorItemDict<small>dictlist; 玩家盔甲物品数据</small>
    </li>
    <li>
      PackItemList0<small>dictlist; 玩家快捷栏物品数据</small>
    </li>
    <li>
      PackItemList1<small>dictlist; 玩家背包第三行物品数据(拆分存储，防止卡死)</small>
    </li>
    <li>
      PackItemList2<small>dictlist; 玩家背包第二行物品数据(拆分存储，防止卡死)</small>
    </li>
    <li>
      PackItemList3<small>dictlist; 玩家背包第一行物品数据(拆分存储，防止卡死)</small>
    </li>
    <li>
      IsBan<small>bool; 玩家是否封禁(需要日期小于封禁日期才会封禁)</small>
    </li>
    <li>
      BanInfo<small>str; 玩家封禁提示文字</small>
    </li>
    <li>
      UnBanDate<small>str; 玩家封禁截止日期，格式为'{Year}_{Month}_{Day}'，例如'2034_8_31'</small>
    </li>
  </ul>
</Tree>

#### 服务器
<Tree>
  <ul>
    <li>
      ServerStorage<small>服务器主要数据</small>
      <ul>
        <li>CloudLobbyNotice<small>公告活动列表</small></li>
        <li>CloudLobbyStore<small>商店商品列表</small></li>
        <li>CloudLobbyStoreItem<small>商品售卖数据</small></li>
      </ul>
    </li>
    <li>
      ChargedRank<small>排行榜</small>
      <ul>
        <li>All{PriceType}Rank<small>充值类型货币玩家排行榜列表</small></li>
      </ul>
    </li>
  </ul>
</Tree>

------------

### <a id="setplayerdatainlobby"></a>SetPlayerDataInLobby
<font color=red>服务端</font><br>
- 描述<br>
  设置联机大厅玩家存储数据(对应Key进行覆盖)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerData|dict|玩家需要存储的数据，可进行部分覆盖|
|PlayerId|str|玩家id，默认为None，则获取服务器存储数据|
|FunctionInstance|function|指定CallBack返回函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()，默认为None|

- 返回值<br>
  无

- 备注<br>
  - 所指定的函数接收的一个dict参数如下

    |Key|数据类型|说明|
    |:-:|:-:|:-:|
    |PlayerId|str|玩家Id|
    |PlayerData|list|使用接口传入的PlayerData参数列表|
    |Code|bool|(已弃用)是否成功|

  - 留意json跟dict的区分，例如json的key一定要是字符串，json没有tuple等
  - 该接口有调用频率限流，同一个组件所有联机大厅房间的请求频率最多为每秒50次。如果请求超过该频率会导致阻塞，请求的相应时间变长。

- 示例
```python {17}
def ServerInIt(self, *args):
  ItemCmd = ['A_600', 'A_1200', 'A_4000', 'A_6800', 'A_12800', 'A_32800', 'A_64800']
  for OneItemCmd in ItemCmd:
    self.LA.BindPlayerBuyItemFunction(OneItemCmd, self.BuyCoin)

def BuyCoin(self, args):
  PlayerId, ItemCmd = args['PlayerId'], args['ItemCmd']
  # 因为这里的货币充值面额的Cmd都是规范格式，所以可以多种商品逻辑整合为一个函数
  Coin = int(ItemCmd.split('_')[-1])
  self.LA.SetModRenderAttrByKey(PlayerId, 'BuyCoin', Coin)
  self.LA.GetPlayerDataInLobby(['Coin'], PlayerId, FunctionInstance=self.GetAndAddCoin)

def GetAndAddCoin(self, args):
  PlayerId, PlayerCoin = args['PlayerId'], {'Coin': int(args.get('Coin', 0))}
  Coin = self.LA.GetModRenderAttrByKey(PlayerId, 'BuyCoin')
  PlayerCoin['Coin'] += Coin
  self.LA.SetPlayerDataInLobby(PlayerCoin, PlayerId)
  self.LA.ServerMsg(PlayerId, '获得货币：{0}'.format(Coin))
  # 此时也可使用这个来进行获取返回值，但这可能导致获取成其他玩家的数据
  PlayerCoin = self.LA.GetModRenderAttrByKey(PlayerId, 'LobbyData') or {'Coin': 0}
  PlayerCoin['Coin'] += Coin
```
------------

### <a id="getplayerdatainlobby"></a>GetPlayerDataInLobby
:::warning{title=注意}
- 受网易服务器性能影响，实际使用中，请勿按照示例中使用了GetPlayerDataInLobby之后立刻使用GetModRenderAttrByKey获取数据！
- 推荐再使用SetModRenderAttrByKey本地存储同样数据或使用的FunctionInstance参数来指定CallBack返回函数
- Value为数字时，记得二次int，防止因后台调控导致值变为str类型
:::
<font color=red>服务端</font><br>
- 描述<br>
  获取联机大厅玩家存储数据(可部分获取)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerDataKeyList|list|玩家存储的联机大厅数据Key列表，可部分获取|
|PlayerId|str|玩家id，默认为None，则获取服务器存储数据|
|DataKey|str|指定获取返回值GetModRenderAttrByKey接口的Key，默认为'LobbyData'|
|FunctionInstance|function|指定CallBack返回函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()，默认为None|

- 返回值<br>
无

- 备注<br>
  - 所指定的函数接收的一个dict参数如下，当该Key没有数据时，返回的参数不会携带该Key

  |Key|数据类型|说明|
  |:-:|:-:|:-:|
  |PlayerId|str|玩家Id|
  |PlayerDataKeyList|list|使用接口传入的PlayerDataKeyList参数列表|
  |*PlayerDataKey(玩家存储的联机大厅数据Key)|any|对应Key的值，有很多个，根据传入的PlayerDataKeyList有关|

  - 【由于服务器黑箱环境，现已不再推荐】*由于网易反作弊使用异步：返回值需使用GetModRenderAttrByKey获取Key为`DataKey`来获得返回值！，当不存在这个Key的存储值时，`DataKey`值为None，而不再是因为没有异步返回而不会进行任何修改！*
  - 该接口有调用频率限流，同一个组件所有联机大厅房间的请求频率最多为每秒200次。如果请求超过该频率会导致阻塞，*请求的相应时间变长*。因此玩家初始化设置的时候会出现*伪回档*现象，需要进行逻辑规避

- 示例
```python {11,13}
def ServerInIt(self, *args):
  ItemCmd = ['A_600', 'A_1200', 'A_4000', 'A_6800', 'A_12800', 'A_32800', 'A_64800']
  for OneItemCmd in ItemCmd:
    self.LA.BindPlayerBuyItemFunction(OneItemCmd, self.BuyCoin)

def BuyCoin(self, args):
  PlayerId, ItemCmd = args['PlayerId'], args['ItemCmd']
  # 因为这里的货币充值面额的Cmd都是规范格式，所以可以多种商品逻辑整合为一个函数
  Coin = int(ItemCmd.split('_')[-1])
  self.LA.SetModRenderAttrByKey(PlayerId, 'BuyCoin', Coin)
  self.LA.GetPlayerDataInLobby(['Coin'], PlayerId, FunctionInstance=self.GetAndAddCoin)

def GetAndAddCoin(self, args):
  PlayerId, PlayerCoin = args['PlayerId'], {'Coin': int(args.get('Coin', 0))}
  Coin = self.LA.GetModRenderAttrByKey(PlayerId, 'BuyCoin')
  PlayerCoin['Coin'] += Coin
  self.LA.SetPlayerDataInLobby(PlayerCoin, PlayerId)
  self.LA.ServerMsg(PlayerId, '获得货币：{0}'.format(Coin))
  # 此时也可使用这个来进行获取返回值，但这可能导致获取成其他玩家的数据
  PlayerCoin = self.LA.GetModRenderAttrByKey(PlayerId, 'LobbyData') or {'Coin': 0}
  PlayerCoin['Coin'] += Coin
```
------------

### <a id="bindplayerbuyitemfunction"></a>BindPlayerBuyItemFunction
<font color=red>服务端</font><br>
- 描述<br>
  绑定联机大厅玩家购买商品事件函数，为防止作弊无法解绑

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ItemCmd|str|商品指令|
|FunctionInstance|function|函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()|

- 返回值<br>
  无

- 备注<br>
  - 所绑定的函数接收的一个dict参数如下

  |Key|数据类型|说明|
  |:-:|:-:|:-:|
  |PlayerId|str|玩家id|
  |PlayerUID|int|玩家UID|
  |ItemCmd|str|商品指令|

- 示例
```python {2-4}
def ServerInIt(self, *args):
  ItemCmd = ['A_600', 'A_1200', 'A_4000', 'A_6800', 'A_12800', 'A_32800', 'A_64800']
  for OneItemCmd in ItemCmd:
    self.LA.BindPlayerBuyItemFunction(OneItemCmd, self.BuyCoin)

def BuyCoin(self, args):
  PlayerId, ItemCmd = args['PlayerId'], args['ItemCmd']
  # 因为这里的货币充值面额的Cmd都是规范格式，所以可以多种商品逻辑整合为一个函数
  Coin = int(ItemCmd.split('_')[-1])
  self.LA.SetModRenderAttrByKey(PlayerId, 'BuyCoin', Coin)
  self.LA.GetPlayerDataInLobby(['Coin'], PlayerId, FunctionInstance=self.GetAndAddCoin)

def GetAndAddCoin(self, args):
  PlayerId, PlayerCoin = args['PlayerId'], {'Coin': int(args.get('Coin', 0))}
  Coin = self.LA.GetModRenderAttrByKey(PlayerId, 'BuyCoin')
  PlayerCoin['Coin'] += Coin
  self.LA.SetPlayerDataInLobby(PlayerCoin, PlayerId)
  self.LA.ServerMsg(PlayerId, '获得货币：{0}'.format(Coin))
  # 此时也可使用这个来进行获取返回值，但这可能导致获取成其他玩家的数据
  PlayerCoin = self.LA.GetModRenderAttrByKey(PlayerId, 'LobbyData') or {'Coin': 0}
  PlayerCoin['Coin'] += Coin
```
------------

### <a id="getplayerlobbyuid"></a>GetPlayerLobbyUID
<font color=red>服务端</font><br>
- 描述<br>
  获取玩家联机大厅UID

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 返回值<br>
  玩家联机大厅UID (int)

- 备注<br>
无

- 示例
空
------------

### <a id="registercustomlobbynotice"></a>RegisterCustomLobbyNotice
<font color=red>服务端</font><br>
:::info{title=提示}
- 公告活动功能是支持脚本层、云端(即联机大厅存储数据，结合[联机大厅后台控制中心](/docs/auto-lobbycontrol))动态注册的
- 公告活动功能在联机大厅的存储Key必须为ServerStorage下的CloudLobbyNotice (list)
- 在脚本层动态注册时，必须要在服务端初始化时注册
:::
- 描述<br>
  注册自定义联机大厅公告活动

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Title|str|公告列表标题|
|Icon|str|图标路径，例如textures/ui/LA/button|
|Type|str|公告类型|
|Data|dict|公告类型数据|

- 返回值<br>
无

- 备注<br>
  - 公告类型列表

    |类型|说明|备注|
    |:-:|:-:|:-:|
    |Text|文本公告|使用$imagepath$添加图片，格式为textures/ui/...|
    |Image|图片公告|海报图片、一个自定义按钮|
    |Sign|签到活动|7天自定义签到活动，支持云端存储、本地|

  - 文本公告类型数据

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |Title|str|标题|
    |Content|str|内容、支持富文本|

  - 图片公告类型数据

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |Text|str|按钮文字|
    |Image|str|图片路径|
    |ModName|str|按钮触发函数(接受一个参数)所在的模组名称|
    |ClientSystemName|str|按钮触发函数(接受一个参数)所在的客户端名称|
    |FunctionName|str|按钮触发函数(接受一个参数)所在的客户端实例下的函数名称|

  - 签到活动类型数据

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |BindDataKey|str|绑定存储数据Key|
    |IsLobby|bool|是否为联机大厅数据存储Key|
    |Reward|list|奖励数据列表，必须为7个dict|
    
    - Reward奖励数据

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |Icon|str|奖励内容贴图路径|
    |Num|int|奖励内容数量|
    |ModName|str|领取触发函数(接受一个参数)所在的模组名称|
    |ServerSystemName|str|领取触发函数(接受一个参数)所在的客户端名称|
    |ClientSystemName|str|(不推荐)领取触发函数(接受一个参数)所在的客户端名称|
    |FunctionName|str|领取触发函数(接受一个参数)所在的实例下的函数名称|
    |*|any|自定义Key的自定义标记信息，因为领取触发的函数会将本奖励数据dict所有内容返回到函数，因此可以自定义一些数据来进行记录或辨别|

- 示例
:::code-group

```python [文本公告类型-脚本层]
self.LA.RegisterCustomLobbyNotice('文本公告', 'textures/ui/text_icon', 'Text', {
  'Title': '自定义标题',
  'Content': '自定义文本内容及图片$textures/ui/logo$'
})
```

```python [文本公告类型-云端]
# -*- coding:utf-8 -*-
OPUidList = [2147535861, 4294967295]  # 拥有后台权限的玩家UID
LobbyStorageKeyList = ['ServerStorage']  # 联机大厅服务器存储数据的KeyList，用于初始化服务器配置
LobbyStorageDict = {
    # 第一级Key对应 LobbyStorageKeyList
    'ServerStorage': {
        'CloudLobbyNotice': [
            {
                'Title': '文本公告',
                'Icon': 'textures/ui/text_icon',
                'Type': 'Text',
                'Data': {
                    'Title': '自定义标题',
                    'Content': '自定义文本内容及图片$textures/ui/logo$',
                },
            }
        ]
    }
}
```

```python [图片公告类型-脚本层]
self.LA.RegisterCustomLobbyNotice('图片公告', 'textures/ui/iamge_icon', 'Image', {
  'Text': '前往签到',
  'Image': 'textures/ui/iamge',
  'ModName': 'LingmienMod',
  'ClientSystemName': 'LingmienModClientSystem',
  'FunctionName': 'ButtonEvent',
})
```

```python [图片公告类型-云端]
# -*- coding:utf-8 -*-
OPUidList = [2147535861, 4294967295]  # 拥有后台权限的玩家UID
LobbyStorageKeyList = ['ServerStorage']  # 联机大厅服务器存储数据的KeyList，用于初始化服务器配置
LobbyStorageDict = {
    # 第一级Key对应 LobbyStorageKeyList
    'ServerStorage': {
        'CloudLobbyNotice': [
            {
                'Title': '图片公告',
                'Icon': 'textures/ui/iamge_icon',
                'Type': 'Image',
                'Data': {
                  'Text': '前往签到',
                  'Image': 'textures/ui/iamge',
                  'ModName': 'LingmienMod',
                  'ClientSystemName': 'LingmienModClientSystem',
                  'FunctionName': 'ButtonEvent',
                },
            }
        ]
    }
}
```

```python [签到活动类型-脚本层]
self.LA.RegisterCustomLobbyNotice('签到', 'textures/ui/LA/first_charge_icon', 'Sign', {
    'BindDataKey': 'SignList2',
    'IsLobby': True,
    'Reward': [
        {
            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
            'Icon': 'textures/ui/red',
            'Num': 1,
            'ModName': 'lair',
            'ClientSystemName': 'lairClientSystem',
            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
        },
        {
            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
            'Icon': 'textures/ui/red',
            'Num': 2,
            'ModName': 'lair',
            'ClientSystemName': 'lairClientSystem',
            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
        },
        {
            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
            'Icon': 'textures/ui/red',
            'Num': 2,
            'ModName': 'lair',
            'ClientSystemName': 'lairClientSystem',
            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
        },
        {
            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
            'Icon': 'textures/ui/red',
            'Num': 2,
            'ModName': 'lair',
            'ClientSystemName': 'lairClientSystem',
            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
        },
        {
            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
            'Icon': 'textures/ui/red',
            'Num': 3,
            'ModName': 'lair',
            'ClientSystemName': 'lairClientSystem',
            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
        },
        {
            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
            'Icon': 'textures/ui/red',
            'Num': 2,
            'ModName': 'lair',
            'ClientSystemName': 'lairClientSystem',
            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
        },
        {
            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
            'Icon': 'textures/ui/red',
            'Num': 5,
            'ModName': 'lair',
            'ClientSystemName': 'lairClientSystem',
            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
        },
    ]
})
```

```python [签到活动类型-云端]
# -*- coding:utf-8 -*-
OPUidList = [2147535861, 4294967295]  # 拥有后台权限的玩家UID
LobbyStorageKeyList = ['ServerStorage']  # 联机大厅服务器存储数据的KeyList，用于初始化服务器配置
LobbyStorageDict = {
    # 第一级Key对应 LobbyStorageKeyList
    'ServerStorage': {
        'CloudLobbyNotice': [
            {
                'Title': '签到',
                'Icon': 'textures/ui/LA/first_charge_icon',
                'Type': 'Sign',
                'Data': {
                    'BindDataKey': 'SignList2',
                    'IsLobby': True,
                    'Reward': [
                        {
                            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
                            'Icon': 'textures/ui/red',
                            'Num': 1,
                            'ModName': 'lair',
                            'ClientSystemName': 'lairClientSystem',
                            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
                        },
                        {
                            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
                            'Icon': 'textures/ui/red',
                            'Num': 2,
                            'ModName': 'lair',
                            'ClientSystemName': 'lairClientSystem',
                            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
                        },
                        {
                            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
                            'Icon': 'textures/ui/red',
                            'Num': 2,
                            'ModName': 'lair',
                            'ClientSystemName': 'lairClientSystem',
                            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
                        },
                        {
                            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
                            'Icon': 'textures/ui/red',
                            'Num': 2,
                            'ModName': 'lair',
                            'ClientSystemName': 'lairClientSystem',
                            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
                        },
                        {
                            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
                            'Icon': 'textures/ui/red',
                            'Num': 3,
                            'ModName': 'lair',
                            'ClientSystemName': 'lairClientSystem',
                            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
                        },
                        {
                            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
                            'Icon': 'textures/ui/red',
                            'Num': 2,
                            'ModName': 'lair',
                            'ClientSystemName': 'lairClientSystem',
                            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
                        },
                        {
                            'ItemId': 'tutupiao',  # 可当作指令使用，用于辨别获取的奖励信息
                            'Icon': 'textures/ui/red',
                            'Num': 5,
                            'ModName': 'lair',
                            'ClientSystemName': 'lairClientSystem',
                            'FunctionName': 'Get',  # 接受领取的args参数，会携带本dict返回到函数，因此可以自定义ItemId来记录一些辨别信息
                        },
                    ]
                },
            }
        ]
    }
}
```
:::
------------

### <a id="registerlobbymenubutton"></a>RegisterLobbyMenuButton
<font color=blue>客户端</font><br>
:::info{title=提示}
- 必须要在客户端初始化时注册
:::
- 描述<br>
  注册自定义联机大厅菜单按钮

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Icon|str|图标路径，例如textures/ui/LA/button|
|FunctionInstance|function|该按钮按下触发的函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()|
|IsMust|bool|是否为必显菜单列表的按钮，默认为False|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="rebindmenubuttonfunction"></a>RebindMenuButtonFunction
<font color=blue>客户端</font><br>
:::info{title=提示}
- 必须要在客户端初始化时重新绑定
:::
- 描述<br>
  重新绑定菜单按钮触发函数

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|MenuType|str|菜单类型|
|FunctionInstance|function|该按钮按下触发的函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg(),默认为None，则隐藏该按钮|

- 返回值<br>
无

- 备注<br>
  - 菜单类型

    |类型|说明|备注|
    |:-:|:-:|:-:|
    |Store|商店||
    |Lucky|抽奖||
    |FirstCharge|首充||
    |Vip|会员||
    |Notice|公告活动||
    |Rank|排行榜||
    |Refresh|刷新服务端数据||
    |QQButton|QQ按钮||
    |Question|如何游玩||
    |Tpa|传送申请||

- 示例
空
------------

### <a id="selectnotice"></a>SelectNotice
<font color=blue>客户端</font><br>
- 描述<br>
  打开指定标题公告活动界面

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Title|str|公告活动标题|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="registercustomlobbypricetype"></a>RegisterCustomLobbyPriceType
<font color=red>服务端</font><br>
:::info{title=提示}
- 自动绑定购买指令及发放函数
- 购买指令：BindDataKey_Num Num为600,1200,4000,6800,12800,32800,64800,1240,4210,7250,13950,35950,71950,2400,8000,13600,25600,65600,129600
- 自动统计充值总额
:::
- 描述<br>
  注册自定义联机大厅货币类型

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BindDataKey|str|货币数据Key，即PriceType，两者合并为一个参数|
|Icon|str|货币类型图标路径，例如textures/ui/LA/button|
|IsCharged|bool|是否为联机大厅充值货币|
|IsLobby|bool|是否为联机大厅数据存储Key|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="addplayercoininlobby"></a>AddPlayerCoinInLobby
<font color=red>服务端</font><br>
- 描述<br>
  为已注册的货币进行添加或减少，仅限于联机大厅

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|CoinKey|str|货币注册的Key|
|AddCoinNum|int|添加的数量(负数为减少)|
|IsVisible|bool|是否显示加载界面，默认为True|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="registercustomlobbystore"></a>RegisterCustomLobbyStore
<font color=red>服务端</font><br>
- 描述<br>
  注册自定义联机大厅商品，需要提前注册货币

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Title|str|商品名称|
|Icon|str|商品图标路径，例如textures/ui/LA/button|
|Tag|str|商品分类标签|
|PriceType|str|价格类型|
|Price|int|价格数量|
|Info|str|富文本商品介绍|
|ModName|str|购买成功后发货触发函数(接受一个参数,会返回PlayerId)所在的模组名称|
|ServerSystemName|str|购买成功后发货触发函数(接受一个参数,会返回PlayerId)所在的服务端名称|
|FunctionName|str|购买成功后发货触发函数(接受一个参数,会返回PlayerId)所在的服务端函数名称|
|OtherData|dict|其他数据，用于自定义标记商品数据，如售卖数量、售卖的物品id，注意key不要和之前的参数冲突|

- 返回值<br>
无

- 备注<br>
  - 发货触发函数接收的一个参数中额外包含Key：

  |参数名|数据类型|说明|
  |:-:|:-:|:-:|
  |PlayerId|str|玩家Id|
  |BuyNumTimes|int|批量购买数量|

- 示例
空
------------

### <a id="setlobbymenuvisible"></a>SetLobbyMenuVisible
<font color=blue>客户端</font><br>
- 描述<br>
  设置联机大厅菜单是否显示

- 参数<br>

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Visible|bool|是否显示|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="openstoreinlobby"></a>OpenStoreInLobby
<font color=blue>客户端</font><br>
- 描述<br>
  打开联机大厅商店界面

- 参数<br>
无

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="registercustomlobbyrank"></a>RegisterCustomLobbyRank
<font color=red>服务端</font><br>
:::info{title=提示}
- 服务端初始化时调用
- 使用GetModRenderAttrByKey接口Key为RankListBy{BindDataKey}获取排行榜list数据
- BindDataKey 排行榜绑定的服务器ChargedRank下的数据Key,Value为dictlist，且dict必须包含Value,PlayerUID,PlayerName
:::
- 描述<br>
  注册联机大厅排行榜

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BindDataKey|str|排行榜绑定的服务器ChargedRank下的数据Key,Value为dictlist，且dict必须包含Value,PlayerUID,PlayerName|
|Name|str|该排行榜显示的名字|
|Icon|str|图标路径，例如textures/ui/LA/button|
|InfoText|str|该排行榜提示文字信息，默认为''|
|IsPositiveSequence|bool|排序是否为正序，默认为False|

- 返回值<br>
无

- 备注<br>
无

- 示例
空
------------

### <a id="registeropplayeruidinlobby"></a>RegisterCustomLobbyRank
<font color=red>服务端</font><br>
:::info{title=提示}
- 服务端初始化时调用
:::
- 描述<br>
  注册联机大厅管理员UID

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerUID|int|玩家UID|

- 返回值<br>
无

- 备注<br>
无

- 示例
空