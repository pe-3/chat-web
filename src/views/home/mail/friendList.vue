<template>
    <div>
        <te-fold 
            @toggle="showList"
        >
            联系人
        </te-fold>
        <div class="mail-item-list" v-if="show">
            <load-area
                :load="{
                    pageLoading,
                    pageSuccess,
                    pageInited,
                    pageFail
                }"
                :page-empty="!list.length"
                empty-text="暂无好友"
            >
                <mail-item
                    v-for="(fri, index) in list"
                    :data="fri"
                    :key="fri.username"
                    :class="{['selected-item']: judgeSelect(index, 'newFri')}"
                    @click="select(index, 'newFri', fri)"
                />
            </load-area>
        </div>
    </div>
</template>

<script>
import pageMixin from '@/mixins/page';
import mailItem from '@/components/mail/mailItem.vue';
import {getFriendList} from '@/request/friend';
    
export default {
    name: 'agree-list',
    mixins: [pageMixin],
    components: {
        mailItem
    },
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
                const data = await getFriendList();
                this.list = data.friendList ?? [];
                this.setPageSuccess();
            } catch (error) {
                this.setPageFail();
            }
        },
        agreeFri(fri) {
            console.log(fri);
            this.list.push(fri);
        }
    },
    created() {
        this.$root.$on('firend-list-agree', this.agreeFri);
    }
}
</script>