import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import main from '@/views/main'
import personMain from '@/views/personal'
import application from '@/views/application'
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

export default router
