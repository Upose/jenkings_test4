<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu></serviceLMenu></el-aside>
      <el-main class="admin-content" :class="{'content-collapse':$root.collapse}">
          
        <topSelect :dataList="top_list" @setHFooter="setHFooter" @saveClick="saveClick" @scenePreview="scenePreview" @topCheck="topCheck" @setName="setName" @getDetailsGroup="getDetailsGroup" ref="topselect_ref"></topSelect>
       
       <div class="drag-content" :style="{'min-height':drag_height+'px'}">
        <leftCheck ref="leftcheck_ref" :dataList="left_list" :left_fold.sync="left_fold" @getAppDetails="getAppDetails" @getAppsList="getAppsList" @layoutClick="layoutClick" @setTheme="setTheme" @templateClick="templateClick"></leftCheck>
        
        
        <div class="drag-c" :class="isFoldClass()">
          <div class="screen-btn-drag" v-show="postForm.layoutId== 2 || postForm.layoutId== 4">
            <el-button size="small" class="default-btn-n-border screen-one" :class="screen_cu==0?'s-b-active':''" @click="screenClick(0)">首屏<span class="s-b-d-close el-icon-error" @click.stop="removScreen(0)"></span></el-button>
            <div class="drag-box-warp" ref="dragBox">
              <el-button size="small" v-for="(item,index) in screen_list" :key="'dragbox'+index" class="default-btn-n-border" @click="screenClick(index)" :class="screen_cu==index?'s-b-active-close':''" v-if="index!=0">第{{index+1}}屏<span class="s-b-d-close el-icon-error" @click.stop="removScreen(index)"></span></el-button>
            </div>
            <el-button size="small" class="default-btn-n-border s-b-add" icon="el-icon-plus" @click="addScreen()">新增1屏</el-button>
          </div><!--屏幕数量+拖拽 end-->

          <div class="drag-container" ref="dragContainer" :class="postForm.themeColor||'template1'">
            <div class="drag-warp-bg jl_vip_zt_warp_preview">
              <div class="drag-content grid-stack" ref="grid_stack" :style="{'zoom':ratio_num,'width':drag_width+'px'}"></div>
            </div>
          </div><!--拖拽板块-->

          <scalingPage class="scaling-right" ref="scalingRef" :ratio_num.sync="ratio_num" :width="drag_width"></scalingPage>
          <!-- 缩放组件 -->
        </div><!--中间内容 end-->


        <rightCheck ref="rightCheck_ref" :right_fold.sync="right_fold" @addCompont="addCompont" @saveTempSet="saveTempSet"></rightCheck>

       </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import scene_set from "./scene_set";
export default {
  components:scene_set.components,
  data:scene_set.data,
  created:scene_set.created,
  destroyed:scene_set.destroyed,
  mounted:scene_set.mounted,
  methods:scene_set.methods,
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";
@import "./scene_set.less";
@import "../../../assets/web/css/color.less";
</style>

