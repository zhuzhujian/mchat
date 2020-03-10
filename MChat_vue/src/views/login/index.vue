<template>
  <div class="login-container">
    <div class="logo" :class="{active: showSign}">
      <h3 class="title">Hi，Mchat!</h3>
      <span class="begain" @click="handleShowSign">立即体验</span>
    </div>
    <div class="login-content" v-if="showSign">
      <div class="title">
        <span :class="{active: isLogin}" @click="handleChoose(true)">登录</span>
        <span :class="{active: !isLogin}" @click="handleChoose(false)">注册</span>
      </div>
      <el-form ref="signForm" label-width="80" class="signForm" :rules="signRules" :model="signForm">
        <el-form-item prop="name">
          <el-input v-model.trim="signForm.name" placeholder="账号" size="medium">
            <i class="el-icon-user" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="signForm.password" type="password" size="medium" placeholder="密码" @keyup.enter.native="handleLogin()" show-password>
            <i class="el-icon-lock" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="rePassword" type="password" v-if="!isLogin">
          <el-input v-model.trim="signForm.rePassword" type="password" size="medium" placeholder="确认密码" @keyup.enter.native="handleLogin()" show-password>
            <i class="el-icon-lock" slot="prepend"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button size="medium" type="primary" class="login-form-btn" @click="handleLogin()" :loading="btnLoading">{{isLogin ? '登录' : '注册'}}</el-button>
      <div v-if="isLogin" class="login-form-others">
            <hr style="float: left">
            <span>第三方登录</span>
            <hr style="float: right">
          </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'login',
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        let reg = /^[a-zA-Z0-9_]{2,8}$/
        if (!reg.test(value)) {
          callback(new Error('请输入2-8个字符数字或下划线组成的账号'))
        } else {
          callback()
        }
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        let reg = /^[a-zA-Z0-9]{6,12}$/
        if (!reg.test(value)) {
          callback(new Error('请输入6-12位的数字字符组成的密码'))
        } else {
          callback()
        }
      }
    }
    let validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else {
        if (value !== this.signForm.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
    return {
      signForm: {
        name: '',
        password: '',
        rePassword: ''
      },
      signRules: {
        name: [{validator: validateName, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}],
        rePassword: [{validator: validateRePassword, trigger: 'blur'}]
      },
      showSign: false,
      isLogin: true,
      btnLoading: false
    }
  },
  methods: {
    handleShowSign () {
      this.showSign = true
    },
    handleChoose (boolean) {
      this.isLogin = boolean
      this.resetValidata()
    },
    resetValidata () {
      this.$refs.signForm.resetFields()
      this.signForm.name = ''
      this.signForm.password = ''
      this.signForm.rePassword = ''
    },
    handleLogin () {
      this.$refs.signForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          if (this.isLogin) {
            const params = {account: this.signForm.name, password: this.signForm.password}
            login(params).then(response => {
              console.log(response.data)
              this.$router.push('/main')
            }).catch(reason => {
              this.$message.error('登录失败')
              console.log(reason)
            }).finally(() => {
              this.btnLoading = false
            })
          }
        } else {
          return false
        }
      })
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
  background-image: url(../../assets/images/background.jpeg);
  background-size: 100% 100%;
  .logo{
    margin-top: 15%;
    transform: translateY(0%);
    transition: transform 0.5s;
    text-align: center;
    h3.title{
      font-size: 38px;
      color: #ffffff;
      text-align: center;
      font-weight: 400;
      margin-bottom: 20px;
    }
    span.begain{
      color: #ffffff;
      font-size: 20px;
      animation: fide 3s infinite;
      cursor: pointer;
      text-align: center;
    }
    span.begain:hover{
      opacity: 1;
      animation-play-state: paused;
    }
    @keyframes fide {
      0% {opacity: 1;}
      50% {opacity: 0.3;}
      100% {opacity: 1;}
    }
  }
  .logo.active{
    transform: translateY(-100%);
  }
  .login-content {
    position: absolute;
    width: 350px;
    padding: 15px 25px 25px;
    background-color: #ffffff;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -240px;
    animation: move 1.5s;
    @keyframes move{
      0% {left: 0}
      40% {left: 50%;}
      40%, 100% {transform: translate(0%, 0%);}
      50%,
      70%,
      90%{
        transform: translate(-5px,-5px);
      }
      60%, 80%{
        transform: translate(5px,5px);
      }
    }
    .title{
      display: flex;
      justify-content: center;
      margin-bottom: 35px;
      span{
        text-align: center;
        width: 100px;
      }
      span.active{
        color: #0099ff;
      }
      span + span{
        border-left: 1px solid #d5d5d5;
      }
    }
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
