<!-- 值得复盘 -->
<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="modile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode">
        </div>
        <div class="form-item">
          <input v-model="valid" class="inp" placeholder="请输入短信验证码" type="text">
          <!-- 这真的好牛逼 -->
          <button @click="captcha" :disabled="isable">{{ totalSecond === second? '获取验证码' : second + '秒后重新发送' }}</button>
        </div>
      </div>

      <div class="login-btn" @click="loginFn">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, login } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      modile: '', // 用户输入的手机号
      valid: '', // 用户输入的验证码
      picKey: '', // 验证码图片的Key
      picUrl: '', // 验证码图片的Url
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器的key
      isable: false // 是否可以点击获取验证码按钮
    }
  },
  async created () {
    // 获取初始的图片
    this.getPicCode()
  },
  methods: {
    // 获取验证码点击事件
    async captcha () {
      if (this.validFn()) {
        if (!this.timer && this.second === this.totalSecond) {
          this.setSecond()
          console.log('发送获取验证码请求')
          const { status } = await getMsgCode(this.picCode, this.picKey, this.modile)
          if (status === 200) this.$toast('短信发送成功，请注意查收')
        }
      }
    },
    // 点击登录
    async loginFn () {
      if (!this.validFn()) return
      console.log('发送登录请求')
      const { data } = await login(this.modile, this.valid)
      this.$store.commit('user/setUserInfo', data)
      this.$toast('登录成功')
      this.$router.push('/')
    },
    // 获取图形验证码
    async getPicCode () {
      console.log('发送获取图请验证码请求')
      const { data: { base64, key } } = await getPicCode()
      this.picKey = key
      this.picUrl = base64
    },
    // 验证码定时器
    setSecond () {
      this.timer = setInterval(() => {
        this.second--
        this.disabled = true
        if (this.second <= 0) {
          clearInterval(this.timer)
          this.second = this.totalSecond
          this.timer = null
          this.disabled = false
        }
      }, 1000)
    },
    // 表单验证
    validFn () {
      if (!/^1[34578]\d{9}$/.test(this.modile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    }
  },
  // 离开页面重置
  destroyed () {
    clearInterval(this.timer)
    this.second = this.totalSecond
    this.timer = null
    this.disabled = false
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
