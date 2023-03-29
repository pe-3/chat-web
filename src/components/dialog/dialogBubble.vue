<template>
    <div class="dialog-bubble">
        <el-tooltip
            :content="time"
            :placement="isMe ? 'right-start' : 'left-start'"
        >
            <span class="bubble">
                {{ msg }}
            </span>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: 'dialog-bubble',
    props: {
        msg: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        isMe: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.dialog-bubble
    flex 1
    margin-top 10px
    .bubble
        padding 10px
        border-radius 10px
        background-color #efefef
        display inline-block
        text-align left
        max-width 90%
        word-break break-all
</style>