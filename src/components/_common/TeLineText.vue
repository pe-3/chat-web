<template>
  <div 
    class="line-text" 
    :style="{
      transform: `translate(0,${offset})`,
      padding: `0 ${pl}`
    }"
  >
    <div 
      class="line"
      :style="{
        background: lineColor
      }"
    />
    <div class="line-center">
      <slot />
    </div>
  </div>
</template>

<script>
/**
 * @file 底部划线文字，展示类似底部提升的样子，像这样：  ------- 提示文字/链接 --------
 * @type 全局组件，展示类组件，含有插槽，用来插入文字或者锚点
 * @import_num 4
 */

export default {
    name: 'LineText',
    props: {
        offset: { // 上下偏移
            type: String,
            default: '0px'
        },
        pr: { // padding-right
            type: String,
            required: true
        },
        pl: { // padding-left
            type: String,
            required: true
        },
        lineColor: { // 线条的颜色
            type: String,
            required: true
        },
        color: { // 字的颜色
            type: String,
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.line-text
    margin-top 10px
    position relative
    .line
        height 1px
        background #666
        width 100%
    .line-center
        margin 0 auto
        text-align center
        background white
        position absolute
        absolute-center true
        padding 0 10px
        color #999
        font-size 12px

</style>