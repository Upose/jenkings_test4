var admin_vue = null;
import Sortable from "sortablejs";//拖拽更换屏顺序插件
import serviceLMenu from "@/views/admin/common/serviceLMenu";//菜单

import topSelect from "./model/top_select";//顶部
import leftCheck from "./model/left_check";//左侧
import rightCheck from "./model/right_check";//右侧

import scalingPage from "@/views/admin/common/scaling";//缩放

export default {
  name: 'index',
  components: { serviceLMenu, scalingPage, topSelect, leftCheck, rightCheck },
  beforeDestroy() {
    this.grid.destroy();
    document.removeEventListener('click', this.documentFun);
    window.removeEventListener('resize', () => { }, false);
  },
  created() {
    this.$root.collapse = true;//默认不展开左侧导航栏目菜单
    admin_vue = this;
    document.addEventListener("click", this.documentFun);
  },
  mounted() {
    if (this.id) {
      this.getDetails();
    }
    this.initGrid();
    this.initData();
    this.setHeight(document.body.clientHeight - 40);
    this.$nextTick(() => {
      window.addEventListener('resize', () => { //监听浏览器窗口大小改变
        var c_height = document.body.clientHeight - 40;
        this.setHeight(c_height);
      });
    })
    this.dragSort();
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      id: this.$route.query.id,//场景id
      is_HF: '',//是否选择头部底部
      drag_width: 1200,//用于-计算缩放的宽度，不得小于1200，这里取的模板宽度
      drag_height: 500,//最低高度
      ratio_num: 1,//缩放比例
      appsList: [],//应用列表
      left_fold: false,//左侧菜单展开与否 true：关闭 false：开启
      right_fold: false,//右侧菜单展开与否
      screen_cu: 0,//当前是第几屏
      screen_list: [{ screenName: '首', bgImg: '',customParameter:'', sceneApps: [] }, { screenName: '尾', bgImg: '',customParameter:'', sceneApps: [] }],//屏数量
      //顶部 步骤1
      top_list: {
        sceneStatus: [],//服务状态
        visitorLimitType: [],//权限控制
      },
      //左边 步骤2,3
      appServiceType: [],//应用类型
      //以下是拖拽参数 jl_vip_zt_warp为固定class参数，为了渲染内部的删除标签等
      resource_file_list: [],//资源文件列表（需去重且需重写刷新）初始化的时候需要将数据中涉及到的js放入到里面，包括新增的时候，都需要将js重新加到这里面

      apps_set_list: {},//场景内所有的应用模板设置参数-栏目列表。
      apps_set_obj: {},//场景内所有的应用模板设置参数-背景图片和是否全屏。
      apps_set_common: {},//场景内所有的通用组件参数存储
      grid: null,//拖拽渲染
      postForm: {
        name: '',//场景名称
        templateId: '',//选择模板-左边 风格
        terminalInstanceId: this.$route.query.tid,//终端id
        themeColor: 'template1',//颜色参数
        layoutId: 1,//布局  1通屏；2分屏；3通屏定宽；4分屏定宽
        headerTemplate: {},//头部模板
        footerTemplate: {},//底部模板
        sceneScreens: [//屏幕数量
          {
            sceneApps: [],//模板数量
          }
        ],//分屏
      },
      gridOpts: {//初始化配置
        float: true,
        // minRow:108,//这个为固定拖拽区域高度的参数
        // maxRow:108,//这个为固定拖拽区域高度的参数
        column: 120,//120/144
        cellHeight: 10,
        marginUnit: 1,
        marginTop: 1,
        marginBottom: 1,
        marginRight: 1,
        marginLeft: 1,
        cellHeightThrottle: 10,
        resizable: {
          handles: 'se,sw,nw,n,e,s,w'
        },
      },
    }
  },
  methods: {
    //点击事件-组件操作
    documentFun(e) {
      if (e.target.className == 'jl_vip_zt_del') {//删除按钮
        if (e.target.parentNode.parentNode.parentNode) {
          admin_vue.grid.removeWidget(e.target.parentNode.parentNode.parentNode);
          admin_vue.saveList();
        }
      }
      if (e.target.className.indexOf('mask-layer') > -1) {//单击场景中的模板
        if (e.target.className.indexOf('head') > -1) {//选择的头部
          admin_vue.is_HF = 'header';
          admin_vue.rightMenu('header');
          admin_vue.removeActiveClass('head');
        } else if (e.target.className.indexOf('foot') > -1) {//选择的底部
          admin_vue.is_HF = 'foot';
          admin_vue.rightMenu('foot');
          admin_vue.removeActiveClass('foot');
        } else {//选择的组件
          admin_vue.is_HF = '';
          e.target.setAttribute('class', 'mask-layer mask-layer-active');//设置选中样式
          var cu_id = e.target.parentNode.dataset.id;//当前元素的id
          admin_vue.removeActiveClass(cu_id);//移出不属于点击区域的选中元素
          var appid = e.target.dataset.appid;//应用id
          var appwidgetid = e.target.dataset.appwidgetid;//模板id
          var set_list = e.target.dataset.set;//设置的配置参数
          var configParameter = e.target.dataset.obj;//设置的配置参数
          var commonWidgetSet = e.target.dataset.common;//设置的配置参数
          admin_vue.getAppDetails({ 'id': appid, 'temp_id': appwidgetid, 'is_add': false, 'set_list': set_list, 'configParameter': configParameter, 'commonWidgetSet': commonWidgetSet });
        }
      }
    },
    //右侧点击事件-头部，底部(还有公共组件)
    rightMenu(val) {
      admin_vue.$refs.rightCheck_ref.getHFlist(val);
    },
    //获取应用列表
    setAppsList(list) {
      this.appsList = list;
    },
    //通过应用id-在已存在的应用列表中-查询应用基础信息
    selectApps(id) {
      let val = null;
      this.appsList.forEach((item, index) => {
        if (item.appId == id) {
          val = item;
          return;
        }
      })
      return val;
    },
    //获取详情
    getDetails() {
      this.http.getPlain_url('scene-detail', '/' + this.id).then(res => {
        if (res.data) {
          this.detailsRender(res.data);
          //这里要加载模板css文件
          this.templateCssLoad(res.data.template.cssPath);
        }
      }).catch(err => { })
    },
    //详情渲染
    detailsRender(data) {
      // console.log('详情渲染',data);
      var _this = this;
      if (data.template && data.template.width && data.template.width != 100) {
        _this.$addStyleLocal('./static/js/gridstack/gridstack_extra_'+data.template.width+'.css');
        _this.grid.column(data.template.width / 10, 'moveScale');
        _this.drag_width = data.template.width == 100 ? 1200 : data.template.width;
        setTimeout(() => {
          var c_height = document.body.clientHeight - 40;
          _this.setHeight(c_height);
        }, 30);
      } else {
        _this.$addStyleLocal('./static/js/gridstack/gridstack_extra_1200.css');
        _this.grid.column(120, 'moveScale');
        _this.drag_width = 1200;
      }
      _this.$refs.topselect_ref.setDatils(data);
      _this.$refs.leftcheck_ref.setDatils(data);
      _this.postForm = data || {};
      setTimeout(() => {
        _this.loadHeadFoot();
      }, 500)
      if (_this.postForm.sceneScreens && _this.postForm.sceneScreens.length > 0) {
        _this.postForm.sceneScreens.forEach((item, index) => {
          // console.log(item.sceneApps)
          let result = item.sceneApps.map((it, index) => ({
            id: it.id,
            w: it.width,
            h: it.height,
            x: it.xIndex,
            y: it.yIndex,
            minW: it.appWidget ? it.appWidget.minWidth : it.minWidth,
            minH: it.appWidget ? it.appWidget.minHeight : it.minHeight,
            appId: it.appId,
            configParameter: it.configParameter,
            commonWidgetSet: it.commonWidgetSet,
            appPlateItems: it.appPlateItems,
            appWidget: it.appWidget,
            divId: 'jl_vip_zt_' + index,
            target: it.appWidget?it.appWidget.target:'',
            sceneId: it.sceneId,
            sceneScreenId: it.sceneScreenId,
            widgetCode: it.appWidget?it.appWidget.widgetCode:'',
            content: admin_vue.gridContent(it, 'a'),
          }));
          _this.postForm.sceneScreens[index].sceneApps = result;
        })
        _this.screen_list = _this.postForm.sceneScreens;
        _this.initScree();
      } else {
        _this.screen_list = [{ sceneApps: [] }];
        _this.initScree();
      }
    },
    //初始化模板，需要将当前模板的数据渲染到模板上，且在切换模板的时候，要重新save保存一下当前模板的数据到当前屏。
    initGrid() {
      this.grid = GridStack.init(this.gridOpts);
      this.initScree();
    },
    //初始化拖拽
    initScree() {
      if (this.grid) {
        this.grid.removeAll();
      }
      this.grid.load(this.screen_list[this.screen_cu]['sceneApps'] || []);//这里是取的第一屏
      this.loadRes();
    },
    //新增一屏
    addScreen() {
      if (this.screen_list.length == 10) {
        this.$message({ message: '最多只能添加10屏', type: 'info' });
        return false;
      }
      //如果选中的是尾屏，将当前选中值重新设置
      if (this.screen_cu == (this.screen_list.length - 1)) {
        this.screen_cu = this.screen_cu + 1;
      }
      //添加屏时，始终将尾屏放到最后
      var last_sceen = this.screen_list[this.screen_list.length - 1];
      var sceen_name = '第' + (this.screen_list.length) + (this.postForm.layoutId == 2 ? '段' : '屏');
      this.screen_list[this.screen_list.length - 1] = { icon: '', bgImg: '', sceneApps: [], screenName: sceen_name };
      this.screen_list.push(last_sceen);
    },
    //删除一屏
    removScreen(index) {
      this.screen_list.splice(index, 1);
      if (this.grid) {
        this.grid.removeAll();
      }
      this.screen_cu = index - 1;
      this.screenClick(this.screen_cu);
    },
    //编辑当前屏菜单名称
    editScreen(index) {
      this.screen_list[index].isedit = !this.screen_list[index].isedit;
      this.$forceUpdate();
    },
    //点击第几屏
    screenClick(val) {
      this.saveList();
      this.screen_list.forEach(item => {
        item.isedit = false;
      })
      setTimeout(() => {
        admin_vue.screen_cu = val;
        admin_vue.initScree();
      }, 100);
    },
    //保存当前屏幕的列表 -- 切换屏幕的时候需要将当前屏幕的参数获取然后放入到数组中。
    saveList() {
      var _this = this;
      var list = [];
      if (this.grid.save() && this.grid.save().length) {
        this.grid.save().forEach(item => {
          var item_list = {
            x: item.x, y: item.y, 
            h: item.h, 
            w: item.w,
            minW: item.appWidget ? item.appWidget.minWidth : item.minWidth,
            minH: item.appWidget ? item.appWidget.minHeight : item.minHeight,
            target: item.target,
            tempId: item.tempId,
            divId: item.divId,//元素渲染id
            appId: item.appId,
            sceneId: item.sceneId,
            sceneScreenId: item.sceneScreenId,
            widgetCode: item.widgetCode,
            appWidget: item.appWidget,
            configParameter: _this.apps_set_obj[item.divId] || item.configParameter,//应用对应的设置
            commonWidgetSet: _this.apps_set_common[item.divId] || item.commonWidgetSet,//应用对应的设置
            appPlateItems: _this.apps_set_list[item.divId] || item.appPlateItems,//应用对应的设置
            content: admin_vue.gridContent(item, 'b'),
          }
          if (item.id) {
            item_list['id'] = item.id;
          }
          list.push(item_list)
        })
      }
      if (this.screen_list.length == 1) {
        this.screen_list[this.screen_cu]['height'] = this.$refs.grid_stack.clientHeight;
        this.screen_list[this.screen_cu]['sceneApps'] = list;
      } else {
        if (list.length > 0) {
          this.screen_list[this.screen_cu]['height'] = this.$refs.grid_stack.clientHeight;
          this.screen_list[this.screen_cu]['sceneApps'] = list;
        }
      }
    },
    //添加组件
    addCompont(val) {
      // console.log(val, 'addCompont');
      var data = val.list;//模板参数
      var is_add = val.is_add_compont;//添加模板还是修改模板 true添加模板
      var component_id = 'jl_vip_zt_' + new Date().getTime();//这里的id要动态
      if (is_add) {
        //添加时，要将已存在的选中状态的元素移出选中状态；
        this.removeActiveClass('mask-layer');
        /****赛选y值最大的，然后y+h就是新元素添加的值 */
        var y_index = 0;
        if (this.screen_list[this.screen_cu].sceneApps) {
          var max = Math.max.apply(Math, this.screen_list[this.screen_cu].sceneApps.map(function (o) {
            return o.y;
          }))
          var max_y = this.screen_list[this.screen_cu].sceneApps.filter(item => item.y == max);
          if (max_y && max_y.length > 0) {
            y_index = max_y[0].y + max_y[0].h;
          }
        }
        // console.log(data);
        let it = {
          x: 0,
          y: y_index,
          h: data.height,
          w: data.width,
          // noMove: true,//静止拖动位置
          // noResize: true,//禁止改变大小
          minW: data.minWidth,
          minH: data.minHeight,
          target: data.target,
          tempId: data.id,
          divId: component_id,//元素渲染id
          appId: data.appId,
          widgetCode: data.widgetCode,
          appWidget: data,
          configParameter: data.configParameter || {},//应用对应的设置
          commonWidgetSet: data.commonWidgetSet || '{}',//应用对应的设置
          appPlateItems: data.appPlateItems || [],//应用对应的设置
          content: admin_vue.gridContent(data, 'c'),
        };
        this.addCompontFlush(it);
      } else {
        var is_cu_temp = document.getElementsByClassName('mask-layer-active');
        if (is_cu_temp.length > 0) {
          var x = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-x');
          var y = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-y');
          var w = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-w');
          var h = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-h');
          // var min_w = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-min-w');
          // var min_h = is_cu_temp[0].parentNode.parentNode.parentNode.getAttribute('gs-min-h');
          // console.log('这里的最大最小值是否为更换后元素的值',min_w,min_h);
          console.log(data);
          this.grid.removeWidget(is_cu_temp[0].parentNode.parentNode.parentNode);
          let it = {
            x: x, y: y, 
            h: h, 
            w: w,
            minW: data.minWidth,
            minH: data.minHeight,
            target: data.target,
            tempId: data.id,
            divId: component_id,//元素渲染id
            appId: data.appId,
            configParameter: data.configParameter || {},
            commonWidgetSet: data.commonWidgetSet || '{}',
            appPlateItems: data.appPlateItems || [],//应用对应的设置
            widgetCode: data.widgetCode,
            appWidget: data,
            content: admin_vue.gridContent(data, 'd'),
          };
          this.removeActiveClass('mask-layer');
          this.addCompontFlush(it);
        }
      }
    },
    //移出class,有值表示当前为选中，无值表示当前为添加一个新元素时，需默认选中添加的元素
    removeActiveClass(cu_id) {
      var class_list = document.getElementsByClassName('mask-layer');//获取所有兄弟元素
      if (class_list) {//这段代码表示只允许选中一个可修改元素
        for (let index = 0; index < class_list.length; index++) {
          var element = class_list[index];
          var el_id = element.parentNode.dataset.id;
          if (el_id != cu_id) {
            if (element.className.indexOf('head') > -1) {
              element.setAttribute('class', 'mask-layer head');
            } else if (element.className.indexOf('foot') > -1) {
              element.setAttribute('class', 'mask-layer foot');
            } else {
              element.setAttribute('class', 'mask-layer');
            }
          }
        }
      }
    },
    //执行添加模板
    addCompontFlush(it) {
      this.grid.addWidget(it);
      this.screen_list[this.screen_cu]['sceneApps'].push(it);
      this.loadRes();
    },
    //保存和预览时，提交的数据（预览时，需要把参数重新渲染成需要的参数）post_type区分保存还是预览
    savePostJson(post_type) {
      var _this = this;
      this.saveList();
      var list = [];//
      if (this.screen_list.length > 0) {
        this.screen_list.forEach((item, index) => {
          var obj = {
            height: item.height,//屏高
            bgImg: item.bgImg || '',
            icon: item.icon || '',
            sceneApps: [],//屏内包含的应用模板
            orderIndex: index + 1,//当前序号
            id: item.id,
            customParameter: item.customParameter,
            sceneId: item.sceneId,
            screenName: item.screenName,
            deleteFlag: item.deleteFlag,
          };
          if (item.sceneApps && item.sceneApps.length > 0) {
            item.sceneApps.forEach(it => {
              var it_list = {
                xIndex: it.x, yIndex: it.y, height: it.h, width: it.w,
                target: (post_type == 'save') ? _this.substrPath(it.target) : it.target,
                id: it.id,
                tempId: it.tempId,
                sceneId: it.sceneId,
                sceneScreenId: it.sceneScreenId,
                appWidget: it.appWidget,
                configParameter: it.configParameter || {},
                commonWidgetSet: it.commonWidgetSet || '{}',
                appPlateItems: it.appPlateItems,
                appId: it.appId,
                widgetCode: it.widgetCode,
              };
              if (it.id) {
                it_list['id'] = it.id;
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
    substrPath(val) {
      var num = val.lastIndexOf("/");
      return val.substr(val.lastIndexOf("/", num - 1), 100);
    },
    //保存
    saveClick() {
      var _this = this;
      this.savePostJson('save');
      setTimeout(() => {
        let post_form = JSON.stringify(_this.postForm);
        let post_obj = JSON.parse(post_form);
        if (post_obj.headerTemplate && post_obj.headerTemplate.router)
          post_obj.headerTemplate.router = _this.substrPath(post_obj.headerTemplate.router);
        if (post_obj.footerTemplate && post_obj.footerTemplate.router)
          post_obj.footerTemplate.router = _this.substrPath(post_obj.footerTemplate.router);
        if (post_obj.layoutId == 1) {//通屏
          post_obj.sceneScreens.splice(1, 1);
        }
        // post_obj.sceneScreens[0].customParameter='A';
        // post_obj.sceneScreens[1].customParameter='B';
        // post_obj.sceneScreens[2].customParameter='C';
        // post_obj.sceneScreens[3].customParameter='D';
        // post_obj.sceneScreens[4].customParameter='E';
        // post_obj.sceneScreens[5].customParameter='F';
        // post_obj.sceneScreens[6].customParameter='G';
        // post_obj.sceneScreens[7].customParameter='H';
        // post_obj.sceneScreens[8].customParameter='I';
        // post_obj.sceneScreens[9].customParameter='J';
        //表单验证
        if (!post_obj.name) {
          _this.$message({ message: '请设置场景名称', type: 'info' });
          return;
        }
        if (post_obj.name.length > 100) {
          _this.$message({ message: '场景名称不得大于100', type: 'info' });
          return;
        }
        if (!post_obj.visitorLimitType && post_obj.visitorLimitType == undefined) {
          _this.$message({ message: '请选择权限控制', type: 'info' });
          return;
        }
        if (_this.id) {
          _this.http.putJson('scene-add', post_obj).then(res => {
            _this.$message({ message: '修改成功', type: 'success' });
            this.$router.replace('/admin_caseShow');
          }).catch(err => {
            _this.$message({ message: '修改失败', type: 'warning' });
          })
        } else {
          _this.http.postJson('scene-add', post_obj).then(res => {
            _this.$message({ message: '添加成功', type: 'success' });
            this.$router.replace('/admin_caseShow');
          }).catch(err => {
            _this.$message({ message: '添加失败', type: 'warning' });
          })
        }
      }, 100);
    },
    //预览
    scenePreview() {
      this.savePostJson('preview');
      setTimeout(() => {
        window.localStorage.setItem('scenePreview', JSON.stringify(this.postForm));
        var url = location.href.split('#')[0] + "#/admin_preview";
        window.open(url);
      }, 100);
    },
    //保存模板设置参数（条数，栏目，排序规则等）
    saveTempSet(val) {
      this.apps_set_list[val.divId] = val.list || [];
      this.apps_set_obj[val.divId] = val.configParameter || {};
      this.apps_set_common[val.divId] = val.commonWidgetSet || '{}';
    },
    //选择模板-左边
    templateClick(val) {
      var _this = this;
      if (val.list && val.list.id) {
        this.http.getPlain_url('template-default-data-by-id', '/' + val.list.id).then(res => {
          if (res.data && res.data.sceneScreens) {
            this.postForm['footerTemplate'] = res.data.footerTemplate || {};
            this.postForm['headerTemplate'] = res.data.headerTemplate || {};
            this.postForm['sceneScreens'] = res.data.sceneScreens || [];
            this.postForm['template'] = res.data.template || {};
            this.postForm['themeColor'] = res.data.themeColor || 'template1';
            //这里要清空头底模板
            document.getElementById('jl_vip_zt_footer_warp').innerHTML = '<div id="' + ('jl_vip_zt_' + new Date().getTime()) + '"></div>';
            document.getElementById('jl_vip_zt_header_warp').innerHTML = '<div id="' + ('jl_vip_zt_' + new Date().getTime()) + '"></div>';
            this.grid.removeAll();//清除元素
            //这里还要做头部底部的更新
            this.detailsRender(this.postForm);
          } else {//这里表示空模板
            this.postForm['footerTemplate'] = {};
            this.postForm['headerTemplate'] = {};
            this.postForm['sceneScreens'] = [];
            this.postForm['template'] = val.list || {};
            this.postForm['themeColor'] = 'template1';
            if (this.grid) {
              this.grid.removeAll();
              if(val.list.layoutId == 4){//这里针对大屏
                _this.grid.column(val.list.width/10, 'moveScale');
                // _this.grid.opts.row = val.list.height/10;
                _this.drag_width = val.list.width;
                setTimeout(() => {
                  var c_height = document.body.clientHeight - 40;
                  _this.setHeight(c_height);
                }, 30);
              }
            }
            this.screen_list.forEach(item => {
              item['sceneApps'] = [];
            })
            this.$addStyleLocal('./static/js/gridstack/gridstack_extra_1200.css');
          }
          //这里要加载模板才css文件
          this.templateCssLoad(this.postForm.template.cssPath);
          
        }).catch(err => {
          this.$message({ message: '模板信息获取失败', type: 'error' });
        })
      }
    },
    //初始化页面数据 - 获取本页下拉框参数
    initData() {
      var _this = this;
      this.http.getPlain('dictionary', '').then(res => {
        _this.top_list.sceneStatus = res.data.sceneStatus || [];
        _this.top_list.visitorLimitType = res.data.visitorLimitType || [];
        _this.appServiceType = res.data.appServiceType || [];
        this.$store.commit('dictionary',res.data);
      })
    },
    //点击应用，获取应用的组件及相应信息id:应用id；temp_id:模板id；is_add:是新增还是选择了场景中已存在的true为新增。
    getAppDetails(val) {
      admin_vue.$refs.leftcheck_ref.setAppid(val.id);
      var apps_cu = this.selectApps(val.id) || {};
      admin_vue.$refs.rightCheck_ref.setAppsName(apps_cu.name);
      admin_vue.$refs.rightCheck_ref.appDetails({ 'id': val.id, 'temp_id': val.temp_id, 'is_add': val.is_add, 'set_list': val.set_list, 'configParameter': val.configParameter, 'commonWidgetSet': val.commonWidgetSet });
    },
    /***拖拽更换屏顺序**/
    dragSort() {
      const el = this.$refs.dragBox;
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        onEnd: e => {
          // const targetRow = this.screen_list.splice(e.oldIndex, 1)[0];//oldIndex原位置
          // console.log(e.newIndex , e.oldIndex);
          // this.screen_list.splice(e.newIndex, 0, targetRow);//newIndex新位置
          // console.log(e.oldIndex, this.screen_list, '排序后的数据')
          // if (e.newIndex == e.oldIndex) { return; }
          // var list = this.screen_list;
          // const targetRow = list.splice(e.oldIndex+1, 1)[0];
          // list.splice(e.newIndex+1, 0, targetRow);
          // this.screen_list = [];
          // console.log(e.newIndex+1 , e.oldIndex+1,list);
          // setTimeout(() => {
          //   this.screen_list = list;
          // }, 10);
        }
      });
    },
    //高度动态设置
    setHeight(val) {
      if (this.$refs.dragContainer) {
        var c_width = this.$refs.dragContainer.clientWidth - 60;
        this.$refs.scalingRef.getHeight(c_width);
      }
      if (val < 500) {
        this.drag_height = 500;
      } else {
        this.drag_height = val;
      }
    },
    //加载资源文件
    loadRes() {
      if (this.screen_list[this.screen_cu]['sceneApps']) {
        this.screen_list[this.screen_cu]['sceneApps'].forEach(item => {
          let is_list = this.resource_file_list.filter(x => x.widgetCode == item.widgetCode);
          if (is_list.length == 0) {
            this.resource_file_list.push({ url: item.target, widgetCode: item.widgetCode });
            this.$addStyle(item.target + '/component.css');
            this.$addScript(item.target + '/component.js');
          } else {
            if (window[item.widgetCode]) {
              window[item.widgetCode]();
            }
          }
        })
      }
    },
    //获取分组详情
    getDetailsGroup(data) {
      var pas = '/' + this.postForm.sceneGroupId;
      if (data.visitorLimitType) {
        pas = pas + '/' + data.visitorLimitType;
      }
      if (data.userS) {
        pas = pas + '/' + data.userS;
      }
      this.http.getPlain_url(data.postUrl, pas).then(res => {
        if (res.data) {
          var form = res.data;
          form.name = this.postForm.name;
          form.status = this.postForm.status;
          form.sceneUsers = this.postForm.sceneUsers;
          form.visitorLimitType = this.postForm.visitorLimitType;
          this.detailsRender(form);
          //这里要加载模板才css文件
          this.templateCssLoad(form.template.cssPath);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    //刷新头部底部
    refreshHF(val) {
      this.$forceUpdate();
      setTimeout(() => {
        if (window[val]) {
          window[val]();
        }
      }, 200);
    },
    //刷新页面
    sceneLeftBG(val) {
      if (val.type == 'bgt' || val.type == 'bgf') {
        this.screen_list[this.screen_cu].bgImg = val.url;
      } else if (val.type == 'tb') {
        this.screen_list[this.screen_cu].icon = val.url;
      }
      this.$forceUpdate();
    },
    //加载头
    loadHead() {
      let is_list = this.resource_file_list.filter(x => x.widgetCode == this.postForm.headerTemplate.templateCode);
      if (is_list.length == 0 && this.postForm.headerTemplate.router) {
        this.resource_file_list.push({ url: this.postForm.headerTemplate.router, widgetCode: this.postForm.headerTemplate.templateCode });
        this.$addStyle(this.postForm.headerTemplate.router + '/component.css');
        this.$addScript(this.postForm.headerTemplate.router + '/component.js');
      } else {
        console.log('更新头部');
        if (window[this.postForm.headerTemplate.templateCode]) {
          window[this.postForm.headerTemplate.templateCode]();
        }
      }
    },
    //加载底
    loadFoot() {
      let is_list = this.resource_file_list.filter(x => x.widgetCode == this.postForm.footerTemplate.templateCode);
      if (is_list.length == 0 && this.postForm.footerTemplate.router) {
        this.resource_file_list.push({ url: this.postForm.footerTemplate.router, widgetCode: this.postForm.footerTemplate.templateCode });
        this.$addStyle(this.postForm.footerTemplate.router + '/component.css');
        this.$addScript(this.postForm.footerTemplate.router + '/component.js');
      } else {
        console.log('更新底部');
        if (window[this.postForm.footerTemplate.templateCode]) {
          window[this.postForm.footerTemplate.templateCode]();
        }
      }
    },
    //删除头部底部
    delTempHF(val) {
      if (val == 'foot') {
        this.postForm.footerTemplate = {};
      } else {
        this.postForm.headerTemplate = {};
      }
      this.$forceUpdate();
    },
    //加载头部底部
    loadHeadFoot(val) {
      if (!val) {
        this.loadHead();
        this.loadFoot();
      } else if (val == 'foot') {
        this.loadFoot();
      } else {
        this.loadHead();
      }
    },
    //拖拽渲染组件content
    /**
     data-obj:存放的是配置参数，背景图和是否全屏放大
     data-code：存放的是标记是否为通用组件，有值为通用组件；
     data-set：存放的是栏目配置等信息(这个值可能是数组也可能是json对象)
     data-common：存放通用组件等特殊参数，是个字符串。
     widgetCode：组件唯一code值
     appId：应用id
     appWidgetId：组件id
     */
    gridContent(val, type) {
      var create_id = 'jl_vip_zt_' + Math.ceil(Math.random() * 1e8);//随机id
      var data_obj = JSON.stringify(val.configParameter || {}).replace(/\"/g, "'");
      var data_common = (val.commonWidgetSet && val.commonWidgetSet != 'undefined' && val.commonWidgetSet != 'null' && Object.keys(val.commonWidgetSet).length != 0) ? val.commonWidgetSet.replace(/\"/g, "'") : '{}';
      var data_set = JSON.stringify(val.appPlateItems || []).replace(/\"/g, "'");

      switch (type) {
        case 'a': return '<div class="jl_vip_zt_warp ' + (val.appWidget ? val.appWidget.widgetCode : val.widgetCode) + '" data-code="' + (val.appWidget ? val.appWidget.code : val.code) + '" data-id="' + create_id + '" data-set="' + data_set + '" data-obj="' + data_obj + '" data-common="' + data_common + '"><i class="jl_vip_zt_del"></i><div class="mask-layer" data-appId="' + val.appId + '" data-appWidgetId="' + (val.appWidget ? val.appWidget.id : val.id) + '" data-set="' + data_set + '"data-common="' + data_common + '" data-obj="' + data_obj + '"></div><div id="' + create_id + '"></div></div>';
        case 'b': return '<div class="jl_vip_zt_warp ' + val.widgetCode + '" data-code="' + (val.appWidget ? val.appWidget.code : val.code) + '" data-id="' + val.divId + '" data-set="' + data_set + '" data-obj="' + data_obj + '" data-common="' + data_common + '"><i class="jl_vip_zt_del"></i><div class="mask-layer" data-appId="' + val.appId + '" data-appWidgetId="' + val.tempId + '" data-set="' + data_set + '"data-common="' + data_common + '" data-obj="' + data_obj + '"></div><div id="' + val.divId + '"></div></div>';
        case 'c': return '<div class="jl_vip_zt_warp ' + val.widgetCode + '" data-code="' + (val.appWidget ? val.appWidget.code : val.code) + '" data-id="' + create_id + '" data-set="' + data_set + '" data-obj="' + data_obj + '" data-common="' + data_common + '"><i class="jl_vip_zt_del"></i><div class="mask-layer mask-layer-active" data-appId="' + val.appId + '" data-appWidgetId="' + val.id + '" data-set="' + data_set + '"data-common="' + data_common + '" data-obj="' + data_obj + '"></div><div id="' + create_id + '"></div></div>';
        case 'd': return '<div class="jl_vip_zt_warp ' + val.widgetCode + '" data-code="' + (val.appWidget ? val.appWidget.code : val.code) + '" data-id="' + create_id + '" data-set="' + data_set + '" data-obj="' + data_obj + '" data-common="' + data_common + '"><i class="jl_vip_zt_del"></i><div class="mask-layer mask-layer-active" data-appId="' + val.appId + '" data-appWidgetId="' + val.id + '" data-set="' + data_set + '"data-common="' + data_common + '" data-obj="' + data_obj + '"></div><div id="' + create_id + '"></div></div>';
      }
    },
    //加载模板css文件
    templateCssLoad(url) {
      console.log(url);
      if (url) {
        var docUrl = '';
        var temp = document.getElementById('templateId');
        if (temp) docUrl = temp.getAttribute('href');
        if (docUrl != url) {
          if (temp) temp.remove();
          //判断href是否等于当前url，不等于就删除了重新创建，等于就不创建。
          var link = document.createElement("link");
          link.setAttribute("rel", "stylesheet");
          link.setAttribute("id", "templateId");
          link.setAttribute("type", "text/css");
          link.setAttribute("href", process.env.VUE_APP_TEMPLATESRC+url + '?version=' + new Date().getTime());
          if (document.getElementsByTagName("body")) document.getElementsByTagName("body")[0].appendChild(link);
        }
      }
    },
    //样式设置
    sceenBgImg(it) {
      var list = {};
      if (it && it.bgImg) {
        if (this.postForm.layoutId != 1) {
          list = { 'background': ' url(' + this.fileUrl + (it.bgImg || '') + ')', 'background-position-y': (-(this.postForm.headerTemplate.height * 10) + 'px !important'), 'background-repeat-y': 'no-repeat', 'background-repeat-x': 'initial !important' };
        } if (this.postForm.layoutId == 1) {
          list = { 'background': ' url(' + this.fileUrl + (it.bgImg || '') + ')', 'background-position-y': ((this.postForm.headerTemplate.height * 10) + 'px !important'), 'background-repeat-y': 'no-repeat', 'background-repeat-x': 'initial !important' };
        } else {
          list = { 'background': ' url(' + this.fileUrl + (it.bgImg || '') + ')', 'background-repeat-y': 'no-repeat !important', 'background-repeat-x': 'initial !important' };
        }
      }
      return list;
    },
  },
}