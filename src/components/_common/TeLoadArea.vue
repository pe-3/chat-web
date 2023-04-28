<template>
  <div 
    class="loading-area"
    :style="{'min-height': minHeight}"
  >
    <!-- 1.加载中 -->
    <template v-if="pageLoading">
      <div
        v-if="!$slots.load"
        class="slot-loading"
      >
        <!-- 默认加载中 -->
        <i class="el-icon-loading" />
      </div>
      <slot
        v-else
        name="load"
      />
    </template>
    <!-- 2.加载失败 -->
    <template v-else-if="pageFail">
      <div v-if="!$slots.fail">
        <!-- 默认加载失败 -->
        <el-empty 
          :description="failText ?? '暂无数据'"
        />
      </div>
      <slot
        v-else
        name="fail"
      />
    </template>
    <!-- 3.暂无数据 -->
    <template v-else-if="pageEmpty">
      <div
        v-if="!$slots.empty"
        class="slot-empty"
      >
        <el-empty 
          :description="emptyText ?? '暂无数据'"
        />
      </div>
      <slot
        v-else
        name="empty"
      />
    </template>
    <!-- 4.加载成功 -->
    <template v-else-if="pageSuccess">
      <slot />
    </template>
  </div>
</template>

<script>
/**
 * @file 加载区域，对加载做的一个封装
 * @import_num 5
 * 除了加载成功需要用户传入对应的状态以外，其他加载状态对应都有默认展示的组件，如果用户想自定义，也可以通过 slot 传入。
*/

export default {
    name: 'LoadArea',
    props: {
        /**
         * 加载状态对象
         * @param {Boolean} load.pageLoading
         * @param {Boolean} load.pageSuccess
         * @param {Boolean} load.pageFail
         * @param {Boolean} load.pageInited
        */
        load: {
            type: Object,
            required: true
        },
        /**
         * 数据是否为空
        */
        pageEmpty: {
            type: Boolean,
            required: true
        },
        /**
         * 空的时候展示的文字
        */
        emptyText: {
            type: String,
            default: ''
        },
        /**
         * 加载最低高度，css值
        */
        minHeight: {
            type: String,
            default: '0.50rem'
        },
        /**
         * 加载失败的展示文字
        */
        failText: {
            type: String,
            default: ''
        }
    },
    computed: {
        pageLoading() { return this.load.pageLoading },
        pageSuccess() { return this.load.pageSuccess },
        pageFail() { return this.load.pageFail },
        pageInited() { return this.load.pageInited }
    }
}
</script>

<style lang="stylus" scoped>
.loading-area
    height 100%
    position relative
    .default-loading
        absolute left right top 50%
        transform translateY(-50%)
    .default-error
        padding 0 0 rem(25) !important
    .slot-loading
        text-align center
    .slot-empty
        height 100%
        >>>.el-empty
            height 100%
</style>