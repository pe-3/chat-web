/**
 * @file 通过配置 store.getters 去简化对一些高频属性的访问
 */

export default {
    token: state => state.auth.token,
    user: state => state.auth.user,
    loginless: state => state.auth.loginless,
    username: state => state.auth.user.username,
    userinfos: state => state.userinfos.userinfos
}