<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content" :class="{'content-collapse':$root.collapse}">
        <!-- <breadcrumb :cuMenu="'栏目管理'"></breadcrumb>面包屑导航- -->
        <div class="content">
          <div class="drag-top">
            <topSelect :dataList="top_list"></topSelect>
          </div><!--顶部条件筛选 end-->

          <div class="drag-content" :style="{'min-height':drag_height+'px'}">
            <div class="drag-l" :class="left_fold?'drag-l-hide':''">
              <div class="drag-l-pad">
                <leftCheck :dataList="left_list" @getAppDetails="getAppDetails"></leftCheck>
                <i class="cut-btn" :class="left_fold?'el-icon-arrow-right':'el-icon-arrow-left'" @click="leftFold()"></i>
              </div>
            </div><!--左边菜单 end-->

            <div class="drag-c" id="monitorCenter" :class="isFoldClass()">
              <div class="screen-btn-drag">
                <el-button size="small" class="default-btn-n-border screen-one" :class="screen_cu==0?'s-b-active':''" @click="screenClick(0)">首屏<span class="s-b-d-close el-icon-error" @click="removScreen(0)"></span></el-button>
                <div class="drag-box-warp" ref="dragBox">
                  <el-button size="small" v-for="(item,index) in screen_list" :key="'dragbox'+index" @click="screenClick(index)" class="default-btn-n-border" :class="screen_cu==index?'s-b-active-close':''" v-if="index!=0">第{{index}}屏<span class="s-b-d-close el-icon-error" @click="removScreen(index)"></span></el-button>
                </div>
                <el-button size="small" class="default-btn-n-border s-b-add" icon="el-icon-plus" @click="addScreen()">新增1屏</el-button>
              </div><!--屏幕数量+拖拽 end-->
              <div class="drag-container" ref="dragContainer">
                <div class="drag-content grid-stack" :style="{'transform':'scale('+ratio_num+')'}">
                  <!--<iframe src="this.http://lib.cqu.edu.cn/" border="0" width="1198px" height="600px" scrolling="no"></iframe>-->
                </div><!--拖拽内容板块 end-->

              </div>
              <scalingPage class="scaling-right" ref="scalingRef" @getRatio="getRatio"></scalingPage>
            </div><!--中间内容 end-->

            <div class="drag-r" :class="right_fold?'drag-r-hide':''">
              <div class="drag-r-pad">
                <rightCheck ref="rightCheck_ref"></rightCheck>
                <i class="cut-btn" :class="right_fold?'el-icon-arrow-left':'el-icon-arrow-right'" @click="rightFold()"></i>
              </div>
            </div><!--右边菜单 end-->

          </div>
        </div><!---顶部查询板块 end--->
        <!-- <footerPage class="top20"></footerPage> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import scalingPage from "@/components/admin/common/scaling";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";

