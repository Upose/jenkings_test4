<!--
 * @Description: 菜单项
 * @Author: wanjikun
 * @Date: 2022-07-25 14:19:52
 * @LastEditTime: 2022-07-27 10:02:05
 * @LastEditors: gongqin
-->
<template>
  <a class="s-row" :class="isActive(item.router)?'active':''" :title="item.name" :href="$setHref({ url:item.router})">
    <i class="iconfont el-icon-vip-daohanglanmu"></i>
    <span>{{item.name}}</span>
  </a>
</template>
<script>
export default {
  props: ['item'],
  methods: {
    // openPage(val) {
    //   this.$router.push(val.router);
    // },
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
.s-row {
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  color: @ph-col-n10;
  font-weight: bold;
  padding: 0 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &.active {
    width: 245px;
    z-index: 20;
    background: rgba(255, 255, 255,0.6);
    position: relative;
    color: @m-col-b7 !important;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0px 3px 3px 0px;
    transition: width 0.3s ease-in-out;
    &:after {
      content: "";
      display: block;
      width: 2px;
      height: 15px;
      position: absolute;
      right: 5px;
      top: 13px;
      background-color: @m-col-b7;
    }
  }
  i {
    visibility: visible;
    transition: visibility 0s 0.3s;
    margin-right: 8px;
  }
  &:hover {
    cursor: pointer;
    width: 245px;
    z-index: 20;
    background: rgba(255, 255, 255,0.6);
    position: relative;
    color: @m-col-b7 !important;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
    border-radius: 0px 3px 3px 0px;
    transition: width 0.3s ease-in-out;
    &:after {
      content: "";
      display: block;
      width: 2px;
      height: 15px;
      position: absolute;
      right: 5px;
      top: 13px;
      background-color: @m-col-b7;
    }
  }
}
/***折叠后菜单**/
.fold-menu {
  .s-row {
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
      &:after {
        height: 0;
      }
    }
    &.active{
      box-shadow: none;
    }
  }
  .active {
    width: 80px;
    transition: width 0.3s ease-in-out;
    &:after{
      height: 0;
    }
  }
}  
</style>