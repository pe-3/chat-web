<template>
  <div
    class="te-icon"
    @click="$emit('click')"
  >
    <i :class="icon" />
  </div>
</template>

<script>
/**
 * @file 当需要通过配置展示一些图标的时候可以用到
 * @import_num 1
 * @events click
 */
export default {
    name: 'TeIcon',
    props: {
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.te-icon
    cursor pointer
</style>