---
title: 项目介绍
order: 0
toc: content
nav:
  title: 开发文档
  order: 0
---
123123
## 项目介绍
灵免以太是一款专为我的世界中国基岩版组件开发打造的**高效开发引擎**。相较于[ModAPI](https://mc.163.com/dev/apidocs.html)，灵免以太操作更简便，功能更强大。它不仅对 ModAPI 的接口进行了整合和优化，还额外提供了更丰富、更实用的功能接口，为开发者带来卓越的开发体验。

相比其他开发框架引擎或我的世界资源中心的组件，灵免以太具有**更低的性能损耗**。它通过采用冷冻式接口、多线程处理与协程分帧等优化技术，即使在运行大型整合组件时也能保持出色的性能表现。

借助灵免以太强大的接口，即使是**新手开发者**也能**轻松制作**出功能丰富、广受欢迎的大型组件，为商业化创作注入强劲动力，助力作品销量节节攀升。此外，灵免以太支持**联动组件**和**开发者推送**功能，开发者可以轻松将组件推送至用户，方便**用户直接购买**，进一步提升创作者的收益和影响力。

## 灵免以太开发平台
灵免以太开发平台能帮助开发者快速一键完成多项功能：中国版脚本创建、玩家变身创建、枪械创建、联机大厅后台创建、敌对实体创建、友善实体创建等。

![](http://1.94.129.175/uploads/LingmienAether/img/about-4.png)

## 接口轻松使用
通过灵免以太开发平台创建的中国版脚本会自动携带最新版接口补全库系统，编写时会自动提示、注释接口信息说明，使组件开发起来更加容易。
![](http://1.94.129.175/uploads/LingmienAether/img/about-1.png)
![](http://1.94.129.175/uploads/LingmienAether/img/about-2.png)

### 使用示例

:::code-group

  ```python [客户端]
  # -*- coding:utf-8 -*-
import mod.client.extraClientApi as clientApi
import logging
from ClientEventList import EventList
import DemoModScripts.DemoCommon.config as config
import EventApi as Event
from ClientLingmienAether import ClientLingmienAether

ClientSystem = clientApi.GetClientSystemCls()
playerId = clientApi.GetLocalPlayerId()
levelId = clientApi.GetLevelId()
compFactory = clientApi.GetEngineCompFactory()
compTimer = compFactory.CreateGame(levelId)

class ModClientSystem(ClientSystem, ClientLingmienAether):

    def __init__(self, namespace, systemName):
        super(ModClientSystem, self).__init__(namespace, systemName)
        # 省略部分自动生成的代码
        self.LA = self.GetLASys('此处填写你的密钥')
        self.LA.Msg('给玩家发送一条自定义消息')

    def Timer(self):
        pass

    @Event.ClientEvent('UiInitFinished')
    def UiInitFinished(self, *args):
        ModData = {
            'ModName': '一个模组名称',
            'Version': '1.0.0',
            'LogoPath': 'textures/ui/Medium/start/logo2',
            'Content': '一个模组介绍'
        }
        self.LA.UseServerApi('InitLingmienAetherMod', [ModData])
  ```

  ```python [服务端]
  # -*- coding:utf-8 -*-
import logging
import mod.server.extraServerApi as serverApi
from ServerEventList import EventList
import DemoModScripts.DemoCommon.config as config
import EventApi as Event
from ServerLingmienAether import ServerLingmienAether

compFactory = serverApi.GetEngineCompFactory()
ServerSystem = serverApi.GetServerSystemCls()
levelId = serverApi.GetLevelId()
compTimer = serverApi.GetEngineCompFactory().CreateGame(levelId)
compCmd = serverApi.GetEngineCompFactory().CreateCommand(levelId)

class ModServerSystem(ServerSystem, ServerLingmienAether):

    def __init__(self, namespace, systemName):
        super(ModServerSystem, self).__init__(namespace, systemName)
        # 省略部分自动生成的代码
        self.LA = self.GetLASys('此处填写你的密钥')


    def Timer(self):
        pass

    @Event.ServerEvent('AddServerPlayerEvent')
    def AddServerPlayer(self, args):
        PlayerId = args['id']
        # 根据事件返回的玩家id获取玩家名称、玩家坐标、玩家维度，用于填写SummonEntityByName接口参数
        PlayerName, PlayerPos, PlayerDim = self.LA.GetPlayerName(PlayerId), self.LA.GetEntityPos(PlayerId), self.LA.GetPlayerDimension(PlayerId)
        # 给玩家发送一条欢迎消息，并附带上玩家名字
        self.LA.ServerMsg(PlayerId, '欢迎{0}加入游戏，您将获得tnt一个'.format(PlayerName))
        # 给玩家脚边生成一个TNT
        self.LA.SummonEntityByName('minecraft:tnt', PlayerPos, DimensionId=PlayerDim)
  ```

:::

## 强大集成功能

### `5分钟`玩家YSM变身
手动编写json或使用灵免以太开发平台一键生成自定义玩家渲染配置文件。
> 这里记得放上gif开发过程图

### `30分钟`变身技能角色
> 这里记得放上gif效果图

### `15分钟`联机大厅内购
> 这里记得放上gif效果图

### `15分钟`多招式Boss生物
> 这里记得放上gif效果图

### `30分钟`变身技能角色
> 这里记得放上gif效果图

### `5分钟`对话NPC
> 这里记得放上gif效果图

### `5分钟`功能表单
> 这里记得放上gif效果图

### `10分钟`模块化物品
> 这里记得放上gif效果图

### `1分钟`实体消息UI
> 这里记得放上gif效果图

### `1分钟`提示标题UI
> 这里记得放上gif效果图

## 游戏内嵌调试工具
可自定义拓展，游戏内嵌的调试工具，拥有建筑导入导出、特效测试等功能。
![](http://1.94.129.175:8000/static/debug-0.ca34396f.png)
> 这里记得放上gif效果图

## 灵免以太AI
开发者还可以使用训练好的AI大模型来帮助你编写灵免以太脚本
![](http://1.94.129.175/uploads/LingmienAether/img/about-3.png)
