<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <div class="content">
      <el-form label-width="110px" class="admin-form">
        <el-form-item label="子页面头部选择" prop="defaultTemplate">
          <div class="temp-select c-l">
            <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in head_list" :key="i+'a'" @click="headerClick(it)">
              <span class="edit-btn" @click.stop="topEditClick(it.id)" v-if="it.id==head_check"><i class="iconfont el-icon-vip-shezhi"></i></span>
              <span class="temp-name">{{it.name}}</span>
              <el-button type="primary" class="button" size="mini" :class="it.id==head_check?'btn-check':'btn-no-check'"><i class="iconfont" :class="it.id==head_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==head_check?'已选':'选择'}}</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="子页面底部选择" prop="defaultTemplate">
          <div class="temp-select c-l">
            <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in footer_list" :key="i+'b'" @click="footerClick(it)">
              <span class="edit-btn" @click.stop="fotEditClick(it.id)" v-if="it.id==footer_check"><i class="iconfont el-icon-vip-shezhi"></i></span>
              <span class="temp-name">{{it.name}}</span>
              <el-button type="primary" class="button" size="mini" :class="it.id==footer_check?'btn-check':'btn-no-check'"><i class="iconfont" :class="it.id==footer_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==footer_check?'已选':'选择'}}</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div><!--头部底部信息列表信息 end-->
    <headerSet v-if="top_dialogBulk" :postForm="{}" :childPage="true" @childHeaderSet="childHeaderSet" @hfHide="hfHide" ></headerSet>
    <footerSet v-if="fot_dialogBulk" :postForm="{}" :childPage="true" @childFootSet="childFootSet" @hfHide="hfHide"></footerSet>
  </div>
</template>

<script>
import headerSet from "./headerSet.vue";//头部设置
import footerSet from "./footerSet";//底部设置
export default {
  name: 'index',
  components:{headerSet,footerSet},
  created() {
    this.bus.$on('collapse', msg => {
      this.$root.collapse = msg;
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
      head_list: [],
      footer_list: [],
      head_check: '',//当前选中头部id
      footer_check: '',//当前选中底部id
    }
  },
  methods: {
    //头部栏目设置-打开弹窗
    topEditClick(val) {
      this.top_dialogBulk = true;
    },
    //底部栏目设置-打开弹窗
    fotEditClick(val) {
      this.fot_dialogBulk = true;
    },
    //选择头部
    headerClick(val){
      this.head_check = val.id;
    },
    //选择底部
    footerClick(val){
      this.footer_check = val.id;
    },
    //隐藏头部底部-弹窗
    hfHide(){
      this.top_dialogBulk = false;
      this.fot_dialogBulk = false;
    },
    //头部设置-传回信息
    childHeaderSet(val){
      console.log(val);
      this.hfHide();
    },
    //头部设置-传回信息
    childFootSet(val){
      console.log(val);
      this.hfHide();
    }
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
    .edit-btn{
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 13px;
      line-height: 12px;
      color: #fff;
      width: 35px;
      height: 35px;
      padding-left: 20px;
      padding-top: 5px;
      background: url(../../../../assets/admin/img/set-btn-bg.png) no-repeat right;
      background-position-y: 0px;
      background-size: 25px !important;
    }
    .btn-check{
      color: #fff;
      border-color: #6777EF;
      background: #6777EF;
    }
  }
}
</style>