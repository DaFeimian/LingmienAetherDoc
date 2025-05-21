---
title: 键映射
order: 1
toc: content
group:
  title: 其他功能
  order: 9997
---
# 键映射

键映射或键绑定定义了应与输入（如鼠标点击、按键等）关联的特定操作。客户端可以在接受输入时检查每一个由键映射定义的操作。此外，每个键映射可以通过[控制选项菜单][controls]分配给任何输入。

## 注册 `KeyMapping`

可以通过仅在物理客户端上监听 [**mod事件总线**][modbus] 上的 `RegisterKeyMappingsEvent` 并调用 `#register` 来注册一个 `KeyMapping`。

```java
// 在一些只属于物理客户端的类中

// 键映射是延迟初始化的，因此在注册之前不存在
public static final Lazy<KeyMapping> EXAMPLE_MAPPING = Lazy.of(() -> /*...*/);

// 事件仅在物理客户端的mod事件总线上
@SubscribeEvent
public void registerBindings(RegisterKeyMappingsEvent event) {
  event.register(EXAMPLE_MAPPING.get());
}
```

## 创建一个 `KeyMapping`

可以使用它的构造函数创建一个 `KeyMapping`。`KeyMapping` 接受一个定义映射名称的[翻译键][tk]，映射的默认输入，以及一个定义映射将在[控制选项菜单][controls]中放置在哪个类别中的[翻译键][tk]。

!!! 提示
    可以通过提供一个非官方的类别[翻译键][tk]将 `KeyMapping` 添加到自定义类别。自定义类别翻译键应包含模组ID（例如 `key.categories.examplemod.examplecategory`）。

### 默认输入

每个键映射都有一个与之关联的默认输入。这通过 `InputConstants$Key` 提供。每个输入都由一个定义提供输入的设备的 `InputConstants$Type` 和 输入设备上输入的关联标识符的整数组成。

游戏提供了三种输入类型：`KEYSYM`，通过提供的 `GLFW` 键标记定义键盘，`SCANCODE`，通过平台特定的扫描码定义键盘，以及 `MOUSE`，定义鼠标。

!!! 注意
    强烈推荐为键盘使用 `KEYSYM` 而不是 `SCANCODE`，因为 `GLFW` 键标记不绑定到任何特定系统。您可以在 [GLFW 文档][keyinput] 上查看更多信息。

整数取决于提供的类型。所有输入代码都在 `GLFW` 中定义： `KEYSYM` 代码以 `GLFW_KEY_*` 开头，而 `MOUSE` 代码以 `GLFW_MOUSE_*` 开头。

```java
new KeyMapping(
  "key.examplemod.example1", // 将使用此翻译键进行本地化
  InputConstants.Type.KEYSYM, // 默认映射在键盘上
  GLFW.GLFW_KEY_P, // 默认键是 P
  "key.categories.misc" // 映射将在杂项类别中
)
```

!!! 注意
    如果键映射不应映射到默认值，则输入应设置为 `InputConstants#UNKNOWN`。原始构造函数将要求您通过 `InputConstants$Key#getValue` 提取输入代码，而 Forge 构造函数可以直接接收原始输入字段。

### `IKeyConflictContext`

并非所有映射都在每种上下文中使用。某些映射仅在 GUI 中使用，而其他映射仅在游戏中使用。为了避免在不同上下文中使用的映射之间发生冲突，可以分配一个 `IKeyConflictContext`。

每个冲突上下文包含两个方法：`#isActive`，定义在当前游戏状态下映射是否可用，以及 `#conflicts`，定义该映射是否与相同或不同冲突上下文中的键发生冲突。

目前，Forge 通过 `KeyConflictContext` 定义了三种基本上下文：`UNIVERSAL`，默认情况下意味着在每种上下文中都可使用该键，`GUI`，表示映射仅在 `Screen` 打开时可以使用，以及 `IN_GAME`，表示映射仅在没有 `Screen` 打开时可以使用。可以通过实现 `IKeyConflictContext` 创建新的冲突上下文。

```java
new KeyMapping(
  "key.examplemod.example2",
  KeyConflictContext.GUI, // 映射只有在屏幕打开时才能使用
  InputConstants.Type.MOUSE, // 默认映射在鼠标上
  GLFW.GLFW_MOUSE_BUTTON_LEFT, // 默认鼠标输入是左键
  "key.categories.examplemod.examplecategory" // 映射将在新的示例类别中
)
```

