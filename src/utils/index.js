/**
 * 锁，用来处理一些临界资源
 * 比如只需要发一次的请求不能多次发
 * @method Lock.add 添加锁到资源
 * @method Lock.remove 移除锁
 */
export class Lock {
    constructor() {
        this.pool = new Map();
    }

    /**
     * 请求加锁
     *
     * @param   {string}    key     键
     * @return  {boolean}   是否已经被锁定
     */
    add(key) {
        if (this.pool.has(key)) {
            return true;
        }
        this.pool.set(key, 1);
    }

    /**
     * 解锁
     *
     * @param   {string}    key     键
     */
    remove(key) {
        this.pool.delete(key);
    }
}

export function getPropsFromVData(vue, ...props) {
    return props.reduce((result, propName) => {
        result[propName] = vue[propName];
        return result
    }, {});
}