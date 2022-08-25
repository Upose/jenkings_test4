<!--数据库导航模板2- 资源动态-->
<template>
  <div class="database_nav_sys_temp5-warp">
    <div class="title-w">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
      <g transform="translate(-370 -925)">
        <g transform="translate(-134.348 9.652)">
          <path class="tfill-c1" d="M6.682,10.365a3.682,3.682,0,1,1,3.682-3.682A3.687,3.687,0,0,1,6.682,10.365Zm0-5.409A1.726,1.726,0,1,0,8.409,6.682,1.728,1.728,0,0,0,6.682,4.956Z" transform="translate(501.348 912.348)"/>
          <path class="tfill-c1" d="M8.035,39.069a5.035,5.035,0,1,1,5.035-5.035A5.04,5.04,0,0,1,8.035,39.069Zm0-8.113a3.079,3.079,0,1,0,3.079,3.079A3.082,3.082,0,0,0,8.035,30.956Z" transform="translate(501.348 904.927)"/>
          <path class="tfill-c1" d="M36.035,41.069a5.035,5.035,0,1,1,5.035-5.035A5.04,5.04,0,0,1,36.035,41.069Zm0-8.113a3.079,3.079,0,1,0,3.079,3.079A3.082,3.082,0,0,0,36.035,32.956Z" transform="translate(493.279 904.279)"/>
          <path class="tfill-c1" d="M19.387,23.774a6.387,6.387,0,1,1,6.387-6.387A6.394,6.394,0,0,1,19.387,23.774Zm0-10.818a4.431,4.431,0,1,0,4.431,4.431A4.436,4.436,0,0,0,19.387,12.956Z" transform="translate(498.526 910.09)"/>
          <path class="tfill-c1" d="M32.682,10.365a3.682,3.682,0,1,1,3.682-3.682A3.687,3.687,0,0,1,32.682,10.365Zm0-5.409a1.726,1.726,0,1,0,1.726,1.726A1.728,1.728,0,0,0,32.682,4.956Z" transform="translate(493.927 912.348)"/>
          <path class="tfill-c1" d="M13.682,14.66a.975.975,0,0,1-.692-.286l-2.7-2.7a.978.978,0,0,1,1.383-1.383l2.7,2.7a.978.978,0,0,1-.692,1.67Z" transform="translate(499.276 910.276)"/>
          <path class="tfill-c1" d="M27.978,14.308a.978.978,0,0,1-.692-1.67l1.352-1.352a.978.978,0,0,1,1.383,1.383L28.67,14.022A.975.975,0,0,1,27.978,14.308Z" transform="translate(494.206 909.968)"/>
          <path class="tfill-c1" d="M32.035,32.027a.976.976,0,0,1-.764-.367l-4.057-5.071a.978.978,0,0,1,1.527-1.222L32.8,30.438a.978.978,0,0,1-.763,1.589Z" transform="translate(494.281 905.899)"/>
          <path class="tfill-c1" d="M13.978,30.66a.978.978,0,0,1-.692-1.67l2.7-2.7a.978.978,0,0,1,1.383,1.383l-2.7,2.7A.975.975,0,0,1,13.978,30.66Z" transform="translate(498.387 905.538)"/>
          </g></g></svg>
      <span class="tfont-c1">资源与动态</span>
      <a href="javascript:;" class="more"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAEtJREFUKFNjTEtL+89AImCkqqauri6GsrIyrG7AadPMmTMZ0tPTB4um7u5uBj4+Ppzh+PHjR7gfh4qf0D0D8mNpaSlpQY4vZZGVjAApwjqL8fqJXAAAAABJRU5ErkJggg==">更多</a>
    </div>
    <div class="list-w">
      <div class="l-row" v-for="i in 3" :key="i">
        <div class="date tfont-c1">
          <div class="day">06</div>
          <div class="y-m">2022-06</div>
        </div>
        <div class="txt-w">
          <p class="txt">中国法律资源库开通试用 <span class="type color1">试用</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>

.database_nav_sys_temp5-warp{
  .a{fill:#65923d;}
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
      display: flex;
      height:72px;
      align-items: center;
      .type{
        padding: 0 5px;
        color: #FF5700;
        font-size: 12px;
        width: 42px;
        height: 18px;
        background: rgba(255, 87, 0, 0.1);
        border-radius: 9px;
      }
      .color1{
        color: #FF5700;
        background: rgba(255, 87, 0, 0.1);
      }
      .color2{
        color: #0066FF;
        background: rgba(0, 102, 255, 0.1000);
      }
      .txt{
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        max-height: 66px;
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

