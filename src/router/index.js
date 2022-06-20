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
      path: '/admin_scenePreview',
      name: 'admin_scenePreview',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/preview')), 'scene'),
      meta: { title: '服务中台-场景预览' , keepAlive:true},
    },
    {
      path: '/admin_scenePreviewCqu',
      name: 'admin_scenePreviewCqu',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/preview_cqu')), 'scene'),
      meta: { title: '服务中台-重大首页预览' , keepAlive:true},
    },
    {
      path: '/admin_scenePreview_tq',
      name: 'admin_scenePreview_tq',
      component: r => require.ensure([], () => r(require('@/components/admin/preview/preview_tq')), 'scene'),
      meta: { title: '服务中台-图书期刊预览' , keepAlive:true},
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
