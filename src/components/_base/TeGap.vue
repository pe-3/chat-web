<template>
    <div class="te-gap" :style="{ [orient]: gap }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'te-gap',
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