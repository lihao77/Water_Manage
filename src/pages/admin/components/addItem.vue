<!--  -->
<template>
  <el-card
    class=""
    style="background-color: white; height: 100%"
    :body-style="{ height: '100%' }"
  >
    <div slot="header" class="adminCardTitle">
      <span>添加数据项</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text"
        >>>></el-button
      > -->
    </div>
    <el-scrollbar style="height: calc(100% - 55px)">
      <el-form ref="form" :model="sizeForm"  size="small">
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="测站名称">
              <el-select
                v-model="addItemForm.station"
                placeholder="请选择测站"
                style="width: 100%"
              >
                <el-option
                  v-for="item in stationData"
                  :key="item.StationID"
                  :label="item.StationName"
                  :value="item.StationID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="断面名称">
              <el-select
                v-model="addItemForm.section"
                placeholder="请选择断面"
                style="width: 100%"
              >
                <el-option
                  v-for="item in sectionData"
                  :key="item.SectionID"
                  :label="item.SectionName"
                  :value="item.SectionID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="检测日期">
              <el-col :span="24">
                <el-date-picker
                  type="date"
                  :picker-options="pickerOptions"
                  placeholder="选择日期"
                  v-model="addItemForm.date"
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="display: flex; flex-wrap: wrap; flex-direction: row;justify-content: space-between;">
          <el-form-item
            v-for="(item, index) in featureData"
            :key="index"
            :label="item.label"
          >
            <el-input
              style="width: 100px"
              v-model="addItemForm[item.valuename]"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item size="large" label-width="0">
          <div class="buttonRow">
            <el-row type="flex" :span="24" justify="space-around">
              <el-col :xs="24" :span="9">
                <el-row>
                  <el-col :span="24">
                    <el-button style="width: 100%">取消</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-button
                      style="width: 100%"
                      type="primary"
                      @click="onSubmit"
                      >立即创建</el-button
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </el-card>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qs from "qs";
export default {
  name:'addItem',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      stationData: [],
      sectionData: [],
      addItemForm: {
        station: [],
        section: [],
        date: "",
      },
      featureData: [],
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    stationWatch() {
      return this.addItemForm.station;
    },
  },
  //监控data中的数据变化
  watch: {
    stationWatch(val) {
      if (val !== "") {
        this.addItemForm.section = "";
        this.$axios({
          url: "http://47.98.181.209:9090/section_title",
          params: { station: val },
        }).then((res) => {
          this.sectionData = res.data;
          this.addItemForm.section = this.sectionData[0].SectionID;
        });
      }
      /* if (val !== "") {
        console.log("val", val);
        setTimeout(() => {
          this.sectionData = [
            { SectionID: "test1", SectionName: 1 },
            { SectionID: "test2", SectionName: 2 },
            { SectionID: "test3", SectionName: 3 },
          ];
        }, 1000);
      } */
    },
  },
  //方法集合
  methods: {

    getStation() {
      this.$axios("http://47.98.181.209:9090/station").then((res) => {
        this.stationData = res.data[0];
      });
    },
    getData() {
      this.$axios("http://47.98.181.209:9090/pollutant_name").then((res) => {
        console.log(res);
        res.data.forEach((e) => {
          this.$set(this.addItemForm, e.valuename, "");
        });
        this.featureData = res.data;
      });
    },
    onSubmit() {
      console.log("submit!", qs.stringify(this.addItemForm));
      this.$axios({url:'http://47.98.181.209:9090/insert',params:this.addItemForm}).then((res)=>{
        if(res.data.code == 1){
          this.$message({ message: res.data.message, type: "success" });
          this.addItemForm = Object.keys(this.addItemForm).forEach((value,key)=>{console.log(value)})
        }else{
          this.$message.error(res.data.message);
        }
      })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //获取测站列表
    this.getStation();
    //获取污染物数据
    this.getData();
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
.buttonRow .el-row {
  margin-bottom: 10px;

  
}
.adminCardTitle {
  font-size: large;
}
/* .el-checkbox-button__inner {
}
.el-radio__inner {
} */
</style>