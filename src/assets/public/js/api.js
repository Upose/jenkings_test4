/***后台管理系统 项目接口地址-服务中台 */

var baseURL = 'http://192.168.21.23:5023';//请求前端地址

export default {
    postUrl: {
        'gettoken':'http://192.168.21.71:8077/api/Auth/AccessToken',//获取token
        'scene-overview': baseURL + '/api/scene-manage/scene-overview', //获取场景总览列表
        'scene-list-by-terminal-id': baseURL + '/api/scene-manage/scene-list-by-terminal-id', //按终端获取场景列表
        'scene-detail': baseURL + '/api/scene-manage/scene-detail', //获取场景详情 /{sceneid}
        'scene-add': baseURL + '/api/scene-manage/scene', // 添加场景
        'scene-put': baseURL + '/api/scene-manage/scene', // 更新场景
        'scene-del': baseURL + '/api/scene-manage/scene', //删除场景   /{sceneid}
        'app-list-by-service-type': baseURL + '/api/scene-manage/app-list-by-service-type', //按服务类型获取应用列表   /{appservicetype}/{terminaltype}
        'app-widget-list-by-app-id': baseURL + '/api/scene-manage/app-widget-list-by-app-id', //获取应用组件列表   /{appid}
        'terminal-instance-list': baseURL + '/api/terminal/terminal-instance-list', //终端实例列表
        'terminal-instance-detail': baseURL + '/api/terminal/terminal-instance-detail', //获取终端实例详情 /{terminalid}​
        'terminal-instance-add': baseURL + '/api/terminal/terminal-instance', //添加终端实例
        'terminal-instance-updata': baseURL + '/api/terminal/terminal-instance', //更新终端实例
        'terminal-instance-del': baseURL + '/api/terminal/terminal-instance', //删除终端实例 /{terminalinstanceid}

        'dictionary': baseURL + '/api/scene-manage/dictionary', //获取下拉框字典
        'app-plate-list-by-app-id': baseURL + '/api/scene-manage/app-plate-list-by-app-id', //获取应用栏目列表 /{appid}
        'app-widget-list-by-app-id': baseURL + '/api/scene-manage/app-widget-list-by-app-id', //获取应用组件列表 /{appid}
        'app-plate-list-by-scene-id': baseURL + '/api/scene-manage/app-plate-list-by-scene-id', //获取场景内所有栏目列表 /{sceneid}
        'dictionary-by-type': baseURL + '/api/scene-manage/dictionary-by-type', //按类型获取下拉框字典 /{dictype}
        'template-list': baseURL + '/api/scene-manage/template-list', //获取模板列表
    },
}