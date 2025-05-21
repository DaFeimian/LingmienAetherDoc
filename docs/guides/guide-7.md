---
title: Python装饰器
order: 7
group:
  title: 开发指南
  order: 3
---
## 注意
我的世界里这种双端，只会调用`一次`装饰器，如果用其他方式调用执行这个函数，则`不会`走装饰器。所以要这样子解决，这样每调用一次这个函数都会执行一次装饰器~
```python
    def Timer(self):
        @Event.PlayerId
        def Test(*args):
            pass
        Test(self)

	@Event.ClientEvent('PerspChangeClientEvent')
    def StandOnBlock(self, args):
        print 'StandOnBlock', args
        @Event.PlayerId
        def Test(*args):
            print 1
        Test(self)
```
函数装饰器更好用，但是在@中传参会`颠倒`参数位置顺序
而类装饰器就更为固定，但是不能在@中传参（也许是我还不会）
```python
class Event:
    class ClientEvent:
        def __init__(self, Func):
            self.Func = Func

        def __call__(self, *args):
            # type: (any) -> any
            print args
            return self.__call__

# @Event.ClientEvent('xxx') 类方法的不能这样
@Event.ClientEvent
def StandOnBlock(args):
    print 'StandOnBlock'
```

## 装饰器中可能要用到
> `callable()`： 函数用于检查一个对象是否是可调用的。如果返回 True，object 仍然可能调用失败；但如果返回 False，调用对象 object 绝对不会成功。

> `isinstance()` 函数来判断一个对象是否是一个已知的类型，类似 type()。
- isinstance() 与 type() 区别：
type() 不会认为子类是一种父类类型，不考虑继承关系。
isinstance() 会认为子类是一种父类类型，考虑继承关系。
- 如果要判断两个类型是否相同推荐使用 isinstance()。
- `isinstance(object, classinfo)`
`object` -- 实例对象。
`classinfo` -- 可以是直接或间接类名、基本类型或者由它们组成的元组。
- 返回值
如果对象的类型与参数二的类型（classinfo）相同则返回 True，否则返回 False。
- 示例
isinstance(var, str) 判断`var`是否是str类型

## 一定要注意装饰器的Return
否则可能会出现这种报错`TypeError: 'NoneType' object is not callable`。可以参考肥免事件监听的来解决：
```python
def ClientEvent(EventName):
    # type: (str) -> any
    """监听客户端事件，若为服务端调用，则默认监听客户端NotifyToServer事件
    :param EventName: 事件名称
    """
    def Run(Func):
        EventDict = {
            "EventName": EventName,
            "EventType": "Client",
            "EventFunc": Func
        }
        EventList.append(EventDict)
        return Func
    return Run(Func) if callable(EventName) else Run
```

## 简单的函数装饰器

发送消息功能前需要检测登录情况
这种实际上就是一个简单的装饰器了~那么如果需要重复调用就需要变成复杂的！

### 源码
```python
# -*- coding:utf-8 -*-

IsLogin = False
UserName = None

# 发送消息
def SendMsg():

    def TestLogin():
        global IsLogin, UserName
        if not IsLogin:
            print '您目前尚未登录，无法发送消息'
            while True:
                UserName = input('用户名：')
                Password = input('密码：')
                if UserName == 'DaFeiMian' and Password == 'DFM520':
                    IsLogin = True
                    print '恭喜你登录成功'
                    break
                else:
                    print '登录失败'
        return UserName

    # 用户发送消息之前需要检测登录情况
    UserName = TestLogin()
    print '{0}发送了消息：xxxx'.format(UserName)

def SendMsg2():

    def TestLogin():
        global IsLogin, UserName
        if not IsLogin:
            print '您目前尚未登录，无法发送消息'
            while True:
                UserName = input('用户名：')
                Password = input('密码：')
                if UserName == 'DaFeiMian' and Password == 'DFM520':
                    IsLogin = True
                    print '恭喜你登录成功'
                    break
                else:
                    print '登录失败'
        return UserName

    # 用户发送消息之前需要检测登录情况
    UserName = TestLogin()
    print '{0}发送了消息：YYYY'.format(UserName)

SendMsg()
SendMsg2()
```

### 输出
```
您目前尚未登录，无法发送消息
用户名：'只因你太肥'
密码：123456
登录失败
用户名：'DaFeiMian'
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：xxxx
DaFeiMian发送了消息：YYYY

进程已结束,退出代码0
```

## 复杂的函数装饰器-装饰器传参给调用装饰器函数
还是上面的场景，不可能每个`SendMsg`里面有了`TestLogin`，`SendMsg2`里面还要`TestLogin`，一种方法是可以直接将`TestLogin`外置与`SendMsg`同级，然后进行调用，但是这种情况下，如果有**复杂一些**的参数传输，就不好用了！

