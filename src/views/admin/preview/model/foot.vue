<!--底部组件-->
<template>
  <div :class="data.footerTemplate.templateCode" :data-set="JSON.stringify({
          content:data.footerTemplate.content||'',
          footerBgImg:data.footerTemplate.footerBgImg||'',
          footerDisplayNavColumn:data.footerTemplate.footerDisplayNavColumn||'',
          sceneid:data.id,
        })">

    <div :id="$setId()"></div>

  </div>
</template>

<script>
export default {
  name: 'foot',
  props: ['data'],
  data() {
    return {}
  },
  mounted() {
    if (this.data.footerTemplate && this.data.footerTemplate.router) {
      this.$addStyle(this.data.footerTemplate.router + '/component.css');
      this.$addScript(this.data.footerTemplate.router + '/component.js');
    }
  },
  methods: {},
}
</script>

