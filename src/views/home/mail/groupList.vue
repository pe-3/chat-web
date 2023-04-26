<template>
  <div>
    <te-fold 
      @toggle="showList"
    >
      我的群组
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
        empty-text="暂无群组"
      >
        <mail-item
          v-for="(group, index) in list"
          :key="index"
          :data="group"
          :class="{['selected-item']: judgeSelect(index, 'group', group)}"
          @click="select(index, 'group')"       
        />
      </load-area>
    </div>
  </div>
</template>


<script>
import pageMixin from '@/mixins/page';
import mailItem from '@/components/mail/mailItem.vue';
const getGroupList = () => new Promise((resolve) => setTimeout(() => {
    resolve({})
}, 1000))
    
export default {
    name: 'AgreeList',
    components: {
        mailItem
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
                const data = await getGroupList();
                this.list = data.groupList ?? [];
                this.setPageSuccess();
            } catch (error) {
                this.setPageFail();
            }
        }
    }
}
</script>