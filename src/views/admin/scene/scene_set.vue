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
          <leftCheck 
            ref="leftcheck_ref" 
            @sceneLeftBG="sceneLeftBG" 
            @rightMenu="rightMenu" 
            @addCompont="addCompont" 
            :left_fold.sync="left_fold"
            v-show="!left_fold" 
            :screen_cu="screen_cu" 
            :screen_list="screen_list" 
            :appServiceType="appServiceType" 
            :postForm="postForm" 
            @getAppDetails="getAppDetails" 
            @setAppsList="setAppsList" 
            @layoutClick="layoutClick" 
            @setTheme="setTheme" 
            @screenClick="screenClick" 
            @removScreen="removScreen" 
            @addScreen="addScreen" 
            @templateClick="templateClick">
           </leftCheck>

          <div class="drag-c">
            <div class="drag-container" ref="dragContainer" :class="postForm.themeColor||'template1'">
              <div class="drag-warp-bg jl_vip_zt_warp_preview" :style="{'zoom':ratio_num}">
                <!--scene-warp-bg 层是为了将拖拽区域包起来，然后设置背景颜色保持和预览效果一致-->
                <div class="scene-warp-bg" :id="'temp'+screen_cu" :style="setBgTemp((postForm.sceneScreens[screen_cu]||{}).bgImg)">
                  <component v-if="(postForm.sceneScreens[screen_cu]||{}).customParameter" :is="(postForm.sceneScreens[screen_cu]||{}).customParameter||'previewAll'" :data="postForm.sceneScreens[screen_cu]||{}"></component>
                  <component :bgImg="(postForm.sceneScreens[screen_cu]||{}).bgImg||''" :is="'BGvideoImg'" v-if="screen_cu==0" :class="(postForm.template||{}).uniqueCode=='onscreenfashion'?'bg-top110':''"></component>

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
  .grid-stack-item .common-placeholder-warp{
    width: 100%;
    height: 100%;
    font-size:12px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #969696;
    text-shadow: white -1px 1px 0px;
    background: url(../../../assets/admin/img/union.svg) center;
    background-size:100% 100%;
    &::after{
      content: '空白占位框'
    }
  }
  .drag-content .dlib3-temp-imgvideo .img-warp-bg{
    background-repeat-y: no-repeat !important;
  }
  .bg-top110 .img-warp-bg{
    background-position-y:110px !important;
  }
</style>
<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";
@import "./scene_set.less";
</style>

