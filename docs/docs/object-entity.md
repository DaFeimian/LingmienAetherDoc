---
title: Entity
order: 1
toc: content
group:
  title: 面向对象&流式接口
  order: 0
---
## <center>对象参数</center>
:::info{title=提示}
Entity相较于传统调用函数可以节省下面参数的填写，具体可参照补全库。
:::


|       参数名        |数据类型|                  说明                  |
|:----------------:|:-:|:------------------------------------:|
|     EntityId     |str|                 实体Id                 |


## <center>用法索引</center>

|                            属性/方法                             |<div style="width: 3.5em">端</div>|       描述      |
|:------------------------------------------------------------:|:-:|:-------------:|
|            [GetEntityPos](/docs/all#getentitypos)            |<font color=red>服务端</font>|     获取实体三维坐标     |
|         [GetAttrMaxValue](/docs/all#getattrmaxvalue)         |<font color=red>服务端</font>|     获取实体属性最大值     |
|            [GetAttrValue](/docs/all#getattrvalue)            |<font color=red>服务端</font>|     获取实体属性当前值     |
|            [SetAttrValue](/docs/all#setattrvalue)            |<font color=red>服务端</font>|     修改实体属性当前值或最大值     |
|         [SetImmuneDamage](/docs/all#setimmuneDamage)         |<font color=red>服务端</font>|     设置实体无敌     |
| [GetEntityNameByEntityId](/docs/all#getentitynamebyentityid) |<font color=red>服务端</font>|     根据实体id获取实体名称     |
|         [SetEntityOnFire](/docs/all#setentityonfire)         |<font color=red>服务端</font>|     获取或设置实体当前着火状态     |
|    [GetEntityChineseName](/docs/all#getentitychinesename)    |<font color=red>服务端</font>|     获取实体中文名称     |
|           [GetEntitySize](/docs/all#getentitysize)           |<font color=red>服务端</font>|     获取实体碰撞箱大小     |
|          [SetEntityScale](/docs/all#setentityscale)          |<font color=red>服务端</font>|     设置或获取实体大小倍率     |
