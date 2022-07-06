<template>
<div class="warp">
    <headerpage></headerpage>
    <div class="admin-warp-content" v-if="post_menu"><router-view></router-view></div>
    <div class="admin-warp-content" v-if="!post_menu" v-loading="true"></div>
    <!-- <footerpage class="footer-page"></footerpage> -->
</div>
</template>

<script>
import headerpage from '@/components/admin/common/header'
import footerpage from '@/components/admin/common/footer'
import store from '@/router/store'
export default {
  name: 'index',
  components:{headerpage,footerpage},
  created(){
    var _that = this;
    let appMenu = store.state.menuList;
    let appDetails = store.state.appDetails;
    document.title = (appDetails.appName||'')+'-'+JSON.parse(localStorage.getItem('orgInfo')).orgName;
    //菜单
    if(!appMenu || appMenu==null || appMenu==undefined || appMenu =='' || appMenu == '[]'){
      _that.http.getPlain('auth_tree','').then((res) => {
        let dataList = res.data||[];
        store.commit('menuList',dataList);
        _that.post_menu = true;
      }).catch((err) => {
        _that.$message({type: 'error',message: '获取菜单失败!'});
      });
    }else{
      _that.post_menu = true;
    }
  },
  data () {
    return {
      post_menu:false,
    }
  },
  methods:{}
}
</script>

<style lang="less">
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/font/iconfont.css";
@import "../../../assets/admin/css/style.less";
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
</style>
