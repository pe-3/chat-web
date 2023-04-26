<template>
  <div class="mail-index">
    <div class="mail-list">
      <div class="mail-list-header">
        <te-search />
        <te-gap />
        <el-popover
          v-model="showPopover"
          placement="bottom-end"
          popper-class="popper"
        >
          <!-- 弹出内容 -->
          <template slot="default">
            <add-item 
              add-icon="el-icon-s-comment"
              add-item-name="创建群组"
            />
            <add-item 
              add-icon="el-icon-plus"
              add-item-name="添加好友/群"
              @click="
                jump('./mailAdd'); 
                showPopover = false;
              "
            />
          </template>
          <!-- 弹出按钮 -->
          <te-add slot="reference" />
        </el-popover>
      </div>
      <div class="mail-list-wrapper">
        <agree-list 
          :select="select"
          :judge-select="judgeSelect"
        />
        <friend-list 
          :select="select"
          :judge-select="judgeSelect"
        />
        <group-list
          :select="select"
          :judge-select="judgeSelect"
        />
      </div>
      <transition
        enter-class="none"
        enter-to-class="animate__slideInRight"
        leave-to-class="animate__slideOutRight"
        leave-active-class="animate__animated"
        enter-active-class="animate__animated"
      >
        <router-view />
      </transition>
    </div>
    <div class="mail-content">
      <mail-detail
        :select-friend="selectFriend"
        :type="selectType"
      />
    </div>
  </div>
</template>

<script>
import addItem from '@/components/mail/addItem.vue';
import agreeList from '@/views/home/mail/agreeList.vue';
import friendList from '@/views/home/mail/friendList';
import groupList from '@/views/home/mail/groupList.vue';

import pageMinxi from '@/mixins/page';
import mailDetail from '@/views/home/mail/mailDetail';

export default {
    name: 'MailListIndex',
    components: {
        addItem,
        agreeList,
        friendList,
        groupList,
        mailDetail
    },
    mixins: [pageMinxi],
    data() {
        const MAIL = {
            mailIndex: -1,
            mailType: '',
            selectFriend: {},
            selectType: 'friend'
        }

        const SHOW = {
            showPopover: false
        }
        return {
            ...MAIL,
            ...SHOW
        }
    },
    created() {
        this.$root.$on('mailIndex-select-friend', (data, type) => {
            this.selectFriend = data;
            this.selectType = type ?? 'friend';
        });
        this.$once('hook:beforeDestory', () => {
            this.$root.$off('mailIndex-select-friend');
        });
    },
    methods: {
        select(index, type, data) {
            this.mailIndex = index;
            this.mailType = type;
            this.selectFriend = data;
            this.selectType = 'friend';
        },
        judgeSelect(index, type) {
            return index === this.mailIndex
            && this.mailType === type;
        }
    }
}
</script>

<style scoped lang="stylus">
.mail-index
    size 100%
    display flex
    .mail-list
        size 300px 100%
        border-right .1px solid #ededed
        position relative
        overflow hidden
        .mail-list-header
            flex-between true
            padding 10px 10px
        .mail-list-wrapper
            max-height calc(100% - 52px)
            overflow auto   
            >>>.mail-item-list
                padding 0 10px
    .mail-content
        flex 1
</style>