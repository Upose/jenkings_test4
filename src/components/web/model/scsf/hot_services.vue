<!--热门服务模板-->
<template>
  <div class="services-w">
    <div class="l-title tafter-border-c1">
      <label>
        <span class="m">热门</span>
        <span class="s">服务</span>
      </label>
      <a href="javascript:;" class="more">更多服务 +</a>
    </div><!--title end-->

    <div class="r-link">
      <div class="r-link-box thover-font-c5 " v-for="i in 8" :key="i">
        <img src="#">
        <span>开馆时间</span>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .services-w{
    color: #fff;
    width: 100%;
    height: 110px;
    background: rgba(83, 83, 83, 0.65);
    border-radius: 5px 5px 0px 0px;
    padding: 25px 0;
    padding-left:39px;
    .l-title{
      width: 116px;
      float: left;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        display: inline-block;
        height: 0;
        width: 0;
        bottom: 30px;
        right: -6px;
        border-left: 6px solid #A00404;
        border-bottom: 6px solid transparent !important;
        border-top: 6px solid transparent !important;
        border-right: 6px solid transparent !important;
      }
      label{
        font-weight: bold;
        vertical-align: bottom;
        .m{
          font-size: 28px;
        }
        .s{
          font-size: 20px;
        }
      }
      .more{
        margin-top: 5px;
        display: block;
        color: #fff;
        width: 81px;
        height: 20px;
        background: rgba(255,255,255,0.3500);
        border-radius: 3px 10px 10px 3px;
        padding:  1px 10px;
        font-size: 12px;
      }
    }
    .r-link{
      width: calc(100% - 150px);
      display: flex;
      .r-link-box{
        flex: 1;
        display: flex;
        align-items: center;
        justify-items: center;
        flex-direction: column;
        cursor: pointer;
        transition: all .3s;
        &:hover{
          margin-top: -5px;
        }
        img{
          width: 30px;
          height: 30px;
        }
        span{
          font-size: 14px;
          font-weight: bold;
          margin-top: 10px;
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

