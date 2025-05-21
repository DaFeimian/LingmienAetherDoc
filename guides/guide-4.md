---
title: 游戏设定配置
order: 4
group:
  title: 开发指南
  order: 3
---
## 通用配置
下面是配置文件说明文档。

配置文件统一放在mod behavior文件夹的config文件夹中，即config与entities同级目录。


### 配置文件

#### netease_require
:::warning{title=警告}
写了`netease_require`文件的Mod默认在没写`netease_require`的Mod后面加载<br>
都写了`netease_require`文件的Mod按照依赖顺序进行加载执行
:::
##### 描述

管理mod加载依赖顺序

##### 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|modName|str|mod命名，该命名字段只用于加载依赖|
|modRequire|list|依赖用到的mod列表|

##### 路径

behavior/config/netease_require.json

##### 文件名

netease_require.json

##### 示例

```json
{
        // 表示SampleMod依赖RequireMod，因此加载的时候会先加载RequireMod这个mod
        "modName":"SampleMod",
        "modRequire":[
                "RequireMod"
        ]
}
```

## 服务端配置
服务端配置文件定义的配置如下


### 配置文件

#### banned_items
##### 描述

禁用物品配置文件

##### 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|banned_items|list|禁用物品的identifier|

##### 路径

behavior/config/banned_items.json

##### 文件名

banned_items.json

##### 示例

```json
{
        "banned_items": ["minecraft:egg", "minecraft:snowball"]
}
```