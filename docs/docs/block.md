---
title: 方块
order: 4
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[GetOneBlockMaxPos](#getoneblockmaxpos)|<font color=red>服务端</font>|根据XZ来获取顶部方块坐标|
|[GetBlockDictByPos](#getblockdictbypos)|<font color=red>服务端</font>|根据坐标获取方块数据|
|[CheckAndSetBlockByPos](#checkandsetblockbypos)|<font color=red>服务端</font>|根据坐标放置方块，区块未加载则无法放置方块，因此需要使用SetBlockPosList|
|[SetChestReward](#setchestreward)|<font color=red>服务端</font>|设置奖励箱内容|
|[BindCustomBlockInteractFunction](#bindcustomblockinteractfunction)|<font color=red>服务端</font>|绑定自定义方块交互事件函数|
|[BindOnStandOnBlockFunction](#bindonstandonblockfunction)|<font color=red>服务端</font>|绑定实体踩上方块事件函数，触发后会持续Tick执行|
|[BindStepOnBlockFunction](#bindsteponblockfunction)|<font color=red>服务端</font>|绑定实体刚刚踩上方块事件函数|

------------

### <a id="getoneblockmaxpos"></a>GetOneBlockMaxPos
<font color=red>服务端</font><br>
- 描述<br>
  根据XZ来获取顶部方块坐标

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PosX|float|X坐标|
|PosZ|float|Z坐标|
|DimensionId|int|实体生成的维度，默认为0，即主世界|
|Times|flointat|计算次数，即精细程度，默认为8，精度为1.2格|

- 返回值<br>
  顶部方块三维坐标 (tuple)

- 备注<br>
  无

- 示例
```python {4}
self.SummonMobFeatureList = []
self.LA = self.GetLASys('密钥')
BossPos = compFeature.LocateNeteaseFeatureRule("custom:heifengshan2_{0}_106aa1e63ed7409d8a05acd27f34bc49".format(591), 0, compPos.GetPos())
UpBossPos = self.LA.GetOneBlockMaxPos(BossPos[0] + 8, BossPos[2] + 8)
Bool = self.CheckChunkAndSummonEntity(UpBossPos, 'dfm:lingxuzi', self.SummonMobFeatureList)
```
------------

### <a id="getblockdictbypos"></a>GetBlockDictByPos
<font color=red>服务端</font><br>
- 描述<br>
  根据坐标获取方块数据

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BlockPos|tuple|方块三维坐标|
|DimensionId|int|方块所在的维度，默认为0，即主世界|

- 返回值<br>
  方块数据 (dict)

  |Key|数据类型|说明|
  |:-:|:-:|:-:|
  |name|str|方块id|
  |aux|int|方块特殊值|

- 备注<br>
  无

- 示例
无
------------

### <a id="checkandsetblockbypos"></a>CheckAndSetBlockByPos
<font color=red>服务端</font><br>
- 描述<br>
  根据坐标放置方块，区块未加载则无法放置方块，因此需要使用SetBlockPosList

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BlockPos|tuple|方块三维坐标|
|BlockName|str|块id，例如"minecraft:diamond_block"|
|BlockAux|int|方块特殊值，默认为0|
|DimensionId|int|方块所在的维度，默认为0，即主世界|
|Type|int|方块防止类型，0：替换，1：销毁，2：保留，默认为0|
|IsLegacy|bool|是否设置为传统的aux，建议设置为True，即aux对应的state不随着版本迭代而变化。默认为False|
|UpdateNeighbors|bool|是否给相邻的方块触发方块更新 (opens new window)以及BlockNeighborChangedServerEvent事件。默认为True触发。若选择不触发可节省约30%的性能消耗。|
|SetBlockPosList|list|生成方块坐标列表，用于防止重复放置方块。如果坐标在此列表内，则不生成，默认为[]|

- 返回值<br>
  是否防止成功 (bool)

- 备注<br>
  无

- 示例
```python
self.LA.CheckAndSetBlockByPos((1000, 200, 1000), 'minecraft:diamond_block')
```
------------

### <a id="setchestreward"></a>SetChestReward
<font color=red>服务端</font><br>
- 描述<br>
  设置奖励箱内容

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BlockPos|tuple|方块三维坐标|
|LootTablePath|str|战利品json文件路径，例如"loot_tables/entities/zombie.json"|
|DimensionId|int|方块所在的维度，默认为0，即主世界|
|IsSpilt|bool|是否随机分类堆叠，默认为True|

- 返回值<br>
  是否设置成功 (bool)

- 备注<br>
  - 仅支持未打开过的箱子，若箱子已经打开过，则设置失败。维度需要已经加载。
  - 如有玩家在相应维度上，则算维度已加载，若完全没玩家在对应维度上，则维度未加载。

- 示例
无
------------

### <a id="bindcustomblockinteractfunction"></a>BindCustomBlockInteractFunction
<font color=red>服务端</font><br>
- 描述<br>
  绑定自定义方块交互事件函数，值得注意的是，键鼠、手柄的交互可以长按将会一直执行事件！

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BlockName|str|自定义方块id，例如"dfm:fengche"|
|FunctionInstance|function|函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()|
|IsAdd|bool|是否是添加绑定，默认为True，则为添加类型反之为删除|
|IsCoolDown|bool|交互是否有微小延迟，防止PC端交互Tick通信造成卡顿，默认为False|

- 返回值<br>
  无

- 备注<br>
  所绑定的函数接收的一个dict参数如下

  |Key|数据类型|说明|
  |:-:|:-:|:-:|
  |PlayerId|str|交互的玩家id|
  |BlockPos|tuple|交互的方块三维坐标|

- 示例
无
------------

### <a id="bindonstandonblockfunction"></a>BindOnStandOnBlockFunction
<font color=red>服务端</font><br>
- 描述<br>
  绑定踩上方块事件函数，触发后会持续Tick执行

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BlockName|str|自定义方块id，例如"dfm:fengche"|
|FunctionInstance|function|函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()样式|
|IsAdd|bool|是否是添加绑定，默认为True，则为添加类型反之为删除|

- 返回值<br>
  无

- 备注<br>
  - 自定义方块需要添加netease:on_stand_on组件，并为True
  - 所绑定的函数接收的一个dict参数如下

  |Key|数据类型|说明|
  |:-:|:-:|:-:|
  |DimensionId|int|踩上方块所在的维度|
  |BlockPos|tuple|踩上方块的三维坐标|
  |EntityId|str|踩上方块的实体id|

- 示例
无
------------

### <a id="bindsteponblockfunction"></a>BindStepOnBlockFunction
<font color=red>服务端</font><br>
- 描述<br>
  绑定刚刚踩上方块事件函数

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|BlockName|str|自定义方块id，例如"dfm:fengche"|
|FunctionInstance|function|函数(一个dict参数)，例如self.CreateMsg，不要填写成self.CreateMsg()|
|IsAdd|bool|是否是添加绑定，默认为True，则为添加类型反之为删除|

- 返回值<br>
  无

- 备注<br>
  - 自定义方块需要添加netease:on_step_on组件，并为True
  - 所绑定的函数接收的一个dict参数如下

  |Key|数据类型|说明|
  |:-:|:-:|:-:|
  |DimensionId|int|踩上方块所在的维度|
  |BlockPos|tuple|踩上方块的三维坐标|
  |EntityId|str|踩上方块的实体id|

- 示例
无
------------
### <a id="前往附件"></a>前往附件