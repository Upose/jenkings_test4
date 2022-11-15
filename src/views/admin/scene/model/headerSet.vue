<!--头部设置
富文本编辑，html编辑，背景更换，绑定栏目
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="头部高级设置" :visible.sync="dialogBulk" width="630px" :close-on-click-modal="false" :before-close="handleClose">
      <el-form label-width="90px" class="admin-form">
        <div class="form-set-content">
          <el-form-item label="更换背景" prop="logo">
            <div class="up-img w100" :style="{'background-image':'url('+(postForm_head.headerBgImg?(fileUrl+postForm_head.headerBgImg):'')+')'}">
              <div><img src="@/assets/admin/img/icon-upload.png"/><span>背景更换</span></div>
              <input type="file" :id="'file_bg'" multiple="multiple" @change="$fileUpload($event,'bg')">
              <i class="del-img iconfont el-icon-vip-shanchu-1" @click="postForm_head.headerBgImg=''"></i>
            </div>
          </el-form-item>
          <el-form-item label="更换LOGO" prop="logo">
            <div class="up-img w100" :style="{'background-image':'url('+(postForm_head.logo?(fileUrl+postForm_head.logo):'')+')'}">
              <div><img src="@/assets/admin/img/icon-upload.png"/><span>更换LOGO</span></div>
              <input type="file" :id="'file_bg'" multiple="multiple" @change="$fileUpload($event,'logo')">
              <i class="del-img iconfont el-icon-vip-shanchu-1" @click="postForm_head.logo=''"></i>
            </div>
          </el-form-item>
          <el-form-item label="附加组件" prop="logo">
              <el-checkbox-group v-model="postForm.append" :disabled="id?true:false">
                <el-checkbox  v-for="(it,i) in append_list" :key="i" :label="it.value">{{it.key}}</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="展示栏目">
            <div class="btns-colse-warp">
              <div class="btns-select-row" v-for="(it,i) in coumn_list" :key="i+'b'">
                <el-select v-model="it.columnId" placeholder="选择栏目">
                  <el-option :label="item.key" :value="item.value" v-for="(item,i) in coumn_data_list" :key="i+'coumn'">{{item.key||'无'}}</el-option>
                </el-select>
                <el-select v-model="it.count" placeholder="显示条数">
                  <el-option :label="item.key" :value="item.value" v-for="(item,i) in topCountList" :key="i+'coumn'">{{item.key||'无'}}</el-option>
                </el-select>
                <el-select v-model="it.orderRule" placeholder="排序规则">
                  <el-option :label="item.key" :value="item.value" v-for="(item,i) in sortList" :key="i+'coumn'">{{item.key||'无'}}</el-option>
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
  </div>
</template>


<script>
export default {
  name: 'index',
  props: ['postForm','childPage'],
  created(){
    this.http.getPlain('nav-column-list', '').then(res => {
      this.coumn_data_list = res.data || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      dialogBulk: true,//模板选择
      jsList: [{}],//js组件
      append_list:[
        {key:'显示IP',value:'1'},
        {key:'天气预报',value:'1'},
        {key:'日历组件',value:'1'},
        {key:'VPN登录',value:'1'},
        {key:'欢迎词',value:'1'},
        {key:'消息提醒',value:'1'},
        {key:'开馆时间',value:'1'},
      ],//附加组件选择列表
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
      postForm_head: {
        headerBgImg:'',//头部背景
        displayNavColumn:[],//栏目
        logo:'',//logo
      },//头部表单
    }
  },
  mounted(){
    if(this.postForm && this.postForm.headerTemplate){
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
    this.bus.$on("getUpladFile",(res)=>{
      if(res.key == 'bg'){
          this.postForm_head.headerBgImg = res.url||'';
        }else if(res.key == 'logo'){
          this.postForm_head.logo = res.url||'';
        }
    })
  },
  methods: {
    //x关闭按钮
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
      this.coumn_list.push({columnId:''});
    },
    //保存头部设置信息
    submitFormHead() {
      this.postForm_head.displayNavColumn = [];
      this.coumn_list.forEach(item => {
        if (item.columnId) this.postForm_head.displayNavColumn.push(item.columnId)
      })

      if(this.childPage){ //设置子页面头部信息
        this.$emit('childHeaderSet',this.postForm_head)
      }else{//场景-高级设置
        this.postForm.headerTemplate.logo = this.postForm_head.logo||'';
        this.postForm.headerTemplate.headerBgImg = this.postForm_head.headerBgImg||'';
        this.postForm.headerTemplate.displayNavColumn = this.postForm_head.displayNavColumn||[];
        this.$emit('hfHide',true);
        console.log(this.postForm);
      }
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