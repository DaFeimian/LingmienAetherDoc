---
title: 免神-配置一览
order: 0
toc: content
group:
  title: 副包开发(DLC)
  order: 5
---
# 免神-配置一览
## 角色配置
```python
RenderList = [
    {
        'Name': '鲨鱼妹妹',  # 角色名字
        'Identifier': 'ailian',  # 命名空间固定为GlobalConfig.NameSpace
        'RenderMaterial': 'entity_alphatest_netease',     # 材质，不填则默认描边模式
        'DebugMaterial': 'entity_alphatest_netease',    # 调试材质
        'RenderControllerList': ['controller.render.al'],   # 渲染控制器，为空表示使用默认渲染控制器
        # 当RenderControllerList存在，则materials也修改
        'MaterialsDictListByRenderController': [
            {
                'Key': 'al_hs',
                'Value': 'dfm_al_hs_leg'
            },
            {
                'Key': 'al_hs_up',
                'Value': 'dfm_al_hs_legup'
            }
        ],
        'IsLocked': False,
        'DebugRender': True,
        'LockedInfo': '加班一周，通宵了，实在赶不赢，希望理解，下次开放！',
        'DamageType': 'Ice',
        'Level': 5,
        'Info': '维多家政公司\ncv:魏婴',
        'CV': '魏婴',
        'AttackTimes': 4,
        'ResetAttackTimer': 1.5,
        # 这个角色所在的副包实例信息
        'ModName': 'ailian',
        'ClientSystem': 'ailianClientSystem',
        'ServerSystem': 'ailianServerSystem',
        # 是否使用主包的逻辑执行，反之直接给到副包Client中执行。因为继承这边很难操作，这样做一个伪继承
        'IsMainPackPlayerAttack': False,
        'IsMainPackPlayerSkill': False,
        'IsMainPackPlayerShanBi': True,
        'IsMainPackPlayerBiShaJi': False,
        # 是否使用主包攻击音效逻辑，不包含角色音效
        'IsMainPackPlayerAttackSound': True,
        # 是否使用主包的states动画控制器,为False则默认使用controller.animation.{Identifier}.states,scale和weapon照常
        'IsMainPackAnimationController': False,
        # 额外补充动画
        'RenderAnimationList': [
            'newidle',
            'skill',
            'third_person_skill',
            'bishaji',
            'third_person_bishaji',
            'pose2',
            'third_person_pose2',
            'super_sprint_start',
            'super_sprint_idle',
            'super_sprint_stop',
            'third_person_super_sprint_start',
            'third_person_super_sprint_idle',
            'third_person_super_sprint_stop'
        ],
        # 额外补充动画控制器
        'RenderAnimationControllerList': [],
        # 攻击等数据信息
        'RenderSoundName': 'ailian_pose',  # 角色待机说话的声音
        'RenderAttackSoundName': 'None',  # 命中目标的音效，没用
        'RenderBeAttackedSoundName': 'None',   # 受击音效
        'AttackDict': {
            # 如果IsMainPackPlayerAttack为False，那么可以自定义一些AttackDict参数来实现攻击的效果
            # AttackTimer攻击动画的时间
            # DamagePercent 伤害百分比
            # DamageTimer伤害处罚的时间
            # ResetTimer恢复攻击状态为0的间隔时间
            # SoundName攻击音效
            # MotionPercent (x, z)位移比例
            1: {
                'AttackTimer': 0.63,
                'DamagePercent': 0.35,
                'DamageTimerList': [0.33],
                'ResetTimer': 2.00,
                'SoundName': 'ailian_dao',
                'RenderSoundName': 'ailian_attack2',
                'SoundTimerList': [0],
                'Radius': 5,
                'BetweenAngle': 120.0,
                'MotionPercent': (0.35, 0.35),
                'SfxDict': []
            },
            2: {
                'AttackTimer': 1,
                'DamagePercent': 0.30,
                'DamageTimerList': [0.61, 0.71, 0.88, 0.96, 1.04],
                'ResetTimer': 2.33,
                'SoundName': 'ailian_dao',
                'RenderSoundName': 'ailian_attack2',
                'SoundTimerList': [0.50],
                'Radius': 5,
                'BetweenAngle': 120.0,
                'MotionPercent': (0.45, 0.45),
                'SfxDict': []
            },
            3: {
                'AttackTimer': 1.54,
                'DamagePercent': 0.40,
                'DamageTimerList': [0.42, 0.46, 0.54, 0.63, 0.71, 0.75, 0.80, 0.92, 1.00, 1.05, 1.10, 1.15, 1.20, 1.25, 1.30],
                'ResetTimer': 1.46,
                'SoundName': 'ailian_dao3',
                'RenderSoundName': 'ailian_attack2',
                'SoundTimerList': [0.53],
                'Radius': 12.5,
                'BetweenAngle': 120.0,
                'MotionPercent': (0.2, 0.2),
                'SfxDict': []
            },
            4: {
                'AttackTimer': 0.05,
                'DamagePercent': 0.00,
                'DamageTimerList': [],
                'ResetTimer': 0.05,
                'SoundName': 'None',
                'RenderSoundName': 'None',
                'SoundTimerList': [0.33],
                'Radius': 8.5,
                'BetweenAngle': 60.0,
                'MotionPercent': (0, 0),
                'SfxDict': []
            },
            # 本来是这样，但是这个已经是在副包继承了，所以这里参数无意义！
            'skill': {
                'AttackTimer': 1.5,
                'DamagePercent': 0.65,
                'DamageTimerList': [1.08],
                'ResetTimer': 0.10,
                'SoundName': 'ailian_skill',
                'RenderSoundName': 'None',
                'SoundTimerList': [0.0],
                'Radius': 7.0,
                'BetweenAngle': 120.0,
                'MotionPercent': (2, 2),
                'ColdDownTimer': 4,
                'SfxDict': [
                    {
                        'FaceCamara': False,
                        'SfxId': 'ailian_attack',
                        'Offset': (-1, -0.5, 0),
                        'Rot': (-30, -10, 45),
                        'Scale': (3.5, 2.5, 2.5)
                    },
                    {
                        'FaceCamara': False,
                        'SfxId': 'ailian_attack',
                        'Offset': (0, -0.5, 0),
                        'Rot': (-100, -10, 45),
                        'Scale': (3, 3, 3)
                    },
                    {
                        'FaceCamara': False,
                        'SfxId': 'ailian_attack',
                        'Offset': (0, -0.5, 0),
                        'Rot': (-30, 0, 45),
                        'Scale': (3, 3, 3)
                    },
                    {
                        'FaceCamara': False,
                        'SfxId': 'ailian_attack',
                        'Offset': (0, -0.5, 0),
                        'Rot': (-30, 10, 45),
                        'Scale': (3, 3, 3)
                    },
                    {
                        'FaceCamara': True,
                        'SfxId': 'ailian_skill',
                        'Offset': (-3, 5, 0),
                        'Rot': (-30, 10, 45),
                        'Scale': (15, 15, 15)
                    },
                    {
                        'FaceCamara': True,
                        'SfxId': 'ailian_boom',
                        'Offset': (-2.9, -0.5, 0),
                        'Rot': (-30, 10, 45),
                        'Scale': (3, 3, 3)
                    },
                    {
                        'FaceCamara': True,
                        'SfxId': 'ailian_boom2',
                        'Offset': (-2.6, -0.5, 0),
                        'Rot': (-30, 10, 45),
                        'Scale': (4, 4, 4)
                    }
                ]
            },
            'bishaji': {
                'AttackTimer': 3.0,
                'DamagePercent': 3.0,
                'Perspective': 1,
                'DamageTimerList': [1.00, 1.05, 1.10, 1.15, 1.20, 1.25, 1.30, 1.35, 1.40, 1.45, 1.50, 1.55, 1.60, 1.63],
                'ResetTimer': 0.15,
                'SoundName': 'ailian_bishaji2',
                'RenderSoundName': 'None',
                'SoundTimerList': [0.5],
                'Radius': 10.0,
                'BetweenAngle': 120.0,
                'MotionPercent': (0, 0),
                'Energy': 20,
                'SfxDict': []
            }
        },
        # 角色突破所需材料信息
        'AdvanceItemList': [
            [
                {
                    'Id': 'bingya',
                    'Type': 'Item',
                    'Num': 5
                },
                {
                    'Id': 'bingguan',
                    'Type': 'Item',
                    'Num': 1
                }
            ],
            [
                {
                    'Id': 'bingya',
                    'Type': 'Item',
                    'Num': 7
                },
                {
                    'Id': 'bingguan',
                    'Type': 'Item',
                    'Num': 3
                }
            ],
            [
                {
                    'Id': 'bingya',
                    'Type': 'Item',
                    'Num': 10
                },
                {
                    'Id': 'bingguan',
                    'Type': 'Item',
                    'Num': 5
                },
                {
                    'Id': 'bingjing',
                    'Type': 'Item',
                    'Num': 3
                }
            ],
            [
                {
                    'Id': 'bingya',
                    'Type': 'Item',
                    'Num': 15
                },
                {
                    'Id': 'bingguan',
                    'Type': 'Item',
                    'Num': 8
                },
                {
                    'Id': 'bingjing',
                    'Type': 'Item',
                    'Num': 6
                },
                {
                    'Id': 'binghexin',
                    'Type': 'Item',
                    'Num': 3
                }
            ],
            [
                {
                    'Id': 'bingya',
                    'Type': 'Item',
                    'Num': 17
                },
                {
                    'Id': 'bingguan',
                    'Type': 'Item',
                    'Num': 11
                },
                {
                    'Id': 'bingjing',
                    'Type': 'Item',
                    'Num': 9
                },
                {
                    'Id': 'binghexin',
                    'Type': 'Item',
                    'Num': 5
                }
            ],
            [
                {
                    'Id': 'bingya',
                    'Type': 'Item',
                    'Num': 21
                },
                {
                    'Id': 'bingguan',
                    'Type': 'Item',
                    'Num': 14
                },
                {
                    'Id': 'bingjing',
                    'Type': 'Item',
                    'Num': 12
                },
                {
                    'Id': 'binghexin',
                    'Type': 'Item',
                    'Num': 9
                }
            ]
        ],
        # 资料信息
        'RenderInfoList': [
            {
                'Title': '尚未制作',
                'Type': 'Sound',
                'SoundName': 'diaolingkulou_attack',
                'Content': '受极端天气影响，开发组周五提前下班了'
            }
        ]
    }
]
```

