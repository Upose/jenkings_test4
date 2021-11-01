<!---服务中台-终端管理-添加终端-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu_scene :isActive="3"></serviceLMenu_scene></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="id?'编辑终端':'添加终端'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" :rules="rules" ref="postForm" label-width="80px" class="admin-form">
            <h1 class="s-b-border-title">{{id?'编辑终端':'添加终端'}}</h1>
            <div class="form-content">
              <el-form-item label="终端名称" prop="name">
                <el-input v-model="postForm.name" placeholder="请输入终端名称"></el-input>
              </el-form-item>
              <el-form-item label="关键词" prop="keyWords">
                <el-input v-model="postForm.keyWords" placeholder="请输入关键词"></el-input>
              </el-form-item>
              <el-form-item label="简要描述">
                <el-input type="textarea" class="form-textarea" placeholder="请输入简要描述" v-model="postForm.description"></el-input>
              </el-form-item>
              <el-form-item label="终端类型">
                <el-radio-group v-model="postForm.terminalType">
                  <el-radio :label="1">PC网站端</el-radio>
                  <el-radio label="2">APP端</el-radio>
                  <!-- <el-radio :label="3">小程序端</el-radio> -->
                  <el-radio :label="4">自适应移动端</el-radio>
                  <el-radio :label="5">显示屏</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="应用图标" v-model="postForm.logo">
                <div class="up-img-form-item">
                  <div class="up-img-warp">
                    <img src="@/assets/img/icon2.png">
                  </div>
                  <div class="up-img-warp select-icon" @click="selectImg()">
                    <span>选择图标</span>
                  </div>
                  <div class="up-img-warp up-icon" @click="upImg()">
                    <span>上传图标</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="访问路径">
                <el-input v-model="postForm.visitUrl" placeholder="请输入访问路径"></el-input>
              </el-form-item>
              <el-form-item label="服务状态">
                <el-radio-group v-model="postForm.status">
                  <el-radio :label="1" >正常</el-radio>
                  <el-radio :label="0" >下线</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注信息">
                <el-input type="textarea" class="form-textarea" placeholder="请输入备注信息" v-model="postForm.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-close" size="medium">取消</el-button>
                <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm')">保存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div><!---顶部查询板块 end--->
        <el-dialog title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleClose">
          <UpdateImg></UpdateImg>
        </el-dialog>
        <el-dialog title="图片选择" :visible.sync="dialogSelectimg" width="540px" :close-on-click-modal="false" :before-close="selectImgClose">
          <p class="el-form-img-box-hint">点击图标即可选中所需要的图标</p>
          <div class="c-l">
            <div class="el-form-img-box" v-for="i in 20" :key="i" @click="selectImgClick(i)">
              <img src="@/assets/img/icon2.png"/>
              <img src="@/assets/img/icon-select.png" :class="select_img==i?'active':''" v-if="select_img==i"/>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button icon="el-icon-close" size="medium" @click="closeClick()">取消</el-button>
            <el-button icon="el-icon-check" size="medium" type="primary" @click="submitImg()">确认</el-button>
        </span>
        </el-dialog>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import bus from '@/assets/js/bus';
import http from "@/assets/js/http";
import footerPage from "@/common/footer";
import breadcrumb from "@/components/model/breadcrumb";
import serviceLMenu_scene from "@/components/model/serviceLMenu_scene";
import UpdateImg from "@/components/model/UpdateImg";
import { VueCropper } from 'vue-cropper'
export default {
  name: 'index',
  created(){
    bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu_scene,breadcrumb,VueCropper,UpdateImg},
  data () {
    return {
      dialogUPimg:false,
      dialogSelectimg:false,
      select_img:null,
      postForm: {},
      id:this.$route.query.id,//判断是否编辑
      rules: {
          name: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          desc: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ]
      },
    }
  },
  mounted(){
    console.log(this.id);
    if(this.id){
      this.initData();
    } 
  },
  methods:{
    initData(){
      http.getPlain_url('terminal-instance-detail','/'+this.id).then(res=>{ //学生专区
        this.postForm = res.data||{};
      }).catch(err=>{
          console.log(err);
      })
    },
    //选择图标
    selectImgClick(val){
      this.select_img = val;
    },
    //打开图标选择弹窗
    selectImg(){
      this.dialogSelectimg = true;
    },
    //关闭图标选择弹窗
    closeClick(){
      this.dialogSelectimg = false;
      this.select_img = null;
    },
    //关闭图标选择弹窗
    selectImgClose(done){
      this.select_img = null;
      done();
    },
    //确定图标选择弹窗
    submitImg(){
      this.dialogSelectimg = false;
      this.select_img = null;
    },
    //打开图标上传弹窗
    upImg(){
      this.dialogUPimg = true;
    },
    //图片上传-弹窗关闭
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //表单提交
    submitForm(formName) {
      console.log(this.postForm);
      this.postForm['icon']="https://gimg2.baidu.com/icon.png"
      this.postForm['logo']="https://gimg2.baidu.com/icon.png"
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.id){
              http.putJson('terminal-instance-updata',this.postForm).then(res=>{ 
                this.$message({type: 'success',message: '修改成功!'});
                window.history.back(); 
              }).catch(err=>{
                this.$message({type: 'error',message: '修改失败'});    
              })
            }else{
              http.postJson('terminal-instance-add',this.postForm).then(res=>{ 
                this.$message({type: 'success',message: '添加成功!'});
                window.history.back(); 
              }).catch(err=>{
                this.$message({type: 'error',message: '添加失败'});    
              })
            }
          }
      });
    },
    
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/css/color.less";/**颜色配置 */
@import "../../../../assets/css/form.less";
  .content{
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .form-content{
      max-width: 740px;
    }
  }
</style>
