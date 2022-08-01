<!---服务中台-场景-顶部信息-->
<template>
    <div class="drag-top c-l">
        <h1 class="step-num"><span class="num">1</span><span class="txt">场景信息</span></h1>
        <div class="s-col"><span class="s-txt">名称：</span><el-input class="w-saml" v-model="postForm.name" size="medium" placeholder="首页"></el-input></div><!--disabled="disabled"-->
        <div class="s-col"><span class="s-txt">服务状态：</span>
          <el-select class="w-saml" v-model="postForm.status" size="medium" placeholder="请选择">
            <el-option v-for="item in dataList.sceneStatus" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="s-col"><span class="s-txt">权限控制：</span>
          <el-select class="w-saml" v-model="postForm.visitorLimitType" @change="visitorLimitTypeCheck" size="medium" placeholder="请选择">
              <el-option v-for="item in (dataList.visitorLimitType||[])" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="s-col" v-if="visitorLimitType(postForm.visitorLimitType)"><span class="s-txt">{{visitorLimitTypeText(dataList.visitorLimitType)}}：</span>
          <!-- <el-select v-model="userType_data" @change="userClcik" size="medium" multiple collapse-tags placeholder="请选择">
              <el-option v-for="item in userType" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select> 多选-->
          <el-select v-model="userType_one" @change="userClcik" size="medium" placeholder="请选择">
              <el-option v-for="item in (userType||[])" :key="item.value" :label="item.key" :value="item.value"></el-option>
          </el-select>
        </div>
        <el-button class="default-btn-border" icon="iconfont el-icon-vip-gaojishezhi" size="medium" @click="header_footer_show = true">脚本设置</el-button>
        <el-button class="default-btn-border s-r-f-r" icon="iconfont el-icon-vip-baocun1" type="primary" size="medium" @click="$emit('saveClick')">保存</el-button>
        <el-button class="default-btn-border s-r-f-r" icon="iconfont el-icon-vip-yulan-1" type="primary" size="medium" @click="$emit('scenePreview')">预览</el-button>
        <el-button icon="iconfont el-icon-vip-fuzhi" size="medium" class="s-r-f-r" v-if="id" @click="copyURL()">复制链接</el-button>
        <advanced @hfHide="header_footer_show = false" :postForm="postForm" v-if="header_footer_show"></advanced>
    </div><!--顶部条件筛选 end-->
    
</template>

<script>
import advanced from "./advanced.vue";//高级设置
export default {
  name: 'index',
  props:['dataList','postForm'],
  components:{advanced},
  watch: {
    'postForm.name'(nval, oval) {
      this.$forceUpdate();
    }
  },
  data () {
    return {
      id:this.$route.query.id,
      header_footer_show:false,
      head_fot_data:{footerTemplate:{},headerTemplate:{}},
      userType: [],//用户类型列表
      userType_data:[],//多选
      userType_one:'',
    }
  },
  methods:{
    //设置详情
    setDatils(val){
      this.head_fot_data={
        footerTemplate:val.footerTemplate,
        headerTemplate:val.headerTemplate,
      }
    },
    //复制url
    copyURL(){
      let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
      let info = urlInfo.find(item => item.code == 'index');
      
      this.http.getPlain_url('scene-url-by-id','/'+this.id).then(res=>{
        // if(prompt("请按Ctrl+C复制", info.path + res.data)){}
        this.clipboardCopy(info.path + res.data);
      }).catch(err=>{
        this.$message({message: '地址获取失败',type:'error'});
      })
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

    //用户类型
    userClcik(val){
      this.postForm.sceneUsers = [{sceneId:this.id,userSetId:val}]
      if(this.id){
        var userS = [];
        if(this.postForm.sceneUsers && this.postForm.sceneUsers.length>0){
          this.postForm.sceneUsers.forEach(it=>{
            userS.push(it.userSetId);
          })
        }
        this.$emit('getDetailsGroup',{visitorLimitType:this.postForm.visitorLimitType,userS:userS.join(';'),postUrl:'scene-detail-group'});
      }
    },
    //权限控制选择
    visitorLimitTypeCheck(val){
      //情况用户类型
      this.userType_one = '';

      if(val==0 || val == 1){
        var userS = [];
        if(this.postForm.sceneUsers && this.postForm.sceneUsers.length>0){
          this.postForm.sceneUsers.forEach(it=>{
            userS.push(it.userSetId);
          })
        }
        this.$emit('getDetailsGroup',{visitorLimitType:'',userS:userS.join(';'),postUrl:'scene-detail'});
      }
      this.userType_one = '';
      this.postForm.sceneUsers = [];
      this.getUserType(val,false);
      this.$forceUpdate()
    },
    //获取用户类型
    getUserType(id,is_edit){//is_edit:true,表示编辑
      if(!is_edit){
        this.postForm.user_type = [];
        this.userType_data = [];
      }
      this.http.getPlain_url('dictionary-by-type','/'+id).then(res=>{
        this.userType = res.data||[];
      }).catch(err=>{
        console.log(err);
      })
    },
    //是否显示用户选择框
    visitorLimitType(val){
      if(val==null || val=='' || val==0 || val ==1){
        return false;
      }else{
        return true;
      }
    },
    //权限-用户字段名称
    visitorLimitTypeText(val){
      var name = '';
      var t = (val||[]).filter(x=>x.value==this.postForm.visitorLimitType);
      if(t && t.length>0){
        name = t[0].key;
      }
      return name;
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../../assets/admin/css/style.less";
/*****顶部 */
.drag-top{
  width: 100%;
  min-height:64px;
  background: @fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  z-index: 7;
  position: relative;
  padding: 0 20px;
  .step-num{
    height: 100%;
    line-height: 60px;
  }
  .s-col{
    display: inline-block;
    margin-left: 30px;
    .s-txt{
      color: @34395E;
      font-style: 14px;
    }
    .w-saml{
      width: 136px;
    }
  }
  .default-btn-border{
    height: 36px !important;
    margin-left: 10px
  }
  .s-r-btns{
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .s-r-f-r{
    float: right;
    margin-top: 13px;
  }
}
/deep/.el-tag.el-tag--info .el-select__tags-text{
  max-width: 100px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.el-select .el-tag__close.el-icon-close{
  top: -7px;
}
</style>
