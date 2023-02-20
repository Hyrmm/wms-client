import Vuex from "vuex"
import Vue from "vue"
import user from "./modules/user"
import store from "./modules/store"
import client from "./modules/client"
import dataVisual from "./modules/dataVisual"
import cache from "./modules/cache"
Vue.use(Vuex)




export default new Vuex.Store({
    modules: {
        user, store, client, dataVisual, cache
    }
})