<!--信息导航模板-->
<template>
  <div class="service-warp">
    <div class="service-main-w">
      <div class="l-box" v-for="i in 9">
        <div class="box-bg">
          <img src="data:image/png;base64,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">
        </div>
        <span>书刊借阅</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() { },
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
.service-warp {
  overflow-x: hidden;
  .service-main-w{
    height: 160px;
    display: flex;
    align-items: center;
    margin-left: calc(((11.1111% - 50px) / 2) - (11.1111% - 50px));
    margin-right: calc(((11.1111% - 50px) / 2) - (11.1111% - 50px));
  }
  .l-box {
    width: 11.1111%;
    float: left;
    cursor: pointer;
    text-align: center;
    &:hover{
      transition: all .3s;
      div.box-bg{margin-top: -5px;}
    }
    div.box-bg {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      padding-top: 5px;
      width: 50px;
      height: 50px;
      background: rgba(0, 0, 0, 0.23);
      border-radius: 5px 5px 5px 5px;
      margin-bottom: 6px;
      transition: all .3s;
      margin-top: 0;
      img {
        width: 40px;
        height: 40px;
      }
    }
    span {
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
      line-height: 0px;
      text-shadow: 0px 1px 5px #000000;
    }
  }
}
</style>
