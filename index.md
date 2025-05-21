---
title: Lingmien Aether
hero:
  title: Lingmien Aether<br><b>-动态化-</b>
  description: 游戏进入速度提升25%<br>网易我的世界中国版高效开发引擎<br>3888元/半年、6480元/年以加入付费计划<br>里程碑：14天生产11个模组
  showCustomContent: false
  actions:
    - text: 项目介绍
      link: /docs/about
    - text: 购买服务
      link: https://ti.qq.com/open_qq/index2.html?url=mqqapi%3a%2f%2fuserprofile%2ffriend_profile_card%3fsrc_type%3dweb%26version%3d1.0%26source%3d2%26uin%3d764416606
      openExternal: true
features:
  - title: 加入计划享有以下服务
    image: 🛠
    description: <li>灵免以太接口、配置组件、副包开发</li><li>内置开发调试工具</li><li>自动化开发程序</li><li>大肥免组件AI</li><li>GitLab项目仓库管理</li><li>开发DEMO、UI素材、指南</li><li>网易灵犀办公售后群</li><li>实体灵免以太文档书籍</li>
    imageType: primary
    link: /docs/info
    row: 9

  - title: DFM3.1架构
    image: 🚀
    description: 基于<b>ModSDK</b>、<b>DFM3.1</b>底层架构编写的<b>灵免以太</b>，结合<b>自动化程序</b>，开发我的世界组件效率提高<b>500%+</b><br>自带接口补全库，轻松使用接口！<br>配置组件，轻松实现强大功能！
    imageType: primary
    link: /docs/info
    row: 9

  - title: OpenAI助力
    image: 💻
    description: (待编写展示内容)首款搭载OpenAI的开发引擎!完善的接口文档、超多精选灵免以太案例训练的<b>AI大模型</b>，实现不懂就问，根据需求直转代码！
    imageType: primary
    link: /docs
    openExternal: false
    row: 8

  - title: 联机大厅内购
    image: 🛍
    description: 联机大厅内购一直不会写？MC Studio内容库教程难懂？<br>使用灵免以太去繁化简，<b>一行代码</b>搞定货币充值！更有超多<b>功能接口</b>助力开发！
    imageType: primary
    link: /docs/lobby
    row: 8

  - title: 安全密钥使用
    image: 🔐
    description: 网易软件密码、自动化程序密码、接口系统密钥、代码仓库账号<b>三合一</b>！
    imageType: primary
    link: /updates/110
    row: 8

  - title: 精编开发指南
    image: 📚
    description: 开发历程精选精编指南，<b>小白到大神</b>只差一个灵免以太！
    imageType: primary
    link: /guides/guide-1
    row: 8

  - title: 专用开发素材
    image: 🗂
    description: 代码解决，素材难办？新人开发者最容易遇到的难题！直接解决！<br>海量UI素材、特效素材、Demo案例<b>直接用直接学</b>！
    imageType: primary
    link: /files
    row: 7

  - title: 自定义玩家渲染
    image: 📗
    description: <b>5分钟</b>实现YSM功能自定义玩家渲染
    imageType: primary
    link: /docs/component-customplayerrender
    row: 6

  - title: 变身技能角色
    image: 📘
    description: <b>5小时</b>实现玩家变身可释放技能的战斗角色+养成系统
    imageType: primary
    link: /docs/dlc-mianshen
    row: 6

  - title: 多连招Boss
    image: 📙
    description: <b>2小时</b>实现随机释放多种连招的Boss实体
    imageType: primary
    link: /docs/dlc_heixiyou_boss
    row: 6
---


<!-- ||免费计划|付费计划|
|:-:|:-:|:-:|
|计划收费|免费|6480元/年|
|前置组件免费(更便于销售)|❌|✔|
|需要密钥|❌|✔|
|使用接口|✔|✔|
|配置组件|✔|✔|
|持续更新|✔|✔| -->

# 灵免以太文件结构<Badge type="success">265 KB</Badge><Badge type="success">6589 Lines</Badge>

