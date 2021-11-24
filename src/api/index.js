import request from '../utils/axios.js'
import store from '../store/index.js'
export const loginApi = (data) => {
  // 这里必须要return 出来
  return request({
    method: 'post',
    url: '/api/login',
    data
  })
}
export const regApi = (data) => {
  // 这里必须要return 出来
  return request({
    method: 'post',
    url: '/api/reg',
    data
  })
}

export const userinfoApi = (data) => {
  return request({
    method: 'GET',
    url: '/my/userinfo',
    headers: {
      Authorization: store.state.token
    }
  })
}
