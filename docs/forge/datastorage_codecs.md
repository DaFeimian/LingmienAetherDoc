---
title: 编解码器
order: 2
toc: content
group:
  title: 数据存储
  order: 9992
---
# 编解码器

编解码器是来自 Mojang 的 [DataFixerUpper] 的一种序列化工具，用于描述如何在不同格式之间转换对象，例如用于 JSON 的 `JsonElement` 和 NBT 的 `Tag`。

## 使用编解码器

编解码器主要用于将 Java 对象编码（或序列化）为某种数据格式类型，然后将格式化的数据对象解码（或反序列化）回其关联的 Java 类型。通常通过使用 `Codec#encodeStart` 和 `Codec#parse` 方法分别实现。

### DynamicOps

要确定要编码和解码的中间文件格式，`#encodeStart` 和 `#parse` 都需要一个 `DynamicOps` 实例来定义该格式中的数据。

[DataFixerUpper] 库中包含 `JsonOps`，用于对存储在 [`Gson`][gson] 的 `JsonElement` 实例中的 JSON 数据进行编码。`JsonOps` 支持两种版本的 `JsonElement` 序列化：`JsonOps#INSTANCE` 定义了标准 JSON 文件，`JsonOps#COMPRESSED` 允许将数据压缩成一个字符串。

```java
// 假设 exampleCodec 代表 Codec<ExampleJavaObject>
// 假设 exampleObject 是一个 ExampleJavaObject
// 假设 exampleJson 是一个 JsonElement

// 将 Java 对象编码为常规 JsonElement
exampleCodec.encodeStart(JsonOps.INSTANCE, exampleObject);

// 将 Java 对象编码为压缩的 JsonElement
exampleCodec.encodeStart(JsonOps.COMPRESSED, exampleObject);

// 将 JsonElement 解码为 Java 对象
// 假设 JsonElement 是正常解析的
exampleCodec.parse(JsonOps.INSTANCE, exampleJson);
```

Minecraft 还提供 `NbtOps` 用于对存储在 `Tag` 实例中的 NBT 数据进行编码。这可以通过 `NbtOps#INSTANCE` 引用。

```java
// 假设 exampleCodec 代表 Codec<ExampleJavaObject>
// 假设 exampleObject 是一个 ExampleJavaObject
// 假设 exampleNbt 是一个 Tag

// 将 Java 对象编码为 Tag
exampleCodec.encodeStart(JsonOps.INSTANCE, exampleObject);

// 将 Tag 解码成 Java 对象
exampleCodec.parse(JsonOps.INSTANCE, exampleNbt);
```

#### 格式转换

`DynamicOps` 还可以单独用于在两种不同的编码格式之间进行转换。这可以通过使用 `#convertTo` 并提供 `DynamicOps` 格式和要转换的编码对象来实现。

```java
// 将 Tag 转换为 JsonElement
// 假设 exampleTag 是一个 Tag
JsonElement convertedJson = NbtOps.INSTANCE.convertTo(JsonOps.INSTANCE, exampleTag);
```

### DataResult

使用编解码器编码或解码的数据会返回一个 `DataResult`，其中包含成功转换的实例或一些错误数据，具体取决于转换是否成功。如果转换成功，`#result` 提供的 `Optional` 将包含成功转换的对象。如果转换失败，`#error` 提供的 `Optional` 将包含 `PartialResult`，它持有错误消息和根据编解码器部分转换的对象。

此外，`DataResult` 上还有许多方法可以用于将结果或错误转换为所需的格式。例如，`#resultOrPartial` 方法在成功时返回包含结果的 `Optional`，在失败时返回部分转换的对象。该方法接受一个字符串消费者，以确定如何报告错误消息（如果存在）。

```java
// 假设 exampleCodec 代表 Codec<ExampleJavaObject>
// 假设 exampleJson 是一个 JsonElement

// 将 JsonElement 解码为 Java 对象
DataResult<ExampleJavaObject> result = exampleCodec.parse(JsonOps.INSTANCE, exampleJson);

result
  // 在错误时获取结果或部分结果，报告错误消息
  .resultOrPartial(errorMessage -> /* 处理错误消息 */)
  // 如果结果或部分结果存在，执行某些操作
  .ifPresent(decodedObject -> /* 处理解码对象 */);
```

## 现有编解码器

### 基本类型

`Codec` 类包含某些定义基本类型的静态编解码器实例。

