<!--缩放-->
<template>
  <div class="scaling-page c-l">
    <div class="s-box">
      <i class="el-icon-remove s-minus" @click="minusClick()"></i>
      <span class="s-proportion">{{parseInt(proportion)}}%</span>
      <i class="el-icon-circle-plus s-add" @click="addClick()"></i>
    </div>
    <div class="s-ratio" title="还原" @click="restoreClcik()">{{ratio}}</div>
  </div>
</template>
<style>

</style>
<script>
export default {
  name: 'scalingPage',
  props:['width'],
  watch: {
   width(newV,oldV) {
     this.p_width = newV;
    } 
  },
  created(){
    this.p_width = this.width||1200;
  },
  data () {
    return {
      proportion:30,
      ratio:'1:1',
      p_width:1200,
    }
  },
  methods:{
    //获取高度
    getHeight(val){
      var ratio_num = 1;
      if(val && val>0){
        ratio_num = val/this.width;
      }else{
        ratio_num = 1;
      }
      this.setRatio(ratio_num);
    },
    //缩小
    minusClick(){
      if(this.proportion>30){
        var num = (Math.floor(this.proportion/10)*10) - 10;
        this.setRatio(num/100);
      }
    },
    //放大
    addClick(){
      if(this.proportion<100){
        var num = (Math.floor(this.proportion/10)*10) + 10;
        this.setRatio(num/100);
      }
    },
    //还原 1:1
    restoreClcik(){
      this.setRatio(1);
      this.proportion = 100;
    },
    //设置比例
    setRatio(val){
      if(val>0.3){
        this.$emit("update:ratio_num",val);
        this.proportion = val*100;
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/admin/css/color.less";/**颜色配置 */
@import "../../../assets/admin/css/style.less";
  .scaling-page{
    color: #202020;
    width: 153px;
    height: 36px;
    line-height: 36px;
    background: #F8FAFF;
    border: 1px solid #EDEEF0;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.02);
    border-radius: 3px;
    padding: 0 15px;
    padding-right: 5px;
    font-size: 12px;
    user-select: none;
    .s-box,.s-ratio{
      float: left;
    }
    .s-box{
      margin-right: 10px;
      .s-minus,.s-add{
        font-size: 14px;
        cursor: pointer;
        &:hover{
          opacity: .8;
        }
        &:active{
          opacity: 1;
        }
      }
      .s-proportion{
        width: 45px;
        text-align: center;
        display: inline-block;
      }
    }
    .s-ratio{
      cursor: pointer;
      position: relative;
      width:40px;
      display: block;
      text-align: center;
      &::after{
        content: '';
        width: 1px;
        height: 20px;
        top: 50%;
        left: 0;
        margin-top: -10px;
        background-color: #EDEEF0;
        position: absolute;
      }
    }
  }
</style>
