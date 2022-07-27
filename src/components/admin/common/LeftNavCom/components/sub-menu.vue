<!--
 * @Description: 菜单项
 * @Author: wanjikun
 * @Date: 2022-07-25 14:19:52
 * @LastEditTime: 2022-07-27 10:02:18
 * @LastEditors: gongqin
-->
<template>
  <div class="sub-menu" :class="{'active':$route.meta.parentRoute == '/admin_databaseNav'}">
    <div class="sub-menu-tit" :class="{'expand':showSubMenu}" :title="item.name" @click="showSubMenu = !showSubMenu">
      <i class="iconfont el-icon-vip-daohanglanmu"></i>
      <span>{{item.name}}</span>
    </div>
    <collapse-transition>
      <div v-show="showSubMenu" class="sub-menu-cont">
        <div class="sub-menu-item-box" 
          :title="_item.name"
          :class="isActive(_item.router)?'active':''" 
          v-for="_item in item.permissionNodes" 
          @click="openPage(_item)"
          :key="_item.router">
          <div class="sub-menu-item">
            <span>{{_item.name}}</span>
          </div>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>
<script>
import CollapseTransition from '../util/collapse-transition.js';
export default {
  props: ['item'],
  components: {
      'collapse-transition': CollapseTransition,
  },
  data(){
    return{
      showSubMenu:true
    }
  },
  methods: {
    openPage(val) {
      console.log(val)
      this.$router.push(val.router);
    },
    //是否当前菜单
    isActive(url) {
      var cu_href = this.$route.meta.parentRoute;
      if (url == cu_href) {
        return true;
      } else {
        return false;
      }
    },
  }
}
</script>
<style lang="less" scoped>
@import "~@/assets/admin/css/color.less"; /**颜色配置 */
.sub-menu{
  width:245px;
  position: relative;
  z-index: 99;
  // padding-bottom: 10px;
  &:hover,&.active{
    box-shadow: 0px 2px 5px 1px rgba(0, 0 ,0 , 5%);
    background:rgba(255,255,255,0.6);
    border-radius: 0px 3px 3px 0px;
    .sub-menu-tit{
      color: #6777EF;
    }
  }
}
.sub-menu-tit {
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  color: @6C757D;
  font-weight: bold;
  padding: 0 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position:relative;
  cursor: pointer;
  &:after {
    content: "";
    position: absolute;
    width:12px;
    height: 6px;
    background:url('../img/arrow.png');
    background-size: 100% auto;
    background-repeat: no-repeat;
    right: 36px;
    top:50%;
    margin-top: -3px;
    // transform:translateY(-50%);
    transition:all 0.2s;
    transform:rotateZ(-90deg);
  }
  &.expand{
    &:after {
      transform:rotateZ(0deg);
    }
  }
  &:hover{
    color: #6777EF;
  }
  i{
    margin-right: 8px;
  }
}
.sub-menu-cont{
  padding-bottom: 10px;
  .sub-menu-item-box{
    width:200px;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    &:hover,&.active{
      .sub-menu-item{
        background: #F4F7FC;
        color:@6C757D;
      }
      &:after{
        position: absolute;
        width: 2px;
        height: 100%;
        background: #6777EF;
        content: "";
        right: -16px;
        top: 0;
      }
    }
    .sub-menu-item{
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      color: #6C757D;
      font-weight: bold;
      // padding: 0 50px;
      padding-left: 40px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 5px 5px 5px 5px;
      position: relative;
      span{
        padding-left: 25px;
      }
    }
  }
}
/***折叠后菜单**/
.fold-menu {
  .sub-menu{
    width:90px;
    &:hover,&.active{
      box-shadow: none;
      background:transparent;
      border-radius: none;
      .sub-menu-tit{
        color: #6777EF;
      }
    }
  }
  .sub-menu-tit {
    padding: 0;
    font-size: 12px;
    font-weight: 400;
    span {
      width: 60px;
      display: inline-block;
      overflow: hidden;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 16px;
    }
    i {
      margin-right: 0;
      display: none;
    }
    &:hover {
      width: 80px;
      transition: width 0.3s ease-in-out;
    }
    &:after{
      right: initial;
      left: 2px;
      width:10px;
      // height: ;
    }
  }
  .sub-menu-cont{
    padding-right: 3px;
    .sub-menu-item-box{
      width:100%;
      .sub-menu-item{
        padding-left: 0;
        width:100%;
        font-weight: 400;
      }
      &.active{
        &:after{
          height: 0;
        }
        .sub-menu-item{
          background-color:transparent;
          color: #6777EF;
        }
      }
    }
  }
  .active {
    width: 80px;
    transition: width 0.3s ease-in-out;
  }
}  
</style>