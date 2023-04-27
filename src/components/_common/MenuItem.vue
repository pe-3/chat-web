<template>
  <div
    class="menu-item"
    @click="$emit('click')"
  >
    <!-- 菜单项的内容 -->
    <span>
      <slot />
    </span>

    <!-- 菜单列表项右边图标，一般是箭头 -->
    <i
      v-if="!$slots.icon"
      class="el-icon-arrow-right"
    />
    <slot
      v-else
      name="icon"
    />
  </div>
</template>

<script>
/**
 * @file 展示类组件，用来展示菜单列表项
 * @import_num 1
*/
export default {
    name: 'SettingItem'
}
</script>

<style lang="stylus" scoped>
.menu-item   
    flex-between true
    padding 0 10px
    height-center 40px
    cursor pointer
    &:hover
        background #dfdfdf
</style>