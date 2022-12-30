/*
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-11-11 10:15:40
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-30 20:05:00
 * @FilePath: \wms-client\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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