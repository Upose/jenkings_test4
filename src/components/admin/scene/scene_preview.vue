<!---服务中台-预览页面-->
<template>
  <div class="html-warp-page" :class="(items&&items.themeColor)||'template1'">
    
    <template v-if="items && !isLock"><!--宽1200通用-->
      <div v-if="items.headerTemplate" :class="items.headerTemplate.templateCode"><div :id="setId()"></div></div><!-- 头部信息-end -->
      <div class="bocy-content" v-for="(it,i) in items.sceneScreens" :style="{height:it.height+'px'}" :class="(items.layoutId=='3'||items.layoutId=='4')?'width_1200':''">
        <div v-for="(item,index) in it.sceneApps" :key="index" :class="item.widgetCode||item.appWidget.widgetCode" :style="styleRender(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')">
          <div :id="setId()"></div>
        </div>
      </div>
      <div v-if="items.footerTemplate" :class="items.footerTemplate.templateCode"><div :id="setId()"></div></div><!-- 底部信息-end -->
    </template>

    <template v-if="items && isLock"><!--左边固定-->
      <div class="left-fixed-template">
        <div class="header-prewiew" v-if="items.headerTemplate" :class="items.headerTemplate.templateCode"><div :id="setId()"></div></div><!-- 头部信息-end -->
        <div class="content">
          <div class="left-fixed">
            <div :class="left_menu.widgetCode||left_menu.appWidget.widgetCode" :style="{width:'100%',height:'100%'}" :data-set="JSON.stringify(left_menu.appPlateItems||'[{}]')">
              <div :id="setId()"></div>
            </div>
          </div>
          <div class="center-fixed">
            <div class="center-fixed-content" v-for="(it,i) in items.sceneScreens" :style="{height:it.height+'px'}" :class="(items.layoutId=='3'||items.layoutId=='4')?'width_1200':''">
              <div v-for="(item,index) in it.sceneApps" :key="index" :class="item.widgetCode||item.appWidget.widgetCode" v-if="item&&item.xIndex!=0" :style="styleRender_full(item)" :data-set="JSON.stringify(item.appPlateItems||'[{}]')">
                <div :id="setId()"></div>
              </div>
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
  created(){
    var list = JSON.parse(window.localStorage.getItem('scenePreview'));
    if(list && list.template){
      document.title = list.name||'预览';
      this.isLock = list.template.isLock;
      this.items = list;
      if(this.isLock){
        this.addStyle(this.items.headerTemplate.router+'/component.css');
        this.addScript(this.items.headerTemplate.router+'/component.js');
          if(this.items.sceneScreens){
            this.items.sceneScreens[0].sceneApps.forEach(it=>{
              if(it.xIndex==0 && it.appWidget && it.appWidget.widgetCode=='other_left_menu_list'){
                console.log('全屏');
                this.left_menu = it;
                this.addStyle(it.appWidget.target+'/component.css');
                this.addScript(it.appWidget.target+'/component.js');
              }
            })
          }
      }else{
        console.log('非全屏');
        setTimeout(()=>{
          this.addStyle(this.items.headerTemplate.router+'/component.css');
          this.addScript(this.items.headerTemplate.router+'/component.js');
          this.addStyle(this.items.footerTemplate.router+'/component.css');
          this.addScript(this.items.footerTemplate.router+'/component.js');
        },200)
      }
    }
  },
  data () {
    return {
      isLock:false,//是否全屏
      //以下是拖拽参数
      grid:null,
      items:{},
      opts: {//元素初始化高度
        cellHeight: '10', 
        cellHeightThrottle: 100,
      },
      left_menu:{widgetCode:{}},
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
    styleRender_full(val){//css 渲染
      var list = {
        width:'100%',
        height:(val.height*10)+'px',
        top:(val.yIndex*10)+'px',
        left:'0',
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
  },
}
</script>

<style lang="less" scoped>
/****针对固定左边的菜单首页 */
.left-fixed-template{
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 1200px;
  .header-prewiew,.content,.left-fixed,.center-fixed{
    // border: 1px solid #eee;
  }
  .header-prewiew{
    position: absolute;
    width: 100%;
    height: 90px;
    z-index: 99;
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
      width: 33.3%;
    }
    .center-fixed{
      position: absolute;
      top: 0;
      right: 0;
      left: 33.3%;
      bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      .center-fixed-content{
        position: relative;
        margin-left: 10px;
      }
    }
  }
}

/*****其他通用 */
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