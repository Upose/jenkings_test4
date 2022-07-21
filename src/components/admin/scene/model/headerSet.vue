<!--底部设置
富文本编辑，html编辑，背景更换，绑定栏目
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="选择头部和底部模板" :visible.sync="dialogBulk" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
        <div class="form-set-content">
          <el-form-item label="底部信息" prop="defaultTemplate">
            富文本信息
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
  data() {
    return {
        dialogBulk:true,//模板选择
        jsList:[{}],
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