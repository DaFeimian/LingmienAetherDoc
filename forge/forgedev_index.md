---
title: 入门指南
order: 0
toc: content
group:
  title: 为Forge做贡献
  order: 9999
---

入门指南
===============

如果您决定为 Forge 贡献代码，您需要进行一些特别的步骤以便开始开发。一个简单的模组开发环境不足以直接处理 Forge 的代码库。相反，您可以使用以下指南来帮助您完成设置，并开始改进 Forge！

分叉和克隆仓库
----------------------------------

与大多数主要的开源项目一样，Forge 托管在 [GitHub][github] 上。如果您之前曾为其他项目贡献过代码，您应该已经熟悉这个流程并可以直接跳到下一节。

对于刚接触 Git 协作的初学者，以下是两个简单的步骤帮助您入门。

!!! 注意
    本指南假设您已经设置好了 GitHub 账户。如果没有，请访问他们的 [注册页面][register] 创建一个账户。此外，本指南并不是一个 git 使用教程。如果您在使用上有困难，请先参考其他资料。

### 分叉

首先，您需要通过点击右上角的“Fork”按钮“分叉” [MinecraftForge 仓库][forgerepo]。如果您属于某个组织，请选择您希望您的分叉托管的账户。

分叉仓库是必要的，因为并不是每个 GitHub 用户都可以免费访问每个仓库。相反，您需要创建一个原始仓库的副本，以便稍后通过所谓的 Pull Request 来贡献您的更改，您将在后面了解更多。

### 克隆

在分叉仓库后，是时候获取本地访问权以便进行一些更改了。为此，您需要将仓库克隆到您的本地机器上。

使用您喜欢的 git 客户端，将您的分叉克隆到您选择的目录中。以下是一个可以在所有正确配置的系统上运行的命令行片段，并将仓库克隆到当前目录下一个名为 "MinecraftForge" 的目录中（请注意，您需要将 `<User>` 替换为您的用户名）：

```git clone https://github.com/<User>/MinecraftForge```

# 检出正确的分支

分叉和克隆仓库是为 Forge 开发的唯一强制步骤。然而，为了简化创建 Pull Request 的过程，最好是配合分支进行工作。

建议为您计划提交的每个 PR 创建并检出一个分支。通过这种方式，您可以始终保留 Forge 的最新更改以用于新的 PR，而同时仍在处理较旧的补丁。

完成此步骤后，您可以开始进行您的开发环境设置。

设置环境
--------------------------

根据您喜欢的 IDE，您需要遵循一组不同的推荐步骤以成功设置开发环境。

### Eclipse

由于 Eclipse 工作空间的工作方式，ForgeGradle 可以完成大部分工作以帮助您开始使用 Forge 工作空间。

1. 打开终端/命令提示符并导航到您的克隆分叉的目录。
2. 输入 `./gradlew setup` 并按回车键。等待 ForgeGradle 完成操作。
3. 输入 `./gradlew genEclipseRuns` 并按回车键。同样，等待 ForgeGradle 完成操作。
4. 打开您的 Eclipse 工作空间，然后进入 `File -> Import -> General -> Existing Gradle Project`。
5. 在打开的对话框中，浏览到仓库的目录，并选择“Project root directory”选项。
6. 点击“Finish”按钮完成导入。

这样您就可以在 Eclipse 上运行了。无需额外步骤来运行测试模组。像处理任何其他项目一样，直接点击“Run”并选择合适的运行配置即可。

### IntelliJ IDEA

JetBrains 的旗舰 IDE 在 [Gradle][gradle] 方面提供了很好的集成支持：Forge 选择的构建系统。然而，由于 Minecraft 模组开发的某些特殊性，还有一些额外的步骤需要执行，以确保一切都能正常运作。

#### IDEA 2021 及以后版本
1. 启动 IntelliJ IDEA 2021。
    - 如果您已经打开了其他项目，请使用 File -> Close project 选项关闭该项目。
