<template>
  <div
    ref="msgWrapper"
    class="dialog-wrapper"
  >
    <div 
      class="dialog-msg-wrapper"
    >
      <dialog-msg
        v-for="({msg, to, time}, index) in curMsgs"
        :key="index"
        :msg="msg"
        :is-me="to === 'me'"
        :avatar="getAvatar(to)"
        :time="parseTime(time)"
      />        
      <te-gap
        orient="height"
        gap="80px"
      >    
        <te-line-text
          v-if="curMsgs.length> 20"
          pl="10px"
          pr="10px"
          line-color="#efefef"
        >
          到底了
        </te-line-text>
        <te-line-text
          v-else-if="!curMsgs.length"
          pl="10px"
          pr="10px"
          line-color="#fff"
          color="#444"
        >
          快发条消息给他吧
        </te-line-text>
      </te-gap>
    </div>
    <dialog-msg-edit 
      @enter="sendMsgs"
    />
  </div>
</template>

<script>
import dialogMsgEdit from './dialogMsgEdit.vue';
import dialogMsg from './dialogMsg.vue';
import { mapMutations, mapState } from 'vuex';
import store from '@/store';
import { $bus } from '@/store';
import { parseTime } from '@/utils';

export default {
    name: 'DialogMsgs',
    components: {
        dialogMsgEdit,
        dialogMsg
    },
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            curMsgs: []
        }
    },
    computed: {
        ...mapState('chat', ['msgs']),
        ...mapState('auth', ['socket']),
        key() {
            return `${store.getters.username}-${this.data.username}`;
        }
    },
    watch: {
        data: {
            immediate: true,
            handler() {
                this.curMsgs = this.getMsgs();
                this.scrollToBottom();
            }
        }
    },
    methods: {
        ...mapMutations('chat', ['setMsgs', 'setLastMsg', 'clearUnread']),
        parseTime,
        getMsgs() {
            if(!this.msgs) {
                return [];
            }
            const {key} = this;
            return this.msgs[key] ?? [];
        },
        getAvatar(to) {
            if(to === this.data.username) {
                return store.getters.user.avatar;
            }
            else {
                return this.data.avatar;
            }
        },
        scrollToBottom(byme) {
            this.$nextTick(() => {
                // 滚动底部
                const msgWrapper = this.$refs.msgWrapper;
                msgWrapper && msgWrapper.scrollTo({
                    behavior: 'smooth',
                    top: msgWrapper.scrollHeight + 100
                });
                // 清除未读
                !byme && this.clearUnread({
                    username: this.data.username
                });
            })
        },
        sendMsgs(msg) {
            const {username} = this.data;
            const sendTime = Date.now();
            // 发送消息
            this.socket.send({
                type: 'private',
                message: {
                    from: {
                        username: store.getters.username,
                        nickname: store.getters.user.nickname
                    },
                    to: username,
                    text: msg,
                    time: sendTime
                }
            }, () => {
                // 缓存消息
                const key = this.key;
                this.setMsgs({
                    key,
                    data: {
                        to: username,
                        msg,
                        time: sendTime
                    }
                });
                // 刷新列表
                this.curMsgs = this.getMsgs();
                this.scrollToBottom(true);
                // 记录最近一条消息
                this.setLastMsg({
                    username,
                    msg: `我：${msg}`,
                    time: sendTime
                });
            });
        },
    },
    created() {
        this.curMsgs = this.getMsgs();
        $bus.$on('dialog-msgs-reload', () => {
            this.curMsgs = this.getMsgs();
            this.scrollToBottom();
        });
        this.$once('hook:destory', () => {
            $bus.$off('dialog-msgs-reload');
        });
    }
}
</script>

<style lang="stylus" scoped>
.dialog-wrapper
    height calc(100% - 81px)
    overflow auto
    position relative
    margin-bottom 70px
    
    padding-top 10px
    box-sizing border-box
</style>