---
title: 保存数据
order: 1
toc: content
group:
  title: 数据存储
  order: 9992
---
保存数据
==========

保存数据(SD)系统是一种可以为每个关卡附加数据的替代方案，相对于关卡能力。

声明
-----------

每个SD实现必须是`SavedData`类的子类型。需要注意两个重要的方法：

* `save`：允许实现将NBT数据写入关卡。
* `setDirty`：在更改数据后必须调用的方法，用于通知游戏有需要写入的更改。如果不调用，`#save`不会被调用，现有数据将保持不变。

附加到关卡
----------------------

任何`SavedData`都是动态加载和/或附加到一个关卡上的。因此，如果在一个关卡上从未创建过，那么它将不存在。

`SavedData`是从`DimensionDataStorage`中创建和加载的，可以通过`ServerChunkCache#getDataStorage`或`ServerLevel#getDataStorage`访问。从那里，你可以通过调用`DimensionDataStorage#computeIfAbsent`获取或创建你的SD实例。这将尝试获取当前的SD实例（如果存在）或创建一个新的实例并加载所有可用数据。

`DimensionDataStorage#computeIfAbsent`接收三个参数：一个加载NBT数据到SD并返回的函数，一个构造SD新实例的供应商，以及一个存储在实现关卡的`data`文件夹中的`.dat`文件的名称。

例如，如果在下界中一个SD名为"example"，那么将在`./<level_folder>/DIM-1/data/example.dat`创建一个文件，并将如下实现：

```java
// 在某个类中
public ExampleSavedData create() {
  return new ExampleSavedData();
}

public ExampleSavedData load(CompoundTag tag) {
  ExampleSavedData data = this.create();
  // 加载保存的数据
  return data;
}

// 在类中的某个方法中
netherDataStorage.computeIfAbsent(this::load, this::create, "example");
```

要在多个关卡间持久化SD，SD应附加到主世界（Overworld），可以通过`MinecraftServer#overworld`获取。主世界是唯一一个不会被完全卸载的维度，因此非常适合存储多关卡数据。