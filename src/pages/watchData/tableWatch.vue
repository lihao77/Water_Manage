<template>
  <div class="tableWatchMain">
    <section class="sectionHandle">
      <ListFunctionVue
        :isDatePicker="true"
        :stationData="stationData"
        :selectData="selectData"
        ref="listFunction"
      />
    </section>
    <!-- 数据表格 -->
    <section class="ces-table" ref="cesTable">
      <DataListVue
        size="medium "
        :isSelection="isSelection"
        :isIndex="isIndex"
        :isPagination="isPagination"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
        :rowColors="rowColors"
        v-loading="loading"
      />
    </section>
    <!-- 分页 -->
    <section class="ces-pagination" v-if="isPagination">
      <el-pagination
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
        "
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="sizes,total,prev, pager, next,jumper"
        :page-size="pagination.pageSize"
        :current-page="pagination.pageNum"
        :total="tableData.length"
      ></el-pagination>
    </section>
  </div>
</template>

<script>
import ListFunctionVue from "../../components/ListFunction.vue";
import DataListVue from "../../components/DataList.vue";
export default {
  name: "tableWatch",
  data() {
    return {
      loading:true,
      isHandle: true,
      isSelection: false,
      isIndex: false,
      stationData: [],
      // 表格
      rawData: [],
      tableData: [],
      //
      tableCols: [],
      //el-button
      tableHandles: [
        {
          label: "是否分页",
          type: "primary",
          handle: () => {
            this.$bus.$emit("isPagination", this.isPagination);
          },
        },
      ],
      pagination: {
        pageSize: 10,
        pageNum: 1,
        total: 13,
      },
      isPagination: true,
    };
  },
  components: {
    ListFunctionVue,
    DataListVue,
  },
  mounted() {
    this.$axios("http://47.98.181.209:9090/station").then((res) => {
      this.stationData = res.data[0];
    });
    this.$bus.$on("isPagination", (isPagination) => {
      this.isPagination = !isPagination;
      console.log(this.isPagination);
    });

    this.$refs.listFunction.$on("formData", this.handleFormData);

    this.$refs.listFunction.$on("searchVal", this.handleSearch);
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
  computed: {
    selectData() {
      var a = this.tableCols.filter((item) => {
        return "prop" in item;
      });
      console.log(a);
      return a;
    },
  },
  methods: {
    rowColors({ row, rowIndex }) {
      if (Number(row.unqualified) > 4) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    handleFormData(stationVal, dateValue) {
      console.log(stationVal, dateValue);
      this.loading = true
      this.$axios({
        url: "http://47.98.181.209:9090/warn_test",
        params: { stationVal: stationVal, dateValue: dateValue },
      }).then((res) => {
        this.rawData = res.data[0];
        this.tableData = res.data[0];
        console.log("this.tableData", this.tableData);
        this.tableCols = res.data[1];
        console.log("this.tableCols", this.tableCols);
        this.loading = false
      });
    },
    handleSearch(searchName, val) {
      //字符串模糊查询，数字精确查询
      console.log(this.rawData[0][searchName], val);
      let newData = [];
      if (val != "") {
        if (typeof this.rawData[0][searchName] == "string") {
          this.rawData.forEach((e) => {
            if (e[searchName].indexOf(val) != -1) {
              
              newData.push(e);
            }
          });
        } else {
          newData = this.rawData.filter((e) => e[searchName] == val);
        }
      } else {
        newData = this.rawData;
      }
      this.tableData = newData;
    },
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
  activated() {
    console.log("Section activated");
  },
  destroyed() {
    console.log("Section destroyed");
  },
};
</script>

<style>
.tableWatchMain {
  height: 100%;
}

.ces-table-require::before {
  content: "*";
  color: red;
}
/* 此处修改表格高度 */
.ces-table {
  height: calc(100% - 91px);
}
</style>