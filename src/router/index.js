import Vue from 'vue'
import Router from 'vue-router'
import webRouter from './web_router';
import adminRouter from './admin_router';
Vue.use(Router)

export default new Router({
  routes: [
    // { path: '/', redirect: '/admin_caseShow' },
    {
      path: '/web',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/components/web/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:webRouter.router,
    },
    {
      path: '/admin',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/components/admin/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:adminRouter.router,
    },
    {
      path: '/admin_previewScreen',
      name: 'admin_previewScreen',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/previewScreen')), 'scene'),
      meta: { title: '服务中台-整屏' , keepAlive:true},
    },
    {
      path: '/admin_previewLeftmenu',
      name: 'admin_previewLeftmenu',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/previewLeftmenu')), 'scene'),
      meta: { title: '服务中台-预览(针对左侧固定)' , keepAlive:true},
    },
    {
      path: '/admin_previewAll',
      name: 'admin_previewAll',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/previewAll')), 'scene'),
      meta: { title: '服务中台-预览（普通分屏+通屏）' , keepAlive:true},
    },
    {
      path: '/403',
      name: '403',
      component: r => require.ensure([], () => r(require('@/components/403')), 'index'),
    },
    {
      path: '/404',
      name: '404',
      component: r => require.ensure([], () => r(require('@/components/404')), 'index'),
    },
    {
      path: '/500',
      name: '500',
      component: r => require.ensure([], () => r(require('@/components/500')), 'index'),
    },
    {
      path: '/test',
      name: 'test',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/test')), 'scene'),
      meta: { title: '点击滚动到指定位置' , keepAlive:true},
    },
    {
      path: '/test1',
      name: 'test',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/test1')), 'scene'),
      meta: { title: '滚屏' , keepAlive:true},
    },
    {//重定向中间件
      path: '/',
      name: 'reset',
      beforeEnter:async (to, from, next) => {
        let path = await casCallbake('/admin_caseShow');
        next(path);
      }
    },
    {
      path: '*',
      redirect: '/404',
    }
    
  ]
})
