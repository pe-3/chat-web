<template>
    <el-input
        class="te-search"
        prefix-icon="el-icon-search"
        size="small"
        :class="{['text-center']: textCenter}"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        @input="$emit('input', $event)"
    />
</template>

<script>
export default {
    name: 'te-search',
    props: {
        placeholder: {
            type: String,
            default: '搜索'
        },
        textCenter: {
            type: Boolean,
            default: false
        },
        value: {
            type: String,
        },
        type: {
            type: String,
            default: 'text'
        }
    }
}
</script>

<style lang="stylus" scoped>
.te-search
    >>>.el-input__inner
        border-radius 20px
.text-center
    >>>.el-input__inner
        text-align center
</style>