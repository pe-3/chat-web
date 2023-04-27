<template>
  <el-input
    class="te-search"
    prefix-icon="el-icon-search"
    size="small"
    type="text"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script>
/**
 * @file 专门对搜索做的一个封装
 * @import_num 3
 */
export default {
    name: 'TeSearch',
    props: {
        value: { // 用来实现 v-model
            type: String,
            default: ''
        },
        placeholder: { 
            type: String,
            default: '搜索'
        }
    }
}
</script>

<style lang="stylus" scoped>
.te-search
    >>>.el-input__inner
        border-radius 20px
</style>