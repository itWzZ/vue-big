import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 挂载elenemt-ui
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import bread from './components/bread.vue'
import '@/assets/global.less'
// 设置全局组件
Vue.component('bread', bread)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
