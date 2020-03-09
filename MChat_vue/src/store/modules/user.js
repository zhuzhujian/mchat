const state = {
  token: '',
  account: '',
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
  SET_PHONNE: (state, phone) => {
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

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