| 编解码器       | Java 类型      |
|:---:          |:---:          |
| `BOOL`        | `Boolean`     |
| `BYTE`        | `Byte`        |
| `SHORT`       | `Short`       |
| `INT`         | `Integer`     |
| `LONG`        | `Long`        |
| `FLOAT`       | `Float`       |
| `DOUBLE`      | `Double`      |
| `STRING`      | `String`      |
| `BYTE_BUFFER` | `ByteBuffer`  |
| `INT_STREAM`  | `IntStream`   |
| `LONG_STREAM` | `LongStream`  |
| `PASSTHROUGH` | `Dynamic<?>`\*|
| `EMPTY`       | `Unit`\*\*    |

\* `Dynamic` 是一个在支持的 `DynamicOps` 格式中持有值的对象。通常用于将编码对象格式转换为其他编码对象格式。

\*\* `Unit` 是一个用于表示 `null` 对象的对象。

### 原版和 Forge

Minecraft 和 Forge 为那些经常需要编码和解码的对象定义了许多编解码器。一些例子包括用于 `ResourceLocation` 的 `ResourceLocation#CODEC`，用于 `DateTimeFormatter#ISO_INSTANT` 格式的 `ExtraCodecs#INSTANT_ISO8601`，以及用于 `CompoundTag` 的 `CompoundTag#CODEC`。

!!! 警告
    `CompoundTag` 无法使用 `JsonOps` 从 JSON 中解码数字列表。`JsonOps` 在转换时会将数字设置为其最窄类型。`ListTag` 强制为其数据使用特定类型，因此具有不同类型的数字（例如 `64` 将是 `byte`，`384` 将是 `short`）在转换时会抛出错误。

原版和 Forge 的注册表也有对注册表中包含的对象类型的编解码器（例如 `Registry#BLOCK` 或 `ForgeRegistries#BLOCKS` 具有 `Codec<Block>`）。`Registry#byNameCodec` 和 `IForgeRegistry#getCodec` 将注册表对象编码为其注册名称，或在压缩时编码为整数标识符。原版注册表还包含一个 `Registry#holderByNameCodec`，该编解码器编码为注册表名称，并解码为包装在 `Holder` 中的注册对象。

## 创建编解码器

可以为任何对象创建编解码器。为方便理解，将会展示等效的编码 JSON。

### 记录

编解码器可以通过使用记录来定义对象。每个记录编解码器通过显式命名字段定义对象。创建记录编解码器有多种方法，但最简单的是使用 `RecordCodecBuilder#create`。

`RecordCodecBuilder#create` 接收一个定义 `Instance` 并返回一个对象应用程序（`App`）的函数。可以将这与创建类 *实例* 和用于将类 *应用* 于构造对象的构造函数联想到一起。

```java
// 某个对象类的编解码器
public class SomeObject {

  public SomeObject(String s, int i, boolean b) { /* ... */ }

  public String s() { /* ... */ }

  public int i() { /* ... */ }

  public boolean b() { /* ... */ }
}
```

#### 字段

一个 `Instance` 最多可以使用 `#group` 定义16个字段。每个字段必须是定义对象实例的应用程序，以及该对象的类型。满足这一要求的最简单方法是获取一个 `Codec`，设置要从中解码的字段名称，并设置用于编码字段的 getter。

如果字段是必需的，可以通过 `#fieldOf` 方法从 `Codec` 创建字段；如果字段包装在 `Optional` 中或有默认值，可以通过 `#optionalFieldOf` 创建字段。任意一种方法都需要一个包含编码对象中字段名称的字符串，然后可以使用 `#forGetter` 设置用于编码字段的 getter，接受一个给定对象的函数，返回字段数据。

从那里，可以通过 `#apply` 应用生成的产品，以定义实例应该如何构建该对象。为方便起见，分组字段应按它们在构造函数中出现的顺序列出，这样该函数可以简单地是一个构造方法引用。

```java
public static final Codec<SomeObject> RECORD_CODEC = RecordCodecBuilder.create(instance -> // 给定一个实例
  instance.group( // 定义实例中的字段
    Codec.STRING.fieldOf("s").forGetter(SomeObject::s), // String字段
    Codec.INT.optionalFieldOf("i", 0).forGetter(SomeObject::i), // 整数字段，如果字段不存在，默认为0
    Codec.BOOL.fieldOf("b").forGetter(SomeObject::b) // 布尔字段
  ).apply(instance, SomeObject::new) // 定义如何创建对象
);
```

```js
// 编码的 SomeObject
{
  "s": "value",
  "i": 5,
  "b": false
}

// 另一个编码的 SomeObject
{
  "s": "value2",
  // i 被省略，默认为 0
  "b": true
}
```

### 转换器

编解码器可以通过映射方法转换为等效或部分等效的表示。每个映射方法接收两个函数：一个用于将当前类型转换为新类型，另一个用于将新类型转换回当前类型。这是通过 `#xmap` 完成的。

