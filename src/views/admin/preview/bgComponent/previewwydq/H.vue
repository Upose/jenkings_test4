<!--浅色背景-->
<template>
  <div class="c-bg-warp dlib3-bgcomponent-w tbg-lin-c8180-c70">
    <img src="../../../../../../static/images/previewwydq/H.png">
    <div class="box-bg"><div class="bgfff"></div></div>
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
.c-bg-warp {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  img{
    display: block;
    margin:auto;
  }
  .box-bg{
    width: 1200px;
    height: 560px;
    border: 10px solid rgba(255,255,255,0.6);
    position: absolute;
    top: 130px;
    left: 50%;
    margin-left: -600px;
    .bgfff{
      width: 100%;
      height: 100%;
      background: #fff;
    }
  }
}
</style>