### 源码
```python
# -*- coding:utf-8 -*-

IsLogin = False
UserName = None

def TestLogin(Func):
    def Run(*args):
        global IsLogin, UserName
        if not IsLogin:
            print '您目前尚未登录，无法发送消息'
            while True:
                UserName = input('用户名：')
                Password = input('密码：')
                if UserName == 'DaFeiMian' and Password == 'DFM520':
                    IsLogin = True
                    print '恭喜你登录成功'
                    break
                else:
                    print '登录失败'
        Func(UserName)
        return UserName
    return Run


# 发送消息
@TestLogin
def SendMsg(Name):
    print '{0}发送了消息：xxxx'.format(Name)

@TestLogin
def SendMsg2(Name):
    print '{0}发送了消息：YYYY'.format(Name)

SendMsg()
SendMsg2()

```

### 输出
```
您目前尚未登录，无法发送消息
用户名：'sadg'
密码：'asdg'
登录失败
用户名：'DaFeiMian'
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：xxxx
DaFeiMian发送了消息：YYYY

进程已结束,退出代码0
```

### 补充说明
`TestLogin`函数中的变量`Func`就是调用这个装饰器的实例，如果在`TestLogin`函数中没有下面这行，则调用这个装饰器的实例不会运行。这也是**装饰器传参给调用函数的一个方法~**
```python
        Func(UserName)
```

## 复杂的函数装饰器-调用装饰器函数传参给装饰器

现在用户在发送第一条消息之后掉线了，然后过了3秒开始重连，并且系统自动记忆了他的用户名，直接让他输入密码即可~

### 源码
```python
# -*- coding:utf-8 -*-
import time

IsLogin = False
UserName = None

def TestLogin(Func):
    def Run(*args):
        global IsLogin, UserName
        if not IsLogin:
            print '您目前尚未登录，无法发送消息'
            while True:
                if not args:
                    UserName = input('用户名：')
                else:
                    print '用户重连中...'
                    UserName = args[0]
                    print '已保存用户名：{0}，现在你只需要输入密码~'.format(args[0])
                Password = input('密码：')
                if UserName == 'DaFeiMian' and Password == 'DFM520':
                    IsLogin = True
                    print '恭喜你登录成功'
                    break
                else:
                    print '登录失败'
        Func(UserName)
    return Run


# 发送消息
@TestLogin
def SendMsg(Name):
    print '{0}发送了消息：xxxx'.format(Name)

@TestLogin
def SendMsg2(Name):
    print '{0}发送了消息：YYYY'.format(Name)

SendMsg()
time.sleep(3)
# 掉线
print '用户已掉线'
IsLogin = False
# 重连
if UserName:
    SendMsg2(UserName)

```

### 输出
```
您目前尚未登录，无法发送消息
用户名：123456
密码：123456
登录失败
用户名：'DaFeiMian'
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：xxxx
用户已掉线
您目前尚未登录，无法发送消息
用户重连中...
已保存用户名：DaFeiMian，现在你只需要输入密码~
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：YYYY

进程已结束,退出代码0
```

### 补充说明
当你调用一个使用了装饰器的函数时，你调用代码中传过去的参数默认传输到装饰器函数中的内嵌的第一个函数中，也就是你在装饰器函数中嵌入第二个函数是没用~应该有**直接**传入方法，只是我还不会！
如果你是这样，传参的`UserName`会到`TestLogin`中，而`Func`，则到了第一函数：
```python
def TestLogin(*args):
    def Run(Func):
        global IsLogin, UserName
        if not IsLogin:
            print '您目前尚未登录，无法发送消息'
            while True:
                if not args:
                    UserName = input('用户名：')
                else:
                    print '用户重连中...'
                    UserName = args[0]
                    print '已保存用户名：{0}，现在你只需要输入密码~'.format(args[0])
                Password = input('密码：')
                if UserName == 'DaFeiMian' and Password == 'DFM520':
                    IsLogin = True
                    print '恭喜你登录成功'
                    break
                else:
                    print '登录失败'
        Func(UserName)
    return Run

@TestLogin(UserName)
def SendMsg2(Name):
    print '{0}发送了消息：YYYY'.format(Name)

SendMsg2()
```

## 类装饰器
### 源码
```python
# -*- coding:utf-8 -*-
import time

IsLogin = False
UserName = None

class TestLogin:
    def __init__(self, Func):
        self.Func = Func

    def __call__(self, *args, **kwargs):
        global IsLogin, UserName
        if not IsLogin:
            print '您目前尚未登录，无法发送消息'
            while True:
                if not args:
                    UserName = input('用户名：')
                else:
                    print '用户重连中...'
                    UserName = args[0]
                    print '已保存用户名：{0}，现在你只需要输入密码~'.format(args[0])
                Password = input('密码：')
                if UserName == 'DaFeiMian' and Password == 'DFM520':
                    IsLogin = True
                    print '恭喜你登录成功'
                    break
                else:
                    print '登录失败'
        self.Func(UserName)

# 发送消息
@TestLogin
def SendMsg(Name):
    print '{0}发送了消息：xxxx'.format(Name)


@TestLogin
def SendMsg2(Name):
    print '{0}发送了消息：YYYY'.format(Name)


SendMsg()
time.sleep(3)
# 掉线
print '用户已掉线'
IsLogin = False
# 重连
if UserName:
    SendMsg2(UserName)
```

