---
title: 使用 BlockEntityWithoutLevelRenderer
order: 1
toc: content
group:
  title: 物品
  order: 9988
---
`BlockEntityWithoutLevelRenderer` 是一种处理物品动态渲染的方法。这个系统比旧的 `ItemStack` 系统更简单，后者需要一个 `BlockEntity`，且不允许访问 `ItemStack`。

使用 BlockEntityWithoutLevelRenderer
--------------------------

BlockEntityWithoutLevelRenderer 允许您使用以下方法渲染物品：`public void renderByItem(ItemStack itemStack, ItemDisplayContext ctx, PoseStack poseStack, MultiBufferSource bufferSource, int combinedLight, int combinedOverlay)`。

为了使用 BEWLR，`Item` 必须首先满足其模型针对 `BakedModel#isCustomRenderer` 返回 true 的条件。如果没有，默认使用 `ItemRenderer#getBlockEntityRenderer`。一旦返回 true，就可以访问物品的 BEWLR 进行渲染。

!!! 注意
    如果 `Block#getRenderShape` 设置为 `RenderShape#ENTITYBLOCK_ANIMATED`，`Block` 也会使用 BEWLR 进行渲染。

要为一个物品设置 BEWLR，必须在 `Item#initializeClient` 内消费 `IClientItemExtensions` 的匿名实例。在匿名实例中，应重写 `IClientItemExtensions#getCustomRenderer` 以返回 BEWLR 的实例：

```java
// 在您的物品类中
@Override
public void initializeClient(Consumer<IClientItemExtensions> consumer) {
  consumer.accept(new IClientItemExtensions() {
    
    @Override
    public BlockEntityWithoutLevelRenderer getCustomRenderer() {
      return myBEWLRInstance;
    }
  });
}
```

!!! 重要
    每个模组应该只有一个自定义 BEWLR 的实例。

就这些，不需要额外的设置即可使用 BEWLR。