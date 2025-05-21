---
title: 120分钟开发次元助手2技能角色
order: 2
toc: content
group:
  title: 其他
  order: 6
---
:::info{title=下载提示}
本处不提供下载链接，该内容已整合至自动化开发程序
:::

- [附件](#附件)

> 请等待近两天的更新，解决了目前的一些bug，优化了部分逻辑行为！并附带DEMO示范！

> 次元助手2的`cyzs2Api`是基于[`CreatorApi`](http://139.159.183.64/docs/creatorcreator-1etst5gh1pecc/install-CreatorApi)开发的~更加针对次元助手2的开发。Demo`Cpp_AddOn_雷电使者-重构屎山.zip`
以下是该模组的必须内容：
- 次元助手2-综合前置
- 次元助手2-角色包
- 伤害显示lite(美化包)

## 1.创建新的附加包及脚本
推荐直接复制Demo`Cpp_AddOn_雷电使者-重构屎山.zip`的脚本文件夹，修改System名称、ModMain等基础内容后~
替换服务端和客户端的`leidianshizhe`字样为所需的，这里以`空间使者`为例子~

![](http://1.94.129.175/uploads/cyzs2/images/m_6a949541ca11484d2e9c32b21489d99c_r.png)

## 2.修改次元助手2配置
整个模组的`攻击逻辑`、`攻击特效`、`角色渲染`、`伤害计算`和`音效触发`需要自己写，其他的直接沿用就可以辣！
打开脚本文件根目录的`ModClient/cyzs2conf.py`，按照需求写好即可~
```python
# -*- coding:utf-8 -*-
confDict = {
    "RenderName": "空间使者",  # 角色的中文名称
    "RenderEnName": "kongjianshizhe",  # 角色的拼音
    "MaxEnergy": 40,  # 释放必杀技所需的能量
    "Type": "Ice",  # 伤害显示的属性颜色
    "AttackDelay": 2,  # 单位：秒 连续攻击需要多长时间恢复第一攻击
    # 角色能力介绍
    "RenderContent": '普通攻击：\n第一段：50.0%%攻击力\n第二段：55.0%%攻击力\n第三段：75.0%%攻击力\n第四段：共180.0%%攻击力的范围伤害,该攻击会破坏掉落物,雷电使者在0.25-1.0秒隐入无敌空间\n第五段：175.0%%攻击力的范围伤害\n\n角色能力：\n剑气粒子场域会永久降低范围内非玩家实体的属性20%，并造成65.0%%攻击力的范围伤害。\n雷电使者挥砍虚空凝聚剑气形成粒子场域持续20秒，冷却25秒。\n\n角色终极能力-刀剑奥义：\n1500%%攻击力的范围伤害\n雷电使者蓄力一段时间用于凝聚刀剑奥义形体，随后向前方挥砍造成大量伤害\n\n闪避：\n闪避过程中(1.25s)会对敌人造成35.0%%攻击力的伤害并向后撤\n',
    # 角色故事介绍
    "RenderStory": '雷电使者出生在一个普通的家庭。她从小就非常喜欢玩弄各种利器，而最让她着迷的则是刀剑。她常常在夜晚里漫步在城市的街头巷尾，一边欣赏着夜景，一边练习着刀剑技艺。\n\n然而，一场意外的灾难改变了她的生活。她的父母在一次车祸中去世，她也因此沉浸在悲痛之中。她感到自己的生命中一切都被剥夺了，包括她的家庭和爱好。她变得冷漠，几乎不与任何人交流，也不再对刀剑产生兴趣。\n\n然而，一个老人的出现改变了她的命运。老人发现了她的天赋和潜力，向她传授刀剑奥义。雷电使者女孩开始重新热爱刀剑，她花费了大量的时间去练习，最终成为了一名真正的刀剑高手。\n\n现在的她，依旧喜欢穿着特殊的服装，外表冷酷高冷。但她内心已经焕发出了新的生机，她将自己的刀剑技艺带到了另一个层次。她的目标是成为一名真正的雷电使者，保护自己身边的人和城市的和平。她不再是一个孤独的人，而是拥有了一个新的家庭和朋友。'
}
```
### 伤害显示的属性颜色
|名称|描述|
|:-:|:-:|
|Fire|火元素|
|Water|水元素|
|Light|雷元素|
|Ice|冰元素|
|Wind|风元素|
|Stone|岩元素|
|Grass|草元素|
|Physics|物理属性|

## 3.UI素材的准备
UI素材的命名全部是有规范的~不建议修改调整掉
### 角色包命名规则
在资源包的`textures/ui`目录下

![](http://1.94.129.175/uploads/cyzs2/images/m_0ea91de37753cdb632cd12c5de84ffdf_r.png)

|名称|描述|示例命名|
|:-:|:-:|:-:|
|[RenderEnName].png|角色选择界面的海报图|kongjianshizhe.png|
|[RenderEnName]_icon.png|角色选择界面的角色头像图|kongjianshizhe_icon.png|
|[RenderEnName]_icon2.png|左上角生命值头像图|kongjianshizhe_icon2.png|

### 美化包命名规则
在美化包的资源包的`textures/ui`目录下
美化包可以是任意模组，这里以`伤害显示lite`示例

![](http://1.94.129.175/uploads/cyzs2/images/m_2ae077d27a22889836a961a96bfb6a4d_r.png)

|名称|描述|示例命名|
|:-:|:-:|:-:|
|modify_[RenderEnName].png|正版角色选择界面的海报图|modify_kongjianshizhe.png|
|modify_[RenderEnName]_icon.png|正版角色选择界面的角色头像图|modify_kongjianshizhe_icon.png|
|modify_[RenderEnName]_icon2.png|正版左上角生命值头像图|modify_kongjianshizhe_icon2.png|

### 空间使者示例
在资源包的`textures/ui`目录下

![](http://1.94.129.175/uploads/cyzs2/images/m_d12e98ccbd4391130e8ff5955bc05486_r.png)

## 4.角色模型、动画、纹理导入及配置；特效、音效自行导入配置
自行导入内容后在客户端`RenderToEverybody`函数中直接添加`角色模型、动画、纹理`即可:
```python
    def RenderToEverybody(self, args):
        RenderId = args
        RenderControl = clientApi.GetEngineCompFactory().CreateActorRender(RenderId)
        # 删除掉所有有关次元助手2的动画控制器（要独立一个函数，这样也就可以清理掉其他角色的做兼容，还有UI的Content）
        Data = [RenderId, self.confDict['RenderEnName']]
        self.NotifyToServer('RemoveAllAnimationControllerToEverybodyEvent', Data)
        RenderControl.RemovePlayerRenderController('controller.render.player.first_person')
        RenderControl.RemovePlayerRenderController('controller.render.player.third_person')
        RenderControl.RemovePlayerRenderController('controller.render.player.map')
        #
        RenderControl.RemovePlayerAnimationController('root')
        #
        RenderControl.AddPlayerRenderController('controller.render.cyzs2')
        #
        RenderControl.AddPlayerRenderMaterial('cyzs2', 'entity_alphatest_dfm_mb')
        RenderControl.AddPlayerRenderMaterial('spider', 'spider')
        #
        if not TexturePack:
            RenderControl.AddPlayerTexture('cyzs2', 'textures/entity/kongjianshizhe')
            RenderControl.AddPlayerGeometry('cyzs2', 'geometry.kongjianshizhe')
        elif TexturePack:
            RenderControl.AddPlayerTexture('cyzs2', 'textures/entity/modify_kongjianshizhe')
            RenderControl.AddPlayerGeometry('cyzs2', 'geometry.modify_kongjianshizhe')
        #
        RenderControl.AddPlayerAnimation('kongjianshizhe_scale', 'animation.kongjianshizhe.scale')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bg_idle', 'animation.kongjianshizhe.bg_idle')
        RenderControl.AddPlayerAnimation('kongjianshizhe_first_person_idle', 'animation.kongjianshizhe.first_person_idle')
        RenderControl.AddPlayerAnimation('kongjianshizhe_walk', 'animation.kongjianshizhe.walk')
        RenderControl.AddPlayerAnimation('kongjianshizhe_jump', 'animation.kongjianshizhe.jump')
        RenderControl.AddPlayerAnimation('kongjianshizhe_first_person_walk', 'animation.kongjianshizhe.first_person_walk')
        RenderControl.AddPlayerAnimation('kongjianshizhe_walk_huanchong', 'animation.kongjianshizhe.walk_huanchong')
        RenderControl.AddPlayerAnimation('kongjianshizhe_idle', 'animation.kongjianshizhe.idle')
        RenderControl.AddPlayerAnimation('kongjianshizhe_run', 'animation.kongjianshizhe.run')
        RenderControl.AddPlayerAnimation('kongjianshizhe_sneak', 'animation.kongjianshizhe.sneak')
        RenderControl.AddPlayerAnimation('kongjianshizhe_sneak_walk', 'animation.kongjianshizhe.sneak_walk')
        # 加自定义动画
        RenderControl.AddPlayerAnimation('kongjianshizhe_attack_1', 'animation.kongjianshizhe.attack_1')
        RenderControl.AddPlayerAnimation('kongjianshizhe_attack_2', 'animation.kongjianshizhe.attack_2')
        RenderControl.AddPlayerAnimation('kongjianshizhe_attack_3', 'animation.kongjianshizhe.attack_3')
        RenderControl.AddPlayerAnimation('kongjianshizhe_attack_4', 'animation.kongjianshizhe.attack_4')
        RenderControl.AddPlayerAnimation('kongjianshizhe_attack_5', 'animation.kongjianshizhe.attack_5')

        RenderControl.AddPlayerAnimation('kongjianshizhe_shan', 'animation.kongjianshizhe.shanbi')
        RenderControl.AddPlayerAnimation('kongjianshizhe_skill_1', 'animation.kongjianshizhe.skill_1')
        RenderControl.AddPlayerAnimation('kongjianshizhe_accd', 'animation.kongjianshizhe.skill_2')

        # RenderControl.AddPlayerAnimation('kongjianshizhe_no_bg', 'animation.kongjianshizhe.no_bg')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_no_sword_bar', 'animation.kongjianshizhe.no_sword_bar')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_hair_idle', 'animation.kongjianshizhe.hair_idle')
        RenderControl.AddPlayerAnimation('kongjianshizhe_look_at_target', 'animation.kongjianshizhe.look_at_target')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_pose1', 'animation.kongjianshizhe.pose1')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_pose1', 'animation.kongjianshizhe.third_person_pose1')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack1', 'animation.kongjianshizhe.attack1')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack1_huanchong', 'animation.kongjianshizhe.attack1_huanchong')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_attack1', 'animation.kongjianshizhe.third_person_attack1')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack2', 'animation.kongjianshizhe.attack2')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack2_huanchong', 'animation.kongjianshizhe.attack1_huanchong')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_attack2', 'animation.kongjianshizhe.third_person_attack2')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack3', 'animation.kongjianshizhe.attack3')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack3_huanchong', 'animation.kongjianshizhe.attack3_huanchong')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_attack3', 'animation.kongjianshizhe.third_person_attack3')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack4', 'animation.kongjianshizhe.attack4')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack4_huanchong', 'animation.kongjianshizhe.attack4_huanchong')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_attack4', 'animation.kongjianshizhe.third_person_attack4')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_attack5', 'animation.kongjianshizhe.attack5')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_attack5', 'animation.kongjianshizhe.third_person_attack5')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_shoudao', 'animation.kongjianshizhe.shoudao')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_shoudao', 'animation.kongjianshizhe.third_person_shoudao')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_teshugongji', 'animation.kongjianshizhe.teshugongji')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_walk_no_bighand', 'animation.kongjianshizhe.walk_no_bighand')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_shanbi', 'animation.kongjianshizhe.shanbi')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_third_person_shanbi', 'animation.kongjianshizhe.third_person_shanbi')
        # #
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_idle', 'animation.kongjianshizhe.bishaji_idle')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_scale', 'animation.kongjianshizhe.bishaji_scale')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_scale_idle', 'animation.kongjianshizhe.bishaji_scale_idle')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_no_bishaji', 'animation.kongjianshizhe.no_bishaji')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_body_rot', 'animation.kongjianshizhe.bishaji_body_rot')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_scale_player', 'animation.kongjianshizhe.bishaji_scale_player')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_attack', 'animation.kongjianshizhe.bishaji_attack')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_stop', 'animation.kongjianshizhe.bishaji_stop')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_bishaji_buchong', 'animation.kongjianshizhe.bishaji_buchong')
        # RenderControl.AddPlayerAnimation('kongjianshizhe_test_scale', 'animation.kongjianshizhe.no_bishaji')
        #

        # RenderControl.AddActorScriptAnimate('minecraft:player', 'kongjianshizhe_test_scale')
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'kongjianshizhe_no_bishaji')
        #
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'kongjianshizhe_no_sword_bar', 'query.mod.attack != 5.0 && query.mod.attack != 7.0 && query.mod.bishaji == 0')
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'kongjianshizhe_look_at_target', 'variable.is_first_person')
        # RenderControl.AddActorScriptAnimate("minecraft:player", "kongjianshizhe_first_person_idle", 'variable.is_first_person')
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'kongjianshizhe_scale')
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'kongjianshizhe_bg_idle')
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'kongjianshizhe_no_bg')
        #
        RenderControl.AddActorScriptAnimate('minecraft:player', 'walk2_controller')
        RenderControl.AddPlayerAnimationController('walk2_controller', 'controller.animation.kongjianshizhe.movesystem')
        RenderControl.AddActorScriptAnimate('minecraft:player', 'aim_controller')
        RenderControl.AddPlayerAnimationController('aim_controller', 'controller.animation.kongjianshizhe.animationsystem')

        #
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'no_sword_bar2_controller')
        # RenderControl.AddPlayerAnimationController('no_sword_bar2_controller', 'controller.animation.kongjianshizhe.no_sword_bar')
        # #
        RenderControl.AddActorScriptAnimate('minecraft:player', 'look_at_target2_controller')
        RenderControl.AddPlayerAnimationController('look_at_target2_controller', 'controller.animation.kongjianshizhe.look_at_target')
        # #
        RenderControl.AddActorScriptAnimate("minecraft:player", "first_person_idle2_controller")
        RenderControl.AddPlayerAnimationController('first_person_idle2_controller', 'controller.animation.kongjianshizhe.first_person_idle')
        # #
        RenderControl.AddActorScriptAnimate('minecraft:player', 'scale2_controller')
        RenderControl.AddPlayerAnimationController('scale2_controller', 'controller.animation.kongjianshizhe.scale')
        # #
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'bg_idle2_controller')
        # RenderControl.AddPlayerAnimationController('bg_idle2_controller', 'controller.animation.kongjianshizhe.bg_idle')
        # #
        # RenderControl.AddActorScriptAnimate('minecraft:player', 'bg_idle2_controller')
        # RenderControl.AddPlayerAnimationController('bg_idle2_controller', 'controller.animation.kongjianshizhe.no_bg')
        #

        RenderControl.RebuildPlayerRender()
```
## 5.动画逻辑调整
受具体角色需求不同，目前Demo中的`Molang`函数不足以满足所有需求，可自行调整。
创建和设置`Molang`函数示例(在客户端的`Query`函数中)
```python
# 导入自定义Molang函数模块
import ModClient.BaseApi.QueryInit as QueryInit

# 为玩家`playerId`创建名为`query.mod.pose`的Molang函数，初始值为0.0
QueryInit.QueryInitApi().QueryInit(playerId, 'pose', 0.0)

# 为玩家`args`的`query.mod.pose`的Molang函数设置值为2.0
QueryInit.QueryInitApi().QueryValueSet(args, 'pose', 2.0)
```
可使用鼠标悬停查看注释

![](http://1.94.129.175/uploads/cyzs2/images/m_467917101b97a6de91ecf29eb5fcf41d_r.png)

在客户端的`RemoveAllAnimationControllerToEverybody`和`ResetAllAnimationControllerToEverybody`函数中，要放上清除动画控制器的内容，以保证切换或取消变身角色后动画的正常播放！
## 6.攻击逻辑调整
受具体角色需求不同，目前Demo中客户端的`AttackLogic`函数不足以满足所有需求，可自行调整。
这里Demo中的`AttackLogic`函数便是调节攻击的具体逻辑，可以通过这个给攻击添加`特效`、`音效`等。
在客户端的`PlayerAttack`函数中`self.AttackLogic`便是给连续攻击提升手感的时间参数，有详细的说明介绍~
```python
    def PlayerAttack(self, args):
        # 攻击动画虽然结束，但是动画时长要是最大延迟连续攻击时长的2倍，例如雷电使者的1s延迟，则攻击动画时长为2s，但是后面是没动画效果（但有关键帧）
        self.AttackLogic(0.3, 0.7, 1, 1)  # 5段普通攻击之间的四段延迟
```
## 7.其他
不需要设置`SetHurtCD(1)`，因为在<font color=red>服务端</font>的伤害逻辑当中，已经在造成伤害前设置了1CD，造成上海后恢复默认CD

|功能|<div style="width: 3.5em">端</div>|函数名|
|:-:|:-:|:-:|
|特殊攻击逻辑|<font color=blue>客户端</font>|PlayerTeShuGongJi|
|必杀技逻辑|<font color=blue>客户端</font>|PlayerBiShaJi|
|闪避逻辑|<font color=blue>客户端</font>|PlayerShanBi|
|属性参数计算|<font color=blue>客户端</font>|UpDateValue|
|普通攻击逻辑|<font color=red>服务端</font>|RenderAttack|

不知道有些是干嘛的可以鼠标悬停查看注释！

![](/uploads/cyzs2/images/m_3218f6a27e52351e195d0f09e9903c1d_r.png)

## 8.空间使者效果

![](http://1.94.129.175/uploads/cyzs2/images/m_be8bcbb841f28346fd8b2807d8759ed3_r.png)
![](http://1.94.129.175/uploads/cyzs2/images/m_d4576beeedb091cd4627cee8e0e021c5_r.png)
![](http://1.94.129.175/uploads/cyzs2/images/m_14c905c1cfdec56a52394ee52bffaeb5_r.png)
![](http://1.94.129.175/uploads/cyzs2/images/m_f4e1934d7e8e6c761a0dd86148a73565_r.png)

[](@附件)
