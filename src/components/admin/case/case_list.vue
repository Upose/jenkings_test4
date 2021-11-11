<!---服务中台-服务总览-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'服务总览'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <div class="s-w c-l">
            <span class="m-title"><i class="el-icon-s-platform"></i>PC门户端</span>
            <span class="d-title">所有场景：</span>
            <el-button type="primary" size="medium">默认</el-button>
            <el-button size="medium">自定义</el-button>
            <span class="d-title">所有状态：</span>
            <el-button size="medium">启用</el-button>
            <el-button size="medium">禁用</el-button>
            <el-button size="medium" icon="el-icon-plus" class="r-btn" @click="addClick()">新建场景</el-button>
          </div>
        </div><!---顶部查询板块 end--->
        <div class="list-content">
          <div class="row">
            <!-- <div class="title">PC门户端
              <span class="more-r">更多<i class="el-icon-arrow-right"></i></span>
            </div> -->
            <div class="row-list c-l">
              <div class="row-box set-hover" v-for="i in 20" :key="i">
                <div class="r-box-bg">
                  <img src="@/assets/admin/img/upload/s1.png"/>
                  <span class="name">首页
                  <el-popover popper-class="service-popover" placement="bottom-start" width="160" v-model="visible">
                    <i class="el-icon-s-tools" slot="reference"></i>
                    <ul class="hover-menu">
                      <li @click="editClick(i)"><i class="el-icon-delete"></i><span>修改</span></li>
                      <li @click="delClick(i)"><i class="el-icon-delete"></i><span>删除</span></li>
                      <li @click="previewClick(i)"><i class="el-icon-delete"></i><span>预览</span></li>
                      <li @click="disableClick(i)"><i class="el-icon-delete"></i><span>禁用</span></li>
                    </ul>
                  </el-popover>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <paging></paging>
        </div><!----场景列表 end-->
        
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
    }
  },
  mounted(){
    //   this.initData();
  },
  methods:{
    initData(){
      var list = {
        IsSystemScene:0, //是否系统默认场景 0-否 1-是
        Status:0, //启用状态。0-停用，1-启用
        TopCount:0, //每种终端的场景获取数量
        PageIndex:1, //页
        PageSize:1, //条数
        Keyword:1, //关键字，用于模糊查询
        SortField:1, //排序字段
        IsAsc:1, //默认降序,否则升序
      };
      this.http.getPlain('scene-overview','PlateId=109&PageSize=9&PageIndex=1').then(res=>{
          this.list1 = res.result.dtos||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    addClick(){
      this.$router.push('/sceneManage');
    },
    //编辑场景
    editClick(val){
      console.log(val);
      this.$router.push('/sceneSet')
    },
    //删除场景
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
    },
    //禁用场景
    disableClick(val){
      this.$confirm('是否确定禁用此场景?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({type: 'success',message: '禁用成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已取消禁用'});          
      });
    },
    //预览场景
    previewClick(val){
      this.$router.push('/iframe_view')
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
.paging-page{
  padding-top:0;
  padding-bottom:20px;
}
  /****查询条件板块****/
  .content{
    background-color: @fff;
    border-radius: 4px 4px 0 0 ;
    .s-w{
      min-height: 60px;
      line-height: 57px;
      padding: 0 20px;
      border-bottom: 1px solid @EBEEF5;
      .d-title{
        color: @34395E;
        font-size: 14px;
        margin-left: 20px;
      }
      .r-btn{
        float: right;
        margin-top: 14px;
      }
    }
  }
  /***内容板块***/
  .list-content{
    background-color: @fff;
    border-radius: 0 0 4px 4px;
    .row{
      padding: 10px;
      .title{
        color: @34395E;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        position: relative;
        margin-left: 15px;
        margin-right: 15px;
        padding-left: 14px;
        &::after{
          position: absolute;
          left: 0;
          top: 8px;
          content: '';
          width: 5px;
          height: 5px;
          background-color: @6677EF;
          border-radius: 50%;
        }
      }
      .row-box{
        width:16.6666%;
        width: 268px;
        float: left;
        padding: 15px;
        .r-box-bg{
          box-shadow: 0px 2px 15px rgba(40, 120, 255, 0.1);
          &:hover{
            box-shadow: 0px 2px 15px rgba(40, 120, 255, 0.25);
          }
        }
        img{
          width: 100%;
          border-radius: 5px 5px 0px 0px;
        }
        span.name{
          display: block;
          height: 60px;
          color: @34395E;
          font-size: 14px;
          line-height: 60px;
          text-align: center;
          position: relative;
          border-radius: 0px 0px 3px 3px;
          
        }
      }
      /***移入显示设置按钮**/
      .set-hover{
        i{
          cursor: pointer;
          display: none;
          position: absolute;
          background: @F5F6FB;
          height: 44px;
          width: 44px;
          right: 5px;
          top: 10px;
          line-height: 44px;
          border-radius: 50%;
          font-size: 15px;
          &:active{
            color: @6777EF;
          }
        }
        &:hover{
          i{
            display: block !important;
          }
        }
        
      }
    }
  }

</style>