2. 在“Welcome to IntelliJ IDEA”窗口的项目选项卡中，点击右上角的“Open”按钮并选择您之前克隆的 MinecraftForge 文件夹。
3. 如果提示，请点击“Trust Project”。
4. 当 IDEA 完成项目导入并索引其文件后，运行 Gradle setup 任务。您可以这样做：
    - 打开屏幕右侧的 Gradle 侧边栏，然后打开 forge 项目树，选择 Tasks，接着选择 other 并双击 Forge -> Tasks -> other -> `setup` 中的 `setup` 任务（可能显示为 `MinecraftForge[Setup]`）。
5. 生成运行配置：
    - 打开屏幕右侧的 Gradle 侧边栏，然后打开 forge 项目树，选择 Tasks，接着选择 other 并双击 Forge -> Tasks -> forgegradle runs -> `genIntellijRuns` 中的 `genIntellijRuns` 任务（可能显示为 `MinecraftForge[genIntellijRuns]`）。
- 如果在进行更改之前构建时出现许可错误，运行 `updateLicenses` 任务可能会有所帮助。该任务也位于 Forge -> Tasks -> other。

#### IDEA 2019-2020
在设置方面，IDEA 2021 和这些版本之间存在一些小差异。

1. 将 Forge 的 `build.gradle` 导入为 IDEA 项目。为此，只需在 `Welcome to IntelliJ IDEA` 启动画面中点击 `Import Project`，然后选择 `build.gradle` 文件。
1. 当 IDEA 完成项目导入并索引文件后，运行 Gradle setup 任务。可以是：
    1. 打开屏幕右侧的 Gradle 侧边栏，然后打开 `forge` 项目树，选择 `Tasks`，接着选择 `other` 并双击 `setup` 任务（可能显示为 `MinecraftForge[Setup]`）。或者，您还可以：
    1. 连续按两次 CTRL 键，然后在弹出的 `Run` 命令窗口中输入 `gradle setup`。

然后，您可以使用 `forge_client` gradle 任务 (`Tasks -> fg_runs -> forge_client`) 运行 Forge：右键任务并选择 `Run` 或 `Debug`。

现在，您应该可以借助您引入的更改，在 Forge 和 Vanilla 代码库上进行模组开发。

进行更改和 Pull Requests
--------------------------------

一旦您设置好了开发环境，是时候对 Forge 的代码库进行一些更改了。然而，在编辑项目代码时，您需要避免一些陷阱。

最重要的是，如果您希望编辑 Minecraft 源代码，必须只在“Forge”子项目中进行。对“Clean”项目的任何更改都会干扰 ForgeGradle 和补丁生成。这可能产生严重后果，甚至可能导致您的环境完全无法使用。为了获得无瑕的体验，请确保您只在“Forge”项目中编辑代码！

### 生成补丁

在您对代码库进行了更改并进行了彻底测试之后，您可以继续生成补丁。只有在您处理 Minecraft 代码库（即“Forge”项目中）时才需要这样做，但此步骤对确保您的更改在其他地方正常工作至关重要。Forge 通过仅将更改注入到 Vanilla Minecraft 中来工作，因此需要以适当的格式提供这些更改。幸运的是，ForgeGradle 能够为您生成更改集以进行提交。

要启动补丁生成，只需从您的 IDE 或命令行运行 `genPatches` Gradle 任务。在其完成后，您可以提交所有更改（确保没有添加任何不必要的文件）并提交您的 Pull Request！

### Pull Requests

在您的贡献被添加到 Forge 之前的最后一步是 Pull Request（简称 PR）。这是将您的分叉更改合并到现场代码库的正式请求。创建 PR 很简单。只需访问 [此 GitHub 页面][submitpr] 并按照建议的步骤操作。有了好的分支设置，您可以精确选择您想要提交的更改，这将大有帮助。

!!! 注意
    Pull Requests 有规定；并不是每个请求都会被盲目接受。请遵循 [此文档][contribute] 获取更多信息，并确保您的 PR 质量！如果您想最大化 PR 被接受的机会，请遵循这些 [PR 指南][guidelines]！

[github]: https://www.github.com
[register]: https://www.github.com/join
[forgerepo]: https://www.github.com/MinecraftForge/MinecraftForge
[gradle]: https://www.gradle.org
[submitpr]: https://github.com/MinecraftForge/MinecraftForge/compare
[contribute]: https://github.com/MinecraftForge/MinecraftForge/blob/1.13.x/CONTRIBUTING.md
[guidelines]: ./prguidelines.md