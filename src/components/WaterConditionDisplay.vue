<!-- 
    七日水情展示 
    style   
-->
<template>
  <div id="main">
    <div id="myChart" ref="myChart"></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import elementResizeDetectorMaker from "element-resize-detector";
const elementResize = elementResizeDetectorMaker({
  strategy: "scroll", // <- 推荐监听滚动，提升性能
  callOnAdd: true, // 添加侦听器时是否应调用,默认true
});
export default {
  name: "water",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      myChart: null,
      option: {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    resize() {
      this.myChart.resize();
    },
    drawLine() {
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      this.myChart.setOption(this.option);

      elementResize.listenTo(document.getElementById("myChart"), (element) => {
        this.$nextTick(this.resize);
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log("WaterConditionDisplay created");
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log("WaterConditionDisplay Mounted");
    this.drawLine();
  },
  beforeCreate() {
    console.log("WaterConditionDisplay beforeCreate");
  }, //生命周期 - 创建之前
  beforeMount() {
    console.log("WaterConditionDisplay beforeMount");
  }, //生命周期 - 挂载之前
  beforeUpdate() {
    console.log("WaterConditionDisplay beforeUpdate");
  }, //生命周期 - 更新之前
  updated() {
    
  }, //生命周期 - 更新之后
  beforeDestroy() {
    elementResize.uninstall(this.$refs.myChart);
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    console.log("Water");
  }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
#main {
  position: relative;
  width: 100%;
  height: 100%;
}
#myChart {
  /* width: 970px;
  height: 500px; */
  /* width: 100%;
  height: 100%; */
  width: 100%;
  height: calc(100vh - 226px);
  position: relative;
  left: 0;
  top: 0;
}
</style>