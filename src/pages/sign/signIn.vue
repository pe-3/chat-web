<!-- 登录 -->
<template>
    <div class="sign-box">
        <h3>欢迎使用 Techat</h3>
        <el-input 
            placeholder="请输入你的账号"
        />
        <el-input 
            placeholder="请输入你的密码"
            password
        />
        <p class="keep">
            <span>
                <el-checkbox/> 
                记住我
            </span>
        </p>
        <el-button type="primary" @click="jump('/chat')">登录</el-button>
        <line-text offset="80px">
            <span class="link" @click="jump('./signUp')">去注册</span>
        </line-text>
    </div>
</template>

<script>
export default {
    name: 'sign-in',
    data() {
        return {

        }
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