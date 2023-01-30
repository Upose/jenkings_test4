<template>
  <div class="page-warp">
    <div v-for="(i,k) in set_list">
      <el-select v-model="i.id" placeholder="请选择" @change="groupClick($event,k)">
        <el-option-group v-for="group in appPlateList" :key="group.appName" :label="group.appName">
          <el-option v-for="item in group.options" :key="item.value" :value="item.value" :label="item.key">{{item.key}}
          </el-option>
        </el-option-group>
      </el-select>
    </div>
    <h1>多级选择</h1>
    <el-cascader :options="options" :props="{ checkStrictly: true }" :show-all-levels="false" v-model="listvalue"></el-cascader>
    <el-button @click="submit">默认按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'cs',
  created(){
    this.$addStyle('/cdn/public/template/service_sys/temp12/component.css');
    this.$addScript('/cdn/public/template/service_sys/temp12/component.js');
  },
  data() {
    return {
      set_list: [
        { id: '',routeCode:''},
        { id: '',routeCode:''},
        { id: '',routeCode:''},
      ],
      listvalue:'',
      appPlateList: [{
        appName: '应用中心',
        routeCode: 'appcenter',
        options: [{
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
        routeCode: 'navigation',
        options: [{
          icon: null,
          key: "首页",
          value: "61ead105-4817-4047-98d2-eebb07dc",
        }, {
          icon: null,
          key: "图书频道",
          value: "85ead105-4817-4047-98d2-bb07dc",
        }]
      }],
      options: [{
          value: 'zhinan',
          key: '指南',
          children: [{
            value: 'shejiyuanze',
            key: '设计原则',
            children: [{
              value: 'yizhi',
              key: '一致'
            }]
          }]
        }, {
          value: 'ziyuan',
          key: '资源',
          children: [{
            value: 'axure',
            key: 'Axure Components'
          }]
        }],
      // options: [{
      //     value: 'zhinan',
      //     label: '指南',
      //     children: [{
      //       value: 'shejiyuanze',
      //       label: '设计原则',
      //       children: [{
      //         value: 'yizhi',
      //         label: '一致'
      //       }]
      //     }]
      //   }, {
      //     value: 'ziyuan',
      //     label: '资源',
      //     children: [{
      //       value: 'axure',
      //       label: 'Axure Components'
      //     }]
      //   }],
    }
  },
  mounted() {
  },
  methods: {
    groupClick(e,k) {
      this.appPlateList.forEach((item) => {
        var s = null;
        item.options.forEach((m,k) =>{
            if(m.value == e){
                s = true;
            }
        });
        if(s){
            this.set_list[k].routeCode = item.routeCode;
        }
      })
    },
    submit() {
      console.log(this.set_list);
      console.log(this.listvalue);
    },
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/public/css/error.less";
</style>
