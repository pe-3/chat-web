<template>
    <div class="mail-index">
        <div class="mail-list">
            <div class="mail-list-header">
                <te-search/>
                <te-gap/>
                <el-popover
                    placement="bottom-end"
                    popper-class="popper"
                    v-model="showPopover"
                >
                    <!-- 弹出内容 -->
                    <template slot="default">
                        <add-item 
                            add-icon="el-icon-s-comment"
                            add-item-name="创建群组"

                        />
                        <add-item 
                            add-icon="el-icon-plus"
                            add-item-name="添加好友/群"
                            @click="
                                jump('./mailAdd'); 
                                showPopover = false;
                            "
                        />
                    </template>
                    <!-- 弹出按钮 -->
                    <te-add slot="reference"/>
                </el-popover>
            </div>
            <div class="mail-list-wrapper">
                <te-fold 
                    @toggle="showNewFriend = $event"
                >
                    新的好友
                </te-fold>
                <div class="mail-item-list" v-if="showNewFriend">
                    <mail-item
                        v-for="index in 10"
                        :key="index"
                        @click="select(index, 'newFri')"
                        :class="{['selected-item']: judgeSelect(index, 'newFri')}"       
                    />
                </div>
                <te-fold 
                    @toggle="showFriend = $event"
                >
                    联系人
                </te-fold>
                <div class="mail-item-list" v-if="showFriend">
                    <mail-item
                        v-for="index in 10"
                        :key="index"
                        @click="select(index, 'fir')"
                        :class="{['selected-item']: judgeSelect(index, 'fir')}"       
                    />
                </div>
                <te-fold 
                    @toggle="showGroup = $event"
                >
                    我的群组
                </te-fold>
                <div class="mail-item-list" v-if="showGroup">
                    <mail-item
                        v-for="index in 5"
                        :key="index"
                        @click="select(index, 'group')"
                        :class="{['selected-item']: judgeSelect(index, 'group')}"       
                    />
                </div>
            </div>
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
        <div class="mail-detail">

        </div>
    </div>
</template>

<script>
import mailItem from '@/components/mail/mailItem.vue';
import addItem from '@/components/mail/addItem.vue';
export default {
    name: 'mail-list-index',
    components: {
        mailItem,
        addItem
    },
    data() {
        return {
            mailIndex: 0,
            showFriend: false,
            showNewFriend: false,
            showGroup: false,
            showPopover: false,
            mailType: '',
        }
    },
    methods: {
        select(index, type) {
            this.mailIndex = index;
            this.mailType = type;
        },
        judgeSelect(index, type) {
            return index === this.mailIndex
            && this.mailType === type;
        }
    }
}
</script>

<style scoped lang="stylus">
.mail-index
    size 100%
    display flex
    .mail-list
        size 300px 100%
        border-right .1px solid #ededed
        position relative
        overflow hidden
        .mail-list-header
            flex-between true
            padding 10px 10px
        .mail-list-wrapper
            max-height calc(100% - 52px)
            overflow auto   
            .mail-item-list
                padding 0 10px
    .mail-dialog
        flex 1
</style>