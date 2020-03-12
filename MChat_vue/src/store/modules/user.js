import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo } from '@/api/login'

const state = {
  token: getToken(),
  account: 0,
  user_name: '',
  avatar: '',
  nick_name: '',
  signature: '',
  phone: '',
  email: '',
  sex: '',
  sign_up_time: '',
  province: '',
  city: '',
  town: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_USER_NAME: (state, userName) => {
    state.user_name = userName
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NICK_NAME: (state, nickName) => {
    state.nick_name = nickName
  },
  SET_SIGNATURE: (state, signture) => {
    state.signature = signture
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_SIGN_UP_TIME: (state, signUpTime) => {
    state.sign_up_time = signUpTime
  },
  SET_PROVINCE: (state, province) => {
    state.province = province
  },
  SET_CITY: (state, city) => {
    state.city = city
  },
  SET_TOWN: (state, town) => {
    state.town = town
  }
}

const actions = {
  login ({commit, dispatch}, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({account: account.trim(), password: password.trim()}).then(response => {
        if (response.data) {
          const {data} = response
          const {token} = data
          commit('SET_TOKEN', token)
          if (response.code === 0) {
            setToken(token)
            dispatch('getInfo').then(() => resolve(response))
          }
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo ({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo().then((response) => {
        const {data} = response
        if (!data) {
          reject(new Error('Verification failed, Please login again'))
        }

        const {
          account,
          user_name,
          avatar,
          nick_name,
          signature,
          phone,
          email,
          sex,
          sign_up_time,
          province,
          city,
          town
        } = data

        commit('SET_ACCOUNT', account)
        commit('SET_USER_NAME', user_name)
        commit('SET_AVATAR', avatar)
        commit('SET_NICK_NAME', nick_name)
        commit('SET_SIGNATURE', signature)
        commit('SET_PHONE', phone)
        commit('SET_EMAIL', email)
        commit('SET_SEX', sex)
        commit('SET_SIGN_UP_TIME', sign_up_time)
        commit('SET_PROVINCE', province)
        commit('SET_CITY', city)
        commit('SET_TOWN', town)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout ({commit}) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
