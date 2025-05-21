---
title: 物品
order: 15
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[BindPlayerOnHandItemFunction](#bindplayeronhanditemfunction)|<font color=red>服务端</font>|绑定玩家手持某物品的事件函数，首次需要切换物品后才会触发|
|[CreateLootItem](#createlootitem)|<font color=red>服务端</font>|生成掉落物|
|[ExchangePlayerInv](#exchangeplayerinv)|<font color=red>服务端</font>|交换玩家背包物品位置|
|[GetPlayerSelectInv](#getplayerselectinv)|<font color=red>服务端</font>|获取玩家当前所选择的槽位|
|[GetItemDictByInv](#getitemdictbyinv)|<font color=orange>双端</font>|根据背包类型、槽位来获取物品数据信息|
|[GetAllLoadItems](#getallloaditems)|<font color=red>服务端</font>|获取已经加载的物品id|
|[SetPlayerSelectItem](#setplayerselectitem)|<font color=red>服务端</font>|设置玩家选中的物品槽位|
|[ClearPlayerOnHandItem](#clearplayeronhanditem)|<font color=red>服务端</font>|清除玩家主手物品|
|[GetAllItemDict](#getallitemdict)|<font color=orange>双端</font>|获取类型所有物品数据|
|[SetItemLayer](#setitemlayer)|<font color=red>服务端</font>|设置物品层级贴图|
|[SetPlayerItemByInvPos](#setplayeritembyinvpos)|<font color=red>服务端</font>|根据背包槽位设置玩家物品|
|[RemovePlayerItemByInvPos](#removeplayeritembyinvpos)|<font color=red>服务端</font>|根据背包槽位删除玩家物品|

------------

### <a id="bindplayeronhanditemfunction"></a>BindPlayerOnHandItemFunction
<font color=red>服务端</font><br>
- 描述<br>
  绑定玩家手持某物品的事件函数，首次需要切换物品后才会触发

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ItemName|str|物品名称，例如'minecraft:stick'|
|FunctionInstance|function|函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()样式|
|ButtonText|str|按钮文字，默认为''，用按钮点击方式来触发绑定的函数|
|IsAdd|bool|是否是添加绑定，默认为True，则为添加类型反之为删除|

- 返回值<br>
  无

- 备注<br>
  - 所绑定的函数接收的一个dict参数如下

  |Key|数据类型|说明|
  |:-:|:-:|:-:|
  |PlayerId|str|玩家id|
  |ItemName|str|物品名称，例如'minecraft:stick'|

- 示例
无
------------

### <a id="createlootitem"></a>CreateLootItem
<font color=red>服务端</font><br>
- 描述<br>
  生成掉落物

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ItemName|str|物品名称，例如'minecraft:stick'|
|ItemPos|tuple|物品生成三维坐标|
|Count|int|物品生成数量|
|ItemAuxValue|int|物品特殊值，默认为0(选填)|
|ShowInHand|bool|物品是否可以显示在手上，默认为True(选填)|
|EnChantData|list|物品原版附魔信息list(tuple(EnchantType, int))，默认为[](选填)|
|ModEnchantData|list|物品自定义附魔信息list(tuple(CustomEnchantType, int))，默认为[](选填)|
|CustomTips|str|物品自定义提示信息，默认为None(选填)|
|ExtraId|str|物品自定义标识符，用于保存数据区分物品，默认为None(选填)|
|UserData|dict|用户数据，用于区分旗帜物品，默认为{}(选填)|
|Durability|int|物品耐久度，默认为None(选填)|
|DimensionId|int|掉落物生成维度，默认为0，即主世界|

- 返回值<br>
  掉落物实体Id (str)

- 备注<br>
  无

- 示例
无
------------

### <a id="exchangeplayerinv"></a>ExchangePlayerInv
<font color=red>服务端</font><br>
- 描述<br>
交换玩家背包物品位置

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|FirstInv|int|一号物品槽位|
|SecondInv|int|二号物品槽位|

- 返回值<br>
  无

- 备注<br>
无

- 示例
空
------------
### <a id="getplayerselectinv"></a>GetPlayerSelectInv
<font color=red>服务端</font><br>
- 描述<br>
获取玩家当前所选择的槽位

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 返回值<br>
  槽位 (int)

- 备注<br>
无

- 示例
空
------------
### <a id="getitemdictbyinv"></a>GetItemDictByInv
<font color=orange>双端</font><br>
- 描述<br>
根据背包类型、槽位来获取物品数据信息

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|Type|int|背包类型0:物品栏及背包, 1:副手, 2:主手, 3:盔甲栏|
|TypeInv|int|对应类型的槽位|

- 客户端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Type|int|背包类型0:物品栏及背包, 1:副手, 2:主手, 3:盔甲栏|
|TypeInv|int|对应类型的槽位|

- 返回值<br>
  物品数据信息 (dict)

- 备注<br>
  - [物品信息字典](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/10-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/1-%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5.html#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8)
  - 网易SetItemTierLevel和SetItemTierSpeed接口无法利用该物品数据信息返回值，因为网易对这两个接口所使用的物品数据信息做出了差异化，待灵免以太接口更新！

- 示例
空
------------
### <a id="getallloaditems"></a>GetAllLoadItems
<font color=red>服务端</font><br>
- 描述<br>
获取已经加载的物品id

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Flag|bool|True获取所有物品，False仅获取注册到创造栏的物品，默认为True|

- 返回值<br>
  已经加载的物品id列表 (list)

- 备注<br>
无

- 示例
空
------------
### <a id="setplayerselectitem"></a>SetPlayerSelectItem
<font color=red>服务端</font><br>
- 描述<br>
设置玩家选中的物品槽位

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|NewInv|str|新的槽位|

- 返回值<br>
  是否成功 (bool)

- 备注<br>
无

- 示例
空
------------
### <a id="clearplayeronhanditem"></a>ClearPlayerOnHandItem
<font color=red>服务端</font><br>
- 描述<br>
清除玩家主手物品

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|

- 返回值<br>
  是否成功 (bool)

- 备注<br>
无

- 示例
空
------------
### <a id="getallitemdict"></a>GetAllItemDict
<font color=orange>双端</font><br>
- 描述<br>
获取类型所有物品数据

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|Type|int|背包类型0:物品栏及背包, 1:副手, 2:主手, 3:盔甲栏|

- 客户端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Type|int|背包类型0:物品栏及背包, 1:副手, 2:主手, 3:盔甲栏|

- 返回值<br>
  物品信息列表 dictlist (list)

- 备注<br>
[物品信息字典](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/10-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/1-%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5.html#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8)

- 示例
空
------------
### <a id="setitemlayer"></a>SetItemLayer
<font color=red>服务端</font><br>
- 描述<br>
设置物品层级贴图，仍需要手动将物品数据生成给玩家，因此使用该接口前需要清除传入的ItemDict物品

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|ItemDict|dict|物品数据信息|
|Level|int|层级：可选-2，-1，1，2，3|
|TextureKey|str|贴图Key，需要在item_texture.json中注册|
|ExtraData|dict|需要给物品携带的数据信息，根据Key进行部分覆盖，默认为None|

- 返回值<br>
  带有自定义物品数据的物品数据信息 (dict)

- 备注<br>
  - [物品信息字典](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/10-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/1-%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5.html#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8)
  - SetItemLayer返回的ItemDict中会自动给物品添加存储信息extraId，key为Level，Value为TextureKey

- 示例
空
------------
### <a id="setplayeritembyinvpos"></a>SetPlayerItemByInvPos
<font color=red>服务端</font><br>
- 描述<br>
根据背包槽位设置玩家物品，会覆盖原有位置物品

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|InvType|int|[背包类型](http://1.94.129.175:8000/guides/guide-26#%E8%83%8C%E5%8C%85%E7%B1%BB%E5%9E%8B)(0:背包物品栏, 1:副手, 2:主手, 3:盔甲栏)|
|InvPos|int|[槽位坐标](http://1.94.129.175:8000/guides/guide-26#%E7%B1%BB%E5%9E%8B%E6%A7%BD%E4%BD%8D)|
|ItemDict|dict|物品数据信息|

- 返回值<br>
  无

- 备注<br>
  - [物品信息字典](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/10-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/1-%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5.html#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8)

- 示例
空
------------
### <a id="removeplayeritembyinvpos"></a>RemovePlayerItemByInvPos
<font color=red>服务端</font><br>
- 描述<br>
根据背包槽位删除玩家物品

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlayerId|str|玩家id|
|InvType|int|[背包类型](http://1.94.129.175:8000/guides/guide-26#%E8%83%8C%E5%8C%85%E7%B1%BB%E5%9E%8B)(0:背包物品栏, 1:副手, 2:主手, 3:盔甲栏)|
|InvPos|int|[槽位坐标](http://1.94.129.175:8000/guides/guide-26#%E7%B1%BB%E5%9E%8B%E6%A7%BD%E4%BD%8D)|

- 返回值<br>
  无

- 备注<br>
  - [物品信息字典](https://mc.163.com/dev/mcmanual/mc-dev/mcguide/20-%E7%8E%A9%E6%B3%95%E5%BC%80%E5%8F%91/10-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5/1-%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5.html#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8#%E7%89%A9%E5%93%81%E4%BF%A1%E6%81%AF%E5%AD%97%E5%85%B8)

- 示例
空
------------
### <a id="前往附件"></a>前往附件