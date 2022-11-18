export default {
    namespaced: true,
    state: {
        userInfo: {

        }
    },
    actions: {
        async login({ commit }) {
            let res = await getCategoryList()
            commit("upDataCategoryList", res.data)
        },
    },
    mutations: {
        upDataUserInfo(state, data) {
            state.userInfo = data
        },
    },
    getters: {}
}