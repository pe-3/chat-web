<template>
    <div class="chat-item" @click="$emit('click')">
        <te-avatar
            :src="AVATAR"
            size="60px"
        />
        <div class="chat-item-info">
            <div class="chat-item-info-header flex-between">
                <div class="chat-item-name">第五届字节跳动青训营 - 寒假专场</div>  
                <div class="chat-item-last-time">2月6号</div>
            </div>
            <p class="chat-item-last-msg">
                最近一次的聊天内容
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chat-item'
}
</script>

<style lang="stylus" scoped>
.chat-item
    padding-right 10px
    flex-between true
    letter-spacing .2px
    cursor pointer
    user-select none
    &:hover
        background #dfdfdf
    .chat-item-info
        flex 1
        overflow hidden
        .chat-item-name
            color #1f2329
            font-size 14px
            over-ellipsis true
            flex 1
            margin-right 20px
        .chat-item-last-time
        .chat-item-last-msg
            font-size 12px
            color #999
            vertical-align center
        .chat-item-info-header
            margin-bottom 3px
</style>