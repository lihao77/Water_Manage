<template>
  <div style="height: calc(100vh-100px)">
    <el-menu
      :default-active="activeNav"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      :collapse="collapse"
      :collapse-transition = "false"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/map">
        <i class="el-icon-map-location"></i>
        <span slot="title">地图详情</span>
      </el-menu-item>
      <el-submenu index="/foundationData">
        <template slot="title">
          <i class="el-icon-data-analysis"></i>
          <span>基础数据</span>
        </template>
        <!-- <el-menu-item index="/foundationData/water">
          <i class="el-icon-s-data"></i>
          <span>七日水情展示</span>
        </el-menu-item> -->
        <el-menu-item index="/foundationData/station">
          <i class="el-icon-office-building"></i>
          <span>测站表格展示</span>
        </el-menu-item>
        <el-menu-item index="/foundationData/section">
          <i class="el-icon-wallet"></i>
          <span>断面表格展示</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/watchData">
        <template slot="title">
          <i class="el-icon-view"></i>
        <span>水质监测</span>
        </template>
        <!-- <el-menu-item index="/watchData/myWatch">
          <i class="el-icon-s-data"></i>
          <span>我的关注</span>
        </el-menu-item> -->
        <el-menu-item index="/watchData/tableWatch">
          <i class="el-icon-office-building"></i>
          <span>表格监测</span>
        </el-menu-item>
        <!-- <el-menu-item index="/watchData/chartWatch">
          <i class="el-icon-wallet"></i>
          <span>图表展示</span>
        </el-menu-item> -->
      </el-submenu>
      <el-menu-item index="/admin">
        <i class="el-icon-menu"></i>
        <span slot="title">管理系统</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    collapse: { type: Boolean, default: false },
  },

  computed: {
    activeNav() {
      //当前激活的导航
      return this.$route.path;
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /* handleSelect(key, keyPath) {
      var arr = key.split('/');
      console.log(arr)
      this.$router
    }, */
  },
};
</script>
<style>
/* .item {
  margin-top: 10px;
  margin-right: 40px;
} */
</style>