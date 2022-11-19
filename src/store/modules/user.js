import { login } from "@/api/user"
import { setToken } from "@/utils/auth"

export default {
    namespaced: true,
    state: {
        userInfo: {

        }
    },
    actions: {
        async login({ commit }, payload) {
            let res = await login(payload)
            if (res.data.status == 200) {
                //储存用户数据
                commit("upDataUserInfo", res.data.data)
                setToken(res.data.data.token)
            }
            return res
        },
    },
    mutations: {
        upDataUserInfo(state, data) {
            state.userInfo = data
        },
    },
    getters: {}
}