<!---服务中台-终端管理-添加终端-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="3"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="id?'编辑终端':'添加终端'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" label-suffix="：" :rules="rules" ref="postForm" label-width="95px" class="admin-form">
            <h1 class="s-b-border-title">{{id?'编辑终端':'添加终端'}}</h1>
            <div class="form-content">
              <el-form-item label="终端名称" prop="name">
                <el-input v-model="postForm.name" placeholder="请输入终端名称" maxlength="50" minlength="2" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="关键词" prop="keyWords">
                <el-input v-model="postForm.keyWords" placeholder="请输入关键词" maxlength="100" minlength="0" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="简要描述" prop="description">
                <el-input type="textarea" class="form-textarea" placeholder="请输入简要描述" v-model="postForm.description" maxlength="200" minlength="0" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="终端类型" prop="terminalType">
                <el-radio-group v-model="postForm.terminalType" :disabled="id?true:false">
                  <el-radio v-for="(it,i) in terminal_list" :key="i" :label="it.value">{{it.key}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="终端logo" prop="logo">
                <div class="up-img-form-item">
                  <div class="up-img-warp" v-if="postForm.logo">
                    <img :src="postForm.logo?(basurl+postForm.logo):default_img">
                  </div>
                  <div class="up-img-warp up-icon" @click="upImg()">
                    <span>上传图标</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="默认图标" prop="icon">
                <div class="up-img-form-item">
                  <div class="up-img-warp" v-if="postForm.icon">
                    <img :src="$root.fileUrl+postForm.icon">
                  </div>
                  <div class="up-img-warp select-icon" @click="selectImg()">
                    <span>选择图标</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="访问路径" prop="visitUrl">
                <el-input v-model="postForm.visitUrl" placeholder="请输入访问路径" maxlength="50" minlength="2" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="服务状态" prop="status">
                <el-radio-group v-model="postForm.status">
                  <el-radio :label="1" >正常</el-radio>
                  <el-radio :label="0" >下线</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注信息" prop="remark">
                <el-input type="textarea" class="form-textarea" placeholder="请输入备注信息" maxlength="200" minlength="0" show-word-limit v-model="postForm.remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="backHistory()">取消</el-button>
                <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm('postForm')">保存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div><!---顶部查询板块 end--->
        <el-dialog append-to-body title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleClose">
          <UpdateImg @imgUrl="imgUrl" :imgWidth="100" :imgHeight="100"></UpdateImg>
        </el-dialog>
        <el-dialog append-to-body title="图片选择" :visible.sync="dialogSelectimg" width="540px" :close-on-click-modal="false" :before-close="selectImgClose">
          <p class="el-form-img-box-hint">点击图标即可选中所需要的图标</p>
          <div class="c-l">
            <div class="el-form-img-box" v-for="i in iconList" :key="i" @click="selectImgClick(i)">
              <img :src="$root.fileUrl+i.value"/>
              <img src="@/assets/admin/img/icon-select.png" :class="select_img.key==i.key?'active':''" v-if="select_img.key==i.key"/>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="closeClick()">取消</el-button>
            <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitImg()">确认</el-button>
        </span>
        </el-dialog>
        <footerPage class="top20"></footerPage>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import footerPage from "@/components/admin/common/footer";
import breadcrumb from "@/components/admin/common/breadcrumb";
import serviceLMenu from "@/components/admin/common/serviceLMenu";
import UpdateImg from "@/components/admin/common/UpdateImg";
export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,UpdateImg},
  data () {
    return {
      dialogUPimg:false,
      dialogSelectimg:false,
      basurl:window.localStorage.getItem('fileUrl')+'/',
      default_img:require("../../../assets/admin/img/icon2.png"),
      select_img:{},
      iconList:[],//图标列表
      postForm: {},
      terminal_list:[],
      id:this.$route.query.id,//判断是否编辑
      rules: {
          name: [
              { required: true, message: '请输入内容', trigger: 'blur' },
              { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          keyWords: [
              { message: '请输入内容', trigger: 'blur' },
              { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
          ],
          description: [
              { message: '请输入内容', trigger: 'blur' },
              { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ],
          terminalType: [
              { required: true, message: '请选择类型', trigger: 'change' },
          ],
          terminalType: [
              { required: true, message: '请选择类型', trigger: 'change' },
          ],
          icon: [
              { required: true, message: ' '},
          ],
          status: [
              { required: true, message: '请选择', trigger: 'change' },
          ],
          visitUrl: [
              { required: true,message: '请输入内容', trigger: 'blur' },
              { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          remark: [
              { message: '请输入内容', trigger: 'blur' },
              { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ],
      },
    }
  },
  mounted(){
    if(this.id){
      this.initData();
    }
    this.http.getPlain_url('icon_dictionary','').then(res=>{
      this.iconList = res.data.terminalIcon||[];
      if(this.iconList.length>0){
        this.select_img = this.iconList[0];
        if(!this.id){
          this.postForm.icon = this.select_img.value;
        }
      }
      this.terminal_list = res.data.appTerminalType||[];
    }).catch(err=>{

    })
  },
  methods:{
    initData(){
      this.http.getPlain_url('terminal-instance-detail','/'+this.id).then(res=>{ //学生专区
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
    },
    //关闭图标选择弹窗
    selectImgClose(done){
      done();
    },
    //确定图标选择弹窗
    submitImg(){
      this.postForm.icon = this.select_img.value;
      this.dialogSelectimg = false;
    },
    //打开图标上传弹窗
    upImg(){
      this.dialogUPimg = true;
    },
    //获取图片上传返回地址
    imgUrl(val){
      this.postForm['logo'] = val[0];
      this.dialogUPimg = false;
    },
    //图片上传-弹窗关闭
    handleClose(done) {
      done();
    },
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.id){
              this.http.putJson('terminal-instance-updata',this.postForm).then(res=>{ 
                this.$message({type: 'success',message: '修改成功!'});
                window.history.back(); 
              }).catch(err=>{
                this.$message({type: 'error',message: '修改失败'});    
              })
            }else{
              this.http.postJson('terminal-instance-add',this.postForm).then(res=>{ 
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
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/form.less";
  .content{
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .form-content{
      max-width: 740px;
    }
  }
</style>
