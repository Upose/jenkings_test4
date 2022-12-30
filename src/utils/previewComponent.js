//所有涉及到的模板文件

const previewComponent = {
    install: function (Vue) {
        Vue.component('previewAll', r => { require(['@/views/admin/preview/previewAll.vue'], r) });//所有页预览
        Vue.component('previewLeftmenu', r => { require(['@/views/admin/preview/previewLeftmenu.vue'], r) });//演示站点
        Vue.component('previewScreen', r => { require(['@/views/admin/preview/previewScreen.vue'], r) });//通屏-滚屏预览
        Vue.component('previewScreenSZY', r => { require(['@/views/admin/preview/previewScreenSZY.vue'], r) });//通屏-滚屏预览-只针对深职院
        Vue.component('previewScreenSZJS', r => { require(['@/views/admin/preview/previewScreenSZJS.vue'], r) });//通屏-滚屏预览-只针对深圳技术大学
        Vue.component('bigScreenDuzhedaohang', r => { require(['@/views/admin/preview/bigScreenDuzhedaohang.vue'], r) });//深职院-大屏
        Vue.component('previewScreenNMGKJDX', r => { require(['@/views/admin/preview/previewScreenNMGKJDX.vue'], r) });//分屏-内蒙古科技大学
        Vue.component('previewAllQXDM', r => { require(['@/views/admin/preview/previewAllQXDM.vue'], r) });//分屏-清新淡墨
    }
}

export default previewComponent;