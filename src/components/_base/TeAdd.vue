<template>
    <el-button 
        size="small" 
        circle 
        icon="el-icon-plus"
        @click="$emit('click')"
    />
</template>

<script>
export default {
    name: 'te-add'
}
</script>