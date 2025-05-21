---
title: 联机大厅后台控制中心
order: 0
toc: content
group:
  title: 自动化开发
  order: 3
---
# 联机大厅后台控制中心
超级管理员可以在游戏内对玩家的云端数据进行实时后台控制调整

![](http://1.94.129.175/uploads/LingmienAether/img/auto-0.png)

## 选择联机大厅脚本生成

![](http://1.94.129.175/uploads/LingmienAether/img/auto-1.png)

## 选择控制中心并创建

![](http://1.94.129.175/uploads/LingmienAether/img/auto-2.png)

## 配置超级管理员和初始云端数据
打开联机大厅后台控制中心配置文件LobbyConfig.py文件并编辑设置信息

<Tree>
  <ul>
<li>
DaFeiMianLobbyControlScripts<small>联机大厅后台控制中心脚本文件夹</small>
    <ul>
    <li>DaFeiMianCommon<ul>
        <li>...</li>
    </ul></li>
    <li>ModClient<ul> <li>...</li></ul></li>
    <li>ModsServer<ul>
        <li>ChatApi<ul>
            <li>...</li>
        </ul></li>
         <li>__init__.py</li>
         <li>GlobalServerSystem.py</li>
         <li>LobbyConfig.py<small>联机大厅后台控制中心配置文件</small></li>
         <li>ServerEventList.py</li>
    </ul></li>
    <li>__init__.py</li>
    <li>modMain.py<ul></ul></li>
    </ul>
</li>
</ul>
</Tree>

```python
OPUidList = [2147535861, 4294967295]  # 拥有后台权限的玩家uid
LobbyStorageKeyList = ['OnlinePlayerStorage']  # 联机大厅uid为0的KeyList，用于初始化服务器配置
# 还要写个重置功能！！！不然测试服的时候好难搞！！！
LobbyStorageDict = {
    # 第一级Key对应 LobbyStorageKeyList
    'OnlinePlayerStorage': {
        '测试': {
            'PlayerName': '只因你太肥',
            'FeiCoin': 6800,
            'MianCoin': 64800,
            'Score': 2617,
            'Money': 128000,
            'Ban': False,
            'BanInfo': ''
        }
    }
}
```