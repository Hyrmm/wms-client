
import Vue from "vue"
import Router from "vue-router"
import Home from "@/pages/home"
import Login from "@/pages/login"
import app from "@/main"

import { getToken } from "@/utils/auth"






// const router = new Router({
//     routes: [
//         {
//             path: "*",
//             redirect: "/home",
//         },
//         {
//             path: "/login",
//             name: 'login',
//             component: Login,
//         },
//         {
//             path: "/home",
//             name: "home",
//             redirect: "/home/index",
//             component: Home,
//             children: [
//                 {
//                     path: "index",
//                     name: "index",
//                     component: () => import("@/view/index"),
//                     meta: {
//                         title: "首页"
//                     }
//                 },
//                 {
//                     path: "store",
//                     name: "store",
//                     component: () => import("@/view/Store"),
//                     meta: {
//                         title: "库存",
//                         isCache: true,
//                         name: "store"
//                     }
//                 },
//                 {
//                     path: "storeIn",
//                     name: "storeIn",
//                     component: () => import("@/view/StoreIn"),
//                     meta: {
//                         title: "入库",
//                         isCache: true,
//                         name: "storeIn"
//                     },
//                     children: [{
//                         path: "add",
//                         name: "addStoreIn",
//                         component: () => import("@/view/StoreIn/Add"),
//                         meta: {
//                             title: "添加入库", isCache: true, name: "addStore"
//                         }
//                     },
//                     {

//                         path: "recording",
//                         name: "recordingStoreIn",
//                         component: () => import("@/view/StoreIn/Recording"),
//                         meta: {
//                             title: "入库记录", isCache: true, name: "recordingStore"
//                         }
//                     }
//                     ]
//                 },
//                 {
//                     path: "storeOut",
//                     name: "storeOut",
//                     component: () => import("@/view/StoreOut"),
//                     meta: {
//                         title: "入库",
//                         isCache: true,
//                         name: "storeOut"
//                     },
//                     children: [{
//                         path: "add",
//                         name: "addStoreOut",
//                         component: () => import("@/view/StoreOut/Add"),
//                         meta: {
//                             title: "添加出库", isCache: true, name: 'addStoreOut'
//                         }
//                     },
//                     {
//                         path: "recording",
//                         name: "recordingStoreOut",
//                         component: () => import("@/view/StoreOut/Recording"),
//                         meta: {
//                             title: "出库记录", isCache: true, name: 'recordingStoreOut'
//                         }
//                     },
//                     {
//                         path: "modify",
//                         name: "modifyStoreOut",
//                         component: () => import("@/view/StoreOut/Modify"),
//                         meta: {
//                             title: "订单状态", isCache: true, name: 'modifyStoreOut'
//                         }
//                     },
//                     ]
//                 },
//                 {
//                     path: "client",
//                     name: "client",
//                     component: () => import("@/view/Client"),
//                     meta: {
//                         title: "客户", isCache: true, name: 'client'
//                     },
//                     children: [
//                         {
//                             path: "add",
//                             name: "addClient",
//                             component: () => import("@/view/Client/Add"),
//                             meta: {
//                                 title: "新增客户", isCache: true, name: 'addClient'
//                             },
//                         },
//                         {
//                             path: "modify",
//                             name: "modifyClient",
//                             component: () => import("@/view/Client/Modify"),
//                             meta: {
//                                 title: "修改客户", isCache: true, name: 'modifyClient'
//                             },
//                         }
//                     ]
//                 },
//                 {
//                     path: "setting",
//                     name: "setting",
//                     component: () => import("@/view/Setting"),
//                     meta: {
//                         title: "设置"
//                     }
//                 }

//             ],
//         },
//         {
//             path: "/agentFail",
//             name: "agentFail",
//             component: () => import("@/components/AgentFail"),

