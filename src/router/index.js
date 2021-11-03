import Vue from 'vue'
import Router from 'vue-router'
import webRouter from './web_router';
import adminRouter from './admin_router';
Vue.use(Router)

export default new Router({
  routes: [
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
      path: '*',
      name: '/404',
      component: r => require.ensure([], () => r(require('@/components/404')), 'index'),
    },
    {
      path: '/scenePreview',
      name: 'scenePreview',
      component: r => require.ensure([], () => r(require('@/components/admin/scene/scene_preview')), 'scene'),
      meta: { title: '服务中台-场景预览' , keepAlive:true},
    },
  ]
})
