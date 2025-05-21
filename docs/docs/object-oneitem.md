---
title: OneItem
order: 6
toc: content
group:
  title: 面向对象&流式接口
  order: 0
---
:::info{title=提示}
用法索引中OneItem相较于传统调用函数可以节省下面参数的填写，具体可参照补全库。
:::

## <center>对象参数</center>

|       参数名        |数据类型|        说明         |
|:----------------:|:-:|:-----------------:|
|     PlayerId     |str|       玩家Id        |
|     Type     |int|       背包类型0:物品栏及背包, 1:副手, 2:主手, 3:盔甲栏        |
|     TypeInv     |int|       对应类型的槽位        |
| IsLogging |bool| 是否输出常规日志，默认为False |


## <center>用法索引</center>

|                             属性/方法                              |<div style="width: 3.5em">端</div>|       描述      |
|:--------------------------------------------------------------:|:-:|:-------------:|
|        [ExchangePlayerInv](/docs/all#exchangeplayerinv)        |<font color=red>服务端</font>|     交换玩家背包物品位置     |
|       [GetPlayerSelectInv](/docs/all#getplayerselectinv)       |<font color=red>服务端</font>|     获取玩家当前所选择的槽位     |
|         [GetItemDictByInv](/docs/all#getitemdictbyinv)         |<font color=red>服务端</font>|     根据背包类型、槽位来获取物品数据信息     |
|      [SetPlayerSelectItem](/docs/all#setplayerselectitem)      |<font color=red>服务端</font>|     设置玩家选中的物品槽位     |
|    [ClearPlayerOnHandItem](/docs/all#clearplayeronhanditem)    |<font color=red>服务端</font>|     清除玩家主手物品     |
|           [GetAllItemDict](/docs/all#getallitemdict)           |<font color=red>服务端</font>|     获取类型所有物品数据     |
|             [SetItemLayer](/docs/all#setitemlayer)             |<font color=red>服务端</font>|     设置物品层级贴图，仍需要手动将物品数据生成给玩家，因此使用该接口前需要清除传入的ItemDict物品     |
|    [SetPlayerItemByInvPos](/docs/all#setplayeritembyinvpos)    |<font color=red>服务端</font>|     根据背包槽位设置玩家物品，会覆盖原有位置物品     |
| [RemovePlayerItemByInvPos](/docs/all#removeplayeritembyinvpos) |<font color=red>服务端</font>|     根据背包槽位删除玩家物品     |

## <center>流式索引</center>

|               属性/方法               |<div style="width: 3.5em">端</div>|  类型  |           描述           | 可修改 |
|:---------------------------------:|:-:|:----:|:----------------------:|:---:|
|           [Data](#data)           |<font color=red>服务端</font>| dict | 该物品数据信息，修改时应当另立一个Dict  |  ✅  |
|           [Info](#info)           |<font color=red>服务端</font>| dict |       该物品类型的基础信息       |  ✅  |
|          [count](#count)          |<font color=red>服务端</font>| int  |          物品数量          |  ✅  |
|   [isDiggerItem](#isdiggeritem)   |<font color=red>服务端</font>| bool |        是否为挖掘工具         |  ❌  |
|    [enchantData](#enchantdata)    |<font color=red>服务端</font>| list |         物品附魔数据         |  ✅  |
|     [durability](#durability)     |<font color=red>服务端</font>| int  |         物品耐久值          |  ✅  |
|     [customTips](#customtips)     |<font color=red>服务端</font>| str  |        物品自定义信息         |  ✅  |
|        [extraId](#extraid)        |<font color=red>服务端</font>| str  | 物品自定义标识符，可以用于保存数据，区分物品<br>推荐结合json模块将dict转化为str存储，读取后转化为dict使用 |  ✅  |
|    [newAuxValue](#newauxvalue)    |<font color=red>服务端</font>| int  |         物品特征值          |  ✅  |
|    [newItemName](#newitemname)    |<font color=red>服务端</font>| str  | 物品名称，如minecraft:sitck  |  ✅  |
|         [Layer0](#layer0)         |<font color=red>服务端</font>| str  |      物品层级贴图，对应-2级      |  ✅  |
|         [Layer1](#layer1)         |<font color=red>服务端</font>| str  |      物品层级贴图，对应-1级      |  ✅  |
|         [Layer3](#layer3)         |<font color=red>服务端</font>| str  |      物品层级贴图，对应1级       |  ✅  |
|         [Layer4](#layer4)         |<font color=red>服务端</font>| str  |      物品层级贴图，对应2级       |  ✅  |
|         [Layer5](#layer5)         |<font color=red>服务端</font>| str  |      物品层级贴图，对应3级       |  ✅  |
| [modEnchantData](#modenchantdata) |<font color=red>服务端</font>| list |       物品自定义附魔数据        |  ✅  |
|     [showInHand](#showinhand)     |<font color=red>服务端</font>| bool |       物品是否显示在手上        |  ✅  |
