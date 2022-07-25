<!--底部设置
富文本编辑，html编辑，背景更换，绑定栏目
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="底部高级设置" :visible.sync="dialogBulk" width="800px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form label-width="70px" class="admin-form">
        <el-form-item label="更换背景" prop="logo">
            <div class="up-img w100" :style="{'background-image':'url('+fileUrl+(postForm_fot.footerBgImg||'')+')'}">
              <div><img src="@/assets/admin/img/icon-upload.png"/><span>背景更换</span></div>
              <input type="file" :id="'file_bg'" multiple="multiple" @change="handleFileJS">
            </div>
          </el-form-item>
        <el-form-item label="展示栏目">
          <div class="btns-colse-warp">
            <div class="btns-select-row" v-for="(it,i) in coumn_list" :key="i+'b'">
              <el-select v-model="it.value" placeholder="请选择栏目">
                <el-option :label="item.key" :value="item.value" v-for="(item,i) in coumn_data_list" :key="i+'coumn'">{{item.key||'无'}}</el-option>
              </el-select>
              <div class="btns-el-btn" @click="removeCoumn1(i)" v-if="(coumn_list.length-1)!=i">
                <i class="iconfont el-icon-vip-jianhao1"></i>
                <span>删除</span>
              </div>
              <div class="btns-el-btn" @click="addCoumn1" v-if="(coumn_list.length-1)==i">
                <i class="iconfont el-icon-vip-tianjia1"></i>
                <span>添加</span>
              </div>
            </div>
          </div>
          <!-- <p class="hint">栏目展示在顶部</p> -->
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
  props: ['postForm'],
  components: { UpdateImg },
  beforeDestroy() {
    window.tinymce.get('mytextarea').destroy();// 销毁组件前销毁编辑器
  },
  created() {
    this.http.getPlain('nav-column-list', '').then(res => {
      this.coumn_data_list = res.data || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
  },
  mounted() {
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
      tinymce.activeEditor.on('paste', function (e) {
        setTimeout(() => {
          var html = null;
          e.path.forEach(item => {
            if (item.tagName == 'body' || item.tagName == 'BODY') {
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
      fileUrl: window.localStorage.getItem('fileUrl'),
      dialogBulk: true,//模板选择
      dialogUPimg: false,//图片上传
      postForm_fot: {
        footerBgImg:'',//背景图片
        footerDisplayNavColumn:[],//栏目列表
        content:'',
      },
      coumn_data_list: [],//栏目下拉选择列表
      coumn_list: [{ value: '' }],//新增删除栏目列表
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
    //删除多栏目投递
    removeCoumn1(index) {
      this.coumn_list.splice(index, 1);
    },
    //添加多栏目投递
    addCoumn1() {
      if(this.coumn_list.length==3)return;
      this.coumn_list.push({ value: '' });
    },
    /****保存底部设置信息*******/
    submitFormFot() {
      this.postForm_fot.footerDisplayNavColumn = [];
      this.coumn_list.forEach(item => {
        if (item.value) this.postForm_fot.footerDisplayNavColumn.push(item.value)
      })
      this.postForm.footerTemplate.content = tinyMCE.activeEditor.getContent()||'';
      this.postForm.footerTemplate.footerBgImg = this.postForm_fot.footerBgImg||'';
      this.postForm.footerTemplate.footerDisplayNavColumn = this.postForm_fot.footerDisplayNavColumn||[];
      this.$emit('hfHide');
    },
    /***x关闭按钮 **/
    handleClose(done) {
      this.$emit('hfHide');
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
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG'&& file.type !== 'image/gif') {
        this.$message({ type: 'error', message: '请上传图片文件!' });
        return;
      }
      this.http.postFile("UploadFile", formData).then((res) => {
        this.postForm_fot.footerBgImg = res.data[0]||'';
      }).catch((err) => {
        this.$message({ type: 'error', message: '上传失败!' });
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
@import "../../../../assets/admin/css/form.less";
@import "./model.less";
/***js路径 */
.input-btns {
  width: 100% !important;

  .el-input-group {
    width: calc(100% - 40px) !important;
  }
}
.btns-colse-warp {
  width: 690px !important;
}
.el-select {
  width: 613px !important;
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