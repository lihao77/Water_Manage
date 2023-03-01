<!-- 网页的抬头部分 -->
<template>
  <div style="display: flex; position: relative">
    <div class="HeadTitle" ref="HeadTitle">
      <h1 class="MainTitle" ref="MainTitle">{{ myTitle }}</h1>
    </div>
    <span style="padding-left: 5px; height: 50px"
      ><i
        @click="changeMode"
        class="el-icon-s-operation"
        style="cursor: pointer; font-size: 20px; padding-top: 15px"
      ></i
    ></span>
    <div class="user">
      <div
        style="
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
        "
      >
        <el-dropdown
          @command="handleCommand"
          style="height: 50px; padding-right: 10px"
        >
          <span style="font-size: 15px; cursor: pointer; white-space: nowrap">
            <i class="el-icon-message-solid"></i>
            {{name}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item command="quit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-avatar
        :size="50"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props:{name:{type:String,require:true}},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      myTitle: "钱塘江水质监测管理系统",
      headTitleHeight: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    /* screenWidth: function (val) {
      //监听屏幕宽度变化
      
    }, */
    /* headTitleHeight: function () {
      //监听屏幕高度变化
      this.$refs.MainTitle.style.fontSize =
        this.$refs.HeadTitle.offsetHeight * 0.5 + "px";
      console.log("h1字体已自适应");
    }, */
  },
  //方法集合
  methods: {
    handleCommand(command) {
      if (command == "quit") {
        this.$router.push({ path: "/login" });
      }
    },
    changeMode() {
        this.$bus.$emit("changeMode");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    /* this.$refs.MainTitle.style.fontSize =
      this.$refs.HeadTitle.offsetHeight * 0.5 + "px";
    console.log("h1字体已自适应");
    var _this = this;
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      //_this.screenWidth = document.documentElement.clientWidth; //窗口宽度
      //_this.screenHeight = document.documentElement.clientHeight; //窗口高度 
      if (_this.headTitleHeight != _this.$refs.HeadTitle.offsetHeight) {
        _this.headTitleHeight = _this.$refs.HeadTitle.offsetHeight;
      }
    }; */
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
/* @import url(); 引入公共css类 */
/* span{
    width: 100px;
    height: 100px;
} */
.HeadTitle {
  height: 50px;
  display: flex;
  padding: 0 15px 0 20px;
}

.user {
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  flex: 1;
  height: 50px;
}
.MainTitle {
  color: rgb(6, 7, 7);
  margin: auto 0;
  line-height: 100%;
  font-size: 25px;
  float: left;
}
</style>