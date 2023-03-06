import store from "@/store";
export default (to, from, next) => {
    const { fullPath: pathTo } = to;
    const { fullPath: pathFrom } = from;

    // console.log('from', pathFrom);
    // console.log('to', pathTo);
    if (pathFrom === '/') {
        if (pathTo === '/sign/signIn') {
            if (store.getters.token && store.getters.loginless) {
                return next('/chat');
            }
        }
        else {
            // 非登录页，没有token，自动跳转到登录页
            if (!store.getters.token && pathTo !== '/sign/singIn') {
                return next('/sign/signIn');
            }
            else if (pathTo === '/') {
                return next('/chat');
            }
        }
    }
    next();
}