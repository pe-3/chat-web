import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/reset.styl'
import regCom from './utils/regCom'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css';
import mixins from './mixins'
import store from './store'

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.mixin(mixins);

// 注册一些公用的组件
const _base_com = require.context('./components/_base', false, /.vue$/);
const _common_com = require.context('./components/_common', false, /.vue$/);
regCom(Vue, _base_com);
regCom(Vue, _common_com);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
