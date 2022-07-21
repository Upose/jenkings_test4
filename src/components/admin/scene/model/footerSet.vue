<!--底部设置
富文本编辑，html编辑，背景更换，绑定栏目
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="底部高级设置" :visible.sync="dialogBulk" width="800px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
        <div class="form-set-content">
          <el-form-item label="底部信息" prop="defaultTemplate">
            <textarea id="mytextarea" v-model="postForm_fot.content"></textarea>
          </el-form-item>
          <el-form-item label="底部信息" prop="defaultTemplate">
            <editor
       api-key="no-api-key"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
           'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
           'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
         ],
         toolbar:
           'undo redo | casechange blocks | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlst checklist outdent indent | removeformat | a11ycheck code table help'
       }"
       initial-value="Welcome to TinyMCE Vue"
     />
          </el-form-item>
          <el-form-item label="JS路径" prop="visitUrl">
            <div class="btns-colse-warp input-btns">
              <div class="btns-select-row" v-for="(it,i) in jsList" :key="i+'b'">
                <el-input v-model="it.value" placeholder="填写js在线地址或点击右侧上传(最多支持3个js文件)">
                  <template slot="append">
                    <div class="up-btn">
                      <span>点击上传</span>
                      <input type="file" :id="'file_'+i" multiple="multiple" @change="handleFileJS">
                    </div>
                  </template>
                </el-input>
                <div class="btns-el-btn" @click="removeCoumn2(i)" v-if="(jsList.length-1)!=i">
                  <i class="iconfont el-icon-vip-jianhao1"></i>
                  <span>删除</span>
                </div>
                <div class="btns-el-btn" @click="addCoumn2" v-if="(jsList.length-1)==i">
                  <i class="iconfont el-icon-vip-tianjia1"></i>
                  <span>添加</span>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="m-center">
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitFormFot()">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: 'index',
  props:[],
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
      jsList:[{}],
      postForm_fot:{},
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  methods: {
    //删除js地址
    removeCoumn2(index) {
      this.jsList.splice(index, 1);
    },
    //添加js地址
    addCoumn2() {
      if (this.jsList.length == 3) {
        this.$message({ type: 'info', message: '只能添加3个js地址!' });
        return;
      }
      this.jsList.push({ value: '' });
    },
    /****保存底部设置信息*******/
    submitFormFot() {
      var list = [];
      this.jsList.forEach(item => {
        if (item.value) list.push(item.value)
      })
      this.postForm_fot.jsPath = list || [];
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
      if (file.type !== 'text/javascript' && file.type !== 'application/javascript' && file.type !== 'JavaScript') {
        this.$message({ type: 'error', message: '请上传js文件!' });
        return;
      }
      var index = parseInt(e.target.id.slice(5, 6));
      this.http.postFile("UploadFile", formData).then((res) => {
        _this.jsList[index].value = _this.fileUrl + res.data[0];
        this.$forceUpdate();
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