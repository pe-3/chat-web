<!-- 登录 -->
<template>
  <div class="sign-box">
    <h3>欢迎使用 chat</h3>
    <el-input 
      v-model="username"
      placeholder="请输入你的账号"
    />
    <el-input 
      v-model="password"
      placeholder="请输入你的密码"
      type="password"
    />
    <p class="keep">
      <span>
        <el-checkbox 
          :checked="loginless"
          @change="setLoginLess($event)"
        /> 
        7天免登录
      </span>
    </p>
    <el-button 
      type="primary" 
      :disabled="isNull"
      @click="_signin"
    >
      登录
    </el-button>
    <line-text offset="80px">
      <span
        class="link"
        @click="jump('/sign/signUp')"
      >去注册</span>
    </line-text>
  </div>
</template>

<script>
/**
 * @author guoxudong04 <guoxudong04@baidu.com>
 * @file 登陆页
 * TODO: 后续可以在本页添加炫酷的宣传动画，增加吸引力
 * */

import { signin } from '@/request/sign';
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'SignIn',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        isNull() {
            return !this.username || !this.password;
        },
        ...mapState('auth', ['loginless'])
    },
    methods: {
        async _signin() {
            try {
                const {username, password} = this;
                const data = await signin({
                    username,
                    password
                });
                const {token} = data;
                // 状态管理 token
                this.setToken(`Bearer ${token}`);
                this.jump('/chat');
            } catch (error) {
                console.warn(error);
            }
        },
        ...mapMutations('auth', ['setToken', 'setLoginLess']),
    }
}
</script>


<style lang="stylus">
.sign-box
    h3
        margin-bottom 30px
    .el-input
    .keep
        margin-bottom 15px
    .el-button
        width 100%
    .keep
        font-size 14px
        color #888
        flex-between true
        .el-checkbox
            margin-right 5px
</style>