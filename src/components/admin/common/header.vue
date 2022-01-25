<template>
  <div class="header-warp">
    <div class="logo-w" :class="{'logo-collapse':$root.collapse}">
      <a href="javascript:;"><img :src="$root.collapse?logoList.show:logoList.hide"></a>
    </div>
    <a href="javascript:;" class="m-cut" @click="collapseChage"><i class="el-icon-s-fold"></i></a>
    <!-- <div class="m-box-list">
      <a href="javascript:;" class="m-box" @click="openPage(item.url)" v-for="(item,index) in dataList" :key="index">
        <span class="name">{{item.title}}</span>
      </a>
    </div> -->
    <div class="m-box-list" :class="{'logo-collapse-left':$root.collapse}">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.appName" :name="index" v-for="(item,index) in dataList" :key="index"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="login-msg-warp">
      <div class="u-img-w"><el-image class="u-img" :src="default_img" :fit="'contain'"></el-image></div>
      <span class="u-name">user admin</span>
      <i class="el-icon-warning-outline loginOut" title="退出登录" @click="outLogin()"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'test',
  data () {
    return {
      activeName:0,
      default_img:require('@/assets/admin/img/upload/user-img.png'),
      logoList:{
        show:require('@/assets/admin/img/logo.png'),
        hide:require('@/assets/admin/img/logo-text.png'),
      },
      dataList:[],
      // dataList:[
      //   {icon:'el-icon-warning-outline',appName:'工作台',backendUrl:'/admin_librarianWorkbench'},
      //   {icon:'el-icon-warning-outline',appName:'应用中心',backendUrl:'/admin_appInfo'},
      //   {icon:'el-icon-warning-outline',appName:'场景管理',backendUrl:'/admin_admin_caseShow'},
      //   {icon:'el-icon-warning-outline',appName:'用户管理',backendUrl:'/admin_tableList'},
      //   {icon:'el-icon-warning-outline',appName:'数据管理',backendUrl:'/admin_dataCentre'},
      //   {icon:'el-icon-warning-outline',appName:'运行统计',backendUrl:'/admin_tableList'},
      //   {icon:'el-icon-warning-outline',appName:'应用开放中心',backendUrl:'/admin_appManage'},
      //   {icon:'el-icon-warning-outline',appName:'新闻发布',backendUrl:'/admin_newsProgram'},
      //   {icon:'el-icon-warning-outline',appName:'文献专题引擎',backendUrl:'/admin_specialProgram'},
      //   {icon:'el-icon-warning-outline',appName:'文献智能推荐',backendUrl:'/admin_intelligentManage'},
      //   {icon:'el-icon-warning-outline',appName:'信息导航',backendUrl:'/admin_navigationProgram'},
      //   {icon:'el-icon-warning-outline',appName:'数据库导航',backendUrl:'/admin_databaseNav'},
      // ],
    }
  },
  mounted(){
    this.http.getPlain_url('getmgrtopmenu','').then(res=>{
      this.dataList = res.data||[];
    }).catch(err=>{
    })
  },
  methods:{
    // 侧边栏折叠展开
    collapseChage(){
        this.$root.collapse = !this.$root.collapse;
        console.log();
        this.bus.$emit('collapse', this.$root.collapse);
    },
    handleClick(tab, event) {
      window.location.href = this.dataList[this.activeName].backendUrl||'#';
    },
    outLogin(){
      this.$store.commit('logout');
      this.$router.push('/login');
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
.header-warp{
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
  color: @6C757D;
  height: 40px;
  z-index: 20;
  position: relative;
  background-color: @fff;
  a{
    color: @6C757D;
  }
  .logo-w{
    vertical-align: middle;
    display: inline-block;
    padding:0 10px;
    width: 240px;
    height: 100%;
    transition: width .3s ease-in-out;
    a{
      color: #fff;
      margin-left: 10px;
      display: block;
      height: 100%;
      line-height:40px;
      width: 100%;
      vertical-align:middle;
    }
  }
  .logo-collapse{
    width: 65px;
  }
  .m-cut{
    font-size: 24px;
    vertical-align: middle;
    margin-left:16px;
  }
  /**box-菜单**/
  .m-box-list{
    display: inline-block;
    height: 100%;
    vertical-align:middle;
    position: absolute;
    left: 300px;
    right: 200px;
    transition: left .3s ease-in-out;
    .m-box{
      line-height: 40px;
      margin-right: 20px;
      font-size: 13px;
      font-weight: 500;
      font-family:'Microsoft YaHei';
      &:first-child{
        margin-left: 16px;
      }
      &:last-child{
        margin-right: 0;
      }
      i{
        font-size: 24px;
        vertical-align: middle;
      }
      span.name{
        vertical-align: middle;
      }
    }
  }
  .logo-collapse-left{
    left:127px;
    transition: left .3s ease-in-out;
  }
  
  /**用户信息-退出登录**/
  .login-msg-warp{
    position: absolute;
    right:24px;
    top: 0;
    z-index: 9;
    line-height: 40px;
    .u-img-w{
      width: 30px;
      height: 30px;
      display: inline-block;
      vertical-align: middle;
      background-color: @C2C8C0;
      border-radius: 50%;
      overflow: hidden;
      .u-img{
        width: 30px;
        height: 30px;
        padding: 3px;
      }
    }
    .u-name{
      font-size: 14px;
      margin: 0 8px;
    }
    .loginOut{
      font-size: 24px;
      vertical-align: middle;
    }
  }
}
/**重置样式**/
/deep/.el-tabs__item.is-active{
  color:@6C757D;
}
/deep/.el-tabs__item{
  color:@6C757D;
}
/deep/.el-tabs__item:hover{
  color:@6777EF;
}
/deep/.el-tabs__active-bar{
  display:none;
}
/deep/.el-tabs__content{
  display:none;
}
/deep/.el-tabs__nav-wrap::after{
  height:0;
}
</style>
