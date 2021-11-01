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
            <el-button type="primary" size="small" v-for="(it,i) in s_list" :key="i">默认</el-button>
          </div>
          <el-table stripe :data="tableData" border class="admin-table">
            <el-table-column prop="id" label="序号" align="center" width="120"></el-table-column>
            <el-table-column prop="appName" label="应用名称"></el-table-column>
            <el-table-column prop="content" label="栏目名称"></el-table-column>
            <el-table-column prop="content" label="创建日期"></el-table-column>
            <el-table-column prop="content" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleSet(scope.row)" type="text" size="mini" icon="el-icon-setting" round>栏目设置</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- <el-collapse v-model="tab_name" accordion >
            <el-collapse-item name="1">
              <template slot="title">
                一致性 Consistency<i class="header-icon el-icon-info"></i>
              </template>
              <div class="row"><span></span></div>
            </el-collapse-item>
            <el-collapse-item name="2" title="反馈 Feedback">
              <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
              <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
            <el-collapse-item name="3" title="效率 Efficiency">
              <div>简化流程：设计简洁直观的操作流程；</div>
              <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
              <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
            </el-collapse-item>
            <el-collapse-item title="可控 Controllability">
              <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
              <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
            </el-collapse-item>
          </el-collapse> -->

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
      m_index:0,
      dataList:[],//主菜单
      s_list:[],//子菜单
      tableData:[
      //   {
      //   "appId": "string",
      //   "appName": "string",
      //   "icon": "string",
      //   "plateList": [
      //     {
      //       "id": "string",
      //       "name": "string",
      //       "createTime": "2021-10-27T03:49:14.120Z"
      //     }
      //   ]
      // }
      ],
    }
  },
  mounted(){
      this.initData();
  },
  methods:{
    //获取终端和终端对应的场景
    initData(){
      this.http.getJsonSelf('scene-overview','?PageSize=9&PageIndex=1').then(res=>{ 
        this.dataList = res.data||[];
        if(this.dataList.length>0){
          this.activeName = this.dataList[0].terminalId;
          this.s_list = this.dataList[0].sceneList||[];
          if(this.s_list.length>0){
            this.getList(this.s_list.id);
          }
        }
        this.getList();//默认获取第一个的数据
      }).catch(err=>{
          console.log(err);
      })
    },
    //根据场景，获取对应的下方列表
    getList(id){
      this.http.getJsonSelf('app-plate-list-by-scene-id','/'+id).then(res=>{ 
        this.tableData = red.data||[];
      }).catch(err=>{

      })
    },
    //菜单点击
    handleClick(val){
      this.m_index = val.index;
      console.log(val.index);//下标
    },
    handleSet(row){
      this.$router.push({path:'programAdd',query: {id:row.id,}});
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
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
</style>
