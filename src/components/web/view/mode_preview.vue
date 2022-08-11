<template>
  <div class="list-warp">
    <header_sys></header_sys>
    <br>
    <academic_result></academic_result>
    <br>
    <hot_services></hot_services>
    <br>
    <database_nav_sys></database_nav_sys>
    <br>
    <literature_project_sys></literature_project_sys>
    <br>
    <news_sys></news_sys>
    <br>
    <activities_and_lectures></activities_and_lectures>
    <br>
    <database_nav_sys1></database_nav_sys1>
    <br>
    <unified_retrieval_sys ></unified_retrieval_sys>
    <br>
  </div>
</template>

<script>
import academic_result from "@/components/web/model/scsf/academic_result";
import database_nav_sys from "@/components/web/model/scsf/database_nav_sys";
import database_nav_sys1 from "@/components/web/model/scsf/database_nav_sys1";
import header_sys from "@/components/web/model/scsf/header_sys";
import activities_and_lectures from "@/components/web/model/scsf/activities_and_lectures";
import hot_services from "@/components/web/model/scsf/hot_services";
import literature_project_sys from "@/components/web/model/scsf/literature_project_sys";
import news_sys from "@/components/web/model/scsf/news_sys";
import unified_retrieval_sys from "@/components/web/model/scsf/unified_retrieval_sys";
export default {
  created() { },
  components: { academic_result, database_nav_sys,database_nav_sys1, header_sys, hot_services, literature_project_sys, news_sys,activities_and_lectures, unified_retrieval_sys },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
@import "../../../assets/public/css/public.less";
.list-warp{
  min-height: 100%;
  background: #f1f1f1;
}
</style>
