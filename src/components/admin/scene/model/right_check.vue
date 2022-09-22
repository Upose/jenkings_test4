<!---服务中台-栏目-左边2,3步骤 -->
<template>
  <div class="drag-r" :class="right_fold?'drag-r-hide':''">
    <div class="drag-r-pad">
      <div class="right-check-page">
        <div class="drag-r-warp">
          <h1 class="step-num">
            <div class="title"><span class="num">4</span><span class="txt">应用设置</span></div>
            <div class="app-name" v-show="apps_name">选中应用：<i class="name">{{apps_name}}</i></div>
          </h1>
          <div class="select-type" v-if="template_list.length>0">
            <h2 class="s-title">选择样式</h2>
            <div class="s-list">
              <div class="d-temp-box" v-for="(it,i) in template_list" :class="template_check == it.id?'d-temp-box-check':''" @click="appsTemplate(it,i)" :key="i">
                <img :src="fileUrl+it.cover" />
                <span class="temp-name">{{it.name||'无'}}</span>
                <el-button type="primary" class="button" size="mini"><i class="iconfont" :class="template_check == it.id?'el-icon-vip-check':'el-icon-vip-no-check'"></i> 选用</el-button>
              </div>
            </div>
          </div>
          <!--选择样式 end-->

          <div class="select-type">
            <h2 class="s-title bor-botm">设置内容</h2>
            <div class="model-set-w r-model-w c-l">
                <el-button class="default-btn-border btn-block" icon="el-icon-setting" v-if="is_hf=='foot'" size="medium" :data="postForm.footerTemplate" @click="footSetShow()">底部高级设置</el-button>
                <el-button class="default-btn-border btn-block" icon="el-icon-setting" v-if="is_hf=='header'" size="medium" :data="postForm.headerTemplate" @click="headSetShow()">头部高级设置</el-button>
                <div v-if="availableConfig.indexOf('4')>-1">
                  <div v-if="template_check && !is_hf" class="up-img w100 mt-5" :style="{'background-image':'url('+(configParameter.bgImg?(fileUrl+configParameter.bgImg):'')+')'}">
                    <div><img src="@/assets/admin/img/icon-upload.png"/><span>组件背景更换</span></div>
                    <input type="file" :id="'file_bg'" multiple="multiple" @change="handleFileJS">
                    <i class="del-img iconfont el-icon-vip-shanchu-1" @click="delBGImg()"></i>
                  </div>
                  <div class="row-switch" v-if="template_check && !is_hf">
                    <span class="title">铺满屏幕：</span>
                    <el-tooltip class="item" effect="dark" content="组件宽度为100%时此设置生效" placement="top">
                      <el-switch :active-value="true" :inactive-value="false" v-model="configParameter.fullScreen" @change="fullScreenClick"></el-switch>
                    </el-tooltip>
                  </div>
                </div>
            </div><!--组件配置 end-->

            <div class="s-choose">
              <div class="" v-for="(it,i) in set_list" :key="i">
                <div class="s-c-row" v-if="availableConfig.indexOf('1')>-1">
                  <h2 class="s-title">绑定栏目 
                    <span class="s-edit s-del" @click="removeRow(i)" v-if="i!=0"><i class="el-icon-minus"></i></span>
                    <span class="s-edit" @click="addRow()"><i class="el-icon-plus"></i></span>
                  </h2>
                  <el-select class="w-saml" v-model="it.id" size="medium" @change="column" placeholder="请选择">
                    <el-option v-for="(item,i) in appPlateList" :key="i+'c'" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
                <div class="s-c-row" v-if="availableConfig.indexOf('2')>-1">
                  <h2 class="s-title">显示条数</h2>
                  <el-select class="w-saml" v-model="it.topCount" size="medium" @change="showNum" placeholder="请选择">
                    <el-option v-for="(item,i) in topCountList" :key="i+'b'" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
                <div class="s-c-row" v-if="availableConfig.indexOf('3')>-1">
                  <h2 class="s-title">排序规则</h2>
                  <el-select class="w-saml" v-model="it.sortType" size="medium" placeholder="请选择">
                    <el-option v-for="(item,i) in sortList" :key="i+'a'" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
            </div><!--栏目配置 end--->

            <div>
              <el-button v-if="commonTemplateName=='title'" class="default-btn-border btn-block" icon="el-icon-setting" size="medium" @click="titleSet()">标题设置</el-button>
              <el-button v-if="commonTemplateName=='imgup'" class="default-btn-border btn-block" icon="el-icon-setting" size="medium" @click="imgupSet()">图片设置</el-button>
              <el-button v-if="commonTemplateName=='imgbanner'" class="default-btn-border btn-block" icon="el-icon-setting" size="medium" @click="imgbannerSet()">图片轮播设置</el-button>
            </div><!--通用组件-高级设置 end-->

          </div>
          <!--设置内容 end-->
        </div>
        <!--右边菜单 end-->
      </div>
      <i class="cut-btn" :class="right_fold?'el-icon-arrow-left':'el-icon-arrow-right'" @click="rightFold()"></i>
    </div>
    <!------------以下组件部分，主要是弹窗-各种高级设置等---------------->
    <headerSet v-if="headerSet" :postForm="postForm" @hfHide="hfHide" ></headerSet>
    <footerSet v-if="footerSet" :postForm="postForm" @hfHide="hfHide"></footerSet>
    <titleDialog v-if="commonTemplateAlert == 'title'" :data="{}" @closeCommon="closeCommon"></titleDialog>
    <imgUpDialog v-if="commonTemplateAlert == 'imgup'" :data="{}" @closeCommon="closeCommon"></imgUpDialog>
    <imgBannerDialog v-if="commonTemplateAlert == 'imgbanner'" :data="{}" @closeCommon="closeCommon"></imgBannerDialog>
  </div>
  <!--右边菜单 end-->
</template>

<script>
import right_check from "./right_check";
export default {
  components: right_check.components,
  data: right_check.data,
  beforeDestroy: right_check.beforeDestroy,
  created: right_check.created,
  destroyed: right_check.destroyed,
  mounted: right_check.mounted,
  methods: right_check.methods,
}
</script>

<style lang="less" scoped>
@import "~@/assets/admin/css/color.less";
@import "~@/assets/admin/css/style.less";
@import "../scene_set.less";
@import "./model.less";
</style>
