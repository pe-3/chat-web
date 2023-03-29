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