## 抽卡配置
```python
WishDictList = [
    {
        'Title': '维多鲨鲨',
        'Key': 'Ailian',
        'Date': None,
        'Reward': [
            {
                'Id': 'ailian',
                'Stars': 5,
                'Type': 'Render',
                'Weight': 2
            },
            {
                'Id': 'diaolingkulou',
                'Stars': 5,
                'Type': 'Render',
                'Weight': 1
            },
            {
                'Id': 'ji',
                'Stars': 5,
                'Type': 'Render',
                'Weight': 1
            },
            {
                'Id': '4',
                'Stars': 4,
                'Type': 'Item',
                'Weight': 2
            },
            {
                'Id': 'cuzhijian',
                'Stars': 3,
                'Type': 'Item',
                'Weight': 2
            },
            {
                'Id': 'changgong',
                'Stars': 3,
                'Type': 'Item',
                'Weight': 2
            },
            {
                'Id': 'cucaofazhang',
                'Stars': 3,
                'Type': 'Item',
                'Weight': 2
            },
            {
                'Id': 'dabang',
                'Stars': 3,
                'Type': 'Item',
                'Weight': 2
            },
            {
                'Id': 'dafu',
                'Stars': 3,
                'Type': 'Item',
                'Weight': 2
            }
        ]
    }
]
```

## 对话配置
```python
ChatDict = {
    'Identifier': 'diaolingkulou',
    'Name': '幽蝶',
    'InteractButton': ['「幽蝶」'],
    '「幽蝶」': {
        'PlayerSoundName': None,
        'RenderSoundName': 'diaolingkulou_nihao',
        'RenderSoundTimer': 1.5,
        'RenderText': '你好呀，今天你要做什么呢？(CV感冒了)',
        'InteractButton': ['西南方', '听不清楚', '新角色「阿坤」是谁？', '你说话为什么这么像AI']
    },
    '西南方': {
        'PlayerSoundName': 'xinanfang',
        'RenderSoundName': 'niguoguan',
        'RenderSoundTimer': 0.5,
        'RenderText': '你过关！'
        # 如果没有 InteractButton 表示结束
    },
    '听不清楚': {
        'PlayerSoundName': 'tingbuqingchu',
        'RenderSoundName': 'gaifa',
        'RenderSoundTimer': 0.5,
        'RenderText': '该罚！'
    },
    '新角色「阿坤」是谁？': {
        'PlayerSoundName': None,
        'RenderSoundName': 'diaolingkulou_akun',
        'RenderSoundTimer': 11,
        'RenderText': '「阿坤」啊...她是由「主世界」鸡萌化而来的，虽然我是「亡灵军团」的队长，但武力方面有大石镐武器的「阿坤」更甚一筹。',
        'InteractButton': ['她会打篮球吗？', '我想到了篮球和鸡']
    },
    '她会打篮球吗？': {
        'PlayerSoundName': None,
        'RenderSoundName': 'diaolingkulou_xiaoheizi',
        'RenderSoundTimer': 0.5,
        'RenderText': '啊？你是小黑子！'
    },
    '我想到了篮球和鸡': {
        'PlayerSoundName': None,
        'RenderSoundName': 'diaolingkulou_lanqiuheji',
        'RenderSoundTimer': 0.5,
        'RenderText': '篮球和鸡？'
    },
    '你说话为什么这么像AI': {
        'PlayerSoundName': None,
        'RenderSoundName': 'diaolingkulou_ai',
        'RenderSoundTimer': 0.5,
        'RenderText': '像AI怎么了嘛！我们「亡灵」生物就是不喜欢表达情绪，除了跟你对话~'
    }
}
```

## 物品配置
```python
ItemDict = {
    'ItemName': '兔兔票',
    'ItemId': 'tutupiao',
    'ItemLevel': 5,
    'ItemTag': '招募用品',
    'ItemInfo': '每个人都很喜欢大肥免，因此大肥免发行的兔兔票每个人都很喜欢。用兔兔票就可以很容易的招募到得力角色~',
    'ItemStory': '    「免神」三大维度三权分立后，「主世界」执政官负责三大维度财政和主世界的管理。'
                 '\n    「大肥免」发行的高级货币，由于避名讳，因此不叫「免免票」，而是「兔兔票」。',
    'ItemType': 'guizhongwu',
    'GetList': ['通过「兑换商店」获取'],
}
```

