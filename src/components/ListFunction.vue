<!--  -->
<template>
  <el-card
    shadow="always"
    style="height: 56px"
    :body-style="{ padding: '9px' }"
  >
    <el-scrollbar :style="{ width: thisWidth + 'px' }">
      <div class="scrollbar-flex-content" >
        <div class="flexDisplay" v-if="isRight" >
          <el-button type="primary" icon="el-icon-edit" @click="isRight">右端吸附</el-button>
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="flexDisplay" v-if="isDatePicker">
          <span>日期选择：</span>
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期(默认7D)"
            :picker-options="pickerOptions"
            :editable="false"
            format="yyyy年 MM月 dd日"
            value-format="yyyy-MM-dd"
            style="margin: auto 0; width: 350px"
          >
          </el-date-picker>
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="flexDisplay" v-if="stationData">
          <span>测站选择：</span>
          <el-select
            v-model="stationVal"
            collapse-tags
            style="margin: auto 0"
            placeholder="请选择"
          >
            <el-option
              v-for="item in stationData"
              :key="item.StationID"
              :label="item.StationName"
              :value="item.StationID"
            >
            </el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="flexDisplay" v-if="sectionData">
          <span>断面选择：</span>
          <el-select
            v-model="sectionVal"
            multiple
            collapse-tags
            style="margin: auto 0"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sectionData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="flexDisplay" v-if="selectData">
          <el-input
            placeholder="请输入内容"
            v-model="searchVal"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option
                v-for="(item, index) in selectData"
                :key="index"
                :label="item.label"
                :value="item.prop"
              ></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="setSearchVal"
            ></el-button>
          </el-input>
          <el-divider direction="vertical"></el-divider>
        </div>
        <div class="flexDisplay" v-if="update" @click="update">
          <el-button type="primary"
            >上传<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </div>
        <div style="height: 9px; width: 1px"></div>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qs from "qs";
import elementResizeDetectorMaker from "element-resize-detector";
const elementResize = elementResizeDetectorMaker({
  strategy: "scroll", // <- 推荐监听滚动，提升性能
  callOnAdd: true, // 添加侦听器时是否应调用,默认true
});
export default {
  props: {
    isRight:{ type: Function, default: null },
    isDatePicker: { type: Boolean, default: false },
    stationData: { type: Array, default: null },
    sectionData: { type: Array, default: null },
    selectData: {
      type: Array,
      default: () => [{ label: "ID" }],
    },
    update: { type: Function, default: null },
  },
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      thisWidth: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      sectionVal: "",
      stationVal: "",
      searchVal: "",
      select: "",

      dateValue: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {
    /* selectData(){
      console.log("wo")
      return this.selectData
    } */
  },
  //监控data中的数据变化
  watch: {
    selectData(val) {
      this.select = val ? val[0].prop : "";
    },
    stationData(val) {
      this.stationVal = val[0].StationID;
    },
    stationVal(val) {
      this.$emit("formData", this.stationVal, this.dateValue);
    },
    dateValue(val) {
      this.$emit("formData", this.stationVal, this.dateValue);
    },
  },
  //方法集合
  methods: {
    setSearchVal() {
      this.$emit("searchVal", this.select, this.searchVal);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.thisWidth = document.getElementsByClassName("el-main")[0].offsetWidth;
    elementResize.listenTo(
      document.getElementsByClassName("el-main")[0],
      (element) => {
        this.thisWidth = element.offsetWidth - 20;
      }
    );
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
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.scrollbar-flex-content {
  white-space: nowrap;
}
.el-divider--vertical {
  height: 3em;
}
.flexDisplay {
  display: inline-flex;
}
span {
  white-space: nowrap;
  margin: auto 0;
  font-size: 14px;
}
.el-input .el-select {
  width: 120px;
}
</style>