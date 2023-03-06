<template>
    <div 
        class="user-index"
    >  
        <div class="user-index-content">
            <div 
                class="user-index-card"
                :style="{
                    backgroundImage:`url(${personal_back})`
                }"
            >
                <div class="user-index-detail">
                    <te-avatar 
                        :src="avatar || DEFAULT_AVATAR"
                        size="100px"
                        upload
                    />
                    <div class="user-index-info">
                        <div class="user-index-name">{{nickname}}</div>
                    </div>
                </div>
                <div class="user-index-upload-back" @click="selectPerBack">
                    <input 
                        type="file" 
                        ref="per_back_upload"
                        accept=".png,.jpg,.jpeg,.webp,.svg"
                        @input="getPerBack"
                    />
                    <i class="el-icon-upload2"></i>
                </div>
            </div>
            <div class="user-index-more">
                <!-- 个人信息 -->
                <div class="user-info-item">
                    <span class="user-info-item-name">性别</span>
                    <span class="user-info-item-value">男</span>
                </div>
                <div class="user-info-item">
                    <span class="user-info-item-name">年龄</span>
                    <span class="user-info-item-value">20岁</span>
                </div>
                <div class="user-info-item">
                    <span class="user-info-item-name">生日</span>
                    <span class="user-info-item-value">12.12</span>
                </div>
                <te-gap orient="height" class="divide-line"></te-gap>
                <!-- 账号信息 -->
                <div class="user-info-item">
                    <span class="user-info-item-name">账号</span>
                    <span class="user-info-item-value keynote">{{username}}</span>
                </div>
                <div class="user-info-item">
                    <span class="user-info-item-name">邮箱</span>
                    <span class="user-info-item-value">{{mail}}</span>
                </div>
                <div class="user-info-item">
                    <span class="user-info-item-name">电话</span>
                    <span class="user-info-item-value">{{phone}}</span>
                </div>
                <!-- 其他信息 -->
                <te-gap orient="height" class="divide-line"></te-gap>
                <div class="user-info-item">
                    <span class="user-info-item-name">地区</span>
                    <span class="user-info-item-value">{{site}}</span>
                </div>
                <div class="user-info-item">
                    <span class="user-info-item-name">签名</span>
                    <div class="user-info-item-content">
                        {{ intro }}
                    </div>
                </div>
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
import { mapMutations, mapState } from 'vuex';
import {uploadPerback} from '@/request/upload';
import {updateUserInfo} from '@/request/user';
import store from '@/store';

export default {
    name: 'user-index',
    created() {
        console.log(this.BACK_IMAGE)
    },
    computed: {
        ...mapState('auth', {
            nickname: state => state.user.nickname,
            avatar: state => state.user.avatar,
            mail: state => state.user.mail,
            phone: state => state.user.phone,
            site: state => state.user.site,
            intro: state => state.user.intro,
            username: state => state.user.username,
            personal_back: state => state.user.personal_back
        })
    },
    methods: {
        selectPerBack() {
            this.$refs.per_back_upload.click();
        },
        async getPerBack(e) {
            if(!e.target.files[0]) return;
            try {
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('file', file);
                const res = await uploadPerback(formData);
                this.$success(res.message);
                const {path} = res;
                const res2 = await updateUserInfo({personal_back: path});
                this.$success(res2.message);
                this.setUser({...store.getters.user, personal_back: path });
            } catch (error) {
                console.warn(error.message);
            }
        },
        ...mapMutations('auth', ['setUser'])
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
    .user-index-card
        height 350px
        back-image()
        position relative
        border-radius 0 0 30px 30px
        cursor pointer
        &:before
            display inline-block
            content: ''
            position absolute
            top 0
            left 0
            background-color rgba(0, 0, 0, .4)
            height 100%
            width 100%
            border-radius 0 0 30px 30px
        .user-index-detail
            height 130px
            padding 20px 10px
            position absolute
            left 0 
            bottom 0
            display flex
            align-item center
            color white
            .user-index-info
                margin-left 10px
                .user-index-name
                    height-center 100px
                    font-size 34px
                    font-weight bold
        .user-index-upload-back
            position absolute
            right 20px
            top 10px
            color white
            font-size 20px
            font-weight bolder
            display none
        input
            display none
        &:hover 
            .user-index-upload-back
                display unset
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