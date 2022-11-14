<template>
  <div class="footer-page">
    <span v-html="fot_html"></span>
  </div>
</template>

<script>
export default {
  name: 'footerPage',
  data () {
    return {
      fot_html:'',
    }
  },
  mounted(){
    this.fot_html = this.$store.state.baseinfo.orgInfo.manageFooter;
  },
  methods:{
  },
}
</script>

<style lang="less" scoped>
  .footer-page{
    text-align: center;
    color: #6C757D;
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
</style>
