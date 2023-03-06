<template>
    <div class="chat-index">
        <div class="chat-list">
            <div class="chat-list-header">
                <te-search/>
                <te-gap/>
                <te-add/>
            </div>
            <div class="chat-list-wrapper">
                <chat-item
                    v-for="index in 10"
                    :key="index"
                    @click="chatIndex = index"
                    :class="{['selected-item']: chatIndex === index}"
                />
            </div>
        </div>
        <div class="chat-dialog">
            <dialog-header/>
            <dialog-msgs/>
        </div>
    </div>
</template>

<script>
import chatItem from '@/components/chat/chatItem.vue';
import dialogHeader from '@/components/dialog/dialogHeader';
import dialogMsgs from '@/components/dialog/dialogMsgs.vue';
export default {
    name: 'chat-list-index',
    components: {
        chatItem,
        dialogHeader,
        dialogMsgs
    },
    data() {
        return {
            chatIndex: 0
        }
    }
}
</script>

<style lang="stylus" scoped>
.chat-index
    size 100%
    display flex
    .chat-list
        size 300px 100%
        border-right .1px solid #ededed
        .chat-list-header
            flex-between true
            padding 10px 10px
        .chat-list-wrapper
            max-height calc(100% - 52px)
            overflow auto
    .chat-dialog
        flex 1
</style>

