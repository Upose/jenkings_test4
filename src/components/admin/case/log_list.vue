<!---服务中台-终端管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'终端管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <h1 class="s-b-border-title">更新日志/注意事项</h1>
        <div class="content">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="智图3.0，文献专题，统一检索应用已正式上线。" :name="index" v-for="(item1,i) in 6" :key="i+'d'">
              <div class="row-content">智图3.0，文献专题，统一检索应用已正式上线。此次增加了XXX功能，优化了XXXXX</div>
            </el-collapse-item>
            <el-collapse-item title="为了您的账户安全，请勿分享!" :name="index+6" v-for="(item1,index) in 6" :key="index">
              <div>为了您的账户安全，请勿分享他人；</div>
            </el-collapse-item>
          </el-collapse>
          <paging></paging>
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
import paging from "@/components/admin/common/paging";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      activeNames: ['1']
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
    handleChange(val) {
      // console.log(val);
    },
    initData(){
      this.http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
          this.list1 = res.result.dtos||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    delClick(val){
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({type: 'success',message: '删除成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});          
      });
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
  /****查询条件板块****/
  .content{
    background-color: @fff;
    border-radius:4px 4px;
    margin-top: 24px;
    padding: 24px;
  }
  .row-content{
    padding: 10px;
    min-height: 100px;
    background: @F4F7FC;
  }
</style>