## 设置配置
```python
SettingListDict = {
    'game': [
        {
            'Type': 'Title',
            'Title': '游戏设置'
        },
        {
            'Key': 'CtrlMode',
            'Type': 'List',
            'Title': '操作模式',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n1. 背包(E)修改为(Tab)'
                    '\n2. 丢弃(Q)修改为(G)'
                    '\n3. 潜行(Shift)修改为(Z)',
            'Options': ['触控', '键鼠', '手柄']
        },
        {
            'Key': 'IsGyro',
            'Type': 'Bool',
            'Title': '陀螺仪',
            'Default': '开',
            'Tips': '',
            'False': '关',
            'True': '开'
        },
        {
            'Key': 'Home',
            'Type': 'Once',
            'Title': '家',
            'Label': '设置当前坐标',
            'Tips': '设置家之后，会有免神角色访客来访哦~'
        },
        {
            'Key': 'IsSpawnRender',
            'Type': 'Bool',
            'Title': '角色布娃娃自然生成',
            'Default': '关',
            'Tips': '在野外生成一些角色，他们能与你对话互动',
            'False': '关',
            'True': '开'
        },
        {
            'Key': 'IsOnlineSfx',
            'Type': 'Bool',
            'Title': '联机状态下是否显示其他玩家特效',
            'Default': '是',
            'Tips': '',
            'False': '否',
            'True': '是'
        },
        {
            'Key': 'IsMap',
            'Type': 'Bool',
            'Title': '小地图',
            'Default': '关',
            'Tips': '',
            'False': '关',
            'True': '开'
        },
        {
            'Key': 'IsRank',
            'Type': 'Bool',
            'Title': '角色编队',
            'Default': '关',
            'Tips': '',
            'False': '关',
            'True': '开'
        },
        {
            'Type': 'Title',
            'Title': '键鼠模式-按键设置'
        },
        {
            'Key': 'OpenRenderKeyBoard',
            'Type': 'List',
            'Title': '打开角色面板',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n1. 背包(E)修改为(Tab)'
                    '\n2. 丢弃(Q)修改为(G)'
                    '\n3. 潜行(Shift)修改为(Z)',
            'Options': ['C', 'Tab']
        },
        {
            'Key': 'OpenPackKeyBoard',
            'Type': 'List',
            'Title': '打开背包面板',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n 表情案件(B)修改为(N)',
            'Options': ['N', 'B']
        },
        {
            'Key': 'RenderModeKeyBoard',
            'Type': 'List',
            'Title': '战斗模式切换',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n1. 背包(E)修改为(Tab)'
                    '\n2. 丢弃(Q)修改为(G)'
                    '\n3. 潜行(Shift)修改为(Z)',
            'Options': ['X', 'R']
        },
        {
            'Key': 'AttackKeyBoard',
            'Type': 'List',
            'Title': '角色攻击',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n1. 背包(E)修改为(Tab)'
                    '\n2. 丢弃(Q)修改为(G)'
                    '\n3. 潜行(Shift)修改为(Z)',
            'Options': ['鼠标左键']
        },
        {
            'Key': 'SkillKeyBoard',
            'Type': 'List',
            'Title': '角色技能',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n1. 背包(E)修改为(Tab)'
                    '\n2. 丢弃(Q)修改为(G)'
                    '\n3. 潜行(Shift)修改为(Z)',
            'Options': ['G', 'E']
        },
        {
            'Key': 'BiShaJiKeyBoard',
            'Type': 'List',
            'Title': '角色终极技能',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n1. 背包(E)修改为(Tab)'
                    '\n2. 丢弃(Q)修改为(G)'
                    '\n3. 潜行(Shift)修改为(Z)',
            'Options': ['R', 'Q']
        },
        {
            'Key': 'ShanBiKeyBoard',
            'Type': 'List',
            'Title': '角色闪避',
            'Tips': '键鼠操作，为适应玩法操作习惯，推荐将MC原生操作按键修改如下'
                    '\n1. 背包(E)修改为(Tab)'
                    '\n2. 丢弃(Q)修改为(G)'
                    '\n3. 潜行(Shift)修改为(Z)',
            'Options': ['V', 'Shift']
        }
    ],
    'img': [
        {
            'Type': 'Title',
            'Title': '图像设置'
        },
        {
            'Key': 'ImgLevel',
            'Type': 'List',
            'Title': '画质等级',
            'Tips': '低品质：低分辨率纹理、无UI动画等'
                    '\n中品质：中分辨率纹理，低帧率启动界面等'
                    '\n高品质：高分辨率纹理，高帧率启动界面等'
                    '\n\n如遇闪退，请使用《免神-修复工具》进行修复',
            'Options': ['低品质', '中品质', '高品质'] # (需下载《免神-高画质资源包》)
        },
        {
            'Key': 'IsStartAnim',
            'Type': 'Bool',
            'Title': '动态启动界面',
            'Default': '关',
            'Tips': '只有高品质才有动态启动界面\n启动界面将会是动态播放，闪烁情况为正常现象',
            'False': '关',
            'True': '开'
        },
        {
            'Type': 'Title',
            'Title': '光影设置(电脑端用户需关闭纹素抗锯齿)'
        },
        {
            'Key': 'PostProcess',
            'Type': 'List',
            'Title': '后处理效果',
            'Tips': '只有安装《免神-二次元光影》才有效',
            'Options': ['1.00x', '0.75x', '0.50x', '0.00x']
        },
        {
            'Key': 'RenderFps',
            'Type': 'List',
            'Title': '渲染帧率',
            'Tips': '只有安装《免神-二次元光影》才有效',
            'Options': ['自动', '30', '24', '15', '10', '5']
        },
        {
            'Key': 'BloomPercent',
            'Type': 'List',
            'Title': '泛光效果',
            'Tips': '只有安装《免神-二次元光影》才有效',
            'Options': ['1.00x', '0.75x', '0.50x', '0.25x', '0.00x']
        },
        {
            'Key': 'VolumetricLightPercent',
            'Type': 'List',
            'Title': '体积光效果',
            'Tips': '只有安装《免神-二次元光影》才有效',
            'Options': ['1.00x', '0.75x', '0.50x', '0.25x', '0.00x']
        },
        {
            'Key': 'HaloPercent',
            'Type': 'List',
            'Title': '光晕效果',
            'Default': '开',
            'Tips': '只有安装《免神-二次元光影》才有效',
            'Options': ['1.00x', '0.75x', '0.50x', '0.25x', '0.00x']
        }
    ],
    'sound': [
        {
            'Type': 'Title',
            'Title': '音效设置'
        },
        {
            'Key': 'IsRenderSound',
            'Type': 'Bool',
            'Title': '角色语音',
            'Default': '开',
            'Tips': '',
            'False': '关',
            'True': '开'
        }
    ],
    'fight': [
        {
            'Type': 'Title',
            'Title': '战斗设置'
        },
        {
            'Key': 'IsSelectTarget',
            'Type': 'Bool',
            'Title': '索敌视角',
            'Default': '关',
            'Tips': '',
            'False': '关',
            'True': '开'
        },
        {
            'Key': 'IsMotion',
            'Type': 'Bool',
            'Title': '攻击位移',
            'Default': '开',
            'Tips': '',
            'False': '关',
            'True': '开'
        }
    ],
    'other': [
        {
            'Type': 'Title',
            'Title': '其他设置'
        },
        {
            'Key': 'SettingBg',
            'Type': 'List',
            'Title': '面板背景',
            'Tips': '',
            'Options': ['自动', '白日', '黄昏', '夜晚']
        },
        {
            'Key': 'FeiCoin',
            'Type': 'Once',
            'Title': '增加F币',
            'Label': '增加2000',
            'Tips': '用于招募、兑换体力、购买物品等\n仅创造玩家可获取\n生存、冒险玩家需完成相关任务获取，「任务系统」待后续更新。'
        },
        {
            'Key': 'GlobalData',
            'Type': 'Bool',
            'Title': '存档数据全局共享',
            'Default': '开',
            'Tips': '关闭后如本存档未有单存档数据将会从初始开始',
            'False': '关',
            'True': '开'
        }
    ],
    'dev': [
        {
            'Type': 'Title',
            'Title': '材料调试'
        },
        {
            'Key': 'tutupiao',
            'Type': 'Once',
            'Title': '获取材料「兔兔票」x10',
            'Label': '获取',
            'Tips': ''
        },
        {
            'Key': 'baigu',
            'Type': 'Once',
            'Title': '获取材料「鸡坤骨」',
            'Label': '获取',
            'Tips': ''
        },
        {
            'Key': '6items',
            'Type': 'Once',
            'Title': '获取随机6个物品',
            'Label': '获取',
            'Tips': ''
        },
        {
            'Type': 'Title',
            'Title': '外观调试'
        },
        {
            'Key': 'DebugRenderTexture',
            'Type': 'Once',
            'Title': '角色外观调试',
            'Label': '调试',
            'Tips': '用于调试外观配色，玩家请勿使用，否则后果自负'
        },
        {
            'Type': 'Title',
            'Title': '角色调试'
        },
        {
            'Key': 'ClearRenderList',
            'Type': 'Once',
            'Title': '删除所有角色',
            'Label': '删除',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'ClearRenderLevelYouDie',
            'Type': 'Once',
            'Title': '重置「幽蝶」角色等级',
            'Label': '重置',
            'Tips': ''
        },
        {
            'Key': 'ClearRenderLevelAKun',
            'Type': 'Once',
            'Title': '重置「阿坤」角色等级',
            'Label': '重置',
            'Tips': ''
        },
        {
            'Key': 'ClearRenderLevelJingLiu',
            'Type': 'Once',
            'Title': '重置「镜月之流」角色等级',
            'Label': '重置',
            'Tips': ''
        },
        {
            'Key': 'ClearRenderLevelLiuYing',
            'Type': 'Once',
            'Title': '重置「流光萤火」角色等级',
            'Label': '重置',
            'Tips': ''
        },
        {
            'Key': 'ClearRenderLevelFuXuan',
            'Type': 'Once',
            'Title': '重置「符卿」角色等级',
            'Label': '重置',
            'Tips': ''
        },
        {
            'Key': 'ClearRenderLevelAiLian',
            'Type': 'Once',
            'Title': '重置「鲨鱼妹妹」角色等级',
            'Label': '重置',
            'Tips': ''
        },
        {
            'Key': 'player',
            'Type': 'Once',
            'Title': '获取角色「玩家」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'dafeimian',
            'Type': 'Once',
            'Title': '获取角色「大肥免」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'diaolingkulou',
            'Type': 'Once',
            'Title': '获取角色「幽蝶」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'ji',
            'Type': 'Once',
            'Title': '获取角色「阿坤」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'lang',
            'Type': 'Once',
            'Title': '获取角色「萌狼」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'niu',
            'Type': 'Once',
            'Title': '获取角色「萌牛」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'tu',
            'Type': 'Once',
            'Title': '获取角色「萌兔」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'tu',
            'Type': 'Once',
            'Title': '获取角色「萌兔」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'huanyi',
            'Type': 'Once',
            'Title': '获取角色「萌幻翼」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'baizi',
            'Type': 'Once',
            'Title': '获取角色「白子」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'meiyou',
            'Type': 'Once',
            'Title': '获取角色「美游」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'meixiyuan',
            'Type': 'Once',
            'Title': '获取角色「美西螈」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'lieyanren',
            'Type': 'Once',
            'Title': '获取角色「萌化烈焰人」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'moyingren',
            'Type': 'Once',
            'Title': '获取角色「萌化末影人」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'zhuling',
            'Type': 'Once',
            'Title': '获取角色「萌化猪灵」(尚未起名)',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'rinai',
            'Type': 'Once',
            'Title': '获取角色「日奈」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'leidianshizhe',
            'Type': 'Once',
            'Title': '获取角色「雷电使者」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'kongjianshizhe',
            'Type': 'Once',
            'Title': '获取角色「空间使者」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'yishishizhe',
            'Type': 'Once',
            'Title': '获取角色「意识使者」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Key': 'dongxuezhizhu',
            'Type': 'Once',
            'Title': '获取角色「萌化洞穴蜘蛛」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Type': 'Title',
            'Title': '武器调试'
        },
        {
            'Key': 'tiejian',
            'Type': 'Once',
            'Title': '获取武器「铁剑」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        },
        {
            'Type': 'Title',
            'Title': '方块调试'
        },
        {
            'Key': 'minxinag',
            'Type': 'Once',
            'Title': '获取方块「最后的冥想」',
            'Label': '获取',
            'Tips': '开发者调试专用，玩家使用无效'
        }
    ]
}
```

