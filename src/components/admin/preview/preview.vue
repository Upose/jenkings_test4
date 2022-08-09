<!---预览-->
<template>
  <div :style="{'background':bgColor,'min-width':minWidth+'px','height':min_height}">
    <previewAll :details="details" v-if="is_show_page == 'previewAll'"></previewAll>
    <previewLeftmenu :details="details" v-if="is_show_page == 'previewLeftmenu'"></previewLeftmenu>
    <previewScreen :details="details" v-if="is_show_page == 'previewScreen'"></previewScreen>
  </div>
</template>

<script>
import previewAll from './previewAll.vue';//所有页预览
import previewLeftmenu from './previewLeftmenu.vue';//演示站点
import previewScreen from './previewScreen.vue';//通屏-滚屏预览
export default {
  name: "index",
  components: { previewAll, previewLeftmenu, previewScreen },
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
      document.title = items.name || '预览';
      this.bg_color = items.template.backgroundColor || '#fff';
      this.details = items;
      this.selectPage();
      if (this.details.jsPath) {
        this.details.jsPath.forEach(it => {
          this.addScript(it);
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
        } else if (this.details.template.layoutId == 3) {
            this.is_show_page = 'previewScreen';
            this.min_height = '100%';
        } else {
            this.is_show_page = 'previewAll';
            this.min_height = '100%';
        }
        console.log(this.is_show_page);
    },
  },
};
</script>