<!---服务中台-服务总览-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="1"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'服务总览'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <div class="s-w c-l">
            <span class="admin-m-title"><i class="iconfont el-icon-vip-moren"></i>已使用场景</span>
            <span class="d-title">所有场景：</span>
            <el-button :type="IsSystemScene==1?'primary':''" size="medium"  @click="IsSystemSceneClick(1)">默认</el-button>
            <el-button :type="IsSystemScene==0?'primary':''" size="medium" @click="IsSystemSceneClick(0)">自定义</el-button>
            <span class="d-title">所有状态：</span>
            <el-button :type="Status==0?'primary':''" size="medium" @click="statusClick(0)">启用</el-button>
            <el-button :type="Status==1?'primary':''" size="medium" @click="statusClick(1)">禁用</el-button>
            <el-button size="medium" icon="iconfont el-icon-vip-tianjia" class="r-btn" @click="addClick()" v-if="$authShowBtn('scene-manage_add')">新建场景</el-button>
          </div>
        </div><!---顶部查询板块 end--->
        <div class="list-content" v-loading="loading" :class="!loading && dataList.length==0?'empty-data-admin':''">
          <div class="row" v-for="(item,index) in dataList" :key="index" v-if="(item.sceneList||[]).length>0">
            <div class="title">{{item.terminalName||''}}
              <span class="more-r" @click="moreClick(item)">更多<i class="el-icon-arrow-right"></i></span>
            </div>
            <div class="row-list c-l" :class="!loading && (item.sceneList||[]).length==0?'empty-data-admin':''">
              <div class="row-box set-hover" v-for="i in (item.sceneList||[])":key="i+'a'">
                <div class="r-box-bg">
                  <img :src="fileUrl+i.cover" @click="editClick(i,item)"/>
                  <i class="iconfont el-icon-vip-shouye home-icon" v-if="i.isDefaultIndex"></i>
                  <span class="name">{{i.name}}
                  <el-popover popper-class="service-popover" placement="bottom-start" width="170" v-model="visible">
                    <i class="iconfont el-icon-vip-shezhi" slot="reference"></i>
                    <ul class="hover-menu">
                      <li @click="editClick(i,item)" v-if="$authShowBtn('scene-manage_edit')"><i class="iconfont el-icon-vip-bianji"></i><span>修改</span></li>
                      <li @click="delClick(i)" v-if="!i.isSystemScene && $authShowBtn('scene-manage_delete')"><i class="iconfont el-icon-vip-shanchu-1"></i><span>删除</span></li>
                      <li @click="previewClick(i)" v-if="$authShowBtn('scene-manage_preview')"><i class="iconfont el-icon-vip-yulan"></i><span>预览</span></li>
                      <li @click="disableClick(i)" v-if="$authShowBtn('scene-manage_disable')"><i class="iconfont" :class="i.status==1?'el-icon-vip-off-min':'el-icon-vip-on-min'"></i><span>{{i.status==1?'启用':'禁用'}}</span></li>
                      <li @click="setDefalutHome(i)" v-if="$authShowBtn('set_default')&&!i.isSystemScene&&!i.isDefaultIndex"><i class="iconfont el-icon-vip-shouye"></i><span>设置为首页</span></li>
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
              <h1 class="admin-m-title">
                <i class="iconfont el-icon-vip-moren"></i>推荐场景
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
              <h1 class="admin-m-title">
                <i class="iconfont el-icon-vip-moren"></i>更新日志
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
              <h1 class="admin-m-title">
                <i class="iconfont el-icon-vip-moren"></i>注意事项
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
import footerPage from "@/views/admin/common/footer";
import breadcrumb from "@/views/admin/common/breadcrumb";
import serviceLMenu from "@/views/admin/common/serviceLMenu";
export default {
  name: 'index',
  components:{footerPage,serviceLMenu,breadcrumb},
  data () {
    return {
      loading:true,
      Status:null,//启用，禁用
      IsSystemScene:null,//是否默认场景
      defalut_img:require('../../../assets/admin/img/upload/s1.png'),
      fileUrl:window.localStorage.getItem('fileUrl'),
      dataList:[],//列表
    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    initData(){
      var pars = '?TopCount=30';
      if(this.Status || this.Status == 0){
        pars = pars+"&Status="+this.Status;
      }
      if(this.IsSystemScene || this.IsSystemScene==0){
        pars = pars+"&IsSystemScene="+this.IsSystemScene;
      }
      this.http.getJsonSelf('scene-overview',pars).then(res=>{ 
        this.loading = false;
        this.dataList = res.data||[];
      }).catch(err=>{
        this.loading = false;
          console.log(err);
      })
    },
    addClick(){
      this.$router.push('/admin_sceneManage');
    },
    //编辑场景 tid:终端id，type：终端类型 ，id:场景id
    editClick(val,f_val){
      // console.log(val,f_val);
      if(this.$authShowBtn('scene-manage_edit')){
        this.$router.push({path:'admin_sceneSet',query: {tid:f_val.terminalId,type:f_val.terminalType,id:val.id}});
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
    //设置为默认首页
    setDefalutHome(val){
      this.http.postJson('set-default-index-page',{terminalId:val.terminalId,scenegroupid:val.id}).then(res=>{
        this.$message({type: 'success',message: '设置成功!'});
        window.location.reload();
      }).catch(err=>{
        console.log(err);
      })
    },
    //预览场景
    previewClick(val){
      this.http.getPlain_url('scene-detail','/'+val.id).then(res=>{
        window.localStorage.setItem('scenePreview',JSON.stringify(res.data));
        // var url = location.href.split('#')[0] + "#/admin_preview";
        // setTimeout(() => {
        //   window.open(url);
        // }, 50);
        const { href } = this.$router.resolve({path: '/admin_preview'});
        setTimeout(() => {
          window.open(href, '_blank');
        }, 50);

      }).catch(err=>{
        this.$message({type: 'error',message: '获取详情失败'});  
      })
    },
    //更多
    moreClick(val){
      console.log(val);
      this.$router.push({path:'admin_caseList',query:{id:val.terminalId,type:val.terminalType}});
    },
    //日志，通知
    logMore(val){
      this.$router.push({path:'/admin_logList',query:{tag:val}});
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
@import "../../../assets/admin/css/case/case.less";
</style>
