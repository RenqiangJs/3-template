<template>
  <section class="login-main" @keyup.enter="submit">
    <div class="content">
      <section class="left-box"></section>
      <section class="right-box">
        <div class="login-box">
          <h1 class="title">{{ '蒽蒽' }}</h1>
          <p class="input-box user">
            <input
              class="input"
              v-model="loginForm.username"
              type="text"
              :maxlength="10"
              placeholder="请输入用户名"
            />
          </p>
          <p class="input-box password">
            <input
              class="input"
              type="password"
              v-model="loginForm.password"
              :maxlength="16"
              placeholder="请输入密码"
            />
          </p>
          <p class="input-box checkCode">
            <input class="input" v-model="loginForm.code" :maxlength="16" placeholder="请输入验证码" />
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </p>
          <a-button type="primary" block @click="submit" :loading="loading" size="large">登 录</a-button>
        </div>
      </section>
    </div>
    <div id="slid-box"></div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import { login, getCodeImg, getRouters } from '@/api'
import { useToken } from '@/store/useUserInfo'
import { useRoute, useRouter } from 'vue-router'
import { setToken } from '@/utils/auth'
const router = useRouter()
const route = useRoute()
const codeUrl = ref('')
// 验证码开关
const captchaOnOff = ref(true)
const loginForm = ref({
  username: '',
  password: '',
  code: '',
  uuid: '',
})
const loading = ref(false)
/**
 * 获取验证码
 */
const getCode = () => {
  getCodeImg().then((res) => {
    console.log(res, 71)
    captchaOnOff.value =
      res.captchaOnOff === undefined ? true : res.captchaOnOff
    if (captchaOnOff.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img
      loginForm.value.uuid = res.uuid
    }
  })
}
getCode()
const submit = function () {
  if (!loginForm.value.username) {
    message.error('请输入手机号码')
    return
  }
  if (!loginForm.value.password) {
    message.error('请输入密码')
    return
  }
  if (!loginForm.value.password) {
    message.error('请输入验证码')
    return
  }
  login(loginForm.value).then((res) => {
    // 做一些登录后的操作 保存token 重定向至上一个页面或者首页
    const tokenStore = useToken()
    tokenStore.setToken(res.token)
    setToken(res.token)
    const redirectPath = route.query && route.query.redirect
    router.push({ path: redirectPath })
  })
}
</script>

<style lang="scss" scoped>
.login-main {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background-size: 100% 100%;
  display: flex;
  .content {
    min-width: 1270px;
    height: 540px;
    transition: all ease 1s;
    background: #fff;
    display: flex;
    margin: auto;
    box-shadow: 0 0 25px rgba(116, 214, 255, 0.33);
    .left-box {
      width: 52%;
      height: 100%;
      box-shadow: 8px 0px 10px rgba(116, 214, 255, 0.33);
    }
    .right-box {
      width: 48%;
      display: flex;
      .login-box {
        width: 420px;
        margin: auto;
        text-align: center;
        .title {
          transition: all ease 1s;
          font-size: 36px;
          font-weight: 500;
          line-height: 36px;
          margin-bottom: 72px;
          text-align: center;
        }
        .input-box {
          position: relative;
          margin-bottom: 0;
          .input {
            width: 100%;
            height: 50px;
            padding: 14px 14px 14px 48px;
            margin-bottom: 32px;
            background: none;
            border: solid 1px #d1d6e2;
            outline: none;
          }
          &:before {
            content: '';
            z-index: 1;
            top: 14px;
            left: 43px;
            position: absolute;
            display: inline-block;
            width: 20px;
            height: 24px;
          }
          &.user {
            &:before {
              background-size: 100%;
            }
          }
          &.password {
            position: relative;
            &:before {
              background-size: 100%;
            }
            .codeBtn {
              cursor: pointer;
              font-size: 12px;
              position: absolute;
              top: 10px;
              right: 40px;
              width: 140px;
              height: 30px;
              color: #59bcfe;
              background-color: rgba(89, 188, 254, 0.22);
              border: 1px solid #59bcfe;
              border-radius: 4px;
              &.disabled {
                color: rgba(0, 0, 0, 0.25);
                background-color: #f5f5f5;
                border-color: #d9d9d9;
              }
            }
          }
        }
        .checkCode {
          display: flex;
          align-items: center;
          width: 100%;
          .login-code-img {
            height: 50px;
            margin-bottom: 32px;
            width: 40%;
          }
        }
      }
    }
  }
}
</style>