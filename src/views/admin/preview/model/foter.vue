<!--底部组件-->
<template>
  <div v-if="details.footerTemplate" :class="details.footerTemplate.templateCode" :data-set="JSON.stringify({
          content:details.footerTemplate.content||'',
          footerBgImg:details.footerTemplate.footerBgImg||'',
          footerDisplayNavColumn:details.footerTemplate.footerDisplayNavColumn||'',
          sceneid:details.id,
        })">

    <div :id="$setId()"></div>
  </div><!-- 底部信息-end -->
</template>

<script>
export default {
  name: 'foot',
  props: ['details'],
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
    }
  },
  mounted() { },
  methods: {},
}
</script>

