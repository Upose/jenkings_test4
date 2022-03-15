<!---服务中台-栏目-左边2,3步骤 -->
<template>
  <div class="left-check-page">
    <div class="drag-l-warp">
        <h1 class="step-num"><span class="num">2</span><span class="txt">主题风格</span></h1>
        <el-collapse v-model="activeCollapse" @change="collapseClick" class="drag-collapse">
          <el-collapse-item title="请选择布局" name="1">
            <div class="drag-box-width" v-for="i in (dataList.sceneLayout||[])" :data-id="i.value" :key="i+'a'" @click="layoutClick(i)">
              <div class="drag-box" :class="layoutId==i.value?'box-active':''">
                <i class="el-icon-s-marketing d-b-img"></i>
                <span class="d-b-txt">{{i.key||'暂无'}}</span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="请选择模板" name="2">
              <div class="drag-box-width" v-for="i in sceneTemplate" :key="i+'b'" @click="templateClick(i)">
                <div class="drag-box" :class="templateId==i.id?'box-active':''">
                  <i class="el-icon-s-marketing d-b-img"></i>
                  <span class="d-b-txt">{{i.name||'暂无'}}</span>
                </div>
              </div>
          </el-collapse-item>
          <el-collapse-item title="请选择主题色" name="3">
            <div class="drag-box-width" @click="setTheme(i)" v-for="i in ((dataList.sceneThemeColor||[]))">
              <div class="drag-box" :class="themeColor==i.value?'box-active':''">
                <i class="el-icon-s-marketing d-b-img"></i>
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
                <el-dropdown-item v-for="(it,i) in (dataList.appServiceType||[])" :key="i" @click.native="serveClick(it)">{{it.key||'暂无'}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </h1>
        <div class="drag-box-warp">
          <div class="drag-box-width" v-for="i in apps_list" :key="i+'c'" @click="appDetails(i.appId)">
            <div class="drag-box" :class="appId==i.appId?'box-active':''">
              <i class="el-icon-s-marketing d-b-img"></i>
              <span class="d-b-txt" :title="i.name">{{i.name||''}}</span>
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
          this.serveClick(newVal.appServiceType[0]);
        }
        if(newVal.sceneLayout && newVal.sceneLayout.length>0){
          this.layoutClick(newVal.sceneLayout[0]);
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
    }
  },
  mounted(){
    if(this.dataList.appServiceType && this.dataList.appServiceType.length>0){
      this.getApps(this.dataList.appServiceType[0].value);
      this.serve_name = this.dataList.appServiceType[0].key||'';
    }
  },
  methods:{
    //设置详情
    setDatils(val){
      this.layoutId = val.layoutId;
      this.templateId = val.templateId;
      this.themeColor = val.themeColor;
      this.$forceUpdate();
    },
    //设置主题色
    setTheme(val){
      this.themeColor = val.value;
      this.$emit('setTheme',val.value);
    },
    //应用选择-服务类型点击事件
    serveClick(val){
      this.serve_name = val.key;
      this.getApps(val.value);
    },
    //选择布局
    layoutClick(val){
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
      this.templateId = val.id;
      this.$emit('templateClick',{list:val,isadd:is_add})
    },
    //按服务类型获取应用列表 /{appservicetype}/{terminaltype}
    getApps(id){
      this.http.getPlain_url('app-list-by-service-type','/'+id+'/'+this.$route.query.terminal).then(res=>{
        this.apps_list = res.data||[];
        this.$emit('getAppsList',this.apps_list);
        if(this.serve_name == '' && this.apps_list.length>0){
          this.serveClick(this.apps_list[0]);
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    //设置某个应用选中
    setAppid(id){
      this.appId = id;
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
      background-color: @f3f4ff !important;
        .d-b-txt{
            color: @6777EF !important;
        }
    }
</style>
