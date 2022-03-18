<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <div class="drag-top c-l">
        <h1 class="step-num"><span class="num">1</span><span class="txt">场景信息</span></h1>
        <!-- <div class="search-top"> -->
        <div class="s-col"><span class="s-txt">名称：</span><el-input class="w-saml" v-model="postForm.name" size="medium" @input="setName" placeholder="首页"></el-input></div><!--disabled="disabled"-->
        <div class="s-col"><span class="s-txt">服务状态：</span>
          <el-select class="w-saml" v-model="postForm.status" @change="statusClcik" size="medium" placeholder="请选择">
              <el-option v-for="item in dataList.sceneStatus" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="s-col"><span class="s-txt">权限控制：</span>
          <el-select class="w-saml" v-model="postForm.visitor_type" @change="visitorLimitTypeCheck" size="medium" placeholder="请选择">
              <el-option v-for="item in dataList.visitorLimitType" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="s-col"><span class="s-txt">用户类型：</span>
        <el-select v-model="user_check_list" @change="userClcik" size="medium" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in userType" :key="item.value" :label="item.key" :value="item"></el-option>
        </el-select>
        </div>
        <el-button class="default-btn-border" icon="iconfont el-icon-vip-gaojishezhi" size="medium" @click="hfShow()">高级设置</el-button>
        <!-- <div class="s-r-btns">
          <el-button icon="el-icon-download" size="medium">复制链接</el-button>
          <el-button class="default-btn-border" icon="el-icon-download" type="primary" size="medium">保存</el-button>
          <el-button class="default-btn-border" icon="el-icon-download" type="primary" size="medium">预览</el-button>
        </div> -->
        <el-button class="default-btn-border s-r-f-r" icon="iconfont el-icon-vip-baocun1" type="primary" size="medium" @click="saveClick()">保存</el-button>
        <el-button class="default-btn-border s-r-f-r" icon="iconfont el-icon-vip-yulan-1" type="primary" size="medium" @click="scenePreview()">预览</el-button>
        <el-button icon="iconfont el-icon-vip-fuzhi" size="medium" class="s-r-f-r" v-if="this.$route.query.scene" @click="copyURL()">复制链接</el-button>
        <!-- </div> -->
    </div><!--顶部条件筛选 end-->
    <header_footer @hfHide="hfHide" :head_fot_data="head_fot_data" @setHFooter="setHFooter" v-if="header_footer_show"></header_footer>
  </div>
</template>

<script>
import header_footer from "../../common/head_foter";
export default {
  name: 'index',
  props:['dataList'],
  components:{header_footer},
  data () {
    return {
      header_footer_show:false,
      head_fot_data:{footerTemplate:{},headerTemplate:{}},
      postForm:{
        name:'',
        user_type:[],
        visitUrl:'',
      },
      userType: [],
      user_check_list: [],//用户类型
    }
  },
  mounted(){
    // console.log(this.dataList);
  },
  methods:{
    //设置详情
    setDatils(val){
      this.head_fot_data={
        footerTemplate:val.footerTemplate,
        headerTemplate:val.headerTemplate,
      }
      this.postForm.name = val.name;//名称
      this.postForm.status = val.status;//服务状态
      this.postForm.sceneUsers = val.sceneUsers;//用户类型
      this.postForm.visitor_type = val.visitorLimitType;//权限控制
      this.postForm.visitUrl = val.visitUrl;//地址复制
      this.$forceUpdate();
    },
    //复制url
    copyURL(){
      // if(window.clipboardData){
      //   window.clipboardData.setData("Text",this.postForm.visitUrl);
      //   this.$message({message: '复制成功',type:'info'});
      // }else{
      //   window.prompt("请按Ctrl+C复制", this.postForm.visitUrl);
      // }
      window.prompt("请按Ctrl+C复制", this.postForm.visitUrl);
    },
    //名称输入事件
    setName(val){
      this.$emit('setName',val);
    },
    //状态选择
    statusClcik(val){
      this.$emit('topCheck',this.postForm);
    },
    //用户类型
    userClcik(val){
      var list = [];
      if(val.length>0){
        val.forEach(item=>{
          list.push({
            sceneId:this.$route.query.id,
            userSetId:item.value,
          });
        })
      }
      this.postForm.user_type = list;
      this.$emit('topCheck',this.postForm);
    },
    //权限控制选择
    visitorLimitTypeCheck(val){
      this.$emit('topCheck',this.postForm);
      this.getUserType(val);
    },
    //获取用户类型
    getUserType(id){
      this.http.getPlain_url('dictionary-by-type','/'+id).then(res=>{
        this.userType = res.data||[];
        if(this.userType.length>0){
          this.postForm.user_type = this.userType[0].value;
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    //设置头部底部
    setHFooter(val){
      this.$emit('setHFooter',val);
    },
    //隐藏头部尾部
    hfHide(){
      this.header_footer_show = false;
    },
    //显示头部尾部
    hfShow(){
      this.header_footer_show = true;
    },
    //保存
    saveClick(){
      this.$emit('saveClick');
    },
    //预览
    scenePreview(){
      this.$emit('scenePreview');
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";
/*****顶部 */
.drag-top{
  width: 100%;
  min-height:64px;
  background: @fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  z-index: 7;
  position: relative;
  padding: 0 20px;
  .step-num{
    height: 100%;
    line-height: 60px;
  }
  .s-col{
    display: inline-block;
    margin-left: 30px;
    .s-txt{
      color: @34395E;
      font-style: 14px;
    }
    .w-saml{
      width: 136px;
    }
  }
  .default-btn-border{
    height: 36px !important;
    margin-left: 10px
  }
  .s-r-btns{
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .s-r-f-r{
    float: right;
    margin-top: 13px;
  }
}
</style>
