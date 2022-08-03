<!--底部设置
富文本编辑，html编辑，背景更换，绑定栏目
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="头部高级设置" :visible.sync="dialogBulk" width="630px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form label-width="90px" class="admin-form">
        <div class="form-set-content">
          <el-form-item label="更换背景" prop="logo">
            <div class="up-img w100" :style="{'background-image':'url('+fileUrl+(postForm_head.headerBgImg||'')+')'}">
              <div><img src="@/assets/admin/img/icon-upload.png"/><span>背景更换</span></div>
              <input type="file" :id="'file_bg'" multiple="multiple" @change="handleFileJS">
              <i class="del-img iconfont el-icon-vip-shanchu-1" @click="delBGImg()"></i>
            </div>
          </el-form-item>
          <el-form-item label="更换LOGO" prop="logo">
            <div class="up-img-form-item">
              <div class="up-img-warp" v-if="postForm_head.logo">
                <img :src="fileUrl+postForm_head.logo">
              </div>
              <div class="up-img-warp up-icon" @click="upImg()">
                <span>上传图标</span>
              </div>
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
          <el-form-item class="m-center">
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitFormHead()">保存</el-button>
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
  components: { UpdateImg },
  props: ['postForm'],
  created(){
    this.http.getPlain('nav-column-list', '').then(res => {
      this.coumn_data_list = res.data || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
  },
  mounted(){
    if(this.postForm.headerTemplate){
      this.postForm_head.logo = this.postForm.headerTemplate.logo||'';
      this.postForm_head.headerBgImg = this.postForm.headerTemplate.headerBgImg||'';
      this.postForm_head.displayNavColumn = this.postForm.headerTemplate.displayNavColumn||[];
      if(this.postForm_head.displayNavColumn.length>0){
        this.coumn_list = [];
        this.postForm_head.displayNavColumn.forEach(it=>{
          this.coumn_list.push({value:it});
        })
      }
    }
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      dialogBulk: true,//模板选择
      dialogUPimg: false,//图片上传
      jsList: [{}],
      coumn_data_list: [],//栏目下拉选择列表
      coumn_list: [{ value: '' }],//新增删除栏目列表
      postForm_head: {
        headerBgImg:'',//头部背景
        displayNavColumn:[],//栏目
        logo:'',//logo
      },//头部表单
    }
  },
  methods: {
    //打开图标上传弹窗
    upImg() {
      this.dialogUPimg = true;
    },
    //获取图片上传返回地址
    imgUrl(val) {
      this.postForm_head['logo'] = val[0];
      this.dialogUPimg = false;
    },
    //图片上传-弹窗关闭
    handleCloseImg(done) {
      done();
    },
    /***x关闭按钮 **/
    handleClose(done) {
      this.$emit('hfHide',false);
    },
    //删除多栏目投递
    removeCoumn1(index) {
      this.coumn_list.splice(index, 1);
    },
    //添加多栏目投递
    addCoumn1() {
      if(this.coumn_list.length==10)return;
      this.coumn_list.push({ value: '' });
    },
    /****保存头部设置信息*******/
    submitFormHead() {
      this.postForm_head.displayNavColumn = [];
      this.coumn_list.forEach(item => {
        if (item.value) this.postForm_head.displayNavColumn.push(item.value)
      })
      this.postForm.headerTemplate.logo = this.postForm_head.logo||'';
      this.postForm.headerTemplate.headerBgImg = this.postForm_head.headerBgImg||'';
      this.postForm.headerTemplate.displayNavColumn = this.postForm_head.displayNavColumn||[];
      this.$emit('hfHide',true);
      console.log(this.postForm);
    },
    //删除背景
    delBGImg(){
      this.postForm_head.headerBgImg = '';
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
       this.postForm_head.headerBgImg = res.data[0]||'';
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