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
        ></div>
        <div class="line-center">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'line-text',
    props: {
        offset: {
            type: String,
            default: '0px'
        },
        pr: {
            type: String
        },
        pl: {
            type: String
        },
        lineColor: {
            type: String
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
        color #ddd
        font-size 12px

</style>