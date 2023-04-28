<template>
  <div
    class="chat-item"
    @click="$emit('click')"
  >
    <!-- 左侧头像展示 -->
    <te-avatar
      :src="data.avatar"
      size="60px"
    />
    <!-- 聊天信息 -->
    <div class="chat-item-info">
      <div class="chat-item-info-header flex-between">
        <!-- 聊天对象名称 -->
        <div class="chat-item-name">
          {{ data.nickname }}
        </div>  
        <!-- 上次聊天时间 -->
        <div class="chat-item-last-time">
          {{ getTime() }}
        </div>
      </div>
      <!-- 最近一条消息 -->
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
/**
 * @file 聊天列表项，通过点击聊天项和对象发起对话
 * @import_num 1
 * 功能上只暴露了 click 点击事件
 * 基本上都是展示信息
 */
import { parseTime } from '@/utils';
export default {
    name: 'ChatItem',
    props: {
        /**
         * 涵盖了所有要展示的信息
         * @prop {Object} data
         * @prop {} data.avatar 聊天对象头像
         * @prop {} data.nickname 聊天对象昵称
         * @prop {} data.time 上次聊天时间 事件戳形式，由本地方法解析后给用户展示
         * @prop {} data.lastMsg 最近一条聊天记录
         * @prop {} data.unred 未读消息个数
         */
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        // 解析上一次聊天时间戳
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