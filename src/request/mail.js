import ajax from "@/utils/ajax"

/**
 * 
 * @param {String} mail
 * @returns {Promise}
 * 获取邮箱验证码
 */
export const getMailCode = function (mail) {
    return ajax({
        method: 'post',
        url: '/mail',
        data: {
            action: 'code',
            mail
        }
    });
}