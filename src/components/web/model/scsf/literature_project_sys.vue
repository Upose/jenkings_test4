<!--专题推荐模板-->
<template>
  <div class="literature-w">
    <div class="l-w-wid">
      <div class="title">
        <span>专题推荐</span>
      </div>
      <div class="list c-l">
        <div class="l-box" v-for="i in 3">
          <div class="img-w">
            <img src="https://t7.baidu.com/it/u=4162611394,4275913936&fm=193&f=GIF">
            <span class="type">古籍</span>
          </div>
          <div class="txt-w">
            关于继续加强我校疫情防控管理的重要提示关于继续加强我校疫情防控
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.literature-w {
  width: 100%;
  background: #ffffff;
  border: 1px solid #cedfd7;
  background: url() no-repeat center;
  background-size: 100% 100% !important;
  box-shadow: 0px 3px 20px rgba(85, 85, 85, 0.16);
  display: flex;
  align-items: center;
  height: 600px;
  .l-w-wid{
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .title{
    height: 44px;
    font-size: 26px;
    font-weight: bold;
    color: #649B33;
    text-align: center;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAAVCAYAAABWvxeBAAAAAXNSR0IArs4c6QAAA0hJREFUeF7t3L1qFGEUBuD52WzA/ICVvQip9QpsjZ2t3YqSy7C1tZUQS70BCy9CvQfvQNLs34wgqAgWSTiTnTnfk3pz5jvP+7Fs3sDWi3cPX1R+CBAgQIAAgRQCfV3P+k33/f3Zt08pFrIEAQIECBAgQIAAgaqqagoECBAgQIBALoHFm5Oj+u6dp+evvn7ItZltCBAgQIAAAQIEShVQYJWavL0JECBAILWAEit1vJYjQIAAAQIECBQnoMAqLnILEyBAgEApAkqsUpK2JwECBAgQIEAgv4ACK3/GNiRAgACBggWUWAWHb3UCBAgQIECAQCIBBVaiMK1CgAABAgT+J7A4Pznqu4PTi5dfPhIiQIAAAQIECBAgMEUBBdYUU3NmAgQIECBwTQEl1jXBvJwAAQIECBAgQGBUAgqsUcXhMAQIECBAYDgBJdZwtiYTIECAAAECBAgMK6DAGtbXdAIECBAgMCoBJdao4nAYAgQIECBAgACBKwoosK4I5WUECBAgQCCLgBIrS5L2IECAAAECBAiUI6DAKidrmxIgQIAAgT8Cv0qs9cHpxZkvdnctCBAgQIAAAQIExi+gwBp/Rk5IgAABAgQGEVBiDcJqKAECBAgQIECAwAACCqwBUI0kQIAAAQJTEVBiTSUp5yRAgAABAgQIlC2gwCo7f9sTIECAAIFKieUSECBAgAABAgQIjF1AgTX2hJyPAAECBAjcgoAS6xaQPYIAAQIECBAgQODGAgqsG9P5RQIECBAgkEvg+dsHx/P58RNf7J4rV9sQIECAAAECBDIIKLAypGgHAgQIECAQJKDECoI0hgABAgQIECBAIFRAgRXKaRgBAgQIEJi+gBJr+hnagAABAgQIECCQTUCBlS1R+xAgQIAAgQABJVYAohEECBAgQIAAAQJhAgqsMEqDCBAgQIBALoHfJdayW38+bOdtru12v8162fkcFh3DYfRA8zbLrXsacA1m67bf7LEMoPxnxGy/7aNnFj/vsniBcIC9/cY9DVC93K68iQY4GkGAAAECBNIKPH5dze7fe/SsbrpV2iV3tNh2R8/N/Ni6qfyREB2wixoiuu3qVdv085BhhvwV8K+V8NvQd5XSOljVNY0B7Zrmx08z+om0XvM3wQAAAABJRU5ErkJggg==) no-repeat bottom;
    margin-bottom: 33px;
  }
  .list {
    width: 100%;
    .l-box {
      cursor: pointer;
      float: left;
      width: 350px;
      height: 330px;
      margin-left:75px;
      transition: all .3s;
      &:hover{
        margin-top: -5px;
        box-shadow:0px 0px 3px #e0e0e0;
      }
      &:first-child{
        margin-left: 0;
      }
      .img-w {
        height: 230px;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .type {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 32px;
          padding: 5px 15px;
          font-size: 16px;
          color: #fff;
          background: #f2b100;
          border-radius: 0px 20px 0px 0px;
        }
      }
      .txt-w {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 400;
        color: #333;
        background: #fff;
        padding: 30px;
      }
    }
  }
}
</style>

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