---
title: 网易纸娃娃旋转功能
order: 10
group:
  title: 开发指南
  order: 3
---
## 复制下面json到ui.json里面就可以
不知道为什么手动写的这个json没用
```json
{
    "entity_input_panel" : {
       "button_mappings" : [
          {
             "from_button_id" : "button.menu_select",
             "mapping_type" : "pressed",
             "to_button_id" : "button.turn_doll"
          }
       ],
       "clips_children" : true,
       "controls" : [
          {
             "entity_paper_doll" : {
                "bindings" : [
                   {
                      "binding_type" : "view",
                      "source_control_name" : "entity_input_panel",
                      "source_property_name" : "#gesture_delta_source",
                      "target_property_name" : "#gesture_delta_source"
                   },
                   {
                      "binding_type" : "view",
                      "source_control_name" : "entity_input_panel",
                      "source_property_name" : "#gesture_mouse_delta_x",
                      "target_property_name" : "#gesture_mouse_delta_x"
                   },
                   {
                      "binding_type" : "view",
                      "source_control_name" : "entity_input_panel",
                      "source_property_name" : "#gesture_mouse_delta_y",
                      "target_property_name" : "#gesture_mouse_delta_y"
                   }
                ],
                "enable_scissor_test" : true,
                "layer" : 2,
                "renderer" : "netease_paper_doll_renderer",
                "rotation" : "freedom_gesture",
                "screen_scale" : 0.50,
                "type" : "custom"
             }
          }
       ],
       "gesture_tracking_button" : "button.turn_doll",
       "layer" : 6,
       "modal" : false,
       "offset" : [ 0, 0 ],
       "size" : [ "30.0%+0.0px", "70.0%+0.0px" ],
       "type" : "input_panel"
    }
},
...
```