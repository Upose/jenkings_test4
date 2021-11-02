/***后台路由 */
export default {
    router:[
      {
        path: '/caseShow',
        name: 'caseShow',
        component: r => require.ensure([], () => r(require('@/components/admin/case/case_show')), 'case'),
        meta: { title: '服务中台-场景管理' , keepAlive:true},
      },
      {
        path: '/caseList',
        name: 'caseList',
        component: r => require.ensure([], () => r(require('@/components/admin/case/case_list')), 'case'),
        meta: { title: '服务中台-场景列表' , keepAlive:true},
      },
      {
        path: '/logList',
        name: 'logList',
        component: r => require.ensure([], () => r(require('@/components/admin/case/log_list')), 'case'),
        meta: { title: '服务中台-更新日志/注意事项' , keepAlive:true},
      },
      {
        path: '/sceneManage',
        name: 'sceneManage',
        component: r => require.ensure([], () => r(require('@/components/admin/scene/scene_manage')), 'scene'),
        meta: { title: '服务中台-选择终端' , keepAlive:true},
      },
      {
        path: '/sceneSet',
        name: 'sceneSet',
        component: r => require.ensure([], () => r(require('@/components/admin/scene/scene_set')), 'scene'),
        meta: { title: '服务中台-场景设置' , keepAlive:true},
      },
      {
        path: '/programManage',
        name: 'programManage',
        component: r => require.ensure([], () => r(require('@/components/admin/program/program_manage')), 'program'),
        meta: { title: '服务中台-栏目管理' , keepAlive:true},
      },
      {
        path: '/terminalManage',
        name: 'terminalManage',
        component: r => require.ensure([], () => r(require('@/components/admin/terminal/terminal_manage')), 'terminal'),
        meta: { title: '服务中台-终端管理' , keepAlive:true},
      },
      {
        path: '/terminalAdd',
        name: 'terminalAdd',
        component: r => require.ensure([], () => r(require('@/components/admin/terminal/terminal_add')), 'terminal'),
        meta: { title: '服务中台-终端管理-添加终端' , keepAlive:true},
      },
      {
        path: '/test',
        name: 'test',
        component: r => require.ensure([], () => r(require('@/components/admin/scene/test')), 'scene'),
        meta: { title: '服务中台-场景设置' , keepAlive:true},
      },
    ],
}