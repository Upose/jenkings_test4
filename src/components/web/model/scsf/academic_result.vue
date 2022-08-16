<!--学术成果模板-->
<template>
  <div class="literature-w">
    <div class="l-w-wid">
      <div class="title">
        <span>学术成果</span>
      </div>

      <div class="list c-l">
        <div class="l-box" v-for="i in 2">
          <div class="l-t">
            <p>四川师范大学学者机构</p>
            <p>OPEN REPOSITORY</p>
            <span>></span>
          </div>

          <div class="l-body">
            <p>作为支撑四川师范大学学术研究的基础设施，收集并保存四川师范大学教师和科研
              人员的学术与智力成果；为四川师范大学教师，科研人员和学生的学术研究和学术
              交流提供系列服务，包括存档，管理，发布，检索和开放共享。</p>
            <div></div>
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
      float: left;
      width: 570px;
      height: 330px;
      margin-left:50px;
      &:first-child{
        margin-left: 0;
      }
      .l-t{
        height: 104px;
        background: #FFFFFF;
        box-shadow: 0px 3px 20px rgba(85,85,85,0.1600);
        opacity: 1;
        border-radius: 0px 0px 5px 5px;
        margin-bottom: 6px;
        border-top: 8px solid red;
      }
      .l-body{
        height: 220px;
        background: #fff;
        box-shadow: 0px 3px 20px rgba(85,85,85,0.1600);
        border-radius: 5px;
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