<!--底部设置
富文本编辑，html编辑，背景更换，绑定栏目
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="底部高级设置" :visible.sync="dialogBulk" width="1242px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form label-width="70px" class="admin-form">
        <el-form-item label="更换背景" prop="logo">
            <div class="up-img w100" :style="{'background-image':'url('+(postForm_fot.footerBgImg?(fileUrl+postForm_fot.footerBgImg):'')+')'}">
              <div><img src="@/assets/admin/img/icon-upload.png"/><span>背景更换</span></div>
              <input type="file" :id="'file_bg'" multiple="multiple" @change="$fileUpload($event,'img','bgimg')">
              <i class="del-img iconfont el-icon-vip-shanchu-1" @click="postForm_fot.footerBgImg = ''"></i>
            </div>
          </el-form-item>
        <el-form-item label="展示栏目">
          <div class="btns-colse-warp">
            <div class="btns-select-row" v-for="(it,i) in coumn_list" :key="i+'b'">
              <el-select v-model="it.columnId" placeholder="选择栏目">
                <el-option :label="item.key" :value="item.value" v-for="(item,i) in coumn_data_list" :key="i+'coumn'">{{item.key||'无'}}</el-option>
              </el-select>
              <!-- <el-select v-model="it.count" placeholder="显示条数">
                <el-option :label="item.key" :value="item.value" v-for="(item,i) in topCountList" :key="i+'coumn'">{{item.key||'无'}}</el-option>
              </el-select> -->
              <!-- <el-select v-model="it.orderRule" placeholder="排序规则">
                <el-option :label="item.key" :value="item.value" v-for="(item,i) in sortList" :key="i+'coumn'">{{item.key||'无'}}</el-option>
              </el-select> -->
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
          <span class="edit-title">底部信息</span>
          <el-form-item label="" class="edit-warp-foot" prop="defaultTemplate">
            <textarea id="mytextarea" class="border-fff" v-model="postForm_fot.content"></textarea>
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
  props: ['postForm','childPage'],
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
  mounted(){
    var _this = this;
    //tinymce 编辑器
    setTimeout(() => {
      tinymce.init({
        selector: '#mytextarea',
        language: 'zh_CN',
        height: 440,
        plugins: 'image,wordcount,charmap,code,hr,lists,advlist,emoticons,fullscreen,help,insertdatetime,link',
        images_upload_handler: (blobInfo, success, failure) => { // 图片上传
          this.handleImgUpload(blobInfo, success, failure)
        }
      });
    }, 50);
    if(this.postForm && this.postForm.footerTemplate){
      var _this = this;
      if(_this.postForm.footerTemplate.content){
        setTimeout(()=>{tinymce.activeEditor.setContent((_this.postForm.footerTemplate.content||''));},1000)
      }
      this.postForm_fot.footerBgImg = this.postForm.footerTemplate.footerBgImg||'';
      this.postForm_fot.footerDisplayNavColumn = this.postForm.footerTemplate.footerDisplayNavColumn||[];
      if(this.postForm_fot.footerDisplayNavColumn.length>0){
        this.coumn_list = [];
        this.postForm_fot.footerDisplayNavColumn.forEach(it=>{
          this.coumn_list.push({columnId:it});
        })
      }
    }
    this.bus.$on("getUpladFile",(res)=>{
      if(res.key == 'bgimg'){
        this.postForm_fot.footerBgImg = res.url;
      }
    })
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      dialogBulk: true,//模板选择
      eidt_show:false,//是否显示富文本
      postForm_fot: {
        footerBgImg:'',//背景图片
        footerDisplayNavColumn:[],//栏目列表
        content:'',
      },
      coumn_data_list: [],//栏目列表-列表
      sortList:[{key: "默认", value: "Default", icon: null}],//排序方式-列表
      topCountList:[
        {key: "4", value: 4, icon: null},
        {key: "5", value: 5, icon: null},
        {key: "6", value: 6, icon: null},
        {key: "7", value: 7, icon: null},
        {key: "8", value: 8, icon: null},
        {key: "9", value: 9, icon: null},
        {key: "10", value: 10, icon: null},
        {key: "11", value: 11, icon: null},
      ],//显示条数-列表
      coumn_list: [{columnId:''}],//新增删除栏目列表
    }
  },
  methods: {
    //删除多栏目投递
    removeCoumn1(index) {
      this.coumn_list.splice(index, 1);
    },
    //添加多栏目投递
    addCoumn1() {
      if(this.coumn_list.length==3)return;
      this.coumn_list.push({columnId:''});
    },
    //x关闭按钮
    handleClose(done) {
      this.$emit('hfHide',false);
    },
    //保存底部设置信息
    submitFormFot() {
      this.postForm_fot.footerDisplayNavColumn = [];
      this.postForm_fot.content = tinyMCE.activeEditor.getContent()||'';
      this.coumn_list.forEach(item => {
        if (item.columnId) this.postForm_fot.footerDisplayNavColumn.push(item.columnId)
      })
      if(this.childPage){ //设置子页面头部信息
        this.$emit('childFootSet',this.postForm_fot)
      }else{//场景-高级设置
        this.postForm.footerTemplate.content = this.postForm_fot.content;
        this.postForm.footerTemplate.footerBgImg = this.postForm_fot.footerBgImg||'';
        this.postForm.footerTemplate.footerDisplayNavColumn = this.postForm_fot.footerDisplayNavColumn||[];
        this.$emit('hfHide',true);
      }
    },
    //富文本-图片上传
    handleImgUpload(blobInfo, success, failure) {
      const imgBase64 = `data:${blobInfo.blob().type};base64,${blobInfo.base64()}`
      const data = { img: [imgBase64] }
      let formData = new FormData();
      formData.append('files', blobInfo.blob(), "DX.jpg");
      this.http.postFile('UploadFile', formData).then(res => {
        success(this.fileUrl + res.data);
      }).then(err => { });
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
.border-fff{
  resize: none;
  border: 1px solid #fff;
}
.form-set-content{
  margin-top: -10px;
  .edit-title{
    font-size: 14px;
    color: #34395E;
    line-height: 40px;
  }
}
/deep/.el-dialog__body{
  min-height: 700px;
}
/deep/.tox .tox-statusbar__resize-handle{
  display: none;
}
/deep/.tox .tox-edit-area__iframe{
  background-color: rgb(189, 189, 189) !important;
  // margin: 0 -20px !important;
  // width: calc(100% + 40px) !important;
}
.btns-select-row{
  display: flex;
  padding-right: 30px;
  .el-select{
    margin-right: 5px;
    flex:1;
    &:first-child{
      flex: 2.3;
    }
    /deep/.el-input__inner{
      padding-left: 10px;
      padding-right: 28px;
    }
  }
}
</style>
<style>
.edit-warp-foot .el-form-item__content{
  margin-left: 0 !important;
}
</style>
