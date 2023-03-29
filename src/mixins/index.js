import path from 'path'
import { addQuery } from '@/utils'
export default {
    data() {
        return {
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
        jump(target, query) {
            const url = addQuery(target, query ?? {});
            if (target.slice(0, 1) !== '.') {
                return this.$router.push(url);
            }
            // 在这里可以记录跳转
            const { currentRoute } = this.$router;
            if (currentRoute && currentRoute.fullPath) {
                this.$router.push(
                    path.join(currentRoute.fullPath, url)
                );
                console.log(path.join(currentRoute.fullPath, url));
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