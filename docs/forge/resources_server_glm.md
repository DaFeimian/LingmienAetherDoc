---
title: 服务端-全局战利品修改器
order: 10
toc: content
group:
  title: 资源包
  order: 9995
---
全局战利品修改器
===========

全局战利品修改器是一种数据驱动的方法，用于处理收集到的掉落物的修改，无需覆盖几十到数百个原版战利品表，也无需处理需与其他模组战利品表互动才能实现的效果，且不需知道加载了哪些模组。全局战利品修改器是叠加的，而不是“最后加载优先”，类似于标签。

注册全局战利品修改器
-------------------------------

您需要以下四个步骤：

1. 创建一个 `global_loot_modifiers.json` 文件。
    * 该文件将告知 Forge 您的修饰器，工作方式类似于 [标签]。
2. 一个表示您的修饰器的 JSON 序列化文件。
    * 该文件将包含关于您的修改的所有数据，并允许数据包对您的效果进行调整。
3. 一个扩展 `IGlobalLootModifier` 的类。
    * 使您的修饰器生效的操作代码。大多数模组开发者可以扩展 `LootModifier`，因为它提供了基础功能。
4. 最后，一个用于编码和解码您的操作类的编解码器。
    * 正如其他 `IForgeRegistryEntry` 一样 [注册] 。

`global_loot_modifiers.json`
-------------------------------

`global_loot_modifiers.json` 代表了所有将要加载到游戏中的战利品修改器。该文件 **必须** 放置在 `data/forge/loot_modifiers/global_loot_modifiers.json` 目录下。

!!! 重要
    `global_loot_modifiers.json` 只会在 `forge` 命名空间中被读取。如果文件在模组的命名空间下，则会被忽略。

`entries` 是一个将要加载的修饰器的 *有序列表*。指定的 [ResourceLocation][resloc] 指向其在 `data/<namespace>/loot_modifiers/<path>.json` 中的相关条目。这对数据包制作者解决不同模组间修饰器的冲突尤为重要。

当 `replace` 为 `true` 时，行为会从向全局列表追加战利品修饰器变为完全替换全局列表的条目。模组开发者可以使用 `false` 来保证与其他模组实现的兼容性。数据包制作者可能希望使用 `true` 来指定他们的重写。

```js
{
  "replace": false, // 必须存在
  "entries": [
    // 代表 'data/examplemod/loot_modifiers/example_glm.json' 中的一个战利品修饰器
    "examplemod:example_glm",
    "examplemod:example_glm2"
    // ...
  ]
}
```

序列化的 JSON
-------------------------------

此文件包含与您的修饰器相关的所有潜在变量，包括在修改任何战利品之前必须满足的条件。尽可能避免硬编码，以便数据包制作者可以根据需要调整平衡。

`type` 表示用于读取关联 JSON 文件的 [编解码器] 的注册名称。这必须始终存在。

`conditions` 应代表此修改器激活的战利品表条件。条件应避免硬编码，以便数据包制作者有尽可能多的灵活性来调整条件。这也必须始终存在。

!!! 重要
    尽管 `conditions` 应代表激活修饰器所需的条件，但如果使用捆绑的 Forge 类，则仅在这种情况下才有效。如果使用 `LootModifier` 作为子类，所有条件将被 **与** 运算，并检查是否应应用修饰器。

还可以指定由序列化器读取并由修饰器定义的任何其他属性。

```js
// 位于 data/examplemod/loot_modifiers/example_glm.json
{
  "type": "examplemod:example_loot_modifier",
  "conditions": [
    // 常规的战利品表条件
    // ...
  ],
  "prop1": "val1",
  "prop2": 10,
  "prop3": "minecraft:dirt"
}
```

`IGlobalLootModifier`
---------------------

要提供全局战利品修饰器指定的功能，必须指定一个 `IGlobalLootModifier` 的实现。这些实例是在序列化器从 JSON 解码信息并将其提供给该对象时生成的。

为了创建新的修饰器，需要定义两个方法：`#apply` 和 `#codec`。`#apply` 方法接受将生成的当前战利品以及上下文信息（如当前等级或其他已定义参数）。它返回要生成的掉落列表。

!!! 注意
    从任何一个修饰器返回的掉落列表会按注册顺序传递到其他修饰器。因此，修改后的战利品可以被另一个战利品修饰器进一步修改。

`#codec` 返回用于从 JSON 编码和解码修饰器的已注册 [编码解码器]。

### `LootModifier` 子类

`LootModifier` 是 `IGlobalLootModifier` 的一个抽象实现，用于提供大多数模组开发者容易扩展和实现的基础功能。它通过定义 `#apply` 方法来扩展现有接口，以检查是否需要修改生成的战利品的条件。

子类实现中需要注意两点：必须接受一个 `LootItemCondition` 数组的构造函数和 `#doApply` 方法。

`LootItemCondition` 数组定义了必须满足才能修改战利品的条件列表。提供的条件是 **与** 运算的，这意味着所有条件必须为真。

`#doApply` 方法的工作原理与 `#apply` 方法相同，不同之处在于它仅在所有条件均为真时才执行。

```java
public class ExampleModifier extends LootModifier {

  public ExampleModifier(LootItemCondition[] conditionsIn, String prop1, int prop2, Item prop3) {
    super(conditionsIn);
    // 存储其余的参数
  }

  @NotNull
  @Override
  protected ObjectArrayList<ItemStack> doApply(ObjectArrayList<ItemStack> generatedLoot, LootContext context) {
    // 修改战利品并返回新掉落
  }

  @Override
  public Codec<? extends IGlobalLootModifier> codec() {
    // 返回用于从 JSON 编码和解码此修饰器的编解码器
  }
}
```

战利品修饰器编解码器
-----------------------

JSON 和 `IGlobalLootModifier` 实例之间的连接器是一个 [`Codec<T>`][codecdef]，其中 `T` 表示要使用的 `IGlobalLootModifier` 类型。

为方便起见，提供了一个战利品条件编解码器，用于通过 `LootModifier#codecStart` 方便地添加到类似记录的编解码器中。这用于相关战利品修饰器的数据生成[datagen]。

```java
// 对于某些 DeferredRegister<Codec<? extends IGlobalLootModifier>> REGISTRAR
public static final RegistryObject<Codec<ExampleModifier>> = REGISTRAR.register("example_codec", () ->
  RecordCodecBuilder.create(
    inst -> LootModifier.codecStart(inst).and(
      inst.group(
        Codec.STRING.fieldOf("prop1").forGetter(m -> m.prop1),
        Codec.INT.fieldOf("prop2").forGetter(m -> m.prop2),
        ForgeRegistries.ITEMS.getCodec().fieldOf("prop3").forGetter(m -> m.prop3)
      )
    ).apply(inst, ExampleModifier::new)
  )
);
```

[例子][examples] 可以在 Forge Git 仓库中找到，包括精准采集和冶炼效果。

[标签]: ./tags.md
[resloc]: ../../concepts/resources.md#ResourceLocation
[编解码器]: #the-loot-modifier-codec
[注册]: ../../concepts/registries.md#methods-for-registering
[codecdef]: ../../datastorage/codecs.md
[datagen]: ../../datagen/server/glm.md
[例子]: https://github.com/MinecraftForge/MinecraftForge/blob/1.20.x/src/test/java/net/minecraftforge/debug/gameplay/loot/GlobalLootModifiersTest.java