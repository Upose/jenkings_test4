<!---服务中台-通用预览+普通分屏-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">
    
    <template v-if="details"><!--宽1200通用-->

      <div v-if="details.headerTemplate" :class="details.headerTemplate.templateCode" :data-set="JSON.stringify({
          logo:details.headerTemplate.logo||'',
          headerBgImg:details.headerTemplate.headerBgImg||'',
          displayNavColumn:details.headerTemplate.displayNavColumn||'',
          sceneid:details.id,
        })" :style="styleSet({},-1)">
        <div :id="setId()"></div>
      </div><!-- 头部信息-end -->

      <div class="scene-warp-bg" v-for="(it,i) in details.sceneScreens" :key="i+'scene'" :id="'temp'+i" :style="styleSet(it,i)">
        <div class="bocy-content" :style="{height:it.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
          <div v-for="(item,index) in it.sceneApps" :key="index" :class="isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
            <div :class="isWidgetCode(item)" :style="{height:'100%'}" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="commonWidgetSetFormat(item.commonWidgetSet)">
              <div :id="setId()"></div>
            </div>
          </div>
        </div>

      </div>

      <div v-if="details.footerTemplate" :class="details.footerTemplate.templateCode" :data-set="JSON.stringify({
          content:details.footerTemplate.content||'',
          footerBgImg:details.footerTemplate.footerBgImg||'',
          footerDisplayNavColumn:details.footerTemplate.footerDisplayNavColumn||'',
          sceneid:details.id,
        })">
        <div :id="setId()"></div>
      </div><!-- 底部信息-end -->

      <div class="dlib3-hovering-menu" v-if="details.layoutId==2 && details && details.sceneScreens">
        <a class="temp-box" v-for="(it,i) in (details.sceneScreens||[])" :key="i" @click="clickSilder('temp'+i)">
          <img class="temp-icon" :src="fileUrl+it.icon">
          <span class="temp-title" :title="it.screenName">{{it.screenName}}</span>
        </a>
      </div><!--悬浮菜单 end-->

    </template>

  </div>
</template>

