<template>
  <div class="page-warp">
    <div v-for="(i,k) in set_list">
      <el-select v-model="i.id" placeholder="请选择" @change="groupClick($event,k)">
        <el-option-group v-for="group in options" :key="group.appName" :label="group.appName">
          <el-option v-for="item in group.child" :key="item.value" :value="item.value" :label="item.key">{{item.key}}
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <el-button @click="submit">默认按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'cs',
  data() {
    return {
      set_list: [
        { id: '',routeCode:''},
        { id: '',routeCode:''},
        { id: '',routeCode:''},
      ],
      options: [{
        appName: '应用中心',
        code: 'appcenter',
        child: [{
          icon: null,
          key: "统一检索",
          value: "41ead105-4817-4047-98d2-93bceebb07dc",
        }, {
          icon: null,
          key: "服务导航",
          value: "51ead105-4817-4047-98d2-93bceebb07dc",
        }]
      }, {
        appName: '信息导航',
        code: 'navigation',
        child: [{
          icon: null,
          key: "首页",
          value: "61ead105-4817-4047-98d2-eebb07dc",
        }, {
          icon: null,
          key: "图书频道",
          value: "85ead105-4817-4047-98d2-bb07dc",
        }]
      }],
    }
  },
  mounted() {
  },
  methods: {
    groupClick(e,k) {
      this.options.forEach((item) => {
        var s = null;
        item.child.forEach((m,k) =>{
            if(m.value == e){
                s = true;
            }
        });
        if(s){
            this.set_list[k].routeCode = item.code;
        }
      })
    },
    submit() {
      console.log(this.set_list);
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/public/css/error.less";
</style>
