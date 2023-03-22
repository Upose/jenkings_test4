//所有涉及到的模板文件

const previewComponent = {
    install: function (Vue) {
        Vue.component('previewhead', r => { require(['@/views/admin/preview/model/head.vue'], r) });//头部
        Vue.component('previewfoot', r => { require(['@/views/admin/preview/model/foot.vue'], r) });//底部
        Vue.component('previewAll', r => { require(['@/views/admin/preview/previewAll.vue'], r) });//通屏-所有页预览
        Vue.component('previewLeftmenu', r => { require(['@/views/admin/preview/previewLeftmenu.vue'], r) });//演示站点
        Vue.component('previewScreen', r => { require(['@/views/admin/preview/previewScreen.vue'], r) });//通屏-滚屏预览
        Vue.component('previewScreenSZY', r => { require(['@/views/admin/preview/previewScreenSZY.vue'], r) });//分屏-滚屏预览-深职院
        Vue.component('previewScreenSZJS', r => { require(['@/views/admin/preview/previewScreenSZJS.vue'], r) });//分屏-滚屏预览-深圳技术大学
        Vue.component('bigScreenDuzhedaohang', r => { require(['@/views/admin/preview/bigScreenDuzhedaohang.vue'], r) });//查询机-深职院-大屏
        Vue.component('previewScreenNMGKJDX', r => { require(['@/views/admin/preview/previewScreenNMGKJDX.vue'], r) });//分屏-内蒙古科技大学
        Vue.component('previewAllQXDM', r => { require(['@/views/admin/preview/previewAllQXDM.vue'], r) });//分段-清新淡墨
        Vue.component('previewAllNHIC', r => { require(['@/views/admin/preview/previewAllNHIC.vue'], r) });//分段-广东南华工商职业学院
        Vue.component('previewScreenNEFU', r => { require(['@/views/admin/preview/previewScreenNEFU.vue'], r) });//分段-东北林业
        Vue.component('previewwydq', r => { require(['@/views/admin/preview/previewwydq.vue'], r) });//分段-文雅大气

        Vue.component('BGvideoImg', r => { require(['@/views/admin/preview/bgComponent/BGvideoImg.vue'], r) });//视频播放和轮播组件
        
        Vue.component('A', r => { require(['@/views/admin/preview/bgComponent/previewAllQXDM/A.vue'], r) });//清新淡墨-背景组件

        Vue.component('onsectionfreshD', r => { require(['@/views/admin/preview/bgComponent/onsectionfresh/D.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqA', r => { require(['@/views/admin/preview/bgComponent/previewwydq/A.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqB', r => { require(['@/views/admin/preview/bgComponent/previewwydq/B.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqC', r => { require(['@/views/admin/preview/bgComponent/previewwydq/C.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqD', r => { require(['@/views/admin/preview/bgComponent/previewwydq/D.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqE', r => { require(['@/views/admin/preview/bgComponent/previewwydq/E.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqF', r => { require(['@/views/admin/preview/bgComponent/previewwydq/F.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqG', r => { require(['@/views/admin/preview/bgComponent/previewwydq/G.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqH', r => { require(['@/views/admin/preview/bgComponent/previewwydq/H.vue'], r) });//文雅大气-背景组件
        Vue.component('previewwydqI', r => { require(['@/views/admin/preview/bgComponent/previewwydq/I.vue'], r) });//文雅大气-背景组件
    }
}

export default previewComponent;