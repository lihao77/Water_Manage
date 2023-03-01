<template>
  <div
    :class="className"
    id="LineChart"
    :style="{ height: height, width: width }"
  />
</template>

<script>
/* import echarts from "echarts"; */
require("echarts/theme/macarons"); // echarts theme
import elementResizeDetectorMaker from "element-resize-detector";
const elementResize = elementResizeDetectorMaker({
  strategy: "scroll", // <- 推荐监听滚动，提升性能
  callOnAdd: true, // 添加侦听器时是否应调用,默认true
});
export default {
  props: {
    axaisData: { type: Array, require: true },
    subtext: {
      type: String,
      default: null,
    },
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "99%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });

    elementResize.listenTo(document.getElementById("LineChart"), (element) => {
      this.$nextTick(this.resize);
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      this.chart.resize();
    },
    initChart() {
      this.chart = this.$echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions(chartData) {
      this.chart.setOption({
        xAxis: {
          data: this.axaisData,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
        },
        title: {
          show: true, //显示策略，默认值true,可选为：true（显示） | false（隐藏）
          text: "七日数据", //主标题文本，'\n'指定换行
          subtext: this.subtext,
          x: "right", //水平安放位置，默认为'left'，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
          y: "top", //垂直安放位置，默认为top，可选为：'top' | 'bottom' | 'center' | {number}（y坐标，单位px）
        },
        series: [
          {
            name: "actual",
            smooth: true,
            type: "line",
            itemStyle: {
              color: "#a52a2a",
            },
            areaStyle: {
              color: "#f3f8ff",
            },
            lineStyle: {
              color: "#a52a2a",
              width: 2,
            },
            data: chartData,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
  },
};
</script>
