---
title: SimpleImpl
order: 1
toc: content
group:
  title: 网络通信
  order: 9989
---
SimpleImpl
==========

SimpleImpl 是围绕 `SimpleChannel` 类构建的数据包系统的名称。使用这个系统是在客户端和服务器之间发送自定义数据的最简单方法。

入门指南
---------------

首先，你需要创建你的 `SimpleChannel` 对象。我们建议在一个单独的类中创建，例如 `ModidPacketHandler`。在这个类中，创建你的 `SimpleChannel` 作为静态字段，如下所示：

```java
private static final String PROTOCOL_VERSION = "1";
public static final SimpleChannel INSTANCE = NetworkRegistry.newSimpleChannel(
  new ResourceLocation("mymodid", "main"),
  () -> PROTOCOL_VERSION,
  PROTOCOL_VERSION::equals,
  PROTOCOL_VERSION::equals
);
```

第一个参数是频道的名称。第二个参数是一个 `Supplier<String>` 用于返回当前网络协议版本。第三和第四个参数分别是 `Predicate<String>`，用于检查传入连接协议版本与客户端或服务器是否兼容。在这里，我们直接与 `PROTOCOL_VERSION` 字段进行比较，这意味着客户端和服务器的 `PROTOCOL_VERSION` 必须始终匹配，否则 FML 将拒绝登录。

版本检查器
-------------------

如果你的 mod 不需要对端有一个特定的网络频道，或者根本不是一个 Forge 实例，你应该注意正确定义你的版本兼容性检查（`Predicate<String>` 参数），以处理版本检查器可能接收到的额外“元版本”（定义在 `NetworkRegistry` 中）。这些是：

* `ABSENT` - 对端缺少此频道。注意，在这种情况下，对端仍然是一个 Forge 端点，并且可能有其他 mod。
* `ACCEPTVANILLA` - 如果对端是一个原版（或非 Forge）端点。

如果对这两个返回的都是 `false`，那么此频道必须存在于对端。如果只是复制上面的代码，这就是它的功能。注意，这些值也用于列表 ping 兼容性检查，其负责在多人服务器选择屏幕中显示绿色勾/红色叉。

注册数据包
-------------------

接下来，我们必须声明希望发送和接收的消息类型。使用 `INSTANCE#registerMessage` 完成此操作，该方法接受 5 个参数：

- 第一个参数是数据包的唯一标识符。它是每个频道的唯一数据包 ID。建议使用局部变量来保存 ID，然后通过 `id++` 调用 registerMessage。这将保证 100% 唯一的 ID。
- 第二个参数是实际的数据包类 `MSG`。
- 第三个参数是 `BiConsumer<MSG, FriendlyByteBuf>`，负责将消息编码到提供的 `FriendlyByteBuf`。
- 第四个参数是 `Function<FriendlyByteBuf, MSG>`，负责从提供的 `FriendlyByteBuf` 解码消息。
- 最后一个参数是 `BiConsumer<MSG, Supplier<NetworkEvent.Context>>`，负责处理消息本身。

最后三个参数可以是 Java 中的方法引用，指向静态或实例方法。请记住，实例方法 `MSG#encode(FriendlyByteBuf)` 仍然满足 `BiConsumer<MSG, FriendlyByteBuf>`；`MSG` 只是成为了隐式第一个参数。

处理数据包
-------------------

在数据包处理器中需要强调几点。数据包处理器同时拥有消息对象和网络上下文。上下文允许访问发送数据包的玩家（如果在服务器上），并提供了一种入队线程安全工作的方式。

```java
public static void handle(MyMessage msg, Supplier<NetworkEvent.Context> ctx) {
  ctx.get().enqueueWork(() -> {
    // 需要线程安全的工作（大多数工作）
    ServerPlayer sender = ctx.get().getSender(); // 发送此数据包的客户端
    // 执行操作
  });
  ctx.get().setPacketHandled(true);
}
```

从服务器发送到客户端的数据包应在另一个类中处理，并通过 `DistExecutor#unsafeRunWhenOn` 包装。

```java
// 在数据包类中
public static void handle(MyClientMessage msg, Supplier<NetworkEvent.Context> ctx) {
  ctx.get().enqueueWork(() ->
    // 确保只在物理客户端上执行
    DistExecutor.unsafeRunWhenOn(Dist.CLIENT, () -> () -> ClientPacketHandlerClass.handlePacket(msg, ctx))
  );
  ctx.get().setPacketHandled(true);
}

// 在 ClientPacketHandlerClass 中
public static void handlePacket(MyClientMessage msg, Supplier<NetworkEvent.Context> ctx) {
  // 执行操作
}
```

注意 `#setPacketHandled` 的存在，它用于告知网络系统数据包已成功处理。

!!! 警告
    从 Minecraft 1.8 开始，数据包默认在网络线程上处理。

    这意味着你的处理器不能直接与大多数游戏对象交互。Forge 提供了一种方便的方法来使你的代码在下一次机会在主线程上执行，通过提供的 `NetworkEvent$Context`。只需调用 `NetworkEvent$Context#enqueueWork(Runnable)`，这将在下一次机会在主线程上调用给定的 `Runnable`。

!!! 警告
    在服务器上处理数据包时需小心。客户端可能试图通过发送意外数据来利用数据包处理。

    一个常见问题是对**任意区块生成**的漏洞。通常发生在服务器信任客户端发送的块位置去访问块和方块实体时。当访问未加载区域的块和方块实体时，服务器将生成或从磁盘加载此区域，然后迅速将其写入磁盘。这可能被利用来对服务器的性能和存储空间造成**灾难性损害**，而不留下任何痕迹。

    为避免此问题，一个通用的经验法则是仅在 `Level#hasChunkAt` 为真时访问块和方块实体。

发送数据包
---------------

### 发送到服务器

发送数据包到服务器只有一种方法。这是因为客户端一次只能连接到*一个*服务器。为此，我们必须再次使用之前定义的 `SimpleChannel`。简单地调用 `INSTANCE.sendToServer(new MyMessage())`。如果存在处理其类型的处理器，消息将被发送到该处理器。

### 发送到客户端

数据包可以使用 `SimpleChannel` 直接发送到客户端：`HANDLER.sendTo(new MyClientMessage(), serverPlayer.connection.getConnection(), NetworkDirection.PLAY_TO_CLIENT)`。不过，这可能会很不方便。Forge 提供了一些便捷函数可用：

```java
// 发送给一位玩家
INSTANCE.send(PacketDistributor.PLAYER.with(serverPlayer), new MyMessage());

// 发送给所有跟踪该区域块的玩家
INSTANCE.send(PacketDistributor.TRACKING_CHUNK.with(levelChunk), new MyMessage());

// 发送给所有连接的玩家
INSTANCE.send(PacketDistributor.ALL.noArg(), new MyMessage());
```

还有其他可用的 `PacketDistributor` 类型；有关更多详细信息，请查看 `PacketDistributor` 类的文档。