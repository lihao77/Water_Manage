/* 
该文件是整个项目的入口文件 
*/
//引入vue
import Vue from 'vue'
//引入App组件，所有组件的父组件
import App from './App.vue'
//引入路由组件
import router from './router'
//引入store,vuex
import store from './store'
import _axios from './utils/axios'
//引入饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import './assets/css/reset.scss'
import './icons'
//引入Echarts
import * as echarts from 'echarts';//引入echarts
// 全局指令
import divDrag from "@/myDirectives/divDrag.js"
//关闭vue的生产提示
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.directive("divDrag", divDrag)
Vue.prototype.$axios = _axios
new Vue({
  render: h => h(App),
  router:router,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$echarts=echarts
  },
  store,
}).$mount('#app')
