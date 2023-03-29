import qs from 'qs';

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

/**
 * 是否为对象
 *
 * @param {Object} obj 目标对象
 * @return {boolean} 是否为对象
 */
export function isObj(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 增加 url query
 *
 * @param {string} sourceUrl url
 * @param {Object} urlParams  增加参数
 * @return {string} 拼接过的 url string
 */
export function addQuery(rawUrl, urlParams = {}) {
    // 兼容 javascript: or javascript:void(0)
    if (!rawUrl || rawUrl.indexOf('javascript:') !== -1) {
        return rawUrl || '';
    }
    // 防止 urlParams 乱传
    if (!urlParams || !isObj(urlParams)) {
        return rawUrl;
    }

    const [url, hash = ''] = rawUrl.split('#');
    const [path, queryStr = ''] = url.split('?');
    const query = qs.parse(queryStr);

    let newQueryStr = qs.stringify({
        ...query,
        ...urlParams
    });

    return `${path}${newQueryStr ? '?' : ''}${newQueryStr}${hash ? '#' : ''}${hash}`;
}

export function getQuery() {
    return qs.parse(window.location.search.slice(1));
}

/**
 * 拼接 url query
 *
 * @param {Object} urlParams 参数对下
 * @return {string} 拼接过的 url string
 */
export function setQuery(urlParams) {
    let query = getQuery();

    let newQuery = {
        ...query,
        ...urlParams
    };

    return qs.stringify(newQuery);
}

/**
 * 解析时间戳
 */

export function parseTime(inputTime) {
    const timeStamp = Number(inputTime);
    const now = Date.now();
    const time = new Date(timeStamp);
    if (now - timeStamp > 1000 * 60 * 60 * 12 * 365) {
        return '一年前';
    }
    else if (now - timeStamp > 1000 * 60 * 60 * 12 * 7) {
        return '七天前';
    }
    else if (now - timeStamp < 1000 * 60 * 60 * 12) {
        const hour = time.getHours();
        const minutes = time.getMinutes();
        return `${hour}: ${minutes}`;
    }
    const month = time.getMonth() + 1;
    const date = time.getDate();
    return `${month}月${date}号`;
}