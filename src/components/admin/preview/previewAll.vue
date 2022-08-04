<!---服务中台-通用预览+普通分屏-->
<template>
  <div class="html-warp-page" :class="(items&&items.themeColor)||'template1'">
    
    <template v-if="items && !isLock"><!--宽1200通用-->

      <div v-if="items.headerTemplate" :class="items.headerTemplate.templateCode" :data-set="JSON.stringify({
          logo:items.headerTemplate.logo||'',
          headerBgImg:items.headerTemplate.headerBgImg||'',
          displayNavColumn:items.headerTemplate.displayNavColumn||'',
        })">
        <div :id="setId()"></div>
      </div><!-- 头部信息-end -->

      <div class="scene-warp-bg" v-for="(it,i) in items.sceneScreens" :key="i+'scene'" :id="'temp'+i" :style="{'background':bg_color+' url('+fileUrl+(it.bgImg||'')+')'}">
        <div class="bocy-content" :style="{height:it.height+'px',width:(items.template.width==100?'100%':(items.template.width+'px'))}" :class="(items.layoutId=='3'||items.layoutId=='4')?'width_1200':''">
          <div v-for="(item,index) in it.sceneApps" :key="index" :class="isWidgetCodeWapr(items.template.width,item)" :style="styleRender(item)">
            <div :class="isWidgetCode(item)" :style="{height:'100%'}" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')">
              <div :id="setId()"></div>
            </div>
          </div>
        </div>

      </div>

      <div v-if="items.footerTemplate" :class="items.footerTemplate.templateCode" :data-set="JSON.stringify({
          content:items.footerTemplate.content||'',
          footerBgImg:items.footerTemplate.footerBgImg||'',
          footerDisplayNavColumn:items.footerTemplate.footerDisplayNavColumn||'',
        })">
        <div :id="setId()"></div>
      </div><!-- 底部信息-end -->

      <div class="temp-menu-w" v-if="items.layoutId==2 && items && items.sceneScreens">
        <a class="temp-box" v-for="(it,i) in (items.sceneScreens||[])" :key="i" @click="clickSilder('temp'+i)">
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
  created(){
    var list = JSON.parse(window.localStorage.getItem('scenePreview'));
    if(list && list.template){
      document.title = list.name||'预览';
      this.isLock = list.template.isLock;
      this.bg_color = list.template.backgroundColor||'#fff';
      this.items = list;
      if(this.items.jsPath){
        this.items.jsPath.forEach(it=>{
          this.addScript(it);
        })
      }
      if(this.isLock){
        this.addStyle(this.items.headerTemplate.router+'/component.css');
        this.addScript(this.items.headerTemplate.router+'/component.js');
        setTimeout(() => {//循环未完成，有可能错误，所以采用了一个定时
          this.addStyle(this.items.footerTemplate.router+'/component.css');
          this.addScript(this.items.footerTemplate.router+'/component.js');
        }, 300);
          if(this.items.sceneScreens){
            this.items.sceneScreens[0].sceneApps.forEach(it=>{
              if(it.xIndex==0 && it.appWidget && it.appWidget.widgetCode=='other_left_menu_list'){
                console.log('全屏');
                this.left_menu = it;
                if(it.appWidget && it.appWidget.target){
                  this.addStyle(it.appWidget.target+'/component.css');
                  this.addScript(it.appWidget.target+'/component.js');
                }
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
        },250)
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.appScroll)
  },
  data () {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      isLock:false,//是否左侧固定模板
      bg_color:'#fff',//背景颜色
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
    //滚动事件
    appScroll(e) {
      e.preventDefault();
      //浏览器兼容
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(e, scrollTop);
    },
    //悬浮菜单点击事件
    clickSilder(val) {
      // 获取DOM元素
      let el = document.getElementById(val);
      // chrome
      document.body.scrollTop = el.offsetTop;
      // firefox
      document.documentElement.scrollTop = el.offsetTop;
    },
    //初始化模板
    styleRender(val){//css 渲染
      var list = {
        width:10*val.width+'px',
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
      return list;
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
  background-size: 100% 100% !important;
}
.bocy-content{
  position: relative;
  min-width: 1200px;//最小宽度
  margin-left: auto;
  margin-right: auto;
}
.html-warp-page{
  width: 100%;
  height: 1%;
  min-height: 100%;
}
/****悬浮菜单样式 */
.temp-menu-w{
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
@media screen and (max-width:1440) {
 .mar-left-1440{margin-left:0 !important;}
 .html-warp-page{overflow-x: auto;}
}
</style>