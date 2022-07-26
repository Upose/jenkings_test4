<!---服务中台-栏目-左边2,3步骤 -->
<template>
  <div class="drag-r" :class="right_fold?'drag-r-hide':''">
    <div class="drag-r-pad">
      <div class="right-check-page">
        <div class="drag-r-warp">
          <h1 class="step-num">
            <div class="title"><span class="num">4</span><span class="txt">应用设置</span></div>
            <div class="app-name" v-show="apps_name">选中应用：<i class="name">{{apps_name}}</i></div>
          </h1>
          <div class="select-type">
            <h2 class="s-title">选择样式</h2>
            <div class="s-list">
              <div class="d-temp-box" v-for="(it,i) in template_list" :class="template_check == it.id?'d-temp-box-check':''" @click="appsTemplate(it,i)" :key="i">
                <img :src="fileUrl+it.cover" />
                <span class="temp-name">{{it.name||'无'}}</span>
                <el-button type="primary" class="button" size="mini"><i class="iconfont" :class="template_check == it.id?'el-icon-vip-check':'el-icon-vip-no-check'"></i> 选用</el-button>
              </div>
            </div>
          </div>
          <!--选择样式 end-->

          <div class="select-type">
            <h2 class="s-title bor-botm">设置内容</h2>
            <div class="model-set-w r-model-w c-l">
                <el-button class="default-btn-border btn-block" icon="el-icon-setting" v-if="is_hf=='foot'" size="medium" :data="postForm.footerTemplate" @click="footSetShow()">底部高级设置</el-button>
                <el-button class="default-btn-border btn-block" icon="el-icon-setting" v-if="is_hf=='header'" size="medium" :data="postForm.headerTemplate" @click="headSetShow()">头部高级设置</el-button>
                <div v-if="template_check && !is_hf" class="up-img w100" :style="{'background-image':'url('+fileUrl+(configParameter.bgImg||'')+')'}">
                  <div><img src="@/assets/admin/img/icon-upload.png"/><span>组件背景更换</span></div>
                  <input type="file" :id="'file_bg'" multiple="multiple" @change="handleFileJS">
                </div>
                <div class="row-switch" v-if="template_check && !is_hf">
                  <span class="title">组件全屏：</span>
                  <el-tooltip class="item" effect="dark" content="组件宽度为100%时此设置生效" placement="top">
                    <el-switch :active-value="true" :inactive-value="false" v-model="configParameter.fullScreen"></el-switch>
                  </el-tooltip>
                </div>
            </div><!--组件配置 end-->

            <div class="s-choose">
              <div class="" v-for="(it,i) in set_list" :key="i">
                <div class="s-c-row" v-if="availableConfig.indexOf('1')>-1">
                  <h2 class="s-title">绑定栏目 <span class="s-edit" v-if="i!=0" @click="removeRow(i)">删除</span></h2>
                  <el-select class="w-saml" v-model="it.id" size="medium" placeholder="请选择">
                    <el-option v-for="(item,i) in appPlateList" :key="i+'c'" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
                <div class="s-c-row" v-if="availableConfig.indexOf('2')>-1">
                  <h2 class="s-title">显示条数</h2>
                  <el-select class="w-saml" v-model="it.topCount" size="medium" placeholder="请选择">
                    <el-option v-for="(item,i) in topCountList" :key="i+'b'" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
                <div class="s-c-row" v-if="availableConfig.indexOf('3')>-1">
                  <h2 class="s-title">排序规则</h2>
                  <el-select class="w-saml" v-model="it.sortType" size="medium" placeholder="请选择">
                    <el-option v-for="(item,i) in sortList" :key="i+'a'" :label="item.key" :value="item.value"></el-option>
                  </el-select>
                </div>
              </div>
              <button class="s-c-add" @click="addRow()" v-if="this.availableConfig.indexOf('1')!=-1"><i class="el-icon-plus"></i><span>添加一组栏目</span></button>
              <el-button class="default-btn-border btn-block" icon="el-icon-setting" v-if="isShowBtn()" @click="saveClick('edit')" size="medium">保存</el-button>
            </div><!--栏目配置 end--->

          </div>
          <!--设置内容 end-->
        </div>
        <!--右边菜单 end-->
      </div>
      <i class="cut-btn" :class="right_fold?'el-icon-arrow-left':'el-icon-arrow-right'" @click="rightFold()"></i>
    </div>
    <headerSet v-if="headerSet" :postForm="postForm" @hfHide="hfHide" ></headerSet>
    <footerSet v-if="footerSet" :postForm="postForm" @hfHide="hfHide"></footerSet>
  </div>
  <!--右边菜单 end-->
</template>

