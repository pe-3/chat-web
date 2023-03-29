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
                    :icon="nav.icon"
                    :class="{
                        selcted: navIndex === index,
                        ['menu-icon']: true
                    }"
                    @click="navSelect(index)"
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
            <Keep-alive>
                <router-view></router-view>
            </Keep-alive>
        </div>
    </div>
</template>

<script>

import {LEFT_NAVS} from '../../config/page'
import { mapActions, mapMutations, mapState } from 'vuex';
import { $bus } from '@/store';
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
        ...mapState('auth', ['user', 'loginless', 'socket']),
    },
    created() {
        // 2. 请求用户个人信息，存在 vuex里 (做持久化？)
        this.getUserInfo().then(() => {
            this.loading = false;
        });

        $bus.$on('home-index-navchange', (path) => {
            this.navJudge(path);
        });

        this.navJudge(this.$router.currentRoute.fullPath);
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
            this.socket.close();
            this.jump('/sign/signin');
        },
        navSelect(navIndex) {
            const {path}  = this.LEFT_NAVS[navIndex];
            path && this.jump(path);
        },
        navJudge(path) {
            for(let i in this.LEFT_NAVS) {
                const navPath = this.LEFT_NAVS[i].path;
                if(path.indexOf(navPath) !== -1) {
                    return this.navIndex = Number(i);
                }
            }
            return this.navIndex = -1;
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