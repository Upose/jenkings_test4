<!---通用预览+普通分段-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">
      <!--宽1200通用-->
      <component v-if="details.headerTemplate" :is="'previewhead'" :data="details" :isstyleSet="true"></component>

      <div class="scene-warp-bg" v-for="(it,i) in details.sceneScreens" :key="i+'scene'" :id="'temp'+i" :style="it.customParameter?'':$styleSet(details,it,i)">

        <component v-if="it.customParameter" :is="it.customParameter" :style="$styleSet(details,it,i)"></component>
        <component :bgImg="it.bgImg" :is="'BGvideoImg'" v-if="i==0"></component>

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
      if (this.details.sceneScreens) {
        this.details.sceneScreens[0].sceneApps.forEach(it => {
          if (it.appWidget && it.appWidget.target) {
            this.$addStyle(it.appWidget.target + '/component.css',it.appWidget.widgetCode);
            this.$addScript(it.appWidget.target + '/component.js',it.appWidget.widgetCode);
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
        this.$addStyle(val.appWidget.target + '/component.css',val.appWidget.widgetCode);
        this.$addScript(val.appWidget.target + '/component.js',val.appWidget.widgetCode);
      }
      return styleList;
    },
  },
}
</script>

<style lang="less" scoped>
@import "./css/previewAll.less";
</style>