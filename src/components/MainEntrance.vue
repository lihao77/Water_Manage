
<template>
  <div style="height: 100%">
    <el-drawer
      title="导航"
      :visible.sync="drawer"
      :with-header="false"
      :direction="direction"
      size="200px"
    >
      <MainNavigationVue :collapse="false" />
    </el-drawer>

    <el-container class="navContainer">
      <el-aside
        :width="asideWidth + 'px'"
        style="background-color: rgb(238, 241, 246)"
        v-if="isShow"
      >
        <MainNavigationVue :collapse="collapse" />
      </el-aside>

      <el-container style="height: 100%">
        <el-header id="header" v-if="isShow">
          <HeadTitleVue :name="name" />
        </el-header>
        <el-main>
          <MainNavTabVue :isShow="!isShow" :name="name" />

          <div class="viewrouter">
            <el-card
              shadow="always"
              class="mainContent"
              style="
                background-color: unset;
                border: unset ;
                border-radius: 1em;
              "
              :body-style="{ padding: '0px', height: '100%' }"
            >
              <!-- 路由的占位符 -->
              <transition name="fade" mode="out-in">
                <keep-alive :include="keepAliveList">
                  <router-view :key="key"></router-view>
                </keep-alive>
              </transition>
              <!-- <router-view
                v-if="!$route.meta.keepAlive"
                :key="key"
              ></router-view> -->
            </el-card>
          </div>
          <el-footer>footer</el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
//抬头
import HeadTitleVue from "./HeadTitle.vue";
//导航
import MainNavigationVue from "./MainNavigation.vue";
//tab导航
import MainNavTabVue from "./MainNavTab.vue";

import qs from "qs";
import { mapGetters } from "vuex";
import elementResizeDetectorMaker from "element-resize-detector";

const elementResize = elementResizeDetectorMaker({
  strategy: "scroll", // <- 推荐监听滚动，提升性能
  callOnAdd: true, // 添加侦听器时是否应调用,默认true
});
export default {
  components: {
    HeadTitleVue,
    MainNavigationVue,
    MainNavTabVue,
  },
  data() {
    return {
      isShow: true,
      drawer: false,
      direction: "ltr",
      collapse: false,
      asideWidth: "230",
      keepAliveList: this.$store.state.RouterKeepAlive.keepAlive,
    };
  },
  created() {
    var email;
    if (this.$store.state.token.email.substr(0, 1) == '"') {
      email = this.email.slice(1, -1);
    } else {
      email = this.email;
    }
    console.log("emailemailemailemail", this.email);
    this.$axios({
      url: "http://47.98.181.209:9090/person/",
      params: { email: email },
    });
  },
  mounted() {
    console.log("navigator.geolocation",navigator.geolocation)
    elementResize.listenTo(document.body, (element) => {
      if (element.offsetWidth < 992) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    });

    this.$bus.$on("changeMode", () => {
      if (document.body.offsetWidth > 992) {
        if (this.collapse == false) {
          this.collapse = !this.collapse;
          this.$bus.$emit("show");
          this.asideWidth = "64";
        } else {
          this.collapse = !this.collapse;
          this.asideWidth = "230";
        }
        this.$message({
          duration: 800,
          showClose: true,
          message: "菜单切换成功",
          type: "success",
        });
      }
    });
    this.$bus.$on("openDrawer", () => {
      this.drawer = true;
    });
  },
  beforeUpdate() {},
  computed: {
    // 获取缓存列表
    getKeepAliveList() {
      return this.$store.state.RouterKeepAlive.keepAlive;
    },
    key() {
      return this.$route.path;
    },
    ...mapGetters("RouterKeepAlive", ["KeepAlive"]),
    ...mapGetters("token", ["email", "name"]),
  },
  watch: {
    getKeepAliveList(n, o) {
      this.keepAliveList = n;
      console.log(n);
    },
  },
  beforeDestroy() {
    elementResize.uninstall(document.body);
  },
  beforeRouteEnter(to, from, next) {
    if (
      localStorage.getItem("Authorization") === null ||
      localStorage.getItem("Authorization") === ""
    ) {
      next("/login");
    } else {
      next();
    }
  },
};
</script>

<style lang='scss' scoped>

.mainContent {
  height: 100%;
}

.navContainer {
  height: 100vh;
}
.el-main {
  padding: 0px 5px 5px 5px;
}
.el-header {
  background-color: #ffffff00;
  color: #333;
  padding-left: 0;
  line-height: 50px;
  height: 50px !important;
}

.el-aside {
  color: #333;
  background-color: rgb(255, 255, 255) !important;
}

.el-aside {
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -moz-transition: width 0.25s;
  -webkit-transition: width 0.25s;
  -o-transition: width 0.25s;
}
.el-aside::-webkit-scrollbar {
  display: none;
}

.el-footer {
  height: 20px !important;
}

.viewrouter {
  /* background-color: red; */
  height: calc(100% - 98px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>