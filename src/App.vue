<template>
  <div id="home_sys" class="admin-warp-app">
    <router-view v-if="isInfoLoad"/>
    <div class="admin-loading" v-if="!isInfoLoad" v-loading="true"></div>
  </div>
</template>

<script>
export default {
  name: 'home_sys',
  created(){
    this.getBaseInfo();
  },
  mounted(){
    // this.$store.commit('getSession');
    // this.$i18n.locale = this.$store.state.language;
    // this.skin_template = this.$store.state.skin_template;
  },
  data(){
    return {
      isInfoLoad:false,
    }
  },
  methods:{
    // 获取基础信息
    getBaseInfo() {
      this.http.getJson('getbaseinfo').then(res => {
        if (res.data) {
          this.$store.commit('baseinfo',res.data);
          localStorage.setItem('fileUrl', res.data.orgInfo.fileUrl);
          this.$root.fileUrl = res.data.orgInfo.fileUrl;
          localStorage.setItem('headerFooterInfo', JSON.stringify(res.data.headerFooterInfo));
          localStorage.setItem('orgInfo', JSON.stringify(res.data.orgInfo));
          localStorage.setItem('urlInfo', JSON.stringify(res.data.urlInfo));
          if (res.data && res.data.userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
          }
          localStorage.setItem('baseinfo_time_stamp', new Date().getTime());
          this.isInfoLoad = true;
        }
      }).catch(err => {
        this.$message({ type: 'error', message: '获取基础数据失败!' });
      });
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
