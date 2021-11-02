<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content" :class="{'content-collapse':$root.collapse}">
        <!-- <breadcrumb :cuMenu="'栏目管理'"></breadcrumb>面包屑导航- -->
        <div class="content">
          <div class="drag-top">
            <topSelect :dataList="top_list" @saveClick="saveClick"></topSelect>
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
                <div class="drag-content grid-stack"></div>
                <!-- <div class="drag-content grid-stack" :style="{'transform':'scale('+ratio_num+')'}"></div> -->
              </div><!--拖拽板块-->

              <scalingPage class="scaling-right" ref="scalingRef" @getRatio="getRatio"></scalingPage>
            </div><!--中间内容 end-->

            <div class="drag-r" :class="right_fold?'drag-r-hide':''">
              <div class="drag-r-pad">
                <rightCheck ref="rightCheck_ref" @addCompont="addCompont"></rightCheck>
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
    var _this = this;
    document.addEventListener("click",function(e){
      if(e.target.className == 'jl_vip_zt_del'){
        if(e.target.parentNode.parentNode.parentNode){
          _this.grid.removeWidget(e.target.parentNode.parentNode.parentNode);
        }
      }
    });
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
        {
          x:0, y:0, h:16, w:12, 
          target:'http://192.168.21.71:9000/header_sys/temp1',
          id:'zt_header_sys',
          content:'<div class="jl_vip_zt_warp"><i class="jl_vip_zt_del">X</i><div id="zt_header_sys"></div></div>'
        },
        {
          x:0, y:0, h:10, w:12, 
          target:'http://192.168.21.71:9000/footer_sys/temp1',
          id:'zt_footer_sys',
          content:'<div class="jl_vip_zt_warp"><i class="jl_vip_zt_del">X</i><div id="zt_footer_sys"></div></div>'
        },
      ],
      opts: {//元素初始化高度
        cellHeight: '10', 
        cellHeightThrottle: 100,
      },
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
    //添加组件
    addCompont(val){
      console.log(this.$options);
      console.log(val);
      var component_id = 'jl_vip_zt_'+new Date().getTime();//这里的id要动态
      let it = {
          x: 0, y: 0, h: 20, w: 12, 
          target:val.target,
          id:component_id,
          modelName:component_id,
          content:'<div class="jl_vip_zt_warp"><i class="jl_vip_zt_del">X</i><div id="'+component_id+'"></div></div>'
        };
      this.grid.addWidget(it);
      setTimeout(()=>{
        this.addStyle(val.target+'/component.css');
        this.addScript(val.target+'/component.js?id='+it.id);
      },200)
    },
    //保存模板结构json
    saveClick(){
      var list = [];
      if(this.grid.save() && this.grid.save().length){
        this.grid.save().forEach(item=>{
          list.push({
            x: item.x, y: item.y, h: item.h, w: item.w, 
            target:item.target,
            id:item.id,
            content:'<div class="jl_vip_zt_warp"><i class="jl_vip_zt_del">X</i><div id="'+item.id+'"></div></div>'
          })
        })
      }
      console.log(list);
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
    //初始化页面数据
    initData(){
      //获取本页下拉框参数
      this.http.getPlain('dictionary','').then(res=>{
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
@import "./scene_set.less";
</style>

