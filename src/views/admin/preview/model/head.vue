<!--头部组件-->
<template>
  <div :class="data.headerTemplate.templateCode" :data-set="JSON.stringify({
        logo:data.headerTemplate.logo||'',
        headerBgImg:data.headerTemplate.headerBgImg||'',
        displayNavColumn:data.headerTemplate.displayNavColumn||'',
        headerAttachWidget:data.headerTemplate.headerAttachWidget||[],
        sceneid:data.id,
      })" :style="isstyleSet ? $styleSet(data,{},-1) : ''">

    <div :id="$setId()"></div>

  </div>
</template>

<script>
export default {
  name: 'head',
  created(){
    console.log('头部组件',this.data,this.isstyleSet);
  },
  /**
   * data 详情
   * styleSet：true需要设置 false:不需要设置  （全屏滚动为false）
   */
  props: ['data', 'isstyleSet'],
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  mounted() {
    if (this.data.headerTemplate && this.data.headerTemplate.router) {
        this.$addStyle(this.data.headerTemplate.router + '/component.css');
        this.$addScript(this.data.headerTemplate.router + '/component.js');
      }
  },
  methods: {},
}
</script>

