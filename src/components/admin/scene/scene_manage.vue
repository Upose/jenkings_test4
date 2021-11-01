<!---服务中台-场景管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'场景管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <h1 class="s-b-border-title">选择终端 <el-button size="medium" icon="el-icon-plus" class="r-btn" @click="addClick()">添加终端</el-button></h1>
        <div class="content">
          <div class="c-list c-l">
            <div class="c-l-box" v-for="i in dataList" :key="i">
              <div class="c-l-box-content">
                <div class="title">
                  <i class="el-icon-folder"></i>
                  <span>{{i.name||'暂无'}}</span>
                </div>
                <el-button size="mini" round class="go-set" @click="goSet(i)">去设计 <i class="el-icon-arrow-right"></i></el-button>
              </div>
            </div>
          </div>

        </div><!---顶部查询板块 end--->

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
      dataList:[],
    }
  },
  mounted(){
      this.initData();
  },
  methods:{
    initData(){
      this.http.getPlain('terminal-instance-list','').then(res=>{
        this.dataList = res.data||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    addClick(){
      this.$router.push('/terminalAdd');
    },
    goSet(val){
      console.log(val);
      this.$router.push({path:'sceneSet',query: {id:val.id,terminal:val.terminalType,t:val.name}});
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
.content{
  margin-top: 24px;
}
  /****查询条件板块****/
.c-list{
  margin-left: -10px;
  margin-right: -10px;
  div.c-l-box{
    width: 25%;
    min-width: 250px;
    float: left;
    margin-bottom: 20px;
    .c-l-box-content{
      padding: 2vw;
      margin-left: 10px;
      margin-right: 10px;
      border-radius: 5px;
      background: url(../../../assets/admin/img/scene-bg1.png) no-repeat center 100%;
      .title{
        color: @fff;
        font-size: 20px;
        i{
          font-size: 30px;
          vertical-align: middle;
          margin-right: 16px;
        }
        span{
          vertical-align: middle;
        }
      }
      .go-set{
        margin-top: 2vw;
        width: 100px;
      }
    }
  }
}
</style>
