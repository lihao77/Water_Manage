<template>
  <!--显示鼠标光标二维坐标的控件  -->
  <div class="controlContainer">
    <span class="mousePosition" ref="mousePosition"></span>
  </div>
</template>

<script>
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
export default {
    props:["map"],
  mounted() {
      this.initMousePosition()
  },
  methods: {
    initMousePosition() {
      // 显示鼠标光标二维坐标的控件
      let mousePositionControl = new MousePosition({
        // 坐标格式  createStringXY(2)指定显示 2 个小数位
        coordinateFormat: createStringXY(4),

        // 投影
        projection: "EPSG:4326",
        className: "custom-mouse-position",
        target: this.$refs.mousePosition,
        undefinedHTML: "&nbsp;", // 鼠标离开地图时输出空格
      });
      this.map.addControl(mousePositionControl);
    },
  },
};
</script>

<style lang="scss" scoped>
.controlContainer {
  position: absolute;
  bottom: 0;
  left: 0px;
  width: 200px;
  /* height: 25px; */
  border: lawngreen 1px solid;
  .mousePosition {
    display: inline-block;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
    text-align: center;
    
  }
}
</style>