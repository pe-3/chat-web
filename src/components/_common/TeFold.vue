<template>
  <div
    class="te-fold"
    @click="toggle"
  >
    <!-- 折叠图标 -->
    <i
      v-if="isExpand"
      class="el-icon-arrow-down"
    />
    <i
      v-else
      class="el-icon-arrow-right"
    />
    <!-- 折叠栏目 -->
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
/**
 * @file 折叠组件，用来这点展示
 * @import_num 3
 * slot 插入折叠展示的内容，比如朋友列表
 * 但是并不主动帮展示内容隐藏或展示，只操作图标展示 ？？？ 这一块设计是否有问题
 */
export default {
    name: 'TeFold',
    data() {
        return { // 是否展开
            isExpand: false
        }
    },
    methods: {
        toggle() { // 切换的方法
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