<template>
  <div class="mainNavTab" ref="mainNavTab">
    <div ref="divtab">
      <el-tabs
        @tab-remove="removeTab"
        @tab-click="tabClick"
        :value="activeTab"
        style="padding-bottom: 10px; width: 100%; display: inline-block"
      >
        <el-tab-pane
          v-for="item in tabsItem"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="item.closable"
          :ref="item.ref"
        >
          <BreadcrumbVue style="margin-left: 10px" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div
      style="
        width: 70px;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
      "
      v-if="isShow"
    >
      <div
        class="user"
        style="margin-right: 0; display: flex; justify-content: space-evenly"
      >
        <span style="padding-right: 5px; height: 50px"
          ><i
            @click="openDrawer"
            class="el-icon-s-operation"
            style="cursor: pointer; font-size: 20px; padding-top: 15px"
          ></i
        ></span>
        <div
          style="
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;
          "
        >
          <div>
            <el-dropdown trigger="click" @command="handleCommand">
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                style="cursor: pointer;"
              ></el-avatar>
              <!-- <span
                style="font-size: 15px; cursor: pointer; white-space: nowrap"
              >
                <i class="el-icon-message-solid"></i>
                {{ name }}
              </span> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item command="quit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbVue from "./Breadcrumb.vue";

import elementResizeDetectorMaker from "element-resize-detector";

const elementResize = elementResizeDetectorMaker({
  strategy: "scroll", // <- 推荐监听滚动，提升性能
  callOnAdd: true, // 添加侦听器时是否应调用,默认true
});
export default {
  props: {
    isShow: { type: Boolean, default: false },
    name: { type: String, require: true },
  },
  components: {
    BreadcrumbVue,
  },
  data() {
    return {
      // 被激活的连接地址
      //activePath: "",
      activeTab: "1", //默认显示的tab的name属性
      tabIndex: 1, //tab目前显示数
      tabsItem: [
        {
          title: "首页",
          name: "1",
          closable: false,
          ref: "tabs",
          content: "Home",
        },
      ],
      tabsPath: [
        {
          name: "1",
          path: "/home",
        },
      ],
      tabWidth: null,
    };
  },
  mounted() {
    elementResize.listenTo(this.$refs.mainNavTab, (element) => {
      if (this.isShow) {
        this.$refs.divtab.style.width = element.offsetWidth - 70 + "px";
      } else {
        this.$refs.divtab.style.width = element.offsetWidth + "px";
      }
      console.log(this.$refs.divtab.offsetWidth);
    });
    if (this.$route.path != "/home") {
      //获得路由元数据的name和组件名
      const path = this.$route.path;
      const thisName = this.$route.meta.name;
      const thisComp = this.$route.meta.comp;
      //对tabs的当前激活下标和tabs数量进行自加
      let newActiveIndex = ++this.tabIndex + "";
      //动态双向追加tabs
      this.tabsItem.push({
        title: thisName,
        name: String(newActiveIndex),
        closable: true,
        ref: "tabs",
        content: thisComp,
      });
      this.$store.state.RouterKeepAlive.keepAlive.push(thisComp);
      this.activeTab = newActiveIndex;
      if (this.tabsPath.indexOf(path) == -1) {
        this.tabsPath.push({
          name: newActiveIndex,
          path: path,
        });
      }
    }
    this.$bus.$on("closeTab", (title) => {
      var tabs = this.tabsItem;
      var name = ''
      for(var i=1;i<tabs.length;i++){
        if(tabs[i].title = title){
          name = tabs[i].name
          break
        }
      }
      this.removeTab(name);
    });
  },
  methods: {
    openDrawer() {
      this.$bus.$emit("openDrawer");
    },
    handleCommand(command) {
      if (command == "quit") {
        this.$router.push({ path: "/login" });
      }
    },
    removeTab(targetName) {
      //删除Tab
      console.log(targetName, this.tabIndex, this.tabsItem);
      let tabs = this.tabsItem; //当前显示的tab数组
      let activeName = this.activeTab; //点前活跃的tab
      let thisTab;
      //如果当前tab正活跃 被删除时执行
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.tabClick(nextTab);
            }
          }
        });
      }
      tabs.forEach((tab, index) => {
        console.log(tab);
        if (tab.name === targetName) {
          thisTab = tab;
        }
      });
      //console.log(thisTab);
      this.$store.state.RouterKeepAlive.keepAlive =
        this.$store.state.RouterKeepAlive.keepAlive.filter(
          (item) => item !== thisTab.content
        );
      this.activeTab = activeName;

      this.tabsItem = tabs.filter((tab) => tab.name !== targetName);
      //在tabsPath中删除当前被删除tab的path
      this.tabsPath = this.tabsPath.filter((item) => item.name !== targetName);
    },
    tabClick(thisTab) {
      /*
       * thisTab:当前选中的tabs的实例
       * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
       * */
      let val = this.tabsPath.filter((item) => thisTab.name == item.name);
      //if (val[0].name != this.activeTab) {
      this.$router.push({
        path: val[0].path,
      });
      //}
    },
  },
  watch: {
    $route: function (to) {
      console.log("我在MainNavTab里,监视$route", to);
      //监听路由的变化，动态生成tabs
      let flag = true; //判断是否需要新增页面
      const path = to.path;
      if (Object.keys(to.meta).length != 0) {
        for (let i = 0; i < this.$refs.tabs.length; i++) {
          //if (i != 0) {
          //首页不判断 如果页面已存在，则直接定位当页面，否则新增tab页面
          if (this.$refs.tabs[i].label == to.meta.name) {
            this.activeTab = this.$refs.tabs[i].name; //定位到已打开页面
            flag = false;
            break;
          }
          //}
        }
        //新增页面
        if (flag) {
          //获得路由元数据的name和组件名
          const thisName = to.meta.name;
          const thisComp = to.meta.comp;
          //对tabs的当前激活下标和tabs数量进行自加
          let newActiveIndex = ++this.tabIndex + "";
          //动态双向追加tabs
          this.tabsItem.push({
            title: thisName,
            name: String(newActiveIndex),
            closable: true,
            ref: "tabs",
            content: thisComp,
          });
          this.$store.state.RouterKeepAlive.keepAlive.push(thisComp);
          this.activeTab = newActiveIndex;
          /*
           * 当添加tabs的时候，把当前tabs的name作为key，path作为value存入tabsPath数组中
           * key:tabs的name
           * value:tabs的path
           * {
           *   key: name,
           *   value: path
           * }
           * ///后面需要得到当前tabs的时候可以通过当前tabs的name获得path
           * */
          if (this.tabsPath.indexOf(path) == -1) {
            this.tabsPath.push({
              name: newActiveIndex,
              path: path,
            });
          }
        }
      }
    },
  },
};
</script>
<style lang="scss">
.el-scrollbar {
    > .el-scrollbar__bar {
        opacity: 1 !important;
    }
}
.mainNavTab {
  height: 78px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>