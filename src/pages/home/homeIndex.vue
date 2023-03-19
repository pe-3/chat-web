<template>
    <div 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        class="home-index"
    >
        <!-- 左菜单列表 -->
        <div class="left-menu">
            <!-- 头像，进入主页 -->
            <el-popover
                placement="right-start"
                :offset="10"
                :visible-arrow="false"
                v-model="showPopver"
            >
                <te-avatar 
                    size="60px"
                    :src="user.avatar || DEFAULT_AVATAR"
                    slot="reference"
                />
                <template slot="default">
                    <div class="setting-card">
                        <div 
                            class="user-card"
                            :style="{
                                backgroundImage: user.personal_back ? `url(${user.personal_back})` : 'linear-gradient(-150deg, #222222 15%, #373737 70%, #3c4859 94%)'
                            }"
                        >
                            <te-avatar 
                                size="80px"
                                :src="user.avatar || DEFAULT_AVATAR"
                                upload
                            />
                            <div class="user-info">
                                <div class="user-name">{{user.nickname}}</div>
                                <div class="user-intro">{{user.intro}}</div>
                            </div>
                        </div>
                        <div class="setting-list">
                            <te-gap orient="height"></te-gap>
                            <setting-item @click="jump('/user');showPopver = false;">个人中心</setting-item>
                            <setting-item>设置</setting-item>
                            <setting-item>我的二维码和链接</setting-item>
                            <te-gap orient="height" class="divide-line"></te-gap>
                            <setting-item @click="logOut">退出登录</setting-item>
                        </div>
                    </div>                    
                </template>
            </el-popover>

            <!-- 菜单列表，进入不同页 -->
            <div class="menu-list">
                <te-icon 
                    v-for="nav,index in LEFT_NAVS"
                    :key="index"
                    class="menu-icon"
                    :class="{selcted: navIndex === index}"
                    :icon="nav.icon"
                    @click="navIndex = index"
                />
            </div>
            <div class="menu-list bottom-menu">
                <te-icon 
                    class="menu-icon"
                    icon="el-icon-more"
                />
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import {LEFT_NAVS} from '../../config/page'
import { mapActions, mapMutations, mapState } from 'vuex';
export default {
    name: 'home-index',
    data() {
        return {
            LEFT_NAVS,
            navIndex: 0,
            canWatch: false,
            showPopver: false,
            loading: true,
        }
    },
    computed: {
        ...mapState('auth', ['user', 'loginless'])
    },
    watch: {
        navIndex(index) {
            if(index === -1 || !this.canWatch) return;
            const currentPath = this.$router.currentRoute.fullPath;
            const {path} = this.LEFT_NAVS[index];
            // 首次不跳转
            if(
                    path &&
                    path.split('/').pop() !== 
                    currentPath.split('/').pop()
            ) {
                this.jump(path);
            }
        }
    },
    created() {
        // 1. 路由匹配，对应 tab 显示高亮 

        const currentPath = this.$router.currentRoute.fullPath;
        // 刷新后重置路由
        this.navIndex = (() => {
            for(let i = 0; i < this.LEFT_NAVS.length; i ++) {
                if(
                    this.LEFT_NAVS[i].path &&
                    this.LEFT_NAVS[i].path.split('/').splice(1, 1)[0] === 
                    currentPath.split('/').splice(1, 1)[0]
                ) {
                    return i;
                }
            }
            return -1;
        })();

        this.$nextTick(() => {
            this.canWatch = true;
        });

        // 2. 请求用户个人信息，存在 vuex里 (做持久化？)
        this.getUserInfo().then(() => {
            this.loading = false;
        });
    },
    methods: {
        ...mapActions({
            getUserInfo: 'auth/getUserInfo'
        }),
        ...mapMutations('auth', ['setToken', 'setUser']),
        logOut() {
            //是否免登录，免登录则不删除token
            this.setToken('');
            this.setUser({});
            this.jump('/sign/signin');
        }
    }
}
</script>

<style lang="stylus">
.home-index
    display flex
    height 100vh
    min-height 600px
    .left-menu
        background-color #465069
        width 60px
        padding 20px 0
        position relative
        .menu-list
            margin-top 10px
            width 100%
            .menu-icon
                width 100%
                height 60px
                grid-center true
                font-size 26px
                color #999
                cursor pointer
                &:hover
                    color #eee
            .selcted
                background-image linear-gradient(270deg,#4e83fd,#3370ff)
                color white
        .bottom-menu
            position absolute
            bottom 14px
    .main
        flex 1
.setting-card
    width 320px
    border-radius 4px 
    overflow hidden
    .user-card
        padding 25px 10px
        display flex
        back-image()
        .user-info
            max-width calc(100% - 80px)
            .user-name
                font-size 24px
                color white
                font-weight bold
                height-center 55px
                letter-spacing .6px
            .user-intro
                font-size 13px
                color white
                margin-top 10px
                transform translate(0, -13px)
                padding-right 10px
    .setting-list
        padding 10px 0
</style>