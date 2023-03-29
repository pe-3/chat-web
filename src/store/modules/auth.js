import { getUserInfo } from '@/request/user';
import Socket from '@/socket';

export default {
    namespaced: true,
    state: {
        token: '',
        user: {},
        loginless: false,
        socket: null
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
        },
        setSocket(state, socket) {
            state.socket = socket;
        }
    },
    actions: {
        async getUserInfo({ commit }) {
            try {
                const res = await getUserInfo();
                if (res.info) {
                    commit('setUser', res.info);
                    commit('setSocket', new Socket());
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}