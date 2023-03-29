import axios from "axios";
import { Lock } from "@/utils";
import qs from 'qs'
import store from "@/store";
import { Message } from 'element-ui';

// 1. 创建 axios 实例，设置超时时间和基础路径
const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000
});

// 2. 创建一个请求池，一个请求不能发送两次

const reqLock = new Lock();

// 3. 构建默认参数 （token、id、timeStamp)
const defaultParams = function () {
    const params = {

    };

    return params;
}
// (4.) 区分 mock 和线上环境
// (5.) 接口调试模式？？？
// 6. 请求配置兜底
// 7. 设置请求拦截器和响应转化器

let requsetConfig;
service.interceptors.request.use(
    config => {
        requsetConfig = config;
        // 配置默认传参
        const params = defaultParams();
        const queryString = qs.stringify(params);
        const prefix = config.url.indexOf('?') > -1 ? '&' : '?';
        if (queryString) {
            config.url += prefix + queryString;
            if (config.method === 'post') {
                config.data && Object.assign(config.data, params);
            }
        }
        // 设置token
        if (config.url.indexOf('sign') === -1) {
            config.headers = config.headers ?? {};
            config.headers.authorization = store.getters.token;
        }

        // 同一请求不能并发
        if (reqLock.add(config.url)) {
            return Promise.reject({ holdback: true });
        }

        return config;
    },
    error => Promise.reject(error)
);

service.interceptors.response.use((response = {}) => {
    const { config, status } = response;
    if (status >= 500) {
        return Message({
            type: 'error',
            message: '后台出错了，请稍后'
        })
    }
    reqLock.remove(config.url);
    const { message, success, data } = response.data;
    Message({
        type: success ? 'success' : 'warning',
        message
    });
    if (!success) return;
    return data ?? {};
}, error => {
    const config = error.config ?? requsetConfig;
    reqLock.remove(config.url);
    console.log(error);
    Message({
        type: 'error',
        message: '后台出错了，请稍后'
    });
});

// 8. 处理请求抛错
const MAX_RETRY_NUM = 3;

export default async function ajax(config, retry = 0) {
    try {
        const data = await service(config);
        return data;
    } catch (error) {
        console.log(error);
        if (retry < MAX_RETRY_NUM) {
            return ajax(config, retry + 1);
        }
        else {
            reqLock.remove(config.url);
        }
    }
}