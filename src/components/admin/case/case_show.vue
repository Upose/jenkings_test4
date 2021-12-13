<!---服务中台-服务总览-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'服务总览'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <div class="s-w c-l">
            <span class="m-title"><i class="el-icon-s-platform"></i>已使用场景</span>
            <span class="d-title">所有场景：</span>
            <el-button :type="IsSystemScene==0?'primary':''" size="medium" @click="IsSystemSceneClick(0)">默认</el-button>
            <el-button :type="IsSystemScene==1?'primary':''" size="medium"  @click="IsSystemSceneClick(1)">自定义</el-button>
            <span class="d-title">所有状态：</span>
            <el-button :type="Status==1?'primary':''" size="medium" @click="statusClick(1)">启用</el-button>
            <el-button :type="Status==0?'primary':''" size="medium" @click="statusClick(0)">禁用</el-button>
            <el-button size="medium" icon="el-icon-plus" class="r-btn" @click="addClick()" v-if="authShowBtn('scene-manage_add')">新建场景</el-button>
          </div>
        </div><!---顶部查询板块 end--->
        <div class="list-content">
          <div class="row" v-for="(item,index) in dataList" :key="index">
            <div class="title">{{item.terminalName||''}}
              <span class="more-r" @click="moreClick(item)">更多<i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="row-list c-l">
              <div class="row-box set-hover" v-for="i in (item.sceneList||[])":key="i+'a'">
                <div class="r-box-bg">
                  <!-- <img :src="i.cover||defalut_img"/> -->
                  <img :src="defalut_img"/>
                  <span class="name">{{i.name}}
                  <el-popover popper-class="service-popover" placement="bottom-start" width="160" v-model="visible">
                    <i class="el-icon-s-tools" slot="reference"></i>
                    <ul class="hover-menu">
                      <li @click="editClick(i,item.terminalType)" v-if="authShowBtn('scene-manage_edit')"><i class="el-icon-delete"></i><span>修改</span></li>
                      <li @click="delClick(i)" v-if="authShowBtn('scene-manage_delete')"><i class="el-icon-delete"></i><span>删除</span></li>
                      <li @click="previewClick(i)" v-if="authShowBtn('scene-manage_preview')"><i class="el-icon-delete"></i><span>预览</span></li>
                      <li @click="disableClick(i)" v-if="authShowBtn('scene-manage_disable')"><i class="el-icon-delete"></i><span>禁用</span></li>
                    </ul>
                  </el-popover>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div><!----已使用场景 end-->

        <!-- <div class="list-content top20">
          <div class="content">
            <div class="s-w">
              <h1 class="m-title">
                <i class="el-icon-s-platform"></i>推荐场景
                <span class="more-r">更多<i class="el-icon-arrow-right"></i></span>
              </h1>
            </div>
          </div>

          <div class="row nominate">
            <div class="row-list c-l">
              <div class="row-box" v-for="i in 3" :key="i">
                <div class="r-box-bg">
                  <img src="@/assets/img/upload/s4.png"/>
                  <span class="name">
                    <i>首页</i>
                    <span class="r-star">
                      <img v-for="i in 3" :key="i" src="@/assets/img/star.png"/>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>--推荐场景 end -->

        <!-- <div class="log-list c-l">
          <div class="width-5">
            <div class="log-warp">
              <h1 class="m-title">
                <i class="el-icon-s-platform"></i>更新日志
                <span class="more-r" @click="logMore('log')">更多<i class="el-icon-arrow-right"></i></span>
              </h1>
              <div class="log-content">
                <span class="title">近期维护升级事件：</span>
                <ul>
                  <li class="circle" v-for="i in 4" :key="i+'b'">智图3.0，文献专题，统一检索应用已正式上线。</li>
                </ul>
                <span class="line"></span>
                <span class="title">4年了，一路走来，感谢彼此！</span>
              </div>
            </div>
          </div>

          <div class="width-5">
            <div class="log-warp">
              <h1 class="m-title">
                <i class="el-icon-s-platform"></i>注意事项
                <span class="more-r" @click="logMore('notice')">更多<i class="el-icon-arrow-right"></i></span>
              </h1>
              <div class="log-content">
                <ul>
                  <li class="triangle" v-for="i in 10" :key="i+'c'">为了您的账户安全，请勿分享他人为了您的账户安全，请勿分享他人为了您</li>
                </ul>
              </div>
            </div>
          </div>
        </div> -->
        <!----更新日志-注意事项 end-->

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
      Status:null,//启用，禁用
      IsSystemScene:null,//是否默认场景
      defalut_img:require('../../../assets/admin/img/upload/s1.png'),
      dataList:[],//列表
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    initData(){
      var pars = '?TopCount=16';
      if(this.Status || this.Status){
        pars = pars+"&Status="+this.Status;
      }
      if(this.IsSystemScene || this.IsSystemScene == 0){
        pars = pars+"&IsSystemScene="+this.IsSystemScene;
      }
      this.http.getJsonSelf('scene-overview',pars).then(res=>{ 
        this.dataList = res.data||[];
      }).catch(err=>{
          console.log(err);
      })
    },
    addClick(){
      this.$router.push('/sceneManage');
    },
    //编辑场景
    editClick(val,terminalType){
      this.$router.push({path:'sceneSet',query: {id:val.id,terminal:terminalType,t:val.name,scene:val.id}});
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
    //禁用场景
    disableClick(val){
      var _this = this;
      this.$confirm('禁用后用户无法再访问该场景，是否继续？?', '提示', {
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
    //更多
    moreClick(val){
      console.log(val);
      this.$router.push({path:'caseList',query:{id:val.terminalId,type:val.terminalType}});
    },
    //日志，通知
    logMore(val){
      this.$router.push({path:'/logList',query:{tag:val}});
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
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
    /**推荐场景**/
    .nominate{
      .row-box{
        span.name{
          text-align: left;
          padding:0 20px;
          i{
            font-style: normal;
            vertical-align: middle;
            max-width: 56px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
          }
          .r-star{
            float: right;
            img{
              vertical-align: middle;
              width: 10px;
              height: 10px;
              margin-right: 10px;
              &:last-child{
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
  /**日志列表板块**/
  .log-list{
    margin-top: 30px;
    .width-5{
      width: 50%;
      float: left;
      &:first-child{
        padding-right: 15px;
      }
      &:last-child{
        padding-left: 15px;
      }
      .log-warp{
        background-color: @fff;
        border: 1px solid #EBEEF5;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
        border-radius: 3px;
        .m-title{
          height: 60px;
          line-height: 60px;
          padding: 0 20px;
          display: block;
          border-bottom: 1px solid @EBEEF5;
        }
        .log-content{
          height: 342px;
          padding: 25px;
          color:@6C757D;
          font-size: 16px;
          .line{
            display: block;
            padding-top: 22px;
            margin-bottom: 22px;
            border-bottom: 1px solid @EBEEF5;
          }
          .circle{
            padding-left:35px;
            &::after{
              content: '';
              display: block;
              width: 5px;
              height: 5px;
              left:20px;
              top: 11px;
              position: absolute;
              background-color: #6C757D;
              border-radius: 50%;
            }
          }
          .triangle{
            padding-left: 20px;
            &::after{
              content: '▸';
              display: block;
              left: 0;
              top: 0;
              position: absolute;
            }
          }
          li{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            width: 100%;
            line-height: 25px;
            position: relative;
            &:hover{
              cursor: pointer;
              opacity: .8;
            }
            &:active{
              opacity: 1;
            }
          }
          .title{
            height: 40px;
            font-weight: bold;
            display: block;
          }
        }
      }
    }
  }
</style>
