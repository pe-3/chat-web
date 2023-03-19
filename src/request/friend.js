/**
 * 朋友模块
 */
import { addQuery } from "@/utils"
import ajax from "@/utils/ajax"

/**
 * 请求朋友列表
 */

export function getFriendList() {
    return ajax({
        method: 'get',
        url: '/friend/friList'
    });
}

/**
 * 请求好友申请列表
 */

export function getNewFriendList() {
    return ajax({
        method: 'get',
        url: '/friend/agreeList'
    });
}

/**
 * 发送好友申请
 */

export function addFriend(friend) {
    return ajax({
        method: 'get',
        url: addQuery('/friend/add', { friend }),
    });
}

/**
 * 同意好友申请
 */

export function agreeFriend(friend) {
    return ajax({
        method: 'get',
        url: addQuery('/friend/agree', { friend })
    });
}