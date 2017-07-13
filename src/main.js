import Vue from 'vue'

//引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

//引入v-charts图形组件
import Vcharts from 'v-charts'
Vue.use(Vcharts)

//引入路由
import router from './router/index'

//引入axios
import axios from 'axios'
Vue.prototype.$http = axios; //把axios对象挂到Vue原型上

import Mock from './mock/index'
Mock.mock();

//引入App组件
import App from './App.vue'



new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
