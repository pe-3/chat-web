import Vue from 'vue'
import VueRouter from 'vue-router'
import guard from './guard';

Vue.use(VueRouter); // 注册路由系列组件

// 引入路由列表
const getPage = require.context(
    '../pages',
    true,
    /.vue$/
);

// 得到路由列表
const routelist = getPage.keys().reduce((pre, path) => {

    const resolvePath = function (rawPath) {
        return rawPath
            .replace('.vue', '')
            .replace('./', '')
            .split('/');
    }

    const paths = resolvePath(path);

    if (paths[paths.length - 1].match(/Index$/)) {
        paths.pop();
    }
    const [newPath, parent] = paths.reverse();
    return [
        ...pre,
        {
            path: newPath,
            parent: parent,
            component: getPage(path).default || getPage(path)
        }
    ];
}, []);

// 将路由树状化
function listToTree(routeList) {
    const map = new Map();
    routeList.forEach(item => map.set(item.path, item));
    const res = [];
    routeList.forEach(route => {
        const { parent } = route;
        delete route.parent;
        if (parent && map.has(parent)) {
            const parentRoute = map.get(parent);
            parentRoute.children = parentRoute.children || [];
            parentRoute.children.push(route)
        }
        else {
            res.push(route);
        }
    });
    return res;
}

const routes = listToTree(routelist);

routes.forEach(route => {
    if (route.path === 'home') {
        route.path = '/';
        route.alias = '/home';
    }
    else if (route.path === 'notfund') {
        route.path = '*';
        route.alias = '/notfund';
    }
    else {
        route.path = `/${route.path}`;
    }
})

// 传入路由列表，创建路由器
const router = new VueRouter({
    mode: 'history',
    routes
});

// 注册一些路由守卫
router.beforeEach(guard);

export default router;