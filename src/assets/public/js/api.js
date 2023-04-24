/***后台管理系统 项目接口地址-服务中台 */

// var baseURL = '/scenemanage';//请求前端地址
var baseURL = '/scenemanage';//请求前端地址
var baseURL_apps ='/appcenter';//获取顶部数据-应用中心地址

export default {
    postUrl: {
        //基础接口
        'getmgrtopmenu':baseURL_apps + '/api/baseinfo/getmgrtopmenu',//获取头部菜单
        'getbaseinfo': baseURL_apps + '/api/baseinfo/getbaseinfo',//获取当前用户机构基础信息

        'auth_tree':baseURL+'/api/sys-menu/user-permission-tree',//权限-树形
        'scene-overview': baseURL + '/api/scene-manage/scene-overview', //获取场景总览列表
        'scene-list-by-terminal-id': baseURL + '/api/scene-manage/scene-list-by-terminal-id', //按终端获取场景列表
        'scene-detail': baseURL + '/api/scene-manage/scene-detail', //获取场景详情 /{sceneid}
        'scene-add': baseURL + '/api/scene-manage/scene', // 添加场景
        'scene-put': baseURL + '/api/scene-manage/scene', // 更新场景
        'scene-del': baseURL + '/api/scene-manage/scene', //删除场景   /{sceneid}
        'scene-url-by-id': baseURL + '/api/scene-manage/scene-url-by-id', //获取场景url   /{sceneid}
        'disable-scene': baseURL + '/api/scene-manage/disable-scene', //禁用场景   /{sceneid}
        'app-list-by-service-type': baseURL + '/api/scene-manage/app-list-by-service-type', //按服务类型获取应用列表   /{appservicetype}/{terminaltype}
        'app-widget-list-by-app-id': baseURL + '/api/scene-manage/app-widget-list-by-app-id', //获取应用组件列表   /{appid}
        'terminal-instance-list': baseURL + '/api/terminal/terminal-instance-list', //终端实例列表
        'terminal-instance-detail': baseURL + '/api/terminal/terminal-instance-detail', //获取终端实例详情 /{terminalid}​
        'terminal-instance-add': baseURL + '/api/terminal/terminal-instance', //添加终端实例
        'terminal-instance-updata': baseURL + '/api/terminal/terminal-instance', //更新终端实例
        'terminal-instance-del': baseURL + '/api/terminal/terminal-instance', //删除终端实例 /{terminalinstanceid}
        'dictionary': baseURL + '/api/scene-manage/dictionary', //获取下拉框字典
        'app-plate-list-by-app-id': baseURL + '/api/scene-manage/app-plate-list-by-app-id', //获取应用栏目列表 /{appid}  ---这个接口没用了
        'app-widget-list-by-app-id': baseURL + '/api/scene-manage/app-widget-list-by-app-id', //获取应用组件列表 /{appid}
        'app-plate-list-by-scene-id': baseURL + '/api/scene-manage/app-plate-list-by-scene-id', //获取场景内所有栏目列表 /{sceneid}
        'dictionary-by-type': baseURL + '/api/scene-manage/dictionary-by-type', //按类型获取下拉框字典 /{dictype}
        'header-footer-list': baseURL + '/api/scene-manage/header-footer-list', //获取-头部底部-组件列表
        'icon_dictionary': baseURL + '/api/terminal/dictionary', //获取图标选择列表
        'change-scene-status': baseURL + '/api/scene-manage/change-scene-status', //禁用启用
        'scene-detail-group': baseURL + '/api/scene-manage/scene-detail', //获取分组场景详情 {sceneid}/{visitorlimittype}/{usersetid}
        'nav-column-list': baseURL + '/api/header-footer/nav-column-list', //获取栏目列表
        'layout-options':baseURL + '/api/scene-manage/scene-layout-options',//获取场景编辑下的-布局、模板、主题色
        'template-default-by-code':baseURL + '/api/scene-manage/template-default-by-code',//根据模板code获取模板默认数据   ---这个接口没用了

        //新接口
        'set-default-index-page':baseURL + '/api/scene-manage/set-default-index-page',//设置为默认首页/{scenegroupid}
        'app-column-list-by-app-id':baseURL + '/api/scene-manage/app-column-list-by-app-id',//根据应用id获取应用栏目列表-分组
        'template-default-data-by-id':baseURL + '/api/scene-manage/template-default-data-by-id',//根据模板id，获取模板详情
    },
}