### `KeyModifier`

模组开发者可能希望在按住修饰键时映射具有不同的行为（例如 `G` vs `CTRL + G`）。为此，Forge 向构造函数添加了一个额外的参数，以接收一个 `KeyModifier`，可以对任何输入应用控制（`KeyModifier#CONTROL`）、上移（`KeyModifier#SHIFT`）或 alt（`KeyModifier#ALT`）。`KeyModifier#NONE` 是默认值，不会应用修饰符。

可以通过在[控制选项菜单][controls]中按住修饰键和关联输入来添加修饰符。

```java
new KeyMapping(
  "key.examplemod.example3",
  KeyConflictContext.UNIVERSAL,
  KeyModifier.SHIFT, // 默认映射要求按住 shift
  InputConstants.Type.KEYSYM, // 默认映射在键盘上
  GLFW.GLFW_KEY_G, // 默认键是 G
  "key.categories.misc"
)
```

## 检查 `KeyMapping`

`KeyMapping` 可以被检查以确定它是否被点击。根据何时，映射可以用于条件中以应用关联逻辑。

### 在游戏中

在游戏中，可以通过监听 [**Forge 事件总线**][forgebus] 上的 `ClientTickEvent` 并检查 `KeyMapping#consumeClick` 来检查映射。`#consumeClick` 仅在输入执行且尚未处理时返回 `true`，因此不会无限制地阻塞游戏。

```java
// 事件仅在物理客户端上的 Forge 事件总线上
public void onClientTick(ClientTickEvent event) {
  if (event.phase == TickEvent.Phase.END) { // 每个 tick 事件调用两次，因此这里只在结束阶段调用代码一次
    while (EXAMPLE_MAPPING.get().consumeClick()) {
      // 在此处执行点击时的逻辑
    }
  }
}
```

!!! 警告
    不要将 `InputEvent` 作为 `ClientTickEvent` 的替代。这些事件仅提供键盘和鼠标输入，因此不会处理任何额外的输入。

### 在 GUI 中

在 GUI 中，可以在 `GuiEventListener` 的一个方法中使用 `IForgeKeyMapping#isActiveAndMatches` 检查映射。最常见的方法是检查 `#keyPressed` 和 `#mouseClicked`。

`#keyPressed` 接收 `GLFW` 的键标记，平台特定的扫描码，以及按下的修饰键的位字段。可以通过使用 `InputConstants#getKey` 创建输入来检查一个键是否匹配映射。修饰符已经在映射方法本身中检查。

```java
// 在一些 Screen 子类中
@Override
public boolean keyPressed(int key, int scancode, int mods) {
  if (EXAMPLE_MAPPING.get().isActiveAndMatches(InputConstants.getKey(key, scancode))) {
    // 在这里执行按键时的逻辑
    return true;
  }
  return super.keyPressed(x, y, button);
} 
```

!!! 注意
    如果您没有要检查其 **键** 的屏幕，可以相应地监听 [**Forge 事件总线**][forgebus] 上的 `ScreenEvent$KeyPressed` 的 `Pre` 或 `Post` 事件。

`#mouseClicked` 接收鼠标的 x 坐标、y 坐标和点击的按钮。可以通过使用 `InputConstants$Type#getOrCreate` 创建 `MOUSE` 输入来检查映射的鼠标按钮。

```java
// 在一些 Screen 子类中
@Override
public boolean mouseClicked(double x, double y, int button) {
  if (EXAMPLE_MAPPING.get().isActiveAndMatches(InputConstants.TYPE.MOUSE.getOrCreate(button))) {
    // 在这里执行鼠标点击时的逻辑
    return true;
  }
  return super.mouseClicked(x, y, button);
} 
```

!!! 注意
    如果您没有要检查其 **鼠标** 的屏幕，可以相应地监听 [**Forge 事件总线**][forgebus] 上的 `ScreenEvent$MouseButtonPressed` 的 `Pre` 或 `Post` 事件。

[modbus]: ../concepts/events.md#mod-event-bus
[controls]: https://minecraft.wiki/w/Options#Controls
[tk]: ../concepts/internationalization.md#translatablecontents
[keyinput]: https://www.glfw.org/docs/3.3/input_guide.html#input_key
[forgebus]: ../concepts/events.md#creating-an-event-handler