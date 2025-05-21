---
title: 10分钟开发枪械
order: 3
toc: content
group:
  title: 其他
  order: 6
---
:::info{title=下载提示}
本处不提供下载链接，该内容已整合至自动化开发程序
:::

# ShootApi
原生打造的设计需求Api，让他用起来像json一样容易！
## 第一步 安装
1. 把***必要文件***放在对应BP、RP目录中双击安装
2. 将`ShootApi.exe`放在你的脚本根目录下双击

### Tips
武器规范进行3D打组后，`(0, 0, 0)`坐标对应玩家手持坐标，正向对应玩家`正前方`。

更多规范及说明详见文档尾部！

## 第二步 Import Api
### 1.服务端脚本文件
在文件首部合适处添加如下模块，当然你可以适当的修改它以更好的使用！

***注意：导入模块需要注意修改路径***
```python
from DaFeiMianShootScripts.dfmGun import GunConf
from GunApi.GunRun import GunRunApi
from GunApi.GunRun import GunApiEventList
AllGunList = GunConf.GunList
```

在服务端类的`__init__`下添加如下代码
```python
        for Event in GunApiEventList:
            func = getattr(GunRunApi, Event['Function'])
            if Event['Type'] == 'Server':
                self.ListenForEvent(serverApi.GetEngineNamespace(), serverApi.GetEngineSystemName(), Event['EventName'], GunRunApi(GunConf.ModName, GunConf.ClientSystemName, GunConf.ServerSystemName, GunConf.ScriptsName), func)
            else:
                self.ListenForEvent(GunConf.ModName, GunConf.ClientSystemName, Event['EventName'], GunRunApi(GunConf.ModName, GunConf.ClientSystemName, GunConf.ServerSystemName, GunConf.ScriptsName), func)
```
如果还是不懂，可以看看`Demo`的Scripts
### 2.客户端脚本文件
在文件首部合适处添加如下模块，当然你可以适当的修改它以更好的使用！

***注意：导入模块需要注意修改路径***
```python
from GunApi.GunRun import GunRunApi
from GunApi.GunRun import GunApiEventList
from DaFeiMianShootScripts.dfmGun import GunConf
AllGunList = GunConf.GunList
```

在客户端类的`__init__`下添加如下代码
```python
        for Event in GunApiEventList:
            func = getattr(GunRunApi, Event['Function'])
            if Event['Type'] == 'Client':
                self.ListenForEvent(clientApi.GetEngineNamespace(), clientApi.GetEngineSystemName(), Event['EventName'], GunRunApi(GunConf.ModName, GunConf.ClientSystemName, GunConf.ServerSystemName, GunConf.ScriptsName), func)
            else:
                self.ListenForEvent(GunConf.ModName, GunConf.ServerSystemName, Event['EventName'], GunRunApi(GunConf.ModName, GunConf.ClientSystemName, GunConf.ServerSystemName, GunConf.ScriptsName), func)
```
如果还是不懂，可以看看`Demo`的Scripts

## 第三步 配置文件
对应配置好`dfmGun`文件夹下的`GunConf.py`就可以！

