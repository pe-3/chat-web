<template>
  <div
    class="chat-item"
    @click="$emit('click')"
  >
    <te-avatar
      :src="data.avatar"
      size="60px"
    />
    <div class="chat-item-info">
      <div class="chat-item-info-header flex-between">
        <div class="chat-item-name">
          {{ data.nickname }}
        </div>  
        <div class="chat-item-last-time">
          {{ getTime() }}
        </div>
      </div>
      <p class="chat-item-last-msg">
        {{ data.lastMsg ?? '暂无消息' }}
        <span
          v-if="data.unread"
          class="chat-item-unread"
        >{{ data.unread < 99 ? data.unread : '99+' }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils';
export default {
    name: 'ChatItem',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        getTime() {
            if(!this.data.time) return '';
            return parseTime(this.data.time);
        }
    }
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
            position relative
            over-ellipsis()
            max-width 100%

            .chat-item-unread
                position absolute
                right 0
                bottom 2px
                font-size 12px
                display inline-block
                size auto 1.2em
                padding 0 .4em
                border-radius .6em
                background red
                color white
                text-align center
                line-height 1.2em
        .chat-item-info-header
            margin-bottom 3px
</style>