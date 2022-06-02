<!---服务中台-栏目-左边2,3步骤 -->
<template>
  <div class="left-check-page">
    <div class="drag-l-warp">
        <h1 class="step-num"><span class="num">2</span><span class="txt">主题风格</span></h1>
        <el-collapse v-model="activeCollapse" @change="collapseClick" class="drag-collapse">
          <el-collapse-item title="请选择布局" name="1">
            <div class="drag-box-width" v-for="i in (dataList.sceneLayout||[])" :data-id="i.value" :key="i+'a'" @click="layoutClick(i)">
              <div class="drag-box" :class="layoutId==i.value?'box-active':''" :title="i.key">
                <!-- <i class="el-icon-s-marketing d-b-img"></i> -->
                <img :src="fileUrl+i.icon" class="img-cover">
                <span class="d-b-txt">{{i.key||'暂无'}}</span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="请选择模板" name="2">
              <div class="drag-box-width" v-for="i in sceneTemplate" :key="i+'b'" @click="templateClick(i)">
                <div class="drag-box" :class="templateId==i.id?'box-active':''" :title="i.name">
                  <!-- <i class="el-icon-s-marketing d-b-img"></i> -->
                  <img :src="fileUrl+i.cover" class="img-cover">
                  <span class="d-b-txt">{{i.name||'暂无'}}</span>
                </div>
              </div>
          </el-collapse-item>
          <el-collapse-item title="请选择主题色" name="3">
            <div class="drag-box-width" @click="setTheme(i)" v-for="i in ((dataList.sceneThemeColor||[]))">
              <div class="drag-box" :class="themeColor==i.value?'box-active':''" :title="i.key">
                <!-- <i class="el-icon-s-marketing d-b-img"></i> -->
                <img :src="fileUrl+i.icon" class="img-cover">
                <span class="d-b-txt">{{i.key||'暂无'}}</span>
              </div>
            </div>
              <!-- <div class="color-temp" @click="setTheme(i)" v-for="i in ((dataList.sceneThemeColor||[]))">{{i.key||'红色'}}</div> -->
          </el-collapse-item>
        </el-collapse><!--主题风格 end-->
        <div class="step-three">
        <h1 class="step-num">
            <span class="num">3</span><span class="txt">应用选择</span>
            <el-dropdown trigger="click" class="r-select">
            <span class="el-dropdown-link">{{serve_name||'请选择'}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(it,i) in (dataList.appServiceType||[])" :key="i" @click.native="serveClick(i)">{{it.key||'暂无'}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </h1>
        <div class="drag-box-warp">
          <div class="drag-box-width" v-for="i in apps_list" :key="i+'c'" @click="appDetails(i.appId)">
            <div class="drag-box" :class="appId==i.appId?'box-active':''" :title="i.name">
              <!-- <i class="el-icon-s-marketing d-b-img"></i> -->
              <img :src="fileUrl+i.icon" class="img-cover">
              <span class="d-b-txt">{{i.name||''}}</span>
            </div>
          </div>
        </div>
        </div>
    </div><!--左边菜单 end-->
  </div>
</template>

<script>
export default {
  name: 'index',
  props:['dataList'],
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
    }
  },
  data () {
    return {
      layoutId:'',//布局
      templateId:'',//模板
      themeColor:'template1',//颜色模板
      serve_name:'',//应用类型-选择的名称
      appId:'',//当前应用
      activeCollapse:['1','2','3'],//左边折叠的数量
      sceneTemplate:[],//模板列表
      apps_list:[],//应用列表
      apps_list_all:[],//应用列表-总列表
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  mounted(){
    // if(this.dataList.appServiceType && this.dataList.appServiceType.length>0){
    //   this.getApps(this.dataList.appServiceType[0].value);
    //   this.serve_name = this.dataList.appServiceType[0].key||'';
    // }
  },
  methods:{
    //设置详情
    setDatils(val){
      this.layoutId = val.layoutId;
      this.layoutClick({value:val.layoutId},true);
      // this.templateId = val.templateId; 
      this.templateId = val.template.id; //bug修改templateId看接口结构应该是取template.id
      this.themeColor = val.themeColor;
      this.$forceUpdate();
    },
    //设置主题色
    setTheme(val){
      this.themeColor = val.value;
      this.$emit('setTheme',val.value);
    },
    
    //选择布局
    layoutClick(val,is_add){//is_add:true为第一次
      if(!is_add &&this.$route.query.scene){
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
    //应用选择-服务类型点击事件
    serveClick(index){
      var app_type = this.dataList.appServiceType[index]||{};
      this.apps_list = app_type['list']||[];
      this.serve_name = app_type.key;
    },
    //根据应用id，查询属于哪个类型及对应下标
    selectApps(appid){
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
    },
    //按服务类型获取应用列表 /{appservicetype}/{terminaltype} -----这里要改成查询全部，不要传id
    getApps(id){
      var _this = this;
      _this.http.getPlain_url('app-list-by-service-type','/'+0+'/'+this.$route.query.terminal).then(res=>{
        _this.apps_list_all = res.data||[];
        _this.$emit('getAppsList',_this.apps_list_all);
        if(_this.apps_list_all.length>0){
          _this.apps_list_all.forEach((it,i)=>{
            _this.dataList.appServiceType.forEach((t,k)=>{
              if(it.serviceType == t.value){
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
    /****左边-折叠菜单-点击*****/
    collapseClick(val){
      //console.log(val);
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";
.drag-l-warp{
    left: 0;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .cut-btn{
        left: 255px;
        border-radius: 0px 40px 40px 0px;
    }
    .step-num{
        margin-top: 29px;
        margin-bottom: 29px;
    }
    /deep/.el-collapse-item__wrap{
      margin-left: -5px;
    }
    .drag-box-width{
        cursor: pointer;
        width: 33.333%;
        border-radius: 3px;
        float: left;
        .drag-box{
          margin-top: 5px;
          margin-left: 5px;
          padding: 1px;
          background-color: #f9fafc;
          &:hover{
            background-color: @f3f4ff;
            .d-b-txt{
                color: @6777EF;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
          }
        }
        // &:nth-child(3n+3){
        // margin-right: 0;
        // }
        
        i.d-b-img{
          padding: 10px;
          font-size: 20px;
          text-align: center;
          display: block;
          color: @f28102;
        }
        .img-cover{
          width: 20px;
          height: 20px;
          display: block;
          margin:10px auto;
          border-radius:1px;
        }
        .d-b-txt{
        font-size: 12px;
        color: @34395E;
        text-align: center;
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        }
    }
    .step-three{
        height: 70px;
        position: relative;
        &::after{
        content: '';
        display: block;
        position: absolute;
        height: 1px;
        left: -20px;
        right: -20px;
        bottom: 0;
        background-color: @EBEEF5;
        }
        .step-num{
        width: 100%;
        }
    }
    .color-temp{
      cursor: pointer;
      border: 1px solid @EBEEF5;
      margin-top: 10px;
      border-radius: 3px;
      padding: 2px 5px;
      color: @34395E;
      &:hover{
        background-color:@f3f4ff;
      }
    }
    }
    /*****box选中状态 */
    .box-active{
      background-color: #e3e6ff !important;
        .d-b-txt{
            color: @6777EF !important;
        }
    }
</style>
