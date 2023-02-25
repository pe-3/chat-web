import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter); // 注册路由系列组件

Vue.mixin({
    methods: {
        jump(path) {
            // 在这里可以记录跳转
            this.$router.push(path);
        }
    }
})

// 引入路由列表
const getPage = require.context(
    '../pages',
    true,
    /.vue$/
);

// 得到路由列表
const routelist = getPage.keys().reduce((pre, path) => {

    const resolvePath = function(rawPath) {
        return rawPath
                .replace('.vue', '')
                .replace('./', '')
                .split('/');
    }

    const paths = resolvePath(path);

    if(paths[paths.length - 1].match(/Index$/)) {
        paths.pop();
    }

    return [
        ...pre, 
        {
            parent: paths[paths.length - 2],
            path:paths[paths.length - 1],
            component: getPage(path).default || getPage(path)
        }
    ]

}, []);

// 将路由树状化
const map = new Map()
const routes = routelist.reduce((pre, route) => {
    // 创建未初始化的父级路由
    const {parent} = route;
    delete route.parent;

    if(parent) {
        if(!map.get(parent)) {
            const parentRoute = {
                path: `/${parent}`
            }
            map.set(parent, parentRoute);
        }
        const parentRoute = map.get(parent);
        if(typeof parentRoute.children === 'object') {
            parentRoute.children.push(route);
        }
        else {
            parentRoute.children = [route];
        }
    }
    else {
        const {path} = route;
        const parentRoute = map.get(path) || {...route, ...{path: `/${path}`}};
        if(!parentRoute.component) {
            parentRoute.component = route.component;
        }
        pre.push(parentRoute);

        if(path === 'home') {
            parentRoute.path = '/';
            parentRoute.alias = '/home';
        }
        else if(path === 'notfund') {
            parentRoute.path = '*';
            parentRoute.alias = '/notfund';
        }
    }

    return pre
}, []);

// 传入路由列表，创建路由器
const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;