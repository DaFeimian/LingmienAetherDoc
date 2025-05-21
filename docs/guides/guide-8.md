---
title: Python类的继承
order: 8
group:
  title: 开发指南
  order: 3
---
## 为什么需要类的继承
减少代码的重复性，方便编写，可以理解成微软原版实体的行为继承。假设正在编写一个有技能的角色，他们都拥有`Name`,`Health`,`Damage`，但是不同的是他们一个有技能，一个没技能，那么可以这样写：

## 类的继承
子类如果和父类有同名函数，那么将是直接以子类为准执行，不会叠加，理解成微软原版实体的行为继承就可以了。

### 父类：
```python
class Role:
    def __init__(self, Name, Health, Damage):
        self.Name = Name
        self.Health = Health
        self.Damage = Damage

    def GetHealth(self):
        print '{0}的生命值为：{1}'.format(self.Name, self.Health)

    def GetDamage(self):
        print '{0}的攻击力为：{1}'.format(self.Name, self.Damage)
```

### 子类一：
```python
class Role1(Role):
    def __init__(self, Name, Health, Damage):
        Role.__init__(self, Name, Health, Damage)
        self.HasSkill = False

    def GetSkill(self):
        print '{0}是否有技能：{1}'.format(self.Name, self.HasSkill)
```

### 子类二：
```python
class Role2(Role):
    def __init__(self, Name, Health, Damage):
        Role.__init__(self, Name, Health, Damage)
        self.HasSkill = True

    def GetSkill(self):
        print '{0}是否有技能：{1}'.format(self.Name, self.HasSkill)
```

> 在`python2.7`中超类的调用`super`和`python3.x`是不一样的，所以可以直接用`Role.__init__(self, Name, Health, Damage)`防止混淆，当然也还是可以用`super`的
