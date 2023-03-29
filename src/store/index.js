/**
 * 集中状态管理文件，暴露 store
 */

// 1. 引入并使用 Vuex
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import cache from './cache';

Vue.use(Vuex);

// 2. 引入所有模块
const getModule = require.context('./modules', false, /.js$/);

const modules = getModule.keys().reduce((modules, path) => {
    const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = getModule(path);
    modules[moduleName] = value.default;
    return modules;
}, {});

// 3. 通过 isProd 区分开发环境和生产
const isProd = process.env.NODE_ENV !== 'production';

// 4. 做一些状态持久化

// 5. 实例化 store 并且暴露
export default new Vuex.Store({
    strict: isProd,
    modules,
    getters,
    plugins: [cache]
});

export const $bus = new Vue();