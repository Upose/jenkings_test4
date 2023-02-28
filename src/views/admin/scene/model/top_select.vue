<!---服务中台-场景-顶部信息-->
<template>
  <div class="drag-top c-l" :class="top_fold?'top0':'top100'">
    <div class="drag-top-w">
      <h1 class="step-num"><span class="iconfont el-icon-vip-pintu"></span><span class="txt">场景信息<i class="el-icon-caret-right"></i></span></h1>
      <div class="s-col ml-0"><span class="s-txt">名称：</span>
        <el-input class="w-saml" v-model="postForm.name" size="medium" placeholder="首页"></el-input>
      </div>
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
      <label class="btns-w">
        <el-button class="default-btn-border s-r-f-r" icon="iconfont el-icon-vip-baocun1" type="primary" size="medium" @click="$emit('saveClick')">保存</el-button>
        <el-button class="default-btn-border s-r-f-r" icon="iconfont el-icon-vip-yulan-1" type="primary" size="medium" @click="$emit('scenePreview')">预览</el-button>
        <el-button icon="iconfont el-icon-vip-fuzhi" size="medium" class="s-r-f-r" v-if="id" @click="copyURL()">复制链接</el-button>
      </label>
      <!-- <i class="cut-btn" :class="top_fold?'el-icon-arrow-up':'el-icon-arrow-down'" @click="topFold()"></i> 折叠顶部按钮 -->
    </div>
  </div>
  <!--顶部条件筛选 end-->

</template>

<script>
export default {
  name: 'index',
  props: ['dataList', 'postForm'],
  watch: {
    'postForm.name'(nval, oval) {
      this.$forceUpdate();
    },
    'dataList.sceneStatus'(nval, oval) {
      if(!this.id && this.dataList.sceneStatus){
        this.postForm['status']=this.dataList.sceneStatus[0].value||0;
        this.postForm['visitorLimitType']=this.dataList.visitorLimitType[0].value||0;
      }
    },
    'postForm.visitorLimitType'(nval, oval){
        if(this.postForm['visitorLimitType']!=0&&this.postForm['visitorLimitType']!=''&&this.postForm['visitorLimitType']!=1){
          this.getUserType(this.postForm['visitorLimitType'], false);
        }
    },
  },
  data() {
    return {
      id: this.$route.query.id,
      head_fot_data: { footerTemplate: {}, headerTemplate: {} },
      userType: [],//用户类型列表
      userType_data: [],//多选
      userType_one: '',
      top_fold:true,
    }
  },
  methods: {
    //设置详情
    setDatils(val) {
      this.head_fot_data = {
        footerTemplate: val.footerTemplate,
        headerTemplate: val.headerTemplate,
      }
    },
    //复制url
    copyURL() {
      let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
      let info = urlInfo.find(item => item.code == 'index');

      this.http.getPlain_url('scene-url-by-id', '/' + this.id).then(res => {
        // if(prompt("请按Ctrl+C复制", info.path + res.data)){}
        this.clipboardCopy(info.path + res.data);
      }).catch(err => {
        this.$message({ message: '地址获取失败', type: 'error' });
      })
    },
    //插件-复制
    clipboardCopy(txt) {
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
      this.$message({ message: '复制成功', type: 'success' });
      document.body.removeChild(transfer);//删除控件
    },

    //用户类型
    userClcik(val) {
      this.postForm.sceneUsers = [{ sceneId: this.id, userSetId: val }]
      if (this.id) {
        var userS = [];
        if (this.postForm.sceneUsers && this.postForm.sceneUsers.length > 0) {
          this.postForm.sceneUsers.forEach(it => {
            userS.push(it.userSetId);
          })
        }
        this.$emit('getDetailsGroup', { visitorLimitType: this.postForm.visitorLimitType, userS: userS.join(';'), postUrl: 'scene-detail-group' });
      }
    },
    //权限控制选择
    visitorLimitTypeCheck(val) {
      console.log(val);
      //情况用户类型
      this.userType_one = '';

      if (val == 0 || val == 1) {
        var userS = [];
        if (this.postForm.sceneUsers && this.postForm.sceneUsers.length > 0) {
          this.postForm.sceneUsers.forEach(it => {
            userS.push(it.userSetId);
          })
        }
        this.$emit('getDetailsGroup', { visitorLimitType: '', userS: userS.join(';'), postUrl: 'scene-detail' });
      }
      this.userType_one = '';
      this.postForm.sceneUsers = [];
      this.getUserType(val, false);
      this.$forceUpdate()
    },
    //获取用户类型
    getUserType(id, is_edit) {//is_edit:true,表示编辑
      if (!is_edit) {
        this.postForm.user_type = [];
        this.userType_data = [];
      }
      this.http.getPlain_url('dictionary-by-type', '/' + id).then(res => {
        this.userType = res.data || [];
      }).catch(err => {
        console.log(err);
      })
    },
    //是否显示用户选择框
    visitorLimitType(val) {
      if (val == null || val == '' || val == 0 || val == 1) {
        return false;
      } else {
        return true;
      }
    },
    //权限-用户字段名称
    visitorLimitTypeText(val) {
      var name = '';
      var t = (val || []).filter(x => x.value == this.postForm.visitorLimitType);
      if (t && t.length > 0) {
        name = t[0].key;
      }
      return name;
    },
    //展开收折菜单
    topFold(){
      this.top_fold = !this.top_fold;
    },
  },
}
</script>

<style lang="less" scoped>
@import "~@/assets/admin/css/color.less";
@import "~@/assets/admin/css/style.less";
.drag-top-w {
  position: relative;
  padding-right:250px;
  .cut-btn {
    cursor: pointer;
    display: block;
    left: 50%;
    margin-left: -33px;
    position: absolute;
    color: #fff;
    width: 65px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    // background: #a5b3cc;
    background: rgba(62 ,83 ,238,.7);
    border: 1px solid #a5b3cc;
    user-select: none;
    border-radius: 0px 0 40px 40px;
    transition: all .3s;
    &:hover{
      background:#3e53ee;
    }
  }
}
/*****顶部 */
.drag-top {
  width: 100%;
  min-height: 64px;
  background: @m-col-b0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
  z-index:2;
  position: absolute;
  padding-right:20px;
  top: 0;
  transition: all .3s;
  .step-num {
    width: 152px;
    padding-left: 10px;
    height:35px;
    background: linear-gradient(90deg, #D5DCE9 0%, #FFFFFF 152px);
    .iconfont{
      color: #575F9B;
      vertical-align: middle;
    }
    .el-icon-caret-right{
      color: #575F9B;
    }
    .txt{
      padding-left:6px;
      vertical-align: middle;
    }
  }
  .s-col {
    display: inline-block;
    margin-left: 30px;
    .s-txt {
      line-height: 60px;
      color: @ph-col-n12;
      font-style: 14px;
    }
    .w-saml {
      width: 136px;
    }
  }
  .ml-0{
    margin-left: 0;
  }
  .default-btn-border {
    height: 36px !important;
    margin-left: 10px;
  }
  .s-r-btns {
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .s-r-f-r {
    float: right;
    margin-top: 13px;
  }
}

/deep/.el-tag.el-tag--info .el-select__tags-text {
  max-width: 100px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.el-select .el-tag__close.el-icon-close {
  top: -7px;
}
.top100{
  top: -64px;
}
.top0{
  top: 0;
}
.btns-w{
  position: fixed;
  top: 40px;
  right: 30px;
}
</style>
