<template>
  <div class="d-bg-warp tbg-c1 dlib3-bgcomponent-w" :style="setBgTemp(bgImg)">
    
  </div>
</template>

<script>
export default {
  props:['data'],
  data() {
    return {
      bgImg:'',
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  mounted() {
    if(this.data && this.data.bgImg){
      this.bgImg = this.fileUrl+this.data.bgImg;
    }
  },
  methods: {
    setBgTemp(val){
      if(val && val!=null && val!=undefined){
        return {'background':'url('+val+')'};
      }else{
        return '';
      }
    },
  },
}
</script>

<style lang="less" scoped>
.d-bg-warp {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  background-position:center top !important;
}
</style>
