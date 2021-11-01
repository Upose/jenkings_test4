<template>
  <div id="news_sys" class="admin-warp-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'news_sys',
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
</style>
