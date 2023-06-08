<template>
  <div
    class="te-avatar"
    :style="{ width: size, height: size }"
  >
    <!-- 展示头像 -->
    <img
      v-if="!error"
      :src="src || DEFAULT_AVATAR"
      @error="error=true"
    >
    <div
      v-else 
      class="error"
    />
    <!-- 上传头像 -->
    <div 
      v-if="upload"
      class="te-avatar-upload" 
      @click="selectAvatar"
    >
      <!-- 触发上传，读入文件 -->	
      <i class="el-icon-camera" />
      <input 
        ref="fileInput"
        type="file"
        accept=".png,.jpg,.jpeg,.webp,.svg"
        @input="getAvatar"
      >
      <!-- 裁剪与展示选择的本地照片 -->
      <el-dialog
        width="50%"
        :visible.sync="showCutPhoto"
        append-to-body
      >
        <!-- 裁剪展示 -->
        <template slot="default">
          <cut-avatar
            ref="cutAvatar"
            :image="image"
          />
        </template>
        <!-- 底部按钮 -->
        <span slot="footer">
          <el-button 
            size="mini"
            @click="showCutPhoto = false"
          >
            取 消
          </el-button>
          <el-button 
            type="primary" 
            size="mini"
            @click="setAvatar"
          >
            保存
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
/**
 * @file 头像展示组件，内嵌头像裁剪和上传功能
 * @import_num 8 
 * 主要功能还是展示用户头像，可以通过 size 和 src 设置头像的尺寸和图片地址
 * 其次呢，通过 upload 功能开启头像上传功能
 */

import cutAvatar from '../user/cutAvatar.vue';
export default {
    name: 'TeAvatar',
    components: {
        cutAvatar
    },
    props: {
        size: {
            type: String,
            required: true
        },
        src: {
            type: String,
            default: ''
        },
        upload: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            showCutPhoto: false,
            image: '',
            error: false,
        }
    },
    methods: {
				// 从本地选中头像文件
        selectAvatar() {
            this.$refs.fileInput.click();
        },
				// 获取选中后的头像数据
        getAvatar(e) {
            if(!e.target.files[0]) return;
            this.image = e.target.files[0];
            this.showCutPhoto = true;
        },
				// 调用 cutAvatar 身上的方法设置头像
        async setAvatar() {
						// te-avatar 和 cut-avatar 两个组件本身就是耦合在一起的
						// 所以有 te-avatar 调用 cut-avatar 的方法，也不影响
						// 除非后续需要将 cut-avatar 升级为图片裁剪组件，就需要考虑 setAvatar 方法的解藕了
            await this.$refs.cutAvatar.setAvatar(); 
            this.showCutPhoto = false;
        }
    },

}
</script>

<style lang="stylus" scoped>
.te-avatar
    padding 10px
    box-sizing border-box
    cursor pointer
    position relative
    &:hover 
        .te-avatar-upload
            display grid
    img
        width 100%
        height 100%
        border-radius 50%
        box-sizing border-box
        border 2px solid white
    .error
        width 100%
        height 100%
        border-radius 50%
        box-sizing border-box
        border 2px solid white
    .te-avatar-upload
        position absolute
        top 12px
        left 12px
        height calc(100% - 24px)
        width calc(100% - 24px)
        background-color rgba(0 0 0 0.6)
        border-radius 50%
        grid-center true
        color white
        font-size 20px
        display none
        input
            display none
</style>