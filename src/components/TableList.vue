<!--表格组件 -->
<template>

  <section class="ces-table-page">
    <!-- 表格操作按钮 -->
    <section class="ces-handle" v-if="isHandle">
      <ListFunctionVue />
    </section>
    <!-- 数据表格 -->
    <section class="ces-table">
      <DataListVue
        :size="size"
        :isSelection="isSelection"
        :isIndex="isIndex"
        :isPagination="isPagination"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      />
    </section>
    <!-- 分页 -->
    <section class="ces-pagination" v-if="isPagination">
      <el-pagination
        style="display: flex; justify-content: center; align-items: center"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="sizes,total,prev, pager, next,jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.pageNum"
        :total="tableData.length"
      ></el-pagination>
    </section>
  </section>
</template>

<script>
import DataListVue from "./DataList.vue";
import ListFunctionVue from "./ListFunction.vue";
export default {
  components: {
    DataListVue,
    ListFunctionVue,
  },
  props: {
    // 表格型号：mini,medium,small
    size: { type: String, default: "small" },
    isBorder: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    // 表格操作
    isHandle: { type: Boolean, default: false },
    tableHandles: { type: Array, default: () => [] },
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
  },
  data() {
    return {
      disable: true,
    };
  },
  watch: {
    defaultSelections(val) {
      this.$nextTick(function () {
        if (Array.isArray(val)) {
          val.forEach((row) => {
            this.$refs.cesTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.cesTable.toggleRowSelection(val);
        }
      });
    },
  },
  methods: {
    //
    handleCurrentChange(val) {
      this.pagination.pageNum = val;
      this.$emit("refresh");
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.$emit("refresh");
    },

    // tableRowClassName({rowIndex}) {
    //     if (rowIndex % 2 === 0) {
    //         return "stripe-row";
    //     }
    //     return "";
    // }
    renderHeader(h, obj) {
      return h("span", { class: "ces-table-require" }, obj.column.label);
    },
  },
};
</script>
<style>
/* .ces-table-require::before {
  content: "*";
  color: red;
} */
</style>

