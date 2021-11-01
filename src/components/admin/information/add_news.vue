<!---新闻发布-具体栏目-新闻发布-->
<template>
  <div class="admin-warp-page">
    <el-container>
      <el-aside width="auto" :collapse="$root.collapse" :class="$root.collapse?'fold-menu':''"><serviceLMenu :isActive="2"></serviceLMenu></el-aside>
      <el-main class="admin-content pd admin-bg-top" :class="{'content-collapse':$root.collapse}">
        <breadcrumb :cuMenu="'新闻发布'" :fontColor="'fff'"></breadcrumb><!--面包屑导航--->
        <div class="content">
          <el-form :model="postForm" :rules="rules" ref="postForm" label-width="100px" class="admin-form">
            <h1 class="s-b-border-title">{{id?'编辑':'新增'}}新闻</h1>
            <div class="form-content">
              <el-form-item label="新闻标题" prop="title">
                <el-input v-model="postForm.title" placeholder="请输入新闻标题" class="txt-set">
                    <template slot="append">
                        <div class="news-font-set">
                          <i class="iconfont vip-B" @click="fontClick(titleStyleKV.B,'B')" :class="titleStyleKV.B?'active':''"></i>
                          <i class="iconfont vip-I" @click="fontClick(titleStyleKV.I,'I')" :class="titleStyleKV.I?'active':''"></i>
                          <i class="iconfont vip-u" @click="fontClick(titleStyleKV.U,'U')" :class="titleStyleKV.U?'active':''"></i>
                          <el-select class="width60" v-model="titleStyleKV.font" placeholder="请选择">
                              <el-option v-for="item in font_list" :key="item.title" :label="item.title" :value="item.title"></el-option>
                          </el-select>
                          <el-color-picker v-model="titleStyleKV.color"></el-color-picker>
                        </div>
                    </template>
                </el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="subTitle">
                <el-input v-model="postForm.subTitle" placeholder="请输入副标题"></el-input>
              </el-form-item>
              <div class="user-form-item">
                <label class="u-label"><span class="u-el-input">新闻标签</span></label>
                <div class="u-list">
                    <input type="text" v-model="postForm.parentCatalogue" class="u-input" placeholder="请输入新闻标签"/>
                    <el-button class="u-btn-r" icon="el-icon-search" size="medium" type="primary" @click="tagEditShow()">选择已有标签</el-button>
                    <tagEdit :dataList="tag_edit_data" @tagEditHide="tagEditHide" @checkTag="checkTag" v-if="tag_edit"></tagEdit>
                </div>
              </div>
              <el-form-item label="多栏目投递">
                <div class="btns-colse-warp">
                   <div class="btns-select-row" v-for="(it,i) in coumn_list" :key="i+'b'">
                     <el-select v-model="it.value" placeholder="请选择栏目">
                      <el-option :label="item.value" :value="item.key" v-for="(item,i) in coumn_data_list" :key="i+'coumn'">{{item.value||'无'}}</el-option>
                    </el-select>
                    <div class="btns-el-btn" @click="removeCoumn(i)" v-if="(coumn_list.length-1)!=i">
                      <i class="el-icon-minus"></i>
                      <span>删除</span>
                    </div>
                    <div class="btns-el-btn" @click="addCoumn" v-if="(coumn_list.length-1)==i">
                      <i class="el-icon-plus"></i>
                      <span>投递</span>
                    </div>
                   </div>
                </div>
                <p class="hint">每条内容支持最多同时投递到3个新闻栏目内。{{id?postForm.cover:(base_url+postForm.cover)}}</p>
              </el-form-item>
              <el-form-item label="内容封面">
                <div class="up-img-form-item">
                  <!-- <div class="up-img-warp up-img-cover-img" v-if="id"> -->
                  <div class="up-img-warp up-img-cover-img" v-if="postForm.cover">
                    <img :src="base_url+postForm.cover">
                  </div>
                  <div class="up-img-warp up-icon up-img-cover-icon" @click="upImg()">
                    <span>上传封面</span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="发布人">
                <el-input v-model="postForm.publisher" placeholder="请输入发布人"></el-input>
              </el-form-item>
              <el-form-item label="发布日期">
                <el-date-picker v-model="postForm.publishDate" type="date" class="data-clear-icon" placeholder="请选择发布日期"></el-date-picker>
              </el-form-item>
              <el-form-item label="显示状态">
                <el-radio-group v-model="postForm.status">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2">下架</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="投递终端">
                <el-checkbox-group v-model="postForm.terminals">
                  <el-checkbox :label="1" name="type">PC门户</el-checkbox>
                  <el-checkbox :label="2" name="type">微信小程序</el-checkbox>
                  <el-checkbox :label="3" name="type">手机APP</el-checkbox>
                  <el-checkbox :label="4" name="type">大厅查询机</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item :label="item.value" v-for="(item,index) in row_list" :key="index +'row'">
                <el-input v-model="item.input_val" v-if="id" :placeholder="'请输入'+item.value" :value="item.get_val"></el-input>
                <el-input v-model="item.input_val" v-if="!id" :placeholder="'请输入'+item.value"></el-input>
              </el-form-item>
              <el-form-item label="内容">
                <div class="filter-form-item">
                    <div class="filter-r-t-editor">
                      <div class="filter-f-title">
                        <span class="filter-box-col" @click="handleClick('div1')" :class="activeName=='div1'?'active':''">编辑内容</span>
                        <span class="filter-box-col" @click="handleClick('div2')" :class="activeName=='div2'?'active':''">链接跳转</span>
                        <span class="filter-hint">填写链接后，编辑内容将不会显示，直接跳转链接</span>
                      </div>
                      <div v-show="activeName=='div1'">
                        <div class="edit-fwb" v-show="edit_check==1"><textarea id="mytextarea" v-model="postForm.content"></textarea> </div>
                        <div class="edit-fwb" v-show="edit_check==2"><textarea id="remark_textarea" v-model="postForm.content" style="display: none;"></textarea></div>
                        <div class="edit-check-list">
                          <div class="edit-col" @click="editorCheck(1)" :class="edit_check==1?'edit-col-active':''"><i class="el-icon-document filter-icon"></i>编辑器1</div>
                          <div class="edit-col" @click="editorCheck(2)" :class="edit_check==2?'edit-col-active':''"><i class="el-icon-document filter-icon"></i>编辑器2</div>
                        </div>
                      </div>
                      <div class="table-pd" v-show="activeName=='div2'">
                        <textarea class="table-el-textarea" v-model="postForm.linkUrl" placeholder="请输入链接地址"></textarea>
                      </div>
                    </div>
                </div>
              </el-form-item>
              <el-form-item>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm',it.key)" v-for="(it,index) in postForm.nextAuditStatus" :key="index+'bts'">{{it.value||'保存'}}</el-button>
                </div>
                <!-- <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm')">保存</el-button>
                  <el-button icon="el-icon-close" size="medium">保存并发布</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" type="primary">保存</el-button>
                  <el-button icon="el-icon-close" size="medium">保存并提交</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" class="admin-red-btn">初审不通过</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">初审通过</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" type="primary">保存</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">初校完成</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" class="admin-red-btn">二审不通过</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">二审通过</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" type="primary">保存</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">二校完成</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" class="admin-red-btn">终校不通过</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">终校通过</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" type="primary">保存</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">终校完成</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-close" size="medium" class="admin-gray-btn">取消</el-button>
                  <el-button icon="el-icon-close" size="medium" class="admin-green-btn">预览</el-button>
                  <el-button icon="el-icon-check" size="medium" type="primary" @click="drawBack">退回</el-button>
                  <el-button icon="el-icon-close" size="medium" type="primary">发布</el-button>
                </div> -->
              </el-form-item>
            </div>
          </el-form>
        </div><!---顶部查询板块 end--->
        <el-dialog title="图片上传" :visible.sync="dialogUPimg" width="550px" :close-on-click-modal="false" :before-close="handleClose">
          <UpdateImg @imgUrl="imgUrl" :imgWidth="214" :imgHeight="100"></UpdateImg>
        </el-dialog>

        <el-dialog title="退回备注" :visible.sync="draw_back" width="480px" :close-on-click-modal="false" :before-close="handleClose">
          <div class="">
            <el-input type="textarea" v-model="postForm.desc" rows="8" placeholder="输入备注原因"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button icon="el-icon-close" size="medium" @click="drawBackClose()">取消</el-button>
              <el-button icon="el-icon-check" size="medium" type="primary" @click="submitForm('postForm')">保存</el-button>
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
import tagEdit from "../model/tagEdit";

