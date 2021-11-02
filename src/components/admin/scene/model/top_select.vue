<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <div class="drag-top c-l">
        <h1 class="step-num"><span class="num">1</span><span class="txt">场景信息</span></h1>
        <!-- <div class="search-top"> -->
        <div class="s-col"><span class="s-txt">电脑门户：</span><el-input class="w-saml" v-model="dataList.title" disabled="disabled" size="medium" placeholder="首页"></el-input></div>
        <div class="s-col"><span class="s-txt">服务状态：</span>
          <el-select class="w-saml" v-model="postForm.status" size="medium" placeholder="请选择">
              <el-option v-for="item in dataList.sceneStatus" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="s-col"><span class="s-txt">权限控制：</span>
          <el-select class="w-saml" v-model="postForm.visitor_type" @change="visitorLimitTypeCheck" size="medium" placeholder="请选择">
              <el-option v-for="item in dataList.visitorLimitType" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="s-col"><span class="s-txt">用户类型：</span>
          <el-select class="w-saml" v-model="postForm.user_type" size="medium" placeholder="请选择">
              <el-option v-for="item in userType" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button class="default-btn-border" icon="el-icon-setting" size="medium">高级设置</el-button>
        <!-- <div class="s-r-btns">
          <el-button icon="el-icon-download" size="medium">复制链接</el-button>
          <el-button class="default-btn-border" icon="el-icon-download" type="primary" size="medium">保存</el-button>
          <el-button class="default-btn-border" icon="el-icon-download" type="primary" size="medium">预览</el-button>
        </div> -->
        <el-button class="default-btn-border s-r-f-r" icon="el-icon-download" type="primary" size="medium" @click="saveClick()">保存</el-button>
        <el-button class="default-btn-border s-r-f-r" icon="el-icon-download" type="primary" size="medium">预览</el-button>
        <el-button icon="el-icon-download" size="medium" class="s-r-f-r">复制链接</el-button>
        <!-- </div> -->
    </div><!--顶部条件筛选 end-->
  </div>
</template>

<script>
export default {
  name: 'index',
  props:['dataList'],
  data () {
    return {
      postForm:{},
      userType: [],
    }
  },
  mounted(){
    // console.log(this.dataList);
  },
  methods:{
    //权限控制选择
    visitorLimitTypeCheck(val){
      console.log(val);
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
    //保存
    saveClick(){
      this.$emit('saveClick');
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
