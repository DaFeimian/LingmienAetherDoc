---
title: 行为
order: 14
toc: content
group:
  title: LAAPI
  order: 0.5
---
## <center>索引</center>
- [前往附件](#前往附件)

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[GetAndAttackRadiusEntities](#getandattackradiusentities)|<font color=red>服务端</font>|获取实体Id周围的实体列表且是否直接执行攻击|

------------

### <a id="getandattackradiusentities"></a>GetAndAttackRadiusEntities
<font color=red>服务端</font><br>
- 描述<br>
  获取实体Id周围的实体列表且是否直接执行攻击

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|AttackId|str|攻击者实体Id|
|Radius|float|攻击范围|
|IsCanSee|bool|是否需要可视才能攻击|
|IsAttack|bool|是否直接执行攻击，默认不执行攻击|
|Damage|int|伤害，默认为0|
|BetweenAngle|float|攻击角度范围，默认为0.0|

- 返回值<br>
  处理完毕后的实体id字典(dict)

- 备注<br>
  无

- 示例
空
------------
### <a id="前往附件"></a>前往附件