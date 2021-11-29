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
            <el-button :type="IsSystemScene==0?'primary':''" size="medium" @click="IsSystemSceneClick(0)">默认</el-button>
            <el-button :type="IsSystemScene==1?'primary':''" size="medium"  @click="IsSystemSceneClick(1)">自定义</el-button>
            <span class="d-title">所有状态：</span>
            <el-button :type="Status==1?'primary':''" size="medium" @click="statusClick(1)">启用</el-button>
            <el-button :type="Status==0?'primary':''" size="medium" @click="statusClick(0)">禁用</el-button>
            <el-button size="medium" icon="el-icon-plus" class="r-btn" @click="addClick()">新建场景</el-button>
          </div>
        </div><!---顶部查询板块 end--->
        <div class="list-content">
          <div class="row">
            <!-- <div class="title">PC门户端
              <span class="more-r">更多<i class="el-icon-arrow-right"></i></span>
            </div> -->
            <div class="row-list c-l">
              <div class="row-box set-hover" v-for="i in listData" :key="i">
                <div class="r-box-bg">
                  <img src="@/assets/admin/img/upload/s1.png"/>
                  <span class="name">{{i.name}}
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
            <paging :pagedata="pageData" @pagechange="pageChange" v-if="pageData.totalCount"></paging>
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
      Status:null,//启用，禁用
      IsSystemScene:null,//是否默认场景
      defalut_img:require('../../../assets/admin/img/upload/s1.png'),
      listData:[],
      pageData: {
        pageIndex: 1,
        pageSize: 50,
      },//分页参数
      postForm:{
        TerminalId:this.$route.query.id,
      },
    }
  },
  mounted(){
      this.initData();
  },
  methods:{
    initData(){
      var pas = '?PageSize='+this.pageData.pageSize+"&PageIndex="+this.pageData.pageIndex;
      if(this.postForm.TerminalId){
        pas = pas + "&TerminalId="+this.postForm.TerminalId;
      }
      this.http.getPlain('scene-list-by-terminal-id',pas).then(res=>{
          this.listData = res.data.items||[];
          this.pageData.totalCount = res.data.totalCount;
      }).catch(err=>{
          console.log(err);
      })
    },
    addClick(){
      this.$router.push('/sceneManage');
    },
    //启用，禁用状态选择
    statusClick(val){
      this.Status = val;
      this.initData();
    },
    //默认，自定义
    IsSystemSceneClick(val){
      this.IsSystemScene = val;
      this.initData();
    },
    //编辑场景
    editClick(val){
      this.$router.push({path:'sceneSet',query: {id:val.id,terminal:this.$route.query.type,t:val.name,scene:val.id}});
    },
    //删除场景
    delClick(val){
      var _this = this;
      this.$confirm('请谨慎执行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.http.deletePlain('scene-del','/'+val.id).then(res=>{ 
          console.log(res);
          _this.$message({type: 'success',message: '删除成功!'});
          _this.initData();
        }).catch(err=>{
            _this.$message({type: 'error',message: '删除失败'});   
        })
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});          
      });
    },
    //禁用场景
    disableClick(val){
      var _this = this;
      this.$confirm('是否确定禁用此场景?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.http.putPlain('disable-scene','/'+val.id).then(res=>{ 
          console.log(res);
          _this.$message({type: 'success',message: '禁用成功!'});
          _this.initData();
        }).catch(err=>{
            _this.$message({type: 'error',message: '禁用失败'});   
        })
      }).catch(() => {
        this.$message({type: 'info',message: '已取消禁用'});          
      });
    },
    //预览场景
    previewClick(val){
      console.log(val);
      this.http.getPlain_url('scene-detail','/'+val.id).then(res=>{
        window.localStorage.setItem('scenePreview',JSON.stringify(res.data));
        var url = window.location.origin+"/#/scenePreview";
        setTimeout(() => {
          window.open(url);
        }, 50);
      }).catch(err=>{
        this.$message({type: 'error',message: '获取详情失败'});  
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
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
