<!--头部底部模板选择-->
<template>
  <div class="tag-box">
    <el-dialog title="选择头部和底部模板" :visible.sync="dialogBulk" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
            <div class="form-content">
            <el-form-item label="头部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :style="{background:'url('+it.cover+')'}" v-for="(it,i) in head_list" :key="i+'a'">
                        <span class="temp-name">{{it.name}}</span>
                        <el-button type="primary" class="button" size="mini" @click="headerClick(it)"><i class="iconfont" :class="it.id==head_check?'vip-check':'vip-no-check'"></i> {{it.id==head_check?'已选':'选择'}}</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="底部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :style="{background:'url('+it.cover+')'}" v-for="(it,i) in footer_list" :key="i+'a'">
                        <span class="temp-name">{{it.name}}</span>
                        <el-button type="primary" class="button" size="mini" @click="footerClick(it)"><i class="iconfont" :class="it.id==footer_check?'vip-check':'vip-no-check'"></i> {{it.id==footer_check?'已选':'选择'}}</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item class="m-center">
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm()">保存设置</el-button>
            </el-form-item>
            </div>
        </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: 'index',
  data() {
    return {
        dialogBulk:true,
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
        this.postForm['headerTemplateId'] = val.id;
        this.postForm['headerTemplateUrl'] = val.router;
    },
    //模板选择
    footerClick(val){
        this.footer_check = val.id;
        this.postForm['footerTemplateId'] = val.id;
        this.postForm['footerTemplateUrl'] = val.router;
    },
    /****取消按钮*******/
    closeClick(){
        this.$emit('hfHide');
    },
    /***x关闭按钮 **/
    handleClose(done){
        this.$emit('hfHide');
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
@import "../../../assets/admin/css/form.less";
.admin-form .form-content{
    padding: 0 !important;
    .temp-select{
        padding: 20px 10px;
        .d-temp-box{
            margin:0 10px;
        }
    }
    .m-center{
        text-align: right;
    }
}
</style>