//         }
//     ]
// })
const router = new Router({
    routes: [
        {
            path: "*",
            redirect: "/home",
        },
        {
            path: "/login",
            name: 'login',
            component: Login,
        },
        {
            path: "/home",
            name: "home",
            redirect: "/home/index",
            component: Home,
            children: [
                {
                    path: "index",
                    name: "index",
                    component: () => import("@/view/index"),
                    meta: {
                        title: "首页", isCache: true, name: "index"
                    }
                },
                {
                    path: "store",
                    name: "store",
                    component: () => import("@/view/Store"),
                    meta: {
                        title: "库存",
                        isCache: true,
                        name: "store"
                    }
                },
                {
                    path: "storeIn/add",
                    name: "addStoreIn",
                    component: () => import("@/view/StoreIn/Add"),
                    meta: {
                        title: "添加入库", isCache: true, name: "addStore"
                    }
                },
                {

                    path: "storeIn/recording",
                    name: "recordingStoreIn",
                    component: () => import("@/view/StoreIn/Recording"),
                    meta: {
                        title: "入库记录", isCache: true, name: "recordingStore"
                    }
                },
                {
                    path: "storeOut/add",
                    name: "addStoreOut",
                    component: () => import("@/view/StoreOut/Add"),
                    meta: {
                        title: "添加出库", isCache: true, name: 'addStoreOut'
                    }
                },
                {
                    path: "storeOut/recording",
                    name: "recordingStoreOut",
                    component: () => import("@/view/StoreOut/Recording"),
                    meta: {
                        title: "出库记录", isCache: true, name: 'recordingStoreOut'
                    }
                },
                {
                    path: "storeOut/modify",
                    name: "modifyStoreOut",
                    component: () => import("@/view/StoreOut/Modify"),
                    meta: {
                        title: "订单状态", isCache: true, name: 'modifyStoreOut'
                    }
                },
                {
                    path: "client/add",
                    name: "addClient",
                    component: () => import("@/view/Client/Add"),
                    meta: {
                        title: "新增客户", isCache: true, name: 'addClient'
                    },
                },
                {
                    path: "client/modify",
                    name: "modifyClient",
                    component: () => import("@/view/Client/Modify"),
                    meta: {
                        title: "修改客户", isCache: true, name: 'modifyClient'
                    },
                },
                {
                    path: "setting",
                    name: "setting",
                    component: () => import("@/view/Setting"),
                    meta: {
                        title: "设置"
                    }
                }

            ],
        },
        {
            path: "/agentFail",
            name: "agentFail",
            component: () => import("@/components/AgentFail"),

        }
    ]
})

router.beforeEach((to, from, next) => {


    //token验证
    if (to.matched[0].path != "/login") {
        let token = getToken()
        if (token) {
            next()
        } else {
            next({ name: "login" })
        }
    }
    //tab缓存
    if (to.meta.isCache) {
        try {
            //首先判断是否是二级路由,存在一级路由直接跳转到其他一级路由的二级路由，无法监听到这个以及路由的变化
            if (to.matched.length == 3) {
                //这是一个二级路由,首先对他的一级路由进行判断缓存
                if (!app.$store.state.cache.cacheView.includes(to.matched[1].meta.name)) {
                    app.$store.commit("cache/updata_cacheView", { componentName: to.matched[1].meta.name, title: to.matched[1].meta.title, routeName: to.matched[1].name, isSelect: false, tabHidden: true })
                }
            }

            //是否已经缓存 
            try {
                if (!app.$store.state.cache.cacheView.includes(to.meta.name)) {
                    app.$store.commit("cache/updata_cacheView", { componentName: to.meta.name, title: to.meta.title, routeName: to.name, isSelect: false })
                }
                //更新当前选中的tab
                app.$store.commit("cache/updata_curView", { title: to.meta.title })
            } catch {
            }
        } catch { }
    }
    next()
})


// 解决报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push(location, onResolve, onReject) {
    return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}
Vue.use(Router)
export default router