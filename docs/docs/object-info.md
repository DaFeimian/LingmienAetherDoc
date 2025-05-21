---
title: 基础说明
order: 0
toc: content
group:
  title: 面向对象&流式接口
  order: 0
---

:::success{title=太棒了！}
- 新版接口用法将更为方便、人性化
- 依旧对旧版接口使用方法兼容
:::

# LASystem 面向对象接口使用说明（v1.2.0）

为提升代码可读性、可维护性与开发者体验，灵免以太系统接口自 v1.2.0 起引入统一面向对象访问风格，替代传统函数式调用。通过实体、方块等数据对象的封装，开发者可更直观地以“操作对象”而非“操作 ID”的方式书写逻辑，显著减少参数传递冗余、命名混杂及接口分散问题。

## 一、接口风格变化对比

- 旧版调用（函数式）：
```python
# 获取实体属性
self.LA.GetAttrValue(EntityId, AttrKey)
# 获取实体位置
self.LA.GetEntityPos(EntityId)
```

- 新版调用（面向对象式）：
```python
# 获取属性、修改属性
LASystem.Entity(EntityId).GetAttrValue(AttrKey)
LASystem.Entity(EntityId).SetAttrValue(AttrKey, NewValue=10)
# 获取实体位置
LASystem.Entity(EntityId).GetEntityPos()
```

或者更流式访问的新版语法（OneEntity 模型）：
```python
# 获取实体位置
Position = LASystem.OneEntity(EntityId).Position
# 获取实体单个实例
TheEntity = LASystem.OneEntity(EntityId)
# 修改实体血量
TheEntity.Health = 10
# 实体中文名称
ChineseName = TheEntity.ChineseName
```

## 二、设计理念

- 所有逻辑以实体、方块为“第一对象”：行为与数据聚合于对象本身
- 方法分布清晰：Entity → 行为方法类；OneEntity → 常用属性封装访问器
- 支持链式读写、自动提示：结构化后 IDE 补全能力显著增强
- 减少口令式函数命名：替代冗余方法如 GetAttrXXX、SetXYZZZ 系列

## 三、接口结构示例

1️⃣ Entity(EntityId)（函数访问风格）

用于访问面向功能的方法接口，例如：

- GetAttrValue()
- SetAttrValue()
- SetImmuneDamage()
- GetEntitySize()
- GetEntityChineseName()
- SetEntityOnFire()

2️⃣ OneEntity(EntityId)（属性流式访问）

用于访问实体所有常用核心属性，支持属性式快速读写，例如：

- 实体血量 ：OneEntity.Health
- 移动速度 ：OneEntity.Speed
- 缩放倍率 ：OneEntity.Scale
- 坐标位置 ：OneEntity.Position
- 自定义名称 ：OneEntity.CustomName = "灵免以太"

3️⃣ Block(BlockPos)（方块对象接口）

继承同一访问风格，用于对特定方块坐标进行操作，例如：

- 获取方块信息：Block().GetBlockDictByPos()
- 放置方块：Block().CheckAndSetBlockByPos()
- 设置奖励箱：Block().SetChestReward()

☑️ 四、优势总结

- 调用书写更自然（object.method/attribute）；
- 提升开发体验（补全、工具链支持更好）；
- 模块解耦，便于后期拓展实体组件等系统；
- 更贴合现代 Python 开发者的使用习惯；
- 接口分类明确，避免场景型命名混乱。


更多面向对象、流式接口请使用[IDE补全](http://1.94.129.175:8001/static/LingmienAether.zip)。