import ajax from "@/utils/ajax"

/**
 * 
 * @param {String} mail 邮箱地址
 * @returns {Promise}
 * 获取邮箱验证码
 */
export function getMailCode (mail) {
    return ajax({
        method: 'post',
        url: '/mail',
        data: {
            action: 'code',
            mail
        }
    });
}