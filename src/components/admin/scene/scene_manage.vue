<!---服务中台-场景管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'场景管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <h1 class="s-b-border-title">选择终端 <el-button size="medium" icon="iconfont el-icon-vip-tianjia" class="r-btn" @click="addClick()">添加终端</el-button></h1>
        <div class="content">
          <div class="c-list c-l" v-loading="loading" :class="!loading && dataList.length==0?'empty-data-admin':''">
            <div class="c-l-box" v-for="i in dataList" :key="i">
              <div class="c-l-box-content" :style="{background:'#0d29d3 url('+$root.fileUrl+i.icon+') no-repeat center'}">
                <div class="title">
                  <i class="iconfont el-icon-vip-pcduan"></i>
                  <img :src="$root.fileUrl+i.logo"/>
                  <span :title="i.name">{{i.name||'暂无'}}</span>
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
      loading:true,
      dataList:[],
    }
  },
  mounted(){
      this.initData();
  },
  methods:{
    initData(){
      this.http.getPlain('terminal-instance-list','').then(res=>{
        this.loading = false;
        this.dataList = res.data||[];
      }).catch(err=>{
        this.loading = false;
          console.log(err);
      })
    },
    addClick(){
      this.$router.push('/admin_terminalAdd');
    },
    goSet(val){
      console.log(val);
      this.$router.push({path:'admin_sceneSet',query: {id:val.id,terminal:val.terminalType,t:val.name}});
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
.content{
  margin-top: 24px;
}
/deep/.el-loading-mask{
  background-color: rgba(255,255,255,0);
}
  /****查询条件板块****/
.c-list{
  min-height: 300px;
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
      background-size: 100% 100% !important;
      .title{
        color: @fff;
        font-size: 20px;
        img{
          width: 50px;
          height: 50px;
          vertical-align: middle;
          margin-right: 16px;
          border-radius: 5px;
        }
        i{
          display: none;
          font-size: 30px;
          vertical-align: middle;
          margin-right: 16px;
        }
        span{
          vertical-align: middle;
          width: calc(100% - 75px);
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