<script>
import headerSet from "./headerSet.vue";//头部设置
import footerSet from "./footerSet";//底部设置
export default {
  name: 'index',
  mounted() { },
  props:['postForm'],
  components:{headerSet,footerSet},
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      is_hf:null,//是否头部底部组件 有值为头部底部，无值为应用组件
      configParameter:{
        bgImg:'',
        fullScreen:false
      },//组件背景+是否全屏展示
      apps_name: '',//应用名称
      headerSet:false,
      footerSet:false,
      right_fold: false,
      is_add: true,//是点击应用添加，还是点击的渲染模板，true为点击应用
      availableConfig: '',//显示哪几栏设置
      sortList: [],//排序列表
      topCountList: [],//显示条数列表
      appPlateList: [],//栏目列表
      template_list: [],//模板列表
      template_check: '',//选择的模板id
      set_list: [ //这里为了渲染有哪几栏，有哪些设置参数
        {
          topCount: '',//数据条数-（需要参数）
          sortType: '',//排序方式 1-创建时间倒序 2-访问量倒序-（需要参数）
          id: '',//应用栏目标识 -（需要参数）
          orderIndex: 1,//排序标识
        }
      ],
    }
  },

  methods: {
    //获取头部底部模板
    getHFlist(val){
      this.availableConfig = '';
      this.is_hf = val;
      this.http.getPlain_url('app-widget-list-by-app-id', '/' + val).then(res => {
        this.template_list = res.data || [];
        if(val=='foot'){
          this.template_check = this.postForm.footerTemplate.id||'';
        }else{
          this.template_check = this.postForm.headerTemplate.id||'';
        }
      })
    },
    //显示当前组件属于哪个应用
    setAppsName(val) {
      this.apps_name = val;
    },
    /***右边折叠 */
    rightFold() {
      this.right_fold = !this.right_fold;
      this.$emit("update:right_fold", this.right_fold);
    },
    //更新头尾（注意：这里还差一个判断，已经加载过的js和css文件不要重复加载）
    updateHF(){
      if(this.is_hf == 'foot'){
        this.$emit('loadHeadFoot','foot');
      }else{
        this.$emit('loadHeadFoot','header');
      }
    },
    //应用详情
    appDetails(val) {
      this.is_hf = null;
      var _this = this;
      _this.is_add = val.is_add;
      //获取应用组件列表 /{appid}
      _this.http.getPlain_url('app-widget-list-by-app-id', '/' + val.id).then(res => {
        _this.template_list = res.data || [];
        if (val.is_add) {
          _this.set_list = [{ topCount: '', sortType: '', id: '', orderIndex: 1 }];
          //获取模板列表，默认选中第一个模板
          if (_this.template_list.length > 0) {
            //默认选择添加第一个模板之后，需要将当前渲染的那一个模板id拿到，方便做应用选择。
            _this.appsTemplate(_this.template_list[0], 'add');
            _this.template_check = _this.template_list[0].id;
            _this.$emit('addCompont', { 'list': _this.template_list[0], 'is_add_compont': true });
          }
        } else {//修改
          _this.set_list = JSON.parse((val.set_list || "[]").replace(/'/g, '"'));
          _this.configParameter = JSON.parse((val.configParameter || "{}").replace(/'/g, '"'));
          if (_this.set_list.length == 0) {
            _this.set_list = [{ topCount: '', sortType: '', id: '', orderIndex: 1 }];
          }
          _this.template_check = val.temp_id;
          var index = 0;
          _this.template_list.forEach((item, i) => {
            if (item.id == val.temp_id) {
              index = i;
            }
          })
          _this.appsTemplate(_this.template_list[index], 'edit');
        }
      }).catch(err => {
        console.log(err);
      })
    },
    //选择某个模板
    appsTemplate(val, isAdd) {
      if(this.template_check == val.id && this.is_hf) return;//这里是为了头尾，选择模板时已经选择的，不要再做下面的操作
      this.template_check = val.id;
      /***********************针对头部底部 start */
      if(this.is_hf){
        var obj = {};
        if(this.is_hf=='foot'){
          this.postForm.footerTemplate
        }else{
          this.postForm.headerTemplate
        }
        obj.id = val.id;
        obj.router = val.target;
        obj.templateCode = val.widgetCode;

        if(this.is_hf=='foot'){
          this.postForm.footerTemplate = obj;
          document.getElementById('jl_vip_zt_footer_warp').innerHTML='<div id="'+('jl_vip_zt_'+new Date().getTime())+'"></div>';
        }else{
          this.postForm.headerTemplate = obj;
          document.getElementById('jl_vip_zt_header_warp').innerHTML='<div id="'+('jl_vip_zt_'+new Date().getTime())+'"></div>';
        }
        setTimeout(() => {
          this.updateHF();
        }, 50);
        return;
      }
      /***********************针对头部底部 end */

      
      this.availableConfig = val.availableConfig;//有哪几项设置
      this.sortList = val.sortList;//排序
      if (this.set_list[0] && !this.set_list[0].sortType) {
        this.set_list[0].sortType = val.sortList[0].value;
      }
      //获取应用栏目列表 /{appid}
      this.http.getPlain_url('app-plate-list-by-app-id', '/' + val.appId).then(res => {
        this.appPlateList = res.data || [];
        if (this.set_list[0] && !this.set_list[0].id) {
          this.set_list[0].id = res.data[0].value;
        }
      }).catch(err => {
        console.log(err);
      })
      this.topCountList = val.topCountList;//显示条数
      if (this.set_list[0] && !this.set_list[0].topCount) {
        this.set_list[0].topCount = val.topCountList[0].value;
      }
      if (isAdd == 'add') {
        console.log('应用点击的默认添加第一个模板');
        setTimeout(() => {
          this.saveClick('add');
        }, 100)
      } else {//修改这个地方，稍微有点问题。
        val['appPlateItems'] = this.set_list || [];
        val['configParameter'] = this.configParameter || {};
        this.$emit('addCompont', { 'list': val, 'is_add_compont': false });
      }
      this.$forceUpdate();
    },
    //添加一组
    addRow() {
      var index = this.set_list.length;
      this.set_list.push({
        topCount: '',
        sortType: '',
        id: '',
        orderIndex: index + 1,
      });
    },
    //删除一组
    removeRow(index) {
      this.set_list.splice(index, 1);
      this.saveClick('edit');
    },
    //是否显示保存按钮
    isShowBtn() {
      if (this.availableConfig && this.availableConfig != "") {
        return true;
      } else {
        return false;
      }
    },
    /**保存的时候，需要将所有的参数循环塞入到对应选择的模板中，塞入到close按钮上一层参数。循环塞入，可能有多层。
        取值时，需要将所有的参数获取，并且也需要循环取多层值。然后根据顺序，默认到页面取的数组中去。、
    */
    saveClick(val) {
      var is_cu_temp = document.getElementsByClassName('mask-layer-active');
      var divId = is_cu_temp[0].parentNode.dataset.id;
      is_cu_temp[0].setAttribute('data-set', JSON.stringify(this.set_list));
      is_cu_temp[0].offsetParent.setAttribute('data-set', JSON.stringify(this.set_list));
      is_cu_temp[0].offsetParent.setAttribute('data-obj', JSON.stringify(this.configParameter));
      // var cs = is_cu_temp[0].offsetParent.getAttribute('class').replace('jl_vip_zt_vray','');
      // is_cu_temp[0].offsetParent.setAttribute('class',cs);
      //将父级的jl_vip_zt_vray去除
      this.$emit('saveTempSet', { 'list': this.set_list,'configParameter':this.configParameter, 'divId': divId });//这里还需要把内容存到要要提交的数据中
      if (val == 'edit') {
        //刷新
        setTimeout(() => {
          this.appDetails({ 'id': is_cu_temp[0].dataset.appid, 'temp_id': is_cu_temp[0].dataset.appwidgetid, 'is_add': false, 'set_list': JSON.stringify(this.set_list),'configParameter': JSON.stringify(this.configParameter) });//设置成功，重新点击一次让模板刷新；
        }, 400);
      }
    },
    //头部高级设置
    headSetShow(){
      this.headerSet = true;
    },
    //底部高级设置
    footSetShow(){
      this.footerSet = true;
    },
    hfHide(val){
      console.log('隐藏头部底部');
      var templateCode = '';
      if(this.is_hf=='foot'){
        this.footerSet = false;
        if(val){
          templateCode = this.postForm.footerTemplate.templateCode;
          document.getElementById('jl_vip_zt_footer_warp').innerHTML='<div id="'+('jl_vip_zt_'+new Date().getTime())+'"></div>';
        }
      }else{
        this.headerSet = false;
        if(val){
          templateCode = this.postForm.headerTemplate.templateCode;
          document.getElementById('jl_vip_zt_header_warp').innerHTML='<div id="'+('jl_vip_zt_'+new Date().getTime())+'"></div>';
        }
      }
      if(val)this.$emit('refreshHF',templateCode);
    },
    //文件上传
    handleFileJS(e) {
      var _this = this;
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      if (!file) {
        return
      }
      let formData = new FormData()
      formData.append('files', file)
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/JPG' && file.type !== 'image/JPEG'&& file.type !== 'image/gif') {
        this.$message({ type: 'error', message: '请上传图片文件!' });
        return;
      }
      this.http.postFile("UploadFile", formData).then((res) => {
       this.configParameter.bgImg = res.data[0]||'';
       console.log(this.configParameter.bgImg);
      }).catch((err) => {
        this.$message({ type: 'error', message: '上传失败!' });
      });
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";
@import "../../../../assets/admin/css/style.less";
@import "../scene_set.less";
@import "./model.less";
</style>
