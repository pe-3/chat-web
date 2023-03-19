<template>
    <div class="cut-avatar" ref="">
        <div 
            class="cut-curtain"
        >
            <el-image
                :style="{
                    width: `${width}px`,
                    top: `${y}px`,
                    left: `${x}px`
                }"
                :src="src"
                class="preview"
                draggable="false"
                ref="imageEl"
                @mousedown="dragStart"
                @mouseup="isDraging = false"
                @mousemove="drag"
                @mouseleave="isDraging = false"
            />
        </div>
        <el-slider v-model="enlargeTimes" :min="10"></el-slider>
        <canvas 
            width="100" 
            height="100" 
            ref="cutCanvas"
            class="cut-canvas"
        />        

    </div>
</template>

<script>
import {uploadAvatar} from '@/request/upload'
import { updateUserInfo } from '@/request/user';
import { mapMutations } from 'vuex';
import store from '@/store';
export default {
    name: 'cut-avatar',
    props: {
        image: {
            type: File,
            requried: true,
        }
    },
    computed: {
        width() {
            return this.photo.width * this.enlargeTimes / 10;
        },
        x() {
            if(this.draged) {return this.photo.x}
            return -(this.width / 2 - 150);
        },
        y() {
            if(this.draged) {return this.photo.y}
            return -(this.width / 2 - 150);
        },
        type() {
            return this.image.type;
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
            initX: 0,
            initY: 0
        }
    },
    watch: {
        image() {
            this.$emit('cut-avatar', this.image);
            this.draged = false;
            this.enlargeTimes = 10;
            this.clearCanvas();
        },
        enlargeTimes() {
            this.draged = false;
            if(this.enlargeTimes === 10) {
                this.photo.x = 0;
                this.photo.y = 0;
            }
        }
    },
    created() {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            this.src = reader.result;
        }, false);

        this.$on('cut-avatar', (img) => reader.readAsDataURL(img));

        if (this.image) {
            reader.readAsDataURL(this.image);
        }
    },
    methods: {
        drag(event) {
            if(!this.isDraging || this.enlargeTimes <= 10) return;
            if(!this.draged) {this.draged = true}

            const resx = this.initX + event.clientX - this.mouseX;
            const resy = this.initY + event.clientY - this.mouseY;

            const photoWidth = event.target.offsetWidth;
            const photoHeight = event.target.offsetHeight;
            if(resx > -(photoWidth - 300) && resx < 0) {
                this.photo.x = resx;
            }
            if(resy > -(photoHeight - 300) && resy < 0) {
                this.photo.y = resy;
            }
        },
        dragStart(event) {
            this.isDraging = true;

            const {clientX, clientY} = event;
            
            this.mouseX = clientX;
            this.mouseY = clientY;
            this.initX = this.x;
            this.initY = this.y;
        },
        drawImageOnCanvas() {
            const ctx = this.$refs.cutCanvas.getContext('2d');
            ctx.clearRect(0, 0, 300, 300);
            const [x, y] = this.enlargeTimes > 10 ? [this.x, this.y] : [this.photo.x, this.photo.y];

            const {offsetWidth, offsetHeight} = this.$refs.imageEl.$el.firstChild;

            ctx.drawImage(
                this.$refs.imageEl.$el.firstChild ,
                x / 3, y / 3, offsetWidth / 3 , offsetHeight / 3 ,
            );

            const imageData = ctx.getImageData(0, 0, 100, 100);

            return imageData;
        },
        clearCanvas() {
            const ctx = this.$refs.cutCanvas.getContext('2d');
            ctx.clearRect(0, 0, 300, 300);
        },
        ...mapMutations('auth', ['setUser']),
        async setAvatar() {
            try {
                const imageData = this.drawImageOnCanvas();

                const unit8Array = new Uint8Array(imageData.data.buffer);

                // 将 ImageData 对象转换为 Blob 对象
                const blob = new Blob([unit8Array.buffer], { type: 'image/png' });
                console.log(imageData);

                // 将 Blob 对象转换为 File 对象
                const file = new File([blob], 'image.png', { type: 'image/png' });

                // 创建 FormData 对象
                const formData = new FormData();

                // 将 File 对象添加到 FormData 对象中
                formData.append('file', file);

                const res = await uploadAvatar(
                    formData
                );
                const {path} = res;

                // 设置头像
                await updateUserInfo({
                    avatar: path
                });
                
                this.setUser({...store.getters.user, avatar: path});
            } catch (error) {
                this.$warn(error.message);
            }
        }
    },
    mounted() {
        this.$on('set-avatar', (cb) => {
            console.log('执行了吗');
            this.setAvatar().then(() => cb());
        });
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