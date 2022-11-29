import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
Vue.config.productionTip = true


// elementui 组件全局注册
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


//echarts引入
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts



// inconfont导入
import("@/assets/iconfont/iconfont.css")

var app = new Vue({
  store,
  router,
  render: h => h(App),

}).$mount('#app')
export default app