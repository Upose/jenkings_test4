<!---预览-->
<template>
  <div :style="{'background':bgColor,'min-width':minWidth+'px','height':min_height}">
    <previewAll :details="details" v-if="is_show_page == 'previewAll'"></previewAll>
    <previewLeftmenu :details="details" v-if="is_show_page == 'previewLeftmenu'"></previewLeftmenu>
    <previewScreen :details="details" v-if="is_show_page == 'previewScreen'"></previewScreen>
    <previewScreenSZY :details="details" v-if="is_show_page == 'previewScreenSZY'"></previewScreenSZY>
  </div>
</template>

<script>
import previewAll from './previewAll.vue';//所有页预览
import previewLeftmenu from './previewLeftmenu.vue';//演示站点
import previewScreen from './previewScreen.vue';//通屏-滚屏预览
import previewScreenSZY from './previewScreenSZY.vue';//通屏-滚屏预览
export default {
  name: "index",
  components: { previewAll, previewLeftmenu, previewScreen,previewScreenSZY },
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
      this.templateCssLoad(items.template.filePath);
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
            this.min_height = '100%';
        } else if (this.details.template.layoutId == 3) {
          if(this.details.sceneGroupId == 'fdaa5e85-d022-438e-b4a7-d1cf54753bac'){//特殊-深职院
            this.is_show_page = 'previewScreenSZY';
            this.min_height = '100%';
          }else{
            this.is_show_page = 'previewScreen';
            this.min_height = '100%';
          }
        }else{
            this.is_show_page = 'previewAll';
            this.min_height = '100%';
        }
        console.log(this.is_show_page);
    },
    //加载模板css文件
    templateCssLoad(url){
      if(url){
        var docUrl = '';
        var temp = document.getElementById('templateId');
        if(temp) docUrl = temp.getAttribute('href');
        if(docUrl != url){
          if(temp)temp.remove();
          //判断href是否等于当前url，不等于就删除了重新创建，等于就不创建。
          var link=document.createElement("link"); 
          link.setAttribute("rel", "stylesheet"); 
          link.setAttribute("id", "templateId");
          link.setAttribute("type", "text/css"); 
          link.setAttribute("href", url+'?version='+new Date().getTime());
          document.getElementsByTagName("body")[0].appendChild(link);
        }
      }
    },
  },
};
</script>