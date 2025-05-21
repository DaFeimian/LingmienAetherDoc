---
title: 粒子
order: 0
toc: content
group:
  title: 游戏特效
  order: 9991
---
粒子
=========

粒子是一种在游戏中用于增强沉浸感的效果。由于其创建和引用的方法，它们的使用需要谨慎。

创建粒子
-------------------

粒子分为两个部分：用于显示粒子的[**仅客户端**][sides]实现和用于引用粒子或从服务器同步数据的通用实现。

| 类               | 侧面   | 描述 |
| :---             | :---:  | :--- |
| ParticleType     | 双方   | 用于在任一侧引用粒子的粒子类型定义的注册对象 |
| ParticleOptions  | 双方   | 一个数据持有者，用于从网络或命令同步信息到相关客户端 |
| ParticleProvider | 客户端 | 由 `ParticleType` 注册的工厂，用于从相关的 `ParticleOptions` 构建 `Particle` |
| Particle         | 客户端 | 在相关客户端显示的可渲染逻辑 |

### ParticleType

`ParticleType`是定义特定粒子类型的注册对象，并在两侧提供针对特定粒子的可用引用。因此，每个 `ParticleType` 必须[注册][registration]。

每个 `ParticleType` 接受两个参数：一个 `overrideLimiter`，用于确定粒子是否无论距离如何都呈现；以及一个 `ParticleOptions$Deserializer`，用于读取在客户端发送的 `ParticleOptions`。由于基础的 `ParticleType` 是抽象的，需要实现一个方法：`#codec`。这代表了如何对该类型的相关 `ParticleOptions` 进行编码和解码。

!!! 注意
    `ParticleType#codec` 仅在生物群系编码中用于原版实现。

在大多数情况下，不需要将任何粒子数据发送到客户端。在这些情况下，可以轻松创建一个 `SimpleParticleType` 实例：一种 `ParticleType` 和 `ParticleOptions` 的实现，除了类型之外，不会将任何自定义数据发送到客户端。除了用于着色的红石粉和依赖于方块/物品的粒子，绝大多数的原版实现都使用 `SimpleParticleType`。

!!! 重要
    如果仅在客户端引用，不需要 `ParticleType` 来生成粒子。然而，若要使用 `ParticleEngine` 中的任何预构建逻辑或从服务器生成粒子，则是必要的。

### ParticleOptions

`ParticleOptions` 代表每个粒子所需的数据。它还用于从通过服务器生成的粒子发送数据。所有粒子生成方法都需要一个 `ParticleOptions`，以便了解粒子的类型及与生成相关联的数据。

`ParticleOptions` 分为三个方法：

| 方法             | 描述 |
| :---             | :--- |
| getType          | 获取粒子的类型定义，或 `ParticleType` |
| writeToNetwork   | 将粒子数据写入服务器上的缓冲区以发送到客户端 |
| writeToString    | 将粒子数据写入字符串 |

这些对象可以根据需要临时构造，或者由于是 `SimpleParticleType` 的结果成为单例。

#### ParticleOptions$Deserializer

要在客户端接收 `ParticleOptions`，或在命令中引用数据，粒子数据必须通过 `ParticleOptions$Deserializer` 进行反序列化。在 `ParticleOptions$Deserializer` 中的每个方法都有一个相应的编码方法在 `ParticleOptions` 中：

| 方法            | ParticleOptions编码器 | 描述 |
| :---            | :---:                 | :--- |
| fromCommand     | writeToString         | 从字符串解码粒子数据，通常从命令中来。 |
| fromNetwork     | writeToNetwork        | 从客户机上的缓冲区解码粒子数据。 |

需要发送自定义粒子数据时，此对象将传递给 `ParticleType` 的构造函数。

### Particle

`Particle` 提供了所需的渲染逻辑，以便将数据绘制到屏幕上。要创建任何 `Particle`，必须实现以下两个方法：

| 方法            | 描述 |
| :---            | :--- |
| render          | 将粒子渲染到屏幕上。 |
| getRenderType   | 获取粒子的渲染类型。 |

`Particle` 的一个常见子类用于渲染纹理的是 `TextureSheetParticle`。尽管需要实现 `#getRenderType`，但无论纹理图标如何设置，都会在粒子的位置渲染。

#### ParticleRenderType

`ParticleRenderType` 是一种 `RenderType` 的变体，为该类型的每个粒子构建启动和拆卸阶段，然后通过 `Tesselator` 一次性渲染所有这些粒子。粒子可以采用六种不同的渲染类型。

