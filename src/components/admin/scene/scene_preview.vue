<!---服务中台-栏目管理-->
<template>
  <div class="html-warp-page">
    <div class="header">头部</div>
    <div class="bocy-content">
      <div v-for="(item,index) in items" :key="index" :class="item.widgetCode" :style="styleRender(item)">
        <div :id="item.id"></div>
      </div>
    </div>
    <div>底部</div>
  </div>
</template>
<style lang="less" scoped>
.bocy-content{
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  // overflow: hidden;
  zoom: 1;
  &::after{
    display: block;
    content: '';
    width: 0;
    height: 0;
    clear: both;
  }
}
// .jl_vip_zt_header_sys1{
//   &::after{
//     display: block;
//     content: '';
//     width: 1920px;
//     height: 100%;
//     background: red;
//     left: 0;
//   }
// }
.html-warp-page{
  width: 100%;
  min-height: 100%;
}
</style>
<script>
import Sortable from "sortablejs";
export default {
  name: 'index',
  mounted(){
    document.getElementsByTagName("body")[0].setAttribute('class',(window.localStorage.getItem('template')||'template1'));
    console.log(this.items);
  },
  data () {
    return {
      //以下是拖拽参数
      grid:null,
      items:JSON.parse(window.localStorage.getItem('scenePreview')),
      opts: {//元素初始化高度
        cellHeight: '10', 
        cellHeightThrottle: 100,
      },
      temp_list:[],
    }
  },
  methods:{
    //初始化模板
    initGrid(){
      this.grid = GridStack.init(this.opts);
      this.grid.on('change', function(event, items) {//改变大小时触发
        var _rect = items._rect;//元素大小，距离x轴，y轴的位置（单位：px）;(w,h,x,y)
        var _lastUiPosition = items._lastUiPosition;//距离顶部，左边的位置（left,top）
        var _orig = items._orig;//在12宫格中所占的比列（x,y,h,w）
        // console.log(event,items);
      })
      this.grid.load(this.items);
      //定时延迟加载js
      this.items.forEach((e,i)=>{
        setTimeout(() => {
          this.addStyle(e.target+'/component.css');
          this.addScript(e.target+'/component.js?id='+e.id);
        }, (i+1)*150);
      })
    },
    styleRender(val){//css 渲染
      var list = {
        width:(100/12)*val.w+'%',
        height:(val.h*10)+'px',
        top:(val.y*10)+'px',
        left:(100/12)*val.x+'%',
        position: 'absolute',
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      this.addStyle(val.target+'/component.css');
      this.addScript(val.target+'/component.js');
      return list;
    },
    //引入css文件
    addStyle(url){
      var link=document.createElement("link"); 
      link.setAttribute("rel", "stylesheet"); 
      link.setAttribute("type", "text/css"); 
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    //引入js文件
    addScript(url){
      var js_element=document.createElement("script");
      js_element.setAttribute("type","text/javascript");
      js_element.setAttribute("src",url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
  },
}
</script>

