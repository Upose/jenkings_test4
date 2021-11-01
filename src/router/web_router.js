/***门户路由 */
export default {
    router:[
        {
          path: '/',
          name: 'home',
          component: r => require.ensure([], () => r(require('@/components/web/view/home')), 'list'),
          meta: { title: '首页' , keepAlive:true},
        },
    ],
}