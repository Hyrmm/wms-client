
import Vue from "vue"
import Router from "vue-router"
import Home from "@/pages/home"
import Login from "@/pages/login"

import { getToken } from "@/utils/auth"

Vue.use(Router)




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
                        title: "首页"
                    }
                },
                {
                    path: "store",
                    name: "store",
                    component: () => import("@/view/Store"),
                    meta: {
                        title: "库存"
                    }
                },
                {
                    path: "storeIn",
                    name: "storeIn",
                    component: () => import("@/view/StoreIn"),
                    meta: {
                        title: "入库"
                    },
                    children: [{

                        path: "add",
                        name: "add",
                        component: () => import("@/view/StoreIn/Add"),
                        meta: {
                            title: "添加入库"
                        }
                    },
                    {

                        path: "recording",
                        name: "recording",
                        component: () => import("@/view/StoreIn/Recording"),
                        meta: {
                            title: "入库记录"
                        }
                    }
                    ]
                },
                {
                    path: "storeOut",
                    name: "storeOut",
                    component: () => import("@/view/StoreOut"),
                    meta: {
                        title: "出库"
                    },
                    children: [{
                        path: "add",
                        name: "add",
                        component: () => import("@/view/StoreOut/Add"),
                        meta: {
                            title: "添加出库"
                        }
                    },
                    {

                        path: "recording",
                        name: "recording",
                        component: () => import("@/view/StoreOut/Recording"),
                        meta: {
                            title: "出库记录"
                        }
                    }
                    ]
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
    } else {
        next()
    }


})

export default router