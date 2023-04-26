/**
 * @file 对话存储，一个是对话列表存储，一个是对话记录存储
 */
import store from "..";

function getKey(username) {
    const myname = store.getters.username;
    const key = `${myname}-${username}`;
    return key;
}

export default {
    namespaced: true,
    state: {
        chats: {},
        msgs: {}
    },
    mutations: {
        /**
         * 添加聊天列表
         * @param {*} state 
         * @param {*} item 
         */
        addChatItem(state, item) {
            console.log(item);
            const { username } = item;
            const key = getKey(username);
            const newChat = {
                ...item, 
                ...(state.chats[key] ?? {})
            };
            state.chats[key] = newChat;
            state.chats = {...state.chats};
        },
        /**
         * 添加消息记录
         * @param {*} state 
         * @param {*} param1 
         */
        setMsgs(state, { key, data }) {
            if (!state.msgs) {
                state.msgs = {};
            }
            state.msgs[key] = [...(state.msgs[key] ?? []), data];
        },
        /**
         * 设置未读消息数
         * @param {Number} num
         */
        addUnReadMsgs(state, { username }) {
            if (!username) return;
            const key = getKey(username);
            const num = (state.chats[key] && state.chats[key].unread) || 0;
            state.chats[key] = { ...(state.chats[key] ?? {}), unread: num + 1 };
            state.chats = {...state.chats};
        },
        /**
         * 设置最后一条消息
         */
        setLastMsg(state, { username, msg, time }) {
            const key = getKey(username);
            if (!state.chats[key]) return;
            state.chats[key] = {
                ...state.chats[key],
                lastMsg: msg,
                time
            };
            state.chats = {...state.chats};
        },
        /**
         * 清除消息未读数
         */
        clearUnread(state, { username }) {
            const key = getKey(username);
            if (!state.chats[key]) return;
            state.chats[key] = { ...state.chats[key], unread: 0 };
            state.chats = {...state.chats};
        }
    }
}