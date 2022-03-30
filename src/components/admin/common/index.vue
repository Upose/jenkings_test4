<template>
<div class="warp">
    <headerpage></headerpage>
    <div class="admin-warp-content" v-if="post_details && post_menu"><router-view></router-view></div>
    <div class="admin-warp-content" v-if="!post_details && !post_menu" v-loading="true"></div>
    <!-- <footerpage class="footer-page"></footerpage> -->
</div>
</template>

<script>
import headerpage from '@/components/admin/common/header'
import footerpage from '@/components/admin/common/footer'

export default {
  name: 'index',
  created(){
    var _that = this;
    let appMenu = sessionStorage.getItem('appMenu');
    let appDetails = sessionStorage.getItem('appDetails');
    //详情
    if(!appDetails || appDetails==null || appDetails==undefined || appDetails ==''){
      _that.http.getPlain('getcurrentappinfo','?appcode=scenemanage').then((res) => {
        if(res.data){
          sessionStorage.setItem('appDetails', JSON.stringify(res.data));
          document.title = res.data.appName+'-'+JSON.parse(localStorage.getItem('orgInfo')).orgName;
        }
        _that.post_details = true;
      }).catch(err=>{
        _that.$message({type: 'error',message: '获取应用详情失败!'});
      })
    }else{
       _that.post_details = true;
      document.title = JSON.parse(appDetails).appName||''+'-'+JSON.parse(localStorage.getItem('orgInfo')).orgName;
    }
    //菜单
    if(!appMenu || appMenu==null || appMenu==undefined || appMenu =='' || appMenu == '[]'){
      _that.http.getPlain('auth_tree','').then((res) => {
        let dataList = res.data||[];
        sessionStorage.setItem('appMenu',JSON.stringify(dataList));
        _that.post_menu = true;
      }).catch((err) => {
        _that.$message({type: 'error',message: '获取菜单失败!'});
      });
    }else{
      _that.post_menu = true;
    }
  },
  components:{headerpage,footerpage},
  data () {
    return {
      post_details:false,
      post_menu:false,
    }
  },
  methods:{
    
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
