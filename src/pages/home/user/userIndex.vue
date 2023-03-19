<template>
    <div 
        class="user-index"
    >  
        <div class="user-index-content">
            <user-pic-card 
                :user="user"
                can-upload
            />
            <div class="user-index-more">
                <user-info-card
                    :user="user"
                />
                <!-- 编辑信息 -->
                <el-button 
                    type="primary" 
                    icon="el-icon-edit" 
                    circle
                    class="user-info-edit-btn"
                    size="medium"
                    @click="jump('./infoEdit')"
                />
                <!-- 信息编辑页 -->
                <transition
                    enter-class="none"
                    enter-to-class="animate__slideInRight"
                    leave-to-class="animate__slideOutRight"
                    leave-active-class="animate__animated"
                    enter-active-class="animate__animated"
                >
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import UserPicCard from '@/views/home/user/UserPicCard';
import UserInfoCard from '@/views/home/user/UserInfoCard.vue';

export default {
    name: 'user-index',
    components: {
        UserPicCard,
        UserInfoCard
    },
    computed: {
        ...mapState('auth', ['user'])
    },
    methods: {
    }
}
</script>

<style lang="stylus" scoped>
.user-index
    height 100%
    .user-index-content
        height 100%
        position relative
        min-width 700px
        width 43%
        margin 0 auto
    .user-index-more
        height calc(100% - 350px)
        padding 25px 30px
        font-size 14px
        color #4e4e4e
        position relative
        overflow hidden
        margin-top 5px
        .user-info-item
            margin-top 15px
            display flex
            align-item center
            .user-info-item-name
                font-weight bold
                margin-right 20px
                min-width 2em
    .user-info-edit-btn
        position absolute
        bottom 25px
        right 25px
        size 45px
        font-size 18px
</style>