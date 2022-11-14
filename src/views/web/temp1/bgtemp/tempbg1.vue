<!--第一段背景-->
<template>
  <div class="web-warp tbg-c1">
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
.web-warp{
  background-image: url(../../../../../static/images/test/bg1.png);
  background-position: 100% 0%, bottom center;
  background-repeat: no-repeat;
  background-size: auto,100% !important;
}
</style>

