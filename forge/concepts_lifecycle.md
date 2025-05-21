---
title: 模组生命周期
order: 3
toc: content
group:
  title: 核心概念
  order: 9985
---
模组生命周期
==============

在模组加载过程中，各种生命周期事件会在模组特定的事件总线上触发。在这些事件期间会执行许多操作，例如[注册对象][registering]、准备[数据生成][datagen]或[与其他模组通信][imc]。

事件监听器应该使用 `@EventBusSubscriber(bus = Bus.MOD)` 或在模组构造函数中注册：

```Java
@Mod.EventBusSubscriber(modid = "mymod", bus = Mod.EventBusSubscriber.Bus.MOD)
public class MyModEventSubscriber {
  @SubscribeEvent
  static void onCommonSetup(FMLCommonSetupEvent event) { ... }
}

@Mod("mymod")
public class MyMod {
  public MyMod() {
    FMLModLoadingContext.get().getModEventBus().addListener(this::onCommonSetup);
  } 

  private void onCommonSetup(FMLCommonSetupEvent event) { ... }
}
```

!!! 警告
    大多数生命周期事件是并行触发的：所有模组将同时接收相同的事件。
    
    模组*必须*注意线程安全，例如在调用其他模组的API或访问原版系统时。通过 `ParallelDispatchEvent#enqueueWork` 将代码推迟到稍后执行。

注册事件
---------------

注册事件在模组实例构造之后触发。有三个事件：`NewRegistryEvent`、`DataPackRegistryEvent$NewRegistry` 和 `RegisterEvent`。这些事件在模组加载期间同步触发。

`NewRegistryEvent` 允许模组开发者使用 `RegistryBuilder` 类注册自定义的注册表。

`DataPackRegistryEvent$NewRegistry` 允许模组开发者通过提供 `Codec` 来注册自定义数据包注册表，以便从 JSON 编码和解码对象。

`RegisterEvent` 用于将[注册对象][registering]放入注册表。事件将在每个注册表中触发。

数据生成
---------------

如果游戏设置为运行[数据生成器][datagen]，则 `GatherDataEvent` 将是最后一个触发的事件。此事件用于将模组的数据提供者注册到相关的数据生成器中。此事件也是同步触发的。

通用设置
------------

`FMLCommonSetupEvent` 用于物理客户端和服务端共有的操作，例如注册[功能][capabilities]。

边界设置
-----------

边界设置事件在各自的[物理边界][sides]上触发：`FMLClientSetupEvent` 在物理客户端上触发，而 `FMLDedicatedServerSetupEvent` 在专用服务器上触发。这是进行物理边界特定初始化的地方，例如注册客户端键绑定。

模组间通讯
-------------

这是可以向模组发送消息以实现跨模组兼容的地方。有两个事件：`InterModEnqueueEvent` 和 `InterModProcessEvent`。

`InterModComms` 是负责保存模组消息的类。由于其依赖于 `ConcurrentMap`，因此在生命周期事件期间调用这些方法是安全的。

在 `InterModEnqueueEvent` 期间，使用 `InterModComms#sendTo` 向不同模组发送消息。这些方法需要输入将接收消息的模组ID、与消息数据相关的键以及包含消息数据的供应者。此外，还可以指定消息的发送者，但默认情况下它将是调用者的模组ID。

然后在 `InterModProcessEvent` 期间，使用 `InterModComms#getMessages` 获取所有接收到的消息流。提供的模组ID几乎总是调用该方法的模组的ID。此外，可以指定一个谓词来过滤消息键。这将返回一个 `IMCMessage` 的流，其中包含数据的发送者、接收者、数据键和提供的数据本身。

!!! 注意
    还有另外两个生命周期事件：`FMLConstructModEvent` 在模组实例构造后但在 `RegisterEvent` 之前触发，而 `FMLLoadCompleteEvent` 在 `InterModComms` 事件之后触发，用于模组加载完成时。

[registering]: ./registries.md#methods-for-registering
[capabilities]: ../datastorage/capabilities.md
[datagen]: ../datagen/index.md
[imc]: ./lifecycle.md#intermodcomms
[sides]: ./sides.md