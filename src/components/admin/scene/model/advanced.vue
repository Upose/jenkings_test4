<!--高级设置
1、如果是默认首页：
弹窗展示字段有：js上传，应用场景（首页、全局(首页和子页面)）
2、不是默认首页
弹窗展示字段有：js上传。
-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="选择头部和底部模板" :visible.sync="dialogBulk" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
            <div class="form-content">
            
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
  props:[],
  data() {
    return {
        dialogBulk:true,//模板选择
        
    }
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
@import "../../../../assets/admin/css/form.less";

</style>
