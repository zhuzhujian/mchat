import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import { config } from 'shelljs'

const service = axios.create({
  baseURL: process.env.API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain request
  timeout: 1000000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    // do something before request is sent
    let href = window.location.hash.slice('1')
    if (href.indexOf('?') > -1) {
      href = href.substr(0, href.indexOf('?'))
    }
    href = href.replace(/\d/g, '')
    config.headers['Router'] = href
    return config
  },
  error => {
    // do something whit request error
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
