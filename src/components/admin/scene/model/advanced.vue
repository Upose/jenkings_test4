<!--高级设置
1、如果是默认首页：
弹窗展示字段有：js上传，应用场景（首页、全局(首页和子页面)）
2、不是默认首页
弹窗展示字段有：js上传。
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="高级设置" :visible.sync="dialogBulk" width="700px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
        <div class="form-set-content">
          <!--postForm.isSystemScene:默认场景 postForm.sceneType==1：门户首页 -->
          <el-form-item label="应用场景" prop="status" v-if="postForm.isSystemScene && postForm.sceneType==1">
            <el-radio-group v-model="useWay">
              <el-radio :label="0" >当前场景</el-radio>
              <el-radio :label="1" >全局应用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="JS路径" prop="visitUrl">
            <div class="btns-colse-warp input-btns">
              <div class="btns-select-row" v-for="(it,i) in jsPath" :key="i+'b'">
                <el-input v-model="it.value" placeholder="填写js在线地址或点击右侧上传(最多支持3个js文件)">
                  <template slot="append">
                    <div class="up-btn">
                      <span>点击上传</span>
                      <input type="file" :id="'file_'+i" multiple="multiple" @change="handleFileJS">
                    </div>
                  </template>
                </el-input>
                <div class="btns-el-btn" @click="removeCoumn2(i)" v-if="(jsPath.length-1)!=i">
                  <i class="iconfont el-icon-vip-jianhao1"></i>
                  <span>删除</span>
                </div>
                <div class="btns-el-btn" @click="addCoumn2" v-if="(jsPath.length-1)==i">
                  <i class="iconfont el-icon-vip-tianjia1"></i>
                  <span>添加</span>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="m-center">
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitFormJs()">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: 'index',
  props:['postForm'],
  mounted(){
    this.useWay = this.postForm.useWay||0;
    this.jsPath = [{}];
    if(this.postForm.jsPath && this.postForm.jsPath.length>0){
      this.jsPath.forEach(it=>{
        this.jsPath.push({value:it});
      })
    }
  },
  data() {
    return {
        dialogBulk:true,//模板选择
        jsPath:[{}],
        useWay:0,
        fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  methods: {
    //删除js地址
    removeCoumn2(index) {
      this.jsPath.splice(index, 1);
    },
    //添加js地址
    addCoumn2() {
      if (this.jsPath.length == 3) {
        this.$message({ type: 'info', message: '只能添加3个js地址!' });
        return;
      }
      this.jsPath.push({ value: '' });
    },
    //保存设置
    submitFormJs(){
      this.postForm.useWay = this.useWay||0;
      this.postForm.jsPath = [];
      this.jsPath.forEach(x=>{
        if(x.value)this.postForm.jsPath.push(x.value);
      });
      console.log(this.postForm);
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
        _this.jsPath[index].value = _this.fileUrl + res.data[0];
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
