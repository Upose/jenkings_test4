import Vue from 'vue'
import Router from 'vue-router'
import webRouter from './web_router';
import adminRouter from './admin_router';
Vue.use(Router)
const dlibAppRouterPrefix = window.dlibAppRouterPrefix;
const ruterBase = dlibAppRouterPrefix
  ? dlibAppRouterPrefix + "/scenemanage/"
  : "/scenemanage/";
export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV == "production" ? ruterBase : "",
  routes: [
    {
      path: '/web',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/views/web/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:webRouter.router,
    },
    {
      path: '/admin',
      name: 'index',
      component: r => require.ensure([], () => r(require('@/views/admin/common/index')), 'index'),
      meta: { title: '首页' , keepAlive:true},
      children:adminRouter.router,
    },
    {
      path: '/admin_preview',
      name: 'admin_preview',
      component: r => require.ensure([], () => r(require('@/views/admin/preview/preview')), 'scene'),
      meta: { title: '服务中台-预览' , keepAlive:true},
    },
    {
      path: '/403',
      name: '403',
      component: r => require.ensure([], () => r(require('@/views/403')), '403'),
    },
    {
      path: '/404',
      name: '404',
      component: r => require.ensure([], () => r(require('@/views/404')), '404'),
    },
    {
      path: '/500',
      name: '500',
      component: r => require.ensure([], () => r(require('@/views/500')), '500'),
    },
    // {//重定向中间件
    //   path: '/',
    //   name: 'reset',
    //   beforeEnter:async (to, from, next) => {
    //     let path = await casCallbake('/admin_caseShow');
    //     next(path);
    //   }
    // },
    {
      path: '*',
      redirect: '/404',
    }
    
  ]
})
