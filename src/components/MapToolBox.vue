<template>
  <span class="mapToolBox">
    <el-popover
      placement="left"
      title="工具箱"
      trigger="click"
      :visible="visible"
    >
      <template #reference>
        <el-button
          circle
          icon="el-icon-box"
          type="primary"
        ></el-button>
      </template>
      <!-- <el-button  icon="el-icon-place" circle>定位</el-button>
      <el-button type="primary" icon="el-icon-place" circle>测量</el-button> -->
      <Get-Location/>

    </el-popover>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import GetLocation from "./GetLocation.vue";

export default {
    name: "mapToolBox",
    components: {GetLocation},
    computed: {
    /*  ...mapGetters("map", { layersInMap: "layersInMap" }), */
    },
    data() {
        return {
            isFirst: true,
            visible: false,
            layersIn: undefined,
            treeData: undefined,
            defaultProps: {
                children: "children",
            }, // 树节点默认属性
        };
    },
    mounted() { },
    methods: {},
    watch: {},
};
</script>

<style scoped>
.mapToolBox {
  position: absolute;
  top: 100px;
  right: 15px;
  opacity: 0.8;
}
</style>