```python
# -*- coding:utf-8 -*-
# ListVar
# 注意注意注意！！！！！！！！！
# 如果你的客户端和服务端脚本文件不是在ModClient或ModServer下！
# 需要将这两个文件的import模块添加对应的ModClient或ModServer路径！
# 例如客户端中 from GunApi.GunRun import GunApiEventList
# 修改为 from ModClient.GunApi.GunRun import GunApiEventList
# 其他import路径也要注意！
# 注意注意注意！！！！！！！！！
# Molang说明：
# query.mod.dfm_gun_shoot   # 射击函数
# query.mod.dfm_gun_reload  # 换弹函数
# query.mod.dfm_cameramotion_rot  # 镜头跟随晃动函数
# 枪械模型的骨骼架构要放在gun之下

ModName = 'Shoot'  # 模组脚本名称
ClientSystemName = 'ShootClientSystem'  # 客户端类名
ServerSystemName = 'ShootServerSystem'  # 服务端类名
ScriptsName = 'DaFeiMianShootScripts'  # 脚本文件夹名称
GunList = [
    {
        # 枪械名称
        'GunName': 'cv153',
        # 枪械物品ID
        'GunId': 'dfm:cv153',
        # Lonel Shader Arg, 要求独一无二
        'GunShaderId': 1,
        # Lonel Shader Arg, 表示不同状态的光效类型
        'GunDefaultShaderType': 0,
        'GunReloadShaderType': 0,
        'GunShootShaderType': 0,
        'GunCheckShaderType': 0,
        # 介绍
        'Introduction': 'cv153是2132年由主世界人类武器研发委员会\n设计的一种中型战斗武器，\n他的各方面性能优良，无明显短板，\n是战斗中最常见的战斗武器之一！',
        # 威力范围
        'Damage': [4, 8],
        # 后坐力，同时也和射速相关
        'Recoil': 0.2,
        # 恢复后坐力
        'ResetRecoil': 0.5,
        # 弹药数量
        'Bullets': 35,
        # 射速（单位：每分钟发射数量）
        'ShootSpeed': 600,
        # 技能释放所需能量，若为0，则视为无技能
        'Energy': 0,
        # 是否造成击退效果
        'IsKnocked': False,
        # 发射特效
        'Sfx': '',
        # 特效类型
        'SfxType': '',
        # 发射音效名
        'ShootSound': 'dfm_cv153',
        # 技能音效名
        'SkillSound': '',
        # 换弹音效名
        'ReloadSound': 'dfm_cv153_reload',
        # 换弹音效播放延迟，以匹配动画
        'ReloadSoundTimer': 1,
        # 换弹时长
        'ReloadTimer': 2.0,
        # 检视时长
        'CheckTimer': 0,
        # 备注
        'notes': ''
    },
    ...
]

```

