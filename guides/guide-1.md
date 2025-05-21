---
title: 优化模组
order: 1
group:
  title: 开发指南
  order: 3
nav:
  title: 开发指南
  order: 1
---
## 逻辑优化
### 降帧处理
```python
class DemoClientSystem(ClientSystem):
	def __init__(self, namespace, systemName):
		ClientSystem.__init__(self, namespace, systemName)
		self.tick = 0

	def Update(self):
		self.tick = self.tick + 1
		# 重要逻辑每帧执行
		self.do_something1()

		if self.tick % 5 == 0:
			# 次要逻辑降帧执行
			self.do_something2()
		
		if self.tick % 10 == 0:
			# 更次要的逻辑，使用更低的帧率执行
			self.do_something3()
```

### 分帧处理
```python
# 修改某个区域 100 * 100 * 100范围内的方块为空气
def SetBlocksToAir(self, fromPos):
	# 命令队列
	self.posList = []
	self.posIndex = 0        

	for x in range(1, 100):
		for y in range(1, 100):
			for z in range(1, 100):
				self.posList.append((fromPos[0] + x, fromPos[1] + y, fromPos[2] + z))

# 被引擎直接执行的父类的重写函数，引擎会执行该Update回调，1秒钟30帧
def Update(self):
	if self.posList:
		posListLen = len(self.posList)            
		blockcomp = serverApi.CreateComponent(id, "Minecraft", "blockInfo")
		#每帧处理5个
		handleNum = 5
		while(handleNum > 0 and self.posIndex < posListLen):                
			blockcomp.SetBlockNew(self.posList[self.posIndex], {'name':'minecraft:air'})
			self.posIndex = self.posIndex + 1
			handleNum = handleNum - 1

		# 全部处理完成
		if self.posIndex >= posListLen:
			self.posList = None
```

### 服务端通信
服务端消息通知客户端能点对点就不要广播。

### 协程处理
用于`复杂逻辑计算`，使用`StartCoroutine`和`StopCoroutine`缓解游戏卡顿。(自定义`query`以及`CameraMotion`等计算是不是可以用这个)
> 协程(腾讯云)
协程（Coroutines）是一种比线程更加轻量级的存在。协程完全由程序所控制（在用户态执行），带来的好处是性能大幅度的提升。
一个操作系统中可以有多个进程；一个进程可以有多个线程；同理，一个线程可以有多个协程。
协程是一个特殊的函数，这个函数可以在某个地方挂起，并且可以重新在挂起处继续运行。
一个线程内的多个协程的运行是串行的，这点和多进程（多线程）在多核CPU上执行时是不同的。 多进程（多线程）在多核CPU上是可以并行的。当线程内的某一个协程运行时，其它协程必须挂起。

```python
    def CoroutineResult(self, TureContent=None, FalseContent=None, GeneratorId=None):
        if FalseContent is None:
            FalseContent = TureContent
        if type(GeneratorId) != bool:
            if GeneratorId is not None:
                logging.debug('{1} {0}'.format(GeneratorId, TureContent))
            else:
                logging.critical('{1} {0}'.format(GeneratorId, FalseContent))
        else:
            if GeneratorId:
                logging.debug('{1} {0}'.format(GeneratorId, TureContent))
            else:
                logging.critical('{1} {0}'.format(GeneratorId, FalseContent))

    def PlayerDataGetPlayerData(self, PlayerData):
        self.PlayerDataGeneratorId = clientApi.StartCoroutine(self.ProcessGetPlayerData(PlayerData), None)
        self.CoroutineResult('玩家数据携程开启', GeneratorId=self.PlayerDataGeneratorId)

    def ProcessGetPlayerData(self, PlayerData, *args):
        UINode = clientApi.GetUI(config.ModName, 'cubeparty')
        if PlayerData is not None:
            if self.PlayerData is None:
                self.PlayerData = PlayerData
                UINode.LoadCompleted()
                UINode.UpdatePlayerData(self.PlayerData)
            # Check Data. if False, Ban!
            elif self.PlayerData != PlayerData:
                self.NotifyMsg('作弊行为！封号！')
                logging.critical('作弊行为！强制退场！')
                UINode.Ban()
                # 这里再写个Set把玩家数据改为Ban
                compTimer.AddTimer(10, self.BanPlayer)
        else:
            UINode.LoadFailed()
        yield
```

