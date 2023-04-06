import { getClientOptions } from "@/api/client"
export default {
    namespaced: true,
    state: {
        clientOptions: []
    },
    actions: {
        async getClientOptions({ commit }) {
            let res = await getClientOptions()
            if (res.data.status == 200) {
                commit('updataCliientOptions', res.data.data)
            }
        }
    },
    mutations: {
        updataCliientOptions: function (state, payload) {
            state.clientOptions = payload
        }
    },
    getters: {}
}