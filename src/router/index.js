import Vue from 'vue'
import Router from 'vue-router'
import webRouter from './web_router';
import adminRouter from './admin_router';
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/caseShow' },
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
      path: '/scenePreview',
      name: 'scenePreview',
      component: r => require.ensure([], () => r(require('@/components/admin/scene/scene_preview')), 'scene'),
      meta: { title: '服务中台-场景预览' , keepAlive:true},
    },
    {
      path: '*',
      name: '/404',
      component: r => require.ensure([], () => r(require('@/components/404')), 'index'),
      beforeEnter: (to, from, next) => {
        let originUrl = localStorage.getItem('COM+');
        localStorage.removeItem('COM+');
        if (originUrl == null) { next('/404'); return; }
        let ticketRegex = /\?ticket=([^#]+)#/;

        let regexResult = ticketRegex.exec(location.href);
        if (regexResult.length > 1) {
          let ticket = regexResult[1];
          let ticketHref = `http://192.168.21.43:8021/api/third-part-auth/cas-proxy?ticket=${ticket}&service=${encodeURIComponent(location.origin)}`;
          axios({
            url: ticketHref,
            method: 'get'
          })
            .then(x => {

              let xml = x.data.data;
              if (!xml) { next('/404'); return; }
              let xdoc = new DOMParser().parseFromString(xml.toString(), 'application/xml');

              let tokenElements = xdoc.getElementsByTagName("cas:access_token");
              if (tokenElements.length > 0) {
                let token = tokenElements[0].innerHTML;
                localStorage.setItem('token', token);

                window.location.href=originUrl;
                window.close();
                next(originUrl);
                return;
              }
            })

          //fetch(ticketHref).then(x=>console.log(x));
        }
        next('/404');
      }
    },
    
  ]
})
