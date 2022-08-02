<!---整屏滚动-->
<template>
  <div class="html-warp-page" :class="(items&&items.themeColor)||'template1'">

    <template v-if="items && !isLock">
      
      <div class="fullPage" ref="fullPage" v-if="items.sceneScreens">
        <div class="fullPageContainer" ref="fullPageContainer" @mousewheel="mouseWheelHandle" @DOMMouseScroll="mouseWheelHandle">
          <div class="section" v-for="(it,i) in items.sceneScreens" :style="{'background':bg_color+' url('+fileUrl+(it.bgImg||'')+')'}">

            <div class="temp-header" v-if="i==0 && items.headerTemplate">
              <div :class="items.headerTemplate.templateCode" :data-set="JSON.stringify({
                  logo:items.headerTemplate.logo||'',
                  headerBgImg:items.headerTemplate.headerBgImg||'',
                  displayNavColumn:items.headerTemplate.displayNavColumn||'',
                })">
                <div :id="setId()"></div>
              </div><!-- 头部信息-end -->
            </div>

            <div class="scene-warp-bg" :key="i+'scene'">
              <div class="bocy-content" :style="{height:it.height+'px',width:(items.template.width==100?'100%':(items.template.width+'px'))}" :class="(items.layoutId=='3'||items.layoutId=='4')?'width_1200':''">
                <div v-for="(item,index) in it.sceneApps" :key="index" :class="isWidgetCodeWapr(items.template.width,item)" :style="styleRender(item)">
                  <div :class="isWidgetCode(item)"  :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')">
                    <div :id="setId()"></div>
                  </div>
                </div>
              </div>
            </div>

          <div class="temp-footer" v-if="(i+1)==items.sceneScreens.length && items.footerTemplate">
            <div :class="items.footerTemplate.templateCode" :data-set="JSON.stringify({
                content:items.footerTemplate.content||'',
                footerBgImg:items.footerTemplate.footerBgImg||'',
                footerDisplayNavColumn:items.footerTemplate.footerDisplayNavColumn||'',
              })">
              <div :id="setId()"></div>
            </div><!-- 底部信息-end -->
          </div>

          </div>
        </div>
      </div>



      <div class="temp-menu-w" v-if="items.layoutId==2 && items && items.sceneScreens">
        <a class="temp-box" :class="fullpage.current==(i+1)?'temp-box-active':''" v-for="(it,i) in (items.sceneScreens||[])" :key="i" @click="clickSilder(i)">
          <img class="temp-icon" :src="fileUrl+it.icon">
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
  created() {
    var list = JSON.parse(window.localStorage.getItem('scenePreview'));
    if (list && list.template) {
      document.title = list.name || '预览';
      this.isLock = list.template.isLock;
      this.bg_color = list.template.backgroundColor || '#fff';
      this.items = list;
      console.log(this.items);
      if (this.items.jsPath) {
        this.items.jsPath.forEach(it => {
          this.addScript(it);
        })
      }
      if (this.isLock) {
        this.addStyle(this.items.headerTemplate.router + '/component.css');
        this.addScript(this.items.headerTemplate.router + '/component.js');
        setTimeout(() => {//循环未完成，有可能错误，所以采用了一个定时
          this.addStyle(this.items.footerTemplate.router + '/component.css');
          this.addScript(this.items.footerTemplate.router + '/component.js');
        }, 300);
        if (this.items.sceneScreens) {
          this.items.sceneScreens[0].sceneApps.forEach(it => {
            if (it.xIndex == 0 && it.appWidget && it.appWidget.widgetCode == 'other_left_menu_list') {
              console.log('全屏');
              this.left_menu = it;
              if (it.appWidget && it.appWidget.target) {
                this.addStyle(it.appWidget.target + '/component.css');
                this.addScript(it.appWidget.target + '/component.js');
              }
            }
          })
        }
      } else {
        console.log('非全屏');
        setTimeout(() => {
          this.addStyle(this.items.headerTemplate.router + '/component.css');
          this.addScript(this.items.headerTemplate.router + '/component.js');
          this.addStyle(this.items.footerTemplate.router + '/component.css');
          this.addScript(this.items.footerTemplate.router + '/component.js');
        }, 250)
      }
    }
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      isLock: false,//是否左侧固定模板
      bg_color: '#fff',//背景颜色
      //以下是拖拽参数
      grid: null,
      items: {},
      opts: {//元素初始化高度
        cellHeight: '10',
        cellHeightThrottle: 100,
      },
      left_menu: { widgetCode: {} },
      temp_list: [],
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
      var list = {
        width: 20 * val.width + 'px',
        height: (val.height * 10) + 'px',
        top: (val.yIndex * 10) + 'px',
        left: 20 * val.xIndex + 'px',
        position: 'absolute',
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      if (val.appWidget && val.appWidget.target) {
        this.addStyle(val.appWidget.target + '/component.css');
        this.addScript(val.appWidget.target + '/component.js');
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
      if (item.width == (width/20) && item.configParameter && item.configParameter.fullScreen) {
        if (width == 1200) {
          widgetCode = ' mar-left-1200';
        } else if (width == 1440) {
          widgetCode = ' mar-left-1440';
        }
      }
      return widgetCode;
    },
    styleRender_full(val) {//css 渲染
      var list = {
        width: '100%',
        height: (val.height * 10) + 'px',
        top: (val.yIndex * 10) + 'px',
        left: '0',
        position: 'absolute',
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      if (val.appWidget && val.appWidget.target) {
        this.addStyle(val.appWidget.target + '/component.css');
        this.addScript(val.appWidget.target + '/component.js');
      }
      return list;
    },
    //动态设置模板id
    setId() {
      return "jl_vip_zt_" + Math.ceil(Math.random() * 1e8);
    },
    /********************分屏************** */
    //悬浮菜单点击事件
    clickSilder(val) {
      this.move(val+1);
    },
    next() {
      let len = this.items.sceneScreens.length||0;
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
.temp-menu-w {
  position: fixed;
  right: 20px;
  z-index: 99;
  top: 50%;
  margin-top: -100px;
  .temp-box {
    display: block;
    cursor: pointer;
    color: #000;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.6);
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: all 0.3s;
    margin: 6px 0;
    padding: 2px 5px;
    border: 1px solid rgba(0, 0, 0, 0);
    &:hover {
      background: #fff;
      border: 1px solid #eee;
      box-shadow: 2px 4px 7px #6b6a6a;
    }
    .temp-icon {
      width: 30px;
      height: 30px;
      display: block;
      border-radius: 3px;
      margin: 5px auto;
    }
    .temp-title {
      color: #333;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      text-align: center;
    }
  }
  .temp-box-active{
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 2px 4px 7px #6b6a6a;
  }
}
.temp-header{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
//底部-固定最底部
.temp-footer{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.jl_vip_zt_warp{
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
@media screen and (max-width:1200px) {
 .mar-left-1200{margin-left:0 !important;}
 .html-warp-page{overflow-x: auto;}
}
@media screen and (max-width:1440) {
 .mar-left-1440{margin-left:0 !important;}
 .html-warp-page{overflow-x: auto;}
}
</style>