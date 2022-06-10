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

//判断是否本站地址url,返回true表示本站，无需open()
Vue.prototype.isThirdpartyApp = function(is_web,url){
  var port_url = {};
  var is_open = false;//true 打开新窗口，false不打开新窗口
  var orgInfo = localStorage.getItem('orgInfo');
  if(orgInfo && orgInfo!='' && orgInfo!=undefined && orgInfo!='null' && orgInfo !='undefined'){
    port_url = JSON.parse(localStorage.getItem('orgInfo'))||{};
    if(is_web){
      (url.indexOf(port_url.onlinePortalUrl)>-1|| url.indexOf(port_url.portalUrl)>-1) ? is_open = true : is_open = false;
    }else{
      (url.indexOf(port_url.onlineManageUrl)>-1|| url.indexOf(port_url.manageUrl)>-1) ? is_open = true : is_open = false;
    }
  }
  return is_open;
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
  var list = store.state.menuList;
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

let timer = setInterval(() => {
  if (axios && axios.defaults && axios.defaults.loaded) {
    clearInterval(timer);
    new Vue({
      el: '#home_sys',
      router,
      i18n,
      store,
      components: { App },
      data(){
        return{
          fileUrl:'',
          collapse:false,
        }
      },
      template: '<App/>'
    })
  }
}, 100);
