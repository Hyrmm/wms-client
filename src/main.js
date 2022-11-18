import Vue from 'vue'
import App from './App.vue'
import store from "@/store"
import router from "@/router"
Vue.config.productionTip = true



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


import { getToken } from "@/utils/auth"



console.log(getToken())
// inconfont导入
import("@/assets/iconfont/iconfont.css")


//vue-rotuer

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
