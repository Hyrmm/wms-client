export default {
    namespaced: true,
    state: {
        inStoreCache: [],
        outStoreCache: []
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
        }
    },
    getters: {}
}