---
title: UI数据绑定
order: 20
group:
  title: 开发指南
  order: 3
---

## 效果展示
如图所示为季度mod西游：大闹天宫中图鉴的效果展示，下面我们将一步步拆解，通过一个demo复刻来详细介绍如何实现ui数据绑定

![](https://mc.163.com/dev/mcmanual/mc-dev/assets/img/fenye.41cbc467.gif)

## toggle控件
toggle控件继承自原版的common.toggle，可以理解为开关或者选项控件，可用于设置中的单选、复选。其中我们是选用单选toggle来实现分页效果。具体mod及源码可参考示例中的DataBindingMod。

## stack_grid控件
该控件结合了stack_panel和grid，可以理解它就是一个一维（或横向扩展或纵向扩展）的grid。通过绑定collection可以快速实现类似记分牌、列表展示等功能。本例中三级分页tab列表便采用了该控件。

## UI节点树
实际上在本例中，红框中的三个部分都采用了toggle，实现了三级分页效果：

![](https://mc.163.com/dev/mcmanual/mc-dev/assets/img/tujian_tab.5f02240c.png)

整体UI的节点树如下所示：

- guideBookPanel 根目录
    - bookToggleGroup 一级分页
        - 生物图鉴
        - 物品图鉴
    - guidePanelWrap 中间panel的根节点，生物图鉴和物品图鉴对应的是两个panel，根据当前选择的tab来显示对应panel并隐藏另一个panel
        - monsterHeaderContentPanel 生物图鉴panel
            - monsterToggleGroup 二级分页
                - 被动生物
                - 中立生物
                - 攻击生物
                - 可驯服
        - monsterGuideContentLeft 左半边panel，用于scrolling_panel展示三级分页
            - monsterToggleGrid 三级分页，通过stack_grid实现动态数据绑定的三级分页列表
                - monsterToggleBtn 三级分页tab的模板控件
        - monsterGuideContentRight 右半边panel，用于展示三级分页的详细内容，实现细节与本文内容无关，不做详细介绍，可根据自己需求进行修改
    - itemHeaderContentPanel 物品图鉴panel
        - ...物品图鉴结构同生物图鉴，不做重复介绍

## 具体用例
### tab分页的简单实现
上述效果展示中的例子，因为是一个三级分页，我们分两部分来介绍，首先来介绍一下第一级和第二级这种固定的分页，以第二级的tab为例，其json代码如下：

```json
{
    "namespace": "guideBookUI",
	"locationToggleGroup": {
        "anchor_from": "top_middle",
        "anchor_to": "top_middle",
        "type": "stack_panel",
        "orientation": "horizontal", // 扩展方向，默认是垂直，这里我们需要水平
        "layer": 1,
        "size": [ "100%", 22 ],
        "controls": [
            {
                "toggle0@guideBookUI.typeToggleBtn": {
                    "$buttonLabel": "被动生物",
                    "$toggle_group_forced_index": 0
                }
            },
            {
                "content_padding_1": {
                   "size" : [ 4, "100%" ],
                   "type" : "panel"
                }
            },
            {
                "toggle1@guideBookUI.typeToggleBtn": {
                    "$buttonLabel": "中立生物",
                    "$toggle_group_forced_index": 1
                }
            },
            {
                "content_padding_2": {
                   "size" : [ 4, "100%" ],
                   "type" : "panel"
                }
            },
            {
                "toggle2@guideBookUI.typeToggleBtn": {
                    "$buttonLabel": "攻击生物",
                    "$toggle_group_forced_index": 2
                }
            },
            {
                "content_padding_3": {
                   "size" : [ 4, "100%" ],
                   "type" : "panel"
                }
            },
            {
                "toggle3@guideBookUI.typeToggleBtn": {
                    "$buttonLabel": "可驯服",
                    "$toggle_group_forced_index": 3
                }
            }
        ]
    },
    "typeToggleBtn@common.toggle": {
        "$checked_img": "textures/ui/guide_book/checked",
        "$default_texture": "textures/ui/guide_book/btn02_unuse",
        "$pressed_texture": "textures/ui/guide_book/btn02_click",
        "$locked_texture": "textures/ui/guide_book/btn02_unuse",
        "$default_font_color": [ 0.674, 0.482, 0.361 ],
        "$pressed_font_color": [ 0.494, 0.188, 0.02 ],
        "$locked_font_color": [ 0.674, 0.482, 0.361 ],
        "$unchecked_control": "mod7CommonUI.toggle_unchecked_state", // 未选中状态
        "$checked_control": "mod7CommonUI.toggle_checked_state", // 选中状态
        "$unchecked_hover_control": "mod7CommonUI.toggle_unchecked_state", // 未选中时hover状态
        "$checked_hover_control": "mod7CommonUI.toggle_checked_state", // 选中时hover状态
        "$unchecked_locked_control": "mod7CommonUI.toggle_locked_state", // 未选中且锁定状态（不可交互）
        "$unchecked_locked_hover_control": "mod7CommonUI.toggle_locked_state", // 未选中且锁定时hover状态（不可交互）
        "$checked_locked_control": "mod7CommonUI.toggle_locked_state", // 选中且锁定状态（不可交互）
        "$checked_locked_hover_control": "mod7CommonUI.toggle_locked_state", // 选中且锁定时hover状态（不可交互）
        "anchor_from": "top_left",
        "anchor_to": "top_left",
        "size": [ 54, 22 ],
        "$radio_toggle_group": true, // 是否单选，true的时候同一个toggle_name的被视为同一个group，同一个group同一时刻只能有一个toggle被选中
        "$toggle_name": "#typeTab", // toggle绑定的group名
        "$toggle_group_default_selected": 0
    }
}
```

这里直接继承了ui_common.json中微软封装的toggle组件，具体字段的含义可参考注释，其中$toggle_name所绑定的参数在python中进行管理：

```python
@ViewBinder.binding(view_binder.BF_ToggleChanged, "#typeTab")
def OnTypeTabChecked(self, args):
    # 二级tab切换时触发，将三级分页默认切换至第一个tab详情页
    self.mCurTypeTab = args["index"]
    self.OnMonsterToggleChecked({ "index": self.mCurMonsterIndex })
```

从json中我们可以看到toggle总共有八种状态，各种状态的详细效果可以打开游戏设置界面查看，左侧的按钮就是toggle。主要有选中、未选中两种基础状态，每种状态又有hover和非hover，然后还有锁定、未锁定，所以总共就有2^3=8种状态组合，需要不同的控件展示。由于我们这里比较简单，只考虑了选中、未选中以及锁定三种状态，所以只实现了对应的三种控制panel，其json如下：

```json
{
    "namespace" : "mod7CommonUI",
	"toggle_checked_state": {
        "$pressed_texture|default": "",
        "$pressed_font_color|default": [ 1, 1, 1 ],
        "type": "image",
        "texture": "$pressed_texture",
        "nineslice_size": 4,
        "controls": [
            {
                "toggleText": {
                    "type": "label",
                    "$buttonLabel|default": "测试",
                    "color": "$pressed_font_color",
                    "text": "$buttonLabel",
                    "layer": 3
                }
            },
            {
                "checkedImg": {
                    "type": "image",
                    "$checked_img|default": "",
                    "texture": "$checked_img",
                    "size": [ 12, 6 ],
                    "layer": 3,
                    "anchor_from": "bottom_middle",
                    "anchor_to": "bottom_middle"
                }
            }
        ],
        "layer": 10
    },
    "toggle_unchecked_state": {
        "$default_texture|default": "",
        "$default_font_color|default": [ 0, 0, 0 ],
        "type": "image",
        "texture": "$default_texture",
        "nineslice_size": 4,
        "controls": [
            {
                "toggleText": {
                    "type": "label",
                    "$buttonLabel|default": "测试",
                    "color": "$default_font_color",
                    "text": "$buttonLabel",
                    "layer": 3
                }
            }
        ],
        "layer": 1
    },
    "toggle_locked_state": {
        "$locked_texture|default": "",
        "$locked_font_color|default": [ 0, 0, 0 ],
        "type": "image",
        "texture": "$locked_texture",
        "nineslice_size": 4,
        "controls": [
            {
                "toggleText": {
                    "type": "label",
                    "offset": [ 6, 0 ],
                    "$buttonLabel|default": "测试",
                    "color": "$locked_font_color",
                    "text": "$buttonLabel",
                    "layer": 3
                }
            },
            {
                "lockedImg": {
                    "type": "image",
                    "size": [ 12, 12 ],
                    "offset": [ -8, 0 ],
                    "texture": "textures/ui/lock",
                    "color": "$locked_font_color",
                    "layer": 1
                }
            }
        ],
        "layer": 2
    }
}
```
这里把三种状态的label统一通过$buttonLabel来管理，这样在子类中（上面的每个具体的toggle）只用管理这一个参数就行。另外各个状态的贴图和字体颜色也是分开控制的，细心的朋友可能发现了选中状态多了个checkedImg，锁定的状态多了个lockedImg，前者是用来实现选中时按钮下方的小箭头的，而后者则是用来实现锁的图标的。是否锁定只需要设置其enabled字段就可以，也可以在python中通过调用SetTouchEnable接口来动态设置。效果如图所示：

![](data:image/png;base64,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)

以上即为最简单的分页实现。

### 高度数据绑定的自适应tab列表
接下来以第三级分页来介绍数据绑定，我们先来看看对应的json：

```json
{
    "namespace": "guideBookUI",
    "itemToggleGrid": {
        "anchor_from": "top_middle",
        "anchor_to": "top_middle",
        "bindings": [
            {
                "binding_condition": "always",
                "binding_name": "#itemToggleGrid.item_count", // 我们通过该变量名复写引擎中对应的变量名
                "binding_name_override": "#StackGridItemsCount" // 这是引擎中的变量名，用于控制stack_grid的数量
            }
        ],
        "collection_name": "itemToggles", // 绑定的集合名
        "controls": [
            {
                "itemToggleBtn@guideBookUI.itemToggleBtn" : {} // stack_grid中的template，改变#StackGridItemsCount的值会动态克隆所有controls
            }
        ],
        "item_count": 10,
        "layer": 0,
        "orientation": "vertical", // 扩展方向，垂直
        "property_bag": {
            "#itemToggleGrid.item_count": 10 // 默认有10个item，实际根据绑定值返回实时更新
        },
        "size": [ "100%", "default" ],
        "type": "stack_grid",
        "visible": true
    },
    "itemToggleBtn@common.toggle": {
        "$unchecked_control": "guideBookUI.itemUncheckedState",
        "$checked_control": "guideBookUI.itemCheckedState",
        "$unchecked_hover_control": "guideBookUI.itemUncheckedState",
        "$checked_hover_control": "guideBookUI.itemCheckedState",
        "$unchecked_locked_control": "guideBookUI.itemUncheckedState",
        "$unchecked_locked_hover_control": "guideBookUI.itemUncheckedState",
        "$checked_locked_control": "guideBookUI.itemUncheckedState",
        "$checked_locked_hover_control": "guideBookUI.itemUncheckedState",
        "$toggle_grid_collection_name": "itemToggles", // toggle列表绑定的collection，在common.toggle中定义
        "$item_collection_name": "itemToggles", // 文字绑定的collection，在下方的itemLabel中定义
        "anchor_from": "top_left",
        "anchor_to": "top_left",
        "size": [ "100%", 16 ],
        "$radio_toggle_group": true,
        "$toggle_name": "#itemToggleGroup",
        "$toggle_group_default_selected": 0
    },
    "itemCheckedState": {
        "type": "image",
        "texture": "textures/ui/white_bg",
        "color": [ 0.7764, 0.7764, 0.7764 ],
        "nineslice_size": 1,
        "controls": [
            {
                "itemLabel@guideBookUI.itemLabel": {}
            }
        ],
        "layer": 2
    },
    "itemUncheckedState": {
        "type": "image",
        "texture": "textures/ui/white_bg",
        "color": [ 0.3647, 0.3647, 0.3647 ],
        "$label_color": [ 0.776, 0.776, 0.776],
        "nineslice_size": 1,
        "controls": [
            {
                "itemLabel@guideBookUI.itemLabel": {}
            }
        ],
        "layer": 2
    },
    "itemLabel": {
        "bindings": [
            {
                "binding_collection_name" : "$item_collection_name",
                "binding_name" : "#label_name.text",
                "binding_type" : "collection"
            }
        ],
        "$label_color|default": [ 1, 1, 1 ],
        "color": "$label_color",
        "property_bag": {
            "#label_name.text" : "ha ha"
        },
        "layer": 3,
        "text" : "#label_name.text",
        "type" : "label"
    },
}
```
我们先看toggleBtn的实现，与上面的二级tab相比，三级tab没有锁定的状态，因此只用了选中和未选中两种状态panel。两个panel简单改变了不同的背景颜色和字体颜色，重点在itemLabel，通过绑定collection，在python中可以绑定对应的数据：

```python
@ViewBinder.binding_collection(view_binder.BF_BindString, "itemToggles", "#label_name.text")
def OnRefreshItemLabel(self, index):
    # 这里返回的文字会显示在对应index的itemLabel上
	return self.mItemData[self.mCurItemTab][index]["name"] if len(self.mItemData[self.mCurItemTab]) > index else ""
```

我们再来看stack_grid的实现，重点就在于collection_name的绑定和#StackGridItemsCount的绑定，这里通过#itemToggleGrid.item_count来复盖#StackGridItemsCount并在python中实现动态绑定：

```python
@ViewBinder.binding(view_binder.BF_BindInt, "#itemToggleGrid.item_count")
def OnItemGridResize(self):
    # 将stack_grid的size和对应的data数量绑定起来，实现数据驱动，有多少内容显示多少
    return len(self.mItemData[self.mCurItemTab])
```

最后就是点击item列表之后的回调了：

```python
@ViewBinder.binding(view_binder.BF_ToggleChanged, "#itemToggleGroup")
def OnItemToggleChecked(self, args):
    # 当点击#itemToggleGroup中的toggle时会调用该函数，传入的args中有对应点击的index，在该回调函数中完成分页内容的设置
    toggleIndex = args["index"]
    if toggleIndex >= len(self.mItemData[self.mCurItemTab]):
    	toggleIndex = 0
    self.mCurItemIndex = toggleIndex
    itemDict = self.mItemData[self.mCurItemTab][toggleIndex]
    self.SetSprite(self.mItemIcon, itemDict["icon"])
    self.SetText(self.mItemName, itemDict["name"])
    self.SetText(self.mItemDesc, itemDict["desc"])
    self.set_control_visible(self.mItemInfoWrap, True)
```

## 总结

### 单选toggle
- 通过绑定BF_ToggleChanged实现点击对应$toggle_name的toggle的回调，在回调中展示对应分页内容
- $radio_toggle_group设置为true时为单选，同$toggle_name的toggle在同一时间只有一个toggle处于开启状态

### stack_grid数据绑定
- 通过绑定"#itemToggleGrid.item_count"来实时更新列表的size
- 通过集合绑定来实时更新每个index的内容，文中列举的是label的文字，同理也可以绑定image的贴图
- demo中绑定的数据内容放在modCommon/dataBindingCfg.py中，可自行修改数据查看效果