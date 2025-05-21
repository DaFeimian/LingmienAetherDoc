---
title: Mod 文件
order: 1
toc: content
group:
  title: 入门指南
  order: 9984
---
Mod 文件
=========

Mod 文件负责确定哪些 mod 被打包到你的 JAR 中，'Mods' 菜单中显示哪些信息，以及你的 mod 应该如何在游戏中加载。

mods.toml
---------

`mods.toml` 文件定义了你的 mod 的元数据。它还包含在 'Mods' 菜单中显示的附加信息以及你的 mod 应该如何加载到游戏中。

该文件使用 [Tom's Obvious, Minimal Language, 或 TOML][toml] 格式。该文件必须存储在您正在使用的资源目录的 `META-INF` 文件夹下（对于 `main` 源集，则是 `src/main/resources/META-INF/mods.toml`）。一个 `mods.toml` 文件可能看起来像这样：

```toml
modLoader="javafml"
loaderVersion="[46,)"

license="All Rights Reserved"
issueTrackerURL="https://github.com/MinecraftForge/MinecraftForge/issues"
showAsResourcePack=false

[[mods]]
  modId="examplemod"
  version="1.0.0.0"
  displayName="Example Mod"
  updateJSONURL="https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json"
  displayURL="https://minecraftforge.net"
  logoFile="logo.png"
  credits="I'd like to thank my mother and father."
  authors="Author"
  description=''' 
  Lets you craft dirt into diamonds. This is a traditional mod that has existed for eons. It is ancient. The holy Notch created it. Jeb rainbowfied it. Dinnerbone made it upside down. Etc.
  '''
  displayTest="MATCH_VERSION"

[[dependencies.examplemod]]
  modId="forge"
  mandatory=true
  versionRange="[46,)"
  ordering="NONE"
  side="BOTH"

[[dependencies.examplemod]]
  modId="minecraft"
  mandatory=true
  versionRange="[1.20]"
  ordering="NONE"
  side="BOTH"
```

`mods.toml` 分为三个部分：与 mod 文件相关的非 mod 特定属性；每个 mod 的 mod 属性部分；以及每个 mod 的或 mods 的依赖性部分的依赖性配置。与 `mods.toml` 文件相关的每个属性将在下面解释，其中 `required` 表示必须指定一个值，否则将抛出异常。

### 非 Mod 特定属性

非 mod 特定属性是与 JAR 本身相关的属性，表示如何加载 mod 以及任何额外的全局元数据。

属性                 | 类型   | 默认值       | 描述                                       | 示例
:---                | :---: | :---:        | :---                                      | :---
`modLoader`         | 字符串 | **mandatory** | Mod 使用的语言加载器。可用于支持替代的语言结构，例如 Kotlin 对象作为主文件，或者通过不同的方法来确定入口点，例如接口或方法。Forge 提供了 Java 加载器 `"javafml"` 和低/无代码加载器 `"lowcodefml"`。 | `"javafml"`
`loaderVersion`     | 字符串 | **mandatory** | 语言加载器的可接受版本范围，以 [Maven 版本范围][mvr] 表示。对于 `javafml` 和 `lowcodefml`，版本是 Forge 版本的主要版本。 | `"[46,)"`
`license`           | 字符串 | **mandatory** | 此 JAR 中的 mod 所提供的许可证。建议将其设置为您正在使用的 [SPDX 标识符][spdx] 和/或许可证链接。您可以访问 https://choosealicense.com/ 以帮助选择您要使用的许可证。 | `"MIT"`
`showAsResourcePack`| 布尔值 | `false`       | 当为 `true` 时，mod 的资源将显示为 '资源包' 菜单中的一个单独的资源包，而不是与 'mod 资源' 包合并。 | `true`
`services`          | 数组   | `[]`          | 你的 mod **使用** 的服务列表数组。这是作为从 Forge 的 Java 平台模块系统实现创建的模块的一部分使用的。 | `["net.minecraftforge.forgespi.language.IModLanguageProvider"]`
`properties`        | 表格   | `{}`          | 一个替换属性表。这被 `StringSubstitutor` 用于替换 `${file.<key>}` 为其对应的值。目前仅用于替换 [mod 特定属性][modsp] 中的 `version`。 | `{ "example" = "1.2.3" }` 由 `${file.example}` 引用
`issueTrackerURL`   | 字符串 | *无*          | 表示报告和跟踪 mod 问题的 URL。 | `"https://forums.minecraftforge.net/"`

!!! 注意
    `services` 属性功能上等同于指定模块中的 [`uses` 指令][uses]，这允许 [*加载*][serviceload] 给定类型的服务。

### Mod 特定属性

Mod 特定属性通过 `[[mods]]` 标头绑定到所指定的 mod。 这是一个 [表格数组][array]；所有键/值属性将被附加到该 mod，直到下一个标头。

```toml
# examplemod1 属性
[[mods]]
modId = "examplemod1"

# examplemod2 属性
[[mods]]
modId = "examplemod2"
```

属性          | 类型   | 默认值                 | 描述                                       | 示例
:---          | :---: | :---:                   | :---                                       | :---
`modId`       | 字符串 | **mandatory**          | 表示此 mod 的唯一标识符。id 必须匹配 `^[a-z][a-z0-9_]{1,63}$`（一个字符串，2-64 个字符；以小写字母开头；由小写字母、数字或下划线组成）。 | `"examplemod"`
`namespace`   | 字符串 | `modId` 的值           | mod 的覆盖命名空间。命名空间必须匹配 `^[a-z][a-z0-9_.-]{1,63}$`（一个字符串，2-64 个字符；以小写字母开头；由小写字母、数字、下划线、点或短划线组成）。目前未使用。 | `"example"`
`version`     | 字符串 | `"1"`                   | mod 的版本，最好是 [Maven 版本变体][mvnver]。设置为 `${file.jarVersion}` 时，它将被替换为 JAR 中 manifest 的 `Implementation-Version` 属性的值（在开发环境中显示为 `0.0NONE`）。 | `"1.20-1.0.0.0"`
`displayName` | 字符串 | `modId` 的值            | mod 的美观名称。用于在屏幕上表示 mod（例如 mod 列表、mod 不匹配）。 | `"Example Mod"`
`description` | 字符串 | `"MISSING DESCRIPTION"` | 在 mod 列表屏幕中显示的 mod 描述。建议使用 [多行文字字符串][multiline]。 | `"This is an example."`
`logoFile`    | 字符串 | *无*                   | 在 mod 列表屏幕中使用的图像文件的名称和扩展名。 logo 必须位于 JAR 的根目录或源集的根目录（例如，主源集的 `src/main/resources`）。 | `"example_logo.png"`
`logoBlur`    | 布尔值 | `true`                  | 是否使用 `GL_LINEAR*` (true) 或 `GL_NEAREST*` (false) 渲染 `logoFile`。 | `false`
`updateJSONURL`| 字符串| *无*                   | 由 [更新检查器][update] 用来确保你玩的 mod 是最新版本的 JSON URL。 | `"https://files.minecraftforge.net/net/minecraftforge/forge/promotions_slim.json"`
`features`    | 表格   | `{}`                    | 见 '[features]'。 | `{ java_version = "17" }`
`modproperties`| 表格  | `{}`                    | 与此 mod 关联的键/值对表。Forge 目前未使用，主要供 mod 使用。 | `{ example = "value" }` 
`modUrl`      | 字符串 | *无*                   | mod 下载页面的 URL。当前未使用。 | `"https://files.minecraftforge.net/"`
`credits`     | 字符串 | *无*                   | 在 mod 列表屏幕上显示的 mod 作者及鸣谢。 | `"The person over here and there."`
`authors`     | 字符串 | *无*                   | 在 mod 列表屏幕上显示的 mod 作者。 | `"Example Person"`
`displayURL`  | 字符串 | *无*                   | 在 mod 列表屏幕上显示的 mod 页面 URL。 | `"https://minecraftforge.net/"`
`displayTest` | 字符串 | `"MATCH_VERSION"`      | 见 '[sides]'。 | `"NONE"`

#### 特性

特性系统允许 mod 要求在加载系统时，某些设置、软件或硬件必须可用。当不能满足特性时，mod 加载将失败，通知用户关于该需求。Forge 目前提供以下特性：

特性            | 描述                                       | 示例
:---:          | :---                                      | :---
`java_version` | Java 版本的可接受版本范围，以 [Maven 版本范围][mvr] 表示。应该是 Minecraft 使用的支持版本。 | `"[17,)"`

### 依赖配置

Mods 可以指定其依赖性，这些依赖性将在 Forge 加载 mod 之前进行检查。这些配置是使用 [表格数组][array] `[[dependencies.<modid>]]` 创建的，其中 `modid` 是依赖性的 mod 标识符。

属性        | 类型   | 默认值       | 描述                                       | 示例
:---        | :---: | :---:         | :---                                       | :---
`modId`     | 字符串 | **mandatory** | 添加为依赖项的 mod 的标识符。                | `"example_library"`
`mandatory` | 布尔值 | **mandatory** | 当此依赖性未满足时，游戏是否应崩溃。         | `true`
`versionRange`| 字符串 | `""`        | 语言加载器的可接受版本范围，以 [Maven 版本范围][mvr] 表示。空字符串匹配任何版本。 | `"[1, 2)"`
`ordering`  | 字符串 | `"NONE"`      | 定义此 mod 是否必须在此依赖项之前 (`"BEFORE"`) 或之后 (`"AFTER"`) 加载。如果顺序无关紧要，返回 `"NONE"`。 | `"AFTER"`
`side`      | 字符串 | `"BOTH"`      | 该依赖项必须存在的 [物理端][dist]：`"CLIENT"`、`"SERVER"` 或 `"BOTH"`。| `"CLIENT"`
`referralUrl`| 字符串 | *无*        | 依赖项下载页面的 URL。当前未使用。          | `"https://library.example.com/"`

!!! 警告
    两个 mod 的 `ordering` 可能导致由于循环依赖而崩溃：例如，mod A 必须在 mod B `"BEFORE"` 加载，mod B 必须在 mod A `"BEFORE"` 加载。

Mod 入口点
---------

现在 `mods.toml` 已经完成，我们需要提供一个入口点来开始编写 mod。入口点基本上是执行 mod 的起点。入口点本身由 `mods.toml` 中使用的语言加载器确定。

### `javafml` 和 `@Mod`

`javafml` 是 Forge 提供的 Java 编程语言的语言加载器。入口点使用带有 `@Mod` 注解的公共类定义。`@Mod` 的值必须包含 `mods.toml` 中指定的一个 mod id。从那里开始，所有初始化逻辑（例如，[注册事件][events]、[添加 `DeferredRegister`][registration]）都可以在类的构造函数内指定。可以从 `FMLJavaModLoadingContext` 获取 mod 总线。

```java
@Mod("examplemod") // 必须匹配 mods.toml
public class Example {

  public Example() {
    // 在这里初始化逻辑
    var modBus = FMLJavaModLoadingContext.get().getModEventBus();

    // ...
  }
}
```

### `lowcodefml`

`lowcodefml` 是用作数据包和资源包作为 mod 分发的一种语言加载器，而无需代码入口点。它被指定为 `lowcodefml` 而不是 `nocodefml`，以便为将来可能需要少量代码的次要添加做准备。

[toml]: https://toml.io/
[mvr]: https://maven.apache.org/enforcer/enforcer-rules/versionRanges.html
[spdx]: https://spdx.org/licenses/
[modsp]: #mod-specific-properties
[uses]: https://docs.oracle.com/javase/specs/jls/se17/html/jls-7.html#jls-7.7.3
[serviceload]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/ServiceLoader.html#load(java.lang.Class)
[array]: https://toml.io/en/v1.0.0#array-of-tables
[mvnver]: ./versioning.md
[multiline]: https://toml.io/en/v1.0.0#string
[update]: ../misc/updatechecker.md
[features]: #features
[sides]: ../concepts/sides.md#writing-one-sided-mods
[dist]: ../concepts/sides.md#different-kinds-of-sides
[events]: ../concepts/events.md
[registration]: ../concepts/registries.md#deferredregister