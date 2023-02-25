<template>
    <div class="te-icon" @click="$emit('click')">
        <i :class="icon"></i>
    </div>
</template>

<script>
export default {
    name: 'te-icon',
    props: {
        icon: {
            type: String,
            require: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.te-icon
    cursor pointer
</style>