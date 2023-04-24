/*
 * @Author: 904678748@qq.com 904678748@qq.com
 * @Date: 2023-04-13 15:28:23
 * @LastEditors: 904678748@qq.com 904678748@qq.com
 * @LastEditTime: 2023-04-24 17:10:18
 * @FilePath: \home_sys\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
