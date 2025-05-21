---
title: 游戏测试
order: 2
toc: content
group:
  title: 其他功能
  order: 9997
---
游戏测试
==========

游戏测试是一种在游戏中运行单元测试的方法。该系统被设计为可扩展且能并行运行大量不同的测试，从而高效地测试对象的交互和行为。这只是该框架的众多应用之一。

创建游戏测试
--------------------

标准游戏测试遵循三个基本步骤：

1. 加载一个结构或模板，其中包含测试交互或行为的场景。
2. 一个方法执行对场景的逻辑操作。
3. 执行方法逻辑。如果达到了成功状态，则测试成功。否则，测试失败，结果存储在场景旁的讲台中。

因此，要创建一个游戏测试，必须有一个包含场景初始状态的现有模板以及提供执行逻辑的方法。

### 测试方法

游戏测试方法是一个 `Consumer<GameTestHelper>` 引用，意味着它接收一个 `GameTestHelper` 而不返回任何内容。为了使游戏测试方法被识别，必须有一个 `@GameTest` 注解：

```java
public class ExampleGameTests {
  @GameTest
  public static void exampleTest(GameTestHelper helper) {
    // 执行操作
  }
}
```

`@GameTest` 注解还包含配置游戏测试运行方式的成员。

```java
// 某个类中
@GameTest(
  setupTicks = 20L, // 测试花费20个刻来设置执行
  required = false // 失败被记录，但不影响批次执行
)
public static void exampleConfiguredTest(GameTestHelper helper) {
  // 执行操作
}
```

#### 相对定位

所有 `GameTestHelper` 方法都会将结构模板场景中的相对坐标转换为其绝对坐标，使用当前结构方块的位置。为了便于在相对和绝对定位之间转换，可以分别使用 `GameTestHelper#absolutePos` 和 `GameTestHelper#relativePos`。

在游戏中可以加载结构，通过[test命令][test]获得结构模板的相对位置，将玩家放置在目标位置，最后运行 `/test pos` 命令。这将获取玩家相对于200个方块内最近结构的坐标。该命令将在聊天中导出可复制的文本组件作为最终的局部变量使用。

!!! 提示
    通过 `/test pos` 生成的局部变量可以通过在命令末尾附加其引用名来指定其名称：

    ```bash
    /test pos <var> # 导出为 'final BlockPos <var> = new BlockPos(...);'
    ```

#### 成功完成

游戏测试方法只负责一件事：在有效完成时标记测试成功。如果在达到超时之前未实现成功状态（由 `GameTest#timeoutTicks` 定义），则测试自动失败。

在 `GameTestHelper` 中有许多抽象的方法用来定义成功状态；然而，有四个方法需要特别注意。

方法               | 描述
:---:              | :---
`#succeed`         | 测试被标记为成功。
`#succeedIf`       | 立即测试提供的 `Runnable`，如果没有抛出 `GameTestAssertException`，则成功。如果测试未在立即刻成功，则被标记为失败。
`#succeedWhen`     | 提供的 `Runnable` 每刻被测试直到超时，如果某个刻的检查没有抛出 `GameTestAssertException`，则成功。
`#succeedOnTickWhen` | 提供的 `Runnable` 在指定的刻 测试，如果没有抛出 `GameTestAssertException`，则成功。如果 `Runnable` 在其他任何刻成功，将被标记为失败。

!!! 重要
    游戏测试每刻都会执行，直到测试被标记为成功。因此，安排在给定时刻成功的方法必须小心，总是在任何之前的时刻失败。

#### 安排操作

并非所有的操作都会在测试开始时发生。操作可以被安排在特定的时间或间隔发生：

方法               | 描述
:---:              | :---
`#runAtTickTime`   | 操作在指定刻运行。
`#runAfterDelay`   | 操作在当前刻后的 `x` 刻运行。
`#onEachTick`      | 操作在每个刻运行。

#### 断言

在游戏测试期间的任何时候，都可以进行断言来检查某个条件是否为真。在 `GameTestHelper` 中有许多断言方法；不过，它简化为当适当的状态未满足时抛出一个 `GameTestAssertException`。

### 生成的测试方法

如果需要动态生成游戏测试方法，可以创建一个测试方法生成器。这些方法不接收参数，而返回 `TestFunction` 的集合。为了使测试方法生成器被识别，它必须有一个 `@GameTestGenerator` 注解：

```java
public class ExampleGameTests {
  @GameTestGenerator
  public static Collection<TestFunction> exampleTests() {
    // 返回 TestFunction 的集合
  }
}
```

#### TestFunction

`TestFunction` 是被 `@GameTest` 注解持有的方法运行测试的信息。

!!! 提示
    使用 `@GameTest` 注解的方法通过 `GameTestRegistry#turnMethodIntoTestFunction` 转换为 `TestFunction`。该方法可以作为参考，在不使用注解的情况下创建 `TestFunction`。

### 批处理

游戏测试可以成批执行，而不是按注册顺序执行。通过提供相同的 `GameTest#batch` 字符串可以将测试添加到批处理中。

单独使用批处理并没有什么用。然而，批处理可以用于在测试运行的当前级别上进行设置和拆除操作。这可以通过使用 `@BeforeBatch` 进行设置或 `@AfterBatch` 进行拆除的注解来完成。`#batch` 方法必须与提供给游戏测试的字符串匹配。

批处理方法是 `Consumer<ServerLevel>` 引用，意味着它们接收一个 `ServerLevel` 并不返回任何内容：

```java
public class ExampleGameTests {
  @BeforeBatch(batch = "firstBatch")
  public static void beforeTest(ServerLevel level) {
    // 执行设置
  }

  @GameTest(batch = "firstBatch")
  public static void exampleTest2(GameTestHelper helper) {
    // 执行操作
  }
}
```

