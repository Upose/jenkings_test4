<template>
<div class="warp">
    <headerpage></headerpage>
    <div class="admin-warp-content"><router-view></router-view></div>
    <!-- <footerpage class="footer-page"></footerpage> -->
</div>
</template>

<script>
import headerpage from '@/components/admin/common/header'
import footerpage from '@/components/admin/common/footer'
export default {
  name: 'index',
  components:{headerpage,footerpage},
  data () {
    return {}
  },
  methods:{
    
  }
}
</script>

<style scoped>
@import "../../../assets/admin/css/color.less";
@import "../../../assets/admin/css/style.less";
.warp{
  width: 100%;
  height: 100%;
  position: relative;
}
.admin-warp-content{
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
}
/**
.content-warp{
  position: absolute;
  top: 61px;
  left: 0;
  right: 0;
  bottom: 40px;
}
.footer-page{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
**/
</style>