## 第四步 自动化创建对应枪械`方块实体`
  使用[大肥免自动化开发](http://139.159.183.64/attach_files/dafeimian_api/688)`的`枪械方块实体(ShootApi)，输入对应枪械id，如`dfm:cv153`则填写`cv153`，随后选择双包，点击开始即可！

  
![image](https://github.com/DaFeimian/ShootApi/assets/135980226/31333ddb-8379-4e5f-b286-097253fdb295)

## 参数及函数说明

- query.mod.dfm_gun_shoot   是否正在射击  // 1 for Ture, 0 for False.
- query.mod.dfm_gun_reload  是否正在换弹  // 1 for Ture, 0 for False.
- query.mod.dfm_cameramotion_rot  镜头跟随晃动函数  // float.
- query.mod.dfm_gun_shoot_ready  射击前函数(推荐使用射速较低或需充能形武器)  // 1 for Ture, 0 for False.
- query.mod.dfm_gun_check  是否正在检视  // 1 for Ture, 0 for False.
- query.mod.dfm_gun_run  是否在奔跑  // 1 for Ture, 0 for False.
- query.mod.dfm_gun_item  是否切枪  // 1 for Ture, 0 for False.
- query.mod.dfm_gun_aim  是否在瞄准  // 1 for Ture, 0 for False.

下列当函数值为`-1`时，表示没有拿着枪：

- query.mod.lonel_gun_shaderid  小羊shader的枪械id，独一无二，不可重复
- query.mod.lonel_gun_default_shader_type  玩家当前手持枪械的默认shader类型  // 0 for None, 1 for ?...
- query.mod.lonel_gun_reload_shader_type  玩家当前手持枪械的换弹shader类型  // 0 for None, 1 for ?...
- query.mod.lonel_gun_shoot_shader_type  玩家当前手持枪械的射击shader类型  // 0 for None, 1 for ?...
- query.mod.lonel_gun_check_shader_type  玩家当前手持枪械的检视shader类型  // 0 for None, 1 for ?...
- query.mod.dfm_gun_bullets_percent  玩家当前手持枪械的剩余子弹百分比，在换弹开始瞬间，值为1  // float, 0 ~ 1.
- query.mod.dfm_gun_shoot_speed  玩家当前手持枪械的射速(单位：发/每分钟)  // int.
- query.mod.dfm_gun_reload_time  玩家当前手持枪械所需的换弹时间(单位：秒)  // float.
- query.mod.dfm_gun_recoil  玩家当前手持枪械的后坐力  // float.

|名称|key|type|介绍|
|:-:|:-:|:-:|:-:|
|浮动系数|FloatingCoefficient|float|系数越大，晃动幅度越小|
|重置系数|ResetCoefficient|float|系数越大，恢复正常视角越快|
|线性系数|LinearCoefficient|float|取值范围：0~1 `1`表示完全线性，数字越小，晃动幅度越小|
|趋近限度|AppressLimit|float|取值范围：0~1 当非线性运动时，趋近限度将限制最小的趋近斜率|
|跟随限度|MotionLimit|float|跟随限度。单位：角度|
|后坐力|Recoil|float|数值越大，枪械抖动幅度越大，且实际效果也与射速快慢有关|
|恢复后坐力|Recoil|float|数值越大，枪械恢复稳定越快|
|速度限度|FloatingSppedLimit|float|速度限度，防止因过快的晃动屏幕而高速度使动画产生撕裂感|

### 方块破坏列表
在`ModClient/GunApi/GunControl.py`中的`DestroyBlockList`：

```python
    def ShootFire(self, PlayerId, GunDict):
        ...
            DestroyBlockList = ['minecraft:double_plant', 'minecraft:tallgrass', 'minecraft:glass', 'minecraft:glass_pane', 'minecraft:stained_glass', 'minecraft:stained_glass_pane', 'minecraft:red_flower', 'minecraft:yellow_flower', 'minecraft:leaves',
                                'minecraft:seagrass', 'minecraft:leaves2', 'minecraft:vine', 'minecraft:snow_layer', 'minecraft:tnt']
        ...
```

### 引燃TNT控制
在`ModServer/GunApi/GunRun.py`中`DestroyBlock`函数内调整：
```python
    def DestroyBlock(self, args):
        ...
        if BlockName == 'minecraft:tnt':
            ...
            compCmd.SetCommand('/summon minecraft:tnt {0} {1} {2}'.format(TargetData['x'], TargetData['y'], TargetData['z']), PlayerId)
        else:
            ...
```

## 副包开发说明

### 主包脚本文件
在第二步的基础上，给服务端类***和***客户端类额外定义一个函数：
```python
    def SetGunConf(self, Type, Value):
        """设置枪械数据，用于副包调用
        :param Type: 类型，可填append, remove, None，当为None时，直接返回值
        :param Value: 值
        :return: 修改后的AllGunList
        """
        global AllGunList
        if Value not in AllGunList and Type == 'append':
            AllGunList.append(Value)
        if Type == 'remove':
            AllGunList.remove(Value)
        return AllGunList
```

### 副包脚本文件
可自行使用`clientApi.GetSystem(nameSpace, systemName)`来制作未加主包的提示，`nameSpace`和`systemName`参数填写规范可查询网易官方`MODAPI`。

#### 服务端文件
给服务端类额外定义一个函数，这里的`Shoot`和`ShootServerSystem`便是主包的`nameSpace`和服务端`systemName`：
```python
    def LoadAfter(self, args):
        MainPackServer = serverApi.GetSystem("Shoot", "ShootServerSystem")
        try:
            for GunDict in GunConf.GunList:
                MainPackServer.SetGunConf('append', GunDict)
                print '服务端新增副包枪械：', GunDict['GunName']
        except:
            pass
```
然后服务端监听任意服务端加载完毕的事件来调用该函数，考虑到主副包服务端加载的先后顺序，也可在服务端`init`中添加定时器`AddTimer`调用该函数。

#### 客户端文件
给服务端类额外定义一个函数，这里的`Shoot`和`ShootClientSystem`便是主包的`nameSpace`和客户端`systemName`：
```python
    def LoadAfter(self):
        MainPackClient = clientApi.GetSystem("Shoot", "ShootClientSystem")
        try:
            for GunDict in GunConf.GunList:
                MainPackClient.SetGunConf('append', GunDict)
                print '客户端新增副包枪械：', GunDict['GunName']
        except:
            pass
```
然后服务端监听任意服务端加载完毕的事件来调用该函数，考虑到主副包服务端加载的先后顺序，也可在服务端`init`中添加定时器`AddTimer`调用该函数。

### 枪械方块实体
见主包操作第四步骤！

## 额外便携开发说明

### 强制动画命名规范

|名称|命名规范|命名示例|
|:-:|:-:|:-:|
|默认动画|animation.{name}.idle|animation.cv153.idle|
|奔跑动画|animation.{name}.sprint_idle|animation.cv153.sprint_idle|
|瞄准动画|animation.{name}.aim_idle|animation.cv153.aim_idle|
|射击动画|animation.{name}.shoot|animation.cv153.shoot|
|换弹动画|animation.{name}.reload|animation.cv153.reload|
|检视动画|animation.{name}.check|animation.cv153.check|

### 非强制性模型、纹理命名规范

如果不打算使用肥免的`AutoDev`自动化开发工具，则模型、纹理命名规范无需按照下表命名

|名称|命名规范|命名示例|
|:-:|:-:|:-:|
|模型|geometry.{name}|geometry.cv153|
|纹理|../textures/entity/{name}|../textures/entity/cv153|

### 新增手臂便携开发功能
为便于第一人称的手持枪械的手臂展示，枪械模型整体需打组在名为`gun`的`bone`下，且`gun`的`数轴`应当在枪把上，在动画设计的过程中，射击动画的`gun`关键帧应当等效复制出一个名为`hands`的关键帧，换弹同理！防止射击时滑手！。若想进行其他调整行为，核心逻辑在`ModClient/GunApi/GunRun.py`的`208`行`PlayerRenderToEverybody`函数中，可依此追寻对应模型、动画文件：

|手部Bone名称|含义|
|:-:|:-:|
|hands|双手|
|left|左手|
|right|右手|

```python
    def PlayerRenderToEverybody(self, args):
        # 主要是需要给玩家的第一人称修改下枪械视角，那么这个渲染行为不需要进行渲染广播
        # 删除原版攻击动画，添加第一人称对冲动画，以方便动画编辑！
        RenderId = args
        RenderControl = clientApi.GetEngineCompFactory().CreateActorRender(RenderId)
        RenderControl.AddPlayerAnimation('gun_item_first_person', 'animation.gun.item_first_person')
        RenderControl.AddPlayerAnimation('gun_first_person', 'animation.gun.first_person_idle')
        RenderControl.AddPlayerAnimation('gun_third_person', 'animation.gun.third_person_idle')
        RenderControl.AddPlayerAnimation('move.arms', 'animation.gun.move.arms')
        RenderControl.AddPlayerScriptAnimate('gun_person_controller')
        RenderControl.AddPlayerAnimationController('gun_person_controller', 'controller.animation.gun.person')
        RenderControl.AddPlayerAnimationController('root', 'controller.animation.gun.root')
        RenderControl.AddPlayerRenderController('controller.render.dfm_arm', 'variable.is_first_person')
        RenderControl.AddPlayerRenderMaterial('dfm_arm', 'spider')
        #
        if RenderControl.GetModelStyle() != 'slim':
            RenderControl.AddPlayerGeometry('dfm_arm', 'geometry.gun_hand')
        else:
            RenderControl.AddPlayerGeometry('dfm_arm', 'geometry.gun_slim_hand')
        #
        RenderControl.AddPlayerAnimation('idle', 'animation.{0}.idle'.format(GunDict['GunName']))
        RenderControl.AddPlayerAnimation('shoot', 'animation.{0}.shoot'.format(GunDict['GunName']))
        RenderControl.AddPlayerAnimation('reload', 'animation.{0}.reload'.format(GunDict['GunName']))
        RenderControl.AddPlayerScriptAnimate('idle')
        RenderControl.AddPlayerScriptAnimate('shoot', 'query.mod.dfm_gun_shoot')
        RenderControl.AddPlayerScriptAnimate('reload', 'query.mod.dfm_gun_reload')
        RenderControl.RebuildPlayerRender()
```
