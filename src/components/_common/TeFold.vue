<template>
    <div class="te-fold" @click="toggle">
        <!-- 折叠图标 -->
        <i class="el-icon-arrow-down" v-if="isExpand"></i>
        <i class="el-icon-arrow-right" v-else></i>
        <!-- 折叠栏目 -->
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'te-fold',
    data() {
        return {
            isExpand: false
        }
    },
    methods: {
        toggle() {
            this.isExpand = !this.isExpand;
            this.$emit('toggle', this.isExpand);
        }
    }
}
</script>

<style lang="stylus" scoped>
.te-fold
    width 100%
    padding-left 20px
    font-size 14px
    user-select none
    height-center 40px
    i
        color #a3a3a3
        font-weight bold
    span
        color #333
        margin-left 10px
</style>