<!---整屏滚动-单独针对深职院-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">

      <div class="fullPage" ref="fullPage" v-if="details.sceneScreens">
        <div class="fullPageContainer" ref="fullPageContainer" @mousewheel="mouseWheelHandle" @DOMMouseScroll="mouseWheelHandle">
          <div class="section" v-for="(it,i) in details.sceneScreens" :style="screensBG(bg_color,it.bgImg)" :id="'temp'+i">

            <div class="temp-header" v-if="i==0 && details.headerTemplate">
              <div :class="details.headerTemplate.templateCode" :data-set="JSON.stringify({
                  logo:details.headerTemplate.logo||'',
                  headerBgImg:details.headerTemplate.headerBgImg||'',
                  displayNavColumn:details.headerTemplate.displayNavColumn||'',
                  sceneid:details.id,
                })">
                <div :id="setId()"></div>
              </div><!-- 头部信息-end -->
            </div>

            <div class="scene-warp-bg" :key="i+'scene'">
              <div class="bocy-content" :style="{height:it.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
                <div v-for="(item,index) in it.sceneApps" :key="index" :class="isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
                  <div :class="isWidgetCode(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="commonWidgetSetFormat(item.commonWidgetSet)">
                    <div :id="setId()"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="temp-footer" v-if="(i+1)==details.sceneScreens.length && details.footerTemplate">
              <div :class="details.footerTemplate.templateCode" :data-set="JSON.stringify({
                content:details.footerTemplate.content||'',
                footerBgImg:details.footerTemplate.footerBgImg||'',
                footerDisplayNavColumn:details.footerTemplate.footerDisplayNavColumn||'',
                sceneid:details.id,
              })">
                <div :id="setId()"></div>
              </div><!-- 底部信息-end -->
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
    // this.details = JSON.parse(window.localStorage.getItem('scenePreview'));
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
    }
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      bg_color: '#fff',//背景颜色
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
    //判断是否为空
    isWidgetCode(item) {
      var widgetCode = '';
      if (item.widgetCode) {
        widgetCode = item.widgetCode;
      } else {
        if (item.appWidget && item.appWidget.widgetCode) {
          widgetCode = item.appWidget.widgetCode;
        } else {
          widgetCode = '';
        }
      }
      return widgetCode;
    },
    //外层全屏
    isWidgetCodeWapr(width, item) {
      var widgetCode = '';
      if (item.width == (width / 10) && item.configParameter && item.configParameter.fullScreen) {
        if (width == 1200) {
          widgetCode = ' mar-left-1200';
        } else if (width == 1440) {
          widgetCode = ' mar-left-1440';
        }
      }
      return widgetCode;
    },
    //动态设置模板id
    setId() {
      return "jl_vip_zt_" + Math.ceil(Math.random() * 1e8);
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
    //格式化
    commonWidgetSetFormat(val) {
      if (val && val != "undefind" && val != 'null') {
        return val.replace(/\"/g, "'");
      } else {
        return '{}';
      }
    },
    //滚屏背景设置
    screensBG(bg_color, bgImg) {
      if (bgImg) {
        return { 'background': bg_color + ' url(' + this.fileUrl + (bgImg || '') + ')' }
      }
    },
  },
}
</script>

