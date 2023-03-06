<template>
    <div class="setting-item" @click="$emit('click')">
        <span class="setting-item-name">
            <slot></slot>
        </span>
        <i class="el-icon-arrow-right"></i>
    </div>
</template>

<script>
export default {
    name: 'setting-item'
}
</script>

<style lang="stylus" scoped>
.setting-item   
    flex-between true
    padding 0 10px
    height-center 40px
    cursor pointer
    &:hover
        background #dfdfdf
</style>