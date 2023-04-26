/**
 * @file 配置持久化缓存插件
 */

import createPersistedState from 'vuex-persistedstate'
import { VUEX_CACHE_NAME } from '@/config/vuex';

const cache = createPersistedState({
    storage: localStorage,
    overwrite: true,
    key: VUEX_CACHE_NAME
});

export default cache;