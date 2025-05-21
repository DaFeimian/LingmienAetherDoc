---
title: Block
order: 3
toc: content
group:
  title: 面向对象&流式接口
  order: 0
---
## <center>对象参数</center>
:::info{title=提示}
Block相较于传统调用函数可以节省下面参数的填写，具体可参照补全库。
:::


|       参数名        | 数据类型  |                  说明                  |
|:----------------:|:-----:|:------------------------------------:|
|     BlockPos     | tuple |                 方块三维坐标                 |


## <center>用法索引</center>

|                          属性/方法                           |<div style="width: 3.5em">端</div>|       描述      |
|:--------------------------------------------------------:|:-:|:-------------:|
|     [GetBlockDictByPos](/docs/all#getblockdictbypos)     |<font color=red>服务端</font>|     根据坐标获取方块数据     |
| [CheckAndSetBlockByPos](/docs/all#checkandsetblockbypos) |<font color=red>服务端</font>|     根据坐标放置方块，区块未加载则无法放置方块，因此需要使用SetBlockPosList     |
|        [SetChestReward](/docs/all#setchestreward)        |<font color=red>服务端</font>|     设置奖励箱内容     |
