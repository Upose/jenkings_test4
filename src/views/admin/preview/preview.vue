<!---预览-->
<template>
  <div :style="{'background':bgColor,'min-width':minWidth+'px','height':min_height}">
    <component :is="is_show_page" :details="details"></component>
  </div>
</template>

<script>
export default {
  name: "index",
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
      var list = this.$selectComponent(this.details);
      this.bgColor = list.bgColor;
      this.minWidth = list.minWidth;
      this.min_height = list.min_height;
      this.is_show_page = list.is_show_page;
      this.$forceUpdate();
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
    // background: rgba(255, 255, 255, 0.5);
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

