---
title: 介绍
order: 0
toc: content
group:
  title: 数据生成器
  order: 9996
---
数据生成器
===============

数据生成器是一种以编程的方式生成模组素材和数据的方法。它允许在代码中定义这些文件的内容，并进行自动生成，而无需担心具体细节。

数据生成器系统由主类`net.minecraft.data.Main`加载。可以传递不同的命令行参数来自定义收集哪些模组的数据、考虑哪些现有文件等。负责数据生成的类是`net.minecraft.data.DataGenerator`。

MDK `build.gradle`中的默认配置添加了`runData`任务用于运行数据生成器。

现有文件
--------------
所有对未生成的纹理或其他数据文件的引用必须指向系统上的现有文件。这是为了确保所有引用的纹理都在正确的位置，以便发现和纠正拼写错误。

`ExistingFileHelper`是负责验证这些数据文件存在的类。可以从`GatherDataEvent#getExistingFileHelper`中获取实例。

`--existing <folderpath>`参数允许使用指定文件夹及其子文件夹来验证文件的存在。此外，`--existing-mod <modid>`参数允许使用已加载模组的资源进行验证。默认情况下，`ExistingFileHelper`仅能访问原版数据包和资源。

生成器模式
---------------

数据生成器可以配置为运行4种不同的数据生成，这些生成是通过命令行参数配置的，并可通过`GatherDataEvent#include***`方法检查。

* __客户端资源__
  * 在`assets`中生成仅客户端使用的文件：方块/物品模型、方块状态JSON、语言文件等。
  * __`--client`__, `#includeClient`
* __服务器数据__
  * 在`data`中生成仅服务器使用的文件：配方、进度、标签等。
  * __`--server`__, `#includeServer`
* __开发工具__
  * 运行一些开发工具：转换SNBT到NBT及其反向转换等。
  * __`--dev`__, `#includeDev`
* __报告__
  * 导出所有已注册的方块、物品、命令等。
  * __`--reports`__, `#includeReports`

所有生成器可以通过`--all`参数一起包含。

数据提供者
--------------

数据提供者是实际定义将生成和提供哪些数据的类。所有数据提供者都实现`DataProvider`。Minecraft为大多数素材和数据提供了抽象实现，因此模组作者只需扩展和覆盖指定的方法。

当数据生成器被创建时，`GatherDataEvent`会被触发，并且可以从事件中获取`DataGenerator`。使用`DataGenerator#addProvider`创建和注册数据提供者。

### 客户端资源
* [`net.minecraftforge.common.data.LanguageProvider`][langgen] - 用于语言字符串；实现`#addTranslations`
* [`net.minecraftforge.common.data.SoundDefinitionsProvider`][soundgen] - 用于`sounds.json`；实现`#registerSounds`
* [`net.minecraftforge.client.model.generators.ModelProvider<?>`][modelgen] - 用于模型；实现`#registerModels`
    * [`ItemModelProvider`][itemmodelgen] - 用于物品模型
    * [`BlockModelProvider`][blockmodelgen] - 用于方块模型
* [`net.minecraftforge.client.model.generators.BlockStateProvider`][blockstategen] - 用于方块状态JSON及其方块和物品模型；实现`#registerStatesAndModels`

### 服务器数据

**这些类位于`net.minecraftforge.common.data`包中**：

* [`GlobalLootModifierProvider`][glmgen] - 用于全局战利品修改器；实现`#start`
* [`DatapackBuiltinEntriesProvider`][datapackregistriesgen] 用于数据包注册对象；在构造函数中传入`RegistrySetBuilder`

**这些类位于`net.minecraft.data`包中**：

* [`loot.LootTableProvider`][loottablegen] - 用于战利品表；在构造函数中传入`LootTableProvider$SubProviderEntry`
* [`recipes.RecipeProvider`][recipegen] - 用于配方及其解锁进度；实现`#buildRecipes`
* [`tags.TagsProvider`][taggen] - 用于标签；实现`#addTags`
* [`advancements.AdvancementProvider`][advgen] - 用于进度；在构造函数中传入`AdvancementSubProvider`

[langgen]: ./client/localization.md
[lang]: https://minecraft.wiki/w/Language
[soundgen]: ./client/sounds.md
[sounds]: https://minecraft.wiki/w/Sounds.json
[modelgen]: ./client/modelproviders.md
[models]: ../resources/client/models/index.md
[itemmodelgen]: ./client/modelproviders.md#itemmodelprovider
[blockmodelgen]: ./client/modelproviders.md#blockmodelprovider
[blockstategen]: ./client/modelproviders.md#block-state-provider
[glmgen]: ./server/glm.md
[glm]: ../resources/server/glm.md
[datapackregistriesgen]: ./server/datapackregistries.md
[loottablegen]: ./server/loottables.md
[loottable]: ../resources/server/loottables.md
[recipegen]: ./server/recipes.md
[recipes]: ../resources/server/recipes/index.md
[taggen]: ./server/tags.md
[tags]: ../resources/server/tags.md
[advgen]: ./server/advancements.md
[advancements]: ../resources/server/advancements.md