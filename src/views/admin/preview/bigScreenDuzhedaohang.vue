<!---大屏预览-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">

      <div class="fullPage" ref="fullPage" v-if="details.sceneScreens">

        <div class="temp-header" v-if="i==0 && details.headerTemplate">
          <div :class="details.headerTemplate.templateCode" :data-set="JSON.stringify({
                  logo:details.headerTemplate.logo||'',
                  headerBgImg:details.headerTemplate.headerBgImg||'',
                  displayNavColumn:details.headerTemplate.displayNavColumn||'',
                  headerAttachWidget:details.headerTemplate.headerAttachWidget||[],
                  sceneid:details.id,
                })">
            <div :id="setId()"></div>
          </div><!-- 头部信息-end -->
        </div>

        <div class="section" v-for="(it,i) in details.sceneScreens" :style="{'background':bg_color+' url('+fileUrl+(it.bgImg||'')+')'}" v-if="i==0">

          <div class="scene-warp-bg" :key="i+'scene'">
            <div class="bocy-content" :style="{height:details.template.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
              <div v-for="(item,index) in it.sceneApps" :key="index" :style="styleRender(item)">
                <div :class="isWidgetCode(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="commonWidgetSetFormat(item.commonWidgetSet)">
                  <div :id="setId()"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="temp-footer" v-if="details.footerTemplate">
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
    }
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
      left_menu: { widgetCode: {} },
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
    //动态设置模板id
    setId() {
      return "jl_vip_zt_" + Math.ceil(Math.random() * 1e8);
    },
    //格式化
    commonWidgetSetFormat(val) {
      if (val && val != "undefind" && val != 'null') {
        return val.replace(/\"/g, "'");
      } else {
        return '{}';
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "./css/bigScreenDuzhedaohang.less";
</style>