---
title: 30分钟开发技能角色
order: 1
toc: content
group:
  title: 其他
  order: 6
---
:::error{title=提示}
尚未编写。该功能为使用简单的Json配置，即可轻松实现高级功能。
:::
:::info{title=注意}
规范的json文件是不包含下面示例这样的注释！
:::


## 示例
```json
{
  "format_version": "3.1.0",
  "dafeimian:render": {
    // 描述信息
    "description": {
      "identifier": "ailian",
      "name": "鲨鱼妹妹",
      "level": 5,
      "cv": "魏婴",
      "modname": "ailian",
      "client_system": "ailianClientSystem", 
      "server_system": "ailianServerSystem", 
      "info": "维多家政公司\ncv:魏婴",
      "damage_type": "Ice"
    },
    // 继承主包
    "inheritance": {
      "dafeimian:is_player_attack": {
        "value": false
      },
      "dafeimian:is_player_attacksound": {
        "value": true
      },
      "dafeimian:is_animation_controller": {
        "value": true
      },
      "dafeimian:is_player_bishaji": {
        "value": false
      },
      "dafeimian:is_player_skill": {
        "value": false
      },
      "dafeimian:is_player_shanbi": {
        "value": true
      }
    },
    // 组件
    "components": {
      "dafeimian:is_debug": {
        "is_debug_render": true,
        "debug_material": "entity_alphatest_netease"
      },
      "dafeimian:is_locked": {
        "is_locked": false,
        "cause": "加班一周，通宵了，实在赶不赢，希望理解，下次开放！"
      },
      "dafeimian:entity": {
        "animations": [
          "newidle", 
          "skill", 
          "third_person_skill", 
          "bishaji", 
          "third_person_bishaji", 
          "pose2", 
          "third_person_pose2", 
          "super_sprint_start", 
          "super_sprint_idle", 
          "super_sprint_stop", 
          "third_person_super_sprint_start", 
          "third_person_super_sprint_idle", 
          "third_person_super_sprint_stop"
        ],
        "animation_controllers": [],
        "render_controllers": [
          "controller.render.al"
        ],
        "material_by_render_controller": [
          {
            "Value": "dfm_al_hs_leg", 
            "Key": "al_hs"
          }, 
          {
            "Value": "dfm_al_hs_legup", 
            "Key": "al_hs_up"
          }
        ],
        "material": "entity_alphatest_netease"
      },
      "dafeimian:attack": {
          "attack_times": 4,
          "reset_timer": 1.5,
          "attack_dict": {
            "1": {
              "AttackTimer": 0.63, 
              "ResetTimer": 2.0, 
              "SoundName": "ailian_dao", 
              "DamageTimerList": [
                0.33
              ], 
              "DamagePercent": 0.35, 
              "SfxDict": [], 
              "RenderSoundName": "ailian_attack2", 
              "MotionPercent": [
                0.35, 
                0.35
              ], 
              "Radius": 5, 
              "SoundTimerList": [
                0
              ], 
              "BetweenAngle": 120.0
            }, 
            "2": {
              "AttackTimer": 1, 
              "ResetTimer": 2.33, 
              "SoundName": "ailian_dao", 
              "DamageTimerList": [
                0.61, 
                0.71, 
                0.88, 
                0.96, 
                1.04
              ], 
              "DamagePercent": 0.3, 
              "SfxDict": [], 
              "RenderSoundName": "ailian_attack2", 
              "MotionPercent": [
                0.45, 
                0.45
              ], 
              "Radius": 5, 
              "SoundTimerList": [
                0.5
              ], 
              "BetweenAngle": 120.0
            }, 
            "3": {
              "AttackTimer": 1.54, 
              "ResetTimer": 1.46, 
              "SoundName": "ailian_dao3", 
              "DamageTimerList": [
                0.42, 
                0.46, 
                0.54, 
                0.63, 
                0.71, 
                0.75, 
                0.8, 
                0.92, 
                1.0, 
                1.05, 
                1.1, 
                1.15, 
                1.2, 
                1.25, 
                1.3
              ], 
              "DamagePercent": 0.4, 
              "SfxDict": [], 
              "RenderSoundName": "ailian_attack2", 
              "MotionPercent": [
                0.2, 
                0.2
              ], 
              "Radius": 12.5, 
              "SoundTimerList": [
                0.53
              ], 
              "BetweenAngle": 120.0
            }, 
            "4": {
              "AttackTimer": 0.05, 
              "ResetTimer": 0.05, 
              "SoundName": "None", 
              "DamageTimerList": [], 
              "DamagePercent": 0.0, 
              "SfxDict": [], 
              "RenderSoundName": "None", 
              "MotionPercent": [
                0, 
                0
              ], 
              "Radius": 8.5, 
              "SoundTimerList": [
                0.33
              ], 
              "BetweenAngle": 60.0
            }, 
            "bishaji": {
              "AttackTimer": 3.0, 
              "ResetTimer": 0.15, 
              "SoundName": "ailian_bishaji2", 
              "DamageTimerList": [
                1.0, 
                1.05, 
                1.1, 
                1.15, 
                1.2, 
                1.25, 
                1.3, 
                1.35, 
                1.4, 
                1.45, 
                1.5, 
                1.55, 
                1.6, 
                1.63
              ], 
              "DamagePercent": 3.0, 
              "SfxDict": [], 
              "Energy": 20, 
              "RenderSoundName": "None", 
              "MotionPercent": [
                0, 
                0
              ], 
              "Radius": 10.0, 
              "Perspective": 1, 
              "SoundTimerList": [
                0.5
              ], 
              "BetweenAngle": 120.0
            }, 
            "skill": {
              "AttackTimer": 1.5, 
              "ResetTimer": 0.1, 
              "SoundName": "ailian_skill", 
              "DamageTimerList": [
                1.08
              ], 
              "DamagePercent": 0.65, 
              "SfxDict": [
                {
                  "FaceCamara": false, 
                  "Scale": [
                    3.5, 
                    2.5, 
                    2.5
                  ], 
                  "SfxId": "ailian_attack", 
                  "Rot": [
                    -30, 
                    -10, 
                    45
                  ], 
                  "Offset": [
                    -1, 
                    -0.5, 
                    0
                  ]
                }, 
                {
                  "FaceCamara": false, 
                  "Scale": [
                    3, 
                    3, 
                    3
                  ], 
                  "SfxId": "ailian_attack", 
                  "Rot": [
                    -100, 
                    -10, 
                    45
                  ], 
                  "Offset": [
                    0, 
                    -0.5, 
                    0
                  ]
                }, 
                {
                  "FaceCamara": false, 
                  "Scale": [
                    3, 
                    3, 
                    3
                  ], 
                  "SfxId": "ailian_attack", 
                  "Rot": [
                    -30, 
                    0, 
                    45
                  ], 
                  "Offset": [
                    0, 
                    -0.5, 
                    0
                  ]
                }, 
                {
                  "FaceCamara": false, 
                  "Scale": [
                    3, 
                    3, 
                    3
                  ], 
                  "SfxId": "ailian_attack", 
                  "Rot": [
                    -30, 
                    10, 
                    45
                  ], 
                  "Offset": [
                    0, 
                    -0.5, 
                    0
                  ]
                }, 
                {
                  "FaceCamara": true, 
                  "Scale": [
                    15, 
                    15, 
                    15
                  ], 
                  "SfxId": "ailian_skill", 
                  "Rot": [
                    -30, 
                    10, 
                    45
                  ], 
                  "Offset": [
                    -3, 
                    5, 
                    0
                  ]
                }, 
                {
                  "FaceCamara": true, 
                  "Scale": [
                    3, 
                    3, 
                    3
                  ], 
                  "SfxId": "ailian_boom", 
                  "Rot": [
                    -30, 
                    10, 
                    45
                  ], 
                  "Offset": [
                    -2.9, 
                    -0.5, 
                    0
                  ]
                }, 
                {
                  "FaceCamara": true, 
                  "Scale": [4, 4, 4], 
                  "SfxId": "ailian_boom2", 
                  "Rot": [-30, 10, 45
                  ], 
                  "Offset": [-2.6, -0.5, 0]
                }
              ], 
              "RenderSoundName": "None", 
              "MotionPercent": [2, 2], 
              "Radius": 7.0, 
              "SoundTimerList": [0.0], 
              "ColdDownTimer": 4, 
              "BetweenAngle": 120.0
            }
          }
      },
      "dafeimian:sound": {
        "normal": "ailian_pose",  // 待机音效
        "beattacked": null  // 受击音效
      },
      "dafeimian:advance_item": {
        "value": [
          [
            {
              "Num": 5, 
              "Type": "Item", 
              "Id": "bingya"
            }, 
            {
              "Num": 1, 
              "Type": "Item", 
              "Id": "bingguan"
            }
          ], 
          [
            {
              "Num": 7, 
              "Type": "Item", 
              "Id": "bingya"
            }, 
            {
              "Num": 3, 
              "Type": "Item", 
              "Id": "bingguan"
            }
          ], 
          [
            {
              "Num": 10, 
              "Type": "Item", 
              "Id": "bingya"
            }, 
            {
              "Num": 5, 
              "Type": "Item", 
              "Id": "bingguan"
            }, 
            {
              "Num": 3, 
              "Type": "Item", 
              "Id": "bingjing"
            }
          ], 
          [
            {
              "Num": 15, 
              "Type": "Item", 
              "Id": "bingya"
            }, 
            {
              "Num": 8, 
              "Type": "Item", 
              "Id": "bingguan"
            }, 
            {
              "Num": 6, 
              "Type": "Item", 
              "Id": "bingjing"
            }, 
            {
              "Num": 3, 
              "Type": "Item", 
              "Id": "binghexin"
            }
          ], 
          [
            {
              "Num": 17, 
              "Type": "Item", 
              "Id": "bingya"
            }, 
            {
              "Num": 11, 
              "Type": "Item", 
              "Id": "bingguan"
            }, 
            {
              "Num": 9, 
              "Type": "Item", 
              "Id": "bingjing"
            }, 
            {
              "Num": 5, 
              "Type": "Item", 
              "Id": "binghexin"
            }
          ], 
          [
            {
              "Num": 21, 
              "Type": "Item", 
              "Id": "bingya"
            }, 
            {
              "Num": 14, 
              "Type": "Item", 
              "Id": "bingguan"
            }, 
            {
              "Num": 12, 
              "Type": "Item", 
              "Id": "bingjing"
            }, 
            {
              "Num": 9, 
              "Type": "Item", 
              "Id": "binghexin"
            }
          ]
        ]
      },
      "dafeimian:information": {
        "value": [
          {
            "Content": "受极端天气影响，开发组周五提前下班了", 
            "Type": "Sound", 
            "SoundName": "diaolingkulou_attack", 
            "Title": "尚未制作"
          }
        ]
      }
    }
  }
}
```