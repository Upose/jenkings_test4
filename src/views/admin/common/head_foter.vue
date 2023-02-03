<!--头部底部模板选择--这个文件好像没用了-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="选择头部和底部模板" :visible.sync="dialogBulk" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
            <div class="form-content">
            <el-form-item label="头部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :class="it.id==head_check?'d-temp-box-check':''" @click="headerClick(it)" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in head_list" :key="i+'a'">
                        <span class="edit-btn" @click.stop="topEditClick(it)"><i class="iconfont el-icon-vip-shezhi"></i></span>
                        <span class="temp-name">{{it.name}}</span>
                        <el-button type="primary" class="button" size="mini"><i class="iconfont" :class="it.id==head_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==head_check?'已选':'选择'}}</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="底部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :class="it.id==footer_check?'d-temp-box-check':''" @click="footerClick(it)" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in footer_list" :key="i+'a'">
                        <span class="edit-btn" @click.stop="fotEditClick(it)" ><i class="iconfont el-icon-vip-shezhi"></i></span>
                        <span class="temp-name">{{it.name}}</span>
                        <el-button type="primary" class="button" size="mini" @click="footerClick(it)"><i class="iconfont" :class="it.id==footer_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==footer_check?'已选':'选择'}}</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item class="m-center">
                <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm()">保存设置</el-button>
            </el-form-item>
            </div>
        </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: 'index',
  props:['head_fot_data'],
  created(){
    this.postForm = this.head_fot_data;
    if(this.postForm.footerTemplate){
      this.footer_check = this.postForm.footerTemplate.id||'';
    }
    if(this.postForm.headerTemplate){
      this.head_check = this.postForm.headerTemplate.id||'';
    }
  },
  data() {
    return {
        dialogBulk:true,//模板选择
        head_list:[],
        footer_list:[],
        head_check:'',
        footer_check:'',
        postForm:{},
    }
  },
  mounted() {
    this.http.getPlain('template-list','Type=2&PageIndex=1&PageSize=100').then(res=>{
        this.head_list = res.data.items||[];
    }).catch(err=>{
        this.$message({type: 'error',message: '获取失败!'});
    })
    this.http.getPlain('template-list','Type=3&PageIndex=1&PageSize=100').then(res=>{
        this.footer_list = res.data.items||[];
    }).catch(err=>{
        this.$message({type: 'error',message: '获取失败!'});
    })
  },
  methods: {
    /****保存按钮*******/
    submitForm(){
        this.$emit('setHFooter',this.postForm);
        this.$emit('hfHide');
    },
    //模板选择
    headerClick(val){
        this.head_check = val.id;
        this.postForm['headerTemplate'] = val;
    },
    //模板选择
    footerClick(val){
        this.footer_check = val.id;
        this.postForm['footerTemplate'] = val;
    },
    /****取消按钮*******/
    closeClick(){
        this.$emit('hfHide');
    },
    /***x关闭按钮 **/
    handleClose(done){
        this.$emit('hfHide');
    },
    //编辑-头部
    topEditClick(val){
        this.$router.push({path:'/admin_headfoot_set',query:{tid:val.id}})
        // this.top_dialogBulk = true;
    },
    //编辑-底部
    fotEditClick(val){
        this.$router.push({path:'/admin_headfoot_set',query:{fid:val.id}})
        // this.fot_dialogBulk = true;
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/form.less";
.admin-form .form-content{
    padding: 0 !important;
    .temp-select{
        padding: 10px 10px;
        .d-temp-box{
            margin:10px;
            .edit-btn{
                cursor: pointer;
                position: absolute;
                right: 0;
                top: 0;
                font-size: 18px;
                line-height: 14px;
                color: #fff;
                width: 36px;
                height: 35px;
                padding-left:13px;
                padding-top: 5px;
                background: url(../../../assets/admin/img/set-btn-bg.png) no-repeat right;
            }
        }
    }
    .m-center{
        text-align: right;
    }
    .btns-colse-warp{
        width: 470px;
        .btns-select-row .el-select{
            width: 390px;
        }
    }
}
/***js路径 */
.input-btns{
  width: 100% !important;
  .el-input-group{
    width: calc(100% - 40px) !important;
  }
}
    //百度富文本样式
    /deep/.edui-default .edui-editor{
      border: 1px solid #eee;
      position: relative;
      &::after{
        content: '';
        background: #ffffff;
        position: absolute;
        top: -1px;
        left: 0px;
        width: 85px;
        z-index: 9;
        height: 2px;
      }
    }
    // /deep/#edui1_iframeholder{
    //   height: 330px !important;
    // }
    /deep/.edui-default .edui-editor-toolbarbox{
      box-shadow:none;
    }
    /deep/.edui-default .edui-editor-toolbarboxouter{
      border-bottom: 1px solid #eee;
      background-image:none;
      background-color:#fff;
      box-shadow:none;
    }
    /deep/.edui-default .edui-editor-bottomContainer td{
      border-top:1px solid #eee;
    }
    .form-set-content{
      padding: 0 !important;
    }
</style>





