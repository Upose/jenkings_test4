<template>
  <div class="list-warp">
    <h1>四川师范大学图书馆</h1>
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
    <!-- <h1>山西大学图书馆</h1>
    <br>
    <header_sys></header_sys>
    <br>
    <unified_retrieval_sys></unified_retrieval_sys>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <database_nav_sys></database_nav_sys>
    <br>
    <news_sys></news_sys>
    <br>
    <service_sys></service_sys>
    <br>
    <literature_recommend_sys></literature_recommend_sys>
    <br>
    <loganalysis_sys></loganalysis_sys>
    <br>
    <footer_sys></footer_sys>
    <br> -->
  </div>
</template>

<script>
// 四川师范大学图书馆
import academic_result from "@/components/web/model/scsf/academic_result";
import database_nav_sys from "@/components/web/model/scsf/database_nav_sys";
import database_nav_sys1 from "@/components/web/model/scsf/database_nav_sys1";
import header_sys from "@/components/web/model/scsf/header_sys";
import activities_and_lectures from "@/components/web/model/scsf/activities_and_lectures";
import hot_services from "@/components/web/model/scsf/hot_services";
import literature_project_sys from "@/components/web/model/scsf/literature_project_sys";
import news_sys from "@/components/web/model/scsf/news_sys";
import unified_retrieval_sys from "@/components/web/model/scsf/unified_retrieval_sys";

// //山西大学图书馆
// import database_nav_sys from "@/components/web/model/sxdx/database_nav_sys";
// import header_sys from "@/components/web/model/sxdx/header_sys";
// import literature_recommend_sys from "@/components/web/model/sxdx/literature_recommend_sys";
// import news_sys from "@/components/web/model/sxdx/news_sys";
// import service_sys from "@/components/web/model/sxdx/service_sys";
// import loganalysis_sys from "@/components/web/model/sxdx/loganalysis_sys";
// import footer_sys from "@/components/web/model/sxdx/footer_sys";
// import unified_retrieval_sys from "@/components/web/model/sxdx/unified_retrieval_sys";
export default {
  created() { },
  components: { 
    academic_result, database_nav_sys,database_nav_sys1, header_sys, hot_services, literature_project_sys, news_sys,activities_and_lectures, unified_retrieval_sys, 
    // header_sys,footer_sys,database_nav_sys,literature_recommend_sys,news_sys,service_sys,loganalysis_sys,unified_retrieval_sys
    },
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
  background: #a1a1a1;
}
</style>
