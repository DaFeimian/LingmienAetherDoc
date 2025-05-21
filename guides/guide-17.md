---
title: 制作倒计时和CD
order: 17
group:
  title: 开发指南
  order: 3
---

# 制作倒计时和CD
作者：凉寂蜀黍。

前段时间看见有萌新，使用`time.sleep()`来做计时，这样会导致整个程序停摆。

今天给萌新们分享一下，如何用帧数事件来做倒计时和cd。本教程针对萌新，大佬们(轻喷)也可以分享一下自己的方法。

适用对象：

刚接触开发、不熟悉api的开发萌新。
有一定python基础但不多的人。
不需要任何json基础 。
#原理其实很简单
首先在代码最前方定义以下代码：

```python
#格式为"玩家id"：剩余时间帧数(int)  
dictcd = {}
```

之所以要用字典，是因为在服务端中要考虑多玩家的情况，要把每个玩家的数据进行隔离。客户端可以直接创建int类型的cd值，不需要字典。

接着在需要用到cd的地方写逻辑：若cd值为0了，就可以让技能起效，并重置cd为900帧(一秒30帧) 。

![](http://1.94.129.175/uploads/LingmienAether/img/guide-17-1.png)

若cd值不为0，提示冷却中。

![](http://1.94.129.175/uploads/LingmienAether/img/guide-17-2.png)

然后在OnScriptTickSever事件中遍历字典dictcd中的键值对，把每个不为0的cd值减一(客户端也有相关事件）。

![](http://1.94.129.175/uploads/LingmienAether/img/guide-17-3.png)

![](http://1.94.129.175/uploads/LingmienAether/img/guide-17-4.png)

最后在cd=1时，即可执行cd到期对应的行为。(之所以在cd=1时执行，是因为cd=0会长期存在，cd=1在每次计时中只会触发一次) 。

![](http://1.94.129.175/uploads/LingmienAether/img/guide-17-5.png)

若对你有帮助，请评论区留言让我看到，我还会继续做下去。

若有问题或建议，也请评论区留言或私信哦。