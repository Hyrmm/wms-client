import Vuex from "vuex"
import Vue from "vue"
import user from "./modules/user"
import store from "./modules/store"
Vue.use(Vuex)




export default new Vuex.Store({
    modules: {
        user, store
    }

})