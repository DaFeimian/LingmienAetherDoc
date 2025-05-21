---
title: 事件
order: 2
toc: content
group:
  title: 核心概念
  order: 9985
---
事件
======

Forge 使用一个事件总线来允许 mod 拦截来自各种原版和 mod 行为的事件。

示例：可以使用一个事件来在右键单击原版木棍时执行某个动作。

用于大多数事件的主要事件总线位于 `MinecraftForge#EVENT_BUS`。还有另一个用于 mod 特定事件的事件总线，位于 `FMLJavaModLoadingContext#getModEventBus`，您应仅在特定情况下使用它。有关此总线的更多信息，请参见下文。

每个事件都会在这些总线之一上触发：大多数事件是在主要的 Forge 事件总线中触发，但有些是在 mod 特定的事件总线上触发。

事件处理器是一种已注册到事件总线的方法。

创建事件处理器
-------------------------

事件处理器方法有一个参数，并且不返回结果。该方法可以是静态的或实例的，具体取决于实现。

事件处理器可以通过 `IEventBus#addListener` 或 `IEventBus#addGenericListener` 为通用事件直接注册（通过继承 `GenericEvent<T>` 来表示）。两个监听器添加器都接收表示方法引用的消费者。通用事件处理器还需要指定通用类。事件处理器必须在主 mod 类的构造函数中注册。

```java
// 在主 mod 类 ExampleMod 中

// 此事件在 mod 总线上
private void modEventHandler(RegisterEvent event) {
	// 在此处执行操作
}

// 此事件在 forge 总线上
private static void forgeEventHandler(AttachCapabilitiesEvent<Entity> event) {
	// ...
}

// 在 mod 构造函数中
modEventBus.addListener(this::modEventHandler);
forgeEventBus.addGenericListener(Entity.class, ExampleMod::forgeEventHandler);
```

### 实例注解事件处理器

此事件处理器监听 `EntityItemPickupEvent`，顾名思义，每当 `Entity` 捡起一个物品时，它会被发布到事件总线上。

```java
public class MyForgeEventHandler {
	@SubscribeEvent
	public void pickupItem(EntityItemPickupEvent event) {
		System.out.println("物品被捡起！");
	}
}
```

要注册此事件处理器，请使用 `MinecraftForge.EVENT_BUS.register(...)` 并传入事件处理器所在类的实例。如果要将此处理器注册到 mod 特定的事件总线，应使用 `FMLJavaModLoadingContext.get().getModEventBus().register(...)`。

### 静态注解事件处理器

事件处理器也可以是静态的。处理方法仍然用 `@SubscribeEvent` 标注。与实例处理器的唯一区别是它也标记为 `static`。要注册静态事件处理器，类的实例不起作用。必须传递类本身。例如：

```java
public class MyStaticForgeEventHandler {
	@SubscribeEvent
	public static void arrowNocked(ArrowNockEvent event) {
		System.out.println("箭已搭弦！");
	}
}
```

必须像这样注册：`MinecraftForge.EVENT_BUS.register(MyStaticForgeEventHandler.class)`。

### 自动注册静态事件处理器

可以用 `@Mod$EventBusSubscriber` 注解标注类。这种类在 `@Mod` 类本身构造时会自动注册到 `MinecraftForge#EVENT_BUS`，这本质上相当于在 `@Mod` 类的构造函数末尾添加 `MinecraftForge.EVENT_BUS.register(AnnotatedClass.class);`。

您可以将要监听的总线传递给 `@Mod$EventBusSubscriber` 注解。建议您同时指定 mod id，因为注解过程可能无法辨识出来，以及要注册的总线，因为这可以提醒您以确保您在正确的总线上。您还可以指定要在哪些 `Dist` 或物理侧加载此事件订阅者。这可以用于不在专用服务器上加载仅客户端的事件订阅者。

一个只在客户端调用的监听 `RenderLevelStageEvent` 的静态事件监听器示例:

