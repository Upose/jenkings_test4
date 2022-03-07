<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content" :class="{'content-collapse':$root.collapse}">
        <!-- <breadcrumb :cuMenu="'栏目管理'"></breadcrumb>面包屑导航- -->
        <div class="content">
          <div class="drag-top">
            <topSelect :dataList="top_list" @setHFooter="setHFooter" @saveClick="saveClick" @scenePreview="scenePreview" @topCheck="topCheck" @setName="setName" ref="topselect_ref"></topSelect>
          </div><!--顶部条件筛选 end-->

          <div class="drag-content" :style="{'min-height':drag_height+'px'}">
            <div class="drag-l" :class="left_fold?'drag-l-hide':''">
              <div class="drag-l-pad">
                <leftCheck :dataList="left_list" @getAppDetails="getAppDetails" @layoutClick="layoutClick" @setTheme="setTheme" @templateClick="templateClick" ref="leftcheck_ref"></leftCheck>
                <i class="cut-btn" :class="left_fold?'el-icon-arrow-right':'el-icon-arrow-left'" @click="leftFold()"></i>
              </div>
            </div><!--左边菜单 end-->

            <div class="drag-c" id="monitorCenter" :class="isFoldClass()">
              <div class="screen-btn-drag" v-show="postForm.layoutId== 2 || postForm.layoutId== 4">
                <el-button size="small" class="default-btn-n-border screen-one" :class="screen_cu==0?'s-b-active':''" @click="screenClick(0)">首屏<span class="s-b-d-close el-icon-error" @click.stop="removScreen(0)"></span></el-button>
                <div class="drag-box-warp" ref="dragBox">
                  <el-button size="small" v-for="(item,index) in screen_list" :key="'dragbox'+index" class="default-btn-n-border" @click="screenClick(index)" :class="screen_cu==index?'s-b-active-close':''" v-if="index!=0">第{{index}}屏<span class="s-b-d-close el-icon-error" @click.stop="removScreen(index)"></span></el-button>
                </div>
                <el-button size="small" class="default-btn-n-border s-b-add" icon="el-icon-plus" @click="addScreen()">新增1屏</el-button>
              </div><!--屏幕数量+拖拽 end-->

              <div class="drag-container" ref="dragContainer" :class="postForm.themeColor||'template1'">
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
var admin_vue = null;
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
    admin_vue = this;
    //监听事件
    document.addEventListener("click",function(e){//点击元素准备修改的时候，需要在当前元素添加一个class，并且移出其他兄弟元素的class
      if(e.target.className == 'jl_vip_zt_del'){//删除按钮
        if(e.target.parentNode.parentNode.parentNode){
          admin_vue.grid.removeWidget(e.target.parentNode.parentNode.parentNode);
        }
      }
      if(e.target.className.indexOf('mask-layer')>-1){//单击场景中的模板
        e.target.setAttribute('class','mask-layer mask-layer-active');//设置选中样式
        var cu_id = e.target.parentNode.dataset.id;//当前元素的id
        admin_vue.removeActiveClass(cu_id);//移出不属于点击区域的选中元素
        var appid = e.target.dataset.appid;//应用id
        var appwidgetid = e.target.dataset.appwidgetid;//模板id
        var set_list = e.target.dataset.set;//设置的配置参数
        admin_vue.getAppDetails({'id':appid,'temp_id':appwidgetid,'is_add':false,'set_list':set_list});
      }
    });
  },
  mounted(){
    if(this.$route.query.scene){
      this.getDetails();
    }
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
      screen_list:[{sceneApps:[]},{sceneApps:[]}],//屏数量
      sceneid:this.$route.query.id,//场景id
      //顶部 步骤1
      top_list:{
        sceneStatus:[],//服务状态
        visitorLimitType:[],//权限控制
      },
      //左边 步骤2,3
      left_list:{
        sceneLayout:[],//场景布局
        sceneTemplate:[],//场景模板
        sceneThemeColor:[],//场景主题色
      },
      //以下是拖拽参数 jl_vip_zt_warp为固定class参数，为了渲染内部的删除标签等
      resource_file_list:[],//资源文件列表（需去重且需重写刷新）初始化的时候需要将数据中涉及到的js放入到里面，包括新增的时候，都需要将js重新加到这里面
      apps_set_list:{},//场景内所有的应用模板设置参数。
      grid:null,//拖拽渲染
      postForm:{
        name:'',//场景名称
        templateId:'',//选择模板-左边 风格
        terminalInstanceId:this.$route.query.id,//终端id
        terminalInstanceName:this.$route.query.t,//终端实例名称
        themeColor:'template1',//颜色参数
        layoutId:1,//布局  1通屏；2分屏；3通屏定宽；4分屏定宽
        headerTemplate:{},//头部模板
        footerTemplate:{},//底部模板
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
              //   content:'<div class="jl_vip_zt_warp news_sys_temp1"><i class="jl_vip_zt_del"></i><div class="mask-layer"></div><div id="c13553"></div></div>'
              // },
            ],
          }
        ],//分屏
      },
      opts: {//元素初始化高度
        cellHeight: 10, 
        // cellWidth:10,
        cellHeightThrottle:100,
      },
    }
  },
  methods:{
    //获取详情
    getDetails(){
      var _this = this;
      this.http.getPlain_url('scene-detail','/'+this.$route.query.scene).then(res=>{
        // console.log('详情',res);
        if(res.data){
          _this.$refs.topselect_ref.setDatils(res.data);
          _this.$refs.leftcheck_ref.setDatils(res.data);
          _this.$refs.rightCheck_ref.setDatils(res.data);
          _this.postForm = res.data||{};
          if(_this.postForm.sceneScreens.length>0){
            _this.postForm.sceneScreens.forEach((item,index)=>{
                let result = item.sceneApps.map((it,index) => ({
                  w: it.width,
                  h: it.height,
                  x: it.xIndex,
                  y: it.yIndex,
                  minW:it.appWidget.width,
                  minH:it.appWidget.height,
                  appId:it.appId,
                  appPlateItems:it.appPlateItems,
                  appWidget:it.appWidget,
                  id:it.id,
                  divId:'jl_vip_zt_'+index,
                  target:it.appWidget.target,
                  sceneId:it.sceneId,
                  sceneScreenId:it.sceneScreenId,
                  widgetCode:it.appWidget.widgetCode,
                  content:'<div class="jl_vip_zt_warp '+it.appWidget.widgetCode+'" data-id="'+('jl_vip_zt_'+index)+'" data-set="'+JSON.stringify(it.appPlateItems||[]).replace(/\"/g,"'")+'"><i class="jl_vip_zt_del"></i><div class="mask-layer" data-appId="'+it.appId+'" data-appWidgetId="'+it.appWidget.id+'" data-set="'+JSON.stringify(it.appPlateItems).replace(/\"/g,"'")+'"></div><div id="'+('jl_vip_zt_'+index)+'"></div></div>'
                }));
                _this.postForm.sceneScreens[index].sceneApps = result;
            })
            _this.screen_list = _this.postForm.sceneScreens;
            console.log(_this.screen_list);
            _this.initScree();
          }
          if(_this.postForm.layoutId == '1' && _this.postForm.layoutId == '3'){//通屏
            // this.screen_list
            
          }else{//分屏

          }
        }
        
      }).catch(err=>{

      })
    },
    //初始化模板，需要将当前模板的数据渲染到模板上，且在切换模板的时候，要重新save保存一下当前模板的数据到当前屏。
    initGrid(){
      this.grid = GridStack.init(this.opts);
      this.initScree();
    },
    //初始化拖拽
    initScree(){
      if(this.grid){
        this.grid.removeAll();
      }
      this.grid.load(this.screen_list[this.screen_cu]['sceneApps']||[]);//这里是取的第一屏
      this.loadRes();
    },
    /****新增一屏 */
    addScreen(){
      this.screen_list.push({sceneApps:[]});
    },
    /****点击第几屏 */
    screenClick(val){
      this.saveList();
      setTimeout(() => {
        this.screen_cu = val;
        this.initScree();
      }, 100);
    },
    //保存当前屏幕的列表 -- 切换屏幕的时候需要将当前屏幕的参数获取然后放入到数组中。
    saveList(){
      var _this = this;
      var list = [];
      if(this.grid.save() && this.grid.save().length){
        this.grid.save().forEach(item=>{
          list.push({
            x: item.x, y: item.y, h: item.h, w: item.w,
            minW:item.minW,
            minH:item.minH,
            target:item.target,
            tempId:item.tempId,
            divId:item.divId,//元素渲染id
            appId:item.appId,
            sceneId:item.sceneId,
            sceneScreenId:item.sceneScreenId,
            widgetCode:item.widgetCode,
            appWidget:item.appWidget,
            appPlateItems:_this.apps_set_list[item.divId]||item.appPlateItems,//应用对应的设置
            content:'<div class="jl_vip_zt_warp '+item.widgetCode+'" data-id="'+item.divId+'" data-set="'+JSON.stringify(item.appPlateItems||[]).replace(/\"/g,"'")+'"><i class="jl_vip_zt_del"></i><div class="mask-layer" data-appId="'+item.appId+'" data-appWidgetId="'+item.tempId+'" data-set="'+JSON.stringify(item.appPlateItems||[]).replace(/\"/g,"'")+'"></div><div id="'+item.divId+'"></div></div>'
          })
        })
      }
      if(this.screen_list.length==1){
        this.screen_list[this.screen_cu]['height'] = this.$refs.grid_stack.clientHeight;
        this.screen_list[this.screen_cu]['sceneApps'] = list;
      }else{
        if(list.length>0){
          this.screen_list[this.screen_cu]['height'] = this.$refs.grid_stack.clientHeight;
          this.screen_list[this.screen_cu]['sceneApps'] = list;
        }
      }
    },
    /****删除一屏 */
    removScreen(val){
      this.screen_list.splice(val,1);
      if(this.grid){
        this.grid.removeAll();
      }
      this.screen_cu = val-1;
      this.screenClick(this.screen_cu);
    },
    //添加组件
    addCompont(val){
      console.log(val);
      var data = val.list;//模板参数
      var is_add = val.is_add_compont;//添加模板还是修改模板 true添加模板
      var component_id = 'jl_vip_zt_'+new Date().getTime();//这里的id要动态
      if(is_add){
        //添加时，要将已存在的选中状态的元素移出选中状态；
        this.removeActiveClass('mask-layer');
        let it = {
            x: 0, y: 0, h: data.height, w: data.width, 
            minW:data.width,
            minH:data.height,
            target:data.target,
            tempId:data.id,
            divId:component_id,//元素渲染id
            appId:data.appId,
            widgetCode:data.widgetCode,
            appWidget:data,
            appPlateItems:data.appPlateItems||[],//应用对应的设置
            content:'<div class="jl_vip_zt_warp '+data.widgetCode+'" data-id="'+component_id+'" data-set="'+JSON.stringify(data.appPlateItems||[]).replace(/\"/g,"'")+'"><i class="jl_vip_zt_del"></i><div class="mask-layer mask-layer-active" data-appId="'+data.appId+'" data-appWidgetId="'+data.id+'" data-set="'+JSON.stringify(data.appPlateItems||[]).replace(/\"/g,"'")+'"></div><div id="'+component_id+'"></div></div>'
          };
        this.addCompontFlush(it);
      }else{
        var is_cu_temp = document.getElementsByClassName('mask-layer-active');
        if(is_cu_temp.length>0){
          var x = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-x');
          var y = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-y');
          var w = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-w');
          var h = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-h');
          var min_w = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-min-w');
          var min_h = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-min-h');
          console.log('这里的最大最小值是否为更换后元素的值',min_w,min_h);
          this.grid.removeWidget(is_cu_temp[0].parentNode.parentNode.parentNode);
          let it = {
            x: x, y: y, h: h, w: w,
            minW:data.width,
            minH:data.height,
            target:data.target,
            tempId:data.id,
            divId:component_id,//元素渲染id
            appId:data.appId,
            appPlateItems:data.appPlateItems||[],//应用对应的设置
            widgetCode:data.widgetCode,
            appWidget:data,
            content:'<div class="jl_vip_zt_warp '+data.widgetCode+'" data-id="'+component_id+'" data-set="'+JSON.stringify(data.appPlateItems||[]).replace(/\"/g,"'")+'"><i class="jl_vip_zt_del"></i><div class="mask-layer mask-layer-active" data-appId="'+data.appId+'" data-appWidgetId="'+data.id+'" data-set="'+JSON.stringify(data.appPlateItems||[]).replace(/\"/g,"'")+'"></div><div id="'+component_id+'"></div></div>'
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
            var el_id = element.parentNode.dataset.id;
            if(el_id!= cu_id){
              element.setAttribute('class','mask-layer');
            }
          }
        }
    },
    //执行添加模板
    addCompontFlush(it){
      this.grid.addWidget(it);
      this.screen_list[this.screen_cu]['sceneApps'].push(it);
      this.loadRes();
    },
    //保存和预览时，提交的数据（预览时，需要把参数重新渲染成需要的参数）post_type区分保存还是预览
    savePostJson(post_type){
      var _this = this;
      this.saveList();
      var list = [];//
      if(this.screen_list.length>0){
        this.screen_list.forEach((item,index)=>{
          var obj = {
            height:item.height,//屏高
            sceneApps:[],//屏内包含的应用模板
            orderIndex:index+1,//当前序号
            id:item.id,//当前序号
            sceneId:item.sceneId,//当前序号
            screenName:item.screenName,//当前序号
            deleteFlag:item.deleteFlag,//当前序号
          };
          if(item.sceneApps && item.sceneApps.length>0){
            item.sceneApps.forEach(it=>{
              obj.sceneApps.push({
                xIndex: it.x, yIndex: it.y, height: it.h, width: it.w, 
                target:(post_type == 'save')?_this.substrPath(it.target):it.target,
                id:it.id,
                tempId:it.tempId,
                sceneId:it.sceneId,//当前序号
                sceneScreenId:it.sceneScreenId,//当前序号
                appWidget:it.appWidget,
                appPlateItems:it.appPlateItems,//应用对应的设置
                appId:it.appId,
                widgetCode:it.widgetCode,
              })
            })
          }
          list.push(obj);
        })
      }
      this.postForm['sceneScreens'] = list;
    },
    //截取路径
    substrPath(val){
      var num = val.lastIndexOf("/");
      return val.substr(val.lastIndexOf("/",num-1),100);
    },
    //保存
    saveClick(){
      var _this = this;
      this.savePostJson('save');
      setTimeout(() => {
        let post_form = JSON.stringify(_this.postForm);
        let post_obj = JSON.parse(post_form);
        if(post_obj.headerTemplate && post_obj.headerTemplate.router)
        post_obj.headerTemplate.router = _this.substrPath(post_obj.headerTemplate.router);
        if(post_obj.footerTemplate && post_obj.footerTemplate.router)
        post_obj.footerTemplate.router = _this.substrPath(post_obj.footerTemplate.router);
        if(post_obj.layoutId == 1 || post_obj.layoutId==3){//通屏
          console.log('删除多余屏幕');
          post_obj.sceneScreens.splice(1,1);
        }
        //表单验证
        console.log(post_obj);
        if(!post_obj.name){
          _this.$message({message: '请设置场景名称',type:'info'});
          return ;
        }
        if(!post_obj.status){
          _this.$message({message: '请选择服务状态',type:'info'});
          return ;
        }
        if(!post_obj.visitorLimitType && post_obj.visitorLimitType==undefined){
          _this.$message({message: '请选择权限控制',type:'info'});
          return ;
        }
        if(this.$route.query.scene){
          _this.http.putJson('scene-add',post_obj).then(res=>{
            _this.$message({message: '修改成功',type:'success'});
            window.history.go(-1);
          }).catch(err=>{
            _this.$message({message: '修改失败',type:'warning'});
          })
        }else{
          _this.http.postJson('scene-add',post_obj).then(res=>{
            _this.$message({message: '添加成功',type:'success'});
            window.history.go(-2);
          }).catch(err=>{
            _this.$message({message: '添加失败',type:'warning'});
          })
        }
      }, 200);
    },
    //预览
    scenePreview(){
      this.savePostJson('preview');
      var id = this.$route.query.scene||'';
      setTimeout(() => {
        window.localStorage.setItem('scenePreview',JSON.stringify(this.postForm));
        var url = '';
        if(id == '26cbabdf-4ae6-4f20-83b6-d42b367ec105'){ //针对重大首页
          url = location.href.split('#')[0]+"#/admin_scenePreviewCqu";
        }else if(id == 'fa08a926-13ee-4b37-aa15-9a0034308c92' || id == '2b2d74db-67fa-443e-aa74-e2bedee9ab09'){//针对图书和期刊频道
          url = location.href.split('#')[0]+"#/admin_scenePreview_tq";
        }else{
          url = location.href.split('#')[0]+"#/admin_scenePreview";//统一预览
        }
        setTimeout(() => {
          window.open(url);
        }, 50);
      }, 100);
    },
    // scenePreview(){
    //   this.savePostJson('preview');
    //   setTimeout(() => {
    //     window.localStorage.setItem('scenePreview',JSON.stringify(this.postForm));
    //     var url = location.href.split('#')[0]+"/#/admin_scenePreview";
    //     setTimeout(() => {
    //       window.open(url);
    //     }, 20);
    //   }, 100);
    // },
    //设置场景名字
    setName(val){
      this.postForm.name = val||'';
    },
    //顶部选择的数据
    topCheck(val){
      this.postForm.status = val.status||'';
      this.postForm.sceneUsers = val.user_type||[];
      this.postForm.visitorLimitType = val.visitor_type;
    },
    //保存模板设置参数（条数，栏目，排序规则等）
    saveTempSet(val){
      this.apps_set_list[val.divId] = val.list||[];
    },
    //设置主题颜色
    setTheme(val){
      this.postForm.themeColor=val;
    },
    //选择布局
    layoutClick(val){
      this.postForm.layoutId = val.value;
    },
    //选择模板-左边
    templateClick(val){
      console.log(val);
      if(val.isadd){
        this.postForm.template=val.list||{};
        this.postForm.templateId=val.list.id||'';
        this.postForm.headerTemplate = val.list.defaultHeaderTemplate||{};
        this.postForm.footerTemplate = val.list.defaultFooterTemplate||{};
      }else{
        this.$confirm('此操作将清空现有布局, 是否继续?', '提示', {
          confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'
        }).then(() => {
          this.postForm.template=val.list||{};
          this.postForm.headerTemplate = val.list.defaultHeaderTemplate||{};
          this.postForm.footerTemplate = val.list.defaultFooterTemplate||{};
          if(this.grid){
            this.grid.removeAll();
          }
          //这个地方要处理一下。主要是分屏数量的处理
          // if(val.value == '1' || val.value == '3'){//通屏
          //   this.screen_cu = 0;
          //   this.screen_list = [{sceneApps:[]}];
          // }else{//分屏
          //   this.screen_cu = 0;
          //   this.screen_list = [{sceneApps:[]},{sceneApps:[]}];
          // }
          this.screen_list.forEach(item=>{
            item['sceneApps'] = [];
          })
        })
      }
      
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
      admin_vue.$refs.rightCheck_ref.appDetails({'id':val.id,'temp_id':val.temp_id,'is_add':val.is_add,'set_list':val.set_list});
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
    //缩放比例
    getRatio(val){
      // console.log('父级获取到的比例为：'+val);
      this.ratio_num = val;
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
      return cls;
    },
    //加载资源文件
    loadRes(){
      if(this.screen_list[this.screen_cu]['sceneApps']){
        this.screen_list[this.screen_cu]['sceneApps'].forEach(item=>{
          var is_yes = false;
          this.resource_file_list.forEach((it,i)=>{
            if(it.url == item.target){
              is_yes = true;
              return;
            }
          })
          if(!is_yes){
            this.resource_file_list.push({url:item.target,widgetCode:item.widgetCode});
            setTimeout(()=>{
              this.addStyle(item.target+'/component.css');
              this.addScript(item.target+'/component.js');
            },200)
          }else{
            window[item.widgetCode]();
          }
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "./scene_set.less";
@import "../../../assets/web/css/color.less";/**通用文件 */
</style>

