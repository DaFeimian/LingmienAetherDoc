---
title: UI添加微软原生控件
order: 5
group:
  title: 开发指南
  order: 3
---
《我的世界》中大量使用了继承控件，我们找到工作台的下载路径，并找到资源包里面的ui目录，里面可以看到我的世界原生的大量的界面文件。

我们最熟悉的按钮其实就是`ui_common.json`中定义的一个自定义控件。

<center><img src='http://1.94.129.175/uploads/da-fei-mian/images/m_54c0520e0c899e4b79a20c7332010397_r.png'></center>

我们打开ui_common，映入眼帘的即是button——我的世界中使用的按钮。

这里我们主要关注两个信息：

- ui_common.json的namespace（命名空间）：common
- 按钮控件的名称：button

接下来会用到。

<center><img src='http://1.94.129.175/uploads/da-fei-mian/images/m_5fd7141840645fc8b51a3747342ff963_r.png'></center>

那么，如何在你的界面中直接使用原生的控件呢？

我们先创建一个界面文件，并在main画布下挂接一个面板（panel）
选中面板，点击功能区的“添加原生控件”按钮
<center><img src='http://1.94.129.175/uploads/da-fei-mian/images/m_46aef28246e3537db3e7515a2e6fcce5_r.png'></center>

在弹出的弹窗里按照下图填写。（命名空间填写json文件里的common，控件名称填写json文件里的button）
<center><img src='http://1.94.129.175/uploads/da-fei-mian/images/m_e8e1c741cd7dc962abf254d3149b0ca4_r.png'></center>

点击确定，这样你就在你的界面中添加了一个原生的button
<center><img src='http://1.94.129.175/uploads/da-fei-mian/images/m_61981f89f7277ee86e372d3ee30a3725_r.png'></center>

当然，原生的按钮显得不那么好用，我们还是推荐你使用编辑器提供的按钮。

我们尝试下另一个常用的控件：container_item，这个就是广泛用在各种原生界面中的物品容器。

我们在编辑器中尝试对其进行展开，可以看到这个控件的内部结构。

善用添加原生控件可以帮助你快速搭建与原生界面类似的界面，以及学习原生界面的写法。

<center><img src='http://1.94.129.175/uploads/da-fei-mian/images/m_f151e80d63fe21fa94bb36e37e78802a_r.png'></center>
服务端配置文件定义的配置如下


## 配置文件

### banned_items
#### 描述

禁用物品配置文件

#### 参数

|参数名|数据类型|说明|
|:-:|:-:|:-:|
|banned_items|list|禁用物品的identifier|

#### 路径

behavior/config/banned_items.json

#### 文件名

banned_items.json

#### 示例

```json
{
        "banned_items": ["minecraft:egg", "minecraft:snowball"]
}
```