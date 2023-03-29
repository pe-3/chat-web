import store from "@/store";
import { $bus } from "@/store";
import { findUser } from "@/request/user";
import { Notification } from 'element-ui';
import { getQuery } from "@/utils";

/**
 * 
 * @param {Object} message 消息对象
 * @param {Function} send 发送器
 */
export default async function (message) {
    try {
        const { from, text, time } = message;
        const key = `${store.getters.username}-${from.username}`;


        if (!store.state.chat.chats[key]) {
            const data = await findUser(from);
            data && store.commit('chat/addChatItem', data.userinfo);
        }

        store.commit('chat/setMsgs', {
            key,
            data: {
                to: 'me',
                msg: text,
                time
            }
        });
        store.commit('chat/setLastMsg', {
            username: from.username,
            msg: `ta：${text}`,
            time
        });

        const notThisChat = getQuery().chatwith !== from.username;

        if (notThisChat) {
            Notification({
                message: `${from.nickname}：${text}`,
                onClick: function () {
                    $bus.$emit('chat-index-chat-change', from.username);
                    setTimeout(() => {
                        this.close();
                    }, 1000);
                }
            });

            store.commit(
                'chat/addUnReadMsgs',
                { username: from.username }
            );
        }

        $bus.$emit('dialog-msgs-reload');
    } catch (error) {
        console.error(error);
    }
}