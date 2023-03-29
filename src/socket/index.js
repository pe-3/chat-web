import store from "@/store";

/**
 * 获取所有接收器处理函数
 */

const getReceivers = require.context(
    './receivers',
    false,
    /.js$/
);

const receivers = getReceivers.keys().reduce((receivers, key) => {
    const prop = key.replace('.js', '').replace('./', '');
    receivers[prop] = getReceivers(key).default ?? getReceivers(key);
    return receivers;
}, {});

class Socket {
    url = 'ws://localhost:12345'
    socket = null
    cache = []
    send(data, cb) {
        console.log(data);
        if (typeof cb !== 'function') {
            cb = () => { };
        }
        if (typeof data === 'object') {
            const { readyState } = this.socket;
            if (readyState !== WebSocket.OPEN) {
                this.connect(cb);
                this.cache.push(data);
            }
            else if (readyState === WebSocket.OPEN) {
                this.socket.send(JSON.stringify(data));
                cb();
            }
        }
        else {
            cb(new Error('发送的消息必须为对象形式'));
            console.error('发送的消息必须为对象形式');
        }
    }
    receiver(data) {
        const {
            message,
            type
        } = JSON.parse(data);

        typeof receivers[type] === 'function' && receivers[type](message, receivers, this);
    }
    connect(cb) {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log("WebSocket is connect now.");
            this.send({
                type: 'sign',
                token: store.getters.token
            });
            while (this.cache.length) {
                this.send(this.cache.pop());
            }
            typeof cb === 'function' && cb();
        };

        this.socket.addEventListener('message', ({ data }) => {
            this.receiver(data);
        });

        this.socket.addEventListener('error', (ev) => {
            console.log('socket error', ev);
        });
    }
    close() {
        this.socket.close();
    }
    constructor() {
        this.connect();
    }
}

export default Socket;
