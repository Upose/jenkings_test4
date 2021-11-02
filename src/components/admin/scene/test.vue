<!---服务中台-栏目管理-->
<template>
  <div class="admin-warp-page">
    <div class="drag-content grid-stack" :style="{'transform':'scale('+ratio_num+')'}">
        <!--<iframe src="this.http://lib.cqu.edu.cn/" border="0" width="1198px" height="600px" scrolling="no"></iframe>-->
    </div><!--拖拽内容板块 end-->
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  name: 'index',
  created(){
    //console.log('参数接收：'+this.$route.query.id);
    this.$root.collapse = true;
    this.bus.$on('collapse', msg => {
        this.$root.collapse = msg;
    })
  },
  mounted(){
    this.initGrid();
    this.initData();
    this.setHeight(document.body.clientHeight-104);
    this.$nextTick(()=>{
        window.addEventListener('resize', () => { //监听浏览器窗口大小改变
          var c_height = document.body.clientHeight-104;
          this.setHeight(c_height);
        });
    })
    this.dragSort();
    //this.monitorCenter();
  },
  destroyed(){
    window.removeEventListener('resize', () => {},false);
  },
  data () {
    return {
      drag_height:500,
      ratio_num:1,//缩放比例
      left_fold:false,
      right_fold:false,
      screen_cu:0,//当前是第几屏
      screen_list:[{title:'首屏'},{title:'第一屏'}],//屏数量
      appid:'',//应用id
      sceneid:this.$route.query.id,//场景id
      //顶部 步骤1
      top_list:{
        title:this.$route.query.t,
        sceneStatus:[],//服务状态
        visitorLimitType:[],//权限控制
      },
      //左边 步骤2,3
      left_list:{
        terminal_type:this.$route.query.terminal,//终端id
        sceneLayout:[],//场景布局
        sceneTemplate:[],//场景模板
        sceneThemeColor:[],//场景主题色
      },
      //以下是拖拽参数
      grid:null,
      items:[
        {x:0, y:0, h:16, w:12, moduleName:'header', content:'<div id="zt_header_sys"></div>'},
        // {x:0, y:16, h:45, w:12, moduleName:'apps_center', content:'<div id="zt_news_temp_sys"></div>'},
        // {x:0, y:61, h:42, w:12, moduleName:'database', content:'<div id="zt_database_sys"></div>'},
        {x:0, y:103, h:8, w:12, moduleName:'footer', content:'<div id="zt_footer_sys"></div>'},
      ],
      opts: {//元素初始化高度
        cellHeight: '10', 
        cellHeightThrottle: 100,
      },
      temp_list:[
        {
          cs_url:'http://192.168.21.71:9000/header_sys/temp1/component.css',
          js_url:'http://192.168.21.71:9000/header_sys/temp1/component.js',
        },
        {
          cs_url:'http://192.168.21.71:9000/footer_sys/temp1/component.css',
          js_url:'http://192.168.21.71:9000/footer_sys/temp1/component.js',
        },
        // {
        //   cs_url:'http://192.168.21.71:9000/news_sys/temp1/component.css',
        //   js_url:'http://192.168.21.71:9000/news_sys/temp1/component.js',
        // },
        // {
        //   cs_url:'http://192.168.21.71:9000/database_nav_sys/temp1/component.css',
        //   js_url:'http://192.168.21.71:9000/database_nav_sys/temp1/component.js',
        // },
      ],
    }
  },
  methods:{
    //初始化模板
    initGrid(){
      this.grid = GridStack.init(this.opts);
      this.grid.on('change', function(event, items) {//改变大小时触发
        var moduleName = items.moduleName;//自定义的板块名称，moduleName字段可以自己更换
        var _rect = items._rect;//元素大小，距离x轴，y轴的位置（单位：px）;(w,h,x,y)
        var _lastUiPosition = items._lastUiPosition;//距离顶部，左边的位置（left,top）
        var _orig = items._orig;//在12宫格中所占的比列（x,y,h,w）
      })
      this.grid.load(this.items);
      setTimeout(() => {
        this.temp_list.forEach(e => {
          this.addStyle(e.cs_url);
          this.addScript(e.js_url);
        });
      }, 200);
    },
    //添加组件
    addCompont(){
      let it = {x: 0, y: 51, h: 40, w: 12, moduleName:'板块名称5', content:'<div></div>'};
      this.grid.addWidget(it);
    },

    //引入css文件
    addStyle(url){
      var link=document.createElement("link"); 
      link.setAttribute("rel", "stylesheet"); 
      link.setAttribute("type", "text/css"); 
      link.setAttribute("href", url);
      document.getElementsByTagName("body")[0].appendChild(link);
    },
    //引入js文件
    addScript(url){
      var js_element=document.createElement("script");
      js_element.setAttribute("type","text/javascript");
      js_element.setAttribute("src",url);
      document.getElementsByTagName("body")[0].appendChild(js_element);
    },
    /****监听中间区域的变化****/
    monitorCenter(){
      let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      let element = document.querySelector('#monitorCenter')
      this.observer = new MutationObserver((objList) => {
        console.log('obj List:', objList)
        let width = element.offsetWidth
        if (this.recordOldValue && width === this.recordOldValue.width) {
          return
        }
        this.recordOldValue = {
          width
        }
        console.log('obj width:', width)
      })
      this.observer.observe(element, { attributes: true, childList: true, subtree: true })
    },
    /***拖拽更换屏顺序**/
    dragSort() {
      const el = this.$refs.dragBox;
      this.sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onStart: function (evt) {
            evt.oldIndex;
            console.log(evt.oldIndex)
        },
        onEnd: e => {
          const targetRow = this.screen_list.splice(e.oldIndex, 1)[0];//oldIndex原位置
          this.screen_list.splice(e.newIndex, 0, targetRow);//newIndex新位置
          console.log(this.screen_list,'排序后的数据')
          let drag_row = this.screen_list[e.newIndex]; //拖动行
        }//onEnd
      });
    },
    /****新增一屏 */
    addScreen(){
      this.screen_list.push({title:''});
    },
    /****删除一屏 */
    removScreen(val){
      this.screen_list.splice(val,1);
    },
    /****点击第几屏 */
    screenClick(val){
      this.screen_cu = val;
    },
    /*********高度动态设置 */
    setHeight(val){
      if(this.$refs.dragContainer){
        var c_width = this.$refs.dragContainer.clientWidth-60;
        this.$refs.scalingRef.getHeight(c_width);
      }
      if(val<500){
        this.drag_height = 500;
      }else{
        this.drag_height = val;
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
