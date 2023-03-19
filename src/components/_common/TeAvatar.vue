<template>
    <div class="te-avatar" :style="{ width: size, height: size }">
        <img :src="src ?? DEFAULT_AVATAR" alt="头像">
        <div 
            v-if="upload"
            class="te-avatar-upload" 
            @click="selectAvatar"
        >
            <i class="el-icon-camera"></i>
            <input 
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.svg"
                ref="fileInput"
                @input="getAvatar"
            >
            <el-dialog
                width="50%"
                :visible.sync="showCutPhoto"
                append-to-body
            >
                <template slot="default">
                    <cut-avatar :image="image" ref="cutAvatar"/>
                </template>
                <span slot="footer">
                    <el-button 
                        @click="showCutPhoto = false"
                        size="mini"
                    >
                        取 消
                    </el-button>
                    <el-button 
                        type="primary" 
                        @click="setAvatar "
                        size="mini"
                    >
                        保存
                    </el-button>
                  </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
import cutAvatar from '../user/cutAvatar.vue';
export default {
    name: 'te-avatar',
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
            required: true
        },
        upload: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        selectAvatar() {
            this.$refs.fileInput.click();
        },
        getAvatar(e) {
            if(!e.target.files[0]) return;
            this.image = e.target.files[0];
            this.showCutPhoto = true;
        },
        async setAvatar() {
            await this.$refs.cutAvatar.setAvatar(); 
            this.showCutPhoto = false;
        }
    },
    data() {
        return {
            showCutPhoto: false,
            image: '',
        }
    }
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