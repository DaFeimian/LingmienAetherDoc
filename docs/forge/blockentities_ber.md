---
title: 方块实体渲染器
order: 1
toc: content
group:
  title: 方块实体
  order: 9990
---
方块实体渲染器
==================

`BlockEntityRenderer` 或 `BER` 用于以无法通过静态烘焙模型（JSON、OBJ、B3D 等）表示的方式渲染方块。一个方块实体渲染器需要方块具备一个 `BlockEntity`。

创建 BER
--------------

要创建一个 BER，需要创建一个继承自 `BlockEntityRenderer` 的类。它需要指定一个泛型参数，用以指定方块的 `BlockEntity` 类。这个泛型参数用于 BER 的 `render` 方法中。

对于给定的 `BlockEntityType`，只存在一个 BER。因此，特定于级别中单个实例的值应该存储在传递给渲染器的方块实体中，而不是存储在 BER 本身中。例如，如果一个整数在每一帧递增，那么如果它存储在 BER 中，将会在级别中该类型的每个方块实体的每一帧都递增。

### `render`

此方法在每一帧都被调用，以渲染方块实体。

#### 参数
* `blockEntity`：这是正在渲染的方块实体实例。
* `partialTick`：自上一次完整 tick 以来经过的时间量，以 tick 的分数表示。
* `poseStack`：保存四维矩阵的堆栈，偏移到方块实体的当前位置。
* `bufferSource`：能够访问顶点消费者的渲染缓冲区。
* `combinedLight`：当前方块实体的光照值整数。
* `combinedOverlay`：设置为方块实体当前覆盖的整数，通常为 `OverlayTexture#NO_OVERLAY` 或 655,360。

注册 BER
-----------------

为了注册一个 BER，你必须订阅 mod 事件总线上的 `EntityRenderersEvent$RegisterRenderers` 事件，并调用 `#registerBlockEntityRenderer`。