## 更新日志配置
```python
UpDateInfoList = [
    {
        'Title': '开发人员名单&开发成本',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '开发成本'
                   '\n\n截止2024年7月24日，《免神》系列组件共计5个，限免2个，永久免费3个，预计本月还有4个限免内容'
                   '\n成本62750元'
                   '\n\n开发人员名单：'
                   '\n\n策划：初之界'
                   '\n程序&UI设计&音效&特效：大肥免'
                   '\n场景设计：秋零工坊工作室'
                   '\n美术模型：kkkk、互联益能'
                   '\n美术纹理：kkkk、互联益能'
                   '\n美术动画：kkkk、大肥免'
                   '\n光影效果：被遗忘的青色剑士、lonel'
                   '\n材质贴图：秋栀'
                   '\n插画设计：怠DiE、-ADD-、电子趴趴、墨惜、X插画、风扬运起'
                   '\n贴图设计：大肥免、X插画'
                   '\n角色配音：常乃馨、MOMO、木羽、徐伟'
                   '\n\n特别鸣谢：每一位默默支持鼓励我们的玩家！'
    },
    {
        'Title': '前瞻更新v3.x.0',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.x.0 VD_None'
                   '\n\n预计更新：'
                   '\n1.「档案系统」、「聊天系统」'
                   '\n2.优化对话系统，修复反馈的准星bug'
                   '\n\n更多待后续更新内容：'
                   '\n1.「体力系统」'
                   '\n2.「副本系统」'
    },
    {
        'Title': '更新信息v3.7.4',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.7.4 VD_20241009'
                   '\n\n主要更新：'
                   '\n1.灵免以太升级'
                   '\n2.修复了PC端无陀螺仪的问题'
    },
    {
        'Title': '更新信息v3.7.3',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.7.3 VD_20240816'
                   '\n\n主要更新：'
                   '\n1.「DFM架构」3.1.1更新，以便「次元助手」系列兼容'
                   # '\n2.光锥武器上新'
                   # '\n3.经验瓶'
                   '\n\n次要更新：'
                   # '\n1.修复了「鲨鱼妹妹」武器显示异常的问题'
                   '\n1.修复了UI显示异常的问题'
                   '\n2.修复了若干问题'
    },
    {
        'Title': '更新信息v3.7.2',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.7.2 VD_20240814'
                   '\n\n主要更新：'
                   '\n1.新公告「重走西游·黑风山」开启'
                   '\n\n次要更新：'
                   '\n1.修复了活动打开异常的问题'
                   '\n2.修复了模型错误的问题'
                   '\n3.修复了若干问题'
    },
    {
        'Title': '更新信息v3.7.1',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.7.1 VD_20240808'
                   '\n\n次要更新：'
                   '\n1.修复了着色器规范性问题'
                   '\n2.修复了活动文字错误问题'
    },
    {
        'Title': '更新信息v3.7.0',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.7.0 VD_20240803'
                   '\n\n主要更新：'
                   '\n1.抽卡修改为「兔兔票」，还没写「兑换商店」，目前无法用F币买兔兔票'
                   '\n2.新增「活动系统」该界面包含公告'
                   '\n3.新增「角色招募」保底功能'
                   '\n\n次要更新：'
                   '\n1.修复了攻击时角色直接往下钻的问题,符卿角色副包更新后生效'
                   '\n2.新增按钮红点提示'
                   '\n3.优化角色描边、角色袜子效果'
    },
    {
        'Title': '更新信息v3.6.2',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.6.2 VD_20240729'
                   '\n\n主要更新：'
                   '\n1.根据火焰图优化调整代码内容，优化代码逻辑结构。测试设备优化结果为：'
                   '\n  · ModPC满视距 20fps-50fps-120fps-150fps-180fps啦'
                   '\n  ` 但是出了新功能又变到150fps了呜呜呜！'
                   '\n2.修复了光影的若干bug'
                   '\n\n次要更新：'
                   '\n1.修复了第三人称背面视角游泳异常的问题'
    },
    {
        'Title': '更新信息v3.6.1',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.6.1 VD_20240725'
                   '\n\n主要更新：'
                   '\n优化调整部分内容并修复了若干bug'
    },
    {
        'Title': '更新信息v3.6.0',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.6.0 VD_20240716'
                   '\n\n主要更新：'
                   '\n1.背包系统上新，并新增了33个物品内容'
                   '\n2.物品获取界面上新'
                   '\n3.纪念贵重物品上新'
                   '\n\n次要更新：'
                   '\n1.修复了手持物品联机仍然显示的问题'
                   '\n2.新增了数据存储损坏的提示操作问题'
                   '\n3.修复了新架构联机招募界面缺少角色的问题'
                   '\n4.新增了设置物品获取的调试界面'
                   '\n5.新增了升级、突破等界面'
                   '\n6.新增了物品详细信息界面'
                   '\n7.新增了左下角帧率、服务端延迟等信息'
    },
    {
        'Title': '更新信息v3.5.1',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.5.1 VD_20240711'
                   '\n\n主要更新：'
                   '\n1.光影上新！'
                   '\n2.架构优化升级至DFM3.1架构'
                   '\n\n次要更新：'
                   '\n1.修复了因mojang新版本bug而导致的攻击破坏掉落物的问题，副包角色需要待后续同步！部分角色需要等待更新全新架构后以解决'
                   '\n2.优化了UI布局'
    },
    {
        'Title': '更新信息v3.5.0',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.5.0 VD_20240706'
                   '\n\n主要更新：'
                   '\n1.「方块卡通」专属材质包，需要装载限免副包《免神-方块卡通》'
                   '\n2.新增了完整界面布局'
                   '\n3.新增了玩家游戏中延迟显示'
                   '\n3.新增了「编队系统」，现在可以进行编队快速切换角色'
                   '\n4.新增了「小地图系统」，可以在设置中开关'
                   '\n5.新增了「聊天系统」，还是半成品，未来将不使用原生聊天系统内容'
                   '\n6.新增了「菜单系统」，还是半成品，将不使用原生菜单系统内容'
                   '\n7.新增了「背包系统」，将不使用原生背包系统内容'
                   '\n8.新增了「活动系统」，可以关注一些活动公告、签到等'
                   '\n9.新增了「手册系统」，但暂未开放'
                   '\n10.新增了「教程系统」，但暂未开放'
                   '\n11.新增了「体力系统」，但暂未开放'
                   '\n\n次要更新：'
                   '\n1.修复了联机状态下抽卡界面异常的问题'
                   '\n2.修复了启动界面logo丢失的问题'
                   '\n3.新增角色切换使用的音效'
    },
    {
        'Title': '更新信息v3.4.1',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.4.1 VD_20240627'
                   '\n\n角色更新：'
                   '\n1.「流光萤火」 加入「免神」，需要装载限免副包《免神-副包-流光萤火》后通过角色招募获取'
                   '\n\n主要更新：'
                   '\n1.优化了包体、代码逻辑，减少崩溃现象的发生'
                   '\n2.中画质移除了动态加载界面内容'
                   '\n3.「镜月之流」突破开启，需等待7月份镜月之流副包更新'
                   '\n\n次要更新：'
                   '\n1.修复了角色列表显示异常的问题'
                   '\n2.修复了角色升级界面显示异常的问题'
                   '\n3.修复了1.20由于mojang更新导致的手持物品异常显示的问题'
                   '\n4.修复了联机状态角色显示异常的问题'
    },
    {
        'Title': '更新信息v3.4.0',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.4.0 VD_20240619'
                   '\n\n角色更新：'
                   '\n1.「镜月之流」 加入「免神」，需要装载限免副包《免神-副包-镜月之流》后通过角色招募获取'
                   '\n\n主要更新：'
                   '\n1.修复了「幽蝶」角色的抗击退效果异常的问题'
                   '\n2.优化了战斗UI中的战技冷却条显示'
                   '\n3.修复了键鼠操作中战斗模式切换无效的问题'
                   '\n4.优化了战斗UI中的终极技能显示效果'
                   '\n5.优化了战斗命中机制'
                   '\n6.新增了终极技能充能效果'
    },
    {
        'Title': '更新信息v3.3.0',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.3.0 VD_20240614'
                   '\n\n主要更新：'
                   '\n1.「幽蝶」角色完善'
                   '\n2.「阿坤」角色完善，cv完善'
                   '\n3.新增角色防御力机制，可抵御伤害'
                   '\n4.新增角色暴击率、暴击伤害机制'
    },
    {
        'Title': '更新信息v3.2.0',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.2.0 VD_20240607'
                   '\n\n工作太累了哦！每周更新现在改为小更、大更交替更新，3.2.0更新之后尽量保证每周更新一个新角色！新角色有哪些可以去设置的开发者调试中看~'
                   '\n\n主要更新：'
                   '\n1.「阿坤」 加入「免神」，需要通过角色招募获取'
                   '\n2.同步上架电脑端'
                   '\n3.新增了角色受击音效，当受到的伤害达到10%%则播放'
                   '\n4.新增了「角色突破」，需要收集对应材料方可突破，创造模式默认无限材料'
                   '\n5.「高品质」动态加载启动界面'
                   '\n6.开放设置部分功能'
                   '\n\n次要更新：'
                   '\n1.修复了角色面板中点击升级再点击属性导致的界面重叠问题'
                   '\n2.修复了生存模式下角色升级未扣除背包物品的问题'
                   '\n3.修复了角色恢复时属性异常的问题'
                   '\n4.新增机制：变身角色后将提高击退抗性，防止攻击打断偏位影响游戏体验'
                   '\n5.优化了角色对话UI显示体验'
                   '\n6.修复了使用经验瓶升级经验无法增加反而倒退的问题'
                   '\n7.削弱了「幽蝶」的成长倍率'
    },
    {
        'Title': '更新信息v3.1.1',
        'Type': 'Update',
        # 设置要添加问号按钮
        'Content': '版本号：Release 3.1.1 VD_20240531'
                   '\n\n工作好累哦！周六休息一天，周日加班！肥免就赶工3.2.0更新！'
                   '\n\n主要更新：'
                   '\n1.新增「战斗面板」中的动态血条界面'
                   '\n2.「启动动画」'
                   '\n\n次要更新：'
                   '\n1.优化了「角色招募」界面动效，F币不足时直接跳转至获取面板'
                   '\n2.修复了非创造模式、非管理员仍然可直接获取F币的问题'
                   '\n3.调整了初始F币为1600'
    },
    {
        'Title': '更新信息v3.1.0',
        'Type': 'Update',
        # 设置要添加问号按钮.3.1.0更新视频让幽蝶cv来介绍 音效播放要调整，先stopsound
        # 设置还要有角色语音开关内容
        # 有经验书、突破材料
        'Content': '版本号：Release 3.1.0 VD_20240524'
                   '\n\n通宵加班一周，没有完成任务目标，只好把一些内容放到v3.1.1更新了，感谢各位小伙伴的耐心等待！'
                   '\n\n主要更新：'
                   '\n1.开放「角色升级」系统'
                   '\n2.开放「角色招募」系统，玩家需要自行招募获取角色，拥有管理员权限的玩家可自行扩充F币，否则需要通过击败怪物等方式获取'
                   '\n3.开放「设置」系统中「家」、「画质」'
                   '\n\n次要更新：'
                   '\n1.开放了布娃娃对话系统'
                   '\n2.新增了十字键操作UI外观'
                   '\n3.新增了角色展开面板中获取更多角色按钮，但未开放'
                   '\n4.修复了角色展开面板未显示玩家头像的问题'
                   '\n5.修复了角色游泳动作仍为移动的问题'
                   '\n6.修复了角色第一人称新架构兼容异常的问题'
                   '\n7.调整了「幽蝶」角色配音'
                   '\n8.调整了「大肥免」角色资料信息'
                   '\n9.调整了「角色展示」中角色待机动作表现'
                   '\n10.优化了音效播放逻辑'
                   '\n11.优化了角色面板关闭逻辑'
    },
    {
        'Title': '更新信息v3.0.0',
        'Type': 'Update',
        'Content': '版本号：Release 3.0.0 VD_20240516'
                   '\n\n「次元助手2」的进一步迭代，故命名版本号以3.0.0起步。'
                   '\n\n部分功能由于处于移植不稳定期暂未开放！！！如「角色编队」、「角色招募」系统。'
                   '\n\n主要更新：'
                   '\n1.重构「次元助手2」系列模组代码，采用最新「DFM架构3.0」，MOD优化提高45%%'
                   '\n2.全新「灵动交互」，UI设计逻辑、交互逻辑焕然一新，带来更好的体验'
                   '\n3.全新「虹彩插画」，专业画师纯手绘插画，如本模组角色面板背景(为了兼容低配机、极大的压缩了分辨率)'
                   '\n4.全新「天籁配音」，专业CV、配音室。游玩角色时可以享受更好的游戏体验'
                   '\n5.新角色「幽蝶」加入「免神」'
                   '\n\n次要更新：'
                   '\n1.新增了左下角模组版本信息'
                   '\n\n未来更新：'
                   '\n1.同步「次元助手2」系列角色更新至「免神」版'
                   '\n2.同步「次元助手2」手柄、键盘兼容及PC端上架'
                   '\n3.开放「角色升级」系统'
                   '\n4.开放「角色编队」系统'
                   '\n5.开放「角色招募」系统'
                   '\n6.开发「能力升级」系统'
                   '\n7.开发「模组设置」更好的调配模组玩法'
                   '\n8.适配「创世神」场景、剧情底层架构'
                   '\n\n感谢各位小伙伴们的支持！还请动动小手给个5鸡腿好评叭！'
    },
    {
        'Title': '大肥免开发组的话',
        'Type': 'Update',
        'Content': '我们认为，开发的模组首要目标是能够让更多玩家游玩，而为了照顾无支付能力条件的玩家，因此将本原定模组价格为1000钻石的模组改为限时免费！'
                   '\n\n我们相信，好的模组就算限免了也能够为我们带来足够的回报支持！'
                   '\n\n模组将采用主包收费、副包常规角色免费、限时免费的形式发布，随着副包数量的增多，主包价格将会提升！即购买主包的小伙伴不用再担心新角色副包收费掏空口袋啦！'
                   '\n\n感谢各位小伙伴们的支持！还请动动小手给个5鸡腿好评叭！'
    }
]
```

## 玩家数据存储配置
```python
DefaultGlobalConfigDict = {
    'HeadIcon': 'player',
    'ImgLevel': '中品质',
    'IsStartAnim': False,
    'RenderList': ['player', 'dafeimian'],
    'RenderData': {
        'player': {
            'RenderLevel': 1,
            'BreakthroughLevel': 0,
            'RenderExp': 0
        }
    },
    'FeiCoin': 0,
    'ItemList': {},
    'Settings': {},
    'WishTimes': 0,
    # 红点
    'Render': [],
    'Pack': [],
    'Rank': [],
    'ChouKa': [],
    'Book': [],
    'JiXing': [],
    'HuoDong': []
}
```

## 全局配置
```python
# coding=utf-8
from renderlist import RenderList
from settinglistdict import SettingListDict, OptionsDict
from updateinfolist import UpDateInfoList
from localconfigdict import DefaultLocalConfigDict, DefaultGlobalConfigDict
from wishdictlist import WishDictList
from itemdict import ItemDict
from chat.diaolingkulou import ChatDict as diaolingkulou

