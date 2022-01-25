<template>
  <div id="home_sys" class="admin-warp-app" v-if="baseInfo">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home_sys',
  created(){
    //获取当前用户机构基础信息
    var fileUrl = window.localStorage.getItem('fileUrl');
    if(fileUrl && fileUrl!='' && fileUrl!=undefined && fileUrl!=null){
      this.baseInfo = true;
    }else{
      this.http.getJson('getbaseinfo').then(res=>{
        if(res.data){
          this.header_class = res.data.headerFooterInfo.headerTemplateCode||'';
          this.footer_class = res.data.headerFooterInfo.footerTemplateCode||'';
          this.addStyle(res.data.headerFooterInfo.headerRouter+'/component.css');
          this.addScript(res.data.headerFooterInfo.headerRouter+'/component.js');

          this.addStyle(res.data.headerFooterInfo.footerRouter+'/component.css');
          this.addScript(res.data.headerFooterInfo.footerRouter+'/component.js');
          this.$root.fileUrl = res.data.orgInfo.fileUrl||'';
          window.localStorage.setItem('fileUrl',res.data.orgInfo.fileUrl);
          this.baseInfo = true;
        }
      }).catch(err=>{})
    }
    var home_sys_menuAuth = window.localStorage.getItem('home_sys_menuAuth');
    if(home_sys_menuAuth && home_sys_menuAuth!='' && home_sys_menuAuth!=undefined && home_sys_menuAuth!=null){
      console.log('菜单已存在');
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
      baseInfo:false,
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
