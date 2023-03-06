import ajax from "@/utils/ajax"

/**
 * 
 * @param {Object} data 
 * @param {String} data.mail
 * @returns {Promise}
 */
export const getMail = function(data) {
    return ajax({
        method: 'post',
        url: '/mail',
        data
    });
}