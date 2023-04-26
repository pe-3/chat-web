import ajax from "@/utils/ajax";

/**
 * 
 * @param {FormData} imageData 用户头像数据，直接拿到的肯定很大，用 canvas 压缩一下
 * @returns 
 */
export function uploadAvatar(imageData) {
    return ajax({
        url: '/upload/avatar',
        method: 'post',
        data: imageData
    });
}

/**
 * 
 * @param {FormData} perbackData 用户个性背景数据，直接上传
 * @returns 
 */
export function uploadPerback(perbackData) {
    return ajax({
        url: '/upload/perback',
        method: 'post',
        data: perbackData
    });
}