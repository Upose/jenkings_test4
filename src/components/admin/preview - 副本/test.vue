<!--
实现点击a到指定位置，获取到了滚动事件，获取到滚动条位置
-->
<template>
  <div class="score-preview-container">
    <a href="#a5" @click="clickSilder">点击</a>
    <div id="a1" class="div">1111111111111内容内容、、、</div>
    <div id="a2" class="div">2222222222222222内容内容、、、</div>
    <div id="a3" class="div">233333333333333333333内容内容、、、</div>
    <div id="a4" class="div">444444444444444内容内容、、、</div>
    <div id="a5" class="div">55555555555555555555555555555555555555555555555</div>
  </div>
</template>
<style scoped>
.div {
  height: 500px;
}
#a5 {
  background: rgb(255, 127, 127);
}
</style>
<script>
export default {
  name: "score-preview",
  mounted() {
    window.addEventListener('scroll', this.appScroll)
  },
  data() {
    return {
    };
  },
  methods: {
    appScroll(e) {
      e.preventDefault();
      //浏览器兼容
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log(e, scrollTop);
    },
    clickSilder() {
      // 获取DOM元素
      let el = document.getElementById('a5');
      // chrome
      document.body.scrollTop = el.offsetTop;
      // firefox
      document.documentElement.scrollTop = el.offsetTop;
    }
  }
};
</script>
