/***门户路由 */
export default {
    router:[
        {
          path: '/temp1',
          name: 'home',
          component: r => require.ensure([], () => r(require('@/views/web/temp1/index')), 'list'),
          meta: { title: '模板一' , keepAlive:true},
        },
        {
          path: '/temp2',
          name: 'home',
          component: r => require.ensure([], () => r(require('@/views/web/temp2/index')), 'list'),
          meta: { title: '模板二' , keepAlive:true},
        },
    ],
}