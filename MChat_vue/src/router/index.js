import Vue from 'vue'
import Router from 'vue-router'

import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '../store'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main'),
    redirect: '/main/personMain',
    children: [{
      path: 'personMain',
      name: 'personMain',
      component: () => import('@/views/personal'),
      redirect: 'personMain/friendly',
      children: [{
        path: 'friendly',
        name: 'friendly',
        component: () => import('@/views/personal/components/friendly'),
        redirect: 'friendly/own',
        children: [
          {
            path: 'own',
            name: 'myFriend',
            component: () => import('@/views/personal/components/myFriend')
          },
          {
            path: 'search',
            name: 'searchName',
            component: () => import('@/views/personal/searchFriend')
          },
          {
            path: 'detial/:id',
            name: 'friendDetial',
            component: () => import('@/views/personal/detailFriend')
          },
          {
            path: 'apply',
            name: 'applyFriend',
            component: () => import('@/views/personal/components/applyFriend')
          }
        ]
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/group/')
      }]
    },
    {
      path: '/main/application',
      name: 'application',
      component: () => import('@/views/application')
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
