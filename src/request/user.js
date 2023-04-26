import ajax from "@/utils/ajax";
import store from "@/store";

/**
 * 查询用户个人信息
 * @returns {Promise}
 */
export function getUserInfo() {
    return ajax({
        method: 'get',
        url: '/user/info'
    });
}

/**
 * 修改用户个人信息
 * @param {Object} data 用户要修改的数据
 * 可以被修改的字段如下，全为非必填
 *  {
        'nickname', 昵称
        'avatar', 头像地址，所以上传头像有个前置上传请求和后置修改信息请求
        'intro', 个人介绍
        'user_set', 用户设置
        'phone', 电话
        'site', 地址
        'age', 年龄
        'birthday', 生日
        'gender', 性别
        'personal_back' 个性背景
    }
 */
export function updateUserInfo(data) {
    return ajax({
        method: 'post',
        url: '/user/update',
        data
    });
}

/**
 * 查找用户
 * @param {Object} params 查找的 query 参数 /user/find?username=xxx
 * 通过 store 做了一层缓存，避免每次请求重复的用户数据
 */
export function findUser(params) {
    /**
     * 做缓存
     */

    const username = params.username;
    if (store.getters.userinfos && store.getters.userinfos[username]) { // 判断是否有缓存
        const cache_info = store.getters.userinfos[username]; // 获取缓存信息
        if (cache_info.time + 1000 * 3600 > Date.now()) { // 缓存是否过期
            return Promise.resolve({
                userinfo: store.getters.userinfos[username]
            });
        }
    }

    // 无缓存或者过期则发送请求
    return new Promise((resolve, reject) => {
        ajax({
            method: 'get',
            url: '/user/find',
            params
        }).then(({ userinfo }) => {
            if (!userinfo) reject();
            resolve({ userinfo });
            store.commit('userinfos/addUsers', { ...userinfo, time: Date.now() });
        }).catch(err => {
            reject(err);
        });
    })
}
