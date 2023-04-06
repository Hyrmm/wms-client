import Vue from 'vue'
import App from './App.vue'
import store from "@/store"
import router from "@/router"
Vue.config.productionTip = true


// elementui 组件全局注册
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)




//echarts引入
import * as echarts from 'echarts/core';
import { BarChart, PieChart, TreemapChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
import { LegendComponent } from 'echarts/components';
echarts.use([LegendComponent]);
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  PieChart,
  TreemapChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
Vue.prototype.$echarts = echarts



// inconfont导入
import("@/assets/iconfont/iconfont.css")

var app = new Vue({
  store,
  router,
  render: h => h(App),

}).$mount('#app')
export default app