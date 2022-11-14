<!--标题组件弹窗-背景，标题，颜色选择，提示：默认跟随主题色 -->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="标题组件设置" :visible.sync="dialogBulk" width="630px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form label-width="90px" class="admin-form">
        <div class="form-set-content">
          <el-form-item label="更换背景" prop="logo">
            <div class="up-img w100" :style="{'background-image':'url('+(postForm.bgimg?(fileUrl+postForm.bgimg):'')+')'}">
              <div><img src="@/assets/admin/img/icon-upload.png" /><span>背景更换</span></div>
              <input type="file" :id="'file_bg'" multiple="multiple" @change="handleFileJS($event)">
              <i class="del-img iconfont el-icon-vip-shanchu-1" @click="delBGImg()"></i>
            </div>
          </el-form-item>
          <el-form-item label="主标题" prop="name" class="title-row">
            <el-input v-model="postForm.mtitle" placeholder="请输入主标题" maxlength="10" minlength="0" show-word-limit></el-input>
            <el-color-picker v-model="postForm.mcolor" size="small"></el-color-picker>
          </el-form-item>
          <el-form-item label="副标题" prop="name" class="title-row">
            <el-input v-model="postForm.stitle" placeholder="请输入副标题" maxlength="10" minlength="0" show-word-limit></el-input>
            <el-color-picker v-model="postForm.scolor" size="small"></el-color-picker>
          </el-form-item>
          <el-form-item class="m-center">
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm()">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: 'index',
  props: ['data'],
  mounted() {
    console.log(this.data);
    if(this.data && this.data!='{}'){
      this.postForm = JSON.parse(this.data.replace(/'/g, '"'));
    }
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      dialogBulk:true,
      postForm: {
        bgimg: '',
        mtitle:'',
        mcolor:'',
        stitle:'',
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
    //文件上传
    handleFileJS(e) {
      var _this = this;
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      if (!file) {
        return
      }
      let formData = new FormData()
      formData.append('files', file)
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG' && file.type !== 'image/gif') {
        this.$message({ type: 'error', message: '请上传图片文件!' });
        return;
      }
      this.http.postFile("UploadFile", formData).then((res) => {
        this.postForm.bgimg = res.data[0] || '';
      }).catch((err) => {
        this.$message({ type: 'error', message: '上传失败!' });
      });
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
    right: 45px;
  }
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


