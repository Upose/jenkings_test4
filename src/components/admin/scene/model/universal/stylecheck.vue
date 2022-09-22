<!--通用模板样式选择-->
<template>
  <div class="stylecheck-page">
    <div class="select-type">
      <h2 class="s-title">选择组件</h2>
      <div class="s-list">
        <div class="d-temp-box" v-for="(it,i) in template_list" :class="template_check == it.id?'d-temp-box-check':''" @click="appsTemplate(it,i)" :key="i">
          <img :src="fileUrl+it.cover" />
          <span class="temp-name">{{it.name||'无'}}</span>
          <el-button type="primary" class="button" size="mini"><i class="iconfont" :class="template_check == it.id?'el-icon-vip-check':'el-icon-vip-no-check'"></i> 选用</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileUrl: window.localStorage.getItem('fileUrl'),
      template_list: [
        { 
          "id": "ccfe3ece-0979-4e1f-8127-ccd82e578555", 
          "appId": "common", 
          "name": "图片组件", 
          "widgetCode": "common_imgUp", 
          "target": "http://192.168.21.71:9000/common/imgUp", 
          "availableConfig": "", 
          "cover": "/scene/h4.png", 
          "width": 10, 
          "height": 10, 
          "createTime": "2022-09-21T15:20:38.0683757+08:00", 
          "updateTime": "2022-09-21T15:20:38.0683802+08:00", 
          "sceneType": 1, 
          "topCountList": [], 
          "appColumn": null, 
          "routeCode": null, 
          "maxColumnCount": 0, 
          "templateCode": "common_imgUp" 
        },
        { 
          "id": "ccfe3ece-0979-4e1f-8127-ccd82e578566", 
          "appId": "common", 
          "name": "标题组件", 
          "widgetCode": "common_title", 
          "target": "http://192.168.21.71:9000/common/title", 
          "availableConfig": "", 
          "cover": "/scene/h4.png", 
          "width": 10, 
          "height": 10, 
          "createTime": "2022-09-21T15:20:38.0683757+08:00", 
          "updateTime": "2022-09-21T15:20:38.0683802+08:00", 
          "sceneType": 1, 
          "topCountList": [], 
          "appColumn": null, 
          "routeCode": null, 
          "maxColumnCount": 0, 
          "templateCode": "common_title" 
        },
        { 
          "id": "ccfe3ece-0979-4e1f-8127-ccd82e578577", 
          "appId": "common", 
          "name": "占位组件", 
          "widgetCode": "common_placeholder", 
          "target": "http://192.168.21.71:9000/common/placeholder", 
          "availableConfig": "", 
          "cover": "/scene/h4.png", 
          "width": 10, 
          "height": 10, 
          "createTime": "2022-09-21T15:20:38.0683757+08:00", 
          "updateTime": "2022-09-21T15:20:38.0683802+08:00", 
          "sceneType": 1, 
          "topCountList": [], 
          "appColumn": null, 
          "routeCode": null, 
          "maxColumnCount": 0, 
          "templateCode": "placeholder" 
        },
      ],
    }
  },
  mounted() {

  },
  methods: {
    appsTemplate(it,i){},
  },
}
</script>

<style lang="less" scoped>
@import "~@/assets/admin/css/color.less";
@import "~@/assets/admin/css/style.less";
@import "../../scene_set.less";
@import "../model.less";
.stylecheck-page {
}
</style>
