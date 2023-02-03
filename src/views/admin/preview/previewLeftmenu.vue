<!---通屏-演示站点-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'" :style="{background:bg_color}">
    <template v-if="details">
      <!--左边固定-->
      <div class="left-fixed-template">
        <div class="header-prewiew">
          <div v-if="details.headerTemplate" :class="details.headerTemplate.templateCode" :data-set="JSON.stringify({
            logo:details.headerTemplate.logo||'',
            headerBgImg:details.headerTemplate.headerBgImg||'',
            displayNavColumn:details.headerTemplate.displayNavColumn||'',
            headerAttachWidget:details.headerTemplate.headerAttachWidget||[],
            sceneid:details.id,
          })">
            <div :id="$setId()"></div>
          </div>
        </div><!-- 头部信息-end -->
        <div class="content">
          <div class="left-fixed">
            <div :class="$isWidgetCode(left_menu)" :style="{width:'100%',height:'100%'}" :data-set="JSON.stringify(left_menu.appPlateItems||'[{}]')" :data-obj="JSON.stringify(left_menu.configParameter||'{}')">
              <div :id="$setId()"></div>
            </div>
          </div>
          <div class="center-fixed">
            <div class="center-fixed-content" v-for="(it,i) in details.sceneScreens" :style="{height:it.height+'px'}">
              <div v-for="(item,index) in it.sceneApps" :key="index" :class="$isWidgetCode(item)" v-if="item&&item.xIndex!=0" :style="styleRender_full(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="$commonWidgetSetFormat(item.commonWidgetSet)">
                <div :id="$setId()"></div>
              </div>
            </div>
            <div class="temp-preview-foot">
              <div v-if="details.footerTemplate" :class="details.footerTemplate.templateCode" :data-set="JSON.stringify({
                  content:details.footerTemplate.content||'',
                  footerBgImg:details.footerTemplate.footerBgImg||'',
                  footerDisplayNavColumn:details.footerTemplate.footerDisplayNavColumn||'',
                  sceneid:details.id,
                })">
                <div :id="$setId()"></div>
              </div><!-- 底部信息-end -->
            </div>
          </div>
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
    // this.details = JSON.parse(window.localStorage.getItem('scenePreview'));
    if (this.details && this.details.template) {
      this.bg_color = this.details.template.backgroundColor || '#fff';
      this.$addStyle(this.details.headerTemplate.router + '/component.css');
      this.$addScript(this.details.headerTemplate.router + '/component.js');
      setTimeout(() => {//循环未完成，有可能错误，所以采用了一个定时
        this.$addStyle(this.details.footerTemplate.router + '/component.css');
        this.$addScript(this.details.footerTemplate.router + '/component.js');
      }, 300);
      if (this.details.sceneScreens) {
        this.details.sceneScreens[0].sceneApps.forEach(it => {
          if (it.xIndex == 0 && it.appWidget && it.appWidget.widgetCode == 'other_left_menu_list') {
            this.left_menu = it;
            if (it.appWidget && it.appWidget.target) {
              this.$addStyle(it.appWidget.target + '/component.css');
              this.$addScript(it.appWidget.target + '/component.js');
            }
          }
        })
      }
    }
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      isLock: false,//是否左侧固定模板
      bg_color: '#fff',//背景颜色
      details: {},
      left_menu: { widgetCode: {} },
    }
  },
  methods: {
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
        this.$addStyle(val.appWidget.target + '/component.css');
        this.$addScript(val.appWidget.target + '/component.js');
      }
      return list;
    },
  },
}
</script>

<style lang="less" scoped>
@import "./css/previewLeftmenu.less";
</style>