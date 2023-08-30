export default {
    namespaced: true,
    state: {
        productInStoreCache: [],
        materialInStoreCache: [],

        productOutStoreCache: [],
        materialOutStoreCache: [],

        addClientCache: [],
        cacheView: [],
        toolBarData: []
    },
    actions: {
    },
    mutations: {
        updata_inStoreCache(state, payload) {
            switch (payload.stockType) {
                case 1: {
                    state.materialInStoreCache.push(payload)
                    break
                }
                case 2: {
                    state.productInStoreCache.push(payload)
                    break
                }
            }
        },
        del_inStoreCache(state, payload) {

            switch (payload.stockType) {
                case 1: {
                    state.materialInStoreCache.splice(payload.index, 1)
                    break
                }
                case 2: {
                    state.productInStoreCache.splice(payload.index, 1)
                    break
                }
            }
        },
        updata_outStoreCache(state, payload) {
            switch (payload.stockType) {
                case 1: {
                    state.materialOutStoreCache.push(payload)
                    break
                }
                case 2: {
                    state.productOutStoreCache.push(payload)
                    break
                }
            }
        },
        del_outStoreCache(state, payload) {
            switch (payload.stockType) {
                case 1: {
                    state.materialOutStoreCache.splice(payload.index, 1)
                    break
                }
                case 2: {
                    state.productOutStoreCache.splice(payload.index, 1)
                    break
                }
            }
        },


        updata_addClientCache(state, payload) {
            state.addClientCache.push(payload)
        },
        del_addClientCache(state, payload) {
            state.addClientCache.splice(payload.index, 1)
        },
        //插入缓存组件
        updata_cacheView(state, payload) {
            state.cacheView.push(payload.componentName)
            if (!payload.tabHidden) {
                state.toolBarData.push(payload)
            }

        },
        // 清除tab缓存
        del_cacheView(state, payload) {
            // 1.从缓存数组拿掉
            state.toolBarData.splice(payload.index, 1)
            state.cacheView.splice(payload.index, 1)
        },
        //更新当前选中的tab
        updata_curView(state, payload) {
            for (let view of state.toolBarData) {
                if (view.title == payload.title) {
                    view.isSelect = true
                } else {
                    view.isSelect = false
                }
            }
        },


    },
    getters: {}
}