```java
// 一个类
public class ClassA {

  public ClassB toB() { /* ... */ }
}

// 另一个等效类
public class ClassB {

  public ClassA toA() { /* ... */ }
}

// 假设有一个编解码器 A_CODEC
public static final Codec<ClassB> B_CODEC = A_CODEC.xmap(ClassA::toB, ClassB::toA);
```

如果类型是部分等效的，即转换过程中有一些限制，则有返回 `DataResult` 的映射函数，可以用于在异常或无效状态出现时返回错误状态。

| A 是否完全等效于 B | B 是否完全等效于 A | 转换方法       |
|:---:             |:---:             |:---            |
| 是               | 是               | `#xmap`        |
| 是               | 否               | `#flatComapMap`|
| 否               | 是               | `#comapFlatMap`|
| 否               | 否               | `#flatXMap`    |

```java
// 给定一个字符串编解码器用于转换为整数
// 不是所有字符串都能转换为整数（A 不完全等效于 B）
// 所有整数都能转换为字符串（B 完全等效于 A）
public static final Codec<Integer> INT_CODEC = Codec.STRING.comapFlatMap(
  s -> { // 返回包含错误的 data result 在转换失败时
    try {
      return DataResult.success(Integer.valueOf(s));
    } catch (NumberFormatException e) {
      return DataResult.error(s + " 不是一个整数。");
    }
  },
  Integer::toString // 常规函数
);
```

```js
// 将返回 5
"5"

// 将报错，不是整数
"value"
```

#### 范围编解码器

范围编解码器是 `#flatXMap` 的一种实现，它在值不处于设定最小值和最大值之间时返回一个错误 `DataResult`。如果超出边界，该值仍然以部分结果形式提供。还有针对整数、浮点数和双精度浮点数的实现，这些实现分别通过 `#intRange`、`#floatRange` 和 `#doubleRange` 实现。

```java
public static final Codec<Integer> RANGE_CODEC = Codec.intRange(0, 4); 
```

```js
// 将有效，在 [0, 4] 之内
4

// 将报错，在 [0, 4] 之外
5
```

### 默认值

如果编码或解码失败，可以通过 `Codec#orElse` 或 `Codec#orElseGet` 提供一个默认值。

```java
public static final Codec<Integer> DEFAULT_CODEC = Codec.INT.orElse(0); // 也可以是通过 #orElseGet 提供的值
```

```js
// 不是整数，默认为 0
"value"
```

### Unit

一个提供编码值并编码为空值的编解码器可以通过 `Codec#unit` 表示。如果编解码器使用数据对象中无法编码的条目，这将非常有用。

```java
public static final Codec<IForgeRegistry<Block>> UNIT_CODEC = Codec.unit(
  () -> ForgeRegistries.BLOCKS // 也可以是一个原始值
);
```

```js
// 此处为空，将返回块注册表编解码器
```

### 列表

可以通过 `Codec#listOf` 从对象编解码器生成对象列表的编解码器。

```java
// BlockPos#CODEC 是 Codec<BlockPos>
public static final Codec<List<BlockPos>> LIST_CODEC = BlockPos.CODEC.listOf();
```

```js
// 编码的 List<BlockPos>
[
  [1, 2, 3], // BlockPos(1, 2, 3)
  [4, 5, 6], // BlockPos(4, 5, 6)
  [7, 8, 9]  // BlockPos(7, 8, 9)
]
```

使用列表编解码器解码的列表对象存储在一个**不可变**列表中。如果需要可变列表，应将 [transformer] 应用于列表编解码器。

### 映射

可以从两个编解码器生成一对键和值对象的编解码器，方法是使用 `Codec#unboundedMap`。无限制映射可以指定任意基于字符串或字符串转换的值作为键。

```java
// BlockPos#CODEC 是 Codec<BlockPos>
public static final Codec<Map<String, BlockPos>> MAP_CODEC = Codec.unboundedMap(Codec.STRING, BlockPos.CODEC);
```

```js
// 编码的 Map<String, BlockPos>
{
  "key1": [1, 2, 3], // key1 -> BlockPos(1, 2, 3)
  "key2": [4, 5, 6], // key2 -> BlockPos(4, 5, 6)
  "key3": [7, 8, 9]  // key3 -> BlockPos(7, 8, 9)
}
```

使用无限制映射编解码器解码的映射对象存储在一个**不可变**映射中。如果需要可变映射，应将 [transformer] 应用于映射编解码器。

!!! 警告
    无限制映射只支持键编码/解码为/从字符串。如果需要规避此限制，可以使用键值 [pair] 列表编解码器。

