<template>
  <div
    class="mail-item"
    @click="$emit('click')"
  >
    <te-avatar
      :src="data.avatar"
      size="60px"
    />
    <div class="mail-item-info">
      <div class="mail-item-info-header flex-between">
        <div class="mail-item-name">
          {{ data.nickname ?? '昵称加载失败' }}
        </div>
        <div class="mail-item-last-online-time">
          上次在线：{{ lastOnlineTime }}
        </div>
      </div>
      <div class="mail-item-intro">
        {{ data.intro ?? '暂无' }}
      </div>
    </div>
  </div>
</template>

<script>
import {parseTime} from '@/utils';
export default {
    name: 'MailItem',
    props: {
        data: {
            type: Object,
            required: true
        },
    },
    computed: {
        /**
         * 上次在线时间转化
        */
        lastOnlineTime() {
            return parseTime(this.data.last_online_time);
        }
    }
}
</script>

<style lang="stylus" scoped>
.mail-item
    padding-right 10px
    flex-between true
    letter-spacing .2px
    cursor pointer
    user-select none
    &:hover
        background #dfdfdf
    .mail-item-info
        flex 1
        overflow hidden
        .mail-item-name
            color #1f2329
            font-size 14px
            over-ellipsis true
            flex 1
            margin-right 20px
        .mail-item-last-online-time
        .mail-item-intro
            font-size 12px
            color #999
            vertical-align center
            white-space nowrap
            over-ellipsis()
            flex 1
        .mail-item-info-header
            margin-bottom 3px
        .mail-item-last-online-time
            flex 2
</style>