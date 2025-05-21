---
title: 方块
order: 0
toc: content
group:
  title: 方块
  order: 9986
---
方块
======

显然，方块是Minecraft世界中的基本元素。它们构成了所有地形、结构和机械。如果你对制作模组感兴趣，你可能会想添加一些方块。这个页面将指导你如何创建方块以及你可以对它们进行的一些操作。

创建方块
----------------

### 基础方块

对于不需要特殊功能的简单方块（例如圆石、木板等），不需要自定义类。你可以通过使用`BlockBehaviour$Properties`对象实例化`Block`类来创建一个方块。这个`BlockBehaviour$Properties`对象可以使用`BlockBehaviour$Properties#of`来创建，并可以通过调用其方法进行自定义。例如：

- `strength` - 硬度控制破坏方块所需的时间。这是一个任意值。作为参考，石头的硬度是1.5，而泥土是0.5。如果方块应该是不可破坏的，可以使用-1.0的硬度，参见`Blocks#BEDROCK`的定义。抗爆性控制方块的抗爆性。参考上，石头的抗爆性是6.0，而泥土则是0.5。
- `sound` - 控制方块被敲打、破坏或放置时发出的声音。需要一个`SoundType`参数，详情见[sounds]页面。
- `lightLevel` - 控制方块的光照发射。接受一个带有`BlockState`参数的函数并返回一个从零到十五的值。
- `friction` - 控制方块的滑溜程度。参考上，冰的滑溜度是0.98。

所有这些方法都是*可链式调用*的，也就是说你可以连续调用它们。查看`Blocks`类以获取此方面的示例。

!!! 注意
    方块没有设置其`CreativeModeTab`的设定器。这是通过[`BuildCreativeModeTabContentsEvent`][creativetabs]来处理的，如果方块有相关联的物品（例如`BlockItem`）。此外，方块的翻译键没有设置器，因为它是通过注册名通过`Block#getDescriptionId`生成的。

### 高级方块

当然，上述方法仅允许创建非常基础的方块。如果你想添加功能，比如玩家交互，就需要一个自定义类。但是，`Block`类有很多方法，遗憾的是无法在此一一记录。请查看本节的其余页面，了解可以对方块进行的操作。

注册方块
-------------------

方块必须经过[注册][registering]才能正常工作。

!!! 重要
    在关卡中的方块与在库存中的“方块”是非常不同的东西。关卡中的方块由`BlockState`表示，其行为由`Block`实例定义。同时，库存中的物品是一个`ItemStack`，由`Item`控制。作为`Block`和`Item`两个世界的桥梁，存在一个`BlockItem`类。`BlockItem`是`Item`的子类，它有一个字段`block`来保存其代表的`Block`的引用。`BlockItem`定义了一些作为物品的“方块”的行为，比如右键点击时放置方块。可以有一个没有`BlockItem`的`Block`。（例如，`minecraft:water`是一个方块，但不是物品。因此，不可能像持有一个物品那样在库存中持有它。）

    当注册一个方块时，只注册一个方块。方块不会自动拥有一个`BlockItem`。要为方块创建一个基本的`BlockItem`，应将`BlockItem`的注册名设置为其`Block`的注册名。也可以使用`BlockItem`的自定义子类。一旦为方块注册了一个`BlockItem`，可以使用`Block#asItem`来获取它。如果`Block`没有`BlockItem`，`Block#asItem`将返回`Items#AIR`，因此如果你不确定使用的方块是否有`BlockItem`，请检查`Block#asItem`是否返回`Items#AIR`。

#### 可选注册方块

过去有一些模组允许用户在配置文件中禁用方块/物品。然而，你不应该这样做。注册的方块数量没有限制，所以请注册模组中的所有方块！如果你想通过配置文件禁用某个方块，你应该禁用合成配方。如果你想在创造模式标签中禁用该方块，请在构建[`BuildCreativeModeTabContentsEvent`][creativetabs]中的内容时使用`FeatureFlag`。

进一步阅读
---------------

有关方块属性的信息，例如用于原版方块如围栏、墙等，参见[blockstates]部分。

[sounds]: ../gameeffects/sounds.md
[creativetabs]: ../items/index.md#creative-tabs
[registering]: ../concepts/registries.md#methods-for-registering
[blockstates]: states.md