<script>
export default {
  name: 'index',
  props:['details'],
  created(){
    // this.details = JSON.parse(window.localStorage.getItem('scenePreview'));
    if(this.details && this.details.template){
      this.bg_color = this.details.template.backgroundColor||'#fff';
      if(this.details.headerTemplate && this.details.headerTemplate.router){
        this.addStyle(this.details.headerTemplate.router+'/component.css');
        this.addScript(this.details.headerTemplate.router+'/component.js');
      }
      if(this.details.footerTemplate && this.details.footerTemplate.router){
        this.addStyle(this.details.footerTemplate.router+'/component.css');
        this.addScript(this.details.footerTemplate.router+'/component.js');
      }
      if(this.details.sceneScreens){
        this.details.sceneScreens[0].sceneApps.forEach(it=>{
          if(it.appWidget && it.appWidget.target){
            this.addStyle(it.appWidget.target+'/component.css');
            this.addScript(it.appWidget.target+'/component.js');
          }
        })
      }
    }
  },
  mounted() {
   window.addEventListener('scroll', this.appScroll)
  },
  data () {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      bg_color:'#fff',//背景颜色
      details:{},
      left_menu:{widgetCode:{}},
    }
  },
  methods:{
    //滚动事件
    appScroll(e) {
      e.preventDefault();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  //浏览器兼容
      // console.log(e, scrollTop);
    },
    //悬浮菜单点击事件
    clickSilder(val) {
      document.getElementById(val).scrollIntoView({behavior: 'smooth'});
    },
    //初始化模板
    styleRender(val){//css 渲染
      var w = this.details.template.width||100;
      var styleList = {
        width:(val.width/w)*1000+'%',
        height:(val.height*10)+'px',
        top:(val.yIndex*10)+'px',
        left:10*val.xIndex+'px',
        position: 'absolute',
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      if(val.appWidget && val.appWidget.target){
        this.addStyle(val.appWidget.target+'/component.css');
        this.addScript(val.appWidget.target+'/component.js');
      }
      return styleList;
    },
    //判断是否为空
    isWidgetCode(item){
      var widgetCode = '';
      if(item.widgetCode){
        widgetCode = item.widgetCode;
      }else{
        if(item.appWidget && item.appWidget.widgetCode){
          widgetCode = item.appWidget.widgetCode;
        }else{
          widgetCode = '';
        }
      }
      return widgetCode;
    },
    //外层全屏
    isWidgetCodeWapr(width,item){
      var widgetCode = '';
      if(item.width == (width/10) && item.configParameter && item.configParameter.fullScreen){
        if(width == 1200){
          widgetCode = ' mar-left-1200';
        }else if(width == 1440){
          widgetCode = ' mar-left-1440';
        }
      }
      return widgetCode;
    },
    //动态设置模板id
    setId(){
      return "jl_vip_zt_" + Math.ceil(Math.random() * 1e8);
    },
    //样式设置
    styleSet(it,i){
      var list = {};
      if(i<0 && this.details.sceneScreens && this.details.sceneScreens[0]){
        list = {'background':this.bg_color+' url('+this.fileUrl+(this.details.sceneScreens[0].bgImg||'')+')','background-position':'center top !important'};
      }else if(i==0){
        list = {'background':this.bg_color+' url('+this.fileUrl+(it.bgImg||'')+')','background-position-y':(-(this.details.headerTemplate.height*10)+'px !important')};
      }else{
        list = {'background':this.bg_color+' url('+this.fileUrl+(it.bgImg||'')+')'};
      }
      return list;
    },
    //格式化
    commonWidgetSetFormat(val){
      if(val && val!="undefind" && val !='null'){
        return val.replace(/\"/g, "'");
      }else{
        return '{}';
      }
    },
  },
}
</script>

<style lang="less" scoped>
/*****其他通用 */
.width_1200{
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.scene-warp-bg{
  // background-size: 100% 100% !important;
  background-position: center !important;
}
.bocy-content{
  position: relative;
  min-width: 1200px;//最小宽度
  margin-left: auto;
  margin-right: auto;
}
.html-warp-page{
  scroll-behavior:smooth;
  width: 100%;
  height: 1%;
  min-height: 100%;
}
/****悬浮菜单样式 */
.dlib3-hovering-menu{
  position: fixed;
  right: 20px;
  z-index: 99;
  top: 50%;
  margin-top: -100px;
  .temp-box{
    display: block;
    cursor: pointer;
    color: #000;
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.6);
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    border-radius: 5px;
    transition: all .3s;
    margin: 6px 0;
    padding: 2px 5px;
    border:1px solid rgba(0,0,0,0);
    &:hover{
      background: #fff;
      border: 1px solid #eee;
      box-shadow: 2px 4px 7px #6b6a6a;
    }
    .temp-icon{
      width: 30px;
      height: 30px;
      display: block;
      border-radius: 3px;
      margin: 5px auto;
    }
    .temp-title{
      color: #333;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      text-align: center;
    }
  }
}
.mar-left-1200{
  width: 100vw !important;
  min-width: 1200px;
  margin-left: calc(((100vw - 1200px) / 2) - (100vw - 1200px));
}
.mar-left-1440{
  width: 100vw !important;
  min-width: 1440px;
  margin-left: calc(((100vw - 1440px) / 2) - (100vw - 1440px));
}
.html-warp-page{
  overflow-x: hidden;
}
@media screen and (max-width:1200px) {
 .mar-left-1200{margin-left:0 !important;}
 .html-warp-page{overflow-x: auto;}
}
@media screen and (max-width:1440px) {
 .mar-left-1440{margin-left:0 !important;}
 .html-warp-page{overflow-x: auto;}
}
</style>