<!-- 注册 -->
<template>
  <div class="sign-box">
    <h3>欢迎注册 chat</h3>
    <el-input 
      v-model="username"
      placeholder="请输入你的账号"
    />
    <el-input 
      v-model="password"
      type="password"
      placeholder="请输入你的密码"
      password
    />
    <el-input 
      v-model="mail"
      placeholder="请输入你的邮箱"
    />
    <el-input 
      v-model="code"
      placeholder="请输入你收到的验证码"
      class="mail-code-input"
    >
      <el-button 
        slot="suffix" 
        class="get-mail-code"
        type="primary"
        :disabled="!mail"
        @click="getMailCode(mail)"
      >
        发送验证
      </el-button>
    </el-input>
    <el-button 
      type="primary"
      :disabled="isNull"
      @click="signup"
    >
      注册
    </el-button>
    <te-line-text offset="80px">
      <span
        class="link"
        @click="jump('/sign/signIn')"
      >去登录</span>
    </te-line-text>
  </div>
</template>

<script>
import {getMailCode} from '@/request/mail';
import {signup} from '@/request/sign';

/**
 * @file 注册页
 * 
 * 不依赖其他页 x
 * 被其他依赖页 x
 * 存在跳转 v
 * */

export default {
    name: 'SignUp',
    data() {
        // 注册所需表单数据
        return {
            username: '',
            password: '',
            mail: '',
            code: ''
        };
    },
    computed: {
        // 判断有空的必填表单数据
        isNull() {
            return !this.username ||
            !this.password ||
            !this.mail || 
            !this.code;
        }
    },
    methods: {
        // 获取邮箱验证码
        getMailCode,
        // 进行注册
        async signup() {
            try {
                const {
                    username,
                    password,
                    mail,
                    code
                } = this;
                await signup({
                    username,
                    password,
                    mail,
                    code
                });
            } catch (error) {
                // 错误捕获。需要一个规范，和集中处理机制。
                // 解决方案一：全局 vue 混入 一个错误处理函数，在这里调用，将 error 还有组件信息传入
                console.warn(error);
                this.$warn(error);
            }
        }
    }
}
</script>

<style lang="stylus">
// 邮箱验证样式
.mail-code-input
    overflow hidden
    .get-mail-code
        transform translate(5px, 0)
        border-radius 0px 4px 4px 0px !important
</style>