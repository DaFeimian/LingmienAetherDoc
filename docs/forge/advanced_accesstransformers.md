---
title: 访问转换器
order: 0
toc: content
group:
  title: 进阶
  order: 9998
---
访问转换器
===================

访问转换器（简称 ATs）允许拓宽类、方法和字段的可见性以及修改它们的 `final` 标志。它们允许模组开发者访问和修改那些在类外部无法控制的成员。

可以在 Minecraft Forge 的 GitHub 上查看[规范文档][specs]。

添加访问转换器
----------

向你的模组项目添加访问转换器就像在 `build.gradle` 中添加一行代码一样简单：

```groovy
// 此块中还需要指定你的映射版本
minecraft {
  accessTransformer = file('src/main/resources/META-INF/accesstransformer.cfg')
}
```

在添加或修改访问转换器之后，必须刷新Gradle项目才能生效。

在开发阶段，AT文件可以放在上述行指定的任何位置。然而，在非开发环境中加载时，Forge 只会搜索 JAR 文件中 `META-INF/accesstransformer.cfg` 的确切路径。

注释
--------

所有在 `#` 之后直到行尾的文本将被视为注释，不会被解析。

访问修饰符
----------------

访问修饰符指定给定目标将被转换为新的成员可见性。按可见性递减顺序排列：

* `public` - 对包内外的所有类可见
* `protected` - 仅对包内和子类可见
* `default`（默认）- 仅对包内类可见
* `private` - 仅在类内部可见

可以在上述修饰符后附加特殊修饰符 `+f` 和 `-f`，分别用于添加或去除 `final` 修饰符。当应用时，`final` 修饰符可以防止子类化、方法重写或字段修改。

!!! 警告
    指令只会修改它们直接引用的方法；任何重写的方法都不会被访问转换。建议确保被转换的方法没有未被转换且限制可见性的重写方法，否则将导致 JVM 抛出错误。
    
    可以安全转换的方法示例包括 `private` 方法、`final` 方法（或在 `final` 类中的方法）以及 `static` 方法。

目标和指令
----------------------

!!! 重要
    使用访问转换器作用于 Minecraft 类时，字段和方法必须使用 SRG 名称。

### 类
要定位类：
```
<访问修饰符> <完全限定类名>
```
内部类通过结合外部类的完全限定名和内部类名，并用 `$` 作为分隔符来表示。

### 字段
要定位字段：
```
<访问修饰符> <完全限定类名> <字段名>
```

### 方法
定位方法需要特殊语法来表示方法参数和返回类型：
```
<访问修饰符> <完全限定类名> <方法名>(<参数类型>)<返回类型>
```

#### 指定类型

也称为“描述符”：参见 [Java 虚拟机规范，SE 8，章节 4.3.2 和 4.3.3][jvmdescriptors] 以了解更多技术细节。

* `B` - `byte`，有符号字节
* `C` - `char`，UTF-16格式的Unicode字符代码点
* `D` - `double`，双精度浮点值
* `F` - `float`，单精度浮点值
* `I` - `integer`，32位整数
* `J` - `long`，64位整数
* `S` - `short`，有符号短整数
* `Z` - `boolean`，布尔值 `true` 或 `false`
* `[` - 表示数组的一维
  * 示例：`[[S` 表示 `short[][]`
* `L<class name>;` - 表示引用类型
  * 示例：`Ljava/lang/String;` 表示 `java.lang.String` 引用类型 _(注意使用斜杠而不是句点)_
* `(` - 表示方法描述符，参数应在此处提供或者为空（如果没有参数）
  * 示例：`<method>(I)Z` 表示需要一个整数参数并返回一个布尔值的方法
* `V` - 表示方法不返回值，仅能在方法描述符末尾使用
  * 示例：`<method>()V` 表示没有参数且不返回任何值的方法

示例
--------

```
# 将 Crypt 中的接口 ByteArrayToKeyFunction 设为 public
public net.minecraft.util.Crypt$ByteArrayToKeyFunction

# 将 MinecraftServer 中的 'random' 设为 protected 并去除 final 修饰符
protected-f net.minecraft.server.MinecraftServer f_129758_ #random

# 将 Util 类中接受一个 String 并返回一个 ExecutorService 的方法 'makeExecutor' 设为 public
public net.minecraft.Util m_137477_(Ljava/lang/String;)Ljava/util/concurrent/ExecutorService; #makeExecutor

# 将 UUIDUtil 中接受两个 long 并返回一个 int[] 的方法 'leastMostToIntArray' 设为 public
public net.minecraft.core.UUIDUtil m_235872_(JJ)[I #leastMostToIntArray
```

[specs]: https://github.com/MinecraftForge/AccessTransformers/blob/master/FMLAT.md
[jvmdescriptors]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.3.2