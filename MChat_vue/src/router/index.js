import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import main from '@/views/main'
import personMain from '@/views/personal'
import application from '@/views/application'

import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '../store'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    redirect: '/main/personMain',
    children: [{
      path: '/main/personMain',
      name: 'personMain',
      component: personMain
    },
    {
      path: '/main/application',
      name: 'application',
      component: application
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  routes: constantRoutes
})

const router = createRouter()

// 路由守卫保证userInfo不丢失
const whiteList = ['/']
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      const hasAccount = store.getters.account && store.getters.account !== 0
      if (hasAccount) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          next({...to, replace: true})
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/`)
    }
  }
})

export default router
