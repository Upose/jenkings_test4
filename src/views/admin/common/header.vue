<template>
  <div class="header-warp">
    <div class="logo-w" :class="{'logo-collapse':$root.collapse}">
      <a href="javascript:;"><img :src="$root.collapse?logoList.show:logoList.hide"></a>
    </div><!--logo板块-->

    <!-- <a href="javascript:;" class="m-cut" @click="collapseChage"><i class="iconfont" :class="$root.collapse?'el-icon-vip-zhankai':'el-icon-vip-shouqi'"></i></a> -->
    <!--开启关闭左侧菜单按钮-->

    <div class="m-box-list" :class="{'logo-collapse-left':$root.collapse}">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="item.appName" :name="index" v-for="(item,index) in dataList" :key="index"></el-tab-pane>
      </el-tabs>
    </div><!--顶部导航菜单-->

    <div class="login-msg-warp">
      <div class="u-img-w"><el-image class="u-img" v-if="userInfo" :src="fileUrl+userInfo.photo||default_img" :fit="'contain'"></el-image></div>
      <span class="u-name">{{userInfo.name||''}}</span>
      <i class="iconfont el-icon-vip-tuichu loginOut" title="退出登录" @click="outLogin()"></i>
    </div><!--右侧用户信息/退出登录板块-->

  </div>
</template>

<script>

export default {
  name: 'test',
  data () {
    return {
      userInfo:JSON.parse(window.localStorage.getItem('userInfo')||'{}'),
      fileUrl:window.localStorage.getItem('fileUrl'),
      activeName:0,
      default_img:require('@/assets/admin/img/upload/user-img.png'),
      logoList:{
        show:window.localStorage.getItem('fileUrl')+'/uploads/cqu/scene/admin-logo-min.png',
        hide:window.localStorage.getItem('fileUrl')+'/uploads/cqu/scene/admin-logo-text.png',
      },
      dataList:[],
    }
  },
  mounted(){
    this.http.getPlain_url('getmgrtopmenu','').then(res=>{
      this.dataList = res.data.appMenuList||[];
      this.logoList.show = localStorage.getItem('fileUrl')+res.data.simpleLogoUrl;
      this.logoList.hide = localStorage.getItem('fileUrl')+res.data.logoUrl;
    }).catch(err=>{})
  },
  methods:{
    //菜单点击事件
    handleClick(tab, event) {
      window.location.href = this.dataList[this.activeName].backendUrl||'#';
    },
    //退出登录
    outLogin(){
      this.$confirm('是否确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.clear();
        let current = window.location.href;
        localStorage.setItem('COM+', current);
        location.href = window.casBaseUrl+'/cas/logout?service=' + encodeURIComponent(window.location);
      }).catch(() => {
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
.header-warp{
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
  color: @ph-col-n10;
  height: 40px;
  z-index: 25;
  position: relative;
  background-color: @m-col-b0;
  a{
    color: @ph-col-n10;
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
      margin-left: 25px;
      display: block;
      height: 100%;
      line-height:40px;
      width: 100%;
      display: flex;
      align-items: center;
      img{
        max-height: 35px;
        max-width: 185px;
      }
    }
  }
  .logo-collapse{
    width: 80px;
    a{
      margin-left: 4px;
      img{
        max-height: 35px;
        max-width: 60px;
      }
    }
  }
  .m-cut{
    font-size: 16px;
    vertical-align: middle;
    margin-left:16px;
  }
  /**box-菜单**/
  .m-box-list{
    display: inline-block;
    height: 100%;
    vertical-align:middle;
    position: absolute;
    // left: 300px;
    left: 240px;
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
    left:115px;
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
      background-color: @ph-col-n28;
      border-radius: 50%;
      overflow: hidden;
      .u-img{
        width: 30px;
        height: 30px;
        padding: 3px;
        /deep/.el-image__inner{
          border-radius: 50%;
        }
      }
    }
    .u-name{
      font-size: 14px;
      margin: 0 8px;
    }
    .loginOut{
      cursor: pointer;
      font-size: 14px;
      vertical-align: middle;
      &:hover{
        color: #000;
      }
    }
  }
}
/**重置样式**/
/deep/.el-tabs__item.is-active{
  color:@ph-col-n10;
}
/deep/.el-tabs__item{
  color:@ph-col-n10;
}
/deep/.el-tabs__item:hover{
  color:@m-col-b7;
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
