<template>
    <div class="dialog-msg-edit-wrapper">
       <div class="dialog-msg-edit">
            <input 
                type="text" 
                placeholder="发送消息给 你的朋友"
            />
            <div class="dialog-msg-btn-list">
                <span>
                    <i class="el-icon-circle-plus-outline"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dialog-msg-edit'
}
</script>

<style lang="stylus" scoped>
.dialog-msg-edit-wrapper
    width calc(100% - 360px)
    position fixed
    bottom 0px
    padding 10px 30px 15px
    box-sizing border-box
    background white
    .dialog-msg-edit
        box-sizing border-box
        width 100%
        height 45px
        padding 20px

        border .3px solid #ddd
        border-radius 4px
        
        flex-between true
        
        input 
            border none
            width 100%
            letter-spacing .2px
            &::placeholder
                color rgb(143, 149, 158)
        .dialog-msg-btn-list
            font-size 22px
            color rgb(143, 149, 158)
</style>