<template>
  <div class="columnCenter" id="home">
    <el-row type="flex" style="height: 45%">
      <el-col
        :xl="16"
        :lg="16"
        :md="24"
        :sm="24"
        :xs="24"
        :span="16"
        style="height: 100%"
      >
        <top-group
          v-if="topData"
          :topData="topData"
          :fontSize="homeHeight * 0.18225"
          @handleSetLineChartData="handleSetLineChartData"
        ></top-group>

        <down-group
          v-if="downData"
          :downData="downData"
          :fontSize="homeHeight * 0.18225"
          @handleSetLineChartData="handleSetLineChartData"
        ></down-group>
      </el-col>
      <el-col :span="7" style="height: 100%" class="hidden-md-and-down">
        <div class="columnCenter">
          <el-card class="box-card" style="height: 90%">
            <div slot="header" class="clearfix">
              <span>通知信息</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" style="height: 50%">
      <el-col
        :xl="16"
        :lg="16"
        :md="24"
        :sm="24"
        :xs="24"
        :span="16"
        style="height: 100%"
      >
        <div class="columnCenter">
          <el-row type="flex" justify="space-around" style="height: 90%">
            <el-col style="width: 93.75%">
              <el-card
                class="box-card"
                style="height: 100%; width: 100%"
                :body-style="{ padding: 0 }"
              >
                <line-chart
                :subtext="subtext"
                  :axaisData="chartData.date"
                  :height="homeHeight * 0.405 + 'px'"
                  :chart-data="chartDataItem"
                  v-if="chartDataItem"
                />
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="7" style="height: 100%" class="hidden-md-and-down">
        <div class="columnCenter">
          <el-card class="box-card" style="height: 90%" :body-style="{height:'100%',padding:'10px'}">
            <div slot="header" class="clearfix">
              <span>更新日志</span>
            </div>
            <el-scrollbar style="height: calc(100% - 32px);">
              <div>更新日志@1.0</div>
              <el-divider></el-divider>
              <div>更新日志@1.1</div>
              <el-divider></el-divider>
              <div>更新日志@1.2</div>
              <el-divider></el-divider>
            </el-scrollbar>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import topGroup from "./components/topGroup.vue";
import downGroup from "./components/downGroup.vue";
import LineChart from "./components/LineChart";
import elementResizeDetectorMaker from "element-resize-detector";
const elementResize = elementResizeDetectorMaker({
  strategy: "scroll", // <- 推荐监听滚动，提升性能
  callOnAdd: true, // 添加侦听器时是否应调用,默认true
});
export default {
  name: "home",
  data() {
    return {
      currentDate: new Date(),
      subtext:null,
      homeHeight: null,
      chartData: null,
      chartDataItem: null,
      downData: { DOx: 0, COD: 0, BOD5: 0 },
      topData: { number: 0, activeNum: 0, warn: 0 },
    };
  },
  components: {
    topGroup,
    LineChart,
    downGroup,
  },
  mounted() {
    elementResize.listenTo(document.getElementById("home"), (element) => {
      this.homeHeight = element.offsetHeight;
    });
    this.GetChartsData();
  },
  methods: {
    handleSetLineChartData(type) {
      this.chartDataItem = this.chartData[type];
      this.subtext = type
    },
    async GetChartsData() {
      await this.$axios("http://47.98.181.209:9090/7days").then((res) => {
        this.chartData = res.data;
        this.chartDataItem = this.chartData["number"];
        this.topData.number =
          this.chartData["number"][this.chartData["number"].length - 1];
        this.topData.activeNum =
          this.chartData["activeNum"][this.chartData["activeNum"].length - 1];
        //this.topData.warn = this.chartData[''][this.chartData['BOD5'].length-1]
      });
      await this.$axios("http://47.98.181.209:9090/warn").then((res) => {
        this.chartData = Object.assign(res.data, this.chartData);
        this.topData.warn =
          this.chartData["warn"][this.chartData["warn"].length - 1];
      });
      this.$axios("http://47.98.181.209:9090/picture").then((res) => {
        this.chartData = Object.assign(res.data, this.chartData);
        //this.chartDataItem = this.chartData['DOx']
        this.downData.DOx =
          this.chartData["DOx"][this.chartData["DOx"].length - 1];
        this.downData.COD =
          this.chartData["COD"][this.chartData["COD"].length - 1];
        this.downData.BOD5 =
          this.chartData["BOD5"][this.chartData["BOD5"].length - 1];
        console.log(this.chartData, this.topData);
      });
    },
    open() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script >
<style lang="scss" scoped>
#home {
  .el-divider {
    background-color: #9e9fa2;
  }
}
.clearfix:after {
  clear: both;
}
.columnCenter {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}
.rowCenter {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100%;
}
</style>