import topSelect from "./model/top_select";
import leftCheck from "./model/left_check";
import rightCheck from "./model/right_check";
import Sortable from "sortablejs";
export default {
  name: 'index',
  components:{serviceLMenu,breadcrumb,scalingPage,topSelect,leftCheck,rightCheck},
  created(){
    //console.log('参数接收：'+this.$route.query.id);
    this.$root.collapse = true;
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  mounted(){
    this.initGrid();
    this.initData();
    this.setHeight(document.body.clientHeight-104);
    this.$nextTick(()=>{
        window.addEventListener('resize', () => { //监听浏览器窗口大小改变
          var c_height = document.body.clientHeight-104;
          this.setHeight(c_height);
        });
    })
    this.dragSort();
    //this.monitorCenter();
  },
  destroyed(){
    window.removeEventListener('resize', () => {},false);
  },
  data () {
    return {
      drag_height:500,
      ratio_num:1,//缩放比例
      left_fold:false,
      right_fold:false,
      screen_cu:0,//当前是第几屏
      screen_list:[{title:'首屏'},{title:'第一屏'}],//屏数量
      appid:'',//应用id
      sceneid:this.$route.query.id,//场景id
      //顶部 步骤1
      top_list:{
        title:this.$route.query.t,
        sceneStatus:[],//服务状态
        visitorLimitType:[],//权限控制
      },
      //左边 步骤2,3
      left_list:{
        terminal_type:this.$route.query.terminal,//终端id
        sceneLayout:[],//场景布局
        sceneTemplate:[],//场景模板
        sceneThemeColor:[],//场景主题色
      },
      //以下是拖拽参数
      grid:null,
      items:[
        {x:0, y:0, h:16, w:12, moduleName:'header', content:'<div id="zt_header_sys"></div>'},
        {x:0, y:16, h:45, w:12, moduleName:'apps_center', content:'<div id="zt_news_temp_sys"></div>'},
        {x:0, y:61, h:42, w:12, moduleName:'database', content:'<div id="zt_database_sys"></div>'},
        {x:0, y:103, h:12, w:12, moduleName:'footer', content:'<div id="zt_footer_sys"></div>'},
      ],
      opts: {//元素初始化高度
        cellHeight: '10', 
        cellHeightThrottle: 100,
      },
      temp_list:[
        {
          cs_url:'http://192.168.21.71:9000/header_sys/temp1/component.css',
          js_url:'http://192.168.21.71:9000/header_sys/temp1/component.js',
        },
        {
          cs_url:'http://192.168.21.71:9000/footer_sys/temp1/component.css',
          js_url:'http://192.168.21.71:9000/footer_sys/temp1/component.js',
        },
        {
          cs_url:'http://192.168.21.71:9000/news_sys/temp1/component.css',
          js_url:'http://192.168.21.71:9000/news_sys/temp1/component.js',
        },
        {
          cs_url:'http://192.168.21.71:9000/database_nav_sys/temp1/component.css',
          js_url:'http://192.168.21.71:9000/database_nav_sys/temp1/component.js',
        },
      ],
    }
  },
  methods:{
    initGrid(){
      this.grid = GridStack.init(this.opts);
      this.grid.on('change', function(event, items) {//改变大小时触发
        var moduleName = items.moduleName;//自定义的板块名称，moduleName字段可以自己更换
        var _rect = items._rect;//元素大小，距离x轴，y轴的位置（单位：px）;(w,h,x,y)
        var _lastUiPosition = items._lastUiPosition;//距离顶部，左边的位置（left,top）
        var _orig = items._orig;//在12宫格中所占的比列（x,y,h,w）
      })
      this.grid.load(this.items);
      setTimeout(() => {
        this.temp_list.forEach(e => {
          this.addStyle(e.cs_url);
          this.addScript(e.js_url);
        });
      }, 200);
    },
    addStyle(url){
      var link=document.createElement("link"); 
      link.setAttribute("rel", "stylesheet"); 
      link.setAttribute("type", "text/css"); 
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    addScript(url){
      var js_element=document.createElement("script");
      js_element.setAttribute("type","text/javascript");
      js_element.setAttribute("src",url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
    initData(){
      //获取本页下拉框参数
      this.http.getPlain('dictionary','').then(res=>{
        /**
          sceneStatus:[],//服务状态
          visitorLimitType:[],//权限控制
          sceneLayout:[],//场景布局
          sceneTemplate:[],//场景模板
          sceneThemeColor:[],//场景主题色
          appPlateSortType:[],//场景内APP排序规则
          appTerminalType:[],//终端类型
          terminalStatus:[],//终端状态
          appServiceType:[],//服务类型
         */
          this.top_list.sceneStatus = res.data.sceneStatus||[];
          this.top_list.visitorLimitType = res.data.visitorLimitType||[];
          this.left_list.sceneLayout = res.data.sceneLayout||[];
          this.left_list.sceneTemplate = res.data.sceneTemplate||[];
          this.left_list.sceneThemeColor = res.data.sceneThemeColor||[];
          this.left_list.appServiceType = res.data.appServiceType||[];
      }).catch(err=>{
          console.log(err);
      })
      // //获取场景内所有栏目列表 /{sceneid}
      // this.http.getPlain_url('app-plate-list-by-scene-id','/'+this.sceneid).then(res=>{
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err);
      // })
      
    },
    //点击应用，获取应用的组件及相应信息
    getAppDetails(id){
      this.$refs.rightCheck_ref.appDetails(id);
    },
    /****监听中间区域的变化****/
    monitorCenter(){
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      let element = document.querySelector('#monitorCenter')
      this.observer = new MutationObserver((objList) => {
        console.log('obj List:', objList)
        let width = element.offsetWidth
        if (this.recordOldValue && width === this.recordOldValue.width) {
          return
        }
        this.recordOldValue = {
          width
        }
        console.log('obj width:', width)
      })
      this.observer.observe(element, { attributes: true, childList: true, subtree: true })
    },
    /***拖拽更换屏顺序**/
    dragSort() {
      const el = this.$refs.dragBox;
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onStart: function (evt) {
            evt.oldIndex;
            console.log(evt.oldIndex)
        },
        onEnd: e => {
          const targetRow = this.screen_list.splice(e.oldIndex, 1)[0];//oldIndex原位置
          this.screen_list.splice(e.newIndex, 0, targetRow);//newIndex新位置
          console.log(this.screen_list,'排序后的数据')
          let drag_row = this.screen_list[e.newIndex]; //拖动行
        }//onEnd
      });
    },
    /****新增一屏 */
    addScreen(){
      this.screen_list.push({title:''});
    },
    /****删除一屏 */
    removScreen(val){
      this.screen_list.splice(val,1);
    },
    /****点击第几屏 */
    screenClick(val){
      this.screen_cu = val;
    },
    /*********高度动态设置 */
    setHeight(val){
      if(this.$refs.dragContainer){
        var c_width = this.$refs.dragContainer.clientWidth-60;
        this.$refs.scalingRef.getHeight(c_width);
      }
      if(val<500){
        this.drag_height = 500;
      }else{
        this.drag_height = val;
      }
    },
    getRatio(val){
      // console.log('父级获取到的比例为：'+val);
      this.ratio_num = val;
    },
    /****左边-折叠菜单-点击*****/
    collapseClick(val){
      //console.log(val);
    },
    /***左边折叠 */
    leftFold(){
      this.left_fold = !this.left_fold;
    },
    /***右边折叠 */
    rightFold(){
      this.right_fold = !this.right_fold;
    },
    /****两边折叠-中间 */
    isFoldClass(){
      var cls = '';
      if(this.left_fold && this.right_fold){
        cls = 'drag-c-l-tran drag-c-r-tran';
      }else if(this.left_fold){
        cls = 'drag-c-l-tran';
      }else if(this.right_fold){
        cls = 'drag-c-r-tran';
      }
      //console.log(cls);
      return cls;
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
  /****针对阴影****/
  .content-collapse{
    &::after{
      content: '';
      top: 0;
      bottom: 0;
      width: 1px;
      left: 0;
      z-index: 9;
      position: absolute;
      box-shadow: 2px 0px 5px rgba(0,0,0,.13);
    }
  }
  .content{
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    height: 100%;
    .drag-content{
      position: relative;
      min-height: 600px;
      background-color: @F1F3F7;
      .drag-l,.drag-c,.drag-r{
        position: absolute;
        bottom: 0;
        top: 0;
        background-color: @fff;
      }
      .drag-l-pad,.drag-r-pad{
        width: 100%;
        height: 100%;
        padding: 0 20px;
      }
      .drag-l,.drag-r{
        width: 255px;
        z-index: 2;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
        .cut-btn{
          cursor: pointer;
          display: block;
          top:50%;
          margin-top: -33px;
          position: absolute;
          color: @fff;
          width: 18px;
          height: 65px;
          text-align: center;
          line-height: 65px;
          background: #A5B3CC;
          user-select: none;
          &:hover{
            opacity:.8;
          }
          &:active{
            opacity:1;
          }
        }
      }
      .drag-l{
        left: 0;
        .cut-btn{
          left: 255px;
          border-radius: 0px 40px 40px 0px;
        }
      }
      .drag-l-hide{
        width: 0;
        .left-check-page{
          overflow: hidden;
        }
        .cut-btn{
          left: 0;
        }
        .drag-l-pad{
          padding: 0;
        }
      }
      .drag-r{
        right: 0;
        .cut-btn{
          right: 255px;
          border-radius:40px 0px 0px 40px;
        }
      }
      .drag-r-hide{
        width: 0;
        .right-check-page{
          overflow: hidden;
        }
        .cut-btn{
          right: 0;
        }
        .drag-r-pad{
          padding: 0;
        }
      }
      .drag-c{
        left: 289px;
        right: 289px;
        z-index: 1;
        background-color: @F1F3F7;
        .scaling-right{
          margin-left: auto;
          margin-top:30px;
        }
        .drag-container{
          width: 100%;
          min-width: 420px;//30%
          background-color: @fff;
          padding: 30px;
          .drag-content{
            width: 1200px;
            transform-origin: 0 0;
            margin-left: auto;
            margin-right: auto;
            border: 1px dashed @BCBCBC;
          }
          img{
            width: 1198px;
            display: block;
          }
        }
        /***************屏幕按钮板块 */
        .screen-btn-drag{
          padding:20px 5px;
          padding-bottom: 0;
          .drag-box-warp{
            display: inline-block;
            margin-right: -5px;
          }
          .default-btn-n-border{
            margin-bottom: 20px;
            width: 126px;
            background-color: @C5CFE0;
            color: @34395E;
            margin-right:40px;
            margin-left: 0;
            position: relative;
            &:first-child{
              margin-left: 0;
            }
            &::after{
              position: absolute;
              content: '';
              display: block;
              left: -5px;
              right: -5px;
              top: -5px;
              bottom: -5px;
              border: 1px dashed @BCBCBC;
            }
            .s-b-d-close{
              position: absolute;
              right: -10px;
              top: -10px;
              display: none;
              z-index: 3;
              font-size: 16px;
              color: @6C757D;
              &:hover{
                opacity: .8;
              }
              &:active{
                opacity: 1;
              }
            }
          }
          .screen-one{
            margin-right: 35px;
          }
          /***首屏选中效果-不显示删除按钮 */
          .s-b-active{
            color: @fff;
            background: linear-gradient(353deg, #9985FF 0%, #9985FF 54%, #A18FFF 56%, #A18FFF 100%);
          }
          /***选中效果 */
          .s-b-active-close{
            color: @fff;
            background: linear-gradient(353deg, #9985FF 0%, #9985FF 54%, #A18FFF 56%, #A18FFF 100%);
            .s-b-d-close{
              display: block;
            }
          }
          /****新增按钮 */
          .s-b-add{
            background: #E4E6FC;
          }
        }
      }
      .drag-c-l-tran{
        left: 34px;
        transition: left 0.3s ease-in-out;
      }
      .drag-c-r-tran{
        right: 34px;
        transition: right 0.3s ease-in-out;
      }
    }
  }
</style>