```java
@Mod.EventBusSubscriber(modid = "mymod", bus = Bus.FORGE, value = Dist.CLIENT)
public class MyStaticClientOnlyEventHandler {
	@SubscribeEvent
	public static void drawLast(RenderLevelStageEvent event) {
		System.out.println("绘制！");
	}
}
```

!!! 注意
    这并不注册类的实例；而是注册类本身（即事件处理方法必须是静态的）。

取消事件
---------

如果某个事件可以被取消，它将被标记为 `@Cancelable` 注解，并且方法 `Event#isCancelable()` 会返回 `true`。可以通过调用 `Event#setCanceled(boolean canceled)` 方法来修改可取消事件的取消状态，其中传递布尔值 `true` 被解释为取消事件，而传递布尔值 `false` 被解释为“取消”事件。然而，如果事件不可取消（由 `Event#isCancelable()` 定义），无论外传的布尔值如何，都会抛出 `UnsupportedOperationException`，因为不可取消事件的取消状态被视为不可变的。

!!! 重要
    并不是所有事件都可以取消！尝试取消一个不可取消的事件将导致抛出未检查的 `UnsupportedOperationException`，这可能会导致游戏崩溃！在尝试取消事件之前，请务必检查事件是否可以取消，使用 `Event#isCancelable()`。

结果
-------

某些事件有一个 `Event$Result`。结果可以是三种情况之一： `DENY`，即终止事件，`DEFAULT`，即使用原版行为，或 `ALLOW`，即强制执行操作，不论原来是否会执行。事件的结果可以通过在事件上调用 `#setResult` 并传入一个 `Event$Result` 来设置。并非所有事件都有结果；有结果的事件会用 `@HasResult` 注解标注。

!!! 重要
    不同的事件可能以不同方式使用结果，使用结果前请查阅事件的 JavaDoc。

优先级
--------

事件处理方法（用 `@SubscribeEvent` 标记）有一个优先级。您可以通过设置注解的 `priority` 值来设置事件处理方法的优先级。优先级可以是 `EventPriority` 枚举的任何值（`HIGHEST`，`HIGH`，`NORMAL`，`LOW` 和 `LOWEST`）。优先级为 `HIGHEST` 的事件处理程序首先执行，然后按降序执行，直到最后执行优先级 `LOWEST` 的事件。

子事件
----------

许多事件有各自的不同变体。这些变体可能不同，但都基于一个共同因素（例如 `PlayerEvent`），或可能是有多个阶段的事件（例如 `PotionBrewEvent`）。注意，如果您监听父事件类，您的方法将接收到对所有子类的调用。

Mod 事件总线
-------------

Mod 事件总线主要用于监听 mod 应该初始化的生命周期事件。Mod 总线上的每个事件都必须实现 `IModBusEvent`。许多此类事件也是并行运行的，以便 mod 可以同时初始化。这意味着您不能在这些事件中直接执行来自其他 mod 的代码。请使用 `InterModComms` 系统。

以下是 mod 初始化时调用的四个最常用的生命周期事件：

* `FMLCommonSetupEvent`
* `FMLClientSetupEvent` & `FMLDedicatedServerSetupEvent`
* `InterModEnqueueEvent`
* `InterModProcessEvent`

!!! 注意
    `FMLClientSetupEvent` 和 `FMLDedicatedServerSetupEvent` 仅在各自的分发中调用。

这四个生命周期事件都是并行运行的，因为它们都是 `ParallelDispatchEvent` 的子类。如果您想在任何 `ParallelDispatchEvent`中在主线程上运行代码，可以使用 `#enqueueWork` 来实现。

除了生命周期事件之外，Mod 事件总线上还会触发一些可用于注册、设置或初始化各种事物的杂项事件。与生命周期事件相反，其中的大多数事件不是并行运行的。几个例子：

* `RegisterColorHandlersEvent`
* `ModelEvent$BakingCompleted`
* `TextureStitchEvent`
* `RegisterEvent`

一个经验法则是：当事件在 mod 初始化期间应该被处理时，它会在 mod 事件总线上触发。