# state-management

各种需求场景下的状态管理方案

# 为什么过去状态管理不是问题？

## 2-tier 架构

远古时期，状态是完全由数据库管理的。数据库提供的连接是有状态的，打开页面的时候开连接，页面上的改动直接提交到当前的数据库连接。数据库连接的状态就是页面状态。

![state](./2-tier.drawio.svg)

## 3-tier 架构

后来因为互联网类型的应用的发展，数据库无法承受更多的连接。所以页面打开的时候不再开数据库连接了，仅仅在渲染和提交操作的时候才开连接拿数据。在服务端 jsp 直接渲染页面的 B/S 架构年代，状态是这样分布的

![state](./3-tier.drawio.svg)

这样的架构下，状态管理仍然是非常简单的。虽然有 database / jsp / html 三份状态，但是数据源只有 database 一个。所有的改动都需要先提交到 database，然后重服务端 jsp 重新渲染，客户端的 html 重新绘制。从数据迁移的角度来说，database => jsp 的网络带宽是非常高的，在内网情况下甚至 N+1 查询都不是太大的事情。如果查询实在太多了，手工写几个大 SQL 优化一下特定几个 jsp 页面的查询就好了。

## 4-tier 架构



