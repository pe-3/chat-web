import store from "@/store";
import { $bus } from "@/store";
export default (to, from, next) => {
    const { fullPath: pathTo } = to;
    const { fullPath: pathFrom } = from;

    if (pathFrom === '/') {
        if (pathTo === '/sign/signIn') {
            if (store.getters.token && store.getters.loginless) {
                $bus.$emit('home-index-navchange', 'chat');
                return next('/chat');
            }
        }
        else {
            // 非登录页，没有token，自动跳转到登录页
            if (!store.getters.token && pathTo !== '/sign/singIn') {
                return next('/sign/signIn');
            }
            else if (pathTo === '/') {
                $bus.$emit('home-index-navchange', '/chat');
                return next('/chat');
            }
        }
    }
    next();
    $bus.$emit('home-index-navchange', pathTo);
}