<!---通屏-演示站点-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">
    <template v-if="details">
      <!--左边固定-->
      <div class="left-fixed-template">
        <div class="header-prewiew">
          <component v-if="details.headerTemplate" :is="'previewhead'" :data="details" :isstyleSet="false"></component>
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
              <component v-if="details.footerTemplate" :is="'previewfoot'" :data="details" :isstyleSet="false"></component>
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
    if (this.details && this.details.template) {
      setTimeout(() => {//循环未完成，有可能错误，所以采用了一个定时
        this.$addStyle(this.details.footerTemplate.router + '/component.css');
        this.$addScript(this.details.footerTemplate.router + '/component.js');
      }, 300);
      if (this.details.sceneScreens) {
        this.details.sceneScreens[0].sceneApps.forEach(it => {
          if (it.xIndex == 0 && it.appWidget && it.appWidget.widgetCode == 'other_left_menu_list') {
            this.left_menu = it;
            if (it.appWidget && it.appWidget.target) {
              this.$addStyle(it.appWidget.target + '/component.css',it.appWidget.widgetCode);
              this.$addScript(it.appWidget.target + '/component.js',it.appWidget.widgetCode);
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
        this.$addStyle(val.appWidget.target + '/component.css',val.appWidget.widgetCode);
        this.$addScript(val.appWidget.target + '/component.js',val.appWidget.widgetCode);
      }
      return list;
    },
  },
}
</script>

<style lang="less" scoped>
@import "./css/previewLeftmenu.less";
</style>