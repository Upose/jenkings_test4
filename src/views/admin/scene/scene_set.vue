<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''">
        <serviceLMenu></serviceLMenu>
      </el-aside>
      <el-main class="admin-content" :class="{'content-collapse':$root.collapse}">
        <topSelect ref="topselect_ref" :dataList="top_list" :postForm="postForm" @setHFooter="setHFooter" @saveClick="saveClick" @scenePreview="scenePreview" @getDetailsGroup="getDetailsGroup"></topSelect>

        <div class="drag-content" :style="{'min-height':(drag_height-1)+'px'}">
          <leftCheck ref="leftcheck_ref" @sceneLeftBG="sceneLeftBG" @rightMenu="rightMenu" @addCompont="addCompont" :left_fold.sync="left_fold" v-show="!left_fold" :screen_cu="screen_cu" :screen_list="screen_list" :appServiceType="appServiceType" :postForm="postForm" @getAppDetails="getAppDetails" @setAppsList="setAppsList" @layoutClick="layoutClick" @setTheme="setTheme" @templateClick="templateClick"></leftCheck>

          <div class="drag-c">
            <div class="screen-btn-drag" v-show="(postForm.layoutId== 2||postForm.layoutId== 3) && postForm.template">
              <el-button size="small" class="default-btn-n-border screen-one" :class="screen_cu==0?'s-b-active':''">
                <span class="txt-show" @click="screenClick(0)">{{screen_list[0].screenName||''}}</span>
                <input type="text" class="txt-edit" v-model="screen_list[0].screenName" v-if="screen_list[0].isedit"/>
                <i class="iconfont s-btn-edit" :class="screen_list[0].isedit?'el-icon-vip-gou2':'el-icon-vip-bianji'" @click.stop="editScreen(0)"></i>
              </el-button>
              <span class="drag-box-warp" ref="dragBox" style="display: unset;">
                <el-button size="small" v-for="(item,index) in screen_list" :key="'dragbox'+index" class="default-btn-n-border" :class="screen_cu==index?'s-b-active-close':''" v-if="index!=0 && index!=(screen_list.length-1)">
                  <span class="txt-show" @click="screenClick(index)">{{item.screenName||''}}</span>
                  <input type="text" class="txt-edit" v-model="item.screenName" v-if="item.isedit"/>
                  <span class="s-b-d-close el-icon-error" @click.stop="removScreen(index)"></span>
                  <i class="iconfont s-btn-edit" :class="item.isedit?'el-icon-vip-gou2':'el-icon-vip-bianji'" @click.stop="editScreen(index)"></i>
                </el-button>
              </span>
              <el-button size="small" class="default-btn-n-border screen-one" :class="screen_cu==(screen_list.length-1)?'s-b-active':''">
                <span class="txt-show"  @click="screenClick(screen_list.length-1)">{{screen_list[screen_list.length-1].screenName||''}}</span>
                <input type="text" class="txt-edit" v-model="screen_list[screen_list.length-1].screenName" v-if="screen_list[screen_list.length-1].isedit"/>
                <i class="iconfont s-btn-edit" :class="screen_list[screen_list.length-1].isedit?'el-icon-vip-gou2':'el-icon-vip-bianji'" @click.stop="editScreen(screen_list.length-1)"></i>
              </el-button>
              <el-button size="small" class="default-btn-n-border s-b-add" icon="el-icon-plus" @click="addScreen()">新增1屏</el-button>
            </div>
            <!--屏幕数量+拖拽排序 end-->

            <div class="drag-container" ref="dragContainer" :class="postForm.themeColor||'template1'">
              <div class="drag-warp-bg jl_vip_zt_warp_preview" :style="{'zoom':ratio_num}">
                <!--scene-warp-bg 层是为了将拖拽区域包起来，然后设置背景颜色保持和预览效果一致-->
                <div class="scene-warp-bg" :id="'temp'+screen_cu">

                  <component v-if="(postForm.sceneScreens[screen_cu]||{}).customParameter&&!(postForm.sceneScreens[screen_cu]||{}).bgImg" :is="(postForm.sceneScreens[screen_cu]||{}).customParameter||'previewAll'"></component>
                  <component :bgImg="(postForm.sceneScreens[screen_cu]||{}).bgImg||''" :is="'BGvideoImg'" v-if="screen_cu==0"></component>

                  <div style="z-index:5;position:relative;">
                      <div class="jl_vip_zt_warp_hf head" :class="is_HF=='header'?'mask-layer-active':''" v-show="postForm.headerTemplate && postForm.headerTemplate.router && postForm.headerTemplate.templateCode && (postForm.layoutId== 2?(screen_cu==0):true)" style="min-height:50px" :style="{'height':(postForm.headerTemplate.height*10)+'px'}">
                        <div class="mask-layer head"></div>
                        <i class="jl_vip_zt_del" @click="delTempHF('header')"></i>
                        <div :class="postForm.headerTemplate.templateCode" id="jl_vip_zt_header_warp" :data-set="JSON.stringify({
                        logo:postForm.headerTemplate.logo||'',
                        headerBgImg:postForm.headerTemplate.headerBgImg||'',
                        displayNavColumn:postForm.headerTemplate.displayNavColumn||'',
                        headerAttachWidget:postForm.headerTemplate.headerAttachWidget||[],
                        sceneid:postForm.id,
                        })">
                          <div id="jl_vip_zt_header"></div>
                        </div>
                      </div>
                      <!--头部 end-->

                      <div class="drag-content grid-stack" ref="grid_stack" :style="{'width':drag_width+'px'}"></div>
                      <!--拖拽区域-->

                      <div class="jl_vip_zt_warp_hf foot" :class="is_HF=='foot'?'mask-layer-active':''" v-show="postForm.footerTemplate && postForm.footerTemplate.router && postForm.footerTemplate.templateCode && (postForm.layoutId== 2?(screen_cu==(screen_list.length-1)):true)" style="min-height:50px">
                        <div class="mask-layer foot"></div>
                        <i class="jl_vip_zt_del" @click="delTempHF('foot')"></i>
                        <div :class="postForm.footerTemplate.templateCode" id="jl_vip_zt_footer_warp" :data-set="JSON.stringify({
                        content:postForm.footerTemplate.content||'',
                        footerBgImg:postForm.footerTemplate.footerBgImg||'',
                        footerDisplayNavColumn:postForm.footerTemplate.footerDisplayNavColumn||'',
                        sceneid:postForm.id,
                      })">
                          <div id="jl_vip_zt_footer"></div>
                        </div>
                      </div>
                      <!--底部 end-->
                  </div>

                </div>
              </div>
            </div>
            <!--拖拽板块-->

            <scalingPage class="scaling-right" ref="scalingRef" :ratio_num.sync="ratio_num" :width="drag_width"></scalingPage>
            <!-- 缩放组件 -->

            
          </div>
          <!--中间内容 end-->
          <div class="left-menu-flex">
            <span @click="left_fold=false" v-show="left_fold"></span>
            <span @click="right_fold=false" v-show="right_fold"></span>
          </div>

          <rightCheck ref="rightCheck_ref" @loadHeadFoot="loadHeadFoot" @refreshHF="refreshHF" :postForm="postForm" :right_fold.sync="right_fold" v-show="!right_fold" @addCompont="addCompont" @saveTempSet="saveTempSet"></rightCheck>

        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import scene_set from "./scene_set";
export default {
  components: scene_set.components,
  data: scene_set.data,
  beforeDestroy: scene_set.beforeDestroy,
  created: scene_set.created,
  destroyed: scene_set.destroyed,
  mounted: scene_set.mounted,
  methods: scene_set.methods,
}
</script>

<style lang="less">
@import "../preview/css/publicGlobal.less";
</style>
<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";
@import "./scene_set.less";
</style>

