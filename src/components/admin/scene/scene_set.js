var admin_vue = null;
import Sortable from "sortablejs";//拖拽更换屏顺序插件
import serviceLMenu from "@/components/admin/common/serviceLMenu";//菜单

import topSelect from "./model/top_select";//顶部
import leftCheck from "./model/left_check";//左侧
import rightCheck from "./model/right_check";//右侧

import scalingPage from "@/components/admin/common/scaling";//缩放

export default {
  name: 'index',
  components:{serviceLMenu,scalingPage,topSelect,leftCheck,rightCheck},
  beforeDestroy() {
    document.removeEventListener('click',this.documentFun)
  },
  created(){
    this.$root.collapse = true;//默认不展开左侧导航栏目菜单

    admin_vue = this;
    document.addEventListener("click",this.documentFun);
  },
  mounted(){
    if(this.id){
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
  },
  destroyed(){
    window.removeEventListener('resize', () => {},false);
  },
  data () {
    return {
      id:this.$route.query.id,//场景id
      advanced:true,//高级设置
      footerSet:false,//底部设置
      drag_width:1200,//用于-计算缩放的宽度，不得小于1200，这里取的模板宽度
      drag_height:500,//最低高度
      ratio_num:1,//缩放比例
      appsList:[],//应用列表
      left_fold:false,//左侧菜单展开与否
      right_fold:false,//右侧菜单展开与否
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
        terminalInstanceId:this.$route.query.tid,//终端id
        themeColor:'template1',//颜色参数
        layoutId:1,//布局  1通屏；2分屏；3通屏定宽；4分屏定宽
        headerTemplate:{},//头部模板
        footerTemplate:{},//底部模板
        sceneScreens:[//屏幕数量
          {
            sceneApps:[],//模板数量
          }
        ],//分屏
      },
      opts: {//元素初始化高度
        resizable: {
          handles: 'e,se,s,sw,w'
        },
        cellHeight: 10, 
        // column:100,
        // cellWidth:120,
        cellHeightThrottle:100,
      },
      //////////////////////新参数////////////////////////////////////////////////////////////////
      handles:{
        hf_option:null,//参数：header-头部，foot-底部
      },//操作参数，如点击头部底部等，触发子页面值
    }
  },
  methods:{
    documentFun(e){
      if(e.target.className == 'jl_vip_zt_del'){//删除按钮
        if(e.target.parentNode.parentNode.parentNode){
          admin_vue.grid.removeWidget(e.target.parentNode.parentNode.parentNode);
        }
      }
      if(e.target.className.indexOf('mask-layer')>-1){//单击场景中的模板
        if(e.target.className.indexOf('head')>-1){
          console.log('选择的头部');
          admin_vue.$refs.rightCheck_ref.getHFlist('header');
          admin_vue.removeActiveClass('head');
        }else if(e.target.className.indexOf('foot')>-1){
          console.log('选择的底部');
          admin_vue.$refs.rightCheck_ref.getHFlist('foot');
          admin_vue.removeActiveClass('foot');
        }else{
          console.log('选择的组件');
          e.target.setAttribute('class','mask-layer mask-layer-active');//设置选中样式
          var cu_id = e.target.parentNode.dataset.id;//当前元素的id
          admin_vue.removeActiveClass(cu_id);//移出不属于点击区域的选中元素
          var appid = e.target.dataset.appid;//应用id
          var appwidgetid = e.target.dataset.appwidgetid;//模板id
          var set_list = e.target.dataset.set;//设置的配置参数
          admin_vue.getAppDetails({'id':appid,'temp_id':appwidgetid,'is_add':false,'set_list':set_list});
        }
      }
    },
    //获取应用列表
    setAppsList(list){
      this.appsList = list;
    },
    //通过应用id-在已存在的应用列表中-查询应用基础信息
    selectApps(id){
      let val = null;
      this.appsList.forEach((item,index)=>{
        if(item.appId == id){
          val = item;
          return;
        }
      })
      return val;
    },
    //获取详情
    getDetails(){
      this.http.getPlain_url('scene-detail','/'+this.id).then(res=>{
        if(res.data){
            this.detailsRender(res.data);
            this.loadHeadFoot();
        }
      }).catch(err=>{})
    },
    //详情渲染
    detailsRender(data){
      var _this = this;
      if(data.template && data.template.width && data.template.width>1200){
            _this.drag_width = data.template.width;
            setTimeout(() => {
              var c_height = document.body.clientHeight-104;
              _this.setHeight(c_height);
            }, 30);
          }
          _this.$refs.topselect_ref.setDatils(data);
          _this.$refs.leftcheck_ref.setDatils(data);
          _this.postForm = data||{};
          if(_this.postForm.sceneScreens && _this.postForm.sceneScreens.length>0){
            _this.postForm.sceneScreens.forEach((item,index)=>{
                let result = item.sceneApps.map((it,index) => ({
                  id:it.id,
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
            _this.initScree();
          }else{
            _this.screen_list = [{sceneApps:[]}];
            _this.initScree();
          }
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
      if(this.screen_list.length==10){
        this.$message({message: '最多只能添加10屏',type:'info'});
        return false;
      }
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
          var item_list = {
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
          }
          if(item.id){
            item_list['id'] = item.id;
          }
          list.push(item_list)
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
            x: 0, y: 100000, h: data.height, w: data.width, 
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
          // var min_w = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-min-w');
          // var min_h = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-min-h');
          // console.log('这里的最大最小值是否为更换后元素的值',min_w,min_h);
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
              if(element.className.indexOf('head')>-1){
                element.setAttribute('class','mask-layer head');
              }else if(element.className.indexOf('foot')>-1){
                element.setAttribute('class','mask-layer foot');
              }else{
                element.setAttribute('class','mask-layer');
              }
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
            id:item.id,
            sceneId:item.sceneId,
            screenName:item.screenName,
            deleteFlag:item.deleteFlag,
          };
          if(item.sceneApps && item.sceneApps.length>0){
            item.sceneApps.forEach(it=>{
              var it_list = {
                xIndex: it.x, yIndex: it.y, height: it.h, width: it.w, 
                target:(post_type == 'save')?_this.substrPath(it.target):it.target,
                id:it.id,
                tempId:it.tempId,
                sceneId:it.sceneId,
                sceneScreenId:it.sceneScreenId,
                appWidget:it.appWidget,
                appPlateItems:it.appPlateItems,
                appId:it.appId,
                widgetCode:it.widgetCode,
              };
              if(it.id){
                it_list['id']=it.id;
              }
              obj.sceneApps.push(it_list)
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
          // console.log('删除多余屏幕');
          post_obj.sceneScreens.splice(1,1);
        }
        //表单验证
        if(!post_obj.name){
          _this.$message({message: '请设置场景名称',type:'info'});
          return ;
        }
        if(post_obj.name.length>100){
          _this.$message({message: '场景名称不得大于100',type:'info'});
          return;
        }
        if(!post_obj.visitorLimitType && post_obj.visitorLimitType==undefined){
          _this.$message({message: '请选择权限控制',type:'info'});
          return ;
        }
        if(_this.id){
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
      }, 100);
    },
    //预览
    scenePreview(){
      this.savePostJson('preview');
      setTimeout(() => {
        window.localStorage.setItem('scenePreview',JSON.stringify(this.postForm));
        var url = '';
        if(this.id == '17ba1766-683e-4f18-a340-91ab2ee846c2'){ //针对重大首页
          url = location.href.split('#')[0]+"#/admin_scenePreviewCqu";
        }else if(this.id == 'c67f511b-1a3a-4607-8d3e-7adee2a2359d' || this.id == 'bd920f5c-f7bd-4051-9874-b1d251b04464'){//针对图书和期刊频道
          url = location.href.split('#')[0]+"#/admin_scenePreview_tq";
        }else{
          url = location.href.split('#')[0]+"#/admin_scenePreview";//统一预览
        }
        window.open(url);
      }, 100);
    },
    //保存模板设置参数（条数，栏目，排序规则等）
    saveTempSet(val){
      this.apps_set_list[val.divId] = val.list||[];
    },
    //选择模板-左边
    templateClick(val){
      this.postForm.template=val.list||{};
      this.postForm.headerTemplate = val.list.defaultHeaderTemplate||{};
      this.postForm.footerTemplate = val.list.defaultFooterTemplate||{};
      if(this.grid){
        this.grid.removeAll();
      }
      this.screen_list.forEach(item=>{
        item['sceneApps'] = [];
      })
    },
    //设置头部底部
    setHFooter(val){
      this.postForm['headerTemplate'] = val.headerTemplate;
      this.postForm['footerTemplate'] = val.footerTemplate;
    },
    //初始化页面数据 - 获取本页下拉框参数
    initData(){
      this.http.getPlain('dictionary','').then(res=>{
        this.top_list.sceneStatus = res.data.sceneStatus||[];
        this.top_list.visitorLimitType = res.data.visitorLimitType||[];
        this.left_list.sceneLayout = res.data.sceneLayout||[];
        this.left_list.sceneTemplate = res.data.sceneTemplate||[];
        this.left_list.sceneThemeColor = res.data.sceneThemeColor||[];
        this.left_list.appServiceType = res.data.appServiceType||[];
      })
    },
    //点击应用，获取应用的组件及相应信息id:应用id；temp_id:模板id；is_add:是新增还是选择了场景中已存在的true为新增。
    getAppDetails(val){
      admin_vue.$refs.leftcheck_ref.setAppid(val.id);
      var apps_cu = this.selectApps(val.id)||{};
      admin_vue.$refs.rightCheck_ref.setAppsName(apps_cu.name);
      admin_vue.$refs.rightCheck_ref.appDetails({'id':val.id,'temp_id':val.temp_id,'is_add':val.is_add,'set_list':val.set_list});
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
        },
        onEnd: e => {
          const targetRow = this.screen_list.splice(e.oldIndex, 1)[0];//oldIndex原位置
          this.screen_list.splice(e.newIndex, 0, targetRow);//newIndex新位置
          console.log(this.screen_list,'排序后的数据')
        }
      });
    },
    //高度动态设置
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
    //两边折叠-重新设置中间区域
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
          let is_list = this.resource_file_list.filter(x=>x.url == item.target);
          if(is_list.length==0){
            this.resource_file_list.push({url:item.target,widgetCode:item.widgetCode});
            this.addStyle(item.target+'/component.css');
            this.addScript(item.target+'/component.js');
          }else{
            if(window[item.widgetCode]){
              window[item.widgetCode]();
            }
          }
        })
      }
    },
    //获取分组详情
    getDetailsGroup(data){
      var pas = '/'+this.postForm.sceneGroupId;
      if(data.visitorLimitType){
        pas = pas+'/'+data.visitorLimitType;
      }
      if(data.userS){
        pas = pas+'/'+data.userS;
      }
      this.http.getPlain_url(data.postUrl,pas).then(res=>{
        if(res.data){
          var form = res.data;
          form.name = this.postForm.name;
          form.status = this.postForm.status;
          form.sceneUsers = this.postForm.sceneUsers;
          form.visitorLimitType = this.postForm.visitorLimitType;
          this.detailsRender(form);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    //刷新页面
    refreshPage(){
      this.$forceUpdate();
    },
    //加载头部底部
    loadHeadFoot(){
        // console.log(this.postForm.footerTemplate,this.postForm.footerTemplate);
        this.addStyle(this.postForm.footerTemplate.router+'/component.css');
        this.addScript(this.postForm.footerTemplate.router+'/component.js');
        this.addStyle(this.postForm.headerTemplate.router+'/component.css');
        this.addScript(this.postForm.headerTemplate.router+'/component.js');
    },
    sub(){
      console.log(this.postForm)
    },
  },
}