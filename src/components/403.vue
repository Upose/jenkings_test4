<template>
  <div class="page-warp">
    <div class="txt-content">
      <div class="txt-left">
        <div class="error-hint">
          <span class="err-title">出错啦！</span>
          <span>您没有当前页面的访问权限。</span>
        </div>
        <button class="go-flush" @click="goBack()">返回上一页</button>
        <button class="go-home" @click="goHome()">回到首页</button>
      </div>
      <div class="img-404">
        <img src="@/assets/public/img/403.gif">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '403page',
  data () {
    return {
      path:'',
      home:'web',
    }
  },
  mounted(){
    document.title = '403'
    this.get403();
  },
  methods:{
    get403(){
      let is_admin = window.sessionStorage.getItem('backHome');
      let path = window.sessionStorage.getItem('backUrl');
      if(is_admin && is_admin!=null && is_admin!=undefined && is_admin!=''){
        this.home = is_admin;
      }
      if(path && path!=null && path!=undefined && path!=''){
        this.path = path;
      }
    },
    goBack(){
      if(this.path && this.path!=''){
        window.location.replace(this.path);
      }else{
        this.goHome();
      }
    },
    goHome(){
      if(this.home == 'web'){
        this.linkTo('index','/#/index');//到web首页
      }else{
        this.linkTo('workbench','/workbench/#/admin_workbench');//到馆员工作台
      }
    },
    linkTo(code, url) {
      if (url) {
        let urlInfo = JSON.parse(localStorage.getItem('urlInfo'));
        let info = urlInfo.find(item => item.code == code);
        window.location.replace(info.path + url);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.page-warp{
  width: 100%;
  height: 100%;
  background-image: url(../assets/public/img/404-bg1.png), url(../assets/public/img/404-bg2.png);
  background-position:100% 0%, 0% 100%;
  background-repeat: no-repeat;
  .txt-content{
    width: 1000px;
    height:500px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -500px;
  }
}
.error-hint{
  font-size: 26px;
  font-weight: 400;
  color: #737373;
  padding-bottom: 70px;
  .err-title{
    display: block;
    font-size: 45px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
  }
}
.go-flush{
  width: 140px;
  height: 44px;
  background: #BE3C3C;
  opacity: 1;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 400;
  color: #FFFFFF;
  outline: none;
  border: none;
}
.go-home{
  margin-left: 20px;
  width: 140px;
  height: 44px;
  background: #fff;
  opacity: 1;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  outline: none;
  border: 1px solid #D4D4D4;
}
.go-flush,.go-home{
  cursor: pointer;
  &:hover{
    opacity: .8;
  }
}
.txt-left{
  float: left;
  margin-top: 125px;
}
.img-404{
  float:right;
  width: 550px;
  height: 500px;
  background-image: url(../assets/public/img/403.png);
  background-position: center;
  background-repeat: no-repeat;
  background-position-y: -1px;
}
</style>
