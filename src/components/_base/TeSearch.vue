<template>
    <el-input
        placeholder="搜索"
        class="te-search"
        prefix-icon="el-icon-search"
        size="small"
    />
</template>

<script>
export default {
    name: 'te-search'
}
</script>

<style lang="stylus" scoped>
.te-search
    >>>.el-input__inner
        border-radius 20px
</style>