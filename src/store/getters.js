export default {
    token: state => state.auth.token,
    user: state => state.auth.user,
    loginless: state => state.auth.loginless,
    username: state => state.auth.user.username,
    userinfos: state => state.userinfos.userinfos
}