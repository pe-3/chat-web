import path from 'path'
export default {
    data() {
        return {
            AVATAR: 'https://internal-api-lark-file.feishu.cn/api/avatar/v1/v2_a606ad91-7193-4b6b-bced-e554544f9c6g/72x72_q70.image',
            BACK_IMAGE: 'http://localhost:3000/static/images/back.jpeg',
            DEFAULT_AVATAR: 'http://localhost:3000/static/images/public.jpeg'
        }
    },
    methods: {
        $success(message) {
            this.$message({
                type: 'success',
                message
            })
        },
        $warn(message) {
            this.$message({
                type: 'warning',
                message
            });
        },
        jump(target) {
            if (target.slice(0, 1) !== '.') {
                return this.$router.push(target);
            }
            // 在这里可以记录跳转
            const { currentRoute } = this.$router;
            if (currentRoute && currentRoute.fullPath) {
                this.$router.push(
                    path.join(currentRoute.fullPath, target)
                );
                console.log(path.join(currentRoute.fullPath, target));
            }
        },
        $msgBox(msg, title, confirm = '确定', cancel = '取消') {
            return this.$confirm(msg, title, {
                confirmButtonText: confirm,
                cancelButtonText: cancel,
                type: 'info',
                center: true
            });
        }
    },
}