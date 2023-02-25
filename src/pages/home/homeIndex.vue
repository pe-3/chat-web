<template>
    <div class="home-index">
        <!-- 左菜单列表 -->
        <div class="left-menu">
            <!-- 头像，进入主页 -->
            <te-avatar 
                size="60px"
                :src="AVATAR"
            />
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

export default {
    name: 'home-index',
    data() {
        return {
            LEFT_NAVS,
            navIndex: 0,
        }
    },
    watch: {
        navIndex(index) {
            if(index === -1) return;
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
        const currentPath = this.$router.currentRoute.fullPath;
        // 刷新后重置路由
        this.navIndex = (() => {
            for(let i = 0; i < this.LEFT_NAVS.length; i ++) {
                if(
                    this.LEFT_NAVS[i].path &&
                    this.LEFT_NAVS[i].path.split('/').pop() === 
                    currentPath.split('/').pop()
                ) {
                    return i;
                }
            }
            return -1;
        })();
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
</style>