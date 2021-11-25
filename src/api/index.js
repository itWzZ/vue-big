import request from '../utils/axios.js'

/**
 * @description: 登录接口
 * @return {Promise}
 **/
export const loginApi = (data) => {
  // 这里必须要return 出来
  return request({
    method: 'post',
    url: '/api/login',
    data
  })
}
/**
 * @description: 注册接口
 * @return {Promise}
 **/
export const regApi = (data) => {
  return request({
    method: 'post',
    url: '/api/reg',
    data
  })
}
/**
 * @description: 获取用户信息接口
 * @return {Promise}
 **/
export const userinfoApi = (data) => {
  return request({
    method: 'GET',
    url: '/my/userinfo'
  })
}
/**
 * @description: 获取导航栏信息接口
 * @return {Promise}
 **/
export const menusApi = () => {
  return request({
    method: 'GET',
    url: '/my/menus'
  })
}
/**
 * @description: 更新用户的基本信息
 * @return {Promise}
 **/
export const upDateInfoApi = (data) => {
  return request({
    method: 'PUT',
    url: '/my/userinfo',
    data
  })
}
/**
 * @description: 重置密码
 * @return {Promise}
 **/
export const upDatePwdApi = (data) => {
  return request({
    method: 'PATCH',
    url: '/my/updatepwd',
    data
  })
}
