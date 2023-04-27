<template>
  <div
    class="add-fri-item"
    @click="showFriend"
  >
    <te-avatar
      :src="data.avatar"
      size="60px"
    />
    <div class="add-fri-item-info">
      <div class="add-fri-item-info-header flex-between">
        <div class="add-fri-item-name">
          {{ data.nickname }}
        </div>
      </div>
      <div class="add-fri-item-intro">
        {{ data.intro }}
      </div>   
      <el-button 
        v-if="!isSelf(data)"
        class="add-fri-btn"
        size="mini"
        @click="_addFriend"
      >
        添加
      </el-button>
      <span 
        v-else
        class="self-tag"    
      >自己</span>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import {addFriend} from '@/request/friend'
export default {
    name: 'AddFriItem',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        isSelf(data) {
            return data.username === store.getters.user.username
        },
        async _addFriend() {
            try {
                await addFriend(this.data.username);
            } catch (error) {
                console.warn(error.message);
            }
        },
        showFriend() {
            this.$root.$emit('mailIndex-select-friend', this.data, 'add');
        }
    }
}
</script>

<style lang="stylus" scoped>
.add-fri-item
    padding-right 10px
    flex-between true
    letter-spacing .2px
    cursor pointer
    user-select none
    &:hover
        background #dfdfdf
    .add-fri-item-info
        flex 1
        overflow hidden
        position relative
        .add-fri-item-name
            color #1f2329
            font-size 14px
            over-ellipsis true
            flex 1
            margin-right 20px
        .add-fri-item-intro
            font-size 12px
            color #999
            vertical-align center
            over-ellipsis(65%)
        .add-fri-item-info-header
            margin-bottom 3px
        .add-fri-btn
        .self-tag
            position absolute
            right 10px
            top 50% 
            transform translate(0, -50%)
        .self-tag
            font-size 14px
            color #666
</style>