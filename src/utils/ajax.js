import axios from "axios";
import { Lock } from "@/utils";
import qs from 'qs'

// 1. 创建 axios 实例，设置超时时间和基础路径
const service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000
});

// 2. 创建一个请求池，一个请求不能发送两次
const reqLock = new Lock();

// 3. 构建默认参数 （token、id、timeStamp)
const defaultParams = function() {
    const params = {
        token: 'token'
    };

    return params;
}
// (4.) 区分 mock 和线上环境
// (5.) 接口调试模式？？？
// 6. 请求配置兜底
// 7. 设置请求拦截器和响应转化器
let requestConfig = {};

service.interceptors.request.use(
    config => {
        // 报错时，传递给的配置
        requestConfig = config;
        console.log(requestConfig); 
        // 配置默认传参
        const params = defaultParams();
        const queryString = qs.stringify(params);
        const prefix = config.url.indexOf('?') > -1 ? '&' : '?';
        if(queryString) {
            config.url += prefix + queryString;
            if(config.method === 'post') {
                config.data && Object.assign(config.data, params);
            }
        }

        // 同一请求不能并发
        if(reqLock.add(config.url)) {
            return Promise.reject({holdback: true});
        }

        return config;
    },
    error => Promise.reject(error)
);

service.interceptors.response.use((response = {}) => {
    return response.data;
}, error => {
    console.log(error);
});

// 8. 处理请求抛错
const MAX_RETRY_NUM = 3;

export default async function ajax(config, retry = 0) {
    try {
        const data = await service(config);
        return data;
    } catch (error) {
        console.log(error);
        if(retry < MAX_RETRY_NUM) {
            return ajax(config, retry + 1);
        }
    }
}