import { getUserInfo } from '@/request/user';

export default {
    namespaced: true,
    state: {
        token: '',
        user: {},
        loginless: false
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        setLoginLess(state, loginless) {
            state.loginless = loginless;
        }
    },
    actions: {
        async getUserInfo({ commit }) {
            try {
                const res = await getUserInfo();
                if (res.info) {
                    commit('setUser', res.info);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}