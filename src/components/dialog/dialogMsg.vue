<template>
  <div 
    class="dialog-msg"
    :class="{['dialog-me']: !isMe}"
  >
    <template v-if="!isMe">
      <dialog-bubble 
        :msg="msg"
        :time="time"
        :is-me="isMe"
      />
      <te-avatar
        :src="avatar"
        size="55px"
      />
    </template>
    <template v-else>
      <te-avatar
        :src="avatar"
        size="55px"
      />
      <dialog-bubble 
        :msg="msg"
        :time="time"
        :is-me="isMe"
      />
    </template>
  </div>
</template>

<script>
import dialogBubble from './dialogBubble.vue';
export default {
    name: 'DialogMsg',
    components: {
        dialogBubble
    },
    props: {
        msg: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        },
        isMe: {
            type: Boolean,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
}
</script>

<style lang="stylus" scoped>
.dialog-msg
    box-sizing border-box
    padding 0 10px
    display flex
    align-items center
    font-size 14px
    overflow hidden
    max-width 100%
.dialog-me
    text-align right
</style>