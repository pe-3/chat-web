<template>
    <div class="agree-item">
        <te-avatar
            :src="data.avatar"
            size="60px"
        />
        <div class="agree-item-info">
            <div class="agree-item-info-header flex-between">
                <div class="agree-item-name">{{data.nickname}}</div>
            </div>
            <div class="agree-item-intro">
                {{data.intro}}
            </div>   
            <el-button 
                class="add-fri-btn"
                size="mini"
                @click="_agreeFriend"
            >
                    同意
            </el-button>
   
        </div>
    </div>
</template>

<script>
import {agreeFriend} from '@/request/friend'
export default {
    name: 'agree-item',
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        async _agreeFriend() {
            try {
                const res = await agreeFriend(this.data.username);
                this.$success(res.message);
                this.$emit('agree-item-agree', this.data);
            } catch (error) {
                this.$warn(error.message);
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.agree-item
    padding-right 10px
    flex-between true
    letter-spacing .2px
    cursor pointer
    user-select none
    &:hover
        background #dfdfdf
    .agree-item-info
        flex 1
        overflow hidden
        position relative
        .agree-item-name
            color #1f2329
            font-size 14px
            over-ellipsis true
            flex 1
            margin-right 20px
        .agree-item-intro
            font-size 12px
            color #999
            vertical-align center
            over-ellipsis(65%)
        .agree-item-info-header
            margin-bottom 3px
        .add-fri-btn
        .self-tag
            position absolute
            right 10px
            top 50% 
            transform translate(0, -50%)
        .self-tag
            font-size 14px
            color #666
</style>