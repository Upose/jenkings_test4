<!--头部设置
更换logo图片
在场景右侧绑定栏目
更换背景
因绑定栏目，以前的模板也需要重新修改
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
