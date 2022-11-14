<!--第二段背景-->
<template>
  <div class="web-warp tbg-c1">
    <div class="dlib3-bg1"></div>
    <div class="dlib3-bg2"></div>
  </div>
</template>

<script>
export default {
  name: 'index',
  mounted() {

  },
  data() {
    return {
      skin_template: 'template1',
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="less">
.dlib3-bg1,.dlib3-bg2{
  width: 100%;
  height: 100%;
  position: absolute;
}
.dlib3-bg1{
  background-image: url(../../../../../static/images/test/bg3.png);
  background-size: 100% 100%;
}
.dlib3-bg2{
  background-image: url(../../../../../static/images/test/bg3-left.png),url(../../../../../static/images/test/bg3-right.png);
  background-position: 0% 0%, bottom right;
  background-repeat: no-repeat;
  background-size: auto,270px auto !important;
}
</style>

