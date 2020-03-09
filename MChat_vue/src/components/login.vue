<template>
  <div class="login-container">
    <div class="login-content">
      <el-tabs type="border-card" style="width: 100%; border-radius: 10px">
        <el-tab-pane label="登录">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            label-position="left">
            <el-form-item prop="account" class="login-form-input">
              <el-input
                ref="account"
                v-model="loginForm.account"
                placeholder="账号"
                size="medium"
                type="text">
                <template slot="prepend">
                  <i class="el-icon-user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" class="login-form-input">
              <el-input
                ref="password"
                v-model="loginForm.password"
                placeholder="密码"
                size="medium"
                show-password>
                <template slot="prepend">
                  <i class="el-icon-lock" />
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button size="medium" type="primary" class="login-form-btn" @click="handleLogin">登录</el-button>
          <div class="login-form-others">
            <hr style="float: left">
            <span>第三方登录</span>
            <hr style="float: right">
          </div>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <el-form
            ref="signUpForm"
            :model="signUpForm"
            :rules="signUpRules"
            class="sign-up-form"
            label-position="left"
            label-width="70px">
            <el-form-item label="手机">
              <el-input v-model="signUpForm.phone" placeholder="请输入手机号" size="medium" style="width: 280px" />
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="signUpForm.userName" placeholder="请输入用户名" size="medium" style="width: 280px" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="signUpForm.password" placeholder="请输入密码" size="medium" style="width: 280px" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="signUpForm.confirmPassword" placeholder="请确认密码" size="medium" style="width: 280px" />
            </el-form-item>
          </el-form>
          <el-button size="medium" type="primary" class="login-form-btn" @click="handleSignUp">注册</el-button>
        </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      loginRules: {},
      signUpForm: {
        phone: '',
        email: '',
        userName: '',
        password: '',
        confirmPassword: '',
        address: ''
      },
      signUpRules: {}
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
