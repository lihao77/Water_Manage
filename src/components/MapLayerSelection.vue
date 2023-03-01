<template>
  <span class="mapLayerSelection">
    <el-popover
      placement="left-start"
      title="图层"
      :width="300"
      trigger="click"
      :visible="visible"
    >
      <template #reference>
        <el-button circle icon="el-icon-copy-document"></el-button>
      </template>
      <el-tree
        ref="treeRef"
        :data="treeData"
        node-key="title"
        :default-expanded-keys="['地图底图']"
        :props="defaultProps"
        icon-class="el-icon-folder-opened"
      >
        <template #default="{ data }">
          <span v-if="!data.children">
            <el-checkbox v-model="data.selected" :disabled="data.disabled">{{
              data.title
            }}</el-checkbox>
            <span>
              <input
                v-model="data.opacity"
                type="range"
                min="0"
                max="1"
                step="0.01"
                :disabled="!data.selected"
                style="position: absolute; right: 0"
              />
            </span>
          </span>
          <span v-else>
            {{ data.title }}
          </span>
        </template>
      </el-tree>
    </el-popover>
  </span>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MapLayerSelection",
  computed: {
    ...mapGetters("map", { layersInMap: "layersInMap" }),
    /* // 按钮拖拽
    dragAlongside() {
      if (!this.visible) {
        return "";
      } else {
        return "disabled";
      }
    }, */
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
  mounted() {
    /* console.log("this.treeData", this.layersInMap);
    this.initTreeData(); */
  },
  methods: {
    // 初始化树节点数据
    initTreeData() {
      this.treeData = [
        {
          title: "卫星底图",
          children: this.layersInMap.filter((e) => e.type === "卫星底图"),
        },
        {
          title: "地图底图",
          children: this.layersInMap.filter((e) => e.type === "地图底图"),
        },
        {
          title: "输出图层",
          children: this.layersInMap.filter((e) => e.type === "输出图层"),
        },
      ];
      console.log("this.treeData",this.treeData)
    },

    // 更新layersIn
    updateLayersIn() {
      this.layersIn = [];
      this.treeData.forEach((e) => {
        this.layersIn.push(...e.children);
      });
      this.$store.commit("map/SET_LAYERSINMAP", this.layersIn);
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.initTreeData();
      }
    },
    treeData: {
      handler: function () {
        if (this.isFirst == false) {
          this.updateLayersIn();
        } else {
          this.isFirst = false;
        }
      },
      deep: true,
    },
    layersInMap: {
      handler: function () {
        if (this.isFirst == true) {
          this.initTreeData();
        }
      },
    },
  },
};
</script>

<style scoped>
.mapLayerSelection {
  position: absolute;
  top: 15px;
  right: 15px;
  opacity: 0.8;
}
</style>