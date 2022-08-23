<!--新闻模板-->
<template>
  <div class="news-w">
    
    <div class="title-w">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><g transform="translate(-72.1 -65.943)"><path class="tfill-c1" d="M89.147,93.029a1.726,1.726,0,0,1-.448,1.018c-2.192-1.862-7.9-7.324-7.959-7.378a.838.838,0,0,0-.636-.3h-5.4a.9.9,0,0,1-.868-.921V75.527a.9.9,0,0,1,.868-.921h6.052a.814.814,0,0,0,.475-.151.858.858,0,0,0,.417-.215c.051-.047,5.125-4.81,7.05-6.406a1.7,1.7,0,0,1,.451,1.018Zm-1.4-26.745c-1.754,1.435-6.373,5.754-7.149,6.484H74.705A2.688,2.688,0,0,0,72.1,75.527v9.922a2.688,2.688,0,0,0,2.605,2.759h5.053c1.043.995,6.028,5.741,7.98,7.381a1.435,1.435,0,0,0,.93.353,1.507,1.507,0,0,0,.7-.178,3.3,3.3,0,0,0,1.515-2.736V68.852a3.31,3.31,0,0,0-1.5-2.726A1.437,1.437,0,0,0,87.749,66.284Zm0,0,6.889,8.658a.837.837,0,0,0-1.224.1.959.959,0,0,0,.1,1.3A7.756,7.756,0,0,1,95.8,81.15a8.066,8.066,0,0,1-2.263,5.731.961.961,0,0,0,.058,1.3.835.835,0,0,0,1.227-.064,9.883,9.883,0,0,0,2.711-7.085A9.626,9.626,0,0,0,94.638,74.942Zm0,0" transform="translate(0 0)"/><path class="tfill-c1" d="M775.722,183.194a.771.771,0,0,0-1.173.075,1,1,0,0,0,.065,1.308,15.572,15.572,0,0,1,3.312,5.773,14.12,14.12,0,0,1,.536,6.325,18.02,18.02,0,0,1-3.476,8.006,1.009,1.009,0,0,0,.118,1.305.777.777,0,0,0,.523.207.79.79,0,0,0,.644-.342,19.971,19.971,0,0,0,3.828-8.884,16.132,16.132,0,0,0-.611-7.24A17.257,17.257,0,0,0,775.722,183.194Zm0,0" transform="translate(-678.164 -113.193)"/></g></svg>
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
    svg{
      vertical-align: bottom;
    }
    .more{
      float: right;
      display: flex;
      align-items: center;
      color: #666;
      font-size: 12px;
      padding-top: 5px;
      transition: all .3s;
      &:hover{
        opacity: .75;
      }
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
    cursor: pointer;
    transition: all .3s;
    &:hover{
      box-shadow:0px 1px 8px #dddddd;
    }
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