注册游戏测试
-----------------------

在游戏中运行游戏测试之前，必须注册。可以通过 `@GameTestHolder` 注解或 `RegisterGameTestsEvent` 进行注册。这两个注册方法仍需将测试方法注解为 `@GameTest`、`@GameTestGenerator`、`@BeforeBatch` 或 `@AfterBatch`。

### GameTestHolder

`@GameTestHolder` 注解注册类型（类、接口、枚举或记录）内的任何测试方法。`@GameTestHolder` 包含一个多用途的方法。在此情况下，提供的 `#value` 必须是模组的 ID；否则，默认配置下测试将不会运行。

```java
@GameTestHolder(MODID)
public class ExampleGameTests {
  // ...
}
```

### RegisterGameTestsEvent

`RegisterGameTestsEvent` 也可以使用 `#register` 注册类或方法。事件监听器必须 [添加][event] 到模组事件总线上。以这种方式注册的测试方法必须在每个 `@GameTest` 注解的方法中提供其模组 ID 给 `GameTest#templateNamespace`。

```java
// 在某个类中
public void registerTests(RegisterGameTestsEvent event) {
  event.register(ExampleGameTests.class);
}

// 在 ExampleGameTests
@GameTest(templateNamespace = MODID)
public static void exampleTest3(GameTestHelper helper) {
  // 执行设置
}
```

!!! 注意
    提供给 `GameTestHolder#value` 和 `GameTest#templateNamespace` 的值可以与当前模组 ID 不同。在 [buildscript][namespaces] 配置中需要进行更改。

结构模板
-------------------

游戏测试在由结构或模板加载的场景中进行。所有模板定义场景的尺寸和初始数据（方块和实体）将被加载。模板必须作为 `.nbt` 文件存储在 `data/<namespace>/structures` 目录中。

!!! 提示
    可以使用结构方块创建并保存结构模板。

模板的位置由几个因素决定：

* 模板的命名空间是否指定。
* 是否应该在模板名称前加上类名。
* 模板名称是否指定。

模板的命名空间由 `GameTest#templateNamespace` 决定，如果未指定，则由 `GameTestHolder#value` 决定，如果两者都未指定，则为 `minecraft`。

如果 `@PrefixGameTestTemplate` 应用于具有测试注解的类或方法并设置为 `false`，则简单类名将不作为前缀。否则，简单类名将被小写并在模板名称之前加上点号。

模板的名称由 `GameTest#template` 决定。如果未指定，则使用小写的方法名称。

```java
// 所有结构的模组 ID 将是 MODID
@GameTestHolder(MODID)
public class ExampleGameTests {

  // 类名作为前缀，模板名称未指定
  // 模板位置：'modid:examplegametests.exampletest'
  @GameTest
  public static void exampleTest(GameTestHelper helper) { /*...*/ }

  // 类名不作为前缀，模板名称未指定
  // 模板位置：'modid:exampletest2'
  @PrefixGameTestTemplate(false)
  @GameTest
  public static void exampleTest2(GameTestHelper helper) { /*...*/ }

  // 类名作为前缀，模板名称指定
  // 模板位置：'modid:examplegametests.test_template'
  @GameTest(template = "test_template")
  public static void exampleTest3(GameTestHelper helper) { /*...*/ }

  // 类名不作为前缀，模板名称指定
  // 模板位置：'modid:test_template2'
  @PrefixGameTestTemplate(false)
  @GameTest(template = "test_template2")
  public static void exampleTest4(GameTestHelper helper) { /*...*/ }
}
```

运行游戏测试
------------------

可以使用 `/test` 命令运行游戏测试。`test` 命令是高度可配置的；不过，只有少数命令对运行测试重要：

子命令   | 描述
:---:   | :---
`run`   | 运行指定的测试：`run <test_name>`。
`runall`| 运行所有可用的测试。
`runthis` | 运行玩家15个方块内最近的测试。
`runthese` | 运行玩家200个方块内的测试。
`runfailed` | 运行上一次运行中失败的所有测试。

!!! 注意
    子命令在测试命令后面执行：`/test <subcommand>`。

构建脚本配置
--------------------------

游戏测试在构建脚本（`build.gradle` 文件）中提供了额外的配置，用于在不同设置中运行和集成。

### 启用其他命名空间

如果按照建议[设置][buildscript]构建脚本，则仅会启用当前模组 ID 下的游戏测试。要启用其他命名空间以加载游戏测试，运行配置必须将属性 `forge.enabledGameTestNamespaces` 设置为一个字符串，指定用逗号分隔的每个命名空间。如果属性为空或未设置，则将加载所有命名空间。

```gradle
// 在运行配置内
property 'forge.enabledGameTestNamespaces', 'modid1,modid2,modid3'
```

!!! 警告
    命名空间之间不能有空格; 否则，命名空间将无法正确加载。

### 游戏测试服务器运行配置

游戏测试服务器是一个特殊配置，用于运行构建服务器。构建服务器返回一个退出代码，即必需失败的游戏测试数量。所有失败的测试，无论是必需还是可选，都会被记录。该服务器可以通过 `gradlew runGameTestServer` 运行。

### 启用其他运行配置中的游戏测试

默认情况下，仅 `client`、`server` 和 `gameTestServer` 运行配置启用游戏测试。如果其他运行配置应运行游戏测试，则必须将 `forge.enableGameTest` 属性设置为 `true`。

```gradle
// 在运行配置内
property 'forge.enableGameTest', 'true'
```

[test]: #running-game-tests
[namespaces]: #enabling-other-namespaces
[event]: ../concepts/events.md#creating-an-event-handler
[buildscript]: ../gettingstarted/index.md#simple-buildgradle-customizations