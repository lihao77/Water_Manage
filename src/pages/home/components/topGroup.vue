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
          <div class="card-panel" @click="handleSetLineChartData('number')">
            <div
              class="card-panel-icon-wrapper icon-peoples"
              :style="{ marginTop: fontSize * 0.2 - 4 + 'px' }"
            >
              <svg-icon
                icon-class="peoples"
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
                注册人数
              </div>
              <count-to
                :start-val="0"
                :end-val="topData.number"
                :duration="2600"
                class="card-panel-num"
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
          <div class="card-panel" @click="handleSetLineChartData('activeNum')">
            <div
              class="card-panel-icon-wrapper icon-people"
              :style="{ marginTop: fontSize * 0.2 - 4 + 'px' }"
            >
              <svg-icon
                icon-class="people"
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
                日活跃数
              </div>
              <count-to
                :start-val="0"
                :end-val="topData.activeNum"
                :duration="2600"
                class="card-panel-num"
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
          <div class="card-panel" @click="handleSetLineChartData('warn')">
            <div
              class="card-panel-icon-wrapper icon-message"
              :style="{ marginTop: fontSize * 0.2 - 4 + 'px' }"
            >
              <svg-icon
                icon-class="message"
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
                预警信息
              </div>
              <count-to
                :start-val="0"
                :end-val="topData.warn"
                :duration="2600"
                class="card-panel-num"
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
    return {
      /* number:0,
      activeNum:0, */
    };
  },
  props: {
    topData: { type: Object, require: true },
    fontSize: { type: Number, default: 36 },
  },
  //方法集合
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  mounted() {
    /* this.$axios("http://47.98.181.209:9090/number").then((res) => {
      this.number = Number(res.data);
    });
    this.$axios("http://47.98.181.209:9090/active").then((res) => {
      this.activeNum = Number(res.data) ;
    });  */
  },
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

    .icon-peoples {
      background: #40c9c6;
    }

    .icon-people {
      background: #f7a036;
    }

    .icon-message {
      background: #cc4125;
    }

    .icon-money {
      background: #f4516c;
    }

    .icon-shopping {
      background: #34bfa3;
    }
  }

  .icon-peoples {
    color: #40c9c6;
  }

  .icon-people {
    color: #f7a036;
  }

  .icon-message {
    color: #cc4125;
  }

  .icon-money {
    color: #f4516c;
  }

  .icon-shopping {
    color: #34bfa3;
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
@media (max-width: 700px) {
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