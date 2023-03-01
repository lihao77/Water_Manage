<template>
  <div class="stationMain">
    <section class="ces-handle" v-if="isHandle">
      <ListFunctionVue :selectData="tableCols" ref="listFunction" />
    </section>
    <!-- 数据表格 -->
    <section class="ces-table">
      <DataListVue
        size="medium"
        :isPagination="isPagination"
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
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
          padding: 2.5px 0;
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
/* import axios from "axios"; */
import ListFunctionVue from "./ListFunction.vue";
import TableListVue from "./TableList.vue";
import DataListVue from "./DataList.vue";
export default {
  name: "station",
  data() {
    return {
      loading: true,
      isHandle: true,
      isSelection: true,
      isIndex: true,
      // 表格
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
    TableListVue,
    ListFunctionVue,
    DataListVue,
  },
  mounted() {
    this.handleData()
    this.$bus.$on("isPagination", (isPagination) => {
      this.isPagination = !isPagination;
      console.log(this.isPagination);
    });
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
  methods: {
    handleData() {
      this.loading = true
      this.$axios("http://47.98.181.209:9090/station").then((response) => {
        this.rawData = response.data[0];
        this.tableData = response.data[0];
        console.log("this.tableData", this.tableData);
        this.tableCols = response.data[1];
        console.log("this.tableCols", this.tableCols);
        this.loading = false
      });
    },
    handleSearch(searchName, val) {
      //字符串模糊查询，数字精确查询
      let newData = [];
      if (val != "") {
        if (typeof this.rawData[0][searchName] === "string") {
          this.rawData.forEach((e) => {
            if (e[searchName].indexOf(val) !== -1) {
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
    this.handleData()
  },
};
</script>

<style>
.stationMain {
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