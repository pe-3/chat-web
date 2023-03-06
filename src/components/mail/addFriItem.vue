<template>
    <div class="add-fri-item">
        <te-avatar
            :src="AVATAR"
            size="60px"
        />
        <div class="add-fri-item-info">
            <div class="add-fri-item-info-header flex-between">
                <div class="add-fri-item-name">王德发</div>
            </div>
            <div class="add-fri-item-intro">
                无个性不签名
            </div>
            <el-button 
                class="add-fri-btn"
                size="mini"
            >
                添加
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'add-fri-item',
    data() {
        return {

        }
    }
}
</script>

<style lang="stylus" scoped>
.add-fri-item
    padding-right 10px
    flex-between true
    letter-spacing .2px
    cursor pointer
    user-select none
    &:hover
        background #dfdfdf
    .add-fri-item-info
        flex 1
        overflow hidden
        position relative
        .add-fri-item-name
            color #1f2329
            font-size 14px
            over-ellipsis true
            flex 1
            margin-right 20px
        .add-fri-item-intro
            font-size 12px
            color #999
            vertical-align center
        .add-fri-item-info-header
            margin-bottom 3px
        .add-fri-btn
            position absolute
            right 10px
            top 50% 
            transform translate(0, -50%)
</style>