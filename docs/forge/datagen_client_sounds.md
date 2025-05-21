---
title: 客户端-声音定义生成
order: 2
toc: content
group:
  title: 数据生成器
  order: 9996
---
声音定义生成
===========================

`sounds.json` 文件可以通过继承 `SoundDefinitionsProvider` 并实现 `#registerSounds` 方法为一个 mod 生成。在实现之后，必须将该提供者[添加][datagen]到 `DataGenerator`。

```java
// 在 MOD 事件总线上
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 告诉生成器仅在客户端资产生成时运行
        event.includeClient(),
        output -> new MySoundDefinitionsProvider(output, MOD_ID, event.getExistingFileHelper())
    );
}
```

添加一个声音
--------------

可以通过指定声音名称和定义来生成一个声音定义，使用 `#add` 方法。声音名称可以通过 [`SoundEvent`][soundevent]、`ResourceLocation` 或字符串提供。

!!! 警告
    提供的声音名称将默认假设命名空间是提供者构造函数中的 mod id。不会对声音名称的命名空间进行验证！

### `SoundDefinition`

`SoundDefinition` 可以使用 `#definition` 创建。定义包含用于定义声音实例的数据。

定义指定了一些方法：

方法       | 描述
:---:      | :---
`with`     | 添加一个或多个声音，当选择该定义时可能会播放这些声音。
`subtitle` | 设置定义的翻译键。
`replace`  | 当为 `true` 时，移除其他 `sounds.json` 文件已经为此定义定义的声音，而不是追加。

### `SoundDefinition$Sound`

提供给 `SoundDefinition` 的声音可以使用 `SoundDefinitionsProvider#sound` 指定。这些方法接受声音的引用，并在指定时接受一个 `SoundType`。

`SoundType` 可以是以下两种值之一：

声音类型 | 定义
:---:    | :---
`SOUND`  | 指定引用存放在 `assets/<namespace>/sounds/<path>.ogg` 的声音。
`EVENT`  | 指定引用由 `sounds.json` 定义的另一个声音的名称。

每个从 `SoundDefinitionsProvider#sound` 创建的 `Sound` 可以指定额外的配置，以决定如何加载和播放提供的声音：

方法                  | 描述
:---:                 | :---
`volume`              | 设置声音的音量比例，必须大于 `0`。
`pitch`               | 设置声音的音调比例，必须大于 `0`。
`weight`              | 设置声音被选择时播放的可能性。
`stream`              | 当为 `true` 时，从文件读取声音，而不是将声音加载到内存中。推荐用于长声音：背景音乐、音乐光盘等。
`attenuationDistance` | 设置声音可以听到的距离，单位为方块。
`preload`             | 当为 `true` 时，一旦资源包加载，就立即将声音加载到内存中。

```java
// 在一些 SoundDefinitionsProvider#registerSounds 方法中
this.add(EXAMPLE_SOUND_EVENT, definition()
  .subtitle("sound.examplemod.example_sound") // 设置翻译键
  .with(
    sound(new ResourceLocation(MODID, "example_sound_1")) // 设置第一个声音
      .weight(4) // 有 4 / 5 = 80% 的播放几率
      .volume(0.5), // 将此声音调用的所有音量缩小为一半
    sound(new ResourceLocation(MODID, "example_sound_2")) // 设置第二个声音
      .stream() // 流式播放声音
  )
);

this.add(EXAMPLE_SOUND_EVENT_2, definition()
  .subtitle("sound.examplemod.example_sound") // 设置翻译键
  .with(
    sound(EXAMPLE_SOUND_EVENT.getLocation(), SoundType.EVENT) // 从 'EXAMPLE_SOUND_EVENT' 添加声音
      .pitch(0.5) // 将此声音调用的所有音高缩小为一半
  )
);
```

[datagen]: ../index.md#data-providers
[soundevent]: ../../gameeffects/sounds.md#creating-sound-events