/***后台路由 */
async function beforeEnterImplAsync(to, from, next) {
  let token = localStorage.getItem('token')
  if (token) {
    let response = await  axios({
      url:'/appcenter/api/baseinfo/getauthinfo?appcode=scenemanage',
      method:'get'
    }).then(x=>x.data);
    if (response.data.canAdmin) { next(); return }
    next({ name: '403' })
  }else{
    next();
  }
}
export default {
  router: [
    {
      path: '/admin_caseShow',
      name: 'admin_caseShow',
      component: r => require.ensure([], () => r(require('@/components/admin/case/case_show')), 'case'),
      meta: {
        title: [{ name: '场景管理'}],
        keepAlive: true,
        parentRoute:'admin_caseShow'
      },
    },
    {
      path: '/admin_caseList',
      name: 'admin_caseList',
      component: r => require.ensure([], () => r(require('@/components/admin/case/case_list')), 'case'),
      meta: {
        title: [{ name: '场景管理',path:'/admin_caseShow'}, { name: '场景列表'}],
        keepAlive: true,
        parentRoute:'admin_caseShow'
      },
    },
    {
      path: '/admin_sceneSet',
      name: 'admin_sceneSet',
      component: r => require.ensure([], () => r(require('@/components/admin/scene/scene_set')), 'scene'),
      meta: {
        title: [{ name: '场景管理', path: '/admin_caseShow' }, { name: '场景设置', }],
        keepAlive: true,
        parentRoute:'admin_caseShow'
      },
    },
    {
      path: '/admin_programManage',
      name: 'admin_programManage',
      component: r => require.ensure([], () => r(require('@/components/admin/program/program_manage')), 'program'),
      meta: {
        title: [{ name: '栏目管理'}],
        keepAlive: true,
        parentRoute:'admin_programManage'
      },
    },
    {
      path: '/admin_terminalManage',
      name: 'admin_terminalManage',
      component: r => require.ensure([], () => r(require('@/components/admin/terminal/terminal_manage')), 'terminal'),
      meta: {
        title: [{ name: '终端管理'}],
        keepAlive: true,
        parentRoute:'admin_terminalManage'
      },
    },
    {
      path: '/admin_sceneManage',
      name: 'admin_sceneManage',
      component: r => require.ensure([], () => r(require('@/components/admin/terminal/scene_manage')), 'scene'),
      meta: {
        title: [{ name: '选择终端'}],
        keepAlive: true,
        parentRoute:'admin_caseShow'
      },
    },
    {
      path: '/admin_terminalAdd',
      name: 'admin_terminalAdd',
      component: r => require.ensure([], () => r(require('@/components/admin/terminal/terminal_add')), 'terminal'),
      meta: {
        title: [{ name: '终端管理', path: '/admin_terminalManage' }, { name: '终端内容', }],
        keepAlive: true,
        parentRoute:'admin_terminalManage'
      },
    },
    {
      path: '/admin_headfoot_set',
      name: 'admin_headfoot_set',
      component: r => require.ensure([], () => r(require('@/components/admin/headfoot_set/headfoot_set')), 'terminal'),
      meta: {
        title: [{ name: '头部底部高级设置'}],
        keepAlive: true,
        parentRoute:'admin_headfoot_set'
      },
    },
  ].map(x=>{
    x.  beforeEnter= beforeEnterImplAsync;
    return x;
  })
}