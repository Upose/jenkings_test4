<!--特殊配置
1、如果是默认首页：
弹窗展示字段有：js上传，应用场景（首页、全局(首页和子页面)）
2、不是默认首页
弹窗展示字段有：js上传。
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="其他配置" :visible.sync="dialogBulk" width="980px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form label-width="110px" class="admin-form">
        <div class="form-set-content">
          <el-form-item label="应用场景" prop="status" v-if="postForm.isSystemScene && postForm.sceneType==1">
            <el-radio-group v-model="useWay">
              <el-radio :label="0">当前场景</el-radio>
              <el-radio :label="1">全局应用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="JS路径" prop="visitUrl">
            <div class="btns-colse-warp input-btns">
              <div class="btns-select-row" v-for="(it,i) in jsPath" :key="i+'b'">
                <el-input v-model="it.value" placeholder="在此填写js在线地址或点击右侧上传(最多支持3个js文件)">
                  <template slot="append">
                    <div class="up-btn">
                      <span>点击上传</span>
                      <input type="file" :id="'file_'+i" multiple="multiple" @change="$fileUpload($event,'js',i)">
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
  props: ['postForm'],
  mounted() {
    this.useWay = this.postForm.useWay || 0;
    var jsPath = [];
    // console.log(this.postForm.jsPath);
    if (this.postForm.jsPath && this.postForm.jsPath.length > 0) {
      var list = this.postForm.jsPath.split(';');
      list.forEach(it => {
        console.log(it);
        jsPath.push({ value: it });
      })
    }
    if(jsPath.length>0)this.jsPath = jsPath;

    this.bus.$on("getUpladFile",(res)=>{
      if(/^[0-9]+.?[0-9]*$/.test(res.key)){
        this.jsPath[res.key].value = (res.url||'');
        this.$forceUpdate();
      }
    })
  },
  data() {
    return {
      dialogBulk: true,//模板选择
      jsPath: [{}],
      useWay: 0,//应用场景
      ishome: 1,//子页面头部底部
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
    /***x关闭按钮 **/
    handleClose(done) {
      this.$emit('hfHide', false);
    },
    //保存设置
    submitFormJs() {
      this.postForm.useWay = this.useWay || 0;
      var jsPathList = [];
      this.jsPath.forEach(x => {
        if (x.value) jsPathList.push(x.value);
      });
      this.postForm.jsPath = jsPathList.join(';');
      this.$emit('hfHide', false);
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
/deep/.el-input-group__append {
  padding: 0;
}
/deep/.el-input__inner {
  border-right: none;
}
.up-btn {
  cursor: pointer;
  position: relative;
  width: 100px;
  text-align: center;
  height: 34px;
  margin-right: 2px;
  border-radius: 2px;
  color: #fff;
  background: #6777ef;
  span,
  input {
    position: absolute;
    width: 100px;
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
    line-height: 34px;
    text-align: center;
    z-index: 1;
  }
}
</style>
