import axios from 'axios'
import { Loading } from 'element-ui'
var request = axios.create({
  // baseURL: 'https://www.fastmock.site/mock/37d3b9f13a48d528a9339fbed1b81bd5/book/api/books',
  baseURL: 'http://www.liulongbin.top:3008',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})
// 添加请求拦截器
let loadingInstance = null
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    loadingInstance = Loading.service({
      fullscreen: true,
      background: 'rgba(0, 0, 0, 0.7)',
      text: '加载中...',
      spinner: 'el-icon-loading'
    })
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    loadingInstance.close()
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
