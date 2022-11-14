<template>
  <div class="web-warp">
    <div class="scene-warp" v-for="(it,i) in details.sceneScreens" :key="i" :style="{height:it.height+'px','min-width':(details.template.width==100?'100%':(details.template.width+'px'))}">
      <component :is="it.sceneTag" class="temp-bg"></component>
      <div class="scene-warp-bg" :style="styleSet(it,i)">
        <div class="bocy-content" :style="{height:it.height+'px',width:(details.template.width==100?'100%':(details.template.width+'px'))}">
          <div v-for="(item,index) in it.sceneApps" :key="index" :class="isWidgetCodeWapr(details.template.width,item)" :style="styleRender(item)">
            <div :class="isWidgetCode(item)" :style="{height:'100%'}" :data-set="JSON.stringify(item.appPlateItems||'[{}]')" :data-obj="JSON.stringify(item.configParameter||'{}')" :data-common="commonWidgetSetFormat(item.commonWidgetSet)">
              <div :id="setId()"></div>
            </div>
          </div>
        </div>
      </div>
      <!--屏-外层 此层高于模板背景层-此背景会覆盖模板本身背景-->
    </div>
    <!--场景最外层-->

  </div>
</template>

<script>
export default {
  name: 'index',
  components: {
    tempbg1: () => import('./bgtemp/tempbg1.vue'),
    tempbg2: () => import('./bgtemp/tempbg2.vue'),
    tempbg3: () => import('./bgtemp/tempbg3.vue'),
  },
  mounted() {
    window.addEventListener('scroll', this.appScroll);
    this.templateCssLoad(this.details.template.filePath);
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      bg_color: '#fff',
      //场景详情
      details: {
        footerTemplate: {},
        headerTemplate: {},
        template: {
          backgroundColor: "#ffffff",//背景颜色
          code: "splitscreen",//code
          filePath: "http://192.168.21.46/cdn/public/template/public/css/temp1.css",//css文件
          jsPath: null,//js文件
          layoutId: 3,//id
          name: "空模板",//名称
          width: 1200,//宽度
          height: 500,//高度
          terminalInstanceName: "PC终端",//所属终端
          themeColor: "template1",//皮肤颜色
        },//end 模板

        sceneScreens: [
          {
            bgImg: "/uploads/cqu/20221102/b0407e4b6f80481190d79a0aa3ad3293.png",//屏背景
            height: 300,//屏高度
            sceneTag: 'tempbg1',//屏标识
            icon: "/uploads/cqu/20220906/0dbf7c66e8bd4c27931687afb5459541.png",//屏菜单-右侧悬浮菜单-图标
            screenName: "屏1",//屏名称-右侧悬浮菜单-名称
            sceneApps: [ //组件数组
              {
                width:70,
                height:26,
                xIndex: 0,
                yIndex: 2,
                appPlateItems: [
                  {sortType: "Default",topCount: 6,id: "46fd0435-5e6c-4a9c-86b5-c0a76fa7600e"},
                  {sortType: "Default",topCount: 6,id: "44638490-b66f-419b-bcea-fdfd0bd91a73"}
                ],
                appWidget: { //组件配置
                  target: 'http://192.168.21.46/cdn/public/template/ztest/test1',
                  widgetCode: "test1",
                },
              },//end 组件
              {
                width: 48,
                height:26,
                xIndex: 72,
                yIndex: 2,
                appPlateItems: [
                  {sortType: "Default",topCount: 8,id: "46fd0435-5e6c-4a9c-86b5-c0a76fa7600e"},
                  {sortType: "Default",topCount: 8,id: "44638490-b66f-419b-bcea-fdfd0bd91a73"}
                ],
                appWidget: { //组件配置
                  target: 'http://192.168.21.46/cdn/public/template/ztest/test4',
                  widgetCode: "test4",
                },
              },//end 组件
            ],
          },//end 第一段
          {
            bgImg: "",//屏背景
            height: 310,//屏高度
            sceneTag: 'tempbg2',//屏标识
            icon: "/uploads/cqu/20220906/0dbf7c66e8bd4c27931687afb5459541.png",//屏菜单-右侧悬浮菜单-图标
            screenName: "屏2",//屏名称-右侧悬浮菜单-名称
            sceneApps: [ //组件数组
              {
                width: 120,
                height:28,
                xIndex: 0,
                yIndex: 0,
                appWidget: { //组件配置
                  target: 'http://192.168.21.46/cdn/public/template/ztest/test3',
                  widgetCode: "test3",
                },
              },//end 组件
            ],
          },//end 第二段
          {
            bgImg: "",//屏背景
            height:380,//屏高度
            sceneTag: 'tempbg3',//屏标识
            icon: "/uploads/cqu/20220906/0dbf7c66e8bd4c27931687afb5459541.png",//屏菜单-右侧悬浮菜单-图标
            screenName: "屏3",//屏名称-右侧悬浮菜单-名称
            sceneApps: [ //组件数组
              {
                width: 120,
                height:34,
                xIndex: 0,
                yIndex: 2,
                appPlateItems: [
                  {sortType: "Default",topCount:12,id: "84487ead-627e-4e54-812f-8771ef47522c"},
                  {sortType: "Default",topCount:12,id: "1067c97d-2d96-4935-b1c3-e10f9940e6a8"}
                ],
                appWidget: { //组件配置
                  target: 'http://192.168.21.46/cdn/public/template/ztest/test2',
                  widgetCode: "test2",
                },
              },//end 组件
            ],
          },//end 第三段

        ],
      },
    }
  },
  methods: {
    //滚动事件
    appScroll(e) {
      e.preventDefault();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;  //浏览器兼容
      // console.log(e, scrollTop);
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
        // 'min-width':'1200px',//这个地方要根据是否选择的通屏100%；left:50%;margin-left:-600px;
      };
      if (val.appWidget && val.appWidget.target) {
        this.$addStyle(val.appWidget.target + '/component.css');
        this.$addScript(val.appWidget.target + '/component.js');
      }
      return styleList;
    },
    //判断是否为空
    isWidgetCode(item) {
      var widgetCode = '';
      if (item.widgetCode) {
        widgetCode = item.widgetCode;
      } else {
        if (item.appWidget && item.appWidget.widgetCode) {
          widgetCode = item.appWidget.widgetCode;
        } else {
          widgetCode = '';
        }
      }
      return widgetCode;
    },
    //外层全屏
    isWidgetCodeWapr(width, item) {
      var widgetCode = '';
      if (item.width == (width / 10) && item.configParameter && item.configParameter.fullScreen) {
        if (width == 1200) {
          widgetCode = ' mar-left-1200';
        } else if (width == 1440) {
          widgetCode = ' mar-left-1440';
        }
      }
      return widgetCode;
    },
    //动态设置模板id
    setId() {
      return "jl_vip_zt_" + Math.ceil(Math.random() * 1e8);
    },
    //样式设置
    styleSet(it, i) {
      var list = {};
      if (it.bgImg) {
        if (i < 0 && this.details.sceneScreens && this.details.sceneScreens[0]) {
          list = { 'background': this.bg_color + ' url(' + this.fileUrl + (this.details.sceneScreens[0].bgImg || '') + ')', 'background-position': 'center top !important' };
        } else if (i == 0) {//第一屏
          if (this.details.sceneScreens.length > 1) {//多屏情况下的第一屏
            list = { 'background': this.bg_color + ' url(' + this.fileUrl + (it.bgImg || '') + ')', 'background-position-y': (-(this.details.headerTemplate.height * 10) + 'px !important'), 'background-repeat-y': 'no-repeat', 'background-repeat-x': 'initial' };
          } else {
            list = { 'background': this.bg_color + ' url(' + this.fileUrl + (it.bgImg || '') + ')', 'background-position': 'center top !important', 'background-repeat-y': 'no-repeat', 'background-repeat-x': 'initial' };
          }
        } else {
          list = { 'background': this.bg_color + ' url(' + this.fileUrl + (it.bgImg || '') + ')' };
        }
      }
      return list;
    },
    //格式化
    commonWidgetSetFormat(val) {
      if (val && val != "undefind" && val != 'null') {
        return val.replace(/\"/g, "'");
      } else {
        return '{}';
      }
    },
    //加载模板css文件
    templateCssLoad(url) {
      if (url) {
        var docUrl = '';
        var temp = document.getElementById('templateId');
        if (temp) docUrl = temp.getAttribute('href');
        if (docUrl != url) {
          if (temp) temp.remove();
          //判断href是否等于当前url，不等于就删除了重新创建，等于就不创建。
          var link = document.createElement("link");
          link.setAttribute("rel", "stylesheet");
          link.setAttribute("id", "templateId");
          link.setAttribute("type", "text/css");
          link.setAttribute("href", url + '?version=' + new Date().getTime());
          document.getElementsByTagName("body")[0].appendChild(link);
        }
      }
    },
  },
}
</script>
<style scoped lang="less">
.bocy-content {
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
.scene-warp {
  position: relative;
  .temp-bg,
  .scene-warp-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .temp-bg {
    z-index: 1;
  }
  .scene-warp-bg {
    z-index: 2;
  }
}
</style>

