<!--深色背景-->
<template>
  <div class="b-bg-warp dlib3-bgcomponent-w tbg-lin-c5totop-c10">
    <img src="../../../../../../static/images/previewwydq/E.png">
    <div class="box-bg"><img src="../../../../../../static/images/previewwydq/E-bg.png"></div>
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
.b-bg-warp {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  img{
    display: block;
    margin:auto;
  }
  .box-bg{
    width: 1200px;
    height: 590px;
    position: absolute;
    top: 130px;
    left: 50%;
    border: 10px solid rgba(255,255,255,0.6);
    margin-left: -600px;
    overflow: hidden;
  }
}
</style>
