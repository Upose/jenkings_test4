<!---服务中台-栏目-左边2,3步骤 -->
<template>
  <div class="drag-l">
    <div class="fixed-menu-w">
      <span class="box" :class="div_num=='1'?'active':''" @click="div_num='1'">
        <i class="iconfont el-icon-vip-zhuti_yifu loginOut"></i>
        <i class="txt">主题风格</i>
      </span>
      <span class="box" :class="div_num=='2'?'active':''" @click="div_num='2'">
        <i class="iconfont el-icon-vip-zhuti loginOut"></i>
        <i class="txt">应用选择</i>
      </span>
      <div class="r-bt">
        <i class="el-icon-minus" @click="leftFold()"></i>
        <i class="el-icon-rank" @mousedown="move"></i>
      </div>
    </div>
    <div class="drag-l-pad">
      <div class="left-check-page">
        <div class="drag-l-warp">
          <el-collapse v-model="activeCollapse" class="drag-collapse" v-show="div_num=='1'">
            <el-collapse-item title="请选择布局" name="1">
              <div class="drag-box-width" v-for="i in (allList||[])" :data-id="i.value" :key="i+'a'" @click="layoutClick(i)">
                <div class="drag-box" :class="postForm.layoutId==i.value?'box-active':''" :title="i.key">
                  <i class="iconfont el-icon-vip-xuanzhong" v-if="postForm.layoutId==i.value"></i>
                  <img :src="fileUrl+i.icon" class="img-cover">
                  <span class="d-b-txt">{{i.key||'暂无'}}</span>
                </div>
              </div>
            </el-collapse-item>
            <!--布局 end-->

            <el-collapse-item title="请选择模板" name="2">

              <div class="drag-box-btn-w" @click="templateClick(i)" v-for="i in sceneTemplate">
                <div class="drag-box" :class="templateId==i.id?'active1':''" :title="i.name">
                  <i class="iconfont el-icon-vip-xuanzhong" v-if="templateId==i.id"></i>
                  <span class="d-b-txt fot-c2">{{i.name||'暂无'}}</span>
                </div>
              </div>
            </el-collapse-item>
            <!--模板 end-->

            <el-collapse-item title="请选择主题色" name="3" class="color-clooapse" v-if="(sceneThemeColor||[]).length>0">

              <div class="drag-box-btn-w" @click="setTheme(i)" v-for="i in ((sceneThemeColor||[]))">
                <div class="drag-box" :style="{'background-image':'url('+(fileUrl+i.icon)+')'}">
                  <i class="iconfont el-icon-vip-xuanzhong" v-if="(postForm.themeColor||'template1')==i.value"></i>
                  <span class="d-b-txt fot-c1">{{i.key||'暂无'}}</span>
                </div>
              </div>
            </el-collapse-item>
            <!--主题色 end-->

            <el-collapse-item title="模板/屏配置" name="4" v-if="templateId">

              <div class="model-set-w c-l" v-show="postForm.layoutId==1||postForm.layoutId==4">
                <div class="box-title-img">
                  <div class="title">背景图更换</div>
                  <div class="img-w">
                    <div class="img-show"><img :src="screen_list[screen_cu].bgImg?(fileUrl+screen_list[screen_cu].bgImg):default_img" alt=""></div>
                    <i class="del-img iconfont el-icon-vip-shanchu-1" @click="delBGImg('bgt')"></i>
                    <div class="btn-show">
                      <div><img src="@/assets/admin/img/icon-upload.png" /><span>点击上传</span></div>
                      <input type="file" multiple="multiple" @change="$fileUpload($event,'img','bgt')">
                    </div>
                  </div>
                </div>
              </div>
              <!--通屏配置 end-->

              <div class="model-set-w c-l" v-show="(postForm.layoutId==2||postForm.layoutId==3)">
                <div class="box-title-img">
                  <div class="title">{{screen_cu==0?'背景图/视频':'背景图更换'}}</div>
                  <div class="img-w">
                    <div class="img-show"><img :src="screen_list[screen_cu].bgImg?(fileUrl+screen_list[screen_cu].bgImg):default_img" alt=""></div>
                    <i class="del-img iconfont el-icon-vip-shanchu-1" @click="delBGImg('bgf')"></i>
                    <div class="btn-show">
                      <div><img src="@/assets/admin/img/icon-upload.png" /><span>点击上传</span></div>
                      <input type="file" multiple="multiple" @change="$fileUpload($event,(screen_cu==0?'videoimg':'img'),'bgf')">
                    </div>
                  </div>
                </div>
                <div class="box-title-img">
                  <div class="title">图标更换</div>
                  <div class="img-w">
                    <div class="img-show"><img :src="screen_list[screen_cu].icon?(fileUrl+screen_list[screen_cu].icon):default_img" alt=""></div>
                    <i class="del-img iconfont el-icon-vip-shanchu-1" @click="delBGImg('tb')"></i>
                    <div class="btn-show">
                      <div><img src="@/assets/admin/img/icon-upload.png" /><span>点击上传</span></div>
                      <input type="file" multiple="multiple" @change="$fileUpload($event,'img','tb')">
                    </div>
                  </div>
                </div>
              </div>
              <!--通屏配置 end-->

            </el-collapse-item>
            <!--模板/屏配置 end-->

          </el-collapse>

          <el-collapse v-model="activeCollapse1" class="drag-collapse" v-show="div_num=='2'">
            <h1 class="app-select">
              <span class="icon-r"><i class="el-icon-caret-right"></i> | </span>
              <el-dropdown trigger="click" class="r-select">
                <span class="el-dropdown-link">{{serve_name||'请选择'}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(it,i) in (appServiceType||[])" :key="i" @click.native="serveClick(i)">{{it.key||'暂无'}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </h1>
            <!--选择应用类型 end-->
            <el-collapse-item title="应用类型" name="1">
              <div class="drag-box-warp c-l">
                <div class="drag-box-width" v-for="i in apps_list" :key="i+'c'" @click="appDetails(i.appId)">
                  <div class="drag-box" :class="appId==i.appId?'box-active':''" :title="i.name">
                    <i class="iconfont el-icon-vip-xuanzhong" v-if="appId==i.appId"></i>
                    <img :src="fileUrl+i.icon" class="img-cover">
                    <span class="d-b-txt">{{i.name||''}}</span>
                  </div>
                </div>
              </div>
              <!--应用列表 end-->
            </el-collapse-item>

            <el-collapse-item title="通用组件" name="2">
              <div class="drag-box-warp c-l">
                <div class="drag-box-width" v-for="i in sceneHeaderFooter" :key="i+'d'" @click="addHFtemp(i.key)">
                  <div class="drag-box" :class="appId==i.key?'box-active':''" :title="i.key">
                    <img :src="fileUrl+i.icon" class="img-cover">
                    <span class="d-b-txt">{{i.key||''}}</span>
                  </div>
                </div>
                <div class="drag-box-width" @click="JSAdd()">
                  <div class="drag-box">
                    <img src="@/assets/admin/img/jbsz.svg" class="img-cover">
                    <span class="d-b-txt">脚本设置</span>
                  </div>
                </div>
                <div class="drag-box-width" v-for="i in common_tempList" @click="addCompont(i)">
                  <div class="drag-box">
                    <img :src="fileUrl+i.cover" class="img-cover">
                    <span class="d-b-txt">{{i.name||''}}</span>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!--头部底部固定模板,脚本设置 end-->

        </div>
      </div>
      <!-- <i class="cut-btn" :class="left_fold?'el-icon-arrow-right':'el-icon-arrow-left'" @click="leftFold()"></i> -->
    </div>
    <advanced @hfHide="header_footer_show = false" :postForm="postForm" v-if="header_footer_show"></advanced>
  </div>
</template>

<script>
import advanced from "./scriptSet.vue";//高级设置
export default {
  name: 'index',
  props: ['appServiceType', 'screen_cu', 'screen_list', 'postForm'],
  components: { advanced },
  watch: {
    'appServiceType': {
      deep: true,  // 深度监听
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          this.getApps(newVal[0].value);
        }
      }
    },
    'postForm': {
      deep: true,  // 深度监听
      handler(newVal, oldVal) {
        if (this.allList && this.allList.length > 0) {
          var s1 = this.allList.filter(x => x.value == this.postForm.layoutId);
          if (s1 && s1.length > 0) {
            this.sceneTemplate = s1[0].sceneTemplate || [];
            var s2 = this.sceneTemplate.filter(y => y.id == this.templateId);
            if (s2 && s2.length > 0) {
              this.sceneThemeColor = s2[0].sceneThemeColor || [];
            }
          }
        }
      },
    },
  },
  mounted() {
    this.bus.$on("getUpladFile", (res) => {
      switch (res.key) {
        case 'bgt': this.screen_list[this.screen_cu].bgImg = res.url || ''; break;
        case 'bgf': this.screen_list[this.screen_cu].bgImg = res.url || ''; break;
        case 'tb': this.screen_list[this.screen_cu].icon = res.url || ''; break;
      }
      this.$forceUpdate();
      this.$emit('sceneLeftBG', { type: res.key, url: (res.url || '') });
    })
  },
  created() {
    //获取模板等信息
    this.http.getPlain('layout-options', 'terminalType=' + this.$route.query.type + '&sceneGroupId=' + this.id).then(res => {
      this.allList = res.data.sceneLayout || [];
      this.sceneHeaderFooter = res.data.sceneHeaderFooter || [];
      this.initLeftData();
    });
    //获取通用组件
    this.http.getPlain_url('app-widget-list-by-app-id', '/common').then(res => {
      this.common_tempList = res.data || [];
    });
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      header_footer_show: false,
      div_num: '1',
      default_img: require('@/assets/admin/img/default.png'),
      allList: [],//左侧-布局模板信息
      sceneHeaderFooter: [],
      id: this.$route.query.id,
      left_fold: false,//开启关闭左侧菜单
      templateId: '',//模板
      serve_name: '',//应用类型-选择的名称
      appId: '',//当前应用
      activeCollapse: ['1', '2', '3', '4'],//左边折叠的数量
      activeCollapse1: ['1', '2'],//左边折叠的数量
      sceneTemplate: [],//模板列表
      sceneThemeColor: [],//颜色列表
      apps_list: [],//应用列表
      apps_list_index: 0,//应用列表-下标
      apps_list_all: [],//应用列表-总列表
      common_tempList: [],//通用组件
    }
  },
  methods: {
    move(e) {
      var event = e.target;  //获取wqh盒子
      var parevent = event.parentNode.parentNode.parentNode;
      //获取鼠标位置
      let pageX = e.pageX;
      let pageY = e.pageY;
      var boxX = pageX - parevent.offsetLeft;
      var boxY = pageY - parevent.offsetTop;
      // console.log(pageX,pageY,boxX,boxY);
      document.onmousemove = function (e) {
        //获取鼠标拖拽式在页面上的位置
        let pageXs = e.pageX;
        let pageYs = e.pageY;
        let l = pageXs - boxX;
        let t = pageYs - boxY;
        parevent.style.left = (l < 0 ? 0 : l) + "px";
        parevent.style.top = (t < 40 ? 40 : t) + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;  //删除拖拽事件
      };
    },
    //设置详情
    setDatils(val) {
      this.templateId = (val.template && val.template.id) ? val.template.id : '';
      this.initLeftData();
      this.$forceUpdate();
    },
    //初始化数据
    initLeftData() {
      if (this.templateId) { //表示编辑状态
        var s1 = this.allList.filter(x => x.value == this.postForm.layoutId);
        if (s1 && s1.length > 0) {
          this.sceneTemplate = s1[0].sceneTemplate || [];
          var s2 = this.sceneTemplate.filter(y => y.id == this.templateId);
          if (s2 && s2.length > 0) {
            this.sceneThemeColor = s2[0].sceneThemeColor || [];
          }
        }
      } else { //表示新增状态
        if (this.allList.length > 0) {
          if (this.allList[0] && this.allList[0].sceneTemplate && this.allList[0].sceneTemplate.length > 0) {
            this.sceneTemplate = this.allList[0].sceneTemplate || [];
            this.$forceUpdate();
          }
        };
      }
    },
    //设置主题色
    setTheme(val) {
      this.postForm.themeColor = val.value;
    },
    //选择布局
    layoutClick(val, is_add) {//is_add:true为第一次
      if (!is_add && this.id) {
        this.$message({ message: '场景修改状态下，布局不能改变', type: 'info' });
        return;
      }
      this.sceneTemplate = val.sceneTemplate || [];
      this.postForm.layoutId = val.value;
    },
    //选择模板
    templateClick(val, is_add) {
      if (this.templateId == val.id) return;
      if (this.templateId == '' && !this.templateId) {
        this.templateLoad(val, is_add);
      } else {
        this.$confirm('此操作将清空现有布局, 是否继续?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          this.templateLoad(val, is_add);
        });
      }
    },
    //模板数据渲染
    templateLoad(val, is_add) {
      this.sceneThemeColor = val.sceneThemeColor || [];
      this.templateId = val.id;
      if (this.sceneThemeColor.length > 0) {
        this.postForm.themeColor = this.sceneThemeColor[0].value || 'template1';
      }
      this.$emit('templateClick', { list: val, isadd: is_add })
    },
    /***左边折叠 -改造为隐藏块-也就是最小化功能*/
    leftFold() {
      this.left_fold = true;
      this.$emit("update:left_fold", this.left_fold);
    },
    //应用选择-服务类型点击事件 index 应用分组的下标
    serveClick(index) {
      // console.log(index);
      this.apps_list_index = index;
      var app_type = this.appServiceType[index] || {};
      this.apps_list = app_type['list'] || [];
      this.serve_name = app_type.key;

    },
    //根据应用id，查询属于哪个类型及对应下标
    selectApps(appid) {
      var s = this.apps_list.findIndex(x => x.appId == appid);
      if (s > -1) {
        this.serveClick(this.apps_list_index); return;
      } else {
        var index = null;
        this.appServiceType.forEach((it, i) => {
          if (it.list && it.list.length > 0) {
            it.list.forEach((t, k) => {
              if (t.appId == appid) {
                index = i;
                return;
              }
            })
          }
        })
        return index;
      }
    },
    //按服务类型获取应用列表 /{appservicetype}/{terminaltype} -----这里要改成查询全部，不要传id
    getApps() {
      var _this = this;
      _this.http.getPlain_url('app-list-by-service-type', '/' + 0 + '/' + this.$route.query.type).then(res => {
        _this.apps_list_all = res.data || [];
        _this.$emit('setAppsList', _this.apps_list_all);
        if (_this.apps_list_all.length > 0) {
          _this.apps_list_all.forEach((it, i) => {
            _this.appServiceType.forEach((t, k) => {
              if (it.serviceType.indexOf(t.value) > -1) {
                if (!_this.appServiceType[k]['list']) {
                  _this.appServiceType[k]['list'] = [];
                }
                _this.appServiceType[k]['list'].push(it);
              }
            })
          })
        }
        if (_this.serve_name == '' && _this.apps_list_all.length > 0) {
          _this.serveClick(0);
        }
      }).catch(err => {
        console.log(err);
      })
    },
    //设置某个应用选中
    setAppid(id) {
      this.appId = id;
      var index = this.selectApps(this.appId);
      if (index != null) {
        this.serveClick(index);
      }
    },
    //应用点击事件
    appDetails(id) {
      if (!this.postForm.template) {
        this.$message({ type: 'info', message: '请先选择模板!' });
        return;
      }
      this.appId = id;
      this.$emit('getAppDetails', { 'id': id, 'temp_id': 0, 'is_add': true, 'set_list': '[{}]' });
    },
    //头部底部添加事件
    addHFtemp(val) {
      if (!this.postForm.template) {
        this.$message({ type: 'info', message: '请先选择模板!' });
        return;
      }
      this.appId = val;
      if (val == '头部') {
        this.$emit('rightMenu', 'header');
      } else {
        this.$emit('rightMenu', 'foot');
      }
    },
    //脚本设置
    JSAdd() {
      if (!this.postForm.template) {
        this.$message({ type: 'info', message: '请先选择模板!' });
        return;
      }
      this.header_footer_show = true;
    },
    //删除背景图片
    delBGImg(val) {
      switch (val) {
        case 'bgt': this.screen_list[this.screen_cu].bgImg = ''; break;//通屏背景
        case 'bgf': this.screen_list[this.screen_cu].bgImg = ''; break;//分屏背景
        case 'tb': this.screen_list[this.screen_cu].icon = ''; break;//分屏图标
      }
      this.$forceUpdate();
      this.$emit('sceneLeftBG', { type: val, url: '' })
    },
    //添加公共组件
    addCompont(val) {
      this.$emit('rightMenu', val.code);
      this.$emit('addCompont', { 'list': val, 'is_add_compont': true });
    },
  },
}
</script>

<style lang="less" scoped>
@import "~@/assets/admin/css/color.less";
@import "~@/assets/admin/css/style.less";
@import "../scene_set.less";
@import "./model.less";
</style>
