<template>
  <div
    class="cut-avatar"
  >
    <div 
      class="cut-curtain"
    >
      <el-image
        ref="imageEl"
        :style="{
          width: `${width}px`,
          top: `${y}px`,
          left: `${x}px`
        }"
        :src="src"
        class="preview"
        draggable="false"
        @mousedown="dragStart"
        @mouseup="isDraging = false"
        @mousemove="drag"
        @mouseleave="isDraging = false"
      />
    </div>
    <el-slider
      v-model="enlargeTimes"
      :min="10"
    />
    <canvas 
      ref="cutCanvas" 
      width="100" 
      height="100"
      class="cut-canvas"
    />
  </div>
</template>

<script>
/**
 * @file 用户头像裁剪
 * @import_num 1
 */
import {uploadAvatar} from '@/request/upload'
import {updateUserInfo} from '@/request/user';
import {mapMutations} from 'vuex';
import store from '@/store';
export default {
    name: 'CutAvatar',
    props: {
        image: { // 传入的图片数据
            type: File,
            required: true
        }
    },
    data() {
        return {
            src:'',
            enlargeTimes: 10,
            photo: {
                width : 300,
                x: 0,
                y: 0
            },
            // 拖拽跟随
            isDraging: false,
            draged: false,
            // 鼠标相对位置
            mouseX: 0,
            mouseY: 0,
            // 图片一开始的位置
            initX: 0,
            initY: 0
        }
    },
    computed: {
        // 根据放大倍数自动计算图片的宽度，让其高度自适应
        width() {
            return this.photo.width * this.enlargeTimes / 10;
        },
        // 便携访问图片坐标
        x() {
            if(this.draged) return this.photo.x;
            return -(this.width / 2 - 150);

        },
        // 便携访问图片坐标
        y() {
            if(this.draged) return this.photo.y;
            return -(this.width / 2 - 150);
        },
        // 便携访问图片类型
        type() {
            return this.image.type;
        }
    },
    watch: {
        // 因为 el-dialog 是 v-show 控制的，所以第二次改变头像，就需要监听 image 是否发生改变，进而生成新的 src
        // 同时重置拖拽与放大参数，清空之前的绘制
        image() {
            this.$emit('cut-avatar', this.image);
            this.draged = false;
            this.enlargeTimes = 10;
            this.clearCanvas();
        },
        // 监听放大倍数，对 photo 对象进行操作
        enlargeTimes() {
            this.draged = false;
            if(this.enlargeTimes === 10) { // 缩回去重置坐标
                this.photo.x = 0;
                this.photo.y = 0;
            }
        }
    },
    created() {
        const reader = new FileReader();
        // 将图像文件转化为 src(base64)
        reader.addEventListener("load", () => {
            this.src = reader.result;
        }, false);
        // 暴露事件，图像更改用 reader 重新读取
        this.$on('cut-avatar', (img) => reader.readAsDataURL(img));
        // 首次加载，读取图像
        if (this.image) {
            reader.readAsDataURL(this.image);
        }
    },
    mounted() {
        this.$on('set-avatar', (cb) => {
            console.log('执行了吗');
            this.setAvatar().then(() => cb());
        });
    },
    methods: {
        // 开始拖拽，在鼠标按下的时候执行
        // 初始化一些参数
        dragStart(event) {
            this.isDraging = true;

            const {clientX, clientY} = event;
            
            // 鼠标刚开始的位置
            this.mouseX = clientX;
            this.mouseY = clientY;
            // 图片刚开始的位置
            this.initX = this.x;
            this.initY = this.y;
        },
        // 进行拖拽
        drag(event) {
            if(!this.isDraging || this.enlargeTimes <= 10) return;
            if(!this.draged) {this.draged = true}

            // initX、Y 是开始拖拽时候的位置，
            // event.clientX、Y - this.mouseX、Y 是移动的相对位置
            const resx = this.initX + event.clientX - this.mouseX;
            const resy = this.initY + event.clientY - this.mouseY;

            // 读取图片的宽高
            const photoWidth = event.target.offsetWidth;
            const photoHeight = event.target.offsetHeight;
            
            // 用来判断是否移动出了边界，禁止移动出边界 ！！！
            if(resx > -(photoWidth - 300) && resx < 0) {
                this.photo.x = resx;
            }
            if(resy > -(photoHeight - 300) && resy < 0) {
                this.photo.y = resy;
            }
        },
        // 压缩头像
        // 在 canvas 上等比例缩放，压缩图片像素点序列
        drawImageOnCanvas() {
            const ctx = this.$refs.cutCanvas.getContext('2d');
            ctx.clearRect(0, 0, 300, 300);
            const [x, y] = this.enlargeTimes > 10 ? [this.x, this.y] : [this.photo.x, this.photo.y];

            const {offsetWidth, offsetHeight} = this.$refs.imageEl.$el.firstChild;

            // 300 * 300 压缩为 100 * 100，像素点缩小 9 倍
            ctx.drawImage(
                this.$refs.imageEl.$el.firstChild ,
                x / 3, y / 3, offsetWidth / 3 , offsetHeight / 3 ,
            );

            // 绘制完成，读取 cavans 上的像素数据，这个像素数据后台是需要专门处理转化的，具体看 chat-server
            const imageData = ctx.getImageData(0, 0, 100, 100);
            // TODO: 是否要进行将服务器的对 imageData 的处理放在本地执行，减少服务器压力
            return imageData;
        },
        clearCanvas() {
            const ctx = this.$refs.cutCanvas.getContext('2d');
            ctx.clearRect(0, 0, 300, 300);
        },
        ...mapMutations('auth', ['setUser']),
        // 调用压缩图片方法，获取压缩后的图像数据，转化为 File 文件发送给后端处理
        // 前置请求：上传头像
        // 后置请求：修改头像链接
        async setAvatar() {
            try {
                const imageData = this.drawImageOnCanvas();

                // 对 图像数据做一系列处理 unit8Array -> Blob -> File -> FormData
                const unit8Array = new Uint8Array(imageData.data.buffer);
                const blob = new Blob([unit8Array.buffer], { type: 'image/png' });
                const file = new File([blob], 'image.png', { type: 'image/png' });
                const formData = new FormData();
                formData.append('file', file);

                // 前置请求
                const res = await uploadAvatar(
                    formData
                );
                const {path} = res;

                // 后置请求：设置头像
                await updateUserInfo({
                    avatar: path
                });
                
                // 修改本地缓存
                this.setUser({...store.getters.user, avatar: path});
            } catch (error) {
                this.$warn(error.message);
            }
        }
    }
}
</script>

<style scoped lang="stylus">
.cut-avatar
    padding 30px 100px
    background-color white
    grid-center true
    .cut-curtain
        position relative
        size 300px
        overflow hidden
        .preview    
            cursor pointer
    .cut-canvas
        display none
        margin-top 10px
</style>