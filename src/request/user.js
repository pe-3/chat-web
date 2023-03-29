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
 */
export function findUser(params) {
    /**
     * 做缓存
     */

    const username = params.username;
    if (store.getters.userinfos && store.getters.userinfos[username]) {
        const cache_info = store.getters.userinfos[username];
        if (cache_info.time + 1000 * 3600 > Date.now()) {
            return Promise.resolve({
                userinfo: store.getters.userinfos[username]
            });
        }
    }

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
