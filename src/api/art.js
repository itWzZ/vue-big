import request from '../utils/axios.js'
/**
 * @description: 获取文章分类列表
 * @return {Promise}
 **/
export const getArtListApi = () => {
  return request({
    method: 'GET',
    url: '/my/cate/list'
  })
}

/**
 * @description: 新增文章分类
 * @return {Promise}
 **/
export const addArtListApi = (data) => {
  return request({
    method: 'POST',
    url: '/my/cate/add',
    data
  })
}

/**
 * @description: 根据 id 删除文章分类
 * @return {Promise}
 **/
export const delArtListApi = (id) => {
  return request({
    method: 'DELETE',
    url: '/my/cate/del',
    params: {
      id: id
    }
  })
}

/**
 * @description: 根据 id 更新文章分类数据
 * @return {Promise}
 **/
export const upDateArtListApi = (data) => {
  return request({
    method: 'PUT',
    url: '/my/cate/info',
    data
  })
}
/**
 * @description: 获取文章的列表数据
 * @return {Promise}
 * @params: 分页条数
 **/
export const getCateInfoApi = (params) => {
  return request({
    method: 'GET',
    url: '/my/article/list',
    params
  })
}
/**
 * @description: 发布新文章
 * @return {Promise}
 **/
export const addArticleApi = (data) => {
  return request({
    method: 'POST',
    url: '/my/article/add',
    data
  })
}
/**
 * @description: 根据 id 删除文章数据
 * @return {Promise}
 **/
export const delArticleApi = (data) => {
  return request({
    method: 'DELETE',
    url: '/my/article/info',
    params: data
  })
}
