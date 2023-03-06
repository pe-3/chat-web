<template>
    <div class="add-item" @click="$emit('click')">
        <i :class="addIcon"></i>        
        <span>{{addItemName}}</span>
    </div>
</template>

<script>
export default {
    name: 'add-item',
    props: {
        addIcon: {
            type: String
        },
        addItemName: {
            type: String
        }
    }
}
</script>

<style lang="stylus" scoped>
.add-item
    width 100%
    height-center 40px
    padding 0 10px
    box-sizing border-box
    cursor pointer
    &:hover
        background #ddd
    span
        margin-left 10px
</style>