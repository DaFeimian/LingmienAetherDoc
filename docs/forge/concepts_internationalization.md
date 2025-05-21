---
title: 国际化与本地化
order: 5
toc: content
group:
  title: 核心概念
  order: 9985
---
国际化与本地化
==========================

国际化，简称 i18n，是一种设计代码的方法，使其无需修改即可适应各种语言。本地化是将显示的文本调整为用户语言的过程。

I18n 通过使用“翻译键”来实现。翻译键是一个用于标识某段展示文本的字符串，而不特定于某种语言。例如，`block.minecraft.dirt` 是指代泥土方块名称的翻译键。通过这种方式，可以引用展示文本而无需考虑特定语言，代码无需修改即可适应新的语言。

本地化将发生在游戏的区域设置中。在 Minecraft 客户端中，区域设置是由语言设置指定的。在专用服务器上，唯一支持的区域设置是 `en_us`。可用区域设置的列表可以在 [Minecraft Wiki][langs]上找到。

语言文件
--------

语言文件位于 `assets/[namespace]/lang/[locale].json`（例如，`examplemod` 提供的所有美式英语翻译都在 `assets/examplemod/lang/en_us.json` 中）。文件格式是从翻译键到值的一种简单 JSON 映射。文件必须以 UTF-8 编码。可以使用 [转换器][converter]将旧的 .lang 文件转换为 JSON。

```json
{
  "item.examplemod.example_item": "示例物品名称",
  "block.examplemod.example_block": "示例方块名称",
  "commands.examplemod.examplecommand.error": "示例命令出错！"
}
```

在方块和物品中的使用
------------------------

方块、物品和其他一些 Minecraft 类具有用于显示其名称的内置翻译键。这些翻译键是通过重写 `#getDescriptionId` 来指定的。物品还具有 `#getDescriptionId(ItemStack)`，可以根据 ItemStack NBT 提供不同的翻译键来进行重写。

默认情况下，`#getDescriptionId` 会返回 `block.` 或 `item.`，并在方块或物品的注册名称之前加上冒号替换为点。`BlockItem` 会重写此方法，以默认情况下使用其对应的 `Block` 的翻译键。例如，ID 为 `examplemod:example_item` 的物品需要语言文件中如下行：

```json
{
  "item.examplemod.example_item": "示例物品名称"
}
```

!!! 注意
    翻译键的唯一目的就是国际化。不要用于逻辑，请使用注册名称。

本地化方法
----------------

!!! 警告
    一个常见的问题是服务器为客户端进行本地化。服务器只能在其自身的区域设置中进行本地化，这不一定符合连接客户端的区域设置。

    为了尊重客户端的语言设置，服务器应该让客户端使用 `TranslatableComponent` 或其他保持语言中立翻译键的方法在自己的区域设置中本地化文本。

### `net.minecraft.client.resources.language.I18n` (仅限客户端)

**此 I18n 类只能在 Minecraft 客户端中找到！** 它仅供运行在客户端上的代码使用。尝试在服务器上使用会抛出异常并导致崩溃。

- `get(String, Object...)` 使用格式化在客户端的区域设置中进行本地化。第一个参数是翻译键，其余的是 `String.format(String, Object...)` 的格式化参数。

### `TranslatableContents`

`TranslatableContents` 是一个`ComponentContents`，可进行延迟本地化和格式化。发送消息给玩家时非常有用，因为它会自动在玩家自己的区域设置中本地化。

`TranslatableContents(String, Object...)` 构造函数的第一个参数是翻译键，其余用于格式化。唯一支持的格式说明符是 `%s` 和 `%1$s`, `%2$s`, `%3$s` 等。格式化参数可以是 `Component`，将被插入到结果格式化文本中，且保留其所有属性。

可以通过传入 `TranslatableContents` 的参数使用 `Component#translatable` 创建一个 `MutableComponent`。也可以通过传入 `ComponentContents` 本身使用 `MutableComponent#create` 创建。

### `TextComponentHelper`

- `createComponentTranslation(CommandSource, String, Object...)` 根据接收方创建本地化和格式化的 `MutableComponent`。如果接收方是原版客户端，本地化和格式化会立即进行。如果不是，则使用包含 `TranslatableContents` 的 `Component` 延迟进行本地化和格式化。仅当服务器允许原版客户端连接时有用。

[langs]: https://minecraft.wiki/w/Language#Languages
[converter]: https://tterrag.com/lang2json/