

<p align="center">
    <a href="https://github.com/Hyrmm/wms-client" target="_blank" style="margin-right: 20px; font-style: normal; text-decoration: none;">
        <img src="https://img.shields.io/github/stars/Hyrmm/wms-client" alt="Github Stars" />
    </a>
    <a href="https://github.com/Hyrmm/wms-client" target="_blank" style="margin-right: 20px; font-style: normal; text-decoration: none;">
        <img src="https://img.shields.io/github/forks/Hyrmm/wms-client" alt="Github Forks" />
    </a>
    <a href="https://github.com/Hyrmm/wms-client" target="_blank" style="margin-right: 20px; font-style: normal; text-decoration: none;">
        <img src="https://img.shields.io/github/languages/code-size/Hyrmm/wms-client" alt="Code-size" />
    </a>
<p />

## :triangular_flag_on_post:前言

此项目出发点用于朋友实际库存管理的需求定制的，对于我本人，同时也是作为`Vue2`的首个练手项目，更好实践前端开发的工程化。

也是因为此项目基于真实需求定制的，所以此项目也对应着一个后端项目（下面会放项目传送门），也是我个人完成的，后端项目基于`Node`的`Express`框架搭建，数据库使用的`Mysql`。对于只学习此前端项目的伙伴，项目默认采用的是远程后端服务器，接口文档传送门放在了下面(基于ApiFox的在线文档)。对于想使用本地后端服务的伙伴，可以参考后端项目。

此项目主要使用`Vue`、`Vuex`、`Vue-router`全家桶，UI使用的`Element-Ui`，构建工具使用的是`Vue-cli`。

> 此项目会长期维护，如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍。

## :door:传送门

- 项目在线演示地址::link:[使劲点我](http://43.138.122.88:5000/) (默认账号密码root,root)

- 项目提供远程接口文档地址::link:[使劲点我](https://www.apifox.cn/apidoc/shared-cc2e15b2-0ea5-4e16-91e9-6b113015a758/api-51164289)
- 配套的后端项目地址: :link:[使劲点我](https://github.com/Hyrmm/wms-server)

## :triangular_ruler:技术栈

| 技术       | 说明                      | 版本                                                         | 官网                                                        |
| ---------- | ------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| Vue        | 渐进式 JavaScript 框架    | <img src="https://img.shields.io/github/package-json/dependency-version/Hyrmm/wms-client/vue" /> | :link:https://vuejs.org/                                    |
| Vue-router | 路由管理                  | <img src="https://img.shields.io/github/package-json/dependency-version/Hyrmm/wms-client/vue-router" /> | :link:https://router.vuejs.org/                             |
| Vuex       | 全局状态管理              | <img src="https://img.shields.io/github/package-json/dependency-version/Hyrmm/wms-client/vuex" /> | :link:https://vuex.vuejs.org/                               |
| Element-Ui | UI框架                    | <img src="https://img.shields.io/github/package-json/dependency-version/Hyrmm/wms-client/element-ui" /> | :link:[https://element.eleme.io](https://element.eleme.io/) |
| Axios      | 基于 promise 的网络请求库 | <img src="https://img.shields.io/github/package-json/dependency-version/Hyrmm/wms-client/axios" /> | :link:https://www.axios-http.cn/                            |
| ECharts    | 可视化图表库              | <img src="https://img.shields.io/github/package-json/dependency-version/Hyrmm/wms-client/echarts" /> | :link:https://echarts.apache.org/                           |
| Less       | 向后兼容的 CSS 扩展语言   | <img src="https://img.shields.io/github/package-json/dependency-version/Hyrmm/wms-client/less-loader" /> | :link:https://less.bootcss.com/                             |

> 开发环境:Windows、Node(v16.18.0)、Npm(v8.19.2)

## :wrench:功能介绍

> **技术功能**

- :white_check_mark:路由懒加载
- :white_check_mark:权限控制(Token)
- :white_check_mark:数据可视化展示
- :white_check_mark:基于Axios请求、响应拦截控制、统一管理请求
- :white_check_mark:基于Vuex统一管理可复用、复杂的的状态数据
- :white_check_mark:包屑、组件缓存、全局记录缓存
- :x:依赖用户权限动态生成路由、导航栏
- :x:响应式布局
- 未完待续..

> **业务功能**

- 数据可视化
  - :white_check_mark:基本信息概述
  - :white_check_mark:库存类别分析
  - :white_check_mark:销售额、成本、利润统计
  - :white_check_mark:完成订单统计

- 入库
  - :white_check_mark:添加入库
  - :white_check_mark:入库记录条件查询

- 出库
  - :white_check_mark:添加出库
  - :white_check_mark:出库记录条件查询
  - :white_check_mark:变更出库状态

- 客户管理
  - :white_check_mark:添加客户
  - :white_check_mark:编辑客户
- 用户管理
  - :x:权限控制
  - :x:信息修改

## :rocket:运行项目

:one:拉取项目文件

git clone https://github.com/Hyrmm/wms-client

:two:切换到项目目录

cd wms-client

:three:安装依赖包

npm install

:four:运行项目

- **使用远程在线后端服务接口**

  npm run serve 

- **使用本地后端服务接口,需要配合后端项目[传送门]()**

  npm run local

## :clapper:商家秀

![](https://grab-1301500159.cos.ap-shanghai.myqcloud.com/markDown/20221231190455.png)

![](https://grab-1301500159.cos.ap-shanghai.myqcloud.com/markDown/20221231190521.png)

![](https://grab-1301500159.cos.ap-shanghai.myqcloud.com/markDown/20221231190547.png)

![](https://grab-1301500159.cos.ap-shanghai.myqcloud.com/markDown/20221231190621.png)

![](https://grab-1301500159.cos.ap-shanghai.myqcloud.com/markDown/20221231190651.png)

![](https://grab-1301500159.cos.ap-shanghai.myqcloud.com/markDown/20221231190721.png)

## 项目结构

```
├── src
│   ├── App.vue
│   ├── api
│   ├── assets
│   ├── components
│   │   ├── AgentFail
│   │   ├── Breadcrumb
│   │   ├── PagiNation
│   │   ├── TableFilter
│   │   └── ViewFilter
│   ├── main.js
│   ├── mixin
│   ├── pages
│   │   ├── home
│   │   └── login
│   ├── router
│   ├── store
│   ├── utils
│   └── view
│       ├── Client
│       │   ├── Add
│       │   ├── Modify
│       │   └── index.vue
│       ├── Setting
│       ├── Store
│       ├── StoreIn
│       │   ├── Add
│       │   ├── Recording
│       │   └── index.vue
│       ├── StoreOut
│       │   ├── Add
│       │   ├── Modify
│       │   ├── Recording
│       │   └── index.vue
│       └── index
│       │   ├── Order.vue
│       │   ├── Recording
│       │   └── index.vue
│       ├── StoreOut
│       │   ├── Add
│       │   ├── Modify
│       │   ├── Recording
│       │   └── index.vue
│       └── index
│           ├── Order.vue
│           ├── Sales.vue
│           ├── Store.vue
│           └── index.vue
├── jsconfig.json
├── package-lock.json
├── package.json
```

