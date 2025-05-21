---
title: 介绍
order: 0
toc: content
group:
  title: 入门指南
  order: 9984
---
入门指南：Forge

==========================

如果您从未制作过Forge模组，本节将提供设置Forge开发环境所需的最少信息。其余的文档将指导您如何从这里开始。

先决条件

-------------

* 安装Java 17开发工具包（JDK）和64位Java虚拟机（JVM）。Forge 推荐并官方支持 [Eclipse Temurin][jdk]。

    !!! 警告
        确保您使用的是64位JVM。您可以通过在终端中运行`java -version`来检查。如果使用32位JVM，在使用[ForgeGradle]时会出现一些问题。

* 熟悉集成开发环境（IDE）。
    * 建议使用带有Gradle集成的IDE。

从零开始制作模组

--------------------

1. 从[Forge文件站点][files]下载模组开发工具包（MDK），点击“Mdk”并在等待一段时间后点击右上角的“Skip”按钮。建议尽可能下载最新版本的Forge。
2. 将下载的MDK解压到一个空目录中。这将是您模组的目录，其中应包含一些gradle文件和一个包含示例模组的`src`子目录。

    !!! 注意
        有一些文件可以在不同模组之间重复使用。这些文件是：
  
        * `gradle`子目录
        * `build.gradle`
        * `gradlew`
        * `gradlew.bat`
        * `settings.gradle`

        `src`子目录无需在各个工作空间之间复制；但如果稍后创建java(`src/main/java`)和资源(`src/main/resources`)目录，您可能需要刷新Gradle项目。

3. 打开您选择的IDE：
    * Forge仅明确支持在Eclipse和IntelliJ IDEA上开发，但Visual Studio Code也有额外的运行配置。无论如何，任何环境，如Apache NetBeans到Vim/Emacs，都可以使用。
    * Eclipse和IntelliJ IDEA的Gradle集成（默认安装和启用）将在导入或打开时处理其余的初始工作区设置。这包括从Mojang、MinecraftForge等下载必要的包。对于Visual Studio Code，需要'Gradle for Java'插件来完成相同的操作。
    * 几乎所有与项目相关文件（如`build.gradle`、`settings.gradle`等）的更改都需要调用Gradle以重新评估项目。一些IDE带有“刷新”按钮来执行此操作；不过，也可以通过终端中的`gradlew`来完成。
4. 为您选择的IDE生成运行配置：
    * **Eclipse**：运行`genEclipseRuns`任务。
    * **IntelliJ IDEA**：运行`genIntellijRuns`任务。如果出现“未指定模块”错误，将[`ideaModule`属性][config]设置为您的“主”模块（通常是`${project.name}.main`）。
    * **Visual Studio Code**：运行`genVSCodeRuns`任务。
    * **其他IDE**：您可以直接使用`gradle run*`（例如，`runClient`、`runServer`、`runData`、`runGameTestServer`）来运行配置。这些也可以用于支持的IDE。

自定义模组信息

--------------------------------

编辑`build.gradle`文件以自定义模组的构建方式（例如，文件名、构件版本等）。

!!! 重要
    除非您知道自己在做什么，否则**不要**编辑`settings.gradle`文件。该文件指定[ForgeGradle]被上传到的存储库。

### 推荐的`build.gradle`自定义

#### 模组 ID 替换

将`examplemod`的所有出现，包括[`mods.toml`和主模组文件][modfiles]，替换为您的模组ID。这还包括通过设置`base.archivesName`来更改您构建的文件名（这通常设置为您的模组ID）。

```gradle
// 在某个build.gradle中
base.archivesName = 'mymod'
```

#### 组 ID

`group`属性应设置为您的[顶级包][packaging]，可以是您拥有的域名或您的电子邮件地址：

类型      | 值              | 顶级包
:---:     | :---:            | :---
域名      | example.com      | `com.example`
子域名    | example.github.io| `io.github.example`
电子邮件  | example@gmail.com| `com.gmail.example`

```gradle
// 在某个build.gradle中
group = 'com.example'
```

您的Java源码中的包 (`src/main/java`) 也应符合此结构，其中一个内部包代表模组ID：

```text
com
- example（组属性中指定的顶级包）
  - mymod（模组ID）
    - MyMod.java（重命名的ExampleMod.java）
```

#### 版本

将`version`属性设置为您模组的当前版本。我们建议使用[Maven版本的变体][mvnver]。

```gradle
// 在某个build.gradle中
version = '1.20-1.0.0.0'
```

### 其他配置

可以在[ForgeGradle]文档中找到其他配置。

构建和测试您的模组

-----------------------------

1. 要构建您的模组，运行`gradlew build`。默认情况下，这将在`build/libs`中输出一个名为`[archivesBaseName]-[version].jar`的文件。此文件可以放置在启用了Forge的Minecraft设置中的`mods`文件夹中或分发。
2. 要在测试环境中运行您的模组，可以使用生成的运行配置或使用相关任务（例如`gradlew runClient`）。这将从运行目录（默认为'run'）启动Minecraft，以及指定的任何源集。默认的MDK包括`main`源集，因此在`src/main/java`中编写的任何代码将被应用。
3. 如果您运行一个专用服务器，无论是通过运行配置还是`gradlew runServer`，服务器最初会立即关闭。您需要通过编辑运行目录中的`eula.txt`文件来接受Minecraft EULA。一旦接受，服务器将加载，然后可以通过直接连接到`localhost`来访问。

!!! 注意
    您应始终在专用服务器环境中测试您的模组。这包括[仅限客户端的模组][client]，因为它们在服务器加载时不应执行任何操作。

[jdk]: https://adoptium.net/temurin/releases?version=17 "Eclipse Temurin 17 预构建二进制文件"
[ForgeGradle]: https://docs.minecraftforge.net/en/fg-6.x

[files]: https://files.minecraftforge.net "Forge文件发布站点"
[config]: https://docs.minecraftforge.net/en/fg-6.x/configuration/runs/

[modfiles]: ./modfiles.md
[packaging]: ./structuring.md#packaging
[mvnver]: ./versioning.md
[client]: ../concepts/sides.md#writing-one-sided-mods