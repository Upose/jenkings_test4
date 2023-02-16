<!---通用预览+普通分段-->
<template>
  <div class="html-warp-page" :class="(details&&details.themeColor)||'template1'">

    <template v-if="details">
      <!--宽1200通用-->
      <component v-if="details.headerTemplate" :is="'previewhead'" :data="details" :isstyleSet="true"></component>

      <div class="scene-warp-bg" v-for="(it,i) in details.sceneScreens" v-if="datareset_list.indexOf(i)!=-1" :key="i+'scene'" :id="'temp'+i" :style="$styleSet(details,it,i)">

        <component v-if="it.customParameter&&!it.bgImg" :is="it.customParameter"></component>
        <component :bgImg="it.bgImg" :is="'BGvideoImg'" v-if="i==0"></component>

        <div class="bocy-content" :style="{height:it.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
          <div v-for="(item,index) in it.sceneApps" :key="index" :class="$isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
            <div :class="$isWidgetCode(item)" :style="{height:'100%'}" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="$commonWidgetSetFormat(item.commonWidgetSet)">
              <div :id="$setId()"></div>
            </div>
          </div>
        </div>

      </div>

      <div class="resetPreview-w" v-else-if="i==1">
        <div class="reset-menu">
          <div class="m-width">
            <span class="box" v-for="(x,y) in details_reset" :class="y==details_reset_index?'active':''" @click="navMneu(y)">
              <img :src="fileUrl+x.icon" class="img">
              <i>{{x.screenName||''}}</i>
            </span>
            <a class="box" :href="$setHref({ type:'dlib',url:['usermanage','/web_library'] })" target="_blank">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKZSURBVHgB7ZxhSxtBEIbfNKXF0KOCtGKhEFooFPzm//8bgoIgCH4ICoISUYxxhlwgxBNmb+5Gd+99YLmwbHLk5XZmZ3bnAEIIIYQQMkRGKYOXy+W+XH5I+4oyWUi7kXYxGo0Wli+YBRTx9uQyxTC4FQFPLQM/wc4vDIdKHpgdy8AUAb9gWEwsg1IEJA18ho8LaXN0T4XXJmNe368PpmjpGL0CzsXY3qFjxP40/ZlFH/eq74e2cAo7oYBOKKCTrAQUWzWRVm31Vdt9kXidSCQq0n/9III9yuUMK++5s9F3bA3BuiLXKayL+r+oxdvo+4lgcraBTZFR+FQuzYmoPRwjkBK9sCmG7YoSBfyOQPgEOvEuY3RdlpTVtv4u2tNmXdhaB6+Av/Ex+YcgGMo5oYBOKKATCujE60ROespIN22hmrcaW9zvEC1T+nwCnVBAJxTQCQV0QgGdUEAn3mXMviwB9ATBtSwxrnXTRz4fSBuv+1A4XgF362tVi6frt/FGH0oXscsprBs62+n0PRRO3zZwEr1HEU3fAqp4oRniaCK88DcUTISA73bsIoIIAYu2gxECFm0HvQI+GccVawdT6kSOMCzOLUEAY2EnFNAJBXRCAZ2w0GbFFCy0cd0PbeEUdkIBnVBAJznViaDef9HMt9aCaJQwk/YHK6ejdSK6D3OJQHIrtFmnxjRBoZtXeh56najQsocDEVnP0NwiiNyncFOWx1Sq3xUl2sBdBJKTgNbUGetE3uDROG4cWb2Zk4Dqea3OIcwO5mYDrXF3mB3MqdBGly7PMH4/cRoPotBmAruDULFDim0Yyr2NqfI9RcAHDAvT/00RcIbhcCXh4L1lYOr7A/W4msagpb4/UBfr+qDMol9eQQghhBASzAv6bp9DD3MQiwAAAABJRU5ErkJggg" class="img">
              <i>我的图书馆</i>
            </a>
          </div>
        </div><!--菜单列表-end-->

        <div class="scene-warp-bg" v-for="(it,i) in details_reset" v-if="datareset_list.indexOf(i)!=-1" :key="it.restIndex+'scene'" :id="'temp'+it.restIndex" :style="$styleSet(details,it,it.restIndex)" v-show="details_reset_index==i">

          <component v-if="it.customParameter&&!it.bgImg" :is="it.customParameter"></component>

          <div class="bocy-content" :style="{height:it.height+'px',width:'1200px'}">
            <div v-for="(item,index) in it.sceneApps" :key="index" :class="$isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
              <div :class="$isWidgetCode(item)" :style="{height:'100%'}" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="$commonWidgetSetFormat(item.commonWidgetSet)">
                <div :id="$setId()"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <component v-if="details.footerTemplate" :is="'previewfoot'" :data="details" :isstyleSet="false"></component>

      <div class="dlib3-hovering-menu">
      </div>
      <!-- 悬浮菜单 end -->

    </template>

  </div>
</template>

<script>
export default {
  name: 'index',
  props: ['details'],
  created() {
    this.dataReset();
    if (this.details && this.details.template) {
      if (this.details.sceneScreens) {
        this.details.sceneScreens[0].sceneApps.forEach(it => {
          if (it.appWidget && it.appWidget.target) {
            this.$addStyle(it.appWidget.target + '/component.css');
            this.$addScript(it.appWidget.target + '/component.js');
          }
        })
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.appScroll)
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      details: {},
      datareset_list:[0],//排除屏下标
      details_reset:[],//特殊屏列表
      details_reset_index:0,//特殊处理屏下标
    }
  },
  methods: {
    //重置分段数量-从第二屏开始到第七屏
    dataReset(){
      var _this = this;
      if(this.details){
        if(this.details.sceneScreens.length>4){
          this.datareset_list.push(this.details.sceneScreens.length-1);
          this.datareset_list.push(this.details.sceneScreens.length-2);
          this.datareset_list.push(this.details.sceneScreens.length-3);
        }
        _this.details.sceneScreens.forEach((x,i)=>{
          if(_this.datareset_list.indexOf(i)>-1){//排除第一屏和最后三屏
            return;
          }else{
            x.restIndex=i;
            _this.details_reset.push(x);
          }
        })
      }
    },
    navMneu(i){
      this.details_reset_index = i;
    },
    //滚动事件
    appScroll(e) {
      e.preventDefault();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  //浏览器兼容
    },
    //悬浮菜单点击事件
    clickSilder(val) {
      document.getElementById(val).scrollIntoView({ behavior: 'smooth' });
    },
    //初始化模板
    styleRender(val) {//css 渲染
      var w = this.details.template.width || 100;
      var styleList = {
        width: (val.width / w) * 1000 + '%',
        height: (val.height * 10) + 'px',
        top: (val.yIndex * 10) + 'px',
        left: 10 * val.xIndex + 'px',
        position: 'absolute',
      };
      if (val.appWidget && val.appWidget.target) {
        this.$addStyle(val.appWidget.target + '/component.css');
        this.$addScript(val.appWidget.target + '/component.js');
      }
      return styleList;
    },
  },
}
</script>

<style lang="less" scoped>
@import "./css/previewScreenNEFU.less";
</style>