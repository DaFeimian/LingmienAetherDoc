---
title: 源初传说:锻铸传奇
order: 3
toc: content
group:
  title: 副包开发(DLC)
  order: 5
---
# 源初传说:锻铸传奇

<video width="100%" controls><source src="http://1.94.129.175:8000/legend-1.mp4">你的浏览器不支持HTML5视频</video>

## 附件列表

|版本|文件名称|上传时间|大小|下载|
|:-:|:-:|:-:|:-:|:-:|
<!-- |1.0.2|源初传说:锻铸传奇|2024-12-23|61.3M|<a href="https://lingxi.office.163.com/share/#type=file&id=19000019037532&from=QIYE&parentResourceId=19000014296450&spaceId=510845429&ref=546025021">下载</a>| -->

## 接口列表

|接口|<div style="width: 3.5em">端</div>|描述|
|:-:|:-:|:-:|
|[RegisterCustomItemType](#registercustomitemtype)|<font color=red>服务端</font>|注册自定义物品锻造类型|
|[RegisterCustomItemComponentType](#registercustomitemcomponenttype)|<font color=red>服务端</font>|注册物品自定义部件类型|
|[RegisterCustomComponent](#registercustomcomponent)|<font color=red>服务端</font>|注册自定义部件物品|
|[BindForgingItemType](#bindforgingitemtype)|<font color=red>服务端</font>|绑定物品锻造类型|

------------

### <a id="registercustomitemtype"></a>RegisterCustomItemType
<font color=red>服务端</font><br>
- 描述<br>
  注册自定义物品锻造类型，服务端初始化时调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ForgingId|str|锻造类型Id|
|ComponentTypeIdList|list|该锻造类型所使用的部件类型(最多支持6个槽位，即list数目不超过6)|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
无
------------

### <a id="registercustomitemcomponenttype"></a>RegisterCustomItemComponentType
<font color=red>服务端</font><br>
- 描述<br>
  注册物品自定义部件类型，服务端初始化时调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ComponentTypeId|str|部件类型Id|
|Name|str|部件类型中文名称|
|Level|int|该部件类型在多图层物品贴图中显示的层次，对应接口SetItemLayer中的层级。Level为None时不会显示贴图|
|IsNone|bool|原版物品对该部件的内容是否默认为空，该参默认为False|

- 返回值<br>
  无

- 备注<br>
  无

- 示例
无
------------

### <a id="registercustomcomponent"></a>RegisterCustomComponent
<font color=red>服务端</font><br>
- 描述<br>
  注册自定义部件物品，服务端初始化时调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ComponentTypeId|str|部件类型Id|
|ItemName|str|该部件物品的ItemName，例如minecraft:stick|
|Info|str|该部件物品的介绍信息|
|RequireItemData|dict|锻造该部件物品所需的材料数据|
|AttrData|dict|锻造该部件物品所提供的属性数据|

- 返回值<br>
  无

- 备注<br>
  - RequireItemData锻造该部件物品所需的材料数据

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |ItemName|str|该部件物品锻造所需的材料的ItemName，例如minecraft:stick|
    |AuxValue|int|该部件物品锻造所需的材料的特殊值，默认为0|
    |Count|int|锻造该部件物品所需的材料的数量|

  - <Badge type="success">以下内容皆为选填</Badge>AttrData锻造该部件物品所提供的属性数据

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |Damage|int|伤害值|
    |Durability|int|耐久度|
    |Sword|dict|剑属性数据|
    |PickAxe|dict|镐子属性数据|
    |Axe|dict|斧子属性数据|
    |Hoe|dict|锄头属性数据|
    |Shovel|dict|铲子属性数据|
    |Custom|dict|自定义功能属性数据，可用来做宝石特殊效果|

    - <Badge type="success">以下内容皆为选填</Badge>剑、镐、斧、锄、铲属性合称工具属性，以下是这些的属性数据

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |Tier|int|工具等级|
    |Speed|int|工具挖掘速度|

    - Custom自定义功能属性数据，当玩家使用带有自定义功能属性的物品攻击时，会触发所绑定的服务端函数

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |Name|str|自定义功能名称，用于区分|
    |Info|str|该自定义功能的介绍信息|
    |ModName|str|绑定的Mod名称|
    |ServerSystemName|str|绑定的该Mod的服务端系统实例名称|
    |FunctionName|str|绑定的该Mod的服务端系统实例的函数名称(接收一个dict参数)|

    - 绑定的服务端函数接收的参数

    |参数名|数据类型|说明|
    |:-:|:-:|:-:|
    |PlayerId|str|玩家id|
    |EntityId|str|受到攻击的实体id|
    |Name|str|自定义功能名称|

- 示例
无
------------

### <a id="bindforgingitemtype"></a>BindForgingItemType
<font color=red>服务端</font><br>
- 描述<br>
  绑定物品锻造类型，服务端初始化时调用

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|ItemName|str|该部件物品的ItemName，例如minecraft:stick|
|ForgingId|str|锻造类型Id|
|DefaultData|bool|默认部件格式数据，Key为部件类型id，Value为TextureKey|

- 返回值<br>
  无

- 备注<br>
  - DefaultData数据介绍

- 示例
```python
self.Legend.BindForgingItemType('dfm:gaofumuban', 'axe', {
    'hand': 'dfm:gongjubing_mu',
    'head_left': 'dfm:zuofutou_mu',
    'head_right': 'dfm:yougaotou_mu',
    'bind': 'dfm:gongjubandingjie_xian',
})
```


## 示例
### 系统获取
```python
def __init__(self, namespace, systemName):
  ...
  self.Legend = None
  self.AddTimes = 0
  self.GetMainPackSystem()

def GetMainPackSystem(self):
  logging.debug('{0}'.format(self.AddTimes))
  try:
      self.Legend = serverApi.GetSystem('Legend', 'LegendServerSystem')
      if self.AddTimes <= 10:
          if not self.LA:
              compTimer.AddTimer(1.0, self.GetMainPackSystem)
              self.AddTimes += 1
  except Exception as e:
      if self.AddTimes <= 10:
          compTimer.AddTimer(1.0, self.GetMainPackSystem)
          logging.critical('异常：{0}'.format(e))
```
### 注册内容
```python
def Demo(self, *args):
    # 下面的内容是默认携带的，如果再次注册会进行覆盖，并在日志中输出覆盖情况
    self.Legend.RegisterCustomItemType('axe', ['head_left', 'head_right', 'hand', 'bind', 'gemstone'])
    self.Legend.RegisterCustomItemComponentType('head_left', '头部(左)', 1)
    self.Legend.RegisterCustomItemComponentType('head_right', '头部(右)', 2)
    self.Legend.RegisterCustomItemComponentType('hand', '手柄', -2)
    self.Legend.RegisterCustomItemComponentType('bind', '绑定结', 3)
    self.Legend.RegisterCustomItemComponentType('gemstone', '宝石')
    self.Legend.RegisterCustomComponent('bind', 'dfm:gongjubandingjie_julei', '自定义介绍信息', {
        'ItemName': 'minecraft:bone',
        'AuxValue': 0,
        'Count': 2,
    },
    {
        'PickAxe': {
            'Tier': 1
        },
        'Custom': {
            'Name'： '雷暴',
            'Info': '自定义属性介绍信息',
            'ModName': 'Demo',
            'ServerSystemName': 'DemoServerSystem',
            'FunctionName': 'CustomFunction'
        }
    })
```