| 渲染类型                    | 描述 |
| :---                       | :--- |
| TERRAIN_SHEET              | 渲染纹理位于可用方块中的粒子。 |
| PARTICLE_SHEET_OPAQUE      | 渲染纹理不透明且位于可用粒子中的粒子。 |
| PARTICLE_SHEET_TRANSLUCENT | 渲染纹理半透明且位于可用粒子中的粒子。 |
| PARTICLE_SHEET_LIT         | 与 `PARTICLE_SHEET_OPAQUE` 相同，但不使用粒子着色器。 |
| CUSTOM                     | 提供混合和深度遮罩设置，但不提供渲染功能，因为这将在 `Particle#render` 中实现。 |
| NO_RENDER                  | 粒子永远不会渲染。 |

实现自定义渲染类型将作为读者的练习。

### ParticleProvider

最后，粒子通常通过 `ParticleProvider` 创建。工厂有一个方法 `#createParticle`，用于根据粒子数据、客户端级别、位置和运动增量创建粒子。由于 `Particle` 不属于任何特定的 `ParticleType`，因此可以根据需要在不同的工厂中重用它。

必须通过在**mod事件总线**上订阅 `RegisterParticleProvidersEvent` 的方式注册 `ParticleProvider`。在事件中，工厂可以通过提供工厂实例给方法的 `#registerSpecial` 方法注册。

!!! 重要
    `RegisterParticleProvidersEvent` 应该只在客户端调用，因此必须在某个隔离的客户端类中进行旁路，引用时可以通过 `DistExecutor` 或 `@EventBusSubscriber`。

#### ParticleDescription、SpriteSet 和 SpriteParticleRegistration

有三种粒子渲染类型不能使用上述注册方法：`PARTICLE_SHEET_OPAQUE`，`PARTICLE_SHEET_TRANSLUCENT` 和 `PARTICLE_SHEET_LIT`。这是因为所有三种这些粒子渲染类型使用了由 `ParticleEngine` 直接加载的精灵集。因此，提供的纹理必须通过不同的方法获取和注册。这将假设你的粒子是 `TextureSheetParticle` 的子类型，因为这是此逻辑唯一的原版实现。

要为粒子添加纹理，需要在 `assets/<modid>/particles` 中添加一个新的 JSON 文件。这称为 `ParticleDescription`。该文件的名称将代表工厂附加到的 `ParticleType` 的注册名称。每个粒子 JSON 是一个对象。对象存储单个键名 `textures`，该键持有 `ResourceLocation` 数组。这里的任何 `<modid>:<path>` 纹理都将指向 `assets/<modid>/textures/particle/<path>.png` 中的纹理。

```json
{
  "textures": [
    // 将指向位于
    // assets/mymod/textures/particle/particle_texture.png 的纹理
    "mymod:particle_texture",
    // 纹理应按绘制顺序排列
    // 例如：particle_texture 将首先渲染，然后在一段时间后
    //      渲染 particle_texture2
    "mymod:particle_texture2"
  ]
}
```

要引用粒子纹理，`TextureSheetParticle` 的子类型应该接受 `SpriteSet` 或从 `SpriteSet` 获得的 `TextureAtlasSprite`。`SpriteSet` 持有一个指向我们在 `ParticleDescription` 中定义的精灵列表的列表。`SpriteSet` 有两个方法，分别以不同的方式获取 `TextureAtlasSprite`。第一个方法接受两个整数。该实现允许精灵在随着时间变化时更换纹理。第二个方法接受一个 `Random` 实例，以从精灵集中随机获取一个纹理。可以通过使用一个接受 `SpriteSet` 的帮助方法来在 `TextureSheetParticle` 中设置精灵：`#pickSprite` 使用随机方法选择纹理，`#setSpriteFromAge` 使用两个整数的百分比方法选择纹理。

为了注册这些粒子纹理，需要向 `RegisterParticleProvidersEvent#registerSpriteSet` 方法提供一个 `SpriteParticleRegistration`。该方法需要 `SpriteSet`，用于持有粒子的相关精灵集，并创建一个 `ParticleProvider` 来创建粒子。最简单的方法是通过在某个类上实现 `ParticleProvider` 并让构造函数接受 `SpriteSet`。然后可以将 `SpriteSet` 正常传递给粒子。

!!! 注意
    如果注册的 `TextureSheetParticle` 子类型仅包含一个纹理，那么可以将 `ParticleProvider$Sprite` 传递给 `#registerSprite` 方法，该方法具有与 `ParticleProvider` 基本相同的功能性接口方法。

生成粒子
-------------------

粒子可以从任何一个级别实例生成。但是，每个侧面都有特定的生成粒子的方式。如果是在 `ClientLevel`，可以调用 `#addParticle` 生成粒子，或调用 `#addAlwaysVisibleParticle` 生成由任何距离可见的粒子。如果是在 `ServerLevel`，可以调用 `#sendParticles` 发送数据包到客户端生成粒子。在服务器上调用两个 `ClientLevel` 方法将不产生任何结果。

[sides]: ../concepts/sides.md
[registration]: ../concepts/registries.md#methods-for-registering