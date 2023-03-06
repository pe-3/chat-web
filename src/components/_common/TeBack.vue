<template>
    <i 
        class="el-icon-arrow-left"
        @click="jump('../')"
        :style="{color}"
    ></i>
</template>

<script>
export default {
    name: 'te-back',
    props: {
        color: {
            type: String,
            default: 'white'
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-icon-arrow-left
    font-size 16px
    font-weight bolder
    cursor pointer
</style>