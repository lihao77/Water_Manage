<!--  -->
<template>
  <el-row type="flex" style="height: 50%">
    <el-col :span="7" style="height: 100%">
      <div class="columnCenter">
        <el-card
          class="box-card"
          :body-style="{ padding: 0, height: '100%' }"
          style="height: 80%; border: 0"
        >
          <div class="card-panel" @click="handleSetLineChartData('DOx')">
            <div
              class="card-panel-icon-wrapper icon-DOx"
              :style="{ marginTop: fontSize * 0.2 - 4 + 'px' }"
            >
              <svg-icon
                icon-class="DOx"
                class-name="card-panel-icon"
                :style="{ fontSize: fontSize * 0.6 - 14 + 'px' }"
              />
            </div>
            <div
              class="card-panel-description"
              :style="{ marginTop: fontSize * 0.2 + 'px' }"
            >
              <div
                class="card-panel-text"
                :style="{
                  fontSize: fontSize * 0.2 + 'px',
                  lineHeight: fontSize * 0.2 + 2 + 'px',
                  marginBottom: fontSize * 0.2 - 4 + 'px',
                }"
              >
                溶解氧
              </div>
              <count-to
                :start-val="0"
                :end-val="downData.DOx"
                :duration="2600"
                class="card-panel-num"
                :decimals="2"
                :style="{
                  fontSize: fontSize * 0.2 + 'px',
                  lineHeight: fontSize * 0.2 + 2 + 'px',
                }"
              />
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="7" style="height: 100%">
      <div class="columnCenter">
        <el-card
          class="box-card"
          :body-style="{ padding: 0, height: '100%' }"
          shadow="hover"
          style="
            height: 80%;
            border: 0;
            background-color: rgba(255, 255, 255, 0.4);
          "
        >
          <div class="card-panel" @click="handleSetLineChartData('COD')">
            <div
              class="card-panel-icon-wrapper icon-COD"
              :style="{ marginTop: fontSize * 0.2 - 4 + 'px' }"
            >
              <svg-icon
                icon-class="COD"
                class-name="card-panel-icon"
                :style="{ fontSize: fontSize * 0.6 - 14 + 'px' }"
              />
            </div>
            <div
              class="card-panel-description"
              :style="{ marginTop: fontSize * 0.2 + 'px' }"
            >
              <div
                class="card-panel-text"
                :style="{
                  fontSize: fontSize * 0.2 + 'px',
                  lineHeight: fontSize * 0.2 + 2 + 'px',
                  marginBottom: fontSize * 0.2 - 4 + 'px',
                }"
              >
                化学需氧量
              </div>
              <count-to
                :start-val="0"
                :end-val="downData.COD"
                :duration="2600"
                class="card-panel-num"
                :decimals="2"
                :style="{
                  fontSize: fontSize * 0.2 + 'px',
                  lineHeight: fontSize * 0.2 + 2 + 'px',
                }"
              />
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="7" style="height: 100%">
      <div class="columnCenter">
        <el-card
          class="box-card"
          :body-style="{ padding: 0, height: '100%' }"
          style="height: 80%; border: 0"
        >
          <div class="card-panel" @click="handleSetLineChartData('BOD5')">
            <div
              class="card-panel-icon-wrapper icon-BOD5"
              :style="{ marginTop: fontSize * 0.2 - 4 + 'px' }"
            >
              <svg-icon
                icon-class="BOD5"
                class-name="card-panel-icon"
                :style="{ fontSize: fontSize * 0.6 - 14 + 'px' }"
              />
            </div>
            <div
              class="card-panel-description"
              :style="{ marginTop: fontSize * 0.2 + 'px' }"
            >
              <div
                class="card-panel-text"
                :style="{
                  fontSize: fontSize * 0.2 + 'px',
                  lineHeight: fontSize * 0.2 + 2 + 'px',
                  marginBottom: fontSize * 0.2 - 4 + 'px',
                }"
              >
                生化需氧量
              </div>
              <count-to
                :start-val="0"
                :end-val="downData.BOD5"
                :duration="2600"
                class="card-panel-num"
                :decimals="2"
                :style="{
                  fontSize: fontSize * 0.2 + 'px',
                  lineHeight: fontSize * 0.2 + 2 + 'px',
                }"
              />
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import CountTo from "vue-count-to";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    CountTo,
  },
  data() {
    //这里存放数据
    return {};
  },
  props: {
    fontSize: { type: Number, default: 36 },
    downData: { type: Object, require: true },
  },
  //方法集合
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  mounted() {},
};
</script>
<style lang="scss" scoped>
.columnCenter {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}
.card-panel {
  height: 100%;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  /* background: #fff; */
  background-color: unset;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);

  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }

    .icon-DOx {
      background: #38a2fe;
    }

    .icon-COD {
      background: #ff689b;
    }

    .icon-BOD5 {
      background: #1a9999;
    }
  }

  .icon-DOx {
    color: #38a2fe;
  }

  .icon-COD {
    color: #ff689b;
  }

  .icon-BOD5 {
    color: #1a9999;
  }

  .card-panel-icon-wrapper {
    float: left;
    margin-left: 7px;
    padding: 10px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }

  .card-panel-icon {
    float: left;
    font-size: 36px;
  }

  .card-panel-description {
    float: right;
    font-weight: bold;
    /* margin: 26px; */
    margin-left: 0px;
    margin-right: 2px;

    .card-panel-text {
      color: rgba(0, 0, 0, 0.45);
    }

    .card-panel-num {
      font-size: 20px;
    }
  }
}
@media (max-width: 800px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;

    height: 100%;
    margin: 0 !important;
    border-radius: 0px !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>