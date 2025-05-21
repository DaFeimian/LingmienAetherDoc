---
title: 屏幕
order: 1
toc: content
group:
  title: 用户界面
  order: 9993
---
# 界面

界面通常是 Minecraft 中所有图形用户界面 (GUI) 的基础：接收用户输入，在服务器上验证输入，并将结果动作同步回客户端。它们可以与[菜单](./menus.md)结合使用，以创建类似库存视图的通信网络，或者可以是独立的，模组开发者可以通过自己的[网络](../networking/index.md)实现来处理。

界面由许多部分组成，因此很难完全理解在 Minecraft 中的“界面”究竟是什么。因此，本文件将介绍界面的各个组成部分及其应用方式，然后再讨论界面本身。

## 相对坐标

任何东西在渲染时，都需要一些标识符来指定其显示位置。借助于许多抽象，Minecraft 的大多数渲染调用都是在坐标平面上采用 x、y 和 z 值。x值从左到右增加，y从上到下增加，z从远到近增加。然而，坐标并不是固定的，它们会根据界面的大小和选项中指定的缩放比例而变化。因此，需要格外注意，确保在渲染时坐标值会根据可变的屏幕大小正确缩放。

关于如何将坐标相对化的信息将在[界面](#the-screen-subtype)部分中说明。

!!! 重要
    如果选择使用固定坐标或错误地缩放界面，渲染的对象可能看起来很奇怪或错位。检查坐标是否正确相对化的简单方法是点击视频设置中的“Gui Scale”按钮。确定 GUI 应该以何种比例渲染时，此值用作显示器宽度和高度的除数。

## GUI 图形

Minecraft 渲染的任何 GUI 通常使用 `GuiGraphics` 完成。`GuiGraphics` 是几乎所有渲染方法的第一个参数；它包含一些基本方法来渲染常用的对象。这些方法分为五类：彩色矩形、字符串、纹理、物品和工具提示。此外，还有一种用于渲染组件片段（`#enableScissor` / `#disableScissor`）的方法。`GuiGraphics` 还公开了 `PoseStack`，通过该参数应用必要的变换，以正确渲染组件应显示的位置。此外，颜色采用 [ARGB](https://en.wikipedia.org/wiki/RGBA_color_model#ARGB32) 格式。

### 彩色矩形

彩色矩形通过位置颜色着色器绘制。可以绘制三种类型的彩色矩形。

首先，有一个彩色水平和垂直的单像素宽线，分别是 `#hLine` 和 `#vLine`。`#hLine` 输入两个定义左右（包括在内）的x坐标，顶部的y坐标和颜色。`#vLine` 输入左侧的x坐标，定义顶部和底部（包括在内）的两个y坐标和颜色。

其次，`#fill` 方法用于在屏幕上绘制矩形。线方法内部调用此方法。此方法输入左侧的x坐标、顶部的y坐标、右侧的x坐标、底部的y坐标和颜色。

最后，`#fillGradient` 方法用于绘制带有垂直渐变的矩形。此方法输入右侧的x坐标、底部的y坐标、左侧的x坐标、顶部的y坐标、z坐标和底部与顶部颜色。

### 字符串

字符串通过其 `Font` 绘制，通常由其自己的着色器组成，用于正常、透视和偏移模式。可以渲染的字符串有两种对齐方式，每种均带有背影：左对齐字符串（`#drawString`）和居中对齐字符串（`#drawCenteredString`）。这两个方法都需要输入字符串渲染所用的字体、要绘制的字符串、分别表示字符串左侧或居中的x坐标、顶部的y坐标和颜色。

!!! 注意
    字符串通常应作为[`Component`](../concepts/internationalization.md#translatablecontents)传递，因为它们处理各种用例，包括该方法的另外两种重载。

### 纹理

纹理通过光栅化进行绘制，因此方法名为 `#blit`，就此目的而言，此方法复制图像的位并直接将其绘制到屏幕上。这些是通过位置纹理着色器绘制的。尽管 `#blit` 方法有很多不同的重载，这里我们将只讨论两个静态 `#blit`。

第一个静态 `#blit` 接受六个整数，并假设要渲染的纹理是在一个 256 x 256 的 PNG 文件中。它接受屏幕坐标的左x和顶部的y坐标、PNG 文件内的左x和顶部的y坐标以及要渲染的图像的宽度和高度。

!!! 注意
    必须指定 PNG 文件的大小，以便可以标准化坐标以获得相关联的 UV 值。

第一个调用的静态 `#blit` 方法将其扩展到九个整数，仅假设图像在一个 PNG 文件上。其接受屏幕坐标的左x和顶部的y坐标、z坐标（称为光栅偏移）、PNG 文件内的左x和顶部y坐标、要渲染的图像的宽度和高度以及 PNG 文件的宽度和高度。

#### 光栅偏移

渲染纹理时的 z 坐标通常设置为光栅偏移。偏移负责在查看屏幕时正确分层渲染。z坐标较小的渲染显示在背景中，反之，z坐标较大的渲染显示在前景中。z 偏移可以直接在 `PoseStack` 本身上通过 `#translate` 设置。在一些 `GuiGraphics` 方法中（例如物品渲染）内部应用了一些基本的偏移逻辑。

!!! 重要
    设置光栅偏移时，必须在渲染对象后重置它。否则，界面中的其他对象可能会显示在错误的图层中，导致图形问题。建议在翻译之前推送当前姿势，然后在所有偏移渲染完成后弹出。

## 渲染

`Renderable` 本质上是被渲染的对象。包括界面、按钮、聊天框、列表等。`Renderable` 只有一个方法：`#render`。这个方法使用 `GuiGraphics` 来渲染到屏幕、相对于屏幕比例缩放的鼠标 x 和 y 位置以及上次帧以来经过的刻 `tick delta`。

一些常见的渲染对象包括界面和“控件”：通常在屏幕上渲染的可交互元素，如 `Button`、其子类型 `ImageButton` 和用于在屏幕上输入文本的 `EditBox`。

## GuiEventListener

Minecraft 中渲染的任何界面都会实现 `GuiEventListener`。`GuiEventListener` 负责处理用户与界面的交互。这些交互包括来自鼠标（移动、点击、释放、拖动、滚动、悬停）和键盘（按下、释放、输入）的输入。每种方法返回关联操作是否成功地影响了界面。类似按钮、聊天框、列表的控件等也实现了这个接口。

### ContainerEventHandler

与 `GuiventListener` 几乎同义的是它们的子类型 `ContainerEventHandler`。这些类型负责处理包含控件的界面的用户交互，管理当前聚焦的控件以及如何应用关联的交互。`ContainerEventHandler` 增加了三个附加功能：可交互子项、拖动和聚焦。

事件处理程序持有子项，用于确定元素的交互顺序。在鼠标事件处理（不包括拖动）期间，列表中鼠标悬停在其上的第一个子元素将执行其逻辑。

通过 `#mouseClicked` 和 `#mouseReleased` 实现的鼠标拖动元素，提供了更精确的逻辑执行。

聚焦允许在事件执行期间优先检查并处理特定子项，例如在键盘事件期间或拖动画鼠标时。聚焦通常通过 `#setFocused` 设置。此外，可交互子项可以通过 `#nextFocusPath` 进行循环，选择基于传入的 `FocusNavigationEvent` 的子项。

!!! 注意
    界面通过 `AbstractContainerEventHandler`实现 `ContainerEventHandler` ，该类增加了用于子项拖动和聚焦的设置信息。

## NarratableEntry

`NarratableEntry` 是可以通过 Minecraft 无障碍旁白功能进行讲述的元素。 每个元素可以根据悬停或选择的内容提供不同的旁白，排列顺序通常是聚焦优先，然后是悬停，然后是其他所有情况。

`NarratableEntry` 有三个方法：确定元素优先级的方法（`#narrationPriority`）、确定是否讲述旁白（`#isActive`），最后是将旁白内容传递到其关联的输出（说出或阅读）（`#updateNarration`）。

!!! 注意
    Minecraft 的所有控件都是 `NarratableEntry`，因此如果使用现有子类型，通常不需要手动实现。

## 界面子类型

有了以上知识，就可以构建一个基本的界面。为了更易于理解，将按通常遇到的顺序介绍界面的组件。

首先，所有界面都接受一个 `Component`，代表界面的标题。这个 component 通常由其子类之一绘制到屏上。它在基本界面中只用于旁白消息。

```java
// 在某个 Screen 子类中
public MyScreen(Component title) {
    super(title);
}
```

### 初始化

一旦界面被初始化，`#init` 方法会被调用。`#init` 方法设置界面内的初始设置，从 `ItemRenderer` 和 `Minecraft` 实例到游戏所缩放的相对宽度和高度。任何设置，例如添加控制件或预计算相对坐标，都应该在此方法中完成。如果游戏窗口改变大小，界面会通过调用 `#init` 方法重新初始化。

有三种方式在界面中添加控件，每种都有不同的用途：

方法                  | 描述
:---:                 | :---
`#addWidget`          | 添加可交互和可旁白的控件，但不渲染。
`#addRenderableOnly`  | 添加只会被渲染的控件；不会交互或旁白。
`#addRenderableWidget`| 添加可交互、可旁白和渲染的控件。

`#addRenderableWidget` 通常是最常用的。

```java
// 在某个 Screen 子类中
@Override
protected void init() {
    super.init();

    // 添加控件和预计算值
    this.addRenderableWidget(new EditBox(/* ... */));
}
```

### 界面计刻（Ticking Screens）

界面也通过 `#tick` 方法来执行一些客户端的渲染逻辑。最常见的例子是 `EditBox` 的闪烁光标。

```java
// 在某个 Screen 子类中
@Override
public void tick() {
    super.tick();

    // 为 editBox 添加计刻逻辑
    this.editBox.tick();
}
```

### 输入处理

由于界面是 `GuiEventListener` 的子类型，因此输入处理程序也可以被覆写，例如处理特定[key 按压](../misc/keymappings.md#inside-a-gui)时的逻辑。

### 渲染界面

最终，界面通过作为 `Renderable` 子类型提供的 `#render` 方法进行渲染。正如前面提到的，`#render` 方法每帧渲染界面需要显示的所有内容，例如背景、控件、工具提示等。默认情况下，`#render` 方法仅将控件渲染到屏幕上。

在界面中，通常不由子类型处理的两种最常见的渲染是背景和工具提示。

使用 `#renderBackground` 渲染背景，其中一种方法在无法渲染关卡时，以偏移的 v 参数来渲染选项背景。

工具提示通过 `GuiGraphics#renderTooltip` 或 `GuiGraphics#renderComponentTooltip` 渲染，可以接收要渲染的文本组件、可选的自定义工具提示组件以及在屏幕上渲染工具提示的 x / y 相对坐标。

```java
// 在某个 Screen 子类中

// mouseX 和 mouseY 表示鼠标在屏幕上的缩放坐标
@Override
public void render(GuiGraphics graphics, int mouseX, int mouseY, float partialTick) {
    // 背景通常首先渲染
    this.renderBackground(graphics);

    // 在控件前渲染其他元素（背景纹理）

    // 如果是界面的直接子级，则渲染控件
    super.render(graphics, mouseX, mouseY, partialTick);

    // 在控件后渲染其他元素（工具提示）
}
```

### 关闭界面

关闭界面时，有两个方法处理回收：`#onClose` 和 `#removed`。

`#onClose` 在用户输入关闭当前界面时被调用。通常用于回调以销毁和保存界面本身的任何内部进程。这包括向服务器发送包。

`#removed` 在界面更改并释放到垃圾回收器之前被调用。这处理任何在界面打开之前未重置回初始状态的内容。

```java
// 在某个 Screen 子类中

@Override
public void onClose() {
    // 在此停止任何处理程序

    // 防止覆盖发生干扰时最后调用
    super.onClose();
}

@Override
public void removed() {
    // 在此重置初始状态

    // 防止覆盖发生干扰时最后调用
    super.removed()
;}
```

## `AbstractContainerScreen`

如果某个界面直接附加到[菜单](./menus.md)，则应该继承 `AbstractContainerScreen`。`AbstractContainerScreen` 作为菜单的渲染器和输入处理程序，并包含用于同步和与插槽交互的逻辑。因此，只需覆写或实现两个方法即可拥有一个正常工作的容器界面。为了更易于理解，将按通常遇到的顺序介绍容器界面的组件。

一个 `AbstractContainerScreen` 通常需要三个参数：打开的容器菜单（由泛型 `T` 表示）、玩家库存（仅用于显示名称）和界面本身的标题。在此处，可以设置许多位置字段：

字段            | 描述
:---:           | :---
`imageWidth`    | 用于背景的纹理宽度。通常在 256 x 256 的 PNG 文件中，默认为 176。
`imageHeight`   | 用于背景的纹理高度。通常在 256 x 256 的 PNG 文件中，默认为 166。
`titleLabelX`   | 界面标题的相对 x 坐标，将在该坐标处渲染。
`titleLabelY`   | 界面标题的相对 y 坐标，将在该坐标处渲染。
`inventoryLabelX`| 玩家库存名称的相对 x 坐标，将在该坐标处渲染。
`inventoryLabelY`| 玩家库存名称的相对 y 坐标，将在该坐标处渲染。

!!! 重要
    在前面的部分中提到，预计算相对坐标应在 `#init` 方法中设置。这依然适用，因为此处提到的值不是预计算的坐标，而是静态值和相对化坐标。

    显示的图像值是静态且不变的，因为它们代表背景纹理的大小。为了在渲染时更容易处理，`#init` 方法中预先计算了两个附加值(`leftPos` 和 `topPos`) ，标记表示背景将被渲染的左上角。标签坐标相对于这些值。

    `leftPos` 和 `topPos` 还可以方便地用来渲染背景，因为它们已经代表传入 `#blit` 方法的确切位置。

```java
// 在某个 AbstractContainerScreen 子类中
public MyContainerScreen(MyMenu menu, Inventory playerInventory, Component title) {
    super(menu, playerInventory, title);

    this.titleLabelX = 10;
    this.inventoryLabelX = 10;

    /*
     * 如果修改了 `imageHeight`，必须同时修改 `inventoryLabelY` 因为该值依赖于 `imageHeight` 的值。
     */
}
```

### 菜单访问

由于菜单传递给了界面，现在可以通过 `menu` 字段访问菜单中的任何已同步值（无论通过插槽、数据插槽或自定义系统）。

### 容器计刻

当玩家活着并查看界面时，容器屏幕会通过 `#containerTick` 在 `#tick` 方法中计刻。这实际上取代了容器屏幕中的 `#tick`，其最常见的用法是为配方书计刻。

```java
// 在某个 AbstractContainerScreen 子类中
@Override
protected void containerTick() {
    super.containerTick();

    // 在此进行计时操作
}
```

### 渲染容器屏幕

容器屏幕通过三种方法来渲染：渲染背景纹理的 `#renderBg`、渲染背景上方的任意文本的 `#renderLabels` 和 `#render`， 后者在提供灰暗背景和工具提示之外包含前两者。

从 `#render` 开始，最常见的覆写（通常是唯一的例子）是添加背景、调用 super 渲染容器屏幕，最后在顶部渲染工具提示。

```java
// 在某个 AbstractContainerScreen 子类中
@Override
public void render(GuiGraphics graphics, int mouseX, int mouseY, float partialTick) {
    this.renderBackground(graphics);
    super.render(graphics, mouseX, mouseY, partialTick);

    /*
     * 容器屏幕添加的方法以渲染悬停插槽的工具提示。
     */
    this.renderTooltip(graphics, mouseX, mouseY);
}
```

在 super 内部，调用 `#renderBg` 来渲染屏幕的背景。最标准的表示方法使用三个方法调用：两个用于设置，一个用于绘制背景纹理。

```java
// 在某个 AbstractContainerScreen 子类中

// 背景纹理的位置（assets/<命名空间>/<路径>）
private static final ResourceLocation BACKGROUND_LOCATION = new ResourceLocation(MOD_ID, "textures/gui/container/my_container_screen.png");

@Override
protected void renderBg(GuiGraphics graphics, float partialTick, int mouseX, int mouseY) {
    /*
     * 将背景纹理渲染到屏幕。'leftPos' 和 'topPos' 应该已经代表了纹理应被渲染的左上角，因为它们是从 'imageWidth' 和 'imageHeight' 预先计算出来的。两个零表示 256 x 256 PNG 文件内的整数 u/v 坐标。
     */
    graphics.blit(BACKGROUND_LOCATION, this.leftPos, this.topPos, 0, 0, this.imageWidth, this.imageHeight);
}
```

最后，调用 `#renderLabels` 将任何文本渲染于背景之上，但在工具提示之下。这只是使用字体来绘制关联的组件。

```java
// 在某个 AbstractContainerScreen 子类中
@Override
protected void renderLabels(GuiGraphics graphics, int mouseX, int mouseY) {
    super.renderLabels(graphics, mouseX, mouseY);

    // 假设我们有一些 Component 'label'
    // 'label' 绘制在 'labelX' 和 'labelY' 处
    graphics.drawString(this.font, this.label, this.labelX, this.labelY, 0x404040);
}
```

!!! 注意
    渲染标签时，你**不**需要指定 `leftPos` 和 `topPos` 偏移。它们已经通过 `PoseStack` 被翻译，因此此方法中的所有内容相对于这些坐标绘制。

## 注册 AbstractContainerScreen

要将 `AbstractContainerScreen` 与菜单一起使用，需要注册。可以通过在 [**mod 事件总线**](../concepts/events.md#mod-event-bus)上的`FMLClientSetupEvent` 中调用 `MenuScreens#register` 来实现。

```java
// 在 mod 事件总线上监听事件
private void clientSetup(FMLClientSetupEvent event) {
    event.enqueueWork(
        // 假定为 RegistryObject<MenuType<MyMenu>> MY_MENU
        // 假定 MyContainerScreen<MyMenu> 接受三个参数
        () -> MenuScreens.register(MY_MENU.get(), MyContainerScreen::new)
    );
}
```

!!! 警告
    `MenuScreens#register` 不是线程安全的，所以需要在通过并行调度事件提供的 `#enqueueWork` 内调用。