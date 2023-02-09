<!--标题组件弹窗-背景，标题，颜色选择，提示：默认跟随主题色 -->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="标题组件设置" :visible.sync="dialogBulk" width="630px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form label-width="90px" class="admin-form">
        <div class="form-set-content">
          <el-form-item label="更换背景" prop="logo">
            <div class="up-img w100" :style="{'background-image':'url('+(postForm.bgimg?(fileUrl+postForm.bgimg):'')+')'}">
              <div><img src="@/assets/admin/img/icon-upload.png" /><span>背景更换</span></div>
              <input type="file" :id="'file_bg'" multiple="multiple" @change="$fileUpload($event,'img','titleDialog')">
              <i class="del-img iconfont el-icon-vip-shanchu-1" @click="delBGImg()"></i>
            </div>
          </el-form-item>
          <el-form-item label="主标题" prop="name" class="title-row">
            <el-input v-model="postForm.mtitle" placeholder="请输入主标题" maxlength="10" minlength="0" show-word-limit></el-input>
            <el-color-picker v-model="postForm.mcolor" size="small"></el-color-picker>
            <!-- <el-select class="f-size-input" size="small" v-model="postForm.mfsize" placeholder="14px">
              <el-option v-for="item in fonts" :key="item" :label="item" :value="item"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="副标题" prop="name" class="title-row">
            <el-input v-model="postForm.stitle" placeholder="请输入副标题" maxlength="10" minlength="0" show-word-limit></el-input>
            <el-color-picker v-model="postForm.scolor" size="small"></el-color-picker>
            <!-- <el-select class="f-size-input" size="small" v-model="postForm.sfsize" placeholder="12px">
              <el-option v-for="item in fonts" :key="item" :label="item" :value="item"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item class="m-center">
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm()">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
/***字体设置 */
// .f-size-input{
//   position: absolute;
//   right:40px;
//   /deep/.el-input--small .el-input__inner{
//     padding-right: 0;
//     padding-left:2px;
//     width: 35px;
//   }
//   /deep/.el-input__suffix{
//     display: none;
//   }
// }
</style>

<script>
export default {
  name: 'index',
  props: ['data'],
  mounted() {
    var _this = this;
    if(this.data && this.data!='{}'){
      this.postForm = JSON.parse(this.data.replace(/'/g, '"'));
    }
    this.bus.$on("getUpladFile",(res)=>{
      switch (res.key) {
        case 'titleDialog': _this.postForm.bgimg = res.url || ''; break;
      }
      this.$forceUpdate();
    })
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      dialogBulk:true,
      // fonts: ['12px','14px','16px','18px','20px','22px','24px','26px','28px','30px','36px','40px','50px','60px'],
      postForm: {
        fontsize:'14px',
        bgimg: '',
        mtitle:'',
        mfsize:'14px',
        mcolor:'',
        stitle:'',
        sfsize:'12px',
        scolor:'',
      },
    }
  },
  methods: {
    /****保存设置信息*******/
    submitForm() {
      this.$emit('closeCommon',{data:this.postForm,type:'title',saveORclose:'save'});
    },
    //删除背景
    delBGImg() {
      this.postForm.bgimg = '';
    },
    /***x关闭按钮 **/
    handleClose(done) {
      this.$emit('closeCommon',{data:this.postForm,type:'title',saveORclose:'close'});
      done();
    },
  },
}
</script>
<style lang="less" scoped>
@import "~@/assets/admin/css/color.less";
@import "~@/assets/admin/css/form.less";
@import "../model.less";
.title-row{
  position: relative;
  /deep/.el-input__suffix{
    right:45px;
  }
  // 设置标题组件字体大小
  // /deep/.el-input__suffix{
  //   right:80px;
  // }
  .el-color-picker{
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 9;
    background: #fff;
  }
}
.up-btn {
  cursor: pointer;
  position: relative;
  width: 80px;
  height: 38px;

  span,
  input {
    position: absolute;
    width: 80px;
    height: 100%;
    top: 0;
    left: 0;
  }

  input {
    cursor: pointer;
    z-index: 2;
    opacity: 0;
  }

  span {
    cursor: pointer;
    line-height: 38px;
    text-align: center;
    z-index: 1;
  }
}
.up-img{
  margin-left: 0 !important;
  span{
    line-height: 14px !important;
  }
}
</style>


