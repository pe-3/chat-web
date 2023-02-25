<!-- 注册 -->
<template>
    <div class="sign-box">
        <h3>欢迎注册 Techat</h3>
        <el-input 
            placeholder="请输入你的账号"
        />
        <el-input 
            placeholder="请输入你的密码"
            password
        />
        <el-input 
            placeholder="请输入你的邮箱"
            password
        />
        <el-input 
            placeholder="请输入你收到的验证码"
            password
            class="mail-input"
        >
            <el-button 
                slot="suffix" 
                class="mail-btn"
                type="primary"
            >
                发送验证
            </el-button>
        </el-input>
        <el-button type="primary">注册</el-button>
        <line-text offset="80px">
            <span class="link" @click="jump('./signIn')">去登录</span>
        </line-text>
    </div>
</template>

<script>
export default {
    name: 'sign-up',
    data() {
        return {

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