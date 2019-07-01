<template lang="html">
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        clearable
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button
          type="primary"
          @click="loginAction"
          :loading="openLoading"
          size="large"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      openLoading: false, //是否开启用户的Loading
      usernameErrorMsg: '', //当用户名出现错误的时候
      passwordErrorMsg: '' //当密码出现错误的时候
    }
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success('您已经登录')
      this.$router.push('/')
    }
  },
  components: {},
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    loginAction() {
      this.checkForm() && this.axiosLoginUser()
    },
    axiosLoginUser() {
      this.openLoading = true
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          console.log(response)
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username }
              setTimeout(() => {
                resolve()
              }, 500)
            })
              .then(() => {
                Toast.success('登录成功')
                this.$router.push('/')
              })
              .catch(err => {
                console.log(err)
                Toast.success('登录状态保存失败')
              })
          } else {
            Toast.success('登录失败')
            this.openLoading = false
          }
        })
        .catch(error => {
          console.log(error)
          Toast.success('登录失败')
          this.openLoading = false
        })
    },
    checkForm() {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    }
  }
}
</script>
<style lang="css" scoped>
.register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>
