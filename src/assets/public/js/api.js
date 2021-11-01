/***后台管理系统 项目接口地址-新闻发布 */

var baseURL = 'http://192.168.21.71:10011';//请求前端地址

export default {
    postUrl: {
        // 'AssetNewest': baseURL + '/api/client/AssetNewest', //最新资源--要删除
        'news-column-get': baseURL + '/api/news/news-column-get',//根据id获取栏目详情
        'news-column-update': baseURL + '/api/news/news-column-update',//更新栏目
        'news-column-add': baseURL + '/api/news/news-column-add',//新增栏目
        'news-column-get-by-manager-id': baseURL + '/api/news/news-column-get-by-manager-id',//获取新闻栏目列表，传cqviptest查所有
        'column_delete': baseURL + '/api/news/news-column-delete',//删除新闻栏目
        'lable-info-get-by-type': baseURL + '/api/news/lable-info-get-by-type',//栏目标签1；新闻标签2
        'lable-info-delete': baseURL + '/api/news/lable-info-delete',//删除标签
        'lable-info-update': baseURL + '/api/news/lable-info-update',//更新标签
        'news-settings-get': baseURL + '/api/news/news-settings-get',//获取设置
        'news-settings-save': baseURL + '/api/news/news-settings-save',//保存设置
        'news-column-permissions-list-get': baseURL + '/api/news/news-column-permissions-list-get',//获取栏目及管理者
        'news-column-permissions-by-column-id-get': baseURL + '/api/news/news-column-permissions-by-column-id-get',//获取栏目对应的权限设置
        'news-content-get-by-search': baseURL + '/api/news/news-content-get-by-search',//获取后台检索新闻
        'news-content-off-shelf': baseURL + '/api/news/news-content-off-shelf',//批量下架
        'news-content-delete': baseURL + '/api/news/news-content-delete',//批量删除
        'news-template-get': baseURL + '/api/news/news-template-get',//模板获取
        'news-content-get-by-column': baseURL + '/api/news/news-content-get-by-column',//获取后台栏目新闻内容
        'pront-news-content-get': baseURL + '/api/news/pront-news-content-get',//获取前台新闻数据
        'news-content-add':baseURL + '/api/news/news-content-add',//新增新闻
        'news-content-update':baseURL + '/api/news/news-content-update',//更新新闻
        'news-column-content-manage-get': baseURL + '/api/news/news-column-content-manage-get',//获取后台新闻栏目状态集合以及新闻内容标签集合
        'delivery-column-list-get': baseURL + '/api/news/delivery-column-list-get',//获取当前栏目之外的其他栏目键值对
        'news-content-manage-get': baseURL + '/api/news/news-content-manage-get',//获取当前栏目之外的其他栏目键值对
        'content-process-log-get': baseURL + '/api/news/content-process-log-get',//日志列表
        'user-permission-list-get': baseURL + '/api/news/user-permission-list-get',//获取栏目指定不同源类型的用户
        'save-news-column-permissions': baseURL + '/api/news/save-news-column-permissions',//保存栏目权限
        'news-column-permissions-delete': baseURL + '/api/news/news-column-permissions-delete',//获取栏目某一权限管理员列表
        'search-permission-manager': baseURL + '/api/news/search-permission-manager',//检索获取权限管理员
        'news-content-update-audit-status': baseURL + '/api/news/news-content-update-audit-status',//更新新闻内容审核状态
        'news-sort-content-by-index': baseURL + '/api/news/sort-content-by-index',//弹窗输入序号排序
        'news-body-template-get-by-type': baseURL + '/api/news/news-body-template-get-by-type',//获取新闻头尾部模板
        'news-body-template-update': baseURL + '/api/news/news-body-template-update',//更新新闻头尾部模板
        'news-sort-content-by-target': baseURL + '/api/news/sort-content-by-target',//拖动排序
        'news-user-union-column-permission-list': baseURL + '/api/sys-menu/user-union-column-permission-list',//拖动排序


        //前台接口
        'pront-news-column-list-get':baseURL+'/api/news/pront-news-column-list-get',//获取前台新闻栏目数据
        'pront-news-list-data-get':baseURL+'/api/news/pront-news-list-data-get',//获取前台列表新闻列表数据
        'pront-news-content-get':baseURL+'/api/news/pront-news-content-get',//获取前台新闻数据
    },
}