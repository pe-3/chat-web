import { findUser } from "@/request/user";
import store from "@/store";

export default async function (messages, receivers) {
    if (messages.length) {
        const { message: { from } } = messages[0];
        const key = `${store.getters.username}-${from.username}`;
        if (!store.state.chat.chats[key]) {
            console.log(key);
            const data = await findUser(from);
            data && store.commit('chat/addChatItem', data.userinfo);

            messages.forEach(({ message, type }) => {
                setTimeout(() => {
                    receivers[type](message);
                }, 100);
            });
        }
        else {
            messages.forEach(({ message, type }) => {
                setTimeout(() => {
                    receivers[type](message);
                }, 100);
            });
        }
    }
}