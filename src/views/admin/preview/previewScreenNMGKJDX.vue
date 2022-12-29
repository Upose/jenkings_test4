<!---整屏滚动-内蒙古科技大学-->
<template>
  <div class="html-warp-page" :class="(details_reset&&details_reset.themeColor)||'template1'">

    <template v-if="details_reset">

      <div class="fullPage" ref="fullPage" v-if="details_reset.sceneScreens">
        <div class="fullPageContainer" ref="fullPageContainer" @mousewheel="mouseWheelHandle" @DOMMouseScroll="mouseWheelHandle">
          <div class="section" v-for="(it,i) in details_reset.sceneScreens" :style="screensBG(bg_color,it.bgImg)" :id="'temp'+i">

            <div class="temp-header" v-if="i==0 && details_reset.headerTemplate">
              <div :class="details_reset.headerTemplate.templateCode" :data-set="JSON.stringify({
                  logo:details_reset.headerTemplate.logo||'',
                  headerBgImg:details_reset.headerTemplate.headerBgImg||'',
                  displayNavColumn:details_reset.headerTemplate.displayNavColumn||'',
                  sceneid:details_reset.id,
                })">
                <div :id="setId()"></div>
              </div><!-- 头部信息-end -->
            </div>
            <!--头部-第一屏有-->

            <div class="scene-title" v-if="i!=0">
              <div class="line-l"></div>
              <div class="txt">
                <span class="m">{{it.screenName.slice(0,2)}}</span>
                <span class="dot"></span>
                <span class="s">{{it.screenName.slice(2,8)}}</span>
              </div>
              <div class="line-r"></div>
            </div>
            <!--屏标题块-->
            <div class="scene-warp-bg" :key="i+'scene'" v-if="!it.isRest">
              <div class="bocy-content" :style="{height:it.height+'px'}">
                <div v-for="(item,index) in it.sceneApps" :key="index" :class="isWidgetCodeWapr(details_reset.template.width,item)" :style="styleRender(item)">
                  <div :class="isWidgetCode(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="commonWidgetSetFormat(item.commonWidgetSet)">
                    <div :id="setId()"></div>
                  </div>
                </div>
              </div>
            </div><!-- 中间渲染区域 - 正常区域 -->

            <div v-if="it.isRest" class="reset-scene-warp-bg">
              <div class="left-menu">
                <div v-for="(z,k) in it.sceneList" @click="MneuClick(i,(''+i+'_'+k+''))" :class="(twoNum==(''+i+'_'+k+'')||threeNum==(''+i+'_'+k+''))?'active':''">{{z.screenName||''}}</div>
              </div>
              <div class="right-content">
                <div class="bocy-content" :style="{height:x.height+'px'}" v-for="(x,y) in it.sceneList" v-show="twoNum==(''+i+'_'+y+'')||threeNum==(''+i+'_'+y+'')">
                  <div v-for="(item,index) in x.sceneApps" :key="index" :class="isWidgetCodeWapr(details_reset.template.width,item)" :style="styleRender(item)">
                    <div :class="isWidgetCode(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="commonWidgetSetFormat(item.commonWidgetSet)">
                      <div :id="setId()"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div><!-- 中间渲染区域 - 区别渲染 -->

            <div class="temp-footer" v-if="(i+1)==details_reset.sceneScreens.length && details_reset.footerTemplate">
              <div :class="details_reset.footerTemplate.templateCode" :data-set="JSON.stringify({
                content:details_reset.footerTemplate.content||'',
                footerBgImg:details_reset.footerTemplate.footerBgImg||'',
                footerDisplayNavColumn:details_reset.footerTemplate.footerDisplayNavColumn||'',
                sceneid:details_reset.id,
              })">
                <div :id="setId()"></div>
              </div><!-- 底部信息-end -->
            </div>
            <!--底部-最后一屏有-->

          </div>
        </div>
      </div>

      <!-- <div class="dlib3-hovering-menu" v-if="(details_reset.layoutId==2||details_reset.layoutId==3) && details_reset && details_reset.sceneScreens">
        <a class="temp-box thover-bg-c1" :class="fullpage.current==(i+1)?'temp-box-active tbg-c2':''" v-for="(it,i) in (details_reset.sceneScreens||[])" :key="i" :id="'tempbox'+i" @click="clickSilder(i)">
          <img class="temp-icon" :src="fileUrl+it.icon" :class="it.icon?'':'temp-icon-hide'">
          <span class="temp-title" :title="it.screenName">{{it.screenName}}</span>
        </a>
      </div> -->
      <!--悬浮菜单 end-->

    </template>

  </div>
