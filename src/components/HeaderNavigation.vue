
<template>
  <div style="height: calc(100vh-100px)">
    <el-menu
      :default-active="activeNav"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/map">
        <i class="el-icon-menu"></i>
        <span slot="title">地图</span>
      </el-menu-item>
      <el-submenu index="/foundationData">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>基础数据</span>
        </template>
        <el-menu-item index="/foundationData/water">七日水情展示</el-menu-item>
        <el-menu-item index="/foundationData/station">测站表格展示</el-menu-item>
        <el-menu-item index="/foundationData/section">断面表格展示</el-menu-item>
      </el-submenu>
      <el-menu-item index="/2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="/3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="/4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
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
  },
};
</script>