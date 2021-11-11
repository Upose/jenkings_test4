<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content" :class="{'content-collapse':$root.collapse}">
        <!-- <breadcrumb :cuMenu="'栏目管理'"></breadcrumb>面包屑导航- -->
        <div class="content">
          <div class="drag-top">
            <topSelect :dataList="top_list" @setHFooter="setHFooter" @saveClick="saveClick" @scenePreview="scenePreview" @topCheck="topCheck"></topSelect>
          </div><!--顶部条件筛选 end-->

          <div class="drag-content" :style="{'min-height':drag_height+'px'}">
            <div class="drag-l" :class="left_fold?'drag-l-hide':''">
              <div class="drag-l-pad">
                <leftCheck :dataList="left_list" @getAppDetails="getAppDetails" @layoutClick="layoutClick" @setTheme="setTheme" @templateClick="templateClick"></leftCheck>
                <i class="cut-btn" :class="left_fold?'el-icon-arrow-right':'el-icon-arrow-left'" @click="leftFold()"></i>
              </div>
            </div><!--左边菜单 end-->

            <div class="drag-c" id="monitorCenter" :class="isFoldClass()">
              <div class="screen-btn-drag" v-show="postForm.layoutId=='2' || postForm.layoutId=='4'">
                <el-button size="small" class="default-btn-n-border screen-one" :class="screen_cu==0?'s-b-active':''" @click="screenClick(0)">首屏<span class="s-b-d-close el-icon-error" @click="removScreen(0)"></span></el-button>
                <div class="drag-box-warp" ref="dragBox">
                  <el-button size="small" v-for="(item,index) in screen_list" :key="'dragbox'+index" @click="screenClick(index)" class="default-btn-n-border" :class="screen_cu==index?'s-b-active-close':''" v-if="index!=0">第{{index}}屏<span class="s-b-d-close el-icon-error" @click="removScreen(index)"></span></el-button>
                </div>
                <el-button size="small" class="default-btn-n-border s-b-add" icon="el-icon-plus" @click="addScreen()">新增1屏</el-button>
              </div><!--屏幕数量+拖拽 end-->

              <div class="drag-container" ref="dragContainer">
                <div class="drag-content grid-stack" ref="grid_stack"></div>
                <!-- <div class="drag-content grid-stack" :style="{'transform':'scale('+ratio_num+')'}"></div> -->
              </div><!--拖拽板块-->

              <scalingPage class="scaling-right" ref="scalingRef" @getRatio="getRatio"></scalingPage><!--缩放组件-->
            </div><!--中间内容 end-->

            <div class="drag-r" :class="right_fold?'drag-r-hide':''">
              <div class="drag-r-pad">
                <rightCheck ref="rightCheck_ref" @addCompont="addCompont" @saveTempSet="saveTempSet"></rightCheck>
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
    this.$root.collapse = true;
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
    var _this = this;
    //监听事件
    document.addEventListener("click",function(e){//点击元素准备修改的时候，需要在当前元素添加一个class，并且移出其他兄弟元素的class
      if(e.target.className == 'jl_vip_zt_del'){//删除按钮
        if(e.target.parentNode.parentNode.parentNode){
          _this.grid.removeWidget(e.target.parentNode.parentNode.parentNode);
        }
      }
      if(e.target.className.indexOf('mask-layer')>-1){//单击场景中的模板
        e.target.setAttribute('class','mask-layer mask-layer-active');//设置选中样式
        var cu_id = e.target.parentNode.parentNode.parentNode.getAttribute('gs-id');//当前元素的id
        _this.removeActiveClass(cu_id);//移出不属于点击区域的选中元素
        var appid = e.target.dataset.appid;//应用id
        var appwidgetid = e.target.dataset.appwidgetid;//模板id
        var set_list = e.target.dataset.set;//设置的配置参数
        _this.getAppDetails({'id':appid,'temp_id':appwidgetid,'is_add':false,'set_list':set_list});
      }
    });
  },
  mounted(){
    document.getElementsByTagName("body")[0].setAttribute('class',(window.localStorage.getItem('template')||'template1'));//颜色初始化
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
      screen_list:[{title:'首屏'},{}],//屏数量
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
      //以下是拖拽参数 jl_vip_zt_warp为固定class参数，为了渲染内部的删除标签等
      grid:null,
      postForm:{
        templateId:'',//选择模板
        terminalInstanceId:this.$route.query.id,//终端id
        terminalInstanceName:this.$route.query.t,//终端实例名称
        themeColor:'template1',//颜色参数
        layoutId:'2',//布局  1通屏；2分屏；3通屏定宽；4分屏定宽
        headerTemplate:{
          router:'http://192.168.21.71:9000/header_sys/temp1',
          templateCode:'header_sys_temp1',
        },//头部模板
        footerTemplate:{
          router:'http://192.168.21.71:9000/footer_sys/temp1',
          templateCode:'footer_sys_temp1',
        },//底部模板
        sceneScreens:[//屏幕数量
          {
            sceneApps:[//模板数量
              // {
              //   x:0, y:0, h:43, w:4, 
              //   noMove: true, //不能移动
              //   noResize: true, //静止调整大小
              //   locked: true,//锁定
              //   appId:'appwd125-1717-4562-b3fc-2c963f66afa6',//应用id
              //   appWidgetId:'appwd125-1717-4562-b3fc-2c963f66afa6', //组件id
              //   target:'http://192.168.21.71:9000/news_sys/temp1',
              //   id:'c13553',
              //   widgetCode:'news_sys_temp1',
              //   content:'<div class="jl_vip_zt_warp news_sys_temp1"><i class="jl_vip_zt_del">X</i><div class="mask-layer"></div><div id="c13553"></div></div>'
              // },
            ],
          }
        ],//分屏
      },
      
      //资源文件列表（需去重且需重写刷新）
      resource_file_list:[
        'http://192.168.21.71:9000/header_sys/temp1',
        'http://192.168.21.71:9000/news_sys/temp1',
        'http://192.168.21.71:9000/footer_sys/temp1',
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
      this.grid.load(this.postForm.sceneScreens[0]['sceneApps']);//这里是取的第一屏
      this.resource_file_list.forEach((item,i)=>{
        this.addStyle(item+'/component.css');
        this.addScript(item+'/component.js');
      })
    },
    //添加组件
    addCompont(val){
      console.log(val);
      var data = val.list;//模板参数
      var is_add = val.is_add_compont;//添加模板还是修改模板 true添加模板
      var component_id = 'jl_vip_zt_'+new Date().getTime();//这里的id要动态
      console.log(component_id);
      if(is_add){
        //添加时，要将已存在的选中状态的元素移出选中状态；
        this.removeActiveClass('mask-layer');
        let it = {
            x: 0, y: 0, h: data.height, w: data.width, 
            target:data.target,
            id:data.id,
            divId:component_id,//元素渲染id
            appId:data.appId,
            widgetCode:data.widgetCode,
            appWidget:data,
            appPlateItems:[],//应用对应的设置
            content:'<div class="jl_vip_zt_warp '+data.widgetCode+'" data-id="'+component_id+'"><i class="jl_vip_zt_del">X</i><div class="mask-layer mask-layer-active" data-appId="'+data.appId+'" data-appWidgetId="'+data.id+'"></div><div id="'+component_id+'"></div></div>'
          };
        this.addCompontFlush(it);
      }else{
        var is_cu_temp = document.getElementsByClassName('mask-layer-active');
        if(is_cu_temp.length>0){
          var x = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-x');
          var y = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-y');
          var w = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-w');
          var h = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-h');
          this.grid.removeWidget(is_cu_temp[0].parentNode.parentNode.parentNode);
          let it = {
            x: x, y: y, h: h, w: w, 
            target:data.target,
            id:data.id,
            divId:component_id,//元素渲染id
            appId:data.appId,
            appPlateItems:[],//应用对应的设置
            widgetCode:data.widgetCode,
            appWidget:data,
            content:'<div class="jl_vip_zt_warp '+data.widgetCode+'" data-id="'+component_id+'"><i class="jl_vip_zt_del">X</i><div class="mask-layer mask-layer-active" data-appId="'+data.appId+'" data-appWidgetId="'+data.id+'"></div><div id="'+component_id+'"></div></div>'
          };
        this.removeActiveClass('mask-layer');  
        this.addCompontFlush(it);
        }
      }
    },
    //移出class,有值表示当前为选中，无值表示当前为添加一个新元素时，需默认选中添加的元素
    removeActiveClass(cu_id){
      var class_list = document.getElementsByClassName('mask-layer');//获取所有兄弟元素
        if(class_list){//这段代码表示只允许选中一个可修改元素
          for (let index = 0; index < class_list.length; index++) {
            var element = class_list[index];
            var el_id = element.parentNode.parentNode.parentNode.getAttribute('gs-id');
            if(el_id!= cu_id){
              element.setAttribute('class','mask-layer');
            }
          }
        }
    },
    //执行添加模板
    addCompontFlush(it){
      this.grid.addWidget(it);
      //这个地方的添加class和js时，需要先判断resource_file_list是否已经存在，存在就执行刷新，不存在就添加。
      setTimeout(()=>{
        this.addStyle(it.target+'/component.css');
        this.addScript(it.target+'/component.js');
      },200)
    },
    //保存模板结构json
    saveClick(){
      var list = [];
      if(this.grid.save() && this.grid.save().length){
        this.grid.save().forEach(item=>{
          list.push({
            xIndex: item.x, yIndex: item.y, height: item.h, width: item.w, 
            target:item.target,
            id:item.id,
            appWidget:item.appWidget,
            appPlateItems:[],//应用对应的设置
            appId:item.appId,
            widgetCode:item.widgetCode,
            // content:'<div class="jl_vip_zt_warp '+item.widgetCode+'"><i class="jl_vip_zt_del">X</i><div id="'+('jl_vip_zt_'+new Date().getTime())+'"></div></div>'
          })
        })
      }
      this.postForm['sceneScreens'][0]['height'] = this.$refs.grid_stack.clientHeight;
      this.postForm['sceneScreens'][0]['sceneApps'] = list;
      console.log(this.postForm);
      this.http.postJson('scene-add',this.postForm).then(res=>{
        console.log(res);
      }).catch(err=>{

      })
    },
    //预览 保存不要遮罩层
    scenePreview(){
      console.log(this.grid.save());
      var list = [];
      if(this.grid.save() && this.grid.save().length){
        this.grid.save().forEach(item=>{
          list.push({
            x: item.x, y: item.y, h: item.h, w: item.w, 
            target:item.target,
            widgetCode:item.widgetCode,
            id:item.id,
            appWidget:item.appWidget,
            appId:item.appId,
            content:'<div class="jl_vip_zt_warp '+item.widgetCode+'"><i class="jl_vip_zt_del">X</i><div id="'+('jl_vip_zt_'+new Date().getTime())+'"></div></div>'
          })
        })
      }
      //[0]表示第几屏
      this.postForm['sceneScreens'][0]['height'] = this.$refs.grid_stack.clientHeight;
      this.postForm['sceneScreens'][0]['sceneApps'] = list;
      window.localStorage.setItem('scenePreview',JSON.stringify(this.postForm));
      var url = window.location.origin+"/#/scenePreview";
      setTimeout(() => {
        window.open(url);
      }, 200);
    },
    //顶部选择的数据
    topCheck(val){
      this.postForm.status = val.status||'';
      this.postForm.sceneUsers = val.user_type||[];
      this.postForm.visitorLimitType = val.visitor_type||0;
    },
    //设置主题颜色
    setTheme(val){
      this.postForm.themeColor=val;
    },
    //选择模板-左边
    templateClick(val){
      this.postForm.templateId=val.value||'';
    },
    //保存模板设置参数（条数，栏目，排序规则等）
    saveTempSet(val){
      console.log(this.grid);
      if(this.grid.save() && this.grid.save().length){
        this.grid.save().forEach(item=>{
          if(item.divId == val.divId){
            // item['appPlateItems']=val.list;
            //这个地方可以选择将数据单独存到一个数组中，然后最后提交的时候再塞入到里面一起提交。
          }
        })
      }
    },
    //选择布局
    layoutClick(val){
      this.$confirm('此操作将清空现有布局, 是否继续?', '提示', {
        confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
      }).then(() => {
        this.postForm.layoutId = val.value;
      })
    },
    //设置头部底部
    setHFooter(val){
      this.postForm['headerTemplate'] = val.headerTemplate;
      this.postForm['footerTemplate'] = val.footerTemplate;
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
    },
    //点击应用，获取应用的组件及相应信息id:应用id；temp_id:模板id；is_add:是新增还是选择了场景中已存在的true为新增。
    getAppDetails(val){
      this.$refs.rightCheck_ref.appDetails({'id':val.id,'temp_id':val.temp_id,'is_add':val.is_add,'set_list':val.set_list});
    },
    /****监听中间区域的变化****/
    monitorCenter(){
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      let element = document.querySelector('#monitorCenter')
      this.observer = new MutationObserver((objList) => {
        // console.log('obj List:', objList)
        let width = element.offsetWidth
        if (this.recordOldValue && width === this.recordOldValue.width) {
          return
        }
        this.recordOldValue = {
          width
        }
        // console.log('obj width:', width)
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
      this.screen_list.push({});
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

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
@import "./scene_set.less";
@import "../../../assets/web/css/color.less";/**通用文件 */
</style>

