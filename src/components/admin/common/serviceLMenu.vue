<!--左边菜单-->
<template>
  <div class="header-warp">
    <div class="m-menu">
      <div class="m-text">
        <span class="m">{{appDetails.appName}}</span>
        <span class="v">{{appDetails.appVersion}}</span>
      </div>
    </div>
    <div class="s-menu">
      <div class="s-row" :class="isActive(item.router)?'active':''"  :title="item.name" @click="openPage(item.router)" v-for="(item,index) in dataList" :key="index+'menu'"><i class="iconfont el-icon-vip-daohanglanmu"></i><span>{{item.name}}</span></div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'test',
  watch:{
    '$route':'force'
  },
  mounted(){
    var _this = this;
    let appMenu = this.$store.state.menuList;
    let appDetails = this.$store.state.appDetails;
    if(appDetails && appDetails!=null && appDetails!=undefined && appDetails !=''){
      _this.appDetails = appDetails;
    }
    if(appMenu && appMenu!=null && appMenu!=undefined && appMenu !='' && appMenu != '[]'){
      this.dataList = appMenu;
    }
  },
  data () {
    return {
      appDetails:{},//应用详情
      default_img:require('@/assets/admin/img/upload/user-img.png'),
      dataList:JSON.parse(window.localStorage.getItem('home_sys_menuAuth')||'[]'),
      // dataList:[
      //   // {icon:'el-icon-warning-outline',name:'场景管理',router:'/admin_caseShow'},
      //   // {icon:'el-icon-warning-outline',name:'栏目管理',router:'/admin_programManage'},
      //   // {icon:'el-icon-warning-outline',name:'终端管理',router:'/admin_terminalManage'},
      // ],
    }
  },
  methods:{
    openPage(url){
      this.$router.push(url).catch(err=>{});
    },
    force(){
      this.$forceUpdate();
    },
    //是否当前菜单
    isActive(url){
      var cu_url = this.$route.meta.parentRoute;
      if(url.indexOf(cu_url)>-1){
        return true;
      }else{
        return false;
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
.m-menu{
  padding-left: 20px;
  padding-top: 22px;
  padding-bottom: 22px;
  .m-text{
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 80px;
    background: @F4F7FC;
    opacity: 1;
    border-radius: 8px;
    position:relative;
    padding-left: 30px;
    padding-top:17px;
    &::after{
      content: '';
      position: absolute;
      height: 40px;
      width: 2px;
      top: 17px;
      background-color:@6677EF;
    }
    span{
      display: block;
      color: @6677EF;
      padding-left: 16px;
    }
    .m{
      font-size: 24px;
      font-weight: bold;
    }
    .v{
      display: block;
      font-size: 12px;
    }
  }
}
.s-menu{
  .s-row{
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: @6C757D;
    font-weight: bold;
    padding: 0 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    i{
      visibility: visible;
      transition: visibility 0s .3s;
      margin-right: 8px;
    }
    &:hover{
      cursor: pointer;
      width: 245px;
      z-index: 20;
      background: #FFFFFF;
      position: relative;
      color: @6777EF !important;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
      border-radius: 0px 3px 3px 0px;
      transition: width .3s ease-in-out;
      &:after{
        content: '';
        display: block;
        width: 2px;
        height: 15px;
        position: absolute;
        right: 0;
        top:13px;
        background-color: @6777EF;
      }
    }
  }
  .active{
    width: 245px;
    z-index: 20;
    background: #FFFFFF;
    position: relative;
    color: @6777EF !important;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0px 3px 3px 0px;
    transition: width .3s ease-in-out;
    &:after{
      content: '';
      display: block;
      width: 2px;
      height: 15px;
      position: absolute;
      right: 0px;
      top:13px;
      background-color: @6777EF;
    }
  }
}
/***折叠后菜单**/
.fold-menu{
  .s-row{
    padding:0;
    font-size: 12px;
    font-weight: 400;
    span{
      width: 60px;
      display: inline-block;
      overflow: hidden;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-left: 10px;
    }
    i{
      margin-right: 0;
      display: none;
    }
    &:hover{
      width: 80px;
      transition: width .3s ease-in-out;
    }
  }
  .active{
    width:80px;
    transition: width .3s ease-in-out;
  }
  .m-menu{
    padding-left: 6px;
    .m-text{
      width: 70px;
      height: 39px;
      padding-left: 0;
      padding-top:4px;
      border-radius:3px;
      &::after{
        height: 28px;
        top: 4px;
      }
      span{
        padding-left: 4px;
      }
      .m{
        font-size: 13px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>

