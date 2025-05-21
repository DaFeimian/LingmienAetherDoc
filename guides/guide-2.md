---
title: UI控件拖拽
order: 2
group:
  title: 开发指南
  order: 3
---
# InputPanel
`input_panel`与`panel`类似，可以用来放置其他控件，但除此之外还可以用来拖动，或实现“模态框”功能。

```json
"InputPanel" : {
      "anchor_from" : "top_left",
      "anchor_to" : "top_left",
      "button_mappings": [
         {
           "from_button_id": "button.menu_select",
           "to_button_id": "#netease_to_button_id",
           "mapping_type": "pressed"
         }
      ],
      "layer" : 10,
      "modal" : true,
      "is_swallow": true,
      "contained": true,
      "draggable": "both",
      "offset" : [ 0.0, 0.0 ],
      "size" : [ 198.0, 137.0 ],
      "type" : "input_panel",
      "visible" : true
}
```

|变量|默认值|解释|
|:-:|:-:|:-:|
|modal|false|设为true时，该InputPanel视为模态框，见注2|
|is_swallow|false|设为true时，该InputPanel的输入会吞噬事件，见注3|
|draggable|not_draggable|当前控件可拖拽方式，默认为not_draggable不可拖拽，"horizontal"代表水平拖拽，"vertical"代表垂直拖拽，"both"代表自由拖拽|
|contained|false|该控件可拖动时，是否会被父控件的大小范围所限制，默认值为false，见注4|
|button_mappings|[]|该值为开启拖拽功能所必须的属性，可以理解成开启接受屏幕点击事件|

### 注1
```
该控件的拖动功能也遵循UI控件的碰撞规则，当InputPanel中有按钮、滚动列表等接受鼠标事件的控件时，点击在这些控件并不会触发InputPanel的拖动操作。
```
### 注2
```
“模态框”是指将用户的UI点击操作限制在这个控件及其子控件，而其他的控件都不会响应用户操作。

如果界面上同时存在多个模态框，其中层级最高的生效。

可以用来处理ScrollView控件上显示其他控件时，点击会穿透到ScrollView的问题，可参考UIDemo示例的“InputPanel演示”

界面编辑器暂不支持，可先用Panel搭建后手动在json中修改属性。
```

### 注3
```
吞噬事件是指点击该面板时，点击事件不会穿透到世界。如破坏方块、镜头转向不会被响应。
```

### 注4
```
InputPanel维护着一个拖拽偏移量，它代表着在整个拖拽过程中，InputPanel相对于控件出生点坐标的偏移量，**与控件自身的offset无关**。举个例子，InputPanel经过了5次手动拖拽后位置向右移动了5像素，则拖拽偏移量的值为(5, 0)。

当contained为true时，拖拽偏移量存在限制，最小不能超过(0,0)，最大不能超过父控件的大小减去InputPanel控件的大小。

这也就意味着无论InputPanel是否设置了offset，由于初始拖拽偏移量为(0,0), 使控件无法负方向移动，因此需要将InputPanel放置在其父控件的左上角，或调用SetOffsetDelta接口手动设置拖拽偏移量。
```