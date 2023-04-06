<!--学院图书馆-->
<template>
  <div class="a-bg-warp dlib3-bgcomponent-w">
    <div class="title-w">
      <span class="img-l"></span>
      <i class="title tfont-c2 dlib3-wit-title">个人图书馆</i>
      <span class="img-r"></span>
    </div>
    <img src="../../../../../../static/images/previewwit/b-t.png" class="b-t">
    <img src="../../../../../../static/images/previewwit/b-b.png" class="b-b">
    <div class="a-bg-top tbg-lin-c5totop-c10"></div>
    <img src="../../../../../../static/images/previewwit/bg.png" class="bg">
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
.a-bg-warp {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background: #DDFCFF;
  display: flex;
  align-items: center;
  justify-content: center;
}
.a-bg-top{
  width: 1280px;
  height: 670px;
  background: #F6FAFA;
  box-shadow: 0px 40px 100px 0px rgba(0,18,71,0.2);
  border-radius: 20px 20px 20px 20px;
  border: 2px solid #FFFFFF;
  z-index: 2;
}
.b-t,.b-b{
  position: absolute;
  z-index: 1;
}
.b-t{
  left: 50%;
  top: 50%;
  margin-top: -398px;
  margin-left: -757px;
}
.b-b{
  right: 50%;
  top: 50%;
  margin-top: -137px;
  margin-right: -680px;
}
.title-w{
  position: absolute;
  top:50%;
  margin-top: -440px;
  .title{
    font-size: 48px;
    letter-spacing: 28px;
    font-weight: 800;
    padding-left: 28px;
  }
  .img-l,.img-r{
    display:inline-block;
    width: 50px;
    height: 50px;
    background-position: center;
    background-repeat:no-repeat;
  }
  .img-l{
    background-image: url(../../../../../../static/images/previewwit/t-l.png);
  }
  .img-r{
    width:27px;
    background-image: url(../../../../../../static/images/previewwit/t-r.png);
  }
}
.bg{
  position:absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}
</style>
