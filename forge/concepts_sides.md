---
title: Minecraft 中的边界
order: 1
toc: content
group:
  title: 核心概念
  order: 9985
---
Minecraft 中的边界
===================

在对 Minecraft 进行模组开发时，需要理解一个非常重要的概念，那就是两个边界：*客户端* 和 *服务器*。在这方面存在许多、许多常见的误解和错误，这些错误可能导致不会使游戏崩溃的 bug，而是产生意料之外且难以预测的影响。

不同类型的边界
------------------------

当我们说到“客户端”或“服务器”时，一般会有一个直观的理解，即我们所谈论的游戏部分。毕竟，客户端是用户交互的部分，而服务器是用户用于连接多人游戏的部分。看起来很简单，对吗？

事实证明，即便是这两个术语也可能存在一些歧义。这里我们对“客户端”和“服务器”的四种可能含义进行消除歧义：

* 物理客户端 - *物理客户端* 是每当你从启动器启动 Minecraft 时运行的整个程序。在游戏的图形界面、可交互生存期间运行的所有线程、进程和服务都是物理客户端的一部分。
* 物理服务器 - 通常称为专用服务器，*物理服务器* 是每当您启动任何不带可玩的 GUI 的 `minecraft_server.jar` 时运行的整个程序。
* 逻辑服务器 - *逻辑服务器* 负责运行游戏逻辑：生成生物、天气、更新物品栏、健康值、AI 以及所有其他游戏机制。逻辑服务器存在于物理服务器中，但也可以与逻辑客户端一起运行在物理客户端之内，作为单人世界。逻辑服务器始终在名为 `Server Thread` 的线程中运行。
* 逻辑客户端 - *逻辑客户端* 接受来自玩家的输入并将其传递给逻辑服务器。此外，它还从逻辑服务器接收信息并以图形方式呈现给玩家。逻辑客户端在 `Render Thread` 中运行，尽管通常会生成多个其他线程来处理音频和区块渲染批处理等任务。

在 MinecraftForge 的代码库中，物理边界由一个名为 `Dist` 的枚举表示，而逻辑边界由一个名为 `LogicalSide` 的枚举表示。

执行边界特定的操作
-----------------------------------

### `Level#isClientSide`

这个布尔值检查将是您用于检查边界的最常用方法。在 `Level` 对象上查询此字段可以确定该级别所属的**逻辑**边界。也就是说，如果此字段为 `true`，则该级别当前在逻辑客户端上运行。如果字段为 `false`，则该级别在逻辑服务器上运行。因此，物理服务器在此字段中将始终为 `false`，但是我们不能因此假设 `false` 意味着物理服务器，因为在物理客户端（即单人世界）内的逻辑服务器，该字段也可能为 `false`。

每当您需要确定是否应运行游戏逻辑和其他机制时，请使用此检查。例如，如果您想在玩家每次单击您的方块时对其造成伤害，或者让您的机器将泥土加工成钻石，您应仅在确保 `#isClientSide` 为 `false` 后进行。将游戏逻辑应用于逻辑客户端在最佳情况下会导致同步失调（幽灵实体、同步失调的统计数据等），在最坏情况下会导致崩溃。

这个检查应该被用作您的默认选择。除了 `DistExecutor`，您几乎不需要其他方法来确定边界和调整行为。

### `DistExecutor`

考虑到为客户端和服务器模组使用单个“通用”jar 的解决方案，以及将物理边界拆分为两个 jar 的做法，一个重要的问题是：如何使用仅在一个物理边界上存在的代码？`net.minecraft.client` 中的所有代码仅存在于物理客户端上。如果您编写的任何类以任何方式引用这些名称，那么当相应的类在那些名称不存在的环境中加载时，将会导致游戏崩溃。初学者中很常见的错误是调用 `Minecraft.getInstance().<doStuff>()` 在方块或方块实体类中，而这将在具有任一物理服务器时立即导致崩溃。

我们该如何解决这个问题呢？幸运的是，FML 提供了 `DistExecutor`，它为在不同物理边界上运行不同方法或者仅在一个边界上运行单个方法提供了多种方法。

!!! 注意
    理解 FML 是基于**物理**边界进行检查的很重要。单人世界（物理客户端内的逻辑服务器 + 逻辑客户端）将始终使用 `Dist.CLIENT`！

`DistExecutor` 通过接收供应商来执行方法，从而有效地利用 [`invokedynamic` JVM 指令][invokedynamic] 来防止类加载。执行的方法应该是静态的并位于不同的类中。此外，如果静态方法没有参数，则应使用方法引用而不是供应商来执行方法。

`DistExecutor` 中有两个主要方法：`#runWhenOn` 和 `#callWhenOn`。这些方法接受应在其上运行执行方法的物理边界以及供应的执行方法，分别运行或返回结果。

这两个方法又细分为 `#safe*` 和 `#unsafe*` 变体。安全和不安全变体是对于它们的用途的误称。主要区别在于，当处于开发环境中时，`#safe*` 方法将验证供应的执行方法是一个返回方法引用到另一个类的 lambda，否则将抛出错误。在生产环境中，`#safe*` 和 `#unsafe*` 在功能上是相同的。

