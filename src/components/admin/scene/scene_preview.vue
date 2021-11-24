<!---服务中台-预览页面-->
<template>
  <div class="html-warp-page" :class="(items&&items.themeColor)||'template1'">
    
    <template v-if="true">
      <div :class="items.headerTemplate.templateCode"><div :id="setId()"></div></div>
      <div class="bocy-content" v-for="(it,i) in items.sceneScreens" :style="{height:it.height+'px'}" :class="(items.layoutId=='3'||items.layoutId=='4')?'width_1200':''">
        <div v-for="(item,index) in it.sceneApps" :key="index" :class="item.widgetCode||item.appWidget.widgetCode" :style="styleRender(item)">
          <div :id="setId()"></div>
        </div>
      </div>
      <div :class="items.footerTemplate.templateCode"><div :id="setId()"></div></div>
    </template>

    <template v-if="false">
      <div class="left-fixed-template">
        <div class="header-prewiew"><div :id="setId()">头部</div></div>
        <div class="content">
          <div class="left-fixed">left</div>
          <div class="center-fixed">center</div>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="less" scoped>
.left-fixed-template{
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  .header-prewiew,.content,.left-fixed,.center-fixed{
    border: 1px solid #eee;
  }
  .header-prewiew{
    position: absolute;
    width: 100%;
    height: 90px;
    z-index: 3;
  }
  .content{
    width: 100%;
    position: absolute;
    top: 90px;
    bottom: 0;
    .left-fixed{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 350px;
    }
    .center-fixed{
      position: absolute;
      top: 0;
      right: 0;
      left: 350px;
      bottom: 0;
      overflow-y: auto;
    }
  }
}
.width_1200{
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.bocy-content{
  position: relative;
  min-width: 1200px;//最小宽度
}
.html-warp-page{
  width: 100%;
  height: 1%;
  min-height: 100%;
}
</style>
<script>
export default {
  name: 'index',
  mounted(){
    // this.addStyle(this.items.headerTemplate.router+'/component.css');
    // this.addScript(this.items.headerTemplate.router+'/component.js');
    // this.addStyle(this.items.footerTemplate.router+'/component.css');
    // this.addScript(this.items.footerTemplate.router+'/component.js');
    // console.log(this.items);
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
    styleRender(val){//css 渲染
      var list = {
        width:(100/12)*val.width+'%',
        height:(val.height*10)+'px',
        top:(val.yIndex*10)+'px',
        left:(100/12)*val.xIndex+'%',
        position: 'absolute',
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      this.addStyle(val.appWidget.target+'/component.css');
      this.addScript(val.appWidget.target+'/component.js');
      return list;
    },
    //动态设置模板id
    setId(){
      return 'jl_vip_zt_'+new Date().getTime();
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

