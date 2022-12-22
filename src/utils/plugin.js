/*
 * 公共方法
 */
import Vue from 'vue'
import http from '@/utils/http';
import bus from './bus';

function backHistory(){
  window.history.go(-1);
}
/**
 * 
 * @param {*} e file选择的文件
 * @param {*} filetype 文件上传类型
 * @param {*} field 标识
 * @returns 
 */
function fileUpload(e,filetype,field) {
  let $target = e.target || e.srcElement
  let file = $target.files[0]
  if (!file) {
    return
  }
  let formData = new FormData()
  formData.append('files', file)
  if(filetype=='img'){
    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG' && file.type !== 'image/gif') {
      this.$message({ type: 'error', message: '请上传图片文件!' });
      return;
    }
  }else if(filetype == 'js'){
    if (file.type !== 'text/javascript' && file.type !== 'application/javascript' && file.type !== 'JavaScript') {
      this.$message({ type: 'error', message: '请上传js文件!' });
      return;
    }
  }else if(filetype == 'video'){
    if (file.type !== 'video/mp4' && file.type !== 'avi' && file.type !== 'wmv' && file.type !== 'mpg'&& file.type !== 'mpeg'&& file.type !== 'rm'&& file.type !== 'mp4'&& file.type !== 'swf'&& file.type !== 'flv') {
      this.$message({ type: 'error', message: '请上传视频文件!' });
      return;
    }
  }else if(filetype == 'videoimg'){
    console.log(file.type);
    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG' && file.type !== 'image/gif' && file.type !== 'video/mp4' && file.type !== 'avi' && file.type !== 'wmv' && file.type !== 'mpg'&& file.type !== 'mpeg'&& file.type !== 'rm'&& file.type !== 'mp4'&& file.type !== 'swf'&& file.type !== 'flv') {
      this.$message({ type: 'error', message: '请上传视频或图片文件!' });
      return;
    }
  }else{
    return;
  }

  http.postFile("UploadFile", formData).then((res) => {
    bus.$emit('getUpladFile',{key:field,url:res.data[0]});
  }).catch((err) => {
    this.$message({ type: 'error', message: err.message||'上传失败!' });
  });
  e.target.value = null;
}
/**
 * is_open：true 打开新窗口，false不打开新窗口
 * url：地址
 */
 function isThirdpartyApp(is_web,url){
  var port_url = {};
  var is_open = false;
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

function addStyle(url){
  var link=document.createElement("link"); 
  link.setAttribute("rel", "stylesheet"); 
  link.setAttribute("type", "text/css"); 
  link.setAttribute("href", process.env.VUE_APP_TEMPLATESRC+url+'?version='+new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}
function addStyleLocal(url){
  var link=document.createElement("link"); 
  link.setAttribute("rel", "stylesheet"); 
  link.setAttribute("type", "text/css"); 
  link.setAttribute("href", url+'?version='+new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(link);
}

function addScript(url){
  var js_element=document.createElement("script");
  js_element.setAttribute("type","text/javascript");
  js_element.setAttribute("src",process.env.VUE_APP_TEMPLATESRC+url+'?version='+new Date().getTime());
  document.getElementsByTagName("body")[0].appendChild(js_element);
}

function authShowBtn(value){
  var list = this.$store.state.menuList;
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

Vue.prototype.http = http;
Vue.prototype.bus = bus;
Vue.prototype.$fileUpload = fileUpload;//文件上传
Vue.prototype.$backHistory = backHistory;//返回上一页-针对浏览器
Vue.prototype.$isThirdpartyApp = isThirdpartyApp;//判断是否本站地址url,返回true表示本站，无需open()
Vue.prototype.$addStyle = addStyle;//引入css文件
Vue.prototype.$addStyleLocal = addStyleLocal;//引入css文件
Vue.prototype.$addScript = addScript;//引入js文件
Vue.prototype.$authShowBtn = authShowBtn;//判断按钮等是否有权限