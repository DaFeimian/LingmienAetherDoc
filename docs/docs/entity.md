---
title: 实体
order: 5
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[RegisterEntityAbility](#registerentityability)|<font color=red>服务端</font>|注册自定义功能实体|
|[SummonEntityByName](#summonentitybyname)|<font color=red>服务端</font>|根据实体名生成实体|
|[GetEntityPos](#getentitypos)|<font color=orange>双端</font>|获取实体三维坐标|
|[GetAttrMaxValue](#getattrmaxvalue)|<font color=orange>双端</font>|获取实体属性最大值|
|[GetAttrValue](#getattrvalue)|<font color=orange>双端</font>|获取实体属性当前值|
|[SetAttrValue](#setattrvalue)|<font color=red>服务端</font>|修改实体属性当前值或最大值|
|[SetImmuneDamage](#setimmunedamage)|<font color=red>服务端</font>|设置实体无敌|
|[CheckChunkAndSummonEntity](#checkchunkandsummonentity)|<font color=red>服务端</font>|检测区块是否加载并生成实体|
|[GetRecentlyTargetId](#getrecentlytargetid)|<font color=orange>双端</font>|获取某实体(客户端为本玩家)最近的实体Id|
|[GetEntityNameByEntityId](#getentitynamebyentityid)|<font color=orange>双端</font>|根据实体id获取实体名称|
|[SetEntityOnFire](#setentityonfire)|<font color=red>服务端</font>|获取或设置实体当前着火状态|
|[GetEntityChineseName](#getentitychinesename)|<font color=orange>双端</font>|获取实体中文名称|
|[GetEntitySize](#getentitysize)|<font color=orange>双端</font>|获取实体碰撞箱大小|
|[SetEntityScale](#setentityscale)|<font color=red>服务端</font>|设置或获取实体大小倍率|
|[GetRadiusEntities](#getradiusentities)|<font color=orange>双端</font>|获取实体Id的周围的实体列表|

------------

### <a id="registerentityability"></a>RegisterEntityAbility
<font color=red>服务端</font><br>
- 描述<br>
  注册自定义功能实体，需要在服务端初始化时调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityName|str|实体IdStr名称，例如"minecraft:zombie"|
|JsonId|str|配置组件JsonId|

- 返回值<br>
  生成的实体Id (str)

- 备注<br>
  无

- 示例
空
------------

### <a id="summonentitybyname"></a>SummonEntityByName
<font color=red>服务端</font><br>
- 描述<br>
  根据实体名生成实体

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityName|str|实体IdStr名称，例如"minecraft:zombie"|
|EntityPos|tuple|实体生成的三维坐标|
|EntityRot|tuple|实体生成的二维朝向默认为(0, 0)|
|DimensionId|int|实体生成的维度，默认为0，即主世界|

- 返回值<br>
  生成的实体Id (str)

- 备注<br>
  无

- 示例
空
------------

### <a id="getentitypos"></a>GetEntityPos
<font color=orange>双端</font><br>
- 描述<br>
  获取实体三维坐标

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|

- 返回值<br>
  实体三维坐标(tuple)

- 备注<br>
  无

- 示例
空
------------

### <a id="getattrmaxvalue"></a>GetAttrMaxValue
<font color=orange>双端</font><br>
- 描述<br>
  获取实体属性最大值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|
|AttrKey|int|实体属性Key|

- 返回值<br>
  该属性最大值（float）

- 备注<br>
  实体属性Key：
```python
class AttrType(object):
	HEALTH = 0              # 生命值, 原版的值范围为[0,20]
	SPEED = 1               # 移速, 原版的值范围为[0,+∞]
	DAMAGE = 2              # 攻击力, 原版的值范围为[1,1]
	UNDERWATER_SPEED = 3    # 水里的移速, 原版的值范围为[0,+∞]
	HUNGER = 4              # 饥饿值, 原版的值范围为[0,20]
	SATURATION = 5          # 饱和值, 原版的值范围为[0,20]
	ABSORPTION = 6          # 伤害吸收生命值，详见备注, 原版的值范围为[0,16]
	LAVA_SPEED = 7          # 岩浆里的移速, 原版的值范围为[0,+∞]
	LUCK = 8                # 幸运值，原版的值范围为[-1024,1024]
	FOLLOW_RANGE = 9		# 跟随方块数(一般指怪的仇恨范围), 原版值范围为[1,2024]，默认值为16
	KNOCKBACK_RESISTANCE = 10	# 击退抵抗，原版值范围为[1,+∞]，默认最大值为1
	JUMP_STRENGTH = 11		# 跳跃力(指骑乘后跳跃可跳跃的高度)，原版值范围为[0,+∞]
	ARMOR = 12				# 护甲值，取决于身上穿戴的护甲总防御量
```

- 示例
空
------------

### <a id="getattrvalue"></a>GetAttrValue
<font color=orange>双端</font><br>
- 描述<br>
  获取实体属性当前值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|
|AttrKey|int|实体属性Key|

- 返回值<br>
  该属性当前值（float）

- 备注<br>
  实体属性Key：
```python
class AttrType(object):
	HEALTH = 0              # 生命值, 原版的值范围为[0,20]
	SPEED = 1               # 移速, 原版的值范围为[0,+∞]
	DAMAGE = 2              # 攻击力, 原版的值范围为[1,1]
	UNDERWATER_SPEED = 3    # 水里的移速, 原版的值范围为[0,+∞]
	HUNGER = 4              # 饥饿值, 原版的值范围为[0,20]
	SATURATION = 5          # 饱和值, 原版的值范围为[0,20]
	ABSORPTION = 6          # 伤害吸收生命值，详见备注, 原版的值范围为[0,16]
	LAVA_SPEED = 7          # 岩浆里的移速, 原版的值范围为[0,+∞]
	LUCK = 8                # 幸运值，原版的值范围为[-1024,1024]
	FOLLOW_RANGE = 9		# 跟随方块数(一般指怪的仇恨范围), 原版值范围为[1,2024]，默认值为16
	KNOCKBACK_RESISTANCE = 10	# 击退抵抗，原版值范围为[1,+∞]，默认最大值为1
	JUMP_STRENGTH = 11		# 跳跃力(指骑乘后跳跃可跳跃的高度)，原版值范围为[0,+∞]
	ARMOR = 12				# 护甲值，取决于身上穿戴的护甲总防御量
```

- 示例
空
------------

### <a id="setattrvalue"></a>SetAttrValue
<font color=red>服务端</font><br>
- 描述<br>
  修改实体属性当前值或最大值

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|
|AttrKey|int|实体属性Key|
|NewValue|float|该属性新的当前值，默认为None，不执行|
|MaxValue|float|该属性新的最大值，默认为None，不执行|

- 返回值<br>
  无

- 备注<br>
  实体属性Key：
```python
class AttrType(object):
	HEALTH = 0              # 生命值, 原版的值范围为[0,20]
	SPEED = 1               # 移速, 原版的值范围为[0,+∞]
	DAMAGE = 2              # 攻击力, 原版的值范围为[1,1]
	UNDERWATER_SPEED = 3    # 水里的移速, 原版的值范围为[0,+∞]
	HUNGER = 4              # 饥饿值, 原版的值范围为[0,20]
	SATURATION = 5          # 饱和值, 原版的值范围为[0,20]
	ABSORPTION = 6          # 伤害吸收生命值，详见备注, 原版的值范围为[0,16]
	LAVA_SPEED = 7          # 岩浆里的移速, 原版的值范围为[0,+∞]
	LUCK = 8                # 幸运值，原版的值范围为[-1024,1024]
	FOLLOW_RANGE = 9		# 跟随方块数(一般指怪的仇恨范围), 原版值范围为[1,2024]，默认值为16
	KNOCKBACK_RESISTANCE = 10	# 击退抵抗，原版值范围为[1,+∞]，默认最大值为1
	JUMP_STRENGTH = 11		# 跳跃力(指骑乘后跳跃可跳跃的高度)，原版值范围为[0,+∞]
	ARMOR = 12				# 护甲值，取决于身上穿戴的护甲总防御量
```

- 示例
空
------------

### <a id="setimmunedamage"></a>SetImmuneDamage
<font color=red>服务端</font><br>
- 描述<br>
  设置实体无敌

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|
|Bool|bool|是否无敌|
|Timer|float|结束无敌时长，默认为None|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
```python {3}
self.LA = self.GetLASys('密钥')
# 5.5秒后结束无敌
self.LA.UseServerApi('SetImmuneDamage', [playerId, True, 5.5])
```
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

### <a id="checkchunkandsummonentity"></a>CheckChunkAndSummonEntity
<font color=red>服务端</font><br>
- 描述<br>
  检测区块是否加载并生成实体

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Pos|tuple|需要生成实体的三维坐标|
|EntityStr|str|实体id名称，如"minecraft:zombie"|
|SummonMobPosList|list|生成实体坐标列表，用于防止重复生成生物。如果坐标在此列表内，则不生成，默认为[]|

- 返回值<br>
  是否生成成功 (bool)

- 备注<br>
  无

- 示例
```python {5}
self.SummonMobFeatureList = []
self.LA = self.GetLASys('密钥')
BossPos = compFeature.LocateNeteaseFeatureRule("custom:heifengshan2_{0}_106aa1e63ed7409d8a05acd27f34bc49".format(591), 0, compPos.GetPos())
UpBossPos = self.LA.GetOneBlockMaxPos(BossPos[0] + 8, BossPos[2] + 8)
Bool = self.CheckChunkAndSummonEntity(UpBossPos, 'dfm:lingxuzi', self.SummonMobFeatureList)
```
------------

### <a id="getrecentlytargetid"></a>GetRecentlyTargetId
<font color=orange>双端</font><br>
- 描述<br>
  获取某实体(客户端为本玩家)最近的实体Id

- 服务端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|
|Radius|int|检索距离|

- 客户端参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|Radius|int|检索距离|

- 返回值<br>
  最近的实体Id，没有则返回None (str)

- 备注<br>
  无

- 示例
```python {2}
self.LA = self.GetLASys('密钥')
EntityId = self.TargetEntityId if self.TargetEntityId else self.LA.GetRecentlyTargetId(PlayerId, 16)
```
------------

### <a id="getentitynamebyentityid"></a>GetEntityNameByEntityId
<font color=orange>双端</font><br>
- 描述<br>
  根据实体id获取实体名称

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|

- 返回值<br>
  实体名称，如"minecraft:zombie" (str)

- 备注<br>
  无

- 示例
无
------------

### <a id="setentityonfire"></a>SetEntityOnFire
<font color=red>服务端</font><br>
- 描述<br>
  获取或设置实体当前着火状态

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体Id|
|Timer|int|着火时间，默认为0，则不着火，返回获取实体当前着火状态|
|Damage|int|着火伤害，默认为0，则不着火，返回获取实体当前着火状态|

- 返回值<br>
  实体是否着火 (bool)

- 备注<br>
  无

- 示例
无
------------

### <a id="getentitychinesename"></a>GetEntityChineseName
<font color=orange>双端</font><br>
- 描述<br>
  获取实体中文名称

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityName|str|实体IdStr名称，例如"minecraft:zombie"|

- 返回值<br>
  实体名称 (str)

- 备注<br>
  无

- 示例
无
------------

### <a id="getentitysize"></a>GetEntitySize
<font color=orange>双端</font><br>
- 描述<br>
  获取实体碰撞箱大小

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体id|

- 返回值<br>
  宽、高的二维元组 (tuple)

- 备注<br>
  无

- 示例
无
------------

### <a id="seteneityscale"></a>SetEntityScale
<font color=red>服务端</font><br>
- 描述<br>
  设置或获取实体大小倍率

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体id|
|Scale|float|实体大小倍率，默认为None|

- 返回值<br>
  该实体大小倍率(优先返回修改后) (float)

- 备注<br>
  无

- 示例
无
------------

### <a id="getradiusentities"></a>GetRadiusEntities
<font color=orange>双端</font><br>
- 描述<br>
  获取实体Id的周围的实体列表

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|EntityId|str|实体id|
|Radius|int|范围|
|BetweenAngle|float|攻击角度范围，默认为360.0|
|IsCanSee|bool|是否需要可视，默认为True|
|IsRemoveMe|bool|输出结果排除自己，默认为True|
|EntityType|str|默认为None则搜索所有实体，示例：ItemEntity([填写参考](https://mc.163.com/dev/mcmanual/mc-dev/mcdocs/1-ModAPI/%E6%9E%9A%E4%B8%BE%E5%80%BC/EntityType.html))|

- 返回值<br>
  符合条件的周围实体列表 (list)

- 备注<br>
  无

- 示例
无
------------
### <a id="前往附件"></a>前往附件