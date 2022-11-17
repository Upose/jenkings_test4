<!--第二段背景-->
<template>
  <div class="tbg-c3 dalib-temp-bg3">
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
    }
  },
  methods: {

  }
}
</script>
<style scoped lang="less">

.dalib-temp-bg3 .dlib3-bg1,.dlib3-bg2{
  width: 100%;
  height: 100%;
  position: absolute;
}
.dalib-temp-bg3 .dlib3-bg1{
  background-image: url(../../../../../static/images/test/bg3.png);
  background-size: 100% 100%;
}
.dalib-temp-bg3 .dlib3-bg2{
  background-image: url(../../../../../static/images/test/bg3-left.png),url(../../../../../static/images/test/bg3-right.png);
  background-position: 0% 0%, bottom right;
  background-repeat: no-repeat;
  background-size: auto,270px auto !important;
}
</style>

