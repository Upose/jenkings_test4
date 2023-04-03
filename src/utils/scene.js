let fileUrl = window.localStorage.getItem('fileUrl');
function isImgvideo(val) {
    var imgtype = 'png,jpeg,PNG,JPEG,JPG,jpg,GIF,gif';
    var videotype = 'avi,wmv,mp4,mpg,mpeg,rm,swf,flv';
    var type = '';
    if (val) {
        var filetype = val.split('.')[1];
        if (imgtype.indexOf(filetype) > -1) {
            type = 'img';
        } else if (videotype.indexOf(filetype) > -1) {
            type = 'video'
        }
    }
    return type;
}
function selectComponent(details) {
    var list = {
        bgColor: '#fff',
        minWidth: 1200,
        min_height: 'auto',
        is_show_page: '',
    };
    if (details && details.template) {
        list.bgColor = details.template.backgroundColor || '#fff';
        list.minWidth = details.template.width || 1200;
    }
    if (details.template.layoutId == 1 && details.template.uniqueCode == 'index2') {//演示站点
        list.is_show_page = 'previewLeftmenu';
        list.min_height = '100%';
    } else if (details.template.layoutId == 3) {//分屏
        list.min_height = '100%';
        if (details.sceneGroupId == 'fdaa5e85-d022-438e-b4a7-d1cf54753bac') {//深职院
            list.is_show_page = 'previewScreenSZY';
        } else if (details.template.uniqueCode == 'splitscreensztu') {//深圳技术大学
            list.is_show_page = 'previewScreenSZJS';
        } else if (details.template.uniqueCode == 'imust') {//内蒙古科技大学
            list.is_show_page = 'previewScreenNMGKJDX';
        } else if (details.template.uniqueCode == 'wit') {//智慧灵动
            list.is_show_page = 'previewwit';
        } else {
            list.is_show_page = 'previewScreen';
        }
    } else if (details.template.layoutId == 4) {//大屏
        list.is_show_page = 'bigScreenDuzhedaohang';
    } else {//通屏，分段
        list.min_height = '100%';
        if (details.template.uniqueCode == 'onsectionlightink') {
            list.is_show_page = 'previewAllQXDM';
        } else if (details.template.uniqueCode == 'nhic') {
            list.is_show_page = 'previewAllNHIC';
        }else if(details.template.uniqueCode == 'nefu'){//东北林业
            list.is_show_page = 'previewScreenNEFU';
        } else if(details.template.uniqueCode == 'wydq'){//文雅大气
            list.is_show_page = 'preview'+ details.template.uniqueCode;
        } else {
            list.is_show_page = 'previewAll';
        }
    }
    return list;
}
function setId() {
    return "jl_vip_zt_" + Math.ceil(Math.random() * 1e8);
}
function isWidgetCode(item) {
    var widgetCode = '';
    if (item.widgetCode) {
        widgetCode = item.widgetCode;
    } else {
        if (item.appWidget && item.appWidget.widgetCode) {
            widgetCode = item.appWidget.widgetCode;
        } else {
            widgetCode = '';
        }
    }
    return widgetCode;
}
function isWidgetCodeWapr(width, item) {
    var widgetCode = '';
    if (item.width == (width / 10) && item.configParameter && item.configParameter.fullScreen) {
        if (width == 1200) {
            widgetCode = ' mar-left-1200';
        } else if (width == 1440) {
            widgetCode = ' mar-left-1440';
        }
    }
    return widgetCode;
}
function commonWidgetSetFormat(val) {
    if (val && val != "undefind" && val != 'null') {
        return val.replace(/\"/g, "'");
    } else {
        return '{}';
    }
}
function styleSet(details,it, i) {
    var list = {};
    if (i < 0 && details.sceneScreens && details.sceneScreens[0]) {//这里是针对头部，头部传值为-1
      list = { 'background': 'url(' + fileUrl + (details.sceneScreens[0].bgImg || '') + ')', 'background-position': 'center top !important' };
    } else if (i == 0) {//第一屏
      if (this.details.sceneScreens.length > 1) {//多屏情况下的第一屏
        list = { 'background': 'url(' + fileUrl + (it.bgImg || '') + ')', 'background-position-y': (-(details.headerTemplate.height * 10) + 'px !important'), 'background-repeat': 'repeat-x' };
      } else {
        list = { 'background': 'url(' + fileUrl + (it.bgImg || '') + ')', 'background-position': 'center top !important', 'background-repeat': 'repeat-x' };
      }
    } else {
      list = { 'background': 'url(' + fileUrl + (it.bgImg || '') + ')' };
    }
    return list;
  }
Vue.prototype.$isImgvideo = isImgvideo;//判断是视频还是图片文件
Vue.prototype.$selectComponent = selectComponent;//判断使用哪个模板
Vue.prototype.$setId = setId;//动态设置模板id
Vue.prototype.$isWidgetCode = isWidgetCode;//判断组件数据是否为空
Vue.prototype.$isWidgetCodeWapr = isWidgetCodeWapr;//外层全屏
Vue.prototype.$commonWidgetSetFormat = commonWidgetSetFormat;//格式化
Vue.prototype.$styleSet = styleSet;//背景设置-除整屏滚动外的其他