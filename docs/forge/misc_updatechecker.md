---
title: Forge 更新检查器
order: 3
toc: content
group:
  title: 其他功能
  order: 9997
---
Forge 更新检查器
================

Forge 提供了一个非常轻量的、可选的更新检查框架。如果有任何模组有可用更新，它将在主菜单和模组列表的“Mods”按钮上显示一个闪烁的图标，并附上相关的更新日志。它*不会*自动下载更新。

快速开始
---------------

首先，你需要在 `mods.toml` 文件中指定 `updateJSONURL` 参数。该参数的值应该是指向一个更新 JSON 文件的有效 URL。这个文件可以托管在你自己的网络服务器、GitHub 或其他只要能被你模组的所有用户可靠访问的地方。

更新 JSON 格式
------------------

JSON 本身的格式相对简单，如下所示：

```json
{
  "homepage": "<你的模组主页/下载页面>",
  "<mcversion>": {
    "<modversion>": "<此版本的更新日志>", 
    // 列出给定 Minecraft 版本下你的模组的所有版本及其更新日志
    // ...
  },
  "promos": {
    "<mcversion>-latest": "<modversion>",
    // 声明给定 Minecraft 版本的最新“前沿”版本
    "<mcversion>-recommended": "<modversion>",
    // 声明给定 Minecraft 版本的最新“稳定”版本
    // ...
  }
}
```

这很容易理解，但请注意：

* `homepage` 下的链接是当模组过时时用户将看到的链接。
* Forge 使用一个内部算法来判断一个版本字符串是否比另一个新。大多数版本控制方案应该都是兼容的，但如果你担心你的方案不受支持，可以查看 `ComparableVersion` 类。推荐遵循 [Maven 版本控制][mvnver]。
* 更新日志字符串可以用 `\n` 分成多行。有些人喜欢包括一个简略的更新日志，然后链接到一个提供完整更改列表的外部网站。
* 手动输入数据可能很繁琐。您可以配置您的 `build.gradle` 以便在构建版本时自动更新此文件，因为 Groovy 具有原生 JSON 解析支持。如何实现留给读者自行研究。

- 一些示例可以在这里找到：[nocubes][]，[Corail Tombstone][corail] 和 [Chisels & Bits 2][chisel]。

获取更新检查结果
-------------------------------

你可以使用 `VersionChecker#getResult(IModInfo)` 获取 Forge 更新检查器的结果。可以通过 `ModContainer#getModInfo` 获取你的 `IModInfo`。可以使用 `ModLoadingContext.get().getActiveContainer()` 在构造函数内、`ModList.get().getModContainerById(<你的 modId>)`，或 `ModList.get().getModContainerByObject(<你的 mod 实例>)` 获取你的 `ModContainer`。可以使用 `ModList.get().getModContainerById(<modId>)` 获取其他模组的 `ModContainer`。返回的对象有一个方法 `#status`，用来指明版本检查的状态。

|          状态 | 描述 |
|----------------:|:------------|
|        `FAILED` | 版本检查器无法连接到提供的 URL。 |
|    `UP_TO_DATE` | 当前版本等同于推荐版本。 |
|         `AHEAD` | 如果不存在最新版本，当前版本比推荐版本新。 |
|      `OUTDATED` | 有新的推荐或最新版本。 |
| `BETA_OUTDATED` | 有一个新的最新版本。 |
|          `BETA` | 当前版本等同或新于最新版本。 |
|       `PENDING` | 请求的结果尚未完成，因此您应该稍后再试。 |

返回的对象还将包含目标版本和在 `update.json` 中指定的任何更新日志行。

[mvnver]: ../gettingstarted/versioning.md
[nocubes]: https://cadiboo.github.io/projects/nocubes/update.json
[corail]: https://github.com/Corail31/tombstone_lite/blob/master/update.json
[chisel]: https://github.com/Aeltumn/Chisels-and-Bits-2/blob/master/update.json