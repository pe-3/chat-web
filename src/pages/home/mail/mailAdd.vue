<template>
    <div class="mail-add">
        <div class="mail-add-header">
            <te-back/> 
            <div class="mail-add-switcher">
                <span 
                    :class="{['add-switch-select']: swith === 'people'}"
                    @click="swith = 'people'"
                >
                    找人
                </span>
                <span
                    :class="{['add-switch-select']: swith === 'group'}"
                    @click="swith = 'group'"
                >
                    找群
                </span>
            </div>
        </div>
        <div class="mail-add-search">
            <te-search
                :placeholder="`输入 ${swith === 'people' ? 'TE号/邮箱' : '群号/群名称'} 以查找`"
                v-model="search"
            />
        </div>
        <div class="mail-add-list">
            <add-fri-item 
                v-for="index in 10"
                :key="index"
            />
            <line-text
                pl="10px"
                pr="10px"
                line-color="#efefef"
            >
                到底了
            </line-text>
        </div>
    </div>
</template>

<script>
import addFriItem from '@/components/mail/addFriItem.vue';
export default {
    name: 'mail-add',
    components: {
        addFriItem
    },
    data() {
        return {
            swith: 'people',
            search: '',
            list: []
        }
    }
}
</script>

<style lang="stylus" scoped>
.mail-add
    position absolute
    size 100%
    top 0
    background white
    box-shadow -10px 0px 5px -5px rgba(0,0,0,0.1)
    .mail-add-header
        height 50px
        width 100%
        background-image: linear-gradient(270deg, #4e83fd, #3370ff);
        flex-between true
        padding 0 10px
        position relative
        .mail-add-switcher
            absolute-center true
            size 90px 25px
            flex-between true
            background white
            color #4e83fd
            border-radius 12.5px
            border .1px solid white
            cursor pointer
            span
                height 100%
                flex 1
                grid-center true
                font-size 13px
        i.el-icon-arrow-left
            color white
            font-size 18px
            font-weight bolder
    .mail-add-search
        padding 10px
    .mail-add-list
        max-height calc(100vh - 102px)
        overflow auto
        padding-bottom 15px
.add-switch-select
    background #4e83fd
    border-radius 12.5px
    color white

</style>