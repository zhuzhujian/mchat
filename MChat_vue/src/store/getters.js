const getters = {
  account: state => state.user.account,
  name: state => state.user.user_name,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickName: state => state.user.nick_name,
  signature: state => state.user.signature,
  phone: state => state.user.phone,
  email: state => state.user.email,
  sex: state => state.user.sex,
  signUpTime: state => state.user.signUpTime,
  province: state => state.user.province,
  city: state => state.user.city,
  town: state => state.user.town
}
export default getters
