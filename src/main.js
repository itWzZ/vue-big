import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 挂载elenemt-ui
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import bread from './components/bread.vue'
import '@/assets/global.less'
import './components/index.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor /* { default global options } */)
// 设置全局组件
Vue.component('bread', bread)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
