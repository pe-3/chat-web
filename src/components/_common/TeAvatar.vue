<template>
    <div class="te-avatar" :style="{ width: size, height: size }">
        <img :src="src" alt="头像">
    </div>
</template>

<script>
export default {
    name: 'te-avatar',
    props: {
        size: {
            type: String,
            require: true
        },
        src: {
            type: String,
            require: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.te-avatar
    padding 10px
    box-sizing border-box
    cursor pointer
    img
        width 100%
        height 100%
        border-radius 50%
        box-sizing border-box
        border 2px solid white
</style>