<Tree>
  <ul>
    <li>
      DaFeimianLingmienAetherScripts
      <ul>
      <li>Config<ul>
      <li>__init__.py</li>
      <li>gun_conf.py</li>
      <li>la_conf.py</li>
      </ul></li>
      <li>DaFeimianCommon<ul>
        <li>__init__.py</li>
        <li>config.py</li>
      </ul></li>
      <li>dfmGun<ul>
      <li>__init__.py</li>
      <li>GunConf.py</li>
      </ul></li>
      <li>ModClient<ul>
        <li>BaseApi<ul>
          <li>__init__.py</li>
          <li>DataBase.py</li>
          <li>NewLootItem.py</li>
          <li>Ping.py</li>
          <li>QueryInit.py</li>
        </ul></li>
        <li>CameraApi<ul>
          <li>__init__.py</li>
          <li>CameraMotion.py</li>
        </ul></li>
        <li>cyzs3<ul>
          <li>__init__.py</li>
          <li>Cyzs3Lib.py</li>
          <li>Manifest.py</li>
          <li>PostProcess.py</li>
          <li>Render.py</li>
          <li>Sfx.py</li>
          <li>UI.py</li>
          <li>Utils.py</li>
          <li>VarApi.py</li>
          <li>Wish.py</li>
        </ul></li>
        <li>FrictionApi<ul>
          <li>__init__.py</li>
          <li>Friction.py</li>
        </ul></li>
        <li>MotionApi<ul>
          <li>__init__.py</li>
          <li>MotionSpeed.py</li>
        </ul></li>
        <li>RenderApi<ul>
          <li>__init__.py</li>
          <li>GlobalRender.py</li>
          <li>KuLou.py</li>
          <li>LeiDianShiZhe.py</li>
          <li>RenderToEveryBody.py</li>
          <li>XiaoChun.py</li>
        </ul></li>
        <li>SfxApi<ul>
          <li>__init__.py</li>
          <li>MoveSfx.py</li>
        </ul></li>
        <li>UiInit<ul>
          <li>__init__.py</li>
          <li>AllUiInit.py</li>
        </ul></li>
        <li>uiScript<ul>
          <li>__init__.py</li>
          <li>LA_start.py</li>
          <li>UiEventApi.py</li>
          <li>VarApi.py</li>
        </ul></li>
        <li>__init__.py</li>
        <li>ClientEventList</li>
        <li>ClientLingmienAether.py</li>
        <li>cyzs2.py</li>
        <li>cyzs2conf.py</li>
        <li>EventApi.py</li>
        <li>GlobalClientSystem.py</li>
        <li>Manifest.py</li>
        <li>RoleConf.py</li>
        <li>Utils.py</li>
        <li>VarApi.py</li>
      </ul></li>
      <li>ModServer<ul>
        <li>BaseApi<ul>
          <li>__init__.py</li>
          <li>DataBase.py</li>
          <li>PlayerAttrUiUpdate.py</li>
          <li>PlayerData.py</li>
          <li>PlayerGetLootItem.py</li>
          <li>Var.py</li>
        </ul></li>
        <li>ChatApi<ul>
          <li>__init__.py</li>
          <li>AntiCheating.py</li>
          <li>NotifyMsg.py</li>
          <li>TestCommand.py</li>
        </ul></li>
        <li>PlayerDataApi<ul>
          <li>__init__.py</li>
        </ul></li>
        <li>RenderApi<ul>
          <li>__init__.py</li>
          <li>Behavior.py</li>
          <li>RenderBeh.py</li>
          <li>RenderLevelUp.py</li>
        </ul></li>
        <li>WishApi<ul>
          <li>__init__.py</li>
          <li>wish.py</li>
        </ul></li>
        <li>__init__.py</li>
        <li>EventApi.py</li>
        <li>GlobalServerSystem.py</li>
        <li>Manifest.py</li>
        <li>ServerEventList</li>
        <li>ServerLingmienAether.py</li>
        <li>Utils.py</li>
        <li>VarApi.py</li>
      </ul></li>
      <li>__init__.py</li>
      <li>modMain.py</li>
      </ul>
    </li>
  </ul>