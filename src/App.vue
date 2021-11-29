<template>
  <div id="home_sys" class="admin-warp-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home_sys',
  mounted(){
    this.$store.commit('getSession');
    this.$i18n.locale = this.$store.state.language;
    this.skin_template = this.$store.state.skin_template;
    var list= {
        "orgId": "",
        "orgSecret": "",
        "orgCode": "cqu",
        "userKey": ""
    };
    this.http.postJson('gettoken',list).then(res=>{ 
      window.localStorage.setItem('token',res.data.token);
    }).catch(err=>{
        console.log(err);
    })
    this.initData();
  },
  data(){
    return {
      
    }
  },
  methods:{
    initData(){
      this.http.getPlain('auth','').then((res) => {
        
      }).catch((err) => {
        
      });
      this.http.getPlain('auth_tree','').then((res) => {
        
      }).catch((err) => {
        
      });
    },
  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";/**颜色配置 */
@import "./assets/admin/font/iconfont.css";/**通用文件 */
</style>
