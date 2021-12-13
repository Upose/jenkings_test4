<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="2"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'栏目管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <el-tabs v-model="activeName" class="tabs-check" @tab-click="handleClick">
            <el-tab-pane v-for="(it,i) in dataList" :key="i" :label="it.terminalName" :name="it.terminalId" ></el-tab-pane>
          </el-tabs>
          <div class="search-div">
            <el-button :type="i == s_index ?'primary':''" size="small" v-for="(it,i) in s_list" :key="i" @click="menuClick(it,i)">{{it.name||'无'}}</el-button>
          </div>
          <!-- <el-table stripe :data="tableData" border class="admin-table">
            <el-table-column prop="id" label="序号" align="center" width="120">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column prop="appName" label="应用名称"></el-table-column>
            <el-table-column prop="content" label="栏目名称"></el-table-column>
            <el-table-column prop="content" label="创建日期"></el-table-column>
            <el-table-column prop="content" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="el-icon-setting" round>栏目设置</el-button>
              </template>
            </el-table-column>
          </el-table> -->

          <el-table :data="tableData" style="width: 100%" :expand-row-keys="expends" :row-key="getRowKeys">
            <el-table-column type="expand" width="30">
              <template slot-scope="scope">
                <div v-for="(item,index) in scope.row.plateList" class="row c-l">
                  <div class="col1">{{index+1}}</div>
                  <div class="col2">{{item.name}}</div>
                  <div class="col3"></div>
                  <div class="col4">{{item.createTime.slice(0,10)}}</div>
                  <div class="col5"><el-button @click="handleSet(item)" type="text" size="mini" icon="el-icon-setting" round>栏目设置</el-button></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="序号" prop="appName" width="120"></el-table-column>
            <el-table-column label="栏目名称" prop="content" width="120"></el-table-column>
            <el-table-column label="应用" prop="content" width="100"></el-table-column>
            <el-table-column label="创建日期" prop="content" width="100"></el-table-column>
            <el-table-column label="操作" prop="name"></el-table-column>
          </el-table>

        </div>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb},
  data () {
    return {
      tab_name:['1','2','3'],
      activeName:'',
      m_index:0,//一级菜单点击位置
      s_index:0,//二级菜单点击位置
      dataList:[],//主菜单
      s_list:[],//子菜单
      tableData:[],
      expends:[],
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    getExpends(){
      var appId = this.tableData.map(item => item.appId)
      this.expends = appId;
      console.log(this.expends);
    },
    getRowKeys(row){
      return row.appId
    },
    //获取终端和终端对应的场景
    initData(){
      var _this = this;
      this.http.getJsonSelf('scene-overview','?TopCount=100').then(res=>{ 
        _this.dataList = res.data||[];
        if(_this.dataList.length>0){
          _this.activeName = _this.dataList[0].terminalId;
          _this.s_list = _this.dataList[0].sceneList||[];
          if(_this.s_list.length>0){
            _this.getList(_this.s_list[0].id);
          }
        }
      }).catch(err=>{
          console.log(err);
      })
    },
    //根据场景，获取对应的下方列表
    getList(id){
      this.http.getJsonSelf('app-plate-list-by-scene-id','/'+id).then(res=>{ 
        this.tableData = res.data||[];
        this.getExpends();
      }).catch(err=>{

      })
    },
    //一级菜单点击
    handleClick(val){
      this.m_index = val.index;
      this.s_index = 0;
      console.log(val.index);//下标
    },
    //二级菜单点击
    menuClick(val,index){
      this.s_index = index;
      this.getList(val.id);
    },
    handleSet(row){
      window.open(row.visitUrl, "_blank");
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
  .content{
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    /deep/.el-tabs__header{
      margin: 0;
    }
    .search-div{
      padding: 20px;
    }
    /deep/.tabs-check .el-tabs__content{
      display: none;
    }
  }
    .row{
    border-bottom: 1px solid #eee;
    padding: 8px 0;
    &:last-child{
      border-bottom: none;
    }
    .col1,.col2,.col3,.col4,.col5{
      float: left;
      height: 28px;
      line-height: 28px;
      padding: 0 10px;
    }
    .col1{
      width: 150px;
      text-align: center;
    }
    .col2{
      width: 120px;
    }
    .col3{
      width: 100px;
    }
    .col4{
      width: 100px;
    }
    .col5{
      width: 100px;
      .el-button{
        margin-top: -5px;
      }
    }
  }
</style>
