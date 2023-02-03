<!--
 * @Author: 904678748@qq.com 904678748@qq.com
 * @Date: 2022-11-14 16:09:38
 * @LastEditors: 904678748@qq.com 904678748@qq.com
 * @LastEditTime: 2023-02-03 15:44:15
 * @FilePath: \home_sys\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="home_sys" class="admin-warp-app">
    <router-view v-if="post_details && isInfoLoad"/>
    <div class="admin-loading" v-if="!post_details && !isInfoLoad" v-loading="true"></div>
  </div>
</template>

<script>
export default {
  name: 'home_sys',
  created(){
    this.getBaseInfo();
    let appDetails = this.$store.state.appDetails;
    //详情
    if(!appDetails || appDetails==null || appDetails==undefined || appDetails ==''){
      this.getAppsDetails();
    }
  },
  mounted(){
    // this.$store.commit('getSession');
    // this.$i18n.locale = this.$store.state.language;
    // this.skin_template = this.$store.state.skin_template;
  },
  data(){
    return {
      isInfoLoad:false,
      post_details:false,
    }
  },
  methods:{
    //获取应用名称信息等
    async getAppsDetails(){
      var res = await handleAppState('scenemanage');
      if(res.code == 200){
        this.$store.commit('appDetails',res.data);
        this.post_details = true;
      }else if(res.code == 499){
        this.$router.push({ path: "/403", query: {txt:res.message} });
        this.post_details = true;
      }else if(res.code == 500){
        this.$message({type: 'error',message: '获取应用详情失败!'});
      }
    },
    //获取基础信息
    async getBaseInfo(){
      var res = await handleGetBaseInfo();
      if(res.code == 200){
        this.$store.commit('baseinfo',res.data);
        this.$root.fileUrl = res.data.orgInfo.fileUrl;
        this.isInfoLoad = true;
      }else{
        this.$message({ type: 'error', message: res.message||'获取基础数据失败！' });
      }
    },
  },
}
</script>

<style lang="less">
@import "./assets/public/css/public.less";/**颜色配置 */
@import "./assets/admin/font/iconfont.css";/**通用文件 */
.admin-loading{
  width: 100%;
  height: 100%;
}
</style>
