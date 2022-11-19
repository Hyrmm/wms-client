import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
Vue.config.productionTip = true



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)






// inconfont导入
import("@/assets/iconfont/iconfont.css")


//vue-rotuer
new Vue({
  store,
  router,
  render: h => h(App),

}).$mount('#app')
