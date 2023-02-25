<template>
    <div class="dialog-wrapper">
        <div class="dialog-msg-wrapper">
            <dialog-msg
                v-for="index in 20"
                :key="index"
            />        
            <te-gap
                orient="height"
                gap="80px"
            >    
                <line-text
                    pl="10px"
                    pr="10px"
                    line-color="#efefef"
                >
                    到底了
                </line-text>
            </te-gap>

        </div>
        <dialog-msg-edit/>
    </div>
</template>

<script>
import dialogMsgEdit from './dialogMsgEdit.vue';
import dialogMsg from './dialogMsg.vue';
export default {
    name: 'dialog-msgs',
    components: {
        dialogMsgEdit,
        dialogMsg
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="stylus" scoped>
.dialog-wrapper
    height calc(100% - 81px)
    overflow auto
    position relative
    margin-bottom 70px
    
    padding-top 10px
    box-sizing border-box
</style>