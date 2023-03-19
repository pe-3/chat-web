<template>
    <div class="user-info-card">
        <!-- 个人信息 -->
        <div class="user-info-item">
            <span class="user-info-item-name">性别</span>
            <span class="user-info-item-value">{{user.gender}}</span>
        </div>
        <div class="user-info-item">
            <span class="user-info-item-name">年龄</span>
            <span class="user-info-item-value">{{user.age}}岁</span>
        </div>
        <div class="user-info-item">
            <span class="user-info-item-name">生日</span>
            <span class="user-info-item-value">{{user.birthday}}</span>
        </div>
        <te-gap orient="height" class="divide-line"></te-gap>
        <!-- 账号信息 -->
        <div class="user-info-item">
            <span class="user-info-item-name">账号</span>
            <span class="user-info-item-value keynote">{{user.username}}</span>
        </div>
        <div class="user-info-item">
            <span class="user-info-item-name">邮箱</span>
            <span class="user-info-item-value">{{user.mail}}</span>
        </div>
        <div class="user-info-item">
            <span class="user-info-item-name">电话</span>
            <span class="user-info-item-value">{{user.phone}}</span>
        </div>
        <!-- 其他信息 -->
        <te-gap orient="height" class="divide-line"></te-gap>
        <div class="user-info-item">
            <span class="user-info-item-name">地区</span>
            <span class="user-info-item-value">{{user.site}}</span>
        </div>
        <div class="user-info-item">
            <span class="user-info-item-name">签名</span>
            <div class="user-info-item-content">
                {{ user.intro }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user-info-card',
    props: {
        user:{ 
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.user-info-card
    height 100%
    padding 25px 30px
    font-size 14px
    color #4e4e4e
    position relative
    overflow hidden
    margin-top 5px
    .user-info-item
        margin-top 15px
        display flex
        align-item center
        .user-info-item-name
            font-weight bold
            margin-right 20px
            min-width 2em
</style>