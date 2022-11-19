import { getStock } from "@/api/store"
export default {
    namespaced: true,
    state: {
        stock: {}
    },
    actions: {
        async getStock({ commit }, payload) {
            let res = await getStock(payload)
            if (res.data.status == 200) {
                //储存用户数据
                commit("upDataStock", res.data.data)
            }
            return res
        }
    },
    mutations: {
        upDataStock(data) {
            this.stock = data
        }
    },
    getters: {}
}