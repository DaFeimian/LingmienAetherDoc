---
title: 服务端和客户端之间的通信
order: 18
group:
  title: 开发指南
  order: 3
---

BUG
# 使用自定义事件进行<font color=red>服务端</font>和<font color=blue>客户端</font>之间的通信
> 原生事件监听<br>
<font color=blue>客户端</font>只能监听<font color=blue>客户端</font>的<br>
<font color=red>服务端</font>只能监听<font color=red>服务端</font>的<br>
如果想要<font color=blue>客户端</font>监听<font color=red>服务端</font>的原生事件，可以先用<font color=red>服务端</font>监听原生事件，然后再选择合适的方式利用自定义事件通信给<font color=blue>客户端</font>

## 通信接口
通信使用的是原版网易Api实现的，包含`NotifyToServer`(<font color=blue>客户端</font>接口)，`NotifyToClient`(<font color=red>服务端</font>接口)，`BroadcastToAllClient`(<font color=red>服务端</font>接口).

------------

### <a id="notifytoserver"></a>NotifyToServer
<font color=blue>客户端</font><br>
- 描述<br>
  <font color=blue>客户端</font>通信自定义事件至<font color=red>服务端</font>

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|eventName|str|自定义的事件名称|
|eventData|dict|事件所携带的数据|

- 返回值<br>
  无

- 备注<br>
  需要在<font color=red>服务端</font>监听来自<font color=blue>客户端</font>传入的自定义事件
------------

### <a id="notifytoclient"></a>NotifyToClient
<font color=red>服务端</font><br>
- 描述<br>
  <font color=red>服务端</font>通信自定义事件至<font color=blue>客户端</font>

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|playerId|str|根据玩家id通信给指定<font color=blue>客户端</font>|
|eventName|str|自定义的事件名称|
|eventData|dict|事件所携带的数据|

- 返回值<br>
  无

- 备注<br>
  需要在<font color=blue>客户端</font>监听来自<font color=red>服务端</font>传入的自定义事件
------------

### <a id="broadcasttoallclient"></a>BroadcastToAllClient
<font color=red>服务端</font><br>
- 描述<br>
  <font color=red>服务端</font>广播自定义事件至<font color=blue>客户端</font>(相当于通信给所有的<font color=blue>客户端</font>，因此无需playerId参数指定<font color=blue>客户端</font>)

- 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|eventName|str|自定义的事件名称|
|eventData|dict|事件所携带的数据|

- 返回值<br>
  无

- 备注<br>
  需要在<font color=blue>客户端</font>监听来自<font color=red>服务端</font>传入的自定义事件

## <font color=blue>客户端</font>通信至<font color=red>服务端</font>
假设游戏环境如下：
- 房主玩家A(运行了<font color=red>服务端</font>脚本和<font color=blue>客户端</font>脚本)
- 房客玩家B(仅运行<font color=blue>客户端</font>脚本)
- 房客玩家C(仅运行<font color=blue>客户端</font>脚本)

### <font color=blue>客户端</font>代码
向<font color=red>服务端</font>通信自定义事件
```python {2}
def ClientNotify(self, args):
    self.NotifyToServer('CustomEvent', {'name':"我的名字"})
```

### <font color=red>服务端</font>代码
接收来自<font color=blue>客户端</font>通信过来的自定义事件
```python {1}
@Event.ClientEvent('CustomEvent')
def GetClientNotify(self, args):
    print args['name']
```

- 玩家A所得到的<font color=red>服务端</font>日志为
```text
我的名字
```
- 玩家B没有<font color=red>服务端</font>，则为
```text

```
- 玩家C没有<font color=red>服务端</font>，则为
```text

```

## <font color=red>服务端</font>通信至<font color=blue>客户端</font>
假设游戏环境如下：
- 房主玩家A(运行了<font color=red>服务端</font>脚本和<font color=blue>客户端</font>脚本)
- 房客玩家B(仅运行<font color=blue>客户端</font>脚本)
- 房客玩家C(仅运行<font color=blue>客户端</font>脚本)


### <font color=red>服务端</font>代码
向随机一个<font color=blue>客户端</font>通信自定义事件
```python {3}
def ServerNotify(self, args):
    PlayerId = random.choice(serverApi.GetPlayerList())
    self.NotifyToClient(PlayerId， 'CustomEvent', {'name':"我的名字"})
```

### <font color=blue>客户端</font>代码
接收来自<font color=red>服务端</font>通信过来的自定义事件
```python {1}
@Event.ServerEvent('CustomEvent')
def GetServerNotify(self, args):
    print args['name']
```

- 玩家A所得到的<font color=blue>客户端</font>日志为
```text

```
- 玩家B所得到的<font color=blue>客户端</font>日志为
```text
我的名字
```
- 玩家C所得到的<font color=blue>客户端</font>日志为
```text

```

## <font color=red>服务端</font>广播给所有<font color=blue>客户端</font>
假设游戏环境如下：
- 房主玩家A(运行了<font color=red>服务端</font>脚本和<font color=blue>客户端</font>脚本)
- 房客玩家B(仅运行<font color=blue>客户端</font>脚本)
- 房客玩家C(仅运行<font color=blue>客户端</font>脚本)

### <font color=red>服务端</font>代码
向所有<font color=blue>客户端</font>通信自定义事件
```python {2}
def ServerNotify(self, args):
    self.BroadcastToAllClient('CustomEvent', {'name':"我的名字"})
```

### <font color=blue>客户端</font>代码
接收来自<font color=red>服务端</font>通信过来的自定义事件
```python {1}
@Event.ServerEvent('CustomEvent')
def GetServerNotify(self, args):
    print args['name']
```

- 玩家A所得到的<font color=blue>客户端</font>日志为
```text
我的名字
```
- 玩家B所得到的<font color=blue>客户端</font>日志为
```text
我的名字
```
- 玩家C所得到的<font color=blue>客户端</font>日志为
```text
我的名字
```