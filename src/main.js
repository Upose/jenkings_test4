import Vue from 'vue'
import App from './App'
import router from './router'

import store from './router/store'
import Debounce from '@/assets/public/js/debounce';
import http from '@/assets/public/js/http';
import bus from '@/assets/public/js/bus';

Vue.config.productionTip = false

Vue.component('Debounce',Debounce)
Vue.use(VueI18n)

Vue.prototype.http = http;
Vue.prototype.bus = bus;

const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale')||'zh-CN',
  messages: {
    'zh-CN': require('@/assets/public/lang/zh'),   // 中文
    'zh-HANT': require('@/assets/public/lang/hant'),    // 繁体
    'en-US': require('@/assets/public/lang/en')    // 英文
  }
})

router.beforeEach((to, from, next) => {
  var url = window.location.href;
  var token = url.split('token')[1];
  if(token){//做重定向处理否则就不管
    window.localStorage.setItem('token',token);
    window.location.replace(url.split('token')[0]);
    window.location.reload();
  }else{
    next();
  }
  // const token = sessionStorage.getItem('token');
  // if (!token && to.path !== '/login') {
  //     next('/login');
  // } else {
  //   next();
  // }
})

new Vue({
  el: '#home_sys',
  router,
  i18n,
  store,
  components: { App,http },
  data(){
    return{
      collapse:false,
    }
  },
  template: '<App/>'
})