<style lang="less" scoped>
/********分屏********** */
.fullPage {
  padding: 0;
  margin: 0;
  height: calc(100vh);
  overflow: hidden;
}
.fullPageContainer {
  width: 100%;
  height: calc(100vh);
  transition: all linear 0.5s;
}
.section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: calc(100vh);
  overflow-y: hidden;
  background-size: 100% 100% !important;
  background-repeat: no-repeat;
}
/*****其他通用 */
.width_1200 {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.scene-warp-bg {
  display: flex;
  align-items: center;
}
.bocy-content {
  position: relative;
  min-width: 1200px; //最小宽度
  margin-left: auto;
  margin-right: auto;
}
.html-warp-page {
  width: 100%;
  height: 1%;
  min-height: 100%;
}
/****悬浮菜单样式 */
.dlib3-hovering-menu {
  position: fixed;
  right: 20px;
  z-index: 99;
  top: 50%;
  margin-top: -100px;
  .temp-box {
    display: block;
    cursor: pointer;
    color: #333;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: all 0.3s;
    margin: 6px 0;
    padding: 2px 5px;
    &:hover {
      background: #fff;
      box-shadow: 2px 4px 7px #6b6a6a;
      color: #fff;
      box-shadow: 2px 4px 7px #6b6a6a;
      img {
        -webkit-filter: brightness(0) invert(1);
        filter: brightness(0) invert(1);
      }
    }
    .temp-icon {
      width: 30px;
      height: 30px;
      display: block;
      border-radius: 3px;
      margin: 5px auto;
    }
    .temp-title {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      text-align: center;
    }
  }
  .temp-box-active {
    color: #fff;
    box-shadow: 2px 4px 7px #6b6a6a;
    img {
      -webkit-filter: brightness(0) invert(1);
      filter: brightness(0) invert(1);
    }
  }
  .temp-icon-hide {
    visibility: hidden;
  }
}
.temp-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
//底部-固定最底部
.temp-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.jl_vip_zt_warp {
  height: 100%;
}
.mar-left-1200 {
  width: 100vw !important;
  min-width: 1200px;
  margin-left: calc(((100vw - 1200px) / 2) - (100vw - 1200px));
}
.mar-left-1440 {
  width: 100vw !important;
  min-width: 1440px;
  margin-left: calc(((100vw - 1440px) / 2) - (100vw - 1440px));
}
@media screen and (max-width: 1200px) {
  .mar-left-1200 {
    margin-left: 0 !important;
  }
  .html-warp-page {
    overflow-x: auto;
  }
}
@media screen and (max-width: 1440px) {
  .mar-left-1440 {
    margin-left: 0 !important;
  }
  .html-warp-page {
    overflow-x: auto;
  }
}

//单独针对此模板的样式
#temp1 {
  background-image: url(../../../../static/images/szy/part2-rightbg.png),
    url(../../../../static/images/szy/line-bg.jpg);
  background-position: 100% 0%, bottom center;
  background-repeat: no-repeat;
  background-size: auto, 100% !important;
  .scene-warp-bg {
    position: relative;
    .bocy-content {
      & > div {
        z-index: 2;
      }
      &::after {
        content: "";
        width: 1920px;
        height: 316px;
        background: #cf0d01;
        position: absolute;
        bottom: -16px;
        right: 20px;
        z-index: 1;
      }
    }
  }
}
.template2 #temp1 .scene-warp-bg .bocy-content::after {
  background: #1e62a2 !important;
}
.template3 #temp1 .scene-warp-bg .bocy-content::after {
  background: #649b33 !important;
}
.template4 #temp1 .scene-warp-bg .bocy-content::after {
  background: #008e97 !important;
}
.template5 #temp1 .scene-warp-bg .bocy-content::after {
  background: #2034c4 !important;
}
#temp2 {
  background-image: url(../../../../static/images/szy/line-bg.jpg);
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 100% !important;
}
#temp3 {
  background: url(../../../../static/images/szy/leftbg.png) left top no-repeat,
    url(../../../../static/images/szy/line-bg.jpg) bottom center no-repeat;
  background-size: 20%, 100%, 100% !important;
  .scene-warp-bg {
    position: relative;
    .bocy-content {
      & > div {
        z-index: 2;
      }
      &::after {
        content: "";
        width: 1920px;
        height: 316px;
        background: #cf0d01;
        position: absolute;
        bottom: -16px;
        left: 20px;
        z-index: 1;
      }
    }
  }
}
.template2 #temp3 .scene-warp-bg .bocy-content::after {
  background: #1e62a2 !important;
}
.template3 #temp3 .scene-warp-bg .bocy-content::after {
  background: #649b33 !important;
}
.template4 #temp3 .scene-warp-bg .bocy-content::after {
  background: #008e97 !important;
}
.template5 #temp3 .scene-warp-bg .bocy-content::after {
  background: #2034c4 !important;
}
#temp4 {
  background-image: url(../../../../static/images/szy/line-bg.jpg);
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 100% !important;
}
#temp5 {
  background: url(../../../../static/images/szy/part1-bg-left.png) left bottom
      144% no-repeat,
    url(../../../../static/images/szy/part3-bg-right.png) right -70px top -7%
      no-repeat,
    url(../../../../static/images/szy/line-bg.jpg) bottom center no-repeat;
  background-size: 14%, 25%, 100% !important;
}
#temp6 {
  background: url(../../../../static/images/szy/part1-bg-left.png) left bottom
      58% no-repeat,
    url(../../../../static/images/szy/part3-bg-right.png) right -20px top -16%
      no-repeat;
  background-size: 14%, 22% !important;
}
</style>