class GlobalConfig:
    Release = 'Release'
    Version = '3.7.5'
    Date = '20241015'
    UIName = 'cyzs3'
    UIMainName = 'cyzs3_main'
    UIPackName = 'dfm_pack'
    UIMapName = 'dfm_map'
    UIHuoDongName = 'dfm_huodong'
    OtherUINameList = ['cyzs3_main']
    RenderSpace = 'cyzs3'
    ConfigDataName = 'cyzs3'
    NameSpace = 'dfm'
    RenderIconDemoName = 'rendericon_demo'
    RenderLineDemoName = 'renderline_demo'
    RenderBigIconDemoNameList = ['icon_big_left', 'icon_big_meddle', 'icon_big_right']
    RenderButtonPath = '/all/render'
    ModeButtonPath = '/all/leftup/mode'
    ContentPath = '/all/content'
    VersionPath = '/all/version'
    LocalClosePath = '/close'
    LocalBackPath = '/back'
    LocalRenderListBgPath = '/left/icon/bg'
    LocalRenderListButtonPath = '/left/icon/render'
    LocalBackGroundImagePath = '/bg'
    LocalEntityInputPanelPath = '/right/entity_input_panel'
    LocalNetEasePaperDollPath = '/right/entity_input_panel/entity_paper_doll'
    LocalSkeletonModelPaperDollPath = '/right/entity_input_panel/skeleton_paper_doll'
    LocalNetEasePaperDollInputPanelPath = '/right/entity_input_panel'
    LocalRenderIconsScrollViewPath = '/left/icon/scroll_view'
    LocalRenderIconsBigScrollViewPath = '/left/icon_big'
    RealLocalRenderIconsBigScrollViewPath = '/left/icon_big/scroll_view_big'
    LocalInfoListPath = '/left/info'
    LocalInfoListScrollViewPath = '/left/info/scroll_view_info'
    LocalInfoTextScrollViewPath = '/right/infotext'
    LocalLocalCVNamePath = '/down/label/value'
    LocalInfoTextPath = '/right/infotext'
    LocalRightLeftPath = '/right/left'
    LocalRightRightPath = '/right/right'
    LocalRightNamePath = '/right/name'
    LocalScrollViewListPath = '/list'
    LocalRenderSmallNamePath = '/right/name'
    LocalRenderBigNamePath = '/right/right/up/name'
    LocalAdvancePanelPath = '/right/right/advance'
    LocalRenderInfoPath = '/right/right/label'
    LocalRenderUsePath = '/right/use'
    LocalRenderUpdatePath = '/right/update'
    LocalRenderRankPath = '/right/rank'
    LocalRenderResetPath = '/reset'
    LocalTipsLabelPath = '/tips/button_label'
    LocalTipsPath = '/tips'
    LocalWishPath = '/wish'
    LocalUpdatePath = '/update'
    LocalSettingPath = '/setting'
    LocalRenderListPath = '/left/icon/render'
    GyroReportRate = 120
    GyroLimit = 50
    GyroMagnification = 1.5
    LocalRenderStackPanelPath = '/right/left/stack_panel'
    LocalLocalStackPanelButtonPath = '/button'
    RenderStackPanelList = ['shuxing', 'wuqi', 'fangkuai', 'hexin', 'nengli', 'ziliao']
    RenderAttrKeyList = ['health', 'damage', 'defence', 'baoji', 'baojishanghai']
    LocalRenderAttrPanelPath = '/right/right/downlist'
    Tips = [
        '你知道吗？免神设置界面会根据时间变化。',
        'amagi'
    ]
    LevelPathDict = {
        1: 'textures/ui/commonUI/level/1',
        2: 'textures/ui/commonUI/level/2',
        3: 'textures/ui/commonUI/level/3',
        4: 'textures/ui/commonUI/level/4',
        5: 'textures/ui/commonUI/level/5'
    }
    LevelColorRGBDict = {
        1: (103.0 / 255.0, 93.0 / 255.0, 120.0 / 255.0),
        2: (77.0 / 255.0, 163.0 / 255.0, 111.0 / 255.0),
        3: (93.0 / 255.0, 115.0 / 255.0, 195.0 / 255.0),
        4: (143.0 / 255.0, 97.0 / 255.0, 196.0 / 255.0),
        5: (237.0 / 255.0, 180.0 / 255.0, 71.0 / 255.0)
    }

    class HuoDong:
        HuoDongDictList = [
            {
                'Id': 'shouyuezengli',
                'StartDate': (2024, 9, 10, 0, 0),
                'EndDate': (2024, 9, 31, 0, 0)
            },
            {
                'Id': 'sanbei',
                'StartDate': (2024, 8, 1, 0, 0),
                'EndDate': (2024, 8, 31, 0, 0)
            },
            {
                'Id': 'wukexiou',
                'StartDate': (2024, 8, 1, 0, 0),
                'EndDate': (2024, 8, 11, 0, 0)
            },
            {
                'Id': 'heishenhua',
                'StartDate': (2024, 9, 1, 0, 0),
                'EndDate': (2024, 10, 31, 0, 0)
            }
        ]
        # 一个活动界面，需要背景图片、交互界面、列表界面面板
        HuoDongPath = '/all/huodong'
        CloseButtonPath = '/all/huodong/content/close'
        PicturesPath = '/all/huodong/content/pictures'
        ListScrollViewPath = '/all/huodong/content/left/list'
        LocalHuoDongListButtonPath = '/content/button'

        # 首月赠礼
        ShouYueZengLiContentPath = '/all/huodong/content/right/shouyuezengli/content'
        LocalLingJiangButtonPath = '/button'
        LocalLingJiangLabelPath = '/button/button_label'

    class Pack:
        PackPath = '/all/pack'
        PackBgPath = '/all/pack/bg'
        PackNumPath = '/all/pack/content/right/num'
        PackAnimInfoPath = '/all/pack/content/right/iteminfo'
        CloseButtonPath = '/all/pack/content/close'
        ListButtonListPath = ['yangchengcailiao', 'wuqi', 'fangkuai', 'qitacailiao', 'renwu', 'xiaohaopin', 'guizhongwu']
        PackListNamePath = '/all/pack/content/left/up/icon/name/listname'
        ContentScrollViewPath = '/all/pack/content/right/content'
        LocalItemIconPath = '/image/icon'
        LocalItemNumPath = '/bg/label'
        LocalItemLevelPath = '/image'
        LocalItemButtonPath = '/button'
        InfoScrollViewPath = '/all/pack/content/right/iteminfo'
        LocalItemInfoNamePath = '/title'
        LocalItemInfoLevelLinePath = '/line/downline'
        LocalItemInfoLevelPath = '/content/bg'
        LocalItemInfoIconPath = '/content/icon'
        LocalItemInfoTagPath = '/content/subtitle'
        LocalItemInfoNumPath = '/content/num'
        LocalItemInfoInfoPath = '/info'
        LocalItemInfoStoryPath = '/story'
        LocalItemInfoButtonDemoPath = '/buttondemo'
        LocalItemInfoButtonDemoTitlePath = '/content/button/title'

        GetItemPath = '/all/getitems'
        GetItemIconListPath = '/all/getitems/items'
        GetItemIconDemoPath = '/all/getitems/items/demo'
        LocalGetItemLevelPath = '/image'
        LocalGetItemIconPath = '/image/icon'
        LocalGetItemNumPath = '/bg/label'
        LocalGetItemButtonPath = '/button'
        GetItemButtonPath = '/all/getitems/button'
        GetItemTxPath = '/all/getitems/tx'
        GetItemAnimPanelPath = '/all/getitems/icon'
        GetItemAnimBgPath = '/all/getitems/panelbg'

        ItemInfoPath = '/all/iteminfo'
        ItemInfoContentPath = '/all/iteminfo/content'
        ItemInfoCloseButtonPath = '/all/iteminfo/content/close'
        ItemInfoContentScrollViewPath = '/all/iteminfo/content/right/content'
        ItemInfoNumPath = '/all/iteminfo/content/left/num'
        ItemInfoIconPath = '/all/iteminfo/content/left/image/icon'
        ItemInfoLevelPath = '/all/iteminfo/content/left/image'
        ItemInfoTypePath = '/all/iteminfo/content/left/type'
        ItemInfoNamePath = '/all/iteminfo/content/right/label'

        TitlePath = '/all/title'
        TitleButtonPath = '/all/title/button'
        TitleContentAnimPath = '/all/title/content'
        TitleUpLineAnimPath = '/all/title/content/upline_new'
        TitleDownLineAnimPath = '/all/title/content/downline'
        TitleTxAnimPath = '/all/title/content/icon_anim/tx'
        TitleLabelPath = '/all/title/content/title'
        TitleSubLabelPath = '/all/title/content/title/subtitle'

        TypeDict = {
            'yangchengcailiao': '养成材料',
            'wuqi': '武器',
            'fangkuai': '方块',
            'qitacailiao': '其他材料',
            'renwu': '任务物品',
            'xiaohaopin': '消耗品',
            'guizhongwu': '贵重物品'
        }

    class Rank:
        RankEditPath = '/all/rankedit'
        RankCloseButtonPath = '/all/rankedit/close'
        RankUseButtonPath = '/all/rankedit/use'
        RankQuickButtonPath = '/all/rankedit/quick'
        LocalPaperDollPath = '/netease_paper_doll'
        LocalNamePanelPath = '/panel'
        LocalNamePath = '/panel/name'
        LocalLevelPath = '/level'
        LocalAddButtonPath = '/add'
        LocalAddImagePath = '/image'

        RankListPath = '/all/rank_list/list'
        LocalRenderIconPath = '/icon'
        LocalRenderNamePath = '/icon/name'
        LocalRenderHealthPath = '/icon/health'
        LocalSelectButtonPath = '/select'
        LocalBiShaJiButtonPath = '/bishaji'
        LocalEnergyPath = '/bishaji/energy'
        LocalBiShaJiTxButtonPath = '/bishaji/image'

    class MenuUI:
        # 每刷新一次红点，给LenNum加一
        MenuKeyDictList = [
            {
                'Key': 'Render',
                'Button': 'render',
                'LenNum': 1
            },
            {
                'Key': 'Pack',
                'Button': 'pack',
                'LenNum': 0
            },
            {
                'Key': 'Rank',
                'Button': 'rank',
                'LenNum': 0
            },
            {
                'Key': 'ChouKa',
                'Button': 'chouka',
                'LenNum': 1
            },
            {
                'Key': 'Book',
                'Button': 'book',
                'LenNum': 0
            },
            {
                'Key': 'JiXing',
                'Button': 'jixing',
                'LenNum': 0
            },
            {
                'Key': 'HuoDong',
                'Button': 'huodong',
                'LenNum': 3
            }
        ]
        RankButtonPath = '/all/rank'
        WishButtonPath = '/all/chouka'
        BookButtonPath = '/all/book'
        JiXingButtonPath = '/all/jixing'
        HuoDongButtonPath = '/all/huodong'
        PackButtonPath = '/all/pack'
        MenuButtonPath = '/all/leftup/exit'
        RenWuButtonPath = '/all/leftup/renwu'
        MsgButtonPath = '/all/leftup/msg'
        YinDaoButtonPath = '/all/leftup/yindao'

    class MainUI:
        HealthProgressPath = '/all/down/health'
        HealthDarkProgressPath = '/all/down/health/health_dark'
        LevelPath = '/all/down/level'
        HealthValuePath = '/all/down/health_value'
        StartPanelPath = '/start'
        StartLogo1Path = '/start/logo1'
        StartLogo2Path = '/start/logo2'
        StartButtonPath = '/start/button'
        StartLabelPath = '/start/label'
        StartWhitePath = '/start/white'
        StartWhiteAnimPath = '/start/white_anim'
        StartBgPath = '/start/bg'
        StartBgAnimPath = '/start/bg_anim'
        StartVideoPath = '/start/video'
        MessagePath = '/message'

    class InteractAndChat:
        InteractScrollViewPath = '/all/interact'
        ChatPath = '/all/chat'
        ChatContinueButtonPath = '/all/chat/button'
        ChatContentPath = '/all/chat/content'
        ChatNamePath = '/all/chat/name'
        ChatIconPath = '/all/chat/icon'
        ChatList = [diaolingkulou]

    class Item:
        ItemDict = ItemDict

    class Wish:
        NormalWishList = ['diaolingkulou', 'ji']
        WishDictList = WishDictList
        WishPath = '/all/wish'
        LocalCloseButtonPath = '/content/close'
        LocalInfoButtonPath = '/content/right/info'
        LocalWish10ButtonPath = '/content/right/wish10'
        LocalWish1ButtonPath = '/content/right/wish1'
        LocalFeiCoinValuePath = '/content/right/FeiCoin/value/value'
        LocalTuTuPiaoValuePath = '/content/right/tutupiao/value/value'
        LocalWishTimesValuePath = '/content/right/wishtimes/value/value'
        LocalRightImagePath = '/right/image'
        LocalInfoImagePath = '/content/info'
        LocalLeftPath = '/content/left'
        LocalRightPath = '/content/right'
        LocalWish1Path = '/reward/1'
        LocalWish1IconPath = '/reward/1/icon'
        LocalWish1CloseButtonPath = '/reward/1/button'
        LocalWish10CloseButtonPath = '/reward/10/button'
        LocalWish10Path = '/reward/10'
        LocalWish10TypeList = ['item', 'render']
        LocalWish10StackPanelPath = '/reward/10/stack_panel'
        #
        WishListScrollViewPath = '/all/wish/content/left/list'
        WishListNamePath = '/all/wish/content/left/up/icon/name/listname'

    class Settings:
        DefaultSettingId = 'game'
        OptionsDict = OptionsDict
        SettingIdNameDict = {
            'game': '游戏',
            'img': '图像',
            'sound': '音效',
            'fight': '战斗',
            'other': '其他',
            'dev': '开发者调试'
        }
        LockedSettingKeyList = [
            # 'CtrlMode',
            'IsMap',
            'IsRank',
            'IsGyro',
            'IsOnlineSfx',
            'IsRenderSound',
            'IsSelectTarget',
            'IsMotion',
            'IsSpawnRender',
            'GlobalData'
            # 'IsStartAnim'
        ]
        SettingListDict = SettingListDict
        SettingPath = '/all/setting'
        LocalSettingBgPath = '/bg'
        LocalClosePath = '/content/close'
        LocalSettingListPath = '/content/left/list'
        LocalSettingListButtonPath = '/content/button'
        LocalSettingListNamePath = '/content/right/label'
        LocalSettingListIconBgPath = '/content/left/bg'
        LocalSettingNamePath = '/content/left/up/icon/name/listname'
        LocalSettingContentPath = '/content/right/scroll_view'
        CloneLocalSettingContentListButtonPath = '/content/button'
        CloneLocalSettingContentListOncePath = '/content/button/Once'
        CloneLocalSettingContentTipsButtonPath = '/content/button/title/tip'
        LocalTipsPath = '/tips'
        LocalTipsTitlePath = '/tips/content/title'
        LocalTipsScrollViewPath = '/tips/content/content'
        LocalTipsTextPath = '/tips/content/text'
        LocalTipsCloseButtonPath = '/tips/button'
        CloneLocalSettingTipsTitlePath = '/content/button/label'
        CloneLocalSettingTipsButtonPath = '/content/button'

    class UseItemPath:
        LocalUseItemNumPath = '/right/updatepanel/usenum/buttonnum/num/value'
        LocalItemListPath = '/right/updatepanel/items'
        LocalAddItemNumPath = '/right/updatepanel/usenum/buttonnum/num/add'
        LocalRemoveItemNumPath = '/right/updatepanel/usenum/buttonnum/num/remove'
        LocalSliderPath = '/right/updatepanel/usenum/slidernum/slider'
        LocalNumPanelPath = '/right/updatepanel/usenum'
        LocalUseItemButtonLabelPath = '/right/useupdate/button_label'
        LocalNumPanelTitlePath = '/right/updatepanel/title'
        CloneLocalItemPaIconPath = '/content/mc_icon'
        CloneLocalItemIconPath = '/content/icon'
        CloneLocalItemIconButtonPath = '/content/button'

    class RenderAttrPath:
        LocalHealthPath = '/right/right/downlist/health/value'
        LocalDamagePath = '/right/right/downlist/damage/value'
        LocalDefencePath = '/right/right/downlist/defence/value'
        LocalBaiJiPath = '/right/right/downlist/baoji/value'
        LocalBaoJiShangHaiPath = '/right/right/downlist/baojishanghai/value'
        LocalLevelPath = '/right/right/level/value'
        LocalExpPath = '/right/right/exp'
        LocalUpdatePath = '/right/right/update'
        LocalAddExpValuePath = '/right/right/exp/addvalue'

    class AnimPath:
        LocalPaperDollPath = '/right/anim_paperdoll'
        LocalAdvancementPath = '/left/icon/advancement/icon'
        LocalNamePath = '/right/name'
        LocalLeftMenuListPath = '/right/left/stack_panel'
        LocalRightInfoPath = '/right/right'
        LocalRightUpdateButtonPath = '/right/update'
        LocalRightUpdatePanelButtonPath = '/right/updatepanel'
        LocalRightUseUpdateButtonPath = '/right/useupdate'
        LocalRightUseButtonPath = '/right/use'
        LocalRightRankButtonPath = '/right/rank'
        BlackImagePath = '/all/black'
        LocalLeftBigIconPath = '/left/icon_big'

    class NoneText:
        InfoTitle = 'amagi'
        InfoContent = '这个角色还没有资料信息哦~'
        CV = '无'

    class AttackControl:
        ModeList = [0, 1, 2, 3]
        BasePath = '/all/CtrlMode'
        AttackButtonPath = '/attack'
        #
        LocalSkillButtonPath = '/skill'
        LocalPuGongButtonPath = '/pugong'
        LocalJumpButtonPath = '/jump'
        LocalShanBiButtonPath = '/shanbi'
        LocalBiShaJiButtonPath = '/bishaji'
        LocalCommonPlayerBehaviorList = [LocalSkillButtonPath, LocalPuGongButtonPath, LocalShanBiButtonPath, LocalBiShaJiButtonPath]
        #
        BehaviorName = {
            'skill': 'PlayerSkill',
            'pugong': 'PlayerAttack',
            'shanbi': 'PlayerShanBi',
            'bishaji': 'PlayerBiShaJi'
        }

    class Ping:
        PingValuePath = '/all/render/ping/value'
        PingIconPath = '/all/render/ping/value/icon'
        PingTypePath = 'textures/ui/defaultUI/ping/'

    # 使用物品信息
    UseItemDict = {
        'minecraft:experience_bottle': {
            'Exp': 20000,
            'Type': 'MinecraftItem',
            'Level': 4
        },
        # 'minecraft:iron_block': {
        #     'Exp': 500,
        #     'Type': 'MinecraftItem',
        #     'Level': 3
        # },
        # 'minecraft:diamond_block': {
        #     'Exp': 2000,
        #     'Type': 'MinecraftItem',
        #     'Level': 4
        # },
        'minecraft:wither_rose': {
            'Level': 2
        },
        'minecraft:soul_sand': {
            'Level': 3
        },
        'minecraft:skull': {
            'Level': 4
        },
        'minecraft:egg': {
            'Level': 2
        },
        'minecraft:wheat_seeds': {
            'Level': 2
        },
        'minecraft:hay_block': {
            'Level': 3
        },
        'minecraft:cake': {
            'Level': 4
        },
        'minecraft:glowstone_dust': {
            'Level': 2
        },
        'minecraft:campfire': {
            'Level': 3
        },
        'minecraft:blaze_powder': {
            'Level': 3
        },
        'minecraft:emerald': {
            'Level': 4
        }
    }

    #
    MaxLevel = [20, 40, 50, 60, 70, 80, 90]

    # 元素名
    DamageTypeDict = {
        'Dark': '暗',
        'Fire': '火',
        'Ice': '冰',
        'Grass': '草',
        'Light': '电',
        'Physics': '无',
        'Stone': '土',
        'Water': '水',
        'Wind': '风'
    }
    # RGB
    TypeDict = {
        "Fire": (1, 0.4, 0, 1),
        "Water": (0, 0.8, 1, 1),
        "Light": (0.7, 0.4, 1, 1),
        "Ice": (0.6, 1, 1, 1),
        "Wind": (0, 1, 0.8, 1),
        "Stone": (1, 0.9, 0, 1),
        "Grass": (0, 1, 0, 1),
        "Physics": (1, 1, 1, 1),
        "Dark": (0.12, 0, 0.18, 1)
    }
    # common animations and animation controllers
    RenderDefaultAnimations = [
        'animation.cyzs3.common'
    ]
    RenderAnimations = [
        'walk', 'sprint', 'idle', 'sneak', 'sneak_idle', 'fall', 'swim', 'scale', 'no_weapon', 'first_person_idle'
        # 'attack_xl', 'attack_zj', 'bishaji'
    ]
    AnimationControllers = [
        'controller.animation.cyzs3.scale',
        'controller.animation.cyzs3.weapon',
        'controller.animation.cyzs3.states'
    ]
    RenderController = 'controller.render.cyzs3'
    RenderMaterial = 'entity_alphatest_dfm_mb'
    LocalRenderGeometry = 'geometry.'
    LocalRenderTexturePath = 'textures/entity/'
    PlayerDefaultRenderControllers = [
        'controller.render.player.third_person',
        'controller.render.player.first_person',
        'controller.render.player.map'
    ]
    # 这个是玩家的本地数据，还有每个角色有每个角色的数据情况
    DefaultLocalConfigDict = DefaultLocalConfigDict
    DefaultGlobalConfigDict = DefaultGlobalConfigDict
    UpDateInfoList = UpDateInfoList


EmojiList = []


def GetRenderDict(RenderId):
    # type: (str) -> dict
    """获取角色Dict
    :param RenderId: 角色Id
    """
    for OneRenderDict in RenderList:
        if OneRenderDict['Identifier'] == RenderId:
            return OneRenderDict

def ClientGetRenderDict(RenderId):
    MainPackModName = 'cyzs3'
    MainPackClientSystem = 'cyzs3ServerSystem'

```