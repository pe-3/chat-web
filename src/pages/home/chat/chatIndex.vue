<template>
  <div class="chat-index">
    <div class="chat-list">
      <div class="chat-list-header">
        <te-search />
        <te-gap />
        <te-add />
      </div>
      <div class="chat-list-wrapper">
        <load-area
          :page-empty="Object.keys(mychats).length === 0"
          :load="{
            pageLoading,
            pageSuccess,
            pageInited,
            pageFail
          }"
        >
          <chat-item
            v-for="(data, index) in mychats"
            :key="index"
            :data="data"
            :class="{['selected-item']: curChat.username === data.username}"
            @click="selectChat(data)"
          />
        </load-area>
      </div>
    </div>
    <div class="chat-dialog">
      <load-area
        :page-empty="JSON.stringify(curChat) === '{}'"
        :load="{
          pageLoading,
          pageSuccess,
          pageInited,
          pageFail
        }"
      >
        <dialog-header :data="curChat" />
        <dialog-msgs :data="curChat" />
      </load-area>
    </div>
  </div>
</template>

<script>
import pageMixin from '@/mixins/page';
import chatItem from '@/components/chat/chatItem.vue';
import dialogHeader from '@/components/dialog/dialogHeader';
import dialogMsgs from '@/components/dialog/dialogMsgs.vue';
import { mapState } from 'vuex';
import { getQuery } from '@/utils';
import { $bus } from '@/store';
import store from '@/store';
// import { getQuery } from '@/utils';
export default {
    name: 'ChatIndex',
    components: {
        chatItem,
        dialogHeader,
        dialogMsgs
    },
    mixins: [pageMixin],
    data() {
        return {
            curChat: {}
        }
    },
    computed: {
        ...mapState('chat', ['chats']),
        mychats() {
            return Object.keys(this.chats).filter(key => {
                return key.split('-')[0] === store.getters.username;
            }).reduce((pre, key) => {
                if(this.chats[key] && this.chats[key].avatar) {
                    pre[key.split('-')[1]] = this.chats[key];
                }
                return pre;
            }, {});
        }
    },
    watch: {
        '$route.query'() {
            this.selectChatByUrl();
        }
    },
    created() {
        this.selectChatByUrl();
        console.log(this.$router);
        $bus.$on('chat-index-chat-change', (chatwith) => {
            console.log(window.location.href.indexOf('/chat'));
            if(window.location.href.indexOf('/chat') === -1) {
                console.log('good');
                return this.jump('/chat', {
                    chatwith
                });
            }
            if(getQuery().chatwith === chatwith) return;
            this.queryChange({chatwith});
            this.curChat = this.mychats[chatwith];
        });
        $bus.$on('chat-index-select-chat', () => {
            this.selectChatByUrl();
        });
        this.setPageSuccess();
    },
    methods: {
        selectChatByUrl() {
            const {chatwith} = getQuery();
            if(chatwith) {
                this.curChat = this.mychats[chatwith];
            }
        },
        selectChat(data) {
            if(data === this.curChat) return;
            this.curChat = data;
            this.queryChange({
                chatwith: data.username
            });
        },
        queryChange(newQuery) {
            this.$router.push(
                {query: {...this.$router.query, ...newQuery}}
            );
        },
        getKey(chatwith) {
            return `${store.getters.username}-${chatwith}`;
        }  
    }
}
</script>

<style lang="stylus" scoped>
.chat-index
    size 100%
    display flex
    .chat-list
        size 300px 100%
        border-right .1px solid #ededed
        .chat-list-header
            flex-between true
            padding 10px 10px
        .chat-list-wrapper
            max-height calc(100% - 52px)
            overflow auto
    .chat-dialog
        flex 1
</style>

