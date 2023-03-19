<!-- 注册 -->
<template>
    <div class="sign-box">
        <h3>欢迎注册 chat</h3>
        <el-input 
            placeholder="请输入你的账号"
            v-model="username"
        />
        <el-input 
            placeholder="请输入你的密码"
            v-model="password"
            password
        />
        <el-input 
            placeholder="请输入你的邮箱"
            v-model="mail"
        />
        <el-input 
            placeholder="请输入你收到的验证码"
            class="mail-input"
            v-model="code"
        >
            <el-button 
                slot="suffix" 
                class="mail-btn"
                type="primary"
                :disabled="!mail"
                @click="_getMail"
            >
                发送验证
            </el-button>
        </el-input>
        <el-button 
            type="primary"
            :disabled="isNull"
            @click="_signup"
        >
            注册
        </el-button>
        <line-text offset="80px">
            <span class="link" @click="jump('/sign/signIn')">去登录</span>
        </line-text>
    </div>
</template>

<script>
import { getMail } from '@/request/mail';
import { signup } from '@/request/sign';
export default {
    name: 'sign-up',
    data() {
        return {
            username: '',
            password: '',
            mail: '',
            code: '',
        }
    },
    computed: {
        isNull() {
            return !this.username ||
            !this.password ||
            !this.mail || 
            !this.code;
        }
    },
    methods: {
        async _getMail() {
            const {mail} = this;
            await getMail({mail});
        },
        async _signup() {
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
                console.warn(error);
                this.$warn(error);
            }
        }
    }
}
</script>

<style lang="stylus">
.mail-input
    overflow hidden
    .mail-btn
        transform translate(5px, 0)
        border-radius 0px 4px 4px 0px !important
</style>