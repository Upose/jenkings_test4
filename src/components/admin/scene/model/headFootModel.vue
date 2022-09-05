<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <div class="content">
      <el-form label-width="110px" class="admin-form">
        <el-form-item label="子页面头部选择" prop="defaultTemplate">
          <div class="temp-select c-l">
            <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in head_list" :key="i+'a'">
              <span class="edit-btn" @click="topEditClick(it.id)"><i class="iconfont el-icon-vip-shezhi"></i></span>
              <span class="temp-name">{{it.name}}</span>
              <!-- <el-button type="primary" class="button" size="mini" @click="headerClick(it)"><i class="iconfont" :class="it.id==head_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==head_check?'已选':'选择'}}</el-button> -->
            </div>
          </div>
        </el-form-item>
        <el-form-item label="子页面底部选择" prop="defaultTemplate">
          <div class="temp-select c-l">
            <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in footer_list" :key="i+'a'">
              <span class="edit-btn" @click="fotEditClick(it.id)"><i class="iconfont el-icon-vip-shezhi"></i></span>
              <span class="temp-name">{{it.name}}</span>
              <!-- <el-button type="primary" class="button" size="mini" @click="footerClick(it)"><i class="iconfont" :class="it.id==footer_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==footer_check?'已选':'选择'}}</el-button> -->
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div><!--头部底部信息列表信息 end-->
  </div>
</template>

<script>
export default {
  name: 'index',
  created() {
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
    })
    this.http.getPlain('nav-column-list', '').then(res => {
      this.coumn_data_list = res.data || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
    this.http.getPlain('template-list', 'Type=2&PageIndex=1&PageSize=100').then(res => {
      this.head_list = res.data.items || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
    this.http.getPlain('template-list', 'Type=3&PageIndex=1&PageSize=100').then(res => {
      this.footer_list = res.data.items || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      top_dialogBulk: false,//头部设置
      fot_dialogBulk: false,//底部设置
      coumn_list1: [{ value: '' }],//新增删除栏目列表
      coumn_data_list: [],//栏目下拉选择列表
      head_list: [],
      footer_list: [],
      head_check: '',
      footer_check: '',
    }
  },
  methods: {
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
      // 上传限制
      // let fileSize = file.size
      // if (fileSize > 52428800) {
      //   this.$alert('大小不得超过50M')
      //   return
      // }
      if (file.type !== 'text/javascript' && file.type !== 'application/javascript' && file.type !== 'JavaScript') {
        this.$message({ type: 'error', message: '请上传js文件!' });
        return;
      }
      var index = parseInt(e.target.id.slice(5, 6));
      this.http.postFile("UploadFile", formData).then((res) => {
        _this.coumn_list2[index].value = _this.fileUrl + res.data[0];
      }).catch((err) => {
        this.$message({ type: 'error', message: '上传失败!' });
      });
    },
    /****取消按钮*******/
    closeClick() {
      this.$emit('hfHide');
    },
    /***x关闭按钮 **/
    handleClose(done) {
      this.$emit('hfHide');
    },
    //删除多栏目投递
    removeCoumn1(index) {
      this.coumn_list1.splice(index, 1);
    },
    //添加多栏目投递
    addCoumn1() {
      this.coumn_list1.push({ value: '' });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
@import "../../../../assets/admin/css/form.less";
.temp-select{
  max-width: 850px !important;
  padding: 15px;
  padding-bottom: 0;
  min-height: 95px;
  .d-temp-box{
    margin-right:15px;
    margin-bottom: 15px;
    width: 120px;
    height:70px;
    &:nth-child(6n){
      margin-right: 0 !important;
    }
  }
}
</style>