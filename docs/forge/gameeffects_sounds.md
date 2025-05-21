---
title: 声音
order: 1
toc: content
group:
  title: 游戏特效
  order: 9991
---
声音
======

术语
-----------

| 术语           | 描述 |
|----------------|----------------|
| 声音事件       | 触发声音效果的事件。例如 `minecraft:block.anvil.hit` 或 `botania:spreader_fire`。|
| 声音类别       | 声音的类别，例如 `player`（玩家）、`block`（方块）或简单的 `master`（主）。声音设置界面中的滑块代表这些类别。|
| 声音文件       | 磁盘上的音频文件，通常是 .ogg 文件。|

`sounds.json`
-------------

这个 JSON 文件定义了声音事件，并决定哪些声音文件会被播放、字幕等。声音事件以 [`ResourceLocation`][loc] 标识。`sounds.json` 应位于资源命名空间的根目录（`assets/<namespace>/sounds.json`），并定义该命名空间中的声音事件（`assets/<namespace>/sounds.json` 定义了命名空间 `namespace` 中的声音事件）。

完整版规范请参阅原版 [wiki][]，以下示例突出介绍了重要部分：

```js
{
  "open_chest": {
    "subtitle": "mymod.subtitle.open_chest",
    "sounds": [ "mymod:open_chest_sound_file" ]
  },
  "epic_music": {
    "sounds": [
      {
        "name": "mymod:music/epic_music",
        "stream": true
      }
    ]
  }
}
```

在顶级对象下面，每个键对应一个声音事件。注意命名空间不需要给出，它取自 JSON 本身的命名空间。每个事件指定一个本地化键，当启用字幕时显示。最后，指定要播放的实际声音文件。注意该值是一个数组；如果指定了多个声音文件，游戏将在触发声音事件时随机选择一个播放。

这两个示例展示了指定声音文件的两种不同方式。[wiki] 有详细信息，但一般来说，背景音乐或音乐碟等较长的声音文件应使用第二种形式，因为 "stream" 参数告知 Minecraft 不要将整个声音文件加载到内存中，而是从磁盘流式传输。第二种形式还可以指定声音文件的音量、音高和权重。

无论哪种情况，命名空间为 `namespace` 且路径为 `path` 的声音文件路径是 `assets/<namespace>/sounds/<path>.ogg`。因此 `mymod:open_chest_sound_file` 指向 `assets/mymod/sounds/open_chest_sound_file.ogg`，`mymod:music/epic_music` 指向 `assets/mymod/sounds/music/epic_music.ogg`。

可以通过 [数据生成][datagen] 创建 `sounds.json`。

创建声音事件
---------------------

为了在服务器上引用声音，必须创建一个在 `sounds.json` 中有相应条目的 `SoundEvent`。此 `SoundEvent` 必须接着被 [注册][registration]。通常，创建声音事件时使用的地址应设置为它的注册名称。

`SoundEvent` 充当声音的引用，并用于播放。如果一个模组有 API，它应该在 API 中公开其 `SoundEvent`。

!!! 注意
    只要声音已在 `sounds.json` 中注册，它仍然可以在逻辑客户端上引用，无论是否有对应的 `SoundEvent`。

播放声音
--------------

原版提供了许多方法播放声音，有时很难分辨应使用哪种方法。

注意，每种方法都使用注册的 `SoundEvent`。此外，术语“服务器行为”和“客户端行为”是指各自的[**逻辑**侧][sides]。

### `Level`

1. <a name="level-playsound-pbecvp"></a> `playSound(Player, BlockPos, SoundEvent, SoundSource, volume, pitch)`
    - 只是转发给 [重载 (2)](#level-playsound-pxyzecvp)，并将给定的 `BlockPos` 的每个坐标加 0.5。

2. <a name="level-playsound-pxyzecvp"></a> `playSound(Player, double x, double y, double z, SoundEvent, SoundSource, volume, pitch)`
    - **客户端行为**：如果传入的玩家是*客户端*玩家，则向客户端玩家播放声音事件。
    - **服务器行为**：向附近的所有人播放声音事件，**除了**传入的玩家。玩家可以为 `null`。
    - **用法**：行为之间的对应关系意味着这些方法应该在客户端和服务器上同时运行的某些玩家启动代码中调用：逻辑客户端负责向用户播放声音，逻辑服务器负责其他人听到声音而不重播给原始用户。它们还可以用于在服务器端的任何位置播放任何声音，通过在逻辑服务器上调用并传入一个 `null` 玩家，从而让所有人听到声音。

3. <a name="level-playsound-xyzecvpd"></a> `playLocalSound(double x, double y, double z, SoundEvent, SoundSource, volume, pitch, distanceDelay)`
    - **客户端行为**：只是播放客户端级别中的声音事件。如果 `distanceDelay` 为 `true`，则根据距离玩家的远近延迟声音。
    - **服务器行为**：不执行任何操作。
    - **用法**：此方法仅在客户端有效，因此适用于通过自定义数据包发送的声音或其他仅限客户端的效果音效。用于雷鸣。

### `ClientLevel`

1. <a name="clientlevel-playsound-becvpd"></a> `playLocalSound(BlockPos, SoundEvent, SoundSource, volume, pitch, distanceDelay)`
    - 只是转发给 `Level` 的 [重载 (3)](#level-playsound-xyzecvpd)，将给定的 `BlockPos` 的每个坐标加 0.5。

### `Entity`

1. <a name="entity-playsound-evp"></a> `playSound(SoundEvent, volume, pitch)`
    - 转发给 `Level` 的 [重载 (2)](#level-playsound-pxyzecvp)，传入 `null` 作为玩家。
    - **客户端行为**：不执行任何操作。
    - **服务器行为**：在此实体位置向所有人播放声音事件。
    - **用法**：在服务器端从任何非玩家实体发出任何声音。

### `Player`

1. <a name="player-playsound-evp"></a> `playSound(SoundEvent, volume, pitch)` (覆盖[`Entity`](#entity-playsound-evp) 中的方式)
    - 转发给 `Level` 的 [重载 (2)](#level-playsound-pxyzecvp)，传入 `this` 作为玩家。
    - **客户端行为**：不执行任何操作，参见 [`LocalPlayer`](#localplayer-playsound-evp) 中的覆盖。
    - **服务器行为**：向附近所有人播放声音，*除了*自己。
    - **用法**：参见 [`LocalPlayer`](#localplayer-playsound-evp)。

### `LocalPlayer`

1. <a name="localplayer-playsound-evp"></a> `playSound(SoundEvent, volume, pitch)` (覆盖 [`Player`](#player-playsound-evp) 中的方式)
    - 转发给 `Level` 的 [重载 (2)](#level-playsound-pxyzecvp)，传入 `this` 作为玩家。
    - **客户端行为**：直接播放声音事件。
    - **服务器行为**：方法仅限客户端。
    - **用法**：就像 `Level` 中的那些一样，玩家类中的这两个覆盖似乎用于同时在两个逻辑侧面运行的代码。客户端负责向用户播放声音，而服务器负责其他人听到声音而不重播给原始用户。

[loc]: ../concepts/resources.md#resourcelocation
[wiki]: https://minecraft.wiki/w/Sounds.json
[datagen]: ../datagen/client/sounds.md
[registration]: ../concepts/registries.md#methods-for-registering
[sides]: ../concepts/sides.md