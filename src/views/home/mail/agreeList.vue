<template>
  <div>
    <te-fold 
      @toggle="showList"
    >
      好友申请
    </te-fold>
    <div
      v-if="show"
      class="mail-item-list"
    >
      <load-area
        :load="{
          pageLoading,
          pageSuccess,
          pageInited,
          pageFail
        }"
        :page-empty="!list.length"
        empty-text="暂无好友申请"
      >
        <agree-item
          v-for="(fri, index) in list"
          :key="fri.username"
          :data="fri"
          :class="{['selected-item']: judgeSelect(index, 'newFri')}"
          @click="select(index, 'newFri', fri)"
          @agree-item-agree="agree"
        />
      </load-area>
    </div>
  </div>
</template>

<script>
import pageMixin from '@/mixins/page';
import agreeItem from '@/components/mail/agreeItem.vue';
import {getNewFriendList} from '@/request/friend';
    
export default {
    name: 'AgreeList',
    components: {
        agreeItem
    },
    mixins: [pageMixin],
    props: {
        judgeSelect: {
            type: Function,
            required: true
        },
        select: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            show: false,
            list: []
        }
    },
    methods: {
        showList($event) {
            this.show = $event;
            if($event && !this.list.length) {
                this.getList();
            }
        },
        async getList() {
            this.setPageLoading();
            try {
                const data = await getNewFriendList();
                this.list = data.agreeList ?? [];
                this.setPageSuccess();
            } catch (error) {
                this.setPageFail();
            }
        },
        agree(agreeFri) {
            this.list = this.list.filter(item => item.username !== agreeFri.username);
            this.$root.$emit('firend-list-agree', agreeFri);
        },
    }
}
</script>