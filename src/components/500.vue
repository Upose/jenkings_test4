<template>
  <div class="page-warp">
    <div class="txt-content">
      <div class="txt-left">
        <div class="error-hint">
          <span class="err-title">出错啦！</span>
          <span>抱歉，您访问的页面不存在。</span>
        </div>
        <button class="go-flush" @click="goBack()">返回上一页</button>
        <button class="go-home" @click="goHome()">回到首页</button>
      </div>
      <div class="img-404">
        <img src="@/assets/public/img/500.gif">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '404page',
  beforeRouteEnter(to,from,next){
    if(from.fullPath.indexOf('admin')>-1){
      this.home = 'admin';
    }
    next();
  },
  data () {
    return {
      code:'index',
      path:'/#/index',
      home:'web',
    }
  },
  mounted(){
    document.title = '500'
    if(this.home == 'admin'){
      this.code = 'workbench'
      this.path = '/workbench/#/admin_workbench';
    }else{
      this.code = 'index';
      this.path = '/#/index?page=1';
    }
  },
  methods:{
    linkTo(code, url) {
      if (url) {
        let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
        let info = urlInfo.find(item => item.code == code);
        window.location.href = info.path + url;
      }
    },
    goBack(){
      window.history.go(-1);
    },
    goHome(){
      this.linkTo(this.code,this.path);
    },
  },
}
</script>

<style lang="less" scoped>
@import "../assets/public/css/error.less";
</style>
