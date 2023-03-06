import ajax from '../utils/ajax';

/**
 * 用户登录
 * @param {Object} data 
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
 * @param {Object} data 
 * @param {String} data.username 
 * @param {String} data.password
 * @param {String} data.mail 
 * @param {String} data.code
 * @returns {Promise}
 */
export const signup = function(data) {
    return ajax({
        method: 'post',
        url: '/user/signup',
        data
    });
}
