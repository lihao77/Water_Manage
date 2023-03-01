<template>
  <div class="changeData" style="height: 100%">
    <el-dialog
      custom-class="el-dialog-deleteData"
      append-to-body
      title="警告"
      :visible.sync="deleteDialogVisible"
      center
    >
      <span>是否确认删除ID号为{{ deleteID }}</span>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteID(deleteID)">确 定</el-button>
      </span> -->
      <div class="buttonRow" slot="footer">
        <el-row type="flex" :span="24" justify="space-around">
          <el-col :xs="24" :span="12">
            <el-row>
              <el-col :span="24">
                <el-button
                  style="width: 100%"
                  @click="deleteDialogVisible = false"
                  >取消</el-button
                >
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-button
                  style="width: 100%"
                  type="danger"
                  @click="deleteData(deleteID)"
                  >删除</el-button
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog
      custom-class="el-dialog-changeData"
      append-to-body
      :title="'修改'"
      :visible.sync="dialogFormVisible"
    >
      <el-scrollbar
        class="changeDataForm"
        style="height: calc(100%); overflow-x: hidden"
      >
        <el-form
          ref="changeDataForm"
          :model="changeDataForm"
          
          style="width: 100%; line-height: 40px"
        >
          <el-form-item label="ID" prop="ID">
            <el-input
              disabled
              style="width: 100%; "
              v-model="changeDataForm.ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="断面名称" prop="SectionName">
            <el-input
              disabled
              style="width: 100%; "
              v-model="changeDataForm.SectionName"
            ></el-input>
          </el-form-item>
          <el-form-item label="Date" prop="timestamp">
            <el-date-picker
              disabled
              v-model="changeDataForm.time1"
              type="date"
              placeholder="Please pick a date"
              style="width: 100%; "
            />
          </el-form-item>
          <div style="display: flex; flex-wrap: wrap; flex-direction: row;justify-content:space-between;">
            <el-form-item
              v-for="(item, index) in featureData"
              :key="index"
              :label="item.label"
            >
              <el-input
                style="width: 100%"
                v-model="changeDataForm[item.prop]"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item size="large" label-width="0">
            <div class="buttonRow">
              <el-row type="flex" :span="24" justify="space-around">
                <el-col :xs="24" :span="9">
                  <el-row>
                    <el-col :span="24">
                      <el-button
                        style="width: 100%"
                        @click="dialogFormVisible = false"
                        >取消</el-button
                      >
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-button
                        style="width: 100%"
                        type="primary"
                        @click="changeData"
                        >立即修改</el-button
                      >
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-dialog>
    <div class="changeDataTable">
      <section class="sectionHandle">
        <ListFunctionVue
        :isRight="isRight"
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
  </div>
</template>

<script>
import ListFunctionVue from "@/components/ListFunction.vue";
import DataListVue from "@/components/DataList.vue";
export default {
  name: "changeData",
  data() {
    return {
      deleteDialogVisible: false,
      deleteID: "",
      loading: true,
      changeDataForm: {
        ID: null,
        time1: null,
        SectionName: null,
      },
      featureData: [],
      dialogFormVisible: false,
      isHandle: true,
      isSelection: false,
      isIndex: true,
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
    isRight() {
      if (this.tableCols[this.tableCols.length-1].fixed == null) {
        this.tableCols[this.tableCols.length-1].fixed = "right";
        this.$message({
          message: '切换成功',
          type: 'success',
          duration: 1000,
        });
      } else {
        this.tableCols[this.tableCols.length-1].fixed = null;
        this.$message({
          message: '切换成功',
          type: 'success',
          duration: 1000,
        });
      }
    },
    deleteData() {
      this.$axios({
        url: "http://47.98.181.209:9090/delete_data",
        params: { ID: this.deleteID },
      }).then((res) => {
        if (res.data.code == 1) {
          this.rawData = this.rawData.filter((e) => {
            return e.ID != this.deleteID;
          });
          this.tableData = this.tableData.filter((e) => {
            return e.ID != this.deleteID;
          });

          this.$message({ message: res.data.message, type: "success" });
          this.deleteDialogVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    changeData() {
      this.$axios({
        url: "http://47.98.181.209:9090/update",
        params: this.changeDataForm,
      }).then((res) => {
        if (res.data.code == 1) {
          this.$message({ message: res.data.message, type: "success" });
          this.changeDataDialogVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    rowColors({ row, rowIndex }) {
      if (row.id == 1) {
        return "warning-row";
      } else if (row.id == 2) {
        return "success-row";
      }
      console.log("rowrowrowrowrow", row);
      return "";
    },
    handleFormData(stationVal, dateValue) {
      console.log(stationVal, dateValue);
      this.loading = true;
      this.$axios({
        url: "http://47.98.181.209:9090/form",
        params: { stationVal: stationVal, dateValue: dateValue },
      }).then((res) => {
        this.rawData = res.data[0];
        this.tableData = res.data[0];
        console.log("this.tableData", this.tableData);
        this.tableCols = res.data[1];
        this.tableCols.forEach((e) => {
          if (e.prop != "ID" && e.prop != "time1" && e.prop != "SectionName") {
            this.$set(this.changeDataForm, e.prop, "");
          }
        });
        this.featureData = this.tableCols.filter((e) => {
          return e.prop != "ID" && e.prop != "time1" && e.prop != "SectionName";
        });
        this.tableCols.push({
          label: "操作",
          type: "Button",
          fixed: "right",
          width: 180,
          align: "center",
          btnList: [
            {
              label: "编辑",
              type: "primary",
              icon: "el-icon-edit",
              size: "mini",
              isShow: false,
              handle: (row) => {
                this.dialogFormVisible = true;
                console.log(row);
                this.changeDataForm = row;
              },
            },
            {
              label: "删除",
              type: "danger",
              size: "mini",
              isShow: false,
              handle: (row) => {
                this.deleteID = row.ID;
                this.deleteDialogVisible = true;
              },
            },
          ],
        });
        console.log("this.tableCols", this.tableCols);
        this.loading = false;
      });
    },
    handleSearch(searchName, val) {
      //字符串模糊查询，数字精确查询
      console.log(searchName, val);
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

<style lang="scss">
.buttonRow .el-row {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}
.changeData {
  .el-form-item__label {
    line-height: 40px;
  }
}
.changeDataForm .el-form-item__label {
  line-height: 40px;
}

.el-dialog-changeData {
  z-index: 11;
  width: 70%;
  padding: 10px;
}
el-dialog-deleteData {
  z-index: 12;
  width: 70%;
}
.changeDataTable {
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