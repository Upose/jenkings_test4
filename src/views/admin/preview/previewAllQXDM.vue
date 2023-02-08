<!---分段-清新淡墨-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">
      <!--宽1200通用-->
      <component v-if="details.headerTemplate" :is="'previewhead'" :data="details" :isstyleSet="true"></component>

      <div class="scene-warp-bg" v-for="(it,i) in details.sceneScreens" :key="i+'scene'" :id="'temp'+i" :style="$styleSet(details,it,i)">

        <component v-if="it.customParameter&&!it.bgImg" :is="it.customParameter"></component>
        <component :bgImg="it.bgImg" :is="'BGvideoImg'" v-if="i==0"></component>

        <div class="dalib-template-bg" v-if="i!=0">
          <div class="d-t-w">
            <div class="tbg-c1"></div>
            <!--背景色板块-->
            <div class="img-w" :style="$styleSet(details,it,i)"></div>
            <!--背景图板块-->
          </div>
        </div><!-- 背景板块 end -->
        <div class="bocy-content" :style="{height:it.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
          <div v-for="(item,index) in it.sceneApps" :key="index" :class="$isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
            <div :class="$isWidgetCode(item)" :style="{height:'100%'}" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="$commonWidgetSetFormat(item.commonWidgetSet)">
              <div :id="$setId()"></div>
            </div>
          </div>
        </div>

      </div>

      <component v-if="details.footerTemplate" :is="'previewfoot'" :data="details" :isstyleSet="false"></component>

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
      // console.log(e, scrollTop);
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
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      if (val.appWidget && val.appWidget.target) {
        this.$addStyle(val.appWidget.target + '/component.css');
        this.$addScript(val.appWidget.target + '/component.js');
      }
      return styleList;
    },
  },
}
</script>

<style lang="less" scoped>
@import "./css/previewAllQXDM.less";
</style>