<template>
  <i 
    class="el-icon-arrow-left"
    :style="{color}"
    @click="jump('../')"
  />
</template>

<script>
/**
 * @file 返回跳转的组件，返回上一级页面
 * @import_num 2
 */
export default {
    name: 'TeBack',
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