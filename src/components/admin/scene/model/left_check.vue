<!---服务中台-栏目-左边2,3步骤 -->
<template>
<div class="drag-l" :class="left_fold?'drag-l-hide':''">
  <div class="drag-l-pad">
      <div class="left-check-page">
        <div class="drag-l-warp">
            <h1 class="step-num"><span class="num">2</span><span class="txt">主题风格</span></h1>
            <el-collapse v-model="activeCollapse" class="drag-collapse">
              <el-collapse-item title="请选择布局" name="1">
                <div class="drag-box-width" v-for="i in (dataList.sceneLayout||[])" :data-id="i.value" :key="i+'a'" @click="layoutClick(i)">
                  <div class="drag-box" :class="layoutId==i.value?'box-active':''" :title="i.key">
                    <img :src="fileUrl+i.icon" class="img-cover">
                    <span class="d-b-txt">{{i.key||'暂无'}}</span>
                  </div>
                </div>
              </el-collapse-item><!--布局 end-->

              <el-collapse-item title="请选择模板" name="2">
                  <div class="drag-box-width" v-for="i in sceneTemplate" :key="i+'b'" @click="templateClick(i)">
                    <div class="drag-box" :class="templateId==i.id?'box-active':''" :title="i.name">
                      <img :src="fileUrl+i.cover" class="img-cover">
                      <span class="d-b-txt">{{i.name||'暂无'}}</span>
                    </div>
                  </div>
              </el-collapse-item><!--模板 end-->

              <el-collapse-item title="请选择主题色" name="3">
                <div class="drag-box-width" @click="setTheme(i)" v-for="i in ((dataList.sceneThemeColor||[]))">
                  <div class="drag-box" :class="themeColor==i.value?'box-active':''" :title="i.key">
                    <img :src="fileUrl+i.icon" class="img-cover">
                    <span class="d-b-txt">{{i.key||'暂无'}}</span>
                  </div>
                </div>
              </el-collapse-item><!--主题色 end-->

              <el-collapse-item title="模板/屏配置" name="4">
                <div class="model-set-w c-l">
                  <div class="menu-name">
                    <el-input placeholder="请输入内容" size="medium" @input="menuInput">
                      <template slot="prepend">菜单名称：</template>
                    </el-input>
                  </div>
                  <div class="up-img w50" :style="{'background-image':'url('+''+')'}">
                    <div><img src="@/assets/admin/img/icon-upload.png"/><span>背景更换</span></div>
                    <input type="file" :id="'file_bg'" multiple="multiple" @change="handleFileJS">
                  </div>
                  <div class="up-img w50" :style="{'background-image':'url('+''+')'}">
                    <div><img src="@/assets/admin/img/icon-upload.png"/><span>图标更换</span></div>
                    <input type="file" :id="'file_bg'" multiple="multiple" @change="handleFileJS">
                  </div>
                </div>
              </el-collapse-item><!--模板/屏配置 end-->

            </el-collapse>
            <div class="step-three">
              <h1 class="step-num">
                  <span class="num">3</span><span class="txt">应用选择</span>
                  <el-dropdown trigger="click" class="r-select">
                  <span class="el-dropdown-link">{{serve_name||'请选择'}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(it,i) in (dataList.appServiceType||[])" :key="i" @click.native="serveClick(i)">{{it.key||'暂无'}}</el-dropdown-item>
                  </el-dropdown-menu>
                  </el-dropdown>
              </h1><!--选择应用类型 end-->
              <div class="drag-box-warp c-l">
                <div class="drag-box-width" v-for="i in apps_list" :key="i+'c'" @click="appDetails(i.appId)">
                  <div class="drag-box" :class="appId==i.appId?'box-active':''" :title="i.name">
                    <img :src="fileUrl+i.icon" class="img-cover">
                    <span class="d-b-txt">{{i.name||''}}</span>
                  </div>
                </div>
              </div><!--应用列表 end-->
            </div>
        </div>
      </div>
      <i class="cut-btn" :class="left_fold?'el-icon-arrow-right':'el-icon-arrow-left'" @click="leftFold()"></i>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  props:['dataList','handles','postForm'],
  watch: {
    dataList: {
      deep: true,  // 深度监听
      handler(newVal,oldVal) {
        if(newVal.appServiceType && newVal.appServiceType.length>0){
          this.getApps(newVal.appServiceType[0].value);
        }
        if(newVal.sceneLayout && newVal.sceneLayout.length>0){
          this.layoutClick(newVal.sceneLayout[0],true);
        }
      }
    },
  },
  created(){
    // layout-options
    this.http.getPlain('layout-options','').then(res=>{
      console.log(res.data.sceneLayout);
    })
  },
  data () {
    return {
      id:this.$route.query.id,
      left_fold:false,
      layoutId:'',//布局
      templateId:'',//模板
      themeColor:'template1',//颜色模板
      serve_name:'',//应用类型-选择的名称
      appId:'',//当前应用
      activeCollapse:['1','2','3','4'],//左边折叠的数量
      sceneTemplate:[],//模板列表
      apps_list:[],//应用列表
      apps_list_index:0,//应用列表-下标
      apps_list_all:[],//应用列表-总列表
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  methods:{
    //设置详情
    setDatils(val){
      this.layoutId = val.layoutId;
      this.layoutClick({value:val.layoutId},true);
      this.templateId = val.template?val.template.id:'';
      this.themeColor = val.themeColor;
      this.$forceUpdate();
    },
    //菜单名称输入事件
    menuInput(e){
      console.log(e);
    },
    //设置主题色
    setTheme(val){
      this.themeColor = val.value;
      this.$emit('setTheme',val.value);
    },
    /***左边折叠 */
    leftFold(){
      this.left_fold = !this.left_fold;
      this.$emit("update:left_fold",this.left_fold);
    },
    //选择布局
    layoutClick(val,is_add){//is_add:true为第一次
      if(!is_add &&this.id){
        this.$message({message: '场景修改状态下，布局不能改变',type:'info'});
        return;
      }
      this.layoutId = val.value;
      this.$emit('layoutClick',val);
      this.getTemplate(val.value);
    },
    //获取模板列表
    getTemplate(id){
      this.http.getPlain('template-list','LayoutId='+id+'&Type=1&PageIndex=1&PageSize=100').then(res=>{
        this.sceneTemplate = res.data.items||[];
        if(this.sceneTemplate.length>0 && this.templateId==''){//表示第一次进入
          this.templateId = this.sceneTemplate[0].id;
          this.templateClick(this.sceneTemplate[0],true);
        }
      }).catch(err=>{

      })
    },
    //选择模板
    templateClick(val,is_add){
      // console.log(val);
      this.templateId = val.id;
      this.$emit('templateClick',{list:val,isadd:is_add})
    },
    //应用选择-服务类型点击事件 index 应用分组的下标
    serveClick(index){ 
      // console.log(index);
      this.apps_list_index = index;
      var app_type = this.dataList.appServiceType[index]||{};
      this.apps_list = app_type['list']||[];
      this.serve_name = app_type.key;
      
    },
    //根据应用id，查询属于哪个类型及对应下标
    selectApps(appid){
      var s = this.apps_list.findIndex(x=>x.appId == appid);
      if(s>-1){
        this.serveClick(this.apps_list_index);return;
      }else{
        var index = null;
        this.dataList.appServiceType.forEach((it,i)=>{
          if(it.list && it.list.length>0){
            it.list.forEach((t,k)=>{
              if(t.appId == appid){
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
    getApps(){
      var _this = this;
      _this.http.getPlain_url('app-list-by-service-type','/'+0+'/'+this.$route.query.type).then(res=>{
        _this.apps_list_all = res.data||[];
        _this.$emit('setAppsList',_this.apps_list_all);
        if(_this.apps_list_all.length>0){
          _this.apps_list_all.forEach((it,i)=>{
            _this.dataList.appServiceType.forEach((t,k)=>{
              if(it.serviceType.indexOf(t.value)>-1){
                if(!_this.dataList.appServiceType[k]['list']){
                  _this.dataList.appServiceType[k]['list'] = [];
                }
                _this.dataList.appServiceType[k]['list'].push(it);
              }
            })
          })
        }
        if(_this.serve_name == '' && _this.apps_list_all.length>0){
          _this.serveClick(0);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    //设置某个应用选中
    setAppid(id){
      this.appId = id;
      var index = this.selectApps(this.appId);
      if(index != null){
        this.serveClick(index);
      }
    },
    //应用点击事件
    appDetails(id){
      this.appId = id;
      this.$emit('getAppDetails',{'id':id,'temp_id':0,'is_add':true,'set_list':'[{}]'});
    },
    //文件上传
    handleFileJS(e) {
      var _this = this;
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      if (!file) {
        return
      }
      let formData = new FormData()
      formData.append('files', file)
      if (file.type !== 'text/javascript' && file.type !== 'application/javascript' && file.type !== 'JavaScript') {
        this.$message({ type: 'error', message: '请上传js文件!' });
        return;
      }
      var index = parseInt(e.target.id.slice(5, 6));
      this.http.postFile("UploadFile", formData).then((res) => {
       console.log(res);
      }).catch((err) => {
        this.$message({ type: 'error', message: '上传失败!' });
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
@import "../../../../assets/admin/css/style.less";
@import "../scene_set.less";
@import "./model.less";
</style>
