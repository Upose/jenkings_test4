<template>
  <div class="page-warp">
    <div class="txt-content">
      <div class="txt-left">
        <div class="error-hint">
          <span class="err-title">出错啦！</span>
          <span>抱歉，您访问的页面不存在。</span>
        </div>
        <button class="go-flush" @click="window.history.go(-1);">返回上一页</button>
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
  name: '505page',
  data () {
    return {}
  },
  mounted(){
    // http.noGet('web','AssetNewest',{}).then(res=>{

    // }).catch(err=>{
    //     console.log(err);
    // })
  },
  methods:{
    goHome(){

    }
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
  background-image: url(../assets/public/img/500.png);
  background-position: center;
  background-repeat: no-repeat;
}
</style>
