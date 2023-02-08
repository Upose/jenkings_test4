<!--
 * @Author: 904678748@qq.com 904678748@qq.com
 * @Date: 2022-11-14 20:35:53
 * @LastEditors: 904678748@qq.com 904678748@qq.com
 * @LastEditTime: 2023-02-08 13:37:21
 * @FilePath: \home_sys\src\views\admin\preview\bigScreenDuzhedaohang.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!---大屏预览-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">

      <div class="fullPage" ref="fullPage" v-if="details.sceneScreens">

        <div class="temp-header" v-if="i==0 && details.headerTemplate">
          <component :is="'previewhead'" :data="details" :isstyleSet="false"></component>
        </div>

        <div class="section" v-for="(it,i) in details.sceneScreens" :style="{'background':bg_color+' url('+fileUrl+(it.bgImg||'')+')'}" v-if="i==0">

          <div class="scene-warp-bg" :key="i+'scene'">
            <div class="bocy-content" :style="{height:details.template.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
              <div v-for="(item,index) in it.sceneApps" :key="index" :style="styleRender(item)">
                <div :class="$isWidgetCode(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="$commonWidgetSetFormat(item.commonWidgetSet)">
                  <div :id="$setId()"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="temp-footer" v-if="details.footerTemplate">
          <component :is="'previewfoot'" :data="details" :isstyleSet="false"></component>
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
    }
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      bg_color: '#fff',//背景颜色
      details: {},
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
  },
}
</script>

<style lang="less" scoped>
@import "./css/bigScreenDuzhedaohang.less";
</style>