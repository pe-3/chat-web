<template>
  <div
    class="te-gap"
    :style="{ [orient]: gap }"
  >
    <slot />
  </div>
</template>

<script>
/**
 * @file 添加间距，横向或者纵向，可以用来添加一些安全距离
 * @import_num 6
 * 有时候选择器设置间距没有那么方便点时候可以借助这个去方便点插入间距
 * 便携式插入间距，比单独设置类名方便
 */
export default {
    name: 'TeGap',
    props: {
        gap: {
            type: String,
            default: '10px'
        },
        orient: {
            type: String,
            default: 'width'
        }
    }
}
</script>

<style lang="stylus" scoped>
.te-gap
    display inline-block
</style>