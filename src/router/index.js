
import Vue from "vue"
import Router from "vue-router"

import Home from "@/pages/home"
Vue.use(Router)




export default new Router({
    routes: [
        {
            path: "*",
            redirect: "/home",
            meta: {
                show: true
            }
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
                    }
                },
                {
                    path: "storeOut",
                    name: "storeOut",
                    component: () => import("@/view/StoreOut"),
                    meta: {
                        title: "出库"
                    }
                },
                {
                    path: "setting",
                    name: "setting",
                    component: () => import("@/view/Setting"),
                    meta: {
                        title: "设置"
                    }
                }

            ]
        },
    ]
})