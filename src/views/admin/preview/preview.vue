<!---预览-->
<template>
  <div :style="{'background':bgColor,'min-width':minWidth+'px','height':min_height}">
    <previewAll :details="details" v-if="is_show_page == 'previewAll'"></previewAll>
    <previewLeftmenu :details="details" v-if="is_show_page == 'previewLeftmenu'"></previewLeftmenu>
    <previewScreen :details="details" v-if="is_show_page == 'previewScreen'"></previewScreen>
    <previewScreenSZY :details="details" v-if="is_show_page == 'previewScreenSZY'"></previewScreenSZY>
    <previewScreenSZJS :details="details" v-if="is_show_page == 'previewScreenSZJS'"></previewScreenSZJS>
    <bigScreenDuzhedaohang :details="details" v-if="is_show_page == 'bigScreenDuzhedaohang'"></bigScreenDuzhedaohang>
    <previewScreenNMGKJDX :details="details" v-if="is_show_page == 'previewScreenNMGKJDX'"></previewScreenNMGKJDX>
    <previewAllQXDM :details="details" v-if="is_show_page == 'previewAllQXDM'"></previewAllQXDM>
  </div>
</template>

<script>
import previewAll from './previewAll.vue';//所有页预览
import previewLeftmenu from './previewLeftmenu.vue';//演示站点
import previewScreen from './previewScreen.vue';//通屏-滚屏预览
import previewScreenSZY from './previewScreenSZY.vue';//分屏-深职院
import previewScreenSZJS from './previewScreenSZJS.vue';//分屏-深圳技术大学
import bigScreenDuzhedaohang from './bigScreenDuzhedaohang.vue';//读者导航-深职院大屏
import previewScreenNMGKJDX from './previewScreenNMGKJDX.vue';//分屏-内蒙古科技大学
import previewAllQXDM from './previewAllQXDM.vue';//分屏-清新淡墨
export default {
  name: "index",
  components: {
    previewAll, previewAllQXDM,
    previewLeftmenu,
    previewScreen, previewScreenSZY, previewScreenSZJS, previewScreenNMGKJDX,
    bigScreenDuzhedaohang,
  },
  data() {
    return {
      bgColor: '#fff',//背景颜色
      minWidth: 1200,//最小宽度
      is_show_page: '',
      min_height: 'auto',
      details: {},//场景详情
    };
  },
  created() {
    var items = JSON.parse(window.localStorage.getItem('scenePreview'));
    if (items && items.template) {
      this.templateCssLoad(items.template.cssPath);
      document.title = items.name || '预览';
      this.bg_color = items.template.backgroundColor || '#fff';
      this.details = items;
      this.selectPage();
      if (this.details.jsPath && this.details.jsPath.length > 0) {
        var list = this.details.jsPath.split(';');
        list.forEach(it => {
          this.$addScript(it);
        })
      }
    }
  },
  methods: {
    //查询属于哪个模板
    selectPage() {
      if (this.details && this.details.template) {
        this.bgColor = this.details.template.backgroundColor || '#fff';
        this.minWidth = this.details.template.width || 1200;
        this.$forceUpdate();
      }
      if (this.details.template.layoutId == 1 && this.details.template.code == 'index2') {//演示站点
        this.is_show_page = 'previewLeftmenu';
        this.min_height = '100%';
      } else if (this.details.template.layoutId == 3) {//分屏
        this.min_height = '100%';
        if (this.details.sceneGroupId == 'fdaa5e85-d022-438e-b4a7-d1cf54753bac') {//深职院
          this.is_show_page = 'previewScreenSZY';
        } else if (this.details.template.uniqueCode == 'splitscreensztu') {//深圳技术大学
          this.is_show_page = 'previewScreenSZJS';
        } else if (this.details.template.uniqueCode == 'imust') {//内蒙古科技大学
          this.is_show_page = 'previewScreenNMGKJDX';
        } else {
          this.is_show_page = 'previewScreen';
        }
      } else if (this.details.template.layoutId == 4) {//大屏
        this.is_show_page = 'bigScreenDuzhedaohang';
      } else {//通屏，分段
        this.min_height = '100%';
        if (this.details.template.uniqueCode == 'onsectionlightink') {
          this.is_show_page = 'previewAllQXDM';
        } else {
          this.is_show_page = 'previewAll';
        }
      }
      console.log(this.is_show_page);
    },
    //加载模板css文件
    templateCssLoad(url) {
      if (url) {
        var docUrl = '';
        var temp = document.getElementById('templateId');
        if (temp) docUrl = temp.getAttribute('href');
        if (docUrl != url) {
          if (temp) temp.remove();
          //判断href是否等于当前url，不等于就删除了重新创建，等于就不创建。
          var link = document.createElement("link");
          link.setAttribute("rel", "stylesheet");
          link.setAttribute("id", "templateId");
          link.setAttribute("type", "text/css");
          link.setAttribute("href", process.env.VUE_APP_TEMPLATESRC + url + '?version=' + new Date().getTime());
          document.getElementsByTagName("body")[0].appendChild(link);
        }
      }
    },
  },
};
</script>

<style lang="less">
/*****这块区域主要针对背景图/视频/banner图滚动展示等 */
.dlib3-temp-imgvideo {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  .banner-warp-bg,
  .img-warp-bg,
  .video-warp-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #fff;
  }
  .img-warp-bg {
    z-index: 2;
  }
  .video-warp-bg {
    z-index: 3;
    video {
      width: 100%;
      height: 100%;
      background: #000;
    }
  }
  .banner-warp-bg {
    z-index: 4;
    background: rgba(255, 255, 255, 0.5);
    #dlib3_bg_banner_component {
      width: 100%;
      height: 100%;
      position: relative;
      .dlib3-banner-index {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #fff;
        }
      }
    }
  }
}
</style>

