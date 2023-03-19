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
            <div class="bottom">
                <el-button 
                    type="primary" 
                    circle 
                    icon="el-icon-chat-line-round"
                    size="medium"
                />
            </div>
        </div>
    </load-area>
</template>

<script>
import page from '@/mixins/page';
import UserPicCard from '../user/UserPicCard.vue';
import UserInfoCard from '../user/UserInfoCard.vue';
export default {
    name: 'mail-detail',
    mixins: [page],
    components: {
        UserPicCard,
        UserInfoCard
    },
    props: {
        selectFriend: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isUserEmpty() {
            return JSON.stringify(this.selectFriend) === '{}';
        }
    },
    watch: {
        selectFriend() {
            !this.isUserEmpty && this.setPageSuccess();
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
        bottom 30px
        text-align right
        padding 0 30px
        right 0
        .el-button
            size 45px
            font-size 18px
</style>