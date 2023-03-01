<!--  -->
<template>
  <el-table
    :data="tabledata"
    :size="size"
    style="width: 100%"
    height="100%"
    :border="isBorder"
    @select="select"
    @select-all="selectAll"
    v-loading="loading"
    :defaultSelections="defaultSelections"
    ref="cesTable"
    class="table"
    :row-class-name="rowColors"
  >
    <el-table-column
      v-if="isSelection"
      type="selection"
      align="center"
    ></el-table-column>
    <el-table-column
      v-if="isIndex"
      type="index"
      :label="indexLabel"
      align="center"
      width="50"
    ></el-table-column>
    <!-- 数据栏 -->
    <el-table-column
      v-for="item in tableCols"
      :fixed = 'item.fixed'
      :key="item.id"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :align="item.align"
      :render-header="item.require ? renderHeader : null"
    >
      <template slot-scope="scope">
        <!-- html -->
        <span v-if="item.type === 'Html'" v-html="item.html(scope.row)"></span>
        <!-- 按钮 -->
        <span v-if="item.type === 'Button'">
          <el-button
            v-for="(btn, index) in item.btnList"
            v-if="!btn.isShow || (btn.isShow && btn.isShow(scope.row))"
            :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
            :type="btn.type"
            :size="btn.size || size"
            :icon="btn.icon"
            :key="index"
            @click="btn.handle(scope.row)"
            >{{ btn.label }}</el-button
          >
        </span>
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'Input'"
          v-model="scope.row[item.prop]"
          :size="size"
          :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
          @focus="item.focus && item.focus(scope.row)"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="scope.row[item.prop]"
          :size="size"
          :props="item.props"
          :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
          @change="item.change && item.change(scope.row)"
        >
          <el-option
            v-for="op in item.options"
            :label="op[item.props.label]"
            :value="op[item.props.value]"
            :key="op[item.props.value]"
          ></el-option>
        </el-select>
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type === 'Radio'"
          v-model="scope.row[item.prop]"
          :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
          @change="item.change && item.change(scope.row)"
        >
          <el-radio
            v-for="(ra, index) in item.radios"
            :label="ra.value"
            :key="index"
            >{{ ra.label }}</el-radio
          >
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'Checkbox'"
          v-model="scope.row[item.prop]"
          :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
          @change="item.change && item.change(scope.row)"
        >
          <el-checkbox
            v-for="(ra, index) in item.checkboxs"
            :label="ra.value"
            :key="index"
            >{{ ra.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 评价 -->
        <el-rate
          v-if="item.type === 'Rate'"
          v-model="scope.row[item.prop]"
          @change="item.change && item.change(scope.row)"
        ></el-rate>
        <!-- 开关 -->
        <el-switch
          v-if="item.type === 'Switch'"
          v-model="scope.row[item.prop]"
          :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
          @change="item.change && item.change(scope.row)"
        ></el-switch>
        <!-- 图像 -->
        <img
          v-if="item.type === 'Image'"
          :src="scope.row[item.prop]"
          @click="item.handle && item.handle(scope.row)"
        />
        <!-- 滑块 -->
        <el-slider
          v-if="item.type === 'Slider'"
          v-model="scope.row[item.prop]"
          :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
          @change="item.change && item.change(scope.row)"
        ></el-slider>
        <!-- 默认 -->
        <span
          v-if="!item.type"
          :style="item.itemStyle && item.itemStyle(scope.row)"
          :class="item.itemClass && item.item.itemClass(scope.row)"
          >{{
            (item.formatter && item.formatter(scope.row)) ||
            scope.row[item.prop]
          }}</span
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  props: {
    // 表格型号：mini,medium,small
    size: { type: String, default: "medium" },
    isBorder: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    // 表格数据
    tableData: { type: Array, default: () => [] },
    // 表格列配置
    tableCols: { type: Array, default: () => [] },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: "序号" },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 分页数据
    pagination: {
      type: Object,
      default: () => ({ pageSize: 10, pageNum: 1, total: 0 }),
    },
    rowColors: {
      type: Function,
      default: null,
    },
  },
  //监听属性 类似于data概念
  computed: {
    tabledata() {
      if (this.isPagination == true) {
        return this.tableData.slice(
          (this.pagination.pageNum - 1) * this.pagination.pageSize,
          this.pagination.pageNum * this.pagination.pageSize
        );
      } else {
        return this.tableData;
      }
    },
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }, */
    // 表格勾选
    select(rows, row) {
      console.log(rows, row);
      this.$emit("select", rows, row);
    },
    // 全选
    selectAll(rows) {
      this.$emit("select", rows);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style>
.el-table .warning-row {
  background: rgb(255, 194, 179);
}

.el-table .success-row {
  background: #cbf2b5;
}
</style>