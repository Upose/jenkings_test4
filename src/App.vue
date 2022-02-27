<template>
  <div id="home_sys" class="admin-warp-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'home_sys',
  created(){},
  mounted(){
    this.$store.commit('getSession');
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