### 输出
```
您目前尚未登录，无法发送消息
用户名：'DaFeiMian'
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：xxxx
用户已掉线
您目前尚未登录，无法发送消息
用户重连中...
已保存用户名：DaFeiMian，现在你只需要输入密码~
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：YYYY

进程已结束,退出代码0
```

### 补充说明
那么这里的传参就跑到类里面的`__call__`函数啦~

## 类装饰器-类装饰器调用函数装饰器
当然你也可以这样套娃装饰器~但是参数需要注意！

### 源码
```python
# -*- coding:utf-8 -*-
import time

IsLogin = False
UserName = None


def Test(Func):
    def Run(Class, *args):
        # 此时的第一个参数便是调用这个装饰器的实例class
        print 'Test'
        Func(Class)
        Class.Print123()
    return Run


class TestLogin:
    def __init__(self, Func):
        self.Func = Func

    @Test
    def __call__(self, *args, **kwargs):
        global IsLogin, UserName
        if not IsLogin:
            print '您目前尚未登录，无法发送消息'
            while True:
                if not args:
                    UserName = input('用户名：')
                else:
                    print '用户重连中...'
                    UserName = args[0]
                    print '已保存用户名：{0}，现在你只需要输入密码~'.format(args[0])
                Password = input('密码：')
                if UserName == 'DaFeiMian' and Password == 'DFM520':
                    IsLogin = True
                    print '恭喜你登录成功'
                    break
                else:
                    print '登录失败'
        self.Func(UserName)

    def Print123(self):
        print 123


# 发送消息
@TestLogin
def SendMsg(Name):
    print '{0}发送了消息：xxxx'.format(Name)


@TestLogin
def SendMsg2(Name):
    print '{0}发送了消息：YYYY'.format(Name)


SendMsg()
time.sleep(3)
# 掉线
print '用户已掉线'
IsLogin = False
# 重连
if UserName:
    SendMsg2(UserName)  # 这个UserName没用，不知道怎么传参进去，可能需要下面这样
"""
@TestLogin(UserName)
def SendMsg2(Name):
    print '{0}发送了消息：YYYY'.format(Name)
"""
```

### 输出
```
Test
您目前尚未登录，无法发送消息
用户名：'DaFeiMian'
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：xxxx
123
用户已掉线
Test
您目前尚未登录，无法发送消息
用户名：'DaFeiMian'
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：YYYY
123

进程已结束,退出代码0
```

### 补充说明
当然你也可以让他这样，就是参数需要调整~我现在还不是很会用，不知道这种情况怎么传参数进去
```python
@Test
class TestLogin:
	...
```

## 类装饰器-类装饰器装入其他类
你也可以把你的类装饰器装进其他的类里面~

### 源码
```python
# -*- coding:utf-8 -*-
import time

IsLogin = False
UserName = None



class Test:
    class TestLogin:
        def __init__(self, Func):
            self.Func = Func

        def __call__(self, *args, **kwargs):
            global IsLogin, UserName
            if not IsLogin:
                print '您目前尚未登录，无法发送消息'
                while True:
                    if not args:
                        UserName = input('用户名：')
                    else:
                        print '用户重连中...'
                        UserName = args[0]
                        print '已保存用户名：{0}，现在你只需要输入密码~'.format(args[0])
                    Password = input('密码：')
                    if UserName == 'DaFeiMian' and Password == 'DFM520':
                        IsLogin = True
                        print '恭喜你登录成功'
                        break
                    else:
                        print '登录失败'
            self.Func(UserName)


# 发送消息
@Test.TestLogin
def SendMsg(Name):
    print '{0}发送了消息：xxxx'.format(Name)


@Test.TestLogin
def SendMsg2(Name):
    print '{0}发送了消息：YYYY'.format(Name)


SendMsg()
time.sleep(3)
# 掉线
print '用户已掉线'
IsLogin = False
# 重连
if UserName:
    SendMsg2(UserName)

```

### 输出
```
您目前尚未登录，无法发送消息
用户名：'DaFeiMian'
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：xxxx
用户已掉线
您目前尚未登录，无法发送消息
用户重连中...
已保存用户名：DaFeiMian，现在你只需要输入密码~
密码：'DFM520'
恭喜你登录成功
DaFeiMian发送了消息：YYYY

进程已结束,退出代码0
```
