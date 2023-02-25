<template>
    <div class="dialog-msg">
        <te-avatar
            :src="AVATAR"
            size="55px"
        />
        <dialog-bubble 
            msg="这是一大段话"
        />
    </div>
</template>

<script>
import dialogBubble from './dialogBubble.vue';
export default {
    name: 'dialog-msg',
    components: {
        dialogBubble
    }
}
</script>

<style lang="stylus" scoped>
.dialog-msg
    box-sizing border-box
    padding 0 10px
    display flex
    align-items center
    font-size 14px
</style>