</template>

<style lang="less" scoped>

</style>

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
      this.dataReset();
    }
  },
  data() {
    return {
      twoNum: '1_0',
      threeNum: '2_0',
      fileUrl: window.localStorage.getItem('fileUrl'),
      bg_color: '#fff',//背景颜色
      details: {},//原始数据
      details_reset: {},//重新构造数据
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
    //特殊处理屏-菜单点击事件
    MneuClick(scene, num) {
      if (scene == 1) {
        this.twoNum = num;
      } else {
        this.threeNum = num;
      }
    },
    //数据特殊化处理
    /**
     * 排除第一屏和最后一屏，中间的数据根据空屏分段，分为两屏
     * 两屏中-第一屏为资源导航，第二屏为新闻资讯，最后一屏为数据统计
     */
    dataReset() {
      console.log(this.details);
      this.details_reset = {
        'footerTemplate': this.details.footerTemplate || {},
        'headerTemplate': this.details.headerTemplate || {},
        'layoutId': this.details.layoutId || 3,
        'template': this.details.template || {},
        'themeColor': this.details.themeColor || "template1",
        'id': this.details.id || "",
        'sceneScreens': [],
      };
      if (this.details.sceneScreens && this.details.sceneScreens.length > 0) {
        var list = [];
        var scene_index = 1;//在遇到空屏前，都属于第一屏，遇到之后都属于2
        this.details.sceneScreens.forEach((x, i) => {
          if (i == 0 || i == (this.details.sceneScreens.length - 1)) {
            var it = {
              'screenName': x.screenName || '',
              'bgImg': x.bgImg || '',
              'icon': x.icon || '',
              'height': x.height || 0,
              'isRest': false,
              'sceneApps': x.sceneApps || [],
            }
            list.push(it);
          } else { //除首屏和尾屏的处理
            if (x.sceneApps[0]) {
              if (scene_index == 1) {//第一屏数据插入
                if (list[1] && list[1].screenName) {
                  var val = {
                    'height': x.height || 0,
                    'screenName': x.screenName || '',
                    'sceneApps': x.sceneApps || [],
                  }
                  list[1].sceneList.push(val);
                } else {
                  list[1] = {
                    'screenName': '资源导航',
                    'bgImg': '',
                    'icon': '',
                    'height': 0,
                    'isRest': true,
                    'sceneList': [],//单独渲染的屏列表数
                  }
                  var val = {
                    'height': x.height || 0,
                    'screenName': x.screenName || '',
                    'sceneApps': x.sceneApps || [],
                  }
                  list[1].sceneList.push(val);
                }
              } else if (scene_index == 2) {
                if (list[2] && list[2].screenName) {
                  var val = {
                    'height': x.height || 0,
                    'screenName': x.screenName || '',
                    'sceneApps': x.sceneApps || [],
                  }
                  list[2].sceneList.push(val);
                } else {
                  list[2] = {
                    'screenName': '新闻资讯',
                    'bgImg': '',
                    'icon': '',
                    'height': 0,
                    'isRest': true,
                    'sceneList': [],//单独渲染的屏列表数
                  }
                  var val = {
                    'height': x.height || 0,
                    'screenName': x.screenName || '',
                    'sceneApps': x.sceneApps || [],
                  }
                  list[2].sceneList.push(val);
                }
              }
            } else if (!x.sceneApps[0]) {//空屏断点
              scene_index = 2;
            }
          }
        })
        this.details_reset.sceneScreens = list;
        console.log('details_reset', list);
      }
    },
    //初始化模板
    styleRender(val) {//css 渲染
      var w = this.details_reset.template.width || 100;
      var list = {
        width: (val.width / w) * 1000 + '%',
        height: (val.height * 10) + 'px',
        top: (val.yIndex * 10) + 'px',
        left: val.xIndex + '%',
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
      let len = this.details_reset.sceneScreens.length || 0;
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
@import "./css/previewScreenNMGKJDX.less";
</style>