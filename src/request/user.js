import ajax from "@/utils/ajax";

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
        method: 'put',
        url: '/user',
        data
    })
}