export default {
    token: state => state.auth.token,
    user: state => state.auth.user,
    loginless: state => state.auth.loginless
}