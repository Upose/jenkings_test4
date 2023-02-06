<!---通用预览+普通分段-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">
      <!--宽1200通用-->

      <div v-if="details.headerTemplate" :class="details.headerTemplate.templateCode" :data-set="JSON.stringify({
          logo:details.headerTemplate.logo||'',
          headerBgImg:details.headerTemplate.headerBgImg||'',
          displayNavColumn:details.headerTemplate.displayNavColumn||'',
          headerAttachWidget:details.headerTemplate.headerAttachWidget||[],
          sceneid:details.id,
        })" :style="styleSet({},-1)">
        <div :id="$setId()"></div>
      </div><!-- 头部信息-end -->

      <div class="scene-warp-bg" v-for="(it,i) in details.sceneScreens" :key="i+'scene'" :id="'temp'+i" :style="styleSet(it,i)">

        <component v-if="it.customParameter&&!it.bgImg" :is="it.customParameter"></component>
        <component :bgImg="it.bgImg" :is="'BGvideoImg'" v-if="i==0"></component>

        <div class="bocy-content" :style="{height:it.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
          <div v-for="(item,index) in it.sceneApps" :key="index" :class="$isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
            <div :class="$isWidgetCode(item)" :style="{height:'100%'}" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="$commonWidgetSetFormat(item.commonWidgetSet)">
              <div :id="$setId()"></div>
            </div>
          </div>
        </div>

      </div>

      <div v-if="details.footerTemplate" :class="details.footerTemplate.templateCode" :data-set="JSON.stringify({
          content:details.footerTemplate.content||'',
          footerBgImg:details.footerTemplate.footerBgImg||'',
          footerDisplayNavColumn:details.footerTemplate.footerDisplayNavColumn||'',
          sceneid:details.id,
        })">
        <div :id="$setId()"></div>
      </div><!-- 底部信息-end -->

      <div class="dlib3-hovering-menu" v-if="details.layoutId==2 && details && details.sceneScreens">
        <a class="temp-box" v-for="(it,i) in (details.sceneScreens||[])" :key="i" @click="clickSilder('temp'+i)">
          <img class="temp-icon" :src="fileUrl+it.icon" :class="it.icon?'':'temp-icon-hide'">
          <span class="temp-title" :title="it.screenName">{{it.screenName}}</span>
        </a>
      </div>
      <!--悬浮菜单 end-->

    </template>

  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['details'],
  created() {
    if (this.details && this.details.template) {
      this.bg_color = this.details.template.backgroundColor || '#fff';
      if (this.details.headerTemplate && this.details.headerTemplate.router) {
        this.$addStyle(this.details.headerTemplate.router + '/component.css');
        this.$addScript(this.details.headerTemplate.router + '/component.js');
      }
      if (this.details.footerTemplate && this.details.footerTemplate.router) {
        this.$addStyle(this.details.footerTemplate.router + '/component.css');
        this.$addScript(this.details.footerTemplate.router + '/component.js');
      }
      if (this.details.sceneScreens) {
        this.details.sceneScreens[0].sceneApps.forEach(it => {
          if (it.appWidget && it.appWidget.target) {
            this.$addStyle(it.appWidget.target + '/component.css');
            this.$addScript(it.appWidget.target + '/component.js');
          }
        })
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.appScroll)
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      bg_color: '#fff',//背景颜色
      details: {},
    }
  },
  methods: {
    //滚动事件
    appScroll(e) {
      e.preventDefault();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  //浏览器兼容
    },
    //悬浮菜单点击事件
    clickSilder(val) {
      document.getElementById(val).scrollIntoView({ behavior: 'smooth' });
    },
    //初始化模板
    styleRender(val) {//css 渲染
      var w = this.details.template.width || 100;
      var styleList = {
        width: (val.width / w) * 1000 + '%',
        height: (val.height * 10) + 'px',
        top: (val.yIndex * 10) + 'px',
        left: 10 * val.xIndex + 'px',
        position: 'absolute',
      };
      if (val.appWidget && val.appWidget.target) {
        this.$addStyle(val.appWidget.target + '/component.css');
        this.$addScript(val.appWidget.target + '/component.js');
      }
      return styleList;
    },
    
    //样式设置
    styleSet(it, i) {
      var list = {};
      if (i < 0 && this.details.sceneScreens && this.details.sceneScreens[0]) {
        list = { 'background': this.bg_color + ' url(' + this.fileUrl + (this.details.sceneScreens[0].bgImg || '') + ')', 'background-position': 'center top !important' };
      } else if (i == 0) {//第一屏
        if (this.details.sceneScreens.length > 1) {//多屏情况下的第一屏
          list = { 'background': this.bg_color + ' url(' + this.fileUrl + (it.bgImg || '') + ')', 'background-position-y': (-(this.details.headerTemplate.height * 10) + 'px !important'), 'background-repeat': 'repeat-x' };
        } else {
          list = { 'background': this.bg_color + ' url(' + this.fileUrl + (it.bgImg || '') + ')', 'background-position': 'center top !important', 'background-repeat': 'repeat-x' };
        }
      } else {
        list = { 'background': this.bg_color + ' url(' + this.fileUrl + (it.bgImg || '') + ')' };
      }
      return list;
    },
    
  },
}
</script>

<style lang="less" scoped>
@import "./css/previewAll.less";
</style>