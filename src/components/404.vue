<template>
  <div class="page-warp">
    <p class="error-hint">出错了，您访问的页面无法找到! 可能网页已经被关闭或者输入的网址错误！</p>
    <button class="back" @click="window.history.go(-1);">返回上一页</button>
    <div class="img-404"></div>
  </div>
</template>

<script>
import http from "@/assets/public/js/http";
export default {
  name: '404page',
  data () {
    return {}
  },
  mounted(){
    // http.noGet('web','AssetNewest',{}).then(res=>{

    // }).catch(err=>{
    //     console.log(err);
    // })
  },
  methods:{},
}
</script>

<style lang="less" scoped>
.page-warp{
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -302px;
    margin-top: -287px;
}
.error-hint{
    color: #555;
    font-size: 18px;
    line-height: 38px;
}
.img-404{
    background-image: url(../assets/public/img/404.png);
    background-position: center;
    height: 440px;
    background-repeat: no-repeat;
}
.back{
    outline: none;
    width: 140px;
    height: 36px;
    line-height: 24px;
    color: #fff;
    font-size: 18px;
    background: #5a5a5a;
    border: 0;
    margin:30px 0;
}
</style>
