<!--
 * @Description: 后台左侧导航栏
 * @Author: wanjikun
 * @Date: 2022-07-25 14:10:18
 * @LastEditTime: 2022-07-27 16:57:39
 * @LastEditors: gongqin
-->
<template>
  <div class="header-warp">
    <div class="m-menu">
      <div class="m-text">
        <span class="m">{{appInfo.appName}}</span>
        <div class="v-cont">
          <span class="v" @click="openLog(appInfo.logUrl)">v{{appInfo.appVersion}}</span>
          <img  @click="collapseChage" :src="$root.collapse ? zhankai :shouqi" class="img-collapse"/>
        </div>
      </div>
    </div>
    <div class="s-menu">
      <template v-for="(item,index) in dataList">
        <MenuItem :key="index+'menu'" v-if="!(item.permissionNodes && item.permissionNodes.length)" :item="item"/>
        <SubMenu v-else :key="index+'menu'" :item="item"/>
      </template>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus';
import MenuItem from './components/menu-item.vue'
import SubMenu from './components/sub-menu.vue'
export default {
  props:['dataList'],
  name: 'test',
  components: {
    MenuItem,
    SubMenu
  },
  data() {
    return {
      default_img: require('@/assets/admin/img/upload/user-img.png'),
      appInfo: this.$store.state.appDetails,//应用信息 应用名、版本号
      zhankai:require('./img/zhankai.svg'),
      shouqi:require('./img/shouqi.svg')
    }
  },
  methods: {
    openPage(val) {
      let url = val.component.indexOf('?') != -1 ? val.component + '&columnName=' + val.name : val.component + '?columnName=' + val.name;
      this.$router.push(url);
    },
    //是否当前菜单
    isActive(url) {
      let id = this.$route.query.id || this.$route.query.columnId;
      var cu_href = this.$route.meta.parentRoute == '/admin_programInfo' ? this.$route.meta.parentRoute + '?id=' + id : this.$route.meta.parentRoute;
      if (url == cu_href) {
        return true;
      } else {
        return false;
      }
    },
    openLog(url) {
      window.location.href = url;
    },
    // 侧边栏折叠展开
    collapseChage() {
      this.$root.collapse = !this.$root.collapse;
      bus.$emit('collapse', this.$root.collapse);
    },
  },
}
</script>

<style lang="less" scoped>
@import "~@/assets/admin/css/color.less"; /**颜色配置 */
.m-menu {
  padding-left: 20px;
  padding-top: 22px;
  padding-bottom: 22px;
  .m-text {
    display: inline-block;
    vertical-align: middle;
    width: 200px;
    height: 80px;
    background: @ph-col-n2;
    opacity: 1;
    border-radius: 8px;
    position: relative;
    padding-left: 30px;
    padding-top: 17px;
    &::after {
      content: "";
      position: absolute;
      height: 40px;
      width: 4px;
      // top: 17px;
      top:50%;
      transform: translateY(-50%);
      background-color: @m-col-b9;
    }
    span {
      display: block;
      color: #3E54EE;
      padding-left: 16px;
    }
    .m {
      font-size: 24px;
      font-weight: bold;
    }
    .v {
      cursor: pointer;
      display: block;
      font-size: 12px;
    }
    .v-cont{
      display:flex;
      flex-direction: row;
      justify-content:space-between;
      align-items:center;
      .img-collapse{
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
/***折叠后菜单**/
.fold-menu {
  .m-menu {
    padding-left: 6px;
    border-bottom: 1px solid  #F4F7FC;
    padding-bottom: 10px;
    margin-bottom: 12px;
    .m-text {
      width: 80px;
      height: 57px;
      padding-left: 0;
      padding-top: 4px;
      border-radius: 3px;
      background:transparent;
      padding-bottom: 0;
      &::after {
        height: 0;
      }
      span {
        padding-left: 4px;
      }
      .m {
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
