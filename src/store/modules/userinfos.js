/**
 * @file 对其他用户信息进行存储，避免对用户的频繁请求
 */
export default {
    namespaced: true,
    state: {
        userinfos: {}
    },
    mutations: {
        addUsers(state, userinfo) {
            const username = userinfo.username;
            state.userinfos[username] = userinfo;
        }
    }
}