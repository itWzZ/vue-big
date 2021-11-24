import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 挂载elenemt-ui
import 'element-ui/lib/theme-chalk/index.css'
// import './elenemt/elenemt.js'
import ElementUI from 'element-ui'
// 配置axios
// import axios from 'axios'
// axios.defaults.baseURL = 'http://www.liulongbin.top:3008'
// Vue.prototype.$http = axios

import '@/assets/global.less'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
