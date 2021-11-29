import axios from 'axios'
import { Loading, Message } from 'element-ui'
import store from '../store/index.js'
import router from '../router/index.js'

// 设置公共url 前缀
var request = axios.create({
  baseURL: 'http://www.liulongbin.top:3008',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' }
})
// 添加请求拦截器
let loadingInstance = null
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 设置只要请求地址有 /my 的话 就加上仓库中的token
    if (config.url.startsWith('/my')) {
      config.headers.Authorization = store.state.token
    }
    // 请求发出时加载动画开始
    loadingInstance = Loading.service({
      fullscreen: true,
      background: 'rgba(225, 225, 225, 0.4)',
      lock: true,
      body: true
    })
    return config
  },
  function (error) {
    // 对请求错误做些什么
    Message({
      message: error,
      type: 'warning'
    })
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 请求响应回来时关闭加载动画
    loadingInstance.close()
    return response
  },
  function (error) {
    loadingInstance.close()
    Message({
      message: error.response.data.message,
      type: 'warning'
    })
    // console.log(error.response.data.message)
    if (error.response.status === 401) {
      store.commit('delToken')
      localStorage.clear()
      router.push('/login')
    }

    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
