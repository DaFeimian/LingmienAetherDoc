---
title: 客户端脚本突破30Tick
order: 19
group:
  title: 开发指南
  order: 3
---

# 客户端脚本突破30Tick
> 改编自2022-1-17一则帖子<a href="https://mc.netease.com/thread-906377-1-11.html">《[交流] [技术分享] 监听游戏帧，实现流畅动画效果》</a>

## 原理
使用ViewBinder来绑定UI中的变量

## UI Json文件添加变量绑定
在main画布下添加如下代码，持续绑定一个名为gametick的变量(未测试是否与该名称有关，还是仅仅因为绑定条件为always)，即客户端游戏fps

```json {2-7}
"main" : {
    "bindings" : [
        {
            "binding_condition" : "always",
            "binding_name" : "#main.gametick"
        }
    ],
    ...
}
```

## UI 脚本文件中定义函数并绑定该变量
获取ViewBinder绑定类，使用装饰器给函数绑定上#main.gametick变量，则该函数的执行次数为客户端游戏fps

```python {38-40}
ViewBinder = clientApi.GetViewBinderCls()

class ***Screen(ScreenNode):
    ...

    @ViewBinder.binding(ViewBinder.BF_BindString, "#main.gametick")
    def GameHighTick(self):
        pass
```
