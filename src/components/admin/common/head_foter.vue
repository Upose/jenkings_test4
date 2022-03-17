<!--头部底部模板选择-->
<template>
  <div class="tag-box">
    <el-dialog append-to-body title="选择头部和底部模板" :visible.sync="dialogBulk" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form label-width="70px" class="admin-form">
            <div class="form-content">
            <el-form-item label="头部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in head_list" :key="i+'a'">
                        <span class="edit-btn" @click="topEditClick(it)"><i class="iconfont el-icon-vip-shezhi-1"></i></span>
                        <span class="temp-name">{{it.name}}</span>
                        <el-button type="primary" class="button" size="mini" @click="headerClick(it)"><i class="iconfont" :class="it.id==head_check?'el-icon-vip-check':'el-icon-vip-no-check'"></i> {{it.id==head_check?'已选':'选择'}}</el-button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="底部模板" prop="defaultTemplate">
                <div class="temp-select c-l">
                    <div class="d-temp-box" :style="{background:'url('+$root.fileUrl+it.cover+')'}" v-for="(it,i) in footer_list" :key="i+'a'">
                        <span class="edit-btn" @click="fotEditClick(it)"><i class="iconfont el-icon-vip-shezhi-1"></i></span>
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
    <el-dialog append-to-body title="头部设置" :visible.sync="top_dialogBulk" width="600px" :close-on-click-modal="false">
        <el-form label-width="90px" class="admin-form">
            <div class="form-content">
                <el-form-item label="更换LOGO" prop="logo">
                <div class="up-img-form-item">
                  <!-- <div class="up-img-warp" v-if="postForm.logo">
                    <img :src="postForm.logo?(basurl+postForm.logo):default_img">
                  </div> -->
                  <div class="up-img-warp up-icon" @click="upImg()">
                    <span>上传图标</span>
                  </div>
                </div>
                </el-form-item>
                <el-form-item label="展示栏目">
                    <div class="btns-colse-warp">
                    <div class="btns-select-row" v-for="(it,i) in coumn_list" :key="i+'b'">
                        <el-select v-model="it.value" placeholder="请选择栏目">
                        <el-option :label="item.value" :value="item.key" v-for="(item,i) in coumn_data_list" :key="i+'coumn'">{{item.value||'无'}}</el-option>
                        </el-select>
                        <div class="btns-el-btn" @click="removeCoumn(i)" v-if="(coumn_list.length-1)!=i">
                        <i class="iconfont el-icon-vip-jianhao1"></i>
                        <span>删除</span>
                        </div>
                        <div class="btns-el-btn" @click="addCoumn" v-if="(coumn_list.length-1)==i">
                        <i class="iconfont el-icon-vip-tianjia1"></i>
                        <span>添加</span>
                        </div>
                    </div>
                    </div>
                    <!-- <p class="hint">栏目展示在顶部</p> -->
                </el-form-item>
                <el-form-item class="m-center">
                    <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm()">保存</el-button>
                </el-form-item>
            </div>
        </el-form>
    </el-dialog><!--头部设置-->
    <el-dialog append-to-body title="底部设置" :visible.sync="fot_dialogBulk" width="800px" :close-on-click-modal="false">
        <el-form label-width="70px" class="admin-form">
            <div class="form-content">
                <el-form-item label="底部信息" prop="defaultTemplate">
                    <vue-ueditor-wrap v-model="postForm.content" :config="myConfig" class="ueditors"></vue-ueditor-wrap>
                </el-form-item>
                <el-form-item label="JS路径" prop="visitUrl">
                  <div class="btns-colse-warp input-btns">
                    <div class="btns-select-row" v-for="(it,i) in coumn_list" :key="i+'b'">
                        <el-input v-model="postForm.visitUrl" placeholder="填写js在线地址或点击右侧上传(最多支持3个js文件)">
                          <template slot="append"><el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button></template>
                        </el-input>
                        <div class="btns-el-btn" @click="removeCoumn(i)" v-if="(coumn_list.length-1)!=i">
                        <i class="iconfont el-icon-vip-jianhao1"></i>
                        <span>删除</span>
                        </div>
                        <div class="btns-el-btn" @click="addCoumn" v-if="(coumn_list.length-1)==i">
                        <i class="iconfont el-icon-vip-tianjia1"></i>
                        <span>添加</span>
                        </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item class="m-center">
                    <el-button icon="iconfont el-icon-vip-baocun1" size="medium" type="primary" @click="submitForm()">保存</el-button>
                </el-form-item>
            </div>
        </el-form>
    </el-dialog><!--底部设置-->
    <el-dialog append-to-body title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleCloseImg">
        <UpdateImg @imgUrl="imgUrl" :imgWidth="100" :imgHeight="100"></UpdateImg>
    </el-dialog>
  </div>
</template>


<script>
import UpdateImg from "@/components/admin/common/UpdateImg";
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
  name: 'index',
  components:{UpdateImg,VueUeditorWrap},
  data() {
    return {
        dialogBulk:true,//模板选择
        top_dialogBulk:false,//头部设置
        fot_dialogBulk:false,//底部设置
        dialogUPimg:false,//图片上传
        coumn_list:[{value:''}],//新增删除栏目列表
        coumn_data_list:[],//栏目下拉选择列表
        head_list:[],
        footer_list:[],
        head_check:'',
        footer_check:'',
        postForm:{},
        //百度富文本
      myConfig: {
        toolbars: [[
          'undo', //撤销 
          'redo', //重做 
          'bold', //加粗 
          'indent', //首行缩进 
          'italic', //斜体 
          'underline', //下划线 
          'strikethrough', //删除线 
          'subscript', //下标 
          'formatmatch', //格式刷 
          'removeformat', //清除格式 
          'unlink', //取消链接 
          'insertrow', //前插入行 
          'insertcol', //前插入列 
          'fontfamily', //字体 
          'fontsize', //字号 
          'paragraph', //段落格式 
          'simpleupload', //单图上传 
          'link', //超链接
          'justifyleft', //居左对齐 
          'justifyright', //居右对齐 
          'justifycenter', //居中对齐 
          'justifyjustify', //两端对齐 
          'forecolor', //字体颜色 
          'backcolor', //背景色 
          'insertorderedlist', //有序列表 
          'insertunorderedlist', //无序列表 
          'imagecenter', //居中 
          'lineheight', //行间距 
        ]],
        autoHeightEnabled: false,// 编辑器不自动被内容撑高
        initialFrameHeight: 200,// 初始容器高度
        initialFrameWidth: '100%',// 初始容器宽度
        serverUrl: '',// 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        UEDITOR_HOME_URL: './static/assets/other/UEditor/'
      },
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
    //打开图标上传弹窗
    upImg(){
        console.log('11');
      this.dialogUPimg = true;
    },
    //获取图片上传返回地址
    imgUrl(val){
      this.postForm['logo'] = val[0];
      this.dialogUPimg = false;
    },
    //图片上传-弹窗关闭
    handleCloseImg(done) {
      done();
    },
    //删除多栏目投递
    removeCoumn(index){
      this.coumn_list.splice(index,1);
    },
    //添加多栏目投递
    addCoumn(){
      this.coumn_list.push({value:''});
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
                right: 10px;
                top: 10px;
                font-size: 18px;
                line-height: 14px;
                color: #999;
                &:hover{
                    color: #000;
                }
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





