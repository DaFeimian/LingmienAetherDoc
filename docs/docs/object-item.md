---
title: Item
order: 4
toc: content
group:
  title: 面向对象&流式接口
  order: 0
---
## <center>对象参数</center>
:::info{title=提示}
Item相较于传统调用函数可以节省下面参数的填写，具体可参照补全库。
:::


|       参数名        | 数据类型  |          说明           |
|:----------------:|:-----:|:---------------------:|
|     ItemName     | str | 物品名称，如minecraft:stick |


## <center>用法索引</center>

|                                 属性/方法                                  |<div style="width: 3.5em">端</div>|       描述      |
|:----------------------------------------------------------------------:|:-:|:-------------:|
| [BindPlayerOnHandItemFunction](/docs/all#bindplayeronhanditemfunction) |<font color=red>服务端</font>|     绑定玩家手持某物品的事件函数，首次需要切换物品后才会触发     |
|               [CreateLootItem](/docs/all#createlootitem)               |<font color=red>服务端</font>|     生成掉落物     |