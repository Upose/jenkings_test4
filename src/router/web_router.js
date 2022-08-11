/***门户路由 */
export default {
    router:[
        {
          path: '/index',
          name: 'home',
          component: r => require.ensure([], () => r(require('@/components/web/view/mode_preview')), 'list'),
          meta: { title: '首页' , keepAlive:true},
        },
    ],
}