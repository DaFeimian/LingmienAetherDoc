---
title: 建筑
order: 12
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[GetCustomFeatureRulesPos](#getcustomfeaturerulespos)|<font color=red>服务端</font>|获取特征规则坐标|
|[GetCustomFeatureRulesByPos](#getcustomfeaturerulesbypos)|<font color=red>服务端</font>|根据当前坐标获取离自己最近的多结构自定义特征Id|
|[PlaceBuildingByJsonId](#placebuildingbyjsonid)|<font color=blue>客户端</font>|根据配置组件放置建筑|
|[PausePlaceBuilding](#pauseplacebuilding)|<font color=blue>客户端</font>|暂停建筑建造|
|[ContinuePlaceBuilding](#continueplacebuilding)|<font color=blue>客户端</font>|继续建筑建造|
|[OpenPlaceBuildingList](#openplacebuildinglist)|<font color=blue>客户端</font>|打开建筑建造列表管理界面|

------------

### <a id="getcustomfeaturerulespos"></a>GetCustomFeatureRulesPos
<font color=red>服务端</font><br>
- 描述<br>
  获取特征规则坐标

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|CustomFeatureRuleId|str|自定义特征规则Id|
|DimensionId|int|所在的维度，默认为0，即主世界|

- 返回值<br>
  该特征规则坐标 (tuple)

- 备注<br>
无

- 示例
空

------------

### <a id="getcustomfeaturerulesbypos"></a>GetCustomFeatureRulesByPos
<font color=red>服务端</font><br>
- 描述<br>
  根据当前坐标获取离自己最近的多结构自定义特征Id

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Pos|tuple|三维坐标|
|CustomFeatureRuleId|str|任一多结构自定义特征规则Id格式为`{Feature}_{Num}_{UUID}`|
|DimensionId|int|所在的维度，默认为0，即主世界|

- 返回值<br>
  该特征规则Id (str)

- 备注<br>
无

- 示例
空
------------

### <a id="placebuildingbyjsonid"></a>PlaceBuildingByJsonId
<font color=blue>客户端</font><br>
- 描述<br>
  根据配置组件放置建筑

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|StartPos|tuple|起始坐标|
|JsonId|str|配置组件JsonId|
|Timer|float|多少秒放置一个方块，默认为0|
|DimensionId|int|所在的维度，默认为0，即主世界|
|ItemDataList|list|【废弃】已有物品数据信息列表，如果填写，则放置建筑依赖材料，需要通过返回函数来删除对应物品，默认为None|
|ModName|str|函数所在脚本模组名称|
|ServerSystemName|str|函数所在脚本模组服务端名称|
|CallBackFunctionName|str|完成后的服务端返回函数，用于删除库存，默认为None。返回一个dict参数(key包含：PlayerId, PlaceBuildingId, JsonId, StartPos, DimensionId, BuildingData)|

- 返回值<br>
  建造数据存档Id(PlaceBuildingId)，暂停后通过GetModRenderAttrByKey接口获取该玩家 建造数据存档Id的存储值即可获得实时情况 (str)

- 备注<br>
无

- 示例
空
------------

### <a id="pauseplacebuilding"></a>PausePlaceBuilding
<font color=blue>客户端</font><br>
- 描述<br>
  暂停建筑建造

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlaceBuildingId|str|PlaceBuildingByJsonId返回的建造数据存档Id|

- 返回值<br>
  无

- 备注<br>
无

- 示例
空
------------

### <a id="continueplacebuilding"></a>ContinuePlaceBuilding
<font color=blue>客户端</font><br>
- 描述<br>
  继续建筑建造

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|PlaceBuildingId|str|PlaceBuildingByJsonId返回的建造数据存档Id|

- 返回值<br>
  无

- 备注<br>
无

- 示例
空
------------

### <a id="openplacebuildinglist"></a>OpenPlaceBuildingList
<font color=blue>客户端</font><br>
- 描述<br>
  打开建筑建造列表管理界面

- 参数<br>
无

- 返回值<br>
  无

- 备注<br>
无

- 示例
空
