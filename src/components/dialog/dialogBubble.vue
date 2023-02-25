<template>
    <div class="dialog-bubble">
        <span class="bubble">
            {{ msg }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'dialog-bubble',
    props: {
        msg: {
            type: String,
            require: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.dialog-bubble
    flex 1
    
    .bubble
        padding 10px
        border-radius 10px
        background-color #efefef
</style>