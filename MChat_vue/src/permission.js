import store from './store'
import router from './router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['/']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  debugger
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
