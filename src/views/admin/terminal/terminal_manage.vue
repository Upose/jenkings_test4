<!---服务中台-终端管理-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="3"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'终端管理'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <h1 class="s-b-border-title">终端管理</h1>
        <div class="content">
          <div class="s-w">
            <span class="admin-m-title"><i class="iconfont el-icon-vip-moren"></i>已配置终端列表</span>
            <el-button size="medium" icon="iconfont el-icon-vip-tianjia" class="r-btn" v-if="$authShowBtn('terminal_add')" @click="addClick('add','')">新增终端</el-button>
          </div>
        </div><!---顶部查询板块 end--->
        <div class="list-content" v-loading="loading" :class="!loading && dataList.length==0?'empty-data-admin':''">
          <div class="row">
            <div class="row-list c-l">
              <div class="row-box set-hover" v-for="i in dataList" :key="i">
                <div class="r-box-bg">
                  <!-- <img src="@/assets/admin/img/upload/s1.png"/> -->
                  <div class="box-bg cursor" @click="addClick('edit',i)" :class="bgColor(i.terminalType)"><img :src="fileUrl+i.icon"/></div>
                  <span class="name">{{i.name||'暂无'}}
                  <el-popover popper-class="service-popover" placement="bottom-start" width="160" v-model="visible" v-if="$authShowBtn('terminal_edit') || (!i.isSystemInstance && $authShowBtn('terminal_delete'))">
                    <i class="iconfont el-icon-vip-shezhi" slot="reference"></i>
                    <ul class="hover-menu">
                      <li @click="addClick('edit',i)" v-if="$authShowBtn('terminal_edit')"><i class="iconfont el-icon-vip-bianji"></i><span>编辑</span></li>
                      <li @click="delClick(i)" v-if="!i.isSystemInstance && $authShowBtn('terminal_delete')"><i class="iconfont el-icon-vip-shanchu-1"></i><span>删除</span></li>
                    </ul>
                  </el-popover>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div><!----已配置终端列表 end-->
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footerPage from "@/views/admin/common/footer";
import breadcrumb from "@/views/admin/common/breadcrumb";
import serviceLMenu from "@/views/admin/common/serviceLMenu";
export default {
  name: 'index',
  components:{footerPage,serviceLMenu,breadcrumb},
  data () {
    return {
      loading:true,
      fileUrl:window.localStorage.getItem('fileUrl'),
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
          this.loading = false;
      }).catch(err=>{
        this.loading = false;
      })
    },
    addClick(type,val){
      if(type == 'add'){
        this.$router.push('/admin_terminalAdd')
      }else{
        if(this.$authShowBtn('terminal_edit')){
          this.$router.push({path:'/admin_terminalAdd',query:{id:val.id}})
        }
      }
    },
    delClick(val){
      var hint_txt = '该终端下没有配置场景，确认是否删除？';
      if(val.sceneCount && val.sceneCount>0){
        hint_txt = '该终端下配置有'+val.sceneCount+'个场景，删除终端会同时删除场景，确认是否删除？';
      }
      this.$confirm(hint_txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.deleteJsonSelf('terminal-instance-del','/'+val.id).then(res=>{
          this.$message({type: 'success',message: '删除成功!'});
          this.initData();
        }).catch(err=>{
          this.$message({type: 'success',message: '删除失败!'});
        })
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});          
      });
    },
    bgColor(type){
      if(type == 4){
        //移动端
        return 'adaptive';
      }else if(type == 1){
        //pc
        return 'pc';
      }else if(type == 5){
        //大屏
        return 'big';
      }else{
        return 'app'
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
  /****查询条件板块****/
  .content{
    background-color: @m-col-b0;
    margin-top: 24px;
    border-radius:4px 4px 0 0;
  }
  .s-w{
      min-height: 60px;
      line-height: 57px;
      padding: 0 20px;
      border-bottom: 1px solid @ph-col-n3;
      .r-btn{
        float: right;
        margin-top: 14px;
      }
    }
    /***内容板块***/
  .list-content{
    min-height: 300px;
    background-color: @m-col-b0;
    border-radius: 0 0 4px 4px;
    .row{
      padding: 10px;
      .title{
        color: @ph-col-n12;
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
          background-color: @m-col-b9;
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
          .box-bg{
            width: 100%;
            height: 178px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px 5px 0px 0px;
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
        span.name{
          display: block;
          height: 60px;
          color: @ph-col-n12;
          font-size: 14px;
          line-height: 60px;
          text-align: center;
          position: relative;
          border-radius: 0px 0px 3px 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 10px;
        }
      }
      /***移入显示设置按钮**/
      .set-hover{
        i{
          cursor: pointer;
          display: none;
          position: absolute;
          background: @m-col-b2;
          height: 44px;
          width: 44px;
          right: 5px;
          top: 10px;
          line-height: 44px;
          border-radius: 50%;
          font-size: 15px;
          &:active{
            color: @m-col-b7;
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
  /**pc */
  .pc{
    background: #E5F1FF;
  }
  /**app */
  .app{
    background: #FFEDE4;
  }
  /**大屏 */
  .big{
    background: #E5F8F7;
  }
  /**自适应 */
  .adaptive{
    background: #F2F0FF;
  }
</style>
