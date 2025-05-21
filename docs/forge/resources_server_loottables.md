---
title: 服务端-掉落表
order: 9
toc: content
group:
  title: 资源包
  order: 9995
---
掉落表
===========

掉落表是用于定义在各种操作或场景发生时应如何处理的逻辑文件。尽管游戏原版系统仅用于物品生成，但该系统可以扩展以执行任意数量的自定义操作。

数据驱动的表格
------------------

大多数原版掉落表都是通过 JSON 数据驱动的。这意味着创建新的掉落表不需要模组，只需一个[数据包][datapack]即可。关于如何创建这些掉落表并将其放入模组的 `resources` 文件夹中的完整列表可以在 [Minecraft Wiki][wiki] 上找到。

使用掉落表
------------------

掉落表通过其 `ResourceLocation` 来引用，指向 `data/<namespace>/loot_tables/<path>.json`。可以使用 `LootDataResolver#getLootTable` 来获取与该引用关联的 `LootTable`，其中 `LootDataResolver` 可以通过 `MinecraftServer#getLootData` 获取。

生成掉落表时，始终会有给定参数。`LootParams` 包含生成表的等级、用于更佳生成的好运气、定义场景上下文的 `LootContextParam`s 以及在激活时应发生的任何动态信息。可以使用 `LootParams$Builder` 构造器的构造方法来创建 `LootParams`，并通过传递 `LootContextParamSet` 来使用 `LootParams$Builder#create` 进行构建。

掉落表可能还有一些上下文。`LootContext` 接受已构建的 `LootParams` 并可以设置一些随机种子实例。上下文通过构造器 `LootContext$Builder` 创建，并使用 `LootContext$Builder#create` 通过传递一个可为空的 `ResourceLocation` 来代表要使用的随机实例进行构建。

可以使用可用的方法之一，接收 `LootParams` 或 `LootContext`，来生成 `ItemStack`：

方法                  | 描述
:---:                 | :---:
`getRandomItemsRaw`   | 使用掉落表生成的物品。
`getRandomItems`      | 返回掉落表生成的物品。
`fill`                | 用生成的掉落表填充容器。

!!! 注意
    掉落表是为生成物品而设计的，因此这些方法期望对 `ItemStack` 进行某些处理。

额外功能
-------------------

Forge 为掉落表提供了一些额外的行为以更好地控制系统。

### `LootTableLoadEvent`

`LootTableLoadEvent` 是一个在 Forge 事件总线中触发的[事件][event]，在每次加载掉落表时触发。如果事件被取消，则会加载一个空的掉落表。

!!! 重要
    **不要**通过此事件修改掉落表的掉落。这些修改应使用[全局掉落修改器][glm]进行。

### 掉落池名称

可以使用 `name` 键为掉落池命名。任何未命名的掉落池将以哈希码为名前缀 `custom#`。

```js
// 对于某个掉落池
{
  "name": "example_pool", // 池将被命名为 'example_pool'
  "rolls": {
    // ...
  },
  "entries": {
    // ...
  }
}
```

### 掠夺修饰符

现在，除了掠夺附魔外，掉落表还受 Forge 事件总线中的 `LootingLevelEvent` 影响。

### 额外的上下文参数

Forge 扩展了某些参数集以考虑可能适用的缺失上下文。`LootContextParamSets#CHEST` 现在允许使用 `LootContextParams#KILLER_ENTITY`，因为箱子矿车是可以被破坏（或“杀死”）的实体。同样，`LootContextParamSets#FISHING` 也允许使用 `LootContextParams#KILLER_ENTITY`，因为钓鱼钩也是一种实体，在玩家收回它时会被收回（或“杀死”）。

### 熔炼多件物品

使用 `SmeltItemFunction` 时，熔炼配方现在将返回结果中的实际物品数量，而不是单个熔炼物品（例如，如果熔炼配方返回 3 个物品且有 3 个掉落，则结果将是 9 个熔炼物品而不是 3 个）。

### 掉落表 ID 条件

Forge 添加了一个额外的 `LootItemCondition`，允许特定物品在特定表中生成。这通常在[全局掉落修改器][glm]中使用。

```js
// 在某个掉落池或条目中
{
  "conditions": [
    {
      "condition": "forge:loot_table_id",
      // 当掉落表为泥土时适用
      "loot_table_id": "minecraft:blocks/dirt"
    }
  ]
}
```

### 工具执行操作条件

Forge 添加了一个额外的 `LootItemCondition`，检查给定的 `LootContextParams#TOOL` 是否可以执行指定的 `ToolAction`。

```js
// 在某个掉落池或条目中
{
  "conditions": [
    {
      "condition": "forge:can_tool_perform_action",
      // 当工具可以像斧头一样剥皮原木时适用
      "action": "axe_strip"
    }
  ]
}
```

[datapack]: https://minecraft.wiki/w/Data_pack
[wiki]: https://minecraft.wiki/w/Loot_table
[event]: ../../concepts/events.md#creating-an-event-handler
[glm]: ./glm.md