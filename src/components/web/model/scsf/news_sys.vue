<!--新闻模板-->
<template>
  <div class="news-w">
    <div class="title-w">
      <img src="">
      <span class="tfont-c1">通知公告</span>
      <a href="javascript:;" class="more"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAEtJREFUKFNjTEtL+89AImCkqqauri6GsrIyrG7AadPMmTMZ0tPTB4um7u5uBj4+Ppzh+PHjR7gfh4qf0D0D8mNpaSlpQY4vZZGVjAApwjqL8fqJXAAAAABJRU5ErkJggg==">更多</a>
    </div>
    <div class="list-w">
      <div class="l-row" v-for="i in 3" :key="i">
        <div class="date tfont-c1">
          <div class="day">06</div>
          <div class="y-m">2022-06</div>
        </div>
        <div class="txt-w">
          <span class="type tbg-c1">新闻</span>
          <p class="txt">四川计算机科学学院工会积极组织开展系列健身强体抗疫工会活动</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.news-w{
  background: #fff;
  .title-w{
    border-bottom: 2px solid #E2E2E2;
    padding: 12px 0;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 8px;
    .more{
      float: right;
      display: flex;
      align-items: center;
      color: #666;
      font-size: 12px;
      padding-top: 5px;
      img{
        margin-right: 2px;
      }
    }
  }
  .l-row{
    padding: 17px 0;
    padding-top: 23px;
    border-bottom: 1px solid #E9E9E9;
    position: relative;
    min-height: 112px;
    .date{
      position: absolute;
      left: 0;
      width: 70px;
      height: 72px;
      padding: 5px;
      border: 1px solid #E2E2E2;
      .day{
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
      }
      .y-m{
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    }
    .txt-w{
      padding-left: 88px;
      .type{
        width: auto;
        font-size: 12px;
        padding: 0 5px;
        border-radius: 3px;
        color: #fff;
        text-align: center;
      }
      .txt{
        margin-top: 4px;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        max-height: 44px;
      }
    }
  }
}
</style>
<script>
export default {
  created(){},
  data () {
    return {
        
    }
  },
  mounted(){
  },
  methods:{
      
  },
}
</script>

