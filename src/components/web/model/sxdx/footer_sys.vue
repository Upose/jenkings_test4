<!--底部模板-->
<template>
  <div class="foot-warp">
    <div class="m-width c-l">
      <div class="left">1</div>
      <div class="center">
        <div class="coumn-w">
          <a href="javascript:;" v-for="i in 7">山西大学</a>
        </div>
        <div class="edit-w">
          <p>校区地址：山西省太原市小店区戊城路92号      邮箱：sxulib@edu.cn</p>
          <p>Copyright©2020年 主页制作与维护;山西大学图书馆     建议浏览器使用IE10、Firefox、谷歌浏览</p>
        </div><!--富文本-->
      </div>
      <div class="right">3</div>
    </div>
  </div>
</template>

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

<style lang="less" scoped>
.foot-warp{
  .left,.center,.right{
    float: left;
  }
  .left{
    width: 20%;
  }
  .center{
    width: 60%;
  }
  .right{
    width: 20%;
  }
}
</style>
