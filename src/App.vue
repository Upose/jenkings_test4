<template>
  <div id="home_sys" class="admin-warp-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home_sys',
  created(){
    var home_sys_menuAuth = window.localStorage.getItem('home_sys_menuAuth');
    if(home_sys_menuAuth && home_sys_menuAuth!='' && home_sys_menuAuth!=undefined && home_sys_menuAuth!=null){
      // console.log('菜单已存在');//这个地方有重新更新菜单的问题
    }else{
      this.http.getPlain('auth_tree','').then((res) => {
        window.localStorage.setItem('home_sys_menuAuth',JSON.stringify(res.data));
      }).catch((err) => {});
    }
  },
  mounted(){
    // this.$store.commit('getSession');
    // this.$i18n.locale = this.$store.state.language;
    // this.skin_template = this.$store.state.skin_template;
  },
  data(){
    return {
    }
  },
  methods:{

  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";/**颜色配置 */
@import "./assets/admin/font/iconfont.css";/**通用文件 */
</style>