### 多线程
确定有效，但是正如[异步和多线程](http://139.159.183.64/docs/da-fei-mian/da-fei-mian-1f444jgjvng2o)中所说的：
> `Minecraft`只有一个线程在执行游戏逻辑，他的UI、世界、实体等等都是在这一个线程运行的。

那么你的`python`中调用多线程来解决`UI`等单一线程逻辑的内容，就会发现`Get`结果为`None`，下面示例中的`无效代码`就是因为不在一个线程，`GetUI`有返回实例，但是当你使用`UI`的`GetBaseUIControl`控件时，发现返回的是`None`！

因此，你只能用多线程来执行`Python`中一些变量的运算，例如`联机大厅`中的玩家数据变量。

```python
import threading
    def PlayerDataGetPlayerData(self, PlayerData):
        logging.debug('创建玩家数据处理线程')
        threading.Thread(target=self.ProcessGetPlayerData, args=(PlayerData, 0), name='ProcessGetPlayerData').start()

    def ProcessGetPlayerData(self, PlayerData, *args):
        UINode = clientApi.GetUI(config.ModName, 'cubeparty')  # 无效代码！
        if PlayerData is not None:
            if self.PlayerData is None:
                self.PlayerData = PlayerData
                UINode.LoadCompleted()
                UINode.UpdatePlayerData(self.PlayerData)
            # Check Data. if False, Ban!
            elif self.PlayerData != PlayerData:
                self.NotifyMsg('作弊行为！封号！')
                logging.critical('作弊行为！强制退场！')
                UINode.Ban()
                # 这里再写个Set把玩家数据改为Ban
                compTimer.AddTimer(10, self.BanPlayer)
        else:
            UINode.LoadFailed()
```

### 根据火焰图优化函数
y 轴表示调用栈，每一层都是一个函数。调用栈越深，火焰就越高，顶部就是正在执行的函数，下方都是它的父函数。

x 轴表示抽样数，如果一个函数在 x 轴占据的宽度越宽，就表示它被抽到的次数多，即执行的时间长。注意，x 轴不代表时间，而是所有的调用栈合并后，按字母顺序排列的。

火焰图就是看顶层的哪个函数占据的宽度最大。只要有"平顶"（plateaus），就表示该函数可能存在性能问题。

颜色没有特殊含义，因为火焰图表示的是 CPU 的繁忙程度，所以一般选择暖色调。

鼠标悬浮时会显示完整的函数名、抽样抽中的次数、占据总抽样次数的百分比。下面是一个例子。

![](/uploads/da-fei-mian/images/m_d88a8edf21e914943bc2267e26b9a26c_r.png)

## 图片优化

### 规格优化
使用`2`次幂规格图片

### 存储优化
使用`pngquant`近乎无损压缩`*.png`文件，Windows安装包见附件，解压后，将图片拖到`*.bat`上就可以。

- `Drag PNG here to reduce palette automatically`：将PNG拖动到此处可自动缩小调色板

- `Drag PNG here to reduce palette to 256`：拖动PNG到此处可将调色板缩小到256

- `拖拽图片上来压缩80%~90%.bat`：肥免改的一个见附件，可以右键编辑修改压缩的比例

### 预加载
在`textures`根目录下创建`preload_textures_list.json`按照下面样式填写预加载的贴图：

```json
[
    "textures/ui/bg",
    "textures/ui/dfm_background",
    "textures/ui/banner/card",
    "textures/ui/banner/wishA231016",
	...
]
```