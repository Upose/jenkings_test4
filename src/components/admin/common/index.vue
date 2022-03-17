<template>
<div class="warp">
    <headerpage></headerpage>
    <div class="admin-warp-content" v-if="is_admin_show"><router-view></router-view></div>
    <!-- <footerpage class="footer-page"></footerpage> -->
</div>
</template>

<script>
import headerpage from '@/components/admin/common/header'
import footerpage from '@/components/admin/common/footer'

export default {
  name: 'index',
  created(){
    document.title = '服务中台-'+JSON.parse(localStorage.getItem('orgInfo')).orgName+'图书馆';
  },
  components:{headerpage,footerpage},
  data () {
    return {
      is_admin_show:false,
    }
  },
  mounted(){
    this.http.getPlain('auth_tree','').then((res) => {
      this.is_admin_show = true;
      window.localStorage.setItem('home_sys_menuAuth',JSON.stringify(res.data));
    }).catch((err) => {});
  },
  methods:{
    // skinClick(val){
    //   document.getElementsByTagName("body")[0].setAttribute('class',val);
    //   window.localStorage.setItem('template',val);
    // },
  }
}
</script>

<style lang="less">
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/font/iconfont.css";
@import "../../../assets/admin/css/style.less";

/***最后会删除 */
.color-bg-warp{
  cursor: pointer;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  background: #eee;
  span{
    border: 1px solid #eee;
    padding: 5px 10px;
  }
}
/*****删除end */
.warp{
  width: 100%;
  height: 100%;
  position: relative;
}
.admin-warp-content{
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
}
/**
.content-warp{
  position: absolute;
  top: 61px;
  left: 0;
  right: 0;
  bottom: 40px;
}
.footer-page{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
**/
</style>
