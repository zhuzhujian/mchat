<template>
  <div class="login-container">
    <div class="logo" :class="{active: showSign}">
      <h3 class="title">Hi!Mchat</h3>
      <span class="begain" @click="handleShowSign">立即体验</span>
    </div>
    <div class="login-content" v-if="showSign">
      <div class="title">
        <span :class="{active: isLogin}" @click="isLogin = true">登录</span>
        <span :class="{active: !isLogin}" @click="isLogin = false">注册</span>
      </div>
      <el-form ref="signForm" label-width="80" class="signForm" :rules="signRules" v-model="signForm">
        <el-form-item prop="name"></el-form-item>
        <el-form-item prop="password"></el-form-item>
        <el-form-item prop="rePassword" v-if="!isLogin"></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      signForm: {
        name: '',
        password: '',
        rePassword: ''
      },
      signRules: {},
      showSign: false,
      isLogin: true
    }
  },
  methods: {
    handleLogin () {
      const params = Object.assign({}, this.loginForm)
      login(params).then(response => {
        console.log(response.data)
      }).catch(reason => {
        console.log(reason)
      })
      this.$router.push('/main')
    },
    handleSignUp () {
      console.log('signUp')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  .login-content {
    position: relative;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-form-btn {
      width: 100%;
      border-radius: 30px;
      margin-bottom: 20px;
    }
    .login-form-others {
      hr {
        width: 30%;
        background-color: #EBEEF5;
        height: 2px;border: none;
        text-align: center
      }
      span {
        display: inline-block;
        width: 40%;
        text-align: center;
        color: grey;
      }
    }
  }
}
</style>
