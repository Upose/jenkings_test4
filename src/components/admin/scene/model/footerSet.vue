<!--底部设置
富文本编辑，html编辑，背景更换，绑定栏目
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="底部高级设置" :visible.sync="dialogBulk" width="800px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
        <el-form-item label="更换背景" prop="logo">
          <div class="up-img-form-item">
            <div class="up-img-warp" v-if="postForm_fot.logo">
              <img :src="fileUrl+postForm_fot.logo">
            </div>
            <div class="up-img-warp up-icon" @click="upImg()">
              <span>上传背景图</span>
            </div>
          </div>
        </el-form-item>
        <div class="form-set-content">
          <el-form-item label="底部信息" prop="defaultTemplate">
            <textarea id="mytextarea" v-model="postForm_fot.content"></textarea>
          </el-form-item>
          <el-form-item class="m-center">
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitFormFot()">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog append-to-body title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleCloseImg">
      <UpdateImg @imgUrl="imgUrl" :imgWidth="280" :imgHeight="80"></UpdateImg>
    </el-dialog>
  </div>
</template>


<script>
import UpdateImg from "@/components/admin/common/UpdateImg";
export default {
  name: 'index',
  props:[],
  components: { UpdateImg },
  beforeDestroy() {
    // 销毁组件前销毁编辑器
    window.tinymce.get('mytextarea').destroy();
  },
  mounted(){
    //tinymce 编辑器
    setTimeout(() => {
      tinymce.init({
        selector: '#mytextarea',
        language: 'zh_CN',
        height: 400,
        plugins: 'image',
        // toolbar: 'code bullist numlist emoticons charmap hr insertdatetime link | help fullscreen image', 
        plugins: 'image,wordcount,charmap,code,hr,lists,advlist,emoticons,fullscreen,help,insertdatetime,link',
        images_upload_handler: (blobInfo, success, failure) => { // 图片上传
          console.log(blobInfo, success, failure);
          this.handleImgUpload(blobInfo, success, failure)
        }
      });
      tinymce.activeEditor.on('paste', function(e) {
        setTimeout(() => {
          var html = null;
          e.path.forEach(item=>{
            if(item.tagName == 'body' || item.tagName=='BODY'){
              html = item.innerHTML;
              var img_data = [];
              html.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
                img_data.push(capture);
              });
              _this.img_list = img_data;
              console.log(img_data);
            }
          })
        }, 50);
      });
    }, 100);
    
    // tinymce.activeEditor.setContent(this.postForm.content)
    // tinyMCE.activeEditor.getContent()||'';//获取富文本信息
  },
  data() {
    return {
      dialogBulk:true,//模板选择
      dialogUPimg: false,//图片上传
      postForm_fot:{},
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  methods: {
    //打开图标上传弹窗
    upImg() {
      this.dialogUPimg = true;
    },
    //获取图片上传返回地址
    imgUrl(val) {
      this.postForm_fot['logo'] = val[0];
      this.dialogUPimg = false;
    },
    //图片上传-弹窗关闭
    handleCloseImg(done) {
      done();
    },
    /****保存底部设置信息*******/
    submitFormFot() {
      this.http.postJson('foot-template-settings-update', this.postForm_fot).then(res => {
        this.$message({ type: 'success', message: '保存成功!' });
        this.postForm_fot = {};
        this.fot_dialogBulk = false;
      }).catch(err => {
        this.$message({ type: 'error', message: '保存失败!' });
      })
    },
    /***x关闭按钮 **/
    handleClose(done) {
      this.$emit('hfHide');
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
@import "../../../../assets/admin/css/form.less";
/***js路径 */
.input-btns {
    width: 100% !important;

    .el-input-group {
        width: calc(100% - 40px) !important;
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
</style>