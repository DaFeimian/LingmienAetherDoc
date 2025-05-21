---
title: 配置
order: 0
toc: content
group:
  title: 其他功能
  order: 9997
---
配置
=============

配置定义了可以应用于模组实例的设置和用户偏好。Forge 使用基于 [TOML][toml] 文件的配置系统，并通过 [NightConfig][nightconfig] 读取。

创建配置
------------------------

可以使用 `IConfigSpec` 的子类型创建配置。Forge通过 `ForgeConfigSpec` 实现该类型，并通过 `ForgeConfigSpec$Builder` 来构造它。构建器可以通过 `Builder#push` 创建一个部分并通过 `Builder#pop` 离开该部分来将配置值分成几个部分。之后，可以通过以下两种方法之一来构建配置：

方法       | 描述
:---       | :---
`build`     | 创建 `ForgeConfigSpec`。
`configure` | 创建一个包含配置值的类和 `ForgeConfigSpec` 的配对。

!!! 注意
    `ForgeConfigSpec$Builder#configure` 通常与 `static` 块和一个接受 `ForgeConfigSpec$Builder` 作为其构造函数一部分的类一起使用，以附加和持有这些值：

    ```java
    // 在某个配置类中
    ExampleConfig(ForgeConfigSpec.Builder builder) {
      // 在此定义值，并使其为 final 字段
    }

    // 在某处，可以访问该构造函数
    static {
      Pair<ExampleConfig, ForgeConfigSpec> pair = new ForgeConfigSpec.Builder()
        .configure(ExampleConfig::new);
      // 将 pair 值存储在某个常量字段中
    }
    ```

每个配置值都可以提供附加上下文以提供附加行为。在完全构建配置值之前必须定义上下文：

方法       | 描述
:---       | :---
`comment`      | 提供配置值作用的描述。可以提供多个字符串以组成多行注释。
`translation`  | 为配置值的名称提供一个翻译键。
`worldRestart` | 必须重新启动世界才能更改配置值。

### ConfigValue

可以使用提供的上下文（如果已定义）通过任何 `#define` 方法来构建配置值。

所有配置值方法至少需要两个组件：

* 表示变量名称的路径：一个用 `.` 分隔的字符串，表示配置值所在的部分
* 当不存在有效配置时的默认值

`ConfigValue` 特定方法需要两个附加组件：

* 一个验证器，用于确保反序列化后的对象是有效的
* 一个表示配置值数据类型的类

```java
// 对于某个 ForgeConfigSpec$Builder builder
ConfigValue<T> value = builder.comment("注释")
  .define("config_value_name", defaultValue);
```

可以使用 `ConfigValue#get` 获得值。为了防止多次从文件读取，值还会被缓存。

#### 其他配置值类型

* **范围值**
    * 描述：值必须在定义的范围内
    * 类类型：`Comparable<T>`
    * 方法名称：`#defineInRange`
    * 附加组件：
      * 配置值的最小值和最大值
      * 一个表示配置值数据类型的类

!!! 注意
    `DoubleValue`、`IntValue` 和 `LongValue` 是范围值，分别指定类为 `Double`、`Integer` 和 `Long`。

* **白名单值**
    * 描述：值必须在提供的集合中
    * 类类型：`T`
    * 方法名称：`#defineInList`
    * 附加组件：
      * 配置中允许的值的集合

* **列表值**
    * 描述：值是一个条目列表
    * 类类型：`List<T>`
    * 方法名称：`#defineList`，如果列表可以为空则使用 `#defineListAllowEmpty`
    * 附加组件：
      * 一个验证器，用于确保从列表中反序列化的元素是有效的

* **枚举值**
    * 描述：在提供的集合中的枚举值
    * 类类型：`Enum<T>`
    * 方法名称：`#defineEnum`
    * 附加组件：
      * 一个将字符串或整数转换为枚举的 getter
      * 配置中允许的值的集合

* **布尔值**
    * 描述：一个 `boolean` 值
    * 类类型：`Boolean`
    * 方法名称：`#define`

注册配置
---------------------------

一旦构建了 `ForgeConfigSpec`，就必须注册它以便 Forge 能够根据需要加载、跟踪和同步配置设置。应通过 `ModLoadingContext#registerConfig` 在模组构造函数中注册配置。可以通过给定类型表示配置所属的一侧、`ForgeConfigSpec` 和可选的特定配置文件名来注册配置。

```java
// 在具有 ForgeConfigSpec CONFIG 的 mod 构造函数中
ModLoadingContext.get().registerConfig(Type.COMMON, CONFIG);
```

下面是可用配置类型的列表：

类型   | 加载位置         | 同步到客户端 | 客户端位置                                  | 服务端位置                                | 默认文件后缀
:---:  | :---:            | :---:        | :---:                                      | :---:                                | :---
CLIENT | 仅客户端        | 否           | `.minecraft/config`                        | 不适用                                  | `-client`
COMMON | 两侧             | 否           | `.minecraft/config`                        | `<server_folder>/config`             | `-common`
SERVER | 仅服务端        | 是           | `.minecraft/saves/<level_name>/serverconfig` | `<server_folder>/world/serverconfig` | `-server`

!!! 提示
    Forge 在其代码库中记录了 [配置类型][type]。

配置事件
--------------------

每当配置被加载或重新加载时发生的操作可以使用 `ModConfigEvent$Loading` 和 `ModConfigEvent$Reloading` 事件完成。事件必须注册到 [mod 事件总线][events]。

!!! 警告
    这些事件对模组的所有配置都会调用；提供的 `ModConfig` 对象应该用于指明哪个配置正在被加载或重新加载。

[toml]: https://toml.io/
[nightconfig]: https://github.com/TheElectronWill/night-config
[type]: https://github.com/MinecraftForge/MinecraftForge/blob/c3e0b071a268b02537f9d79ef8e7cd9b100db416/fmlcore/src/main/java/net/minecraftforge/fml/config/ModConfig.java#L108-L136
[events]: ../concepts/events.md#creating-an-event-handler