import { getStock, getStoreOptions } from "@/api/store"
import { formatOptions } from "@/utils"
export default {
    namespaced: true,
    state: {
        stock: [],
        storeOptions: []
    },
    actions: {
        async getStock({ commit }, payload) {
            let res = await getStock(payload)
            if (res.data.status == 200) {
                commit("upDataStock", res.data)
            }
            return res
        },
        async getStoreOptions({ commit }, payload) {
            let res = await getStoreOptions(payload)
            if (res.data.status == 200) {
                commit("upDataStoreOptions", res.data.data)
            }
            return res
        }
    },
    mutations: {
        upDataStock(state, data) {
            state.stock = data
        },
        upDataStoreOptions(state, data) {
            state.storeOptions = formatOptions(data)
        }
    },
    getters: {}
}