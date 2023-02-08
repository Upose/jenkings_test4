<!--头部组件-->
<template>
  <div v-if="details.headerTemplate" :class="details.headerTemplate.templateCode" :data-set="JSON.stringify({
        logo:details.headerTemplate.logo||'',
        headerBgImg:details.headerTemplate.headerBgImg||'',
        displayNavColumn:details.headerTemplate.displayNavColumn||'',
        headerAttachWidget:details.headerTemplate.headerAttachWidget||[],
        sceneid:details.id,
      })" :style="$styleSet({},-1)">

    <div :id="$setId()"></div>
  </div><!-- 头部信息-end -->
</template>

<script>
export default {
  name: 'head',
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

