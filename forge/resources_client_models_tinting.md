---
title: 客户端-模型-着色纹理
order: 2
toc: content
group:
  title: 资源包
  order: 9995
---
着色纹理
=================

在原版Minecraft中，许多方块和物品会根据它们的位置或属性改变其纹理颜色，例如草。模型支持在面上指定“色调索引”，这些索引是整数，可以通过 `BlockColor` 和 `ItemColor` 进行处理。有关在原版模型中如何定义色调索引的信息，请参阅[Wiki][]。

### `BlockColor`/`ItemColor`

这两者都是单一方法的接口。`BlockColor` 接受一个 `BlockState`、一个（可为空的）`BlockAndTintGetter` 和一个（可为空的）`BlockPos`。`ItemColor` 接受一个 `ItemStack`。它们都接受一个 `int` 参数 `tintIndex`，这是正在着色的面的色调索引。它们都返回一个 `int`，即颜色乘数。该 `int` 被视为四个无符号字节，依次为alpha、红色、绿色和蓝色，从最高有效字节到最低。对于每个着色面上的像素，每个颜色通道的值为 `(int)((float) base * multiplier / 255.0)`，其中 `base` 是通道的原始值，`multiplier` 是颜色乘数中关联的字节。注意，方块不使用alpha通道。例如，草的纹理，未着色时看起来是白色和灰色的。草的 `BlockColor` 和 `ItemColor` 返回的颜色乘数具有较低的红色和蓝色成分，但高的alpha和绿色成分（至少在温暖的生物群系中是这样），所以当进行乘法运算时，绿色突显出来，而红色/蓝色减弱。

如果一个物品继承自 `builtin/generated` 模型，每一个层（“layer0”，“layer1”等）都有一个与其层索引对应的色调索引。

### 创建颜色处理器

`BlockColor` 需要注册到游戏的 `BlockColors` 实例中。可以通过 `RegisterColorHandlersEvent$Block` 获得 `BlockColors`，并通过 `#register` 来注册一个 `BlockColor`。注意，这不会导致给定方块的 `BlockItem` 被着色。`BlockItem` 是物品，需要通过 `ItemColor` 进行着色。

```java
@SubscribeEvent
public void registerBlockColors(RegisterColorHandlersEvent.Block event){
  event.register(myBlockColor, coloredBlock1, coloredBlock2, ...);
}
```

`ItemColor` 需要注册到游戏的 `ItemColors` 实例中。可以通过 `RegisterColorHandlersEvent$Item` 获得 `ItemColors`，并通过 `#register` 来注册一个 `ItemColor`。这个方法也可以重载，以接受 `Block`，这只是简单地为物品 `Block#asItem`（即方块的 `BlockItem`）注册颜色处理器。

```java
@SubscribeEvent
public void registerItemColors(RegisterColorHandlersEvent.Item event){
  event.register(myItemColor, coloredItem1, coloredItem2, ...);
}
```

[Wiki]: https://minecraft.wiki/w/Tutorials/Models#Block_models