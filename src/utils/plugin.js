/*
 * 公共方法
 */
import Vue from 'vue'
import http from '@/utils/http';


/**
 * is_open：true 打开新窗口，false不打开新窗口
 * url：地址
 */
function isThirdpartyApp(is_web, url) {
  var port_url = {};
  var is_open = false;
  var orgInfo = localStorage.getItem('orgInfo');
  if (orgInfo && orgInfo != '' && orgInfo != undefined && orgInfo != 'null' && orgInfo != 'undefined') {
    port_url = JSON.parse(localStorage.getItem('orgInfo')) || {};
    if (is_web) {
      (url.indexOf(port_url.onlinePortalUrl) > -1 || url.indexOf(port_url.portalUrl) > -1) ? is_open = true : is_open = false;
    } else {
      (url.indexOf(port_url.onlineManageUrl) > -1 || url.indexOf(port_url.manageUrl) > -1) ? is_open = true : is_open = false;
    }
  }
  return is_open;
}

function addStyle(url,code) {
  if(code&&document.getElementsByClassName(code+'-css').length>0)return;
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  if(code)link.setAttribute("class", code+"-css");
  link.setAttribute("href", process.env.VUE_APP_TEMPLATESRC + url + '?version=' + new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}
function addStyleLocal(url,code) {
  if(code&&document.getElementsByClassName(code+'-css').length>0)return;
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  if(code)link.setAttribute("class", code+"-css");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", url + '?version=' + new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}
function addScript(url,code) {
  if(code&&document.getElementsByClassName(code+'-js').length>0)return;
  var js_element = document.createElement("script");
  js_element.setAttribute("type", "text/javascript");
  if(code)js_element.setAttribute("class", code+"-js");
  js_element.setAttribute("src", process.env.VUE_APP_TEMPLATESRC + url + '?version=' + new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(js_element);
}
function authShowBtn(value) {
  var list = this.$store.state.menuList;
  var is_show = false;
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].permissionNodes && list[i].permissionNodes.length > 0) {
        for (var k = 0; k < list[i].permissionNodes.length; k++) {
          if (list[i].permissionNodes[k].permission == value) {
            is_show = true;
          }
        }
      }
    }
    return is_show;
  }
}
Vue.prototype.http = http;
Vue.prototype.$isThirdpartyApp = isThirdpartyApp;//判断是否本站地址url,返回true表示本站，无需open()
Vue.prototype.$addStyle = addStyle;//引入css文件
Vue.prototype.$addStyleLocal = addStyleLocal;//引入css文件
Vue.prototype.$addScript = addScript;//引入js文件
Vue.prototype.$authShowBtn = authShowBtn;//判断按钮等是否有权限

