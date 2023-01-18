<!---服务中台-服务总览-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'服务总览'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <div class="s-w c-l">
            <span class="admin-m-title"><i class="iconfont el-icon-vip-moren"></i>PC门户端</span>
            <span class="d-title">所有场景：</span>
            <el-button :type="IsSystemScene==1?'primary':''" size="medium"  @click="IsSystemSceneClick(1)">默认</el-button>
            <el-button :type="IsSystemScene==0?'primary':''" size="medium" @click="IsSystemSceneClick(0)">自定义</el-button>
            <span class="d-title">所有状态：</span>
            <el-button :type="Status==0?'primary':''" size="medium" @click="statusClick(0)">启用</el-button>
            <el-button :type="Status==1?'primary':''" size="medium" @click="statusClick(1)">禁用</el-button>
            <el-button size="medium" icon="iconfont el-icon-vip-tianjia" class="r-btn" @click="addClick()" v-if="$authShowBtn('scene-manage_add')">新建场景</el-button>
          </div>
        </div><!---顶部查询板块 end--->
        <div class="list-content" v-loading="loading" :class="!loading && listData.length==0?'empty-data-admin':''">
          <div class="row">
            <div class="row-list c-l">
              <div class="row-box set-hover" v-for="i in listData" :key="i">
                <div class="r-box-bg">
                  <i class="iconfont el-icon-vip-shouye home-icon" v-if="i.isDefaultIndex"></i>
                  <img :src="fileUrl+i.cover" @click="editClick(i)"/>
                  <span class="name">{{i.name}}
                  <el-popover popper-class="service-popover" placement="bottom-start" width="170" v-model="visible">
                    <i class="iconfont el-icon-vip-shezhi" slot="reference"></i>
                    <ul class="hover-menu">
                      <li @click="editClick(i)" v-if="$authShowBtn('scene-manage_edit')"><i class="iconfont el-icon-vip-bianji"></i><span>修改</span></li>
                      <li @click="delClick(i)" v-if="!i.isSystemScene && $authShowBtn('scene-manage_delete')"><i class="iconfont el-icon-vip-shanchu-1"></i><span>删除</span></li>
                      <li @click="previewClick(i)" v-if="$authShowBtn('scene-manage_preview')"><i class="iconfont el-icon-vip-yulan"></i><span>预览</span></li>
                      <li @click="disableClick(i)" v-if="$authShowBtn('scene-manage_disable')"><i class="iconfont" :class="i.status==1?'el-icon-vip-off-min':'el-icon-vip-on-min'"></i><span>{{i.status==1?'启用':'禁用'}}</span></li>
                      <li @click="setDefalutHome(i)" v-if="!i.isSystemScene&&!i.isDefaultIndex"><i class="iconfont iconfont el-icon-vip-shouye"></i><span>设置为首页</span></li>
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
import footerPage from "@/views/admin/common/footer";
import breadcrumb from "@/views/admin/common/breadcrumb";
import serviceLMenu from "@/views/admin/common/serviceLMenu";
import paging from "@/views/admin/common/paging";
export default {
  name: 'index',
  components:{footerPage,serviceLMenu,breadcrumb,paging},
  data () {
    return {
      loading:true,
      Status:null,//启用，禁用
      IsSystemScene:null,//是否默认场景
      defalut_img:require('../../../assets/admin/img/upload/s1.png'),
      fileUrl:window.localStorage.getItem('fileUrl'),
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
    // 分页 页面修改
    pageChange(data) {
      this.pageData[data.key] = data.value;
      this.initData();
    },
    initData(){
      this.initPageData();
      var pars = 'PageSize='+this.pageData.pageSize+"&PageIndex="+this.pageData.pageIndex;
      if(this.Status || this.Status == 0){
        pars = pars+"&Status="+this.Status;
      }
      if(this.IsSystemScene || this.IsSystemScene==0){
        pars = pars+"&IsSystemScene="+this.IsSystemScene;
      }
      if(this.postForm.TerminalId){
        pars = pars + "&TerminalId="+this.postForm.TerminalId;
      }
      this.http.getPlain('scene-list-by-terminal-id',pars).then(res=>{
        this.loading = false;
        this.listData = res.data.items||[];
        this.pageData.totalCount = res.data.totalCount;
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })
    },
    initPageData(){
      this.pageData = {
        pageIndex:this.pageData.pageIndex,
        pageSize:this.pageData.pageSize,
      }
    },
    addClick(){
      this.$router.push('/admin_sceneManage');
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
    //编辑场景 tid:终端id，type：终端类型 ，id:场景id
    editClick(val){
      if(this.$authShowBtn('scene-manage_edit')){
        this.$router.push({path:'admin_sceneSet',query: {tid:val.id,type:this.$route.query.type,id:val.id}});
      }else{
        this.previewClick(val);
      }
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
    //设置为默认首页
    setDefalutHome(val){
      this.http.postPlain('set-default-index-page',{terminalId:val.terminalId,scenegroupid:val.id}).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    //禁用-启用 场景
    disableClick(val){
      var _this = this;
      var txt ='';
      if(val.status==1){//当前禁用，执行启用
        txt = '是否确定启用该场景？';
      }else{
        txt = '禁用后用户无法再访问该场景，是否继续？'
      }
      this.$confirm(txt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.http.putPlain('change-scene-status','/'+val.id+'/'+(val.status==1?'0':'1')).then(res=>{ 
          _this.$message({type: 'success',message: '操作成功!'});
          _this.initData();
        }).catch(err=>{
            _this.$message({type: 'error',message: '操作失败'});   
        })
      }).catch(() => {
        this.$message({type: 'info',message: '已取消操作'});          
      });
    },
    //预览场景
    previewClick(val){
      this.http.getPlain_url('scene-detail','/'+val.id).then(res=>{
        window.localStorage.setItem('scenePreview',JSON.stringify(res.data));
        var url = location.href.split('#')[0] + "#/admin_preview";
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
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/case/case.less";
.row-list{
  max-height: inherit !important;
}
</style>
