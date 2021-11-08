<!---服务中台-栏目-左边2,3步骤 -->
<template>
  <div class="left-check-page">
    <div class="drag-l-warp">
        <h1 class="step-num"><span class="num">2</span><span class="txt">主题风格</span></h1>
        <el-collapse v-model="activeCollapse" @change="collapseClick" class="drag-collapse">
        <el-collapse-item title="请选择布局" name="1">
            <div class="drag-box" v-for="i in (dataList.sceneLayout||[])" :key="i+'a'">
            <i class="el-icon-s-marketing d-b-img"></i>
            <span class="d-b-txt">{{i.key||'暂无'}}</span>
            </div>
        </el-collapse-item>
        <el-collapse-item title="请选择模板" name="2">
            <div class="drag-box" v-for="i in (dataList.sceneTemplate||[])" :key="i+'b'">
              <i class="el-icon-s-marketing d-b-img"></i>
              <span class="d-b-txt">{{i.key||'暂无'}}</span>
            </div>
        </el-collapse-item>
        <el-collapse-item title="请选择主题色" name="3">
            <div class="color-temp" @click="setTheme(i)" v-for="i in ((dataList.sceneThemeColor||[]))">{{i.key||'红色'}}</div>
        </el-collapse-item>
        </el-collapse><!--主题风格 end-->
        <div class="step-three">
        <h1 class="step-num">
            <span class="num">3</span><span class="txt">应用选择</span>
            <el-dropdown trigger="click" class="r-select">
            <span class="el-dropdown-link">{{serve_name||'请选择'}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(it,i) in (dataList.appServiceType||[])" :key="i" @click.native="serveClick(it)">{{it.key||'暂无'}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </h1>
        <div class="drag-box-warp">
            <div class="drag-box" v-for="i in apps_list" :key="i+'c'" @click="appDetails(i.appId)">
            <i class="el-icon-s-marketing d-b-img"></i>
            <span class="d-b-txt" :title="i.name">{{i.name||''}}</span>
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
          this.serveClick(newVal.appServiceType[0]);
        }
      }
    }
  },
  data () {
    return {
      serve_name:'',//应用类型-选择的名称
      activeCollapse:['1'],//左边折叠的数量
      apps_list:[
        // {
        //   "id": "string",
        //   "appId": "string",
        //   "name": "string",
        //   "icon": "string"
        // }
      ],//应用列表
    }
  },
  mounted(){
    if(this.dataList.appServiceType && this.dataList.appServiceType.length>0){
      this.getApps(this.dataList.appServiceType[0].value);
      this.serve_name = this.dataList.appServiceType[0].key||'';
    }
  },
  methods:{
    //设置主题
    setTheme(val){
      document.getElementsByTagName("body")[0].setAttribute('class',val.value);
      window.localStorage.setItem('template',val.value);
    },
    //应用选择-服务类型点击事件
    serveClick(val){
      this.serve_name = val.key;
      this.getApps(val.value);
    },
    //按服务类型获取应用列表 /{appservicetype}/{terminaltype}
    getApps(id){
      this.http.getPlain_url('app-list-by-service-type','/'+id+'/'+this.dataList.terminal_type).then(res=>{
        this.apps_list = res.data||[];
        if(this.serve_name == '' && this.apps_list.length>0){
          this.serveClick(this.apps_list[0]);
        }
        // if(this.apps_list&&this.apps_list.length>0){//默认选中第一个应用
        //   this.appDetails(this.apps_list[0].appId);
        // }
      }).catch(err=>{
        console.log(err);
      })
    },
    //应用点击事件
    appDetails(id){
      this.$emit('getAppDetails',id);
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
    .drag-box{
        cursor: pointer;
        width: 68px;
        height: 60px;
        border-radius: 3px;
        float: left;
        margin-right: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #f9fafc;
        &:nth-child(3n+3){
        margin-right: 0;
        }
        &:hover{
        background-color: @f3f4ff;
        .d-b-txt{
            color: @6777EF;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        }
        i.d-b-img{
        padding: 10px;
        font-size: 20px;
        text-align: center;
        display: block;
        color: @f28102;
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
</style>