export default {
  name: 'index',
  created(){
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
    //当前栏目信息-左边菜单栏目
    this.http.postJson('news-column-get',this.columnID).then(res=>{
      if(res.data){
        this.row_list = res.data.extensionKV||[];
        if(this.$route.id==undefined){
          this.postForm['nextAuditStatus'] = res.data.contentDefaultAuditStatusKV||[];
        }
      }
    }).catch(err=>{})
    //栏目列表
    this.http.postJson('delivery-column-list-get',this.columnID).then(res=>{
      this.coumn_data_list = res.data||[];
    }).catch(err=>{})
    //获取标签列表
    this.http.postJson('lable-info-get-by-type',2).then(res=>{
      this.tag_edit_data = res.data||[];
    }).catch(err=>{})
  },
  components:{footerPage,serviceLMenu,breadcrumb,UpdateImg,tagEdit},
  mounted(){
    var _this = this;
    //tinymce 编辑器
        tinymce.init({
          selector: '#mytextarea',
          language: 'zh_CN',
          height: 400,
       });
      //layui编辑器
      window.layui.use('layedit', function(){
          this.layedit = window.layui.layedit;
          this.layedit.build('remark_textarea',{
              height: 350,//高度
            //   tool: ['strong', 'italic', 'underline','del','|','link','face']
            tool: [
                'strong' //加粗
                ,'italic' //斜体
                ,'underline' //下划线
                ,'del' //删除线
                ,'|' //分割线
                ,'left' //左对齐
                ,'center' //居中对齐
                ,'right' //右对齐
                ,'link' //超链接
                ,'unlink' //清除链接
                ,'face' //表情
                ,'image' //插入图片
                ,'help' //帮助
            ]
          });
        })
      //获取修改信息
      if(this.id && this.id!=undefined){
        //获取新闻详情
        this.http.postJson('news-content-manage-get',this.id).then(res=>{
          this.postForm = res.data.content||{};
          var list = res.data.content||{};
          //按钮集合
          this.postForm['nextAuditStatus'] = res.data.nextAuditStatus||[];
          //标题样式设置
          if(list.titleStyleKV && list.titleStyleKV!=undefined){
            list.titleStyleKV.forEach(item=>{
              if(item.key == 'B'||item.key == 'I'||item.key == 'U'){
                this.titleStyleKV[item.key] = item.value;
              }
              this.titleStyleKV[item.key] = item.value;
            })
          }
          //投递终端
          if(list.terminals){
            this.postForm.terminals = list.terminals.split(';')||[];
            this.postForm.terminals.forEach((item,index)=>{ 
              this.postForm.terminals[index] = parseInt(item);
            })
          }else{
            this.postForm.terminals = [];
          }
          //多栏目投递 columnIDs
          if(list.columnIDs){
            var c_list = list.columnIDs.split(';')||[];
            if(c_list.length>1){
              for(var i=0;i<c_list.length;i++){
                if(_this.coumn_list[i]){
                  _this.coumn_list[i]['value'] = c_list[i];
                }else{
                 if(c_list[i]!='') _this.coumn_list.push({'value':c_list[i]});
                }
              }
            }
          }
          //扩展项
          this.row_list.forEach((item,index)=>{
            if(item.key == 'Author'){
              item.get_val = list.author;
            }
            if(item.key == 'Keywords'){
              item.get_val = list.keywords;
            }
            if(item.key == 'ExpirationDate'){
              item.get_val = list.expirationDate;
            }
            if(item.key == 'JumpLink'){
              item.get_val = list.jumpLink;
            }
            if(item.key == 'ParentCatalogue'){
              item.get_val = list.parentCatalogue;
            }
            if(item.key == 'ExpendFiled1'){
              item.get_val = list.expendFiled1;
            }
            if(item.key == 'ExpendFiled2'){
              item.get_val = list.expendFiled2;
            }
            if(item.key == 'ExpendFiled3'){
              item.get_val = list.expendFiled3;
            }
            if(item.key == 'ExpendFiled4'){
              item.get_val = list.expendFiled4;
            }
            if(item.key == 'ExpendFiled5'){
              item.get_val = list.expendFiled5;
            }
          })
        }).catch(err=>{
            console.log(err);
        })
      }
    },
  data () {
    return {
      base_url:process.env.VUE_APP_IMG_URL,
      columnID:this.$route.query.c_id,//栏目id-左边菜单
      layedit:null,
      row_list:[],//栏目定义的扩展字段列表
      coumn_list:[{value:''}],//新增删除栏目列表
      draw_back:false,//退回弹窗
      dialogUPimg:false,//图片上传
      tag_edit:false,//打开-选择已有标签弹窗
      tag_edit_data:[],//选择标签列表
      id:this.$route.query.id||'',
      edit_check:1,//编辑器切换
      activeName:"div1",//富文本还是链接
      coumn_data_list:[],//栏目下拉选择列表
      font_list:[ //字体大小
        {title:14},
        {title:16},
        {title:20},
        {title:24},
        {title:28},
        {title:30},
        {title:32},
      ],
      titleStyleKV:{//标题样式设置
        B:false,
        I:false,
        U:false,
        font:20,
        color:'#000000',
      },
      postForm: {terminals:[]},
      rules: {
          title: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ],
          desc: [
              { required: true, message: '请输入内容', trigger: 'blur' }
          ]
      },
    }
  },
  methods:{
    //标签选择
    checkTag(val){
      this.postForm.parentCatalogue = val;
      this.$forceUpdate();
    },
    //字体设置-点击事件
    fontClick(val,key){
      this.titleStyleKV[key] = !val;
    },
    //删除多栏目投递
    removeCoumn(index){
      this.coumn_list.splice(index,1);
    },
    //添加多栏目投递
    addCoumn(){
      this.coumn_list.push({value:''});
    },
    //退回-打开弹窗
    drawBack(){
      this.draw_back = true;
    },
    //退回-关闭弹窗
    drawBackClose(){
      this.draw_back = false;
    },
    handleClick(val){
      this.activeName = val;
    },
    imgUrl(val){
      this.postForm['cover'] = val[0];
      this.dialogUPimg = false;
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
    //打开-选择已有标签
    tagEditShow(){
      this.tag_edit = true;
    },
    //关闭-选择已有标签
    tagEditHide(){
      this.tag_edit = false;
    },
    //编辑器切换
    editorCheck(val){
        this.edit_check = val;
    },
    //表单提交
    submitForm(formName,val) {
      var _this = this;
      if(val == 9){ //表示退回
        this.draw_back = true;
      }else{
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //新闻标题样式
            var list = [];
            for(var item in _this.titleStyleKV){
              list.push({key:item,value:_this.titleStyleKV[item]});
            }
            _this.postForm.titleStyleKV = list;
            //多栏目投递
            var coumn_list = '';
            _this.coumn_list.forEach(item=>{
              if(coumn_list.indexOf(item.value)==-1){
                coumn_list = coumn_list+item.value+';';
              }
            });
            //扩展项
            _this.row_list.forEach(item=>{
              _this.postForm[item.key] = item.input_val||item.get_val;
            })
            _this.postForm.columnIDs = coumn_list;
            _this.postForm.content = tinyMCE.activeEditor.getContent()||'';//获取富文本信息
            if(_this.id){
              this.http.postJson('news-content-update',_this.postForm).then(res=>{
                _this.$message({type: 'success',message: '提交成功!'});
              }).catch(err=>{
                _this.$message({type: 'error',message: '提交失败!'});
              })
            }else{
              _this.postForm['columnID'] = _this.columnID;
              _this.postForm['publisher'] = 'cqviptest';//这个地方应该由后台改为自动为登录用户，不用前端传
              this.http.postJson('news-content-add',_this.postForm).then(res=>{
                if(res.data.succeed){
                  _this.$message({type: 'success',message: '提交成功!'});
                }else{
                  _this.$message({type: 'error',message: res.data.message||'提交失败'});
                }
              }).catch(err=>{
                _this.$message({type: 'error',message: '提交失败!'});
              })
            }
          }
        });
      }
    },
    
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";/**颜色配置 */
@import "../../../assets/admin/css/form.less";
  .content{
    background-color: @fff;
    border-radius: 4px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    .form-content{
    //   max-width: 760px;
        .el-input,.up-img-form-item{
            width: 500px;
        }
    }
  }
  .form-content{
      .m-top{
          margin-top: 10px;
      }
    .user-form-item{
        .u-label{
            width: 100px !important;
        }
        .u-input{
            padding-right: 140px !important;
        }
        .u-list{
            margin-left: -4px;
            padding-right:130px !important;
        }
        .u-btn-r{
            width: 130px !important;
        }
    }
    .txt-set{
      /deep/.el-input-group__append{
          padding: 0 10px;
      }
    }
    .news-font-set{
        height: 38px;
        display: flex;
        align-items: center;
        i{
            cursor: pointer;
            margin-right: 5px;
            &:hover{
              color: @666;
            }
        }
        .active{
          color: @f28102 !important;
        }
        /deep/.el-popover{
            min-width: 50px;
        }
        /deep/ .el-input__suffix{
            display: none;
        }
        /deep/.el-input--suffix .el-input__inner{
            padding-right: 0;
            text-align: center;
            padding-left: 0;
        }
        .width60{
            width: 30px;
            margin: 0;
        }
        /deep/.el-input-group--append .el-input__inner{
            padding-right: 0 !important;
        }
    }
    /****新闻标题设置颜色和字体样式 */
    /deep/.el-color-picker__trigger{
        width: 30px;
        height: 30px;
    }
    /deep/.el-color-picker{
        height: 30px;
    }
    /*****以下是富文本编辑器的重置样式 */
    /deep/.tox-tinymce{
        border: 1px solid #eee;
    }
    /deep/ .tox .tox-menubar+.tox-toolbar-overlord .tox-toolbar__primary{
        border-top: 1px solid #eee;
    }
    /deep/.tox .tox-statusbar{
        border-top:1px solid #eee;
    }
    /deep/.tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type){
        border-right: 1px solid #eee;
    }
    /deep/.tox .tox-menubar{
        background:none;
    }
    /deep/.tox .tox-toolbar__primary{
        background:none;
        border-bottom: 1px solid #eee;
    }
  }
</style>
