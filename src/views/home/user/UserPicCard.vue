<template>
  <div 
    class="user-index-card"
    :style="{
      backgroundImage:`url(${user.personal_back})`
    }"
  >
    <div class="user-index-detail">
      <te-avatar 
        :src="user.avatar || DEFAULT_AVATAR"
        size="100px"
        :upload="canUpload"
      />
      <div class="user-index-info">
        <div class="user-index-name">
          {{ user.nickname }}
        </div>
      </div>
    </div>
    <div 
      v-if="canUpload"
      class="user-index-upload-back" 
      @click="selectPerBack"
    >
      <input 
        ref="per_back_upload" 
        type="file"
        accept=".png,.jpg,.jpeg,.webp,.svg"
        @input="getPerBack"
      >
      <i class="el-icon-upload2" />
    </div>
  </div>
</template>

<script>
import {uploadPerback} from '@/request/upload';
import {updateUserInfo} from '@/request/user';
import store from '@/store';
import { mapMutations } from 'vuex';
export default {
    name: 'UserPicCard',
    props: {
        user: {
            type: Object,
            required: true
        },
        canUpload: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        selectPerBack() {
            this.$refs.per_back_upload.click();
        },
        async getPerBack(e) {
            if(!e.target.files[0]) return;
            try {
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('file', file);
                const res = await uploadPerback(formData);
                const {path} = res;
                await updateUserInfo({personal_back: path});
                this.setUser({...store.getters.user, personal_back: path });
            } catch (error) {
                console.warn(error.message);
            }
        },
        ...mapMutations('auth', ['setUser'])
    }
}
</script>

<style lang="stylus" scoped>
.user-index-card
    height 350px
    back-image()
    position relative
    border-radius 0 0 30px 30px
    cursor pointer
    &:before
        display inline-block
        content: ''
        position absolute
        top 0
        left 0
        background-color rgba(0, 0, 0, .4)
        height 100%
        width 100%
        border-radius 0 0 30px 30px
    .user-index-detail
        height 130px
        padding 20px 10px
        position absolute
        left 0 
        bottom 0
        display flex
        align-item center
        color white
        .user-index-info
            margin-left 10px
            .user-index-name
                height-center 100px
                font-size 34px
                font-weight bold
    .user-index-upload-back
        position absolute
        right 20px
        top 10px
        color white
        font-size 20px
        font-weight bolder
        display none
    input
        display none
    &:hover 
        .user-index-upload-back
            display unset
</style>