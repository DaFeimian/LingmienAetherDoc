---
title: 客户端-语言生成
order: 1
toc: content
group:
  title: 数据生成器
  order: 9996
---
语言生成
===================

可以通过继承 `LanguageProvider` 并实现 `#addTranslations` 方法为一个模组生成[语言文件][lang]。每一个创建的 `LanguageProvider` 子类代表一个单独的[语言环境]（例如 `en_us` 代表美式英语，`es_es` 代表西班牙语等）。实现后，必须将提供者[添加][datagen]到 `DataGenerator` 中。

```java
// 在 MOD 事件总线上
@SubscribeEvent
public void gatherData(GatherDataEvent event) {
    event.getGenerator().addProvider(
        // 仅在生成客户端资源时运行生成器
        event.includeClient(),
        // 美式英语的本地化
        output -> new MyLanguageProvider(output, MOD_ID, "en_us")
    );
}
```

`LanguageProvider`
------------------

每个语言提供者实际上就是一个字符串映射的简单映射表，每个翻译键都对应一个本地化名称。可以通过使用 `#add` 方法添加一个翻译键映射。此外，还有一些方法使用 `Block`、`Item`、`ItemStack`、`Enchantment`、`MobEffect` 和 `EntityType` 的翻译键。

```java
// 在 LanguageProvider#addTranslations
this.addBlock(EXAMPLE_BLOCK, "示例方块");
this.add("object.examplemod.example_object", "示例对象");
```

!!! 提示
    包含非美式英语的字母数字值的本地化名称可以直接提供。提供者会自动将字符转换为其对应的 unicode 等价物，以便游戏读取。

    ```java
    // 编码为 'Example with a d\u00EDacritic'
    this.addItem("example.diacritic", "Example with a díacritic");
    ```

[lang]: ../../concepts/internationalization.md
[locale]: https://minecraft.wiki/w/Language#Languages
[datagen]: ../index.md#data-providers