<!--块区域是针对背景视频和banner滚动图等的操作
    这块区域用于，设置滚动banner和视频播放
    背景图第一层
    视频播放第二层
    banner图第三层
-->
<template>
  <div class="dlib3-temp-imgvideo">
    <div class="img-warp-bg" v-if="$isImgvideo(bg_img)=='img'" id="dlib3_bg_img" :style="sceenBgImg(bg_img)">
    </div><!-- 背景图-end -->

    <div class="video-warp-bg" v-if="$isImgvideo(bg_img)=='video'" id="dlib3_bg_video">
      <video :src="fileUrl+bg_img" autoplay loop></video>
    </div><!-- 视频背景-end -->

    <div class="banner-warp-bg" id="dlib3_bg_banner">
      <div id="dlib3_bg_banner_component">
        <!-- <div class="dlib3-banner-index"><img src="https://img0.baidu.com/it/u=3772442123,1691624333&fm=253&fmt=auto&app=138&f=JPEG?w=1166&h=360"></div>
             <div class="dlib3-banner-index"><img src="https://img2.baidu.com/it/u=1119585672,1899188854&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=287"></div> -->
      </div>
    </div><!-- banner图-end -->
  </div>
</template>

<script>
export default {
  props: ['bgImg'],
  watch: {
   bgImg(newV,oldV) {
    this.bg_img = newV;
    } 
  },
  created(){
    this.bg_img = this.bgImg;
  },
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      bg_img:''
    }
  },
  mounted() {
    // console.log(this.bgImg);
  },
  methods: {
    //样式设置
    sceenBgImg(bgImg) {
      var list = {};
      list = { 'background': 'url(' + this.fileUrl + (bgImg || '') + ')','background-position':'center top','background-repeat': 'repeat-x'};
      return list;
    },
  },
}
</script>
