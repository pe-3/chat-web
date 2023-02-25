<template>
    <div class="dialog-header flex-between">
        <te-avatar 
            :src="AVATAR"
            size="60px"
        ></te-avatar>
        <div class="dialog-name">好友名称</div>
        <div class="dialog-header-operator">
            <el-button
                icon="el-icon-check"
                circle
            />
            <el-button
                icon="el-icon-setting"
                circle
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'dialog-header',
    data() {
        return {
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.dialog-header
    border-bottom .1px solid #ededed
    padding 10px
    .te-avatar
        margin unset
    .dialog-name
        flex 1
        font-weight bold
    .dialog-header-operator
        .el-button
            border none
            font-size 20px
            margin-left 10px
</style>