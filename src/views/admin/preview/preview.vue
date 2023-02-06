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
      fileUrl: window.localStorage.getItem('fileUrl'),
    };
  },
  created() {
    var items = JSON.parse(window.localStorage.getItem('scenePreview'));
    if (items && items.template) {
      this.templateCssLoad(this.fileUrl+items.template.cssPath);
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
@import "./css/publicGlobal.less";
</style>