```java
// 在客户端类：ExampleClass
public static void unsafeRunMethodExample(Object param1, Object param2) {
  // ...
}

public static Object safeCallMethodExample() {
  // ...
}

// 在某个通用类中
DistExecutor.unsafeRunWhenOn(Dist.CLIENT, () -> ExampleClass.unsafeRunMethodExample(var1, var2));

DistExecutor.safeCallWhenOn(Dist.CLIENT, () -> ExampleClass::safeCallMethodExample);
```

!!! 警告
    由于 Java 9+ 中 `invokedynamic` 工作方式的变化，所有 `DistExecutor` 方法的 `#safe*` 变体在开发环境中会抛出原始异常并包裹在 `BootstrapMethodError` 中。应该使用 `#unsafe*` 变体或检查 [`FMLEnvironment#dist`][dist]。

### 线程组

如果 `Thread.currentThread().getThreadGroup() == SidedThreadGroups.SERVER` 为真，则当前线程可能在逻辑服务器上。否则，可能是在逻辑客户端上。当您无法访问 `Level` 对象来检查 `isClientSide` 时，这种方法非常有用，它**猜测**您在哪个逻辑边界上运行，主要是通过查看当前运行线程的组。因为这是一种猜测，此方法应该仅在其他选项用尽时使用。在几乎每种情况下，您都应该优先检查 `Level#isClientSide`。

### `FMLEnvironment#dist` 和 `@OnlyIn`

`FMLEnvironment#dist` 持有您的代码运行的**物理**边界。由于在启动时确定，因此它的结果不依赖于猜测。然而，其使用案例是有限的。

用 `@OnlyIn(Dist)` 注释方法或字段，表明加载器应该在指定的**物理**边界上完全剥离出相应的成员。通常仅在浏览反编译的 Minecraft 代码时看到这些注释，指示了被 Mojang 混淆器剥离的方法。使用这个注释没有理由。请使用 `DistExecutor` 或在 `FMLEnvironment#dist` 上进行检查。

常见错误
---------------

### 逻辑边界跨越

每当您想要在逻辑边界之间传递信息时，必须**始终**使用网络数据包。在单人游戏场景中，要将数据从逻辑服务器直接传递到逻辑客户端是非常具有诱惑性的。

实际上，这在单人世界中常常通过静态字段无意中完成。由于逻辑客户端和逻辑服务器在单人游戏场景中共享相同的 JVM，两个线程对静态字段的读写将导致各种竞争条件和与多线程相关的经典问题。

通过在逻辑服务器上运行或可以运行的公共代码中访问物理客户端专有类（如 `Minecraft`）可以显式的重现这种错误。对于那些在物理客户端中进行调试的初学者来说，这种错误很容易被忽略。在物理客户端中代码可以正常工作，但在物理服务器上将立即崩溃。


编写单边模组
----------------------

在最近的版本中，Minecraft Forge 移除了 mods.toml 中的“边界”属性。这意味着无论模组加载在物理客户端还是物理服务器上，您的模组都应工作。因此，对于单边模组，您通常应在 `DistExecutor#safeRunWhenOn` 或 `DistExecutor#unsafeRunWhenOn` 中注册您的事件处理器，而不是在模组构造函数中直接调用相关的注册方法。基本上，如果您的模组加载在错误的边界上，它应简单地不执行操作，不监听任何事件，等等。按其性质，一个单边模组不应注册方块、物品等，因为它们需要在另一边界上也可用。

此外，如果您的模组是单边的，它通常不会禁止用户加入缺少该模组的服务器。因此，您应该在 [mods.toml][structuring] 中将 `displayTest` 属性设置为必要的值。

```toml
[[mods]]
  # ...

  # MATCH_VERSION 表示如果客户端和服务器上的版本不同，您的模组将导致一个红色 X。这是默认行为，如果您的模组有服务器和客户端元素，应该选择该选项。
  # IGNORE_SERVER_VERSION 表示如果模组在服务器上存在但不在客户端存在，则不会导致红色 X。如果您是服务器专用模组，应使用此选项。
  # IGNORE_ALL_VERSION 表示如果模组在客户端或服务器上存在，则不会导致红色 X。这属于特殊情况，仅在您的模组没有服务器组件时使用。
  # NONE 表示未在模组上设置任何显示测试。您需要自行设置，请参阅 IExtensionPoint.DisplayTest 获取更多信息。您可以使用此值定义任何所需的方案。
  # 重要提示：这不是关于模组加载在哪些环境（客户端或专用服务器）下的指令。模组应当在其任何加载的环境下加载（即使不做任何事情）。
  displayTest="IGNORE_ALL_VERSION" # 如果未指定，则默认值为 MATCH_VERSION（#optional）
```

如果要使用自定义显示测试，则 `displayTest` 选项应设置为 `NONE`，并且需要注册一个 `IExtensionPoint$DisplayTest` 扩展：

```java
// 确保模组在另一个网络边界缺失时不会导致客户端显示服务器不兼容
ModLoadingContext.get().registerExtensionPoint(IExtensionPoint.DisplayTest.class, () -> new IExtensionPoint.DisplayTest(() -> NetworkConstants.IGNORESERVERONLY, (a, b) -> true));
```

这告知客户端应忽略服务器版本的缺失，并告知服务器不应告诉客户端模组应该存在。因此，这段代码同时适用于仅客户端或仅服务器的模组。


[invokedynamic]: https://docs.oracle.com/javase/specs/jvms/se17/html/jvms-6.html#jvms-6.5.invokedynamic
[dist]: #fmlenvironmentdist-and-onlyin
[structuring]: ../gettingstarted/modfiles.md#modstoml