### 键值对

可以通过 `Codec#pair` 从两个编解码器生成对象对的编解码器。

一个对编解码器通过首先解码对中的左侧对象，然后获取编码对象的剩余部分来解码右侧对象来解码对象。因此，编解码器要么需要表达解码对象后的某些内容（例如 [records]），要么需要被扩展为 `MapCodec` 并通过 `#codec` 转换为常规编解码器。这通常可以通过将编解码器设置为某个对象的 [field] 来完成。

```java
public static final Codec<Pair<Integer, String>> PAIR_CODEC = Codec.pair(
  Codec.INT.fieldOf("left").codec(),
  Codec.STRING.fieldOf("right").codec()
);
```

```js
// 编码的 Pair<Integer, String>
{
  "left": 5,       // fieldOf 查找 'left' 键来获取左侧对象
  "right": "value" // fieldOf 查找 'right' 键来获取右侧对象
}
```

!!! 提示
    具有非字符串键的映射编解码器可以通过应用 [transformer] 于键值对列表来进行编码/解码。

### Either

可以通过 `Codec#either` 从两个编解码器生成两种不同方法的编码/解码对象数据的编解码器。

一个 either 编解码器首先尝试使用第一个编解码器解码对象。如果失败，它会尝试使用第二个编解码器进行解码。如果这也失败，那么 `DataResult` 只会包含第二个编解码器失败的错误。

```java
public static final Codec<Either<Integer, String>> EITHER_CODEC = Codec.either(
  Codec.INT,
  Codec.STRING
);
```

```js
// 编码的 Either$Left<Integer, String>
5

// 编码的 Either$Right<Integer, String>
"value"
```

!!! 提示
    这可以与 [transformer] 结合使用，以从两种不同的编码方法中获取特定对象。

### 调度

编解码器可以具有子编解码器，这些子编解码器可以根据某种指定类型解码特定对象，方法是使用 `Codec#dispatch`。这通常用于包含编解码器的注册表中，例如规则测试或块放置器。

调度编解码器首先尝试从某个字符串键（通常为 `type`）获取编码类型。然后，解码类型，调用某个获取特定编解码器的方法，用于解码实际对象。如果用于解码对象的 `DynamicOps` 压缩其映射，或对象编解码器本身未被扩展为 `MapCodec`（例如记录或字段基本类型），则必须将对象存储在 `value` 键中。否则，对象将在与其余数据相同的级别解码。

```java
// 定义我们的对象
public abstract class ExampleObject {

  // 定义用于指定对象类型以进行编码的方法
  public abstract Codec<? extends ExampleObject> type();
}

// 创建存储字符串的简单对象
public class StringObject extends ExampleObject {

  public StringObject(String s) { /* ... */ }

  public String s() { /* ... */ }

  public Codec<? extends ExampleObject> type() {
    // 一个已注册的注册表对象
    // "string":
    //   Codec.STRING.xmap(StringObject::new, StringObject::s)
    return STRING_OBJECT_CODEC.get();
  }
}

// 创建存储字符串和整数的复杂对象
public class ComplexObject extends ExampleObject {

  public ComplexObject(String s, int i) { /* ... */ }

  public String s() { /* ... */ }

  public int i() { /* ... */ }

  public Codec<? extends ExampleObject> type() {
    // 一个已注册的注册表对象
    // "complex":
    //   RecordCodecBuilder.create(instance ->
    //     instance.group(
    //       Codec.STRING.fieldOf("s").forGetter(ComplexObject::s),
    //       Codec.INT.fieldOf("i").forGetter(ComplexObject::i)
    //     ).apply(instance, ComplexObject::new)
    //   )
    return COMPLEX_OBJECT_CODEC.get();
  }
}

// 假设有一个 IForgeRegistry<Codec<? extends ExampleObject>> DISPATCH
public static final Codec<ExampleObject> = DISPATCH.getCodec() // 获取 Codec<Codec<? extends ExampleObject>>
  .dispatch(
    ExampleObject::type, // 从特定对象获取编解码器
    Function.identity() // 从注册表中获取编解码器
  );
```

```js
// 简单对象
{
  "type": "string", // 对于 StringObject
  "value": "value" // 编解码器类型未从 MapCodec 中扩展，需要字段
}

// 复杂对象
{
  "type": "complex", // 对于 ComplexObject

  // 编解码器类型从 MapCodec 中扩展，可以内联
  "s": "value",
  "i": 0
}
```

[DataFixerUpper]: https://github.com/Mojang/DataFixerUpper
[gson]: https://github.com/google/gson
[transformer]: #transformer-codecs
[pair]: #pair
[records]: #records
[field]: #fields