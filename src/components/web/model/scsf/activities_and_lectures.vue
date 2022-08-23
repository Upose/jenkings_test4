<!--活动与讲座模板-跟新闻模板一模一样-->
<template>
  <div class="news-w">
    <div class="title-w">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
        <g transform="translate(-780 -900)">
          <rect class="a" width="30" height="25.5" rx="3" transform="translate(780 900.029)"/>
          <path class="tfill-c1" d="M2.9,1.962a.975.975,0,0,0-.968.981V22.558a.975.975,0,0,0,.968.981H27.1a.975.975,0,0,0,.968-.981V2.942a.975.975,0,0,0-.968-.981H2.9M2.9,0H27.1A2.923,2.923,0,0,1,30,2.942V22.558A2.923,2.923,0,0,1,27.1,25.5H2.9A2.923,2.923,0,0,1,0,22.558V2.942A2.923,2.923,0,0,1,2.9,0Z" transform="translate(780 900.029)"/>
          <path class="tfill-c1" d="M383.67,933.822a.937.937,0,0,1-.8-.453l-3.642-5.865-4.253,5.921a.935.935,0,0,1-.735.4h-.022a.931.931,0,0,1-.73-.36l-3.461-4.372L367.38,932.3a.917.917,0,0,1-1.34.1,1.037,1.037,0,0,1-.094-1.411l3.383-4.1a.922.922,0,0,1,.727-.344.932.932,0,0,1,.72.36l3.41,4.308,4.346-6.049a.93.93,0,0,1,.79-.4.94.94,0,0,1,.762.452l4.38,7.054a1.033,1.033,0,0,1-.275,1.384A.912.912,0,0,1,383.67,933.822Z" transform="translate(419.834 -16.473)"/>
          <path class="tfill-c1" d="M25.036,1H-.036A.983.983,0,0,1-1,0,.983.983,0,0,1-.036-1H25.036A.983.983,0,0,1,26,0,.983.983,0,0,1,25.036,1Z" transform="translate(782.5 928.029)"/>
          <rect class="c" width="30" height="30" transform="translate(780 900)"/>
        </g>
      </svg>
      <span class="tfont-c1">活动与讲座</span>
      <a href="javascript:;" class="more"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAEtJREFUKFNjTEtL+89AImCkqqauri6GsrIyrG7AadPMmTMZ0tPTB4um7u5uBj4+Ppzh+PHjR7gfh4qf0D0D8mNpaSlpQY4vZZGVjAApwjqL8fqJXAAAAABJRU5ErkJggg==">更多</a>
    </div>
    <div class="list-w">
      <div class="l-row" v-for="i in 3" :key="i">
        <div class="date tfont-c1">
          <div class="day">06</div>
          <div class="y-m">2022-06</div>
        </div>
        <div class="txt-w">
          <p class="txt">四川计算机科学学院工会积极组织开展系列健身强体抗疫工会活动</p>
          <p class="hint">时间：14:00~16:00</p>
          <p class="hint">地点：狮子山图书馆研究间123</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.a{fill:#fff;}.c{fill:none;}
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
        margin-bottom: 4px; 
      }
      .hint{
        color: #666;
        font-weight: 400;
        line-height: 15px;
        font-size: 10px;
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

