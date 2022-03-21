<!---服务中台-预览页面-->
<template>
  <div class="html-warp-page" :class="(items && items.themeColor) || 'template1'" style="background:#f5f5f5">
    <template v-if="items">
      <!--宽1200通用-->
      <div v-if="items.headerTemplate" :class="items.headerTemplate.templateCode">
        <div :id="setId()" :data-init="items.headerTemplate.router"></div>
      </div><!-- 头部信息-end -->
      <div :class="top_model.widgetCode||top_model.appWidget.widgetCode" :style="{width:'100%',height:'180px'}" :data-set="JSON.stringify(top_model.appPlateItems||'[{}]')">
        <div :id="setId()"></div>
      </div><!-- 顶部检索-end -->
      
      <div class="bocy-content" v-for="(it, i) in items.sceneScreens" :key="i" :style="{ height: (it.height-380) + 'px' }" :class="
          items.layoutId == '3' || items.layoutId == '4' ? 'width_1440' : ''
        ">
        <div v-for="(item, index) in it.sceneApps" :key="index" :class="item.widgetCode || item.appWidget.widgetCode" v-if="isDivShow(item.appWidget.widgetCode)" :style="styleRender(item)" :data-set="JSON.stringify(item.appPlateItems || '[{}]')">
          <div :id="setId()" :data-init="item.appWidget.target"></div>
        </div>
      </div>
      <div :class="bottom_model.widgetCode||bottom_model.appWidget.widgetCode" :style="{width:'100%',height:'200px'}" :data-set="JSON.stringify(bottom_model.appPlateItems||'[{}]')">
        <div :id="setId()"></div>
      </div><!-- 底部链接-end -->
      <div v-if="items.footerTemplate" :class="items.footerTemplate.templateCode">
        <div :id="setId()" :data-init="items.footerTemplate.router"></div>
      </div><!-- 底部信息-end -->
    </template>
  </div>
</template>

<script>
export default {
  name: "index",
  created() {
    document.getElementsByTagName('html')[0].style.height='auto';
    document.getElementsByTagName('body')[0].style.height='auto';
    document.getElementsByClassName('admin-warp-app')[0].style.height = 'auto'
    // this.previewClick('26cbabdf-4ae6-4f20-83b6-d42b367ec105');
  },
  data() {
    return {
      isLock: false, //是否全屏
      details: JSON.parse((window.localStorage.getItem('scenePreview')||'{}')), //场景详情
      //以下是拖拽参数
      grid: null,
      items: {},
      scene_id:this.$route.query.id,//场景id
      opts: {
        //元素初始化高度
        cellHeight: "10",
        cellHeightThrottle: 100,
      },
      top_model: { widgetCode: {} },//头部检索
      bottom_model: { widgetCode: {} },//底部链接
      temp_list: [],
    };
  },
  mounted(){
    this.initData();
  },
  methods: {
    //初始化数据
    initData() {
      if (this.details && this.details.template) {
        this.items = this.details;
        this.addStyleOverride(this.items.headerTemplate.router);
        this.addScriptOverride(this.items.headerTemplate.router);
        this.addStyleOverride(this.items.footerTemplate.router);
        this.addScriptOverride(this.items.footerTemplate.router);
        if(this.items.sceneScreens){
            this.items.sceneScreens[0].sceneApps.forEach(it=>{
              if(it.xIndex==0 && it.appWidget && it.appWidget.widgetCode=='cqu_unified_retrieval_sys_temp1'){
                console.log('头部检索');
                this.top_model = it;
                this.addStyle(it.appWidget.target+'/component.css');
                this.addScript(it.appWidget.target+'/component.js');
              }
              if(it.xIndex==0 && it.appWidget && it.appWidget.widgetCode=='cqu_friendly_link_temp1'){
                console.log('底部链接');
                this.bottom_model = it;
                this.addStyle(it.appWidget.target+'/component.css');
                this.addScript(it.appWidget.target+'/component.js');
              }
            })
          }
      }
    },
    //获取场景详情
    previewClick(val) {
      this.http
        .getPlain_url("scene-detail", "/" + val)
        .then((res) => {
          this.details = res.data;
          this.initData();
          //window.localStorage.setItem('scenePreview',JSON.stringify(res.data));
        })
        .catch((err) => {
          this.$message({ type: "error", message: err.errors||"获取详情失败" });
        });
    },
    //初始化模板
    styleRender(val) {
      //css 渲染
      var list = {
        width: (100 / 12) * val.width + "%",
        height: val.height * 10 + "px",
        top: (val.yIndex * 10)-180 + "px",
        left: (100 / 12) * val.xIndex + "%",
        position: "absolute",
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      // this.addStyle(val.appWidget.target + "/component.css");
      // this.addScript(val.appWidget.target + "/component.js");

      this.addStyleOverride(val.appWidget.target);
      this.addScriptOverride(val.appWidget.target);


      return list;
    },
    //动态设置模板id
    setId() {
      return "jl_vip_zt_" + Math.ceil(Math.random() * 1e8);
    },
    /**添加css，这个可以乱加 */
    addStyleOverride(linkWithOutCssName) {
      let resultLink = linkWithOutCssName + "/component.css";
      this.addStyle(resultLink);
    },
    /**添加js，应确保现有对象 */
    addScriptOverride(linkWithoutJsName) {
      let resultLink = linkWithoutJsName + "/component.js";
      let elementInvoker = setInterval(() => {
        if (document.querySelector(`[data-init="${linkWithoutJsName}"]`) == null) return;
        clearInterval(elementInvoker);
        this.addScript(resultLink);
      }, 200);

    },
    isDivShow(val){
        console.log(val);
        var is_show = true;
        if(val == 'cqu_unified_retrieval_sys_temp1'){
            is_show = false;
        }else if(val == 'cqu_friendly_link_temp1'){
            is_show = false;
        }
        console.log(is_show);
        return is_show;
    },
  },
};
</script>

<style lang="less" scoped>
.jl_vip_zt_warp {
    position: relative;
    height: auto !important;
}
/*****其他通用 */
.width_1440 {
  width: 1440px;
  margin-left: auto;
  margin-right: auto;
}
.width_1200 {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.bocy-content {
  position: relative;
  min-width: 1200px; //最小宽度
}
.html-warp-page {
  width: 100%;
  height: 1%;
  min-height: 100%;
}
</style>