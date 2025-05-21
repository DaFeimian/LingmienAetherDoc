---
title: 自定义建筑结构
order: 4
toc: content
group:
  title: 配置组件
  order: 2
---

# 自定义建筑结构

## 描述
None

## 示例
```json
{
  "format_version": "1.1.4",
  "dafeimian:building": {
    "description": {
      "name": "某房子",
      "info": "由台阶、石砖等方块构成，使用了xx的方式制作"
    },
    "components": {
      "dafeimian:building_data": [
        [
            {
                "Position": [
                    0, 
                    0, 
                    0
                ], 
                "BlockId": "minecraft:mud_bricks", 
                "AuxValue": 0
            }, 
            {
                "Position": [
                    0, 
                    0, 
                    1
                ], 
                "BlockId": "minecraft:mud_bricks", 
                "AuxValue": 0
            }
        ],
        [
            {
                "Position": [
                    0, 
                    1, 
                    0
                ], 
                "BlockId": "minecraft:mud_brick_stairs", 
                "AuxValue": 2
            }, 
            {
                "Position": [
                    0, 
                    1, 
                    1
                ], 
                "BlockId": "minecraft:mud_brick_wall", 
                "AuxValue": 211
            }
        ]
      ]
    }
  }
}
```

## description
<Badge type="info">json</Badge>该Json所需描述信息

### name
<Badge type="info">str</Badge>该建筑的名称

### info
<Badge type="info">str</Badge>该建筑介绍信息

## components
<Badge type="info">json</Badge>该Json类型的组件库，可以选择一些组件来组装功能，并不是需要全部填写

### dafeimian:building_data
<Badge type="error">必需</Badge><Badge type="info">list</Badge>该建筑的建筑数据，使用`调试工具`可快速导出

### dafeimian:building_require
<Badge type="info">json</Badge>该建筑的建筑数据所需方块统计

### dafeimian:building_scale
<Badge type="info">list</Badge>该建筑的建筑数据所占范围大小