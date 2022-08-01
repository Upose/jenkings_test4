<!--
 * @Description: 
 * @Author: gongqin
 * @Date: 2022-05-30 10:52:16
 * @LastEditors: gongqin
 * @LastEditTime: 2022-07-27 16:57:22
-->

<!--左边菜单-->
<template>
  <LeftNavCom :dataList="dataList"/>
</template>

<script>
import http from "@/assets/public/js/http";
import LeftNavCom from './LeftNavCom/index.vue'
export default {
  name: 'test',
  components: {
    LeftNavCom
  },
  watch: {
    '$route': 'force'
  },
  data(){
    return {
      dataList: [],
    }
  },
  created() {
    let appMenu = this.$store.state.menuList;
    if(appMenu && appMenu.length){
      // 只取第一级
      this.dataList = appMenu.map(item => {
        return {
          ...item,
          permissionNodes: [],
        }
      })
    }
  },
  methods: {
    force() {
      this.$forceUpdate();
    },
  }
}
</script>
