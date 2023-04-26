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
 * @file 加油包 -- 加载套件
*/

export default {
    name: 'LoadingArea',
    components: {
    },
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
         * 是否只加载一次
        */
        loadOnce: {
            type: Boolean,
            default: false
        },
        /**
         * 加载最低高度，css值
        */
        minHeight: {
            type: String,
            default: '0.50rem'
        },
        /**
         * 
        */
        failText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loadTime: 0
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