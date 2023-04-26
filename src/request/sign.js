import ajax from '../utils/ajax';

/**
 * 用户登录
 * @param {Object} data 登陆表单数据
 * @param {String} data.username
 * @param {String} data.password
 * @returns {Promise}
 */
export const signin = function(data) {
    return ajax({
        method: 'post',
        url: '/user/signin',
        data
    });
};

/**
 * 用户注册
 * @param {Object} data 注册表单数据
 * @param {String} data.username 
 * @param {String} data.password 
 * @param {String} data.mail 获取验证码的邮箱地址
 * @param {String} data.code 从邮箱获取到的验证码
 * @returns {Promise}
 */
export const signup = function(data) {
    return ajax({
        method: 'post',
        url: '/user/signup',
        data
    });
}
