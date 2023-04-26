<template>
  <load-area 
    :load="{
      pageLoading,
      pageSuccess,
      pageInited,
      pageFail
    }"
    :page-empty="isUserEmpty"
    empty-text="暂无选择"
  >
    <div class="mail-detail">
      <user-pic-card
        :user="selectFriend"
      />
      <user-info-card
        :user="selectFriend"
      />
      <div
        v-if="type === 'friend'"
        class="bottom"
      >
        <el-button 
          icon="el-icon-chat-line-round"
          size="medium"
          @click="initAChat"
        >
          发起对话
        </el-button>
        <el-popover 
          trigger="click"
          placement="right-end"
        >
          <div class="more-operate">
            <el-button type="info">
              拉黑
            </el-button>
            <el-button type="danger">
              删除
            </el-button>
          </div>
          <i
            slot="reference"
            class="el-icon-more"
          />
        </el-popover>
      </div>
      <div
        v-else
        class="bottom"
      >
        <el-button
          icon="el-icon-plus"
        >
          添加好友
        </el-button>
      </div>
    </div>
  </load-area>
</template>

<script>
import page from '@/mixins/page';
import UserPicCard from '../user/UserPicCard.vue';
import UserInfoCard from '../user/UserInfoCard.vue';
import { mapMutations, mapState } from 'vuex';
import { $bus } from '@/store';
export default {
    name: 'MailDetail',
    components: {
        UserPicCard,
        UserInfoCard
    },
    mixins: [page],
    props: {
        selectFriend: {
            type: Object,
            default: () => ({})
        },
        /**
         * 详情页的类型，是 好友展示，还是添加展示 
         * friend or add
         * */
        type: {
            type: String,
            default: 'friend'
        }
    },
    computed: {
        isUserEmpty() {
            return JSON.stringify(this.selectFriend) === '{}';
        },
        ...mapState('chat', ['chats'])
    },
    watch: {
        selectFriend() {
            !this.isUserEmpty && this.setPageSuccess();
        }
    },
    methods: {
        ...mapMutations('chat',['addChatItem']),
        initAChat() {
            this.addChatItem(this.selectFriend);
            this.jump('/chat', {
                chatwith: this.selectFriend.username
            });
            this.$nextTick(() => {
                $bus.$emit('chat-index-select-chat');
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
>>>.mail-detail
    margin 0 auto
    max-width 55%
    min-width 650px
    height 100%
    position relative
    .bottom
        position absolute
        bottom 20px
        padding 0 30px
        right 0
        .el-icon-more
            transform rotate(90deg)
            color #999
            margin-left 20px
            cursor pointer
.more-operate
    display grid
    gird-template-rows 1fr 1fr
    .el-button 
        margin-left 0 !important
        margin-top 5px
</style>