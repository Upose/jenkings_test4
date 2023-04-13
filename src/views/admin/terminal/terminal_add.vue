<!---服务中台-终端管理-添加终端-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="3"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="id?'编辑终端':'添加终端'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" label-suffix="：" :rules="rules" ref="postForm" label-width="160px" class="admin-form">
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
              <el-form-item label="黑白模式">
                <el-switch :active-value="true" :inactive-value="false" v-model="postForm.isBlackWhiteMode"></el-switch>
              </el-form-item>
              <el-form-item label="管理系统完整LOGO" prop="backLogo" v-if="IsSystemInstance">
                <div class="up-img-form-item">
                  <div class="up-img-warp" v-if="postForm.backLogo">
                    <img :src="postForm.logo?(basurl+postForm.backLogo):default_img">
                  </div>
                  <div class="up-img-warp up-icon">
                    <span>上传LOGO</span>
                    <input type="file" class="file-input" multiple="multiple" @change="$fileUpload($event,'img','backLogo')">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="管理系统简洁LOGO" prop="backSimpleLogo" v-if="IsSystemInstance">
                <div class="up-img-form-item">
                  <div class="up-img-warp" v-if="postForm.backSimpleLogo">
                    <img :src="postForm.logo?(basurl+postForm.backSimpleLogo):default_img">
                  </div>
                  <div class="up-img-warp up-icon">
                    <span>上传LOGO</span>
                    <input type="file" class="file-input" multiple="multiple" @change="$fileUpload($event,'img','backSimpleLogo')">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="浏览器图标" prop="ico">
                <div class="up-img-form-item">
                  <div class="up-img-warp" v-if="postForm.icoPath">
                    <img :src="postForm.icoPath?(basurl+postForm.icoPath):default_img">
                  </div>
                  <div class="up-img-warp up-icon">
                    <span>上传图片文件</span>
                    <input type="file" class="file-input" multiple="multiple" @change="$fileUpload($event,'img','icoPath')">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="终端LOGO" prop="logo">
                <div class="up-img-form-item">
                  <div class="up-img-warp" v-if="postForm.logo">
                    <img :src="postForm.logo?(basurl+postForm.logo):default_img">
                  </div>
                  <div class="up-img-warp up-icon">
                    <span>上传图标</span>
                    <input type="file" class="file-input" multiple="multiple" @change="$fileUpload($event,'img','logo')">
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="默认图标" prop="icon">
                <div class="up-img-form-item">
                  <div class="up-img-warp" v-if="postForm.icon">
                    <img :src="$root.fileUrl+postForm.icon">
                  </div>
                  <div v-if="isSowImg()" class="up-img-warp select-icon" @click="selectImg()">
                    <span>选择图标</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="访问路径" prop="visitUrl" class="openurl">
                <span class="url1">{{orgInfo.portalUrl}}?url=</span>
                <el-input class="input-w" v-model="postForm.visitUrl" placeholder="访问路径" clearable maxlength="50" minlength="2" show-word-limit></el-input>
                <el-button icon="iconfont el-icon-vip-fuzhi" type="primary" @click="copyUrl()">复制链接</el-button>
              </el-form-item>
              <el-form-item label="应用页头设置" prop="headerMode">
                <el-radio-group v-model="postForm.headerMode">
                  <el-radio :label="0" >采用首页头部</el-radio>
                  <el-radio :label="1" >独立配置</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="头部选择" class="w100" v-if="postForm.headerMode==1" prop="defaultTemplate">
                <div class="temp-select c-l">
                  <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in head_list" :key="i+'a'" @click="headerClick(it)">
                    <span class="edit-btn" @click.stop="topEditClick(it.id)" v-if="it.id==head_check"><i class="iconfont el-icon-vip-shezhi"></i></span>
                    <span class="temp-name">{{it.name}}</span>
                    <el-button type="primary" class="button" size="mini" :class="it.id==head_check?'btn-check':'btn-no-check'"><i class="iconfont" :class="it.id==head_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==head_check?'已选':'选择'}}</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="应用页底设置" prop="footerMode">
                <el-radio-group v-model="postForm.footerMode">
                  <el-radio :label="0" >采用首页底部</el-radio>
                  <el-radio :label="1" >独立配置</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="底部选择" class="w100" v-if="postForm.footerMode==1" prop="defaultTemplate">
                <div class="temp-select c-l">
                  <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in footer_list" :key="i+'b'" @click="footerClick(it)">
                    <span class="edit-btn" @click.stop="fotEditClick(it.id)" v-if="it.id==footer_check"><i class="iconfont el-icon-vip-shezhi"></i></span>
                    <span class="temp-name">{{it.name}}</span>
                    <el-button type="primary" class="button" size="mini" :class="it.id==footer_check?'btn-check':'btn-no-check'"><i class="iconfont" :class="it.id==footer_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==footer_check?'已选':'选择'}}</el-button>
                  </div>
                </div>
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
                <el-button icon="iconfont el-icon-vip-quxiao" size="medium" @click="backClick()">取消</el-button>
                <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm('postForm')">保存</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div><!---顶部查询板块 end--->
        <!-- <el-dialog append-to-body title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleClose">
          <UpdateImg @imgUrl="imgUrl" :imgWidth="100" :imgHeight="100"></UpdateImg>
        </el-dialog> -->
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

    <headerSet v-if="top_dialogBulk" :postForm="{
      headerTemplate:{
        logo:postForm.headerLogo||'',
        headerBgImg:postForm.headerBgImg||'',
        displayNavColumn:postForm.headerNavs||[],
      }
    }" :childPage="true" @childHeaderSet="childHeaderSet" @hfHide="hfHide" ></headerSet>
    <footerSet v-if="fot_dialogBulk" :postForm="{
      footerTemplate:{
        content:postForm.footerContent||'',
        footerBgImg:postForm.footerBgImg||'',
        footerDisplayNavColumn:postForm.footerNavs||[],
      }
    }" :childPage="true" @childFootSet="childFootSet" @hfHide="hfHide"></footerSet>
  </div>
</template>

<script>
import footerPage from "@/views/admin/common/footer";
import breadcrumb from "@/views/admin/common/breadcrumb";
import serviceLMenu from "@/views/admin/common/serviceLMenu";
import UpdateImg from "@/views/admin/common/UpdateImg";
import headerSet from "../scene/model/headerSet";//头部设置
import footerSet from "../scene/model/footerSet";//底部设置
export default {
  name: 'index',
  created(){
    this.http.getPlain_url('header-footer-list', '/2').then(res => {
      this.head_list = res.data || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
    this.http.getPlain_url('header-footer-list', '/3').then(res => {
      this.footer_list = res.data || [];
    }).catch(err => {
      this.$message({ type: 'error', message: '获取失败!' });
    })
  },
  components:{footerPage,serviceLMenu,breadcrumb,UpdateImg,headerSet,footerSet},
  data () {
    return {
      dialogUPimg:false,
      dialogSelectimg:false,
      IsSystemInstance:false,//是否默认终端
      basurl:window.localStorage.getItem('fileUrl')+'/',
      default_img:require("../../../assets/admin/img/icon2.png"),
      select_img:{},
      orgInfo: JSON.parse(window.localStorage.getItem('orgInfo') || '{}'),
      iconList:[],//图标列表
      postForm: {
        headerMode:0,
        footerMode:0,
      },
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
      //头部底部-子页面单独配置问题
      top_dialogBulk: false,//头部设置
      fot_dialogBulk: false,//底部设置
      head_list: [],
      footer_list: [],
      head_check: '',//当前选中头部id
      footer_check: '',//当前选中底部id
    }
  },
  mounted(){
    if(this.id){
      this.initData();
    }
    this.http.getPlain_url('icon_dictionary','').then(res=>{
      this.iconList = res.data.terminalIcon||[];
      if(this.iconList.length>0){
        this.select_img = this.iconList[1];
        if(!this.id){
          this.postForm.icon = this.select_img.value;
        }
      }
      this.terminal_list = res.data.appTerminalType||[];
    }).catch(err=>{

    })
    this.bus.$on("getUpladFile",(res)=>{
      switch (res.key) {
        case 'backLogo': this.postForm.backLogo = res.url || ''; break;
        case 'backSimpleLogo': this.postForm.backSimpleLogo = res.url || ''; break;
        case 'logo': this.postForm.logo = res.url || ''; break;
        case 'icoPath': this.postForm.icoPath = res.url || ''; break;
      }
      this.$forceUpdate();
    })
  },
  methods:{
    initData(){
      this.http.getPlain_url('terminal-instance-detail','/'+this.id).then(res=>{
        this.postForm = res.data||{};
        this.head_check = this.postForm.headerTemplateId||'';
        this.footer_check = this.postForm.footerTemplateId||'';
        this.IsSystemInstance = res.data.isSystemInstance;
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
    //判断是否编辑下PC，编辑下PC，不允许修改上传图标
    isSowImg(){
      if(this.id){
        if(this.postForm.terminalType == 1)return false;
      }else{
        return true;
      }
    },
    /*************************************************子页面头部底部start */
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
      this.postForm.headerBgImg = val.headerBgImg||'';
      this.postForm.headerLogo = val.logo||'';
      this.postForm.headerNavs = val.displayNavColumn||[];
      console.log(this.postForm);
      this.hfHide();
    },
    //头部设置-传回信息
    childFootSet(val){
      this.postForm.footerContent = val.content||'';
      this.postForm.footerBgImg = val.footerBgImg||'';
      this.postForm.footerNavs = val.footerDisplayNavColumn||[];
      console.log(this.postForm);
      this.hfHide();
    },
    /*************************************************子页面头部底部end */
    backClick(){
      this.$router.replace('/admin_terminalManage');
    },
    //表单提交
    submitForm(formName) {
      if(this.postForm.headerMode==1){
        if(!this.head_check){
          this.$message({type: 'info',message: '请选择头部'});return;  
        }else{
          this.postForm.headerTemplateId = this.head_check;
        }
      }
      if(this.postForm.footerMode==1){
        if(!this.footer_check){
          this.$message({type: 'info',message: '请选择底部'});return;
        }else{
          this.postForm.footerTemplateId = this.footer_check;
        }
      }
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.id){
              this.http.putJson('terminal-instance-updata',this.postForm).then(res=>{ 
                this.$message({type: 'success',message: '修改成功!'});
                this.$router.replace('/admin_terminalManage');  
              }).catch(err=>{
                this.$message({type: 'error',message: '修改失败'});    
              })
            }else{
              this.http.postJson('terminal-instance-add',this.postForm).then(res=>{ 
                this.$message({type: 'success',message: '添加成功!'});
                this.$router.replace('/admin_terminalManage'); 
              }).catch(err=>{
                this.$message({type: 'error',message: '添加失败'});    
              })
            }
          }
      });
    },
    //复制链接
    copyUrl(){
      if(this.orgInfo && this.orgInfo.portalUrl && this.postForm.visitUrl){
        this.clipboardCopy(this.orgInfo.portalUrl + '?url='+this.postForm.visitUrl);
      }else{
        this.$message({ type: 'error', message: '地址信息不全' });
      }
    },
    //插件-复制
    clipboardCopy(txt){
      let transfer = document.createElement('input');//创建控件
      document.body.appendChild(transfer);
      transfer.style.cssText = 'position: fixed;opacity:0;'
      transfer.value = txt;  // 这里表示想要复制的内容
      transfer.focus();
      transfer.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
      }
      transfer.blur();
      this.$message({message: '复制成功',type:'success'});
      document.body.removeChild(transfer);//删除控件
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/form.less";
  .content{
    background-color: @m-col-b0;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .form-content{
      // max-width: 740px;
      /deep/.el-form-item__content{
        max-width: 500px;
      }
      .w100{
        /deep/.el-form-item__content{
          max-width: 100% !important;
        }
      }
    }
  }
  .temp-select{
  max-width: 100% !important;
  padding: 15px 8px;
  padding-bottom: 0;
  min-height: 95px;
  .temp-name{
    display: block !important;
    margin-top: -6px;
    margin-left: -5px;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #000 !important;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    padding: 0 5px;
    text-shadow: 0px 0px 3px #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .d-temp-box{
    margin-left:8px;
    margin-right:8px;
    margin-bottom: 15px;
    width: 120px;
    height:70px;
    background-size: 100% auto !important;
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
      background: url(../../../assets/admin/img/set-btn-bg.png) no-repeat right;
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
  .openurl {
    /deep/.el-form-item__content{
      display: flex;
    }
    /deep/.el-button{
      padding: 12px 10px;
    }
    .url1 {
      flex-shrink: 0;
    }
    .input-w {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
</style>
