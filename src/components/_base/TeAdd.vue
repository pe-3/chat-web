<template>
  <el-button 
    size="small" 
    circle 
    icon="el-icon-plus"
    @click="$emit('click')"
  />
</template>

<script>
/**
 * @file 添加圆按钮组件
 * @import_num 2
 * 暴露事件：click
 */
export default {
    name: 'TeAdd'
}
</script>