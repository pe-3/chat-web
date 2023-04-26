/**
 * @file 集中化管理用户状态，
 */

import { getUserInfo } from '@/request/user';
import Socket from '@/socket';

export default {
    namespaced: true,
    state: {
        token: '', // 用户鉴权令牌
        user: {}, // 登陆用户信息
        loginless: false, // 免登
        socket: null // 消息通讯
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