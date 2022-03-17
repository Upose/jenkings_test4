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

Vue.prototype.backHistory = function(){
  window.history.go(-1);
}

Vue.prototype.addStyle = function(url){
  var link=document.createElement("link"); 
  link.setAttribute("rel", "stylesheet"); 
  link.setAttribute("type", "text/css"); 
  link.setAttribute("href", url+'?version='+new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}

Vue.prototype.addScript = function(url){
  var js_element=document.createElement("script");
  js_element.setAttribute("type","text/javascript");
  js_element.setAttribute("src",url+'?version='+new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(js_element);
}

Vue.prototype.authShowBtn = function(value){
  var list = JSON.parse(window.localStorage.getItem('home_sys_menuAuth')||'[]');
  var is_show = false;
  if(list.length>0){
    for(var i=0;i<list.length;i++){
      if(list[i].permissionNodes && list[i].permissionNodes.length>0){
        for(var k=0;k<list[i].permissionNodes.length;k++){
            if(list[i].permissionNodes[k].permission == value){
              is_show = true;
            }
        }
      }
    }
    return is_show;
  }
}

const i18n = new VueI18n({
  locale: window.localStorage.getItem('locale')||'zh-CN',
  messages: {
    'zh-CN': require('@/assets/public/lang/zh'),   // 中文
    'zh-HANT': require('@/assets/public/lang/hant'),    // 繁体
    'en-US': require('@/assets/public/lang/en')    // 英文
  }
})

// router.beforeEach((to, from, next) => {
//   next();
// })

let timer = setInterval(() => {
  if (axios && axios.defaults && axios.defaults.loaded) {
    // 获取 应用基础信息 每隔十分钟更新一次信息
    if (!localStorage.getItem('baseinfo_time_stamp') || (parseInt(localStorage.getItem('baseinfo_time_stamp')) + 10 * 60 * 1000) < new Date().getTime()) {
      getbaseinfoFun();
    }else{
      if(localStorage.getItem('userInfo') == 'null' || localStorage.getItem('userInfo')==null){
        getbaseinfoFun();
      }else if(localStorage.getItem('token') && (localStorage.getItem('userInfo') && !JSON.parse(localStorage.getItem('userInfo')).userKey)){
        getbaseinfoFun();
      }
    }
    function getbaseinfoFun(){
      http.getJson('getbaseinfo').then(res => {
        if(res.data){
          localStorage.setItem('fileUrl', res.data.orgInfo.fileUrl);
          localStorage.setItem('headerFooterInfo', JSON.stringify(res.data.headerFooterInfo));
          localStorage.setItem('orgInfo', JSON.stringify(res.data.orgInfo));
          localStorage.setItem('urlInfo', JSON.stringify(res.data.urlInfo));
          if(res.data && res.data.userInfo){
            store.commit('setUserInfo',res.data.userInfo);
            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          }
          localStorage.setItem('baseinfo_time_stamp', new Date().getTime());
        }
      }).catch(err => {
        alert('基础数据获取失败');
        // this.$message({ type: 'error', message: '获取基础数据失败!' });
      });
    }
    clearInterval(timer);
    new Vue({
      el: '#home_sys',
      router,
      i18n,
      store,
      components: { App },
      data(){
        return{
          fileUrl:localStorage.getItem('fileUrl')||'http://192.168.21.46:6900',
          collapse:false,
        }
      },
      template: '<App/>'
    })
  }
}, 100);
