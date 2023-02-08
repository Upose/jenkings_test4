<!---整屏滚动-通用-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">

      <div class="fullPage" ref="fullPage" v-if="details.sceneScreens">
        <div class="fullPageContainer" ref="fullPageContainer" @mousewheel="mouseWheelHandle" @DOMMouseScroll="mouseWheelHandle">
          <div class="section" v-for="(it,i) in details.sceneScreens" :style="{'background-image':' url('+fileUrl+(it.bgImg||'')+')'}">

            <component v-if="it.customParameter&&!it.bgImg" :is="it.customParameter"></component>
            <component :bgImg="it.bgImg" :is="'BGvideoImg'" v-if="i==0"></component>

            <div class="temp-header" v-if="i==0 && details.headerTemplate">
              <component :is="'previewhead'" :data="details" :isstyleSet="false"></component>
            </div>

            <div class="scene-warp-bg" :key="i+'scene'">
              <div class="bocy-content" :style="{height:it.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
                <div v-for="(item,index) in it.sceneApps" :key="index" :class="$isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
                  <div :class="$isWidgetCode(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="$commonWidgetSetFormat(item.commonWidgetSet)">
                    <div :id="$setId()"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="temp-footer" v-if="(i+1)==details.sceneScreens.length && details.footerTemplate">
              <component :data="details" :isstyleSet="false"></component>
            </div>

          </div>
        </div>
      </div>

      <div class="dlib3-hovering-menu" v-if="(details.layoutId==2||details.layoutId==3) && details && details.sceneScreens">
        <a class="temp-box thover-bg-c1" :class="fullpage.current==(i+1)?'temp-box-active tbg-c2':''" v-for="(it,i) in (details.sceneScreens||[])" :key="i" :id="'tempbox'+i" @click="clickSilder(i)">
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
      if (this.details.footerTemplate && this.details.footerTemplate.router) {
        this.$addStyle(this.details.footerTemplate.router + '/component.css');
        this.$addScript(this.details.footerTemplate.router + '/component.js');
      }
    }
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      details: {},
      opts: {//元素初始化高度
        cellHeight: '10',
        cellHeightThrottle: 100,
      },
      fullpage: {//分屏参数
        current: 1,
        isScrolling: false,
        deltaY: 0,
      },
    }
  },
  methods: {
    //初始化模板
    styleRender(val) {//css 渲染
      var w = this.details.template.width || 100;
      var list = {
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
      return list;
    },
    /********************分屏************** */
    //悬浮菜单点击事件
    clickSilder(val) {
      this.move(val + 1);
    },
    next() {
      let len = this.details.sceneScreens.length || 0;
      if (this.fullpage.current + 1 <= len) {
        this.fullpage.current += 1;
        this.move(this.fullpage.current);
      }
    },
    pre() {
      if (this.fullpage.current - 1 > 0) {
        this.fullpage.current -= 1;
        this.move(this.fullpage.current);
      }
    },
    move(index) {
      this.fullpage.isScrolling = true;
      this.directToMove(index);
      setTimeout(() => {
        this.fullpage.isScrolling = false;
      }, 1010);
    },
    directToMove(index) {
      let height = this.$refs["fullPage"].clientHeight;
      let scrollPage = this.$refs["fullPageContainer"];
      let scrollHeight;
      scrollHeight = -(index - 1) * height + "px";
      scrollPage.style.transform = `translateY(${scrollHeight})`;
      this.fullpage.current = index;
    },
    mouseWheelHandle(event) {
      let evt = event || window.event;
      if (evt.stopPropagation) {
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
      }
      if (this.fullpage.isScrolling) {
        return false;
      }
      let e = event.originalEvent || event;
      this.fullpage.deltaY = e.deltaY || e.detail;
      if (this.fullpage.deltaY > 0) {
        this.next();
      } else if (this.fullpage.deltaY < 0) {
        this.pre();
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "./css/previewScreen.less";
</style>