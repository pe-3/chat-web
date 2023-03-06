import ajax from "@/utils/ajax";

export function uploadAvatar(imageData, headers) {
    return ajax({
        url: '/upload/avatar',
        method: 'post',
        data: imageData,
        headers
    });
}

export function uploadPerback(perbackData) {
    return ajax({
        url: '/upload/perback',
        method: 'post',
        data: perbackData
    });
}