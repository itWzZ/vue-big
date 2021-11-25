import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('../views/Login/index.vue') },
  { path: '/reg', component: () => import('../views/Reg/index.vue') },
  {
    path: '/',
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/user-info',
        component: () => import('../views/user/userinfo.vue')
      },
      {
        path: '/user-avatar',
        component: () => import('../views/user/changeavatar.vue')
      },
      {
        path: '/user-pwd',
        component: () => import('../views/user/resetpwd.vue')
      },
      {
        path: 'art-list',
        component: () => import('../views/art/artlist.vue')
      },
      {
        path: 'art-cate',
        component: () => import('../views/art/artcategory.vue')
      },
      {
        path: 'home',
        component: () => import('../views/home/home.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 设置全局前置守卫
const whiteList = ['/login', '/reg']
router.beforeEach((to, from, next) => {
  // 如果要去的路由不是白名单里的路由的话
  if (!whiteList.includes(to.path)) {
    // 判断浏览器中是否有token
    if (store.state.token) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果要去的是白名单里面的路由,直接发行
    next()
  }
})
// 把下面的代码粘贴到路由模块中对应的位置，即可防止路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
