export default {
    namespaced: true,
    state: {
        inStoreCache: [],
        outStoreCache: [],
        addClientCache: [],
        cacheView: [],
        toolBarData: []
    },
    actions: {
    },
    mutations: {
        updata_inStoreCache(state, payload) {
            state.inStoreCache.push(payload)
        },
        del_inStoreCache(state, payload) {
            state.inStoreCache.splice(payload.index, 1)
        },
        updata_outStoreCache(state, payload) {
            state.outStoreCache.push(payload)
        },
        del_outStoreCache(state, payload) {
            state.outStoreCache.splice(payload.index, 1)
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
        //更新当前选中的tab
        updata_curView(state, payload) {
            for (let view of state.toolBarData) {
                if (view.title == payload.title) {
                    view.isSelect = true
                } else {
                    view.isSelect = false
                }
            }
        }
    },
    getters: {}
}