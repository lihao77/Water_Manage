<!--  -->
<template>
  <div class="admin" id="admin">
    <div class="computer-admin hidden-xs-only">
      <el-row type="flex" justify="space-evenly" style="height: 45% ">
        <el-col style="width: 31%"
          ><el-card
            class="box-card"
            style="height: 100%; width: 100%"
            :body-style="{ height: 'calc(100% - 20px)', padding: '10px 5px' }"
          >
            <div slot="header" class="clearfix">
              <span>批准管理员(待开发中)</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >>>></el-button
              >
            </div>
            <el-scrollbar style="height: calc(100% - 34px)">
              <el-collapse
                style="margin-right: 30px"
              >
                <el-collapse-item title="功能" name="2">
                  <div>这里可以批准新成员加入我们。</div>
                </el-collapse-item>
                <el-collapse-item title="权限" name="1">
                  <div>成为管理员后您可以在这里批准新成员加入我们。</div>
                  <div>以及帮助我们管理钱塘江设置数据。</div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-card>
        </el-col>
        <el-col style="width: 31%"
          ><el-card
            class="box-card"
            style="height: 100%; width: 100%"
            :body-style="{ height: 'calc(100% - 20px)', padding: '10px 5px' }"
          >
            <div slot="header" class="clearfix">
              <span>发布公告(待开发中)</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >>>></el-button
              >
            </div>
            <el-scrollbar style="height: calc(100% - 34px)">
              <el-collapse style="margin-right: 30px">
                <el-collapse-item title="功能" name="1">
                  <div>
                    这里可以发布和修改我们的公告。方便我们管理系统的用户适应系统
                  </div>
                </el-collapse-item>
                <el-collapse-item title="操作" name="2">
                  <div>
                    提交文档至数据库，该文件将会被同步更新值首页公告中。同样也可以修改和删除数据库里的公告。
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-card>
        </el-col>
        <el-col style="width: 31%"
          ><el-card
            class="box-card"
            style="height: 100%; width: 100%"
            :body-style="{ height: 'calc(100% - 20px)', padding: '10px 5px' }"
          >
            <div slot="header" class="clearfix">
              <span>添加数据项</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="$router.push({ path: '/addItem' })"
              >
                >>>
              </el-button>
            </div>
            <el-scrollbar style="height: calc(100% - 34px)">
              <el-collapse style="margin-right: 30px">
                <el-collapse-item title="功能" name="2">
                  <div>这里可以批准新成员加入我们。</div>
                </el-collapse-item>
                <el-collapse-item title="操作" name="1">
                  <div>
                    以表单的方式提交添加的数据项，请务必填写尽可能详实、准确的水质数据。
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-evenly" style=" height: 45% ">
        <el-col style="width: 31%">
          <el-card
            class="box-card"
            style="height: 100%; width: 100%"
            :body-style="{ height: 'calc(100% - 20px)', padding: '10px 5px' }"
          >
            <div slot="header" class="clearfix">
              <span>修改数据项</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="$router.push({ path: '/changeData' })"
                >>>></el-button
              >
            </div>
            <el-scrollbar style="height: calc(100% - 34px)">
              <el-collapse style="margin-right: 30px">
                <el-collapse-item title="功能" name="2">
                  <div>这里可以批准新成员加入我们。</div>
                </el-collapse-item>
                <el-collapse-item title="操作" name="1">
                  <div>成为管理员后您可以在这里批准新成员加入我们。</div>
                  <div>以及帮助我们管理钱塘江设置数据。</div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-card>
        </el-col>
        <el-col style="width: 31%">
          <el-card
            class="box-card"
            style="height: 100%; width: 100%"
            :body-style="{ height: 'calc(100% - 20px)', padding: '10px 5px' }"
          >
            <div slot="header" class="clearfix">
              <span>测站管理</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="$router.push({ path: '/stationManage' })"
                >>>></el-button
              >
            </div>
            <el-scrollbar style="height: calc(100% - 34px)">
              <el-collapse style="margin-right: 30px">
                <el-collapse-item title="功能" name="2">
                  <div>这里可以批准新成员加入我们。</div>
                </el-collapse-item>
                <el-collapse-item title="操作" name="1">
                  <div>成为管理员后您可以在这里批准新成员加入我们。</div>
                  <div>以及帮助我们管理钱塘江设置数据。</div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-card>
        </el-col>
        <el-col style="width: 31%">
          <el-card
            class="box-card"
            style="height: 100%; width: 100%"
            :body-style="{ height: 'calc(100% - 20px)', padding: '10px 5px' }"
          >
            <div slot="header" class="clearfix">
              <span>断面管理</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="$router.push({ path: '/sectionManage' })"
                >>>></el-button
              >
            </div>
            <el-scrollbar style="height: calc(100% - 34px)">
              <el-collapse style="margin-right: 30px">
                <el-collapse-item title="功能" name="2">
                  <div>这里可以批准新成员加入我们。</div>
                </el-collapse-item>
                <el-collapse-item title="操作" name="1">
                  <div>成为管理员后您可以在这里批准新成员加入我们。</div>
                  <div>以及帮助我们管理钱塘江设置数据。</div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="mobile-admin hidden-sm-and-up">
      <el-scrollbar style="height: 100%">
        <div style="width: 90%">
          <div class="cardTitle" style="padding: 10px">
            批准管理员(待开发中)
            <el-button style="float: right; padding: 3px 0" type="text"
              >更多 <i class="el-icon-arrow-right"></i
            ></el-button>
          </div>

          <el-card class="box-card" :body-style="{ padding: '0 10px' }">
            <el-collapse>
              <el-collapse-item title="功能" name="1">
                <div>这里可以批准新成员加入我们。</div>
              </el-collapse-item>
              <el-collapse-item title="权限" name="2">
                <div>成为管理员后您可以在这里批准新成员加入我们。</div>
                <div>以及帮助我们管理钱塘江设置数据。</div>
              </el-collapse-item>
            </el-collapse>
          </el-card>

          <div class="cardTitle">
            发布公告(待开发中)
            <el-button style="float: right; padding: 3px 0" type="text"
              >更多 <i class="el-icon-arrow-right"></i
            ></el-button>
          </div>

          <el-card
            class="box-card"
            style="width: 100%; border-radius: 1em"
            :body-style="{ padding: '10px 5px' }"
          >
            <el-collapse>
              <el-collapse-item title="功能" name="1">
                <div>
                  这里可以发布和修改我们的公告。方便我们管理系统的用户适应系统
                </div>
              </el-collapse-item>
              <el-collapse-item title="操作" name="2">
                <div>
                  提交文档至数据库，该文件将会被同步更新至首页公告中。同样也可以修改和删除数据库里的公告。
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>

          <div class="cardTitle">
            添加数据项
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="$router.push({ path: '/addItem' })"
              >更多 <i class="el-icon-arrow-right"></i
            ></el-button>
          </div>

          <el-card
            class="box-card"
            style="width: 100%; border-radius: 1em"
            :body-style="{ padding: '10px 5px' }"
          >
            <el-collapse>
              <el-collapse-item title="功能" name="1">
                <div>
                  这里可以发布和修改我们的公告。方便我们管理系统的用户适应系统
                </div>
              </el-collapse-item>
              <el-collapse-item title="操作" name="2">
                <div>
                  提交文档至数据库，该文件将会被同步更新至首页公告中。同样也可以修改和删除数据库里的公告。
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>

          <div class="cardTitle">
            修改数据项
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="$router.push({ path: '/changeData' })"
              >更多 <i class="el-icon-arrow-right"></i
            ></el-button>
          </div>

          <el-card
            class="box-card"
            style="width: 100%; border-radius: 1em"
            :body-style="{ padding: '10px 5px' }"
          >
            <el-collapse>
              <el-collapse-item title="功能" name="1">
                <div>
                  这里可以发布和修改我们的公告。方便我们管理系统的用户适应系统
                </div>
              </el-collapse-item>
              <el-collapse-item title="操作" name="2">
                <div>
                  提交文档至数据库，该文件将会被同步更新至首页公告中。同样也可以修改和删除数据库里的公告。
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>

          <div class="cardTitle">
            测站管理
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="$router.push({ path: '/stationManage' })"
              >更多 <i class="el-icon-arrow-right"></i
            ></el-button>
          </div>

          <el-card
            class="box-card"
            style="width: 100%; border-radius: 1em"
            :body-style="{ padding: '10px 5px' }"
          >
            <el-collapse>
              <el-collapse-item title="功能" name="1">
                <div>
                  这里可以发布和修改我们的公告。方便我们管理系统的用户适应系统
                </div>
              </el-collapse-item>
              <el-collapse-item title="操作" name="2">
                <div>
                  提交文档至数据库，该文件将会被同步更新至首页公告中。同样也可以修改和删除数据库里的公告。
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>

          <div class="cardTitle">
            断面名称
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="$router.push({ path: '/sectionManage' })"
              >更多 <i class="el-icon-arrow-right"></i
            ></el-button>
          </div>

          <el-card
            class="box-card"
            style="width: 100%; border-radius: 1em"
            :body-style="{ padding: '10px 5px' }"
          >
            <el-collapse>
              <el-collapse-item title="功能" name="1">
                <div>
                  这里可以发布和修改我们的公告。方便我们管理系统的用户适应系统
                </div>
              </el-collapse-item>
              <el-collapse-item title="操作" name="2">
                <div>
                  提交文档至数据库，该文件将会被同步更新至首页公告中。同样也可以修改和删除数据库里的公告。
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
/* import elementResizeDetectorMaker from "element-resize-detector";
const elementResize = elementResizeDetectorMaker({
  strategy: "scroll", // <- 推荐监听滚动，提升性能
  callOnAdd: true, // 添加侦听器时是否应调用,默认true
}); */
export default {
  name: "admin",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      activeNames: ["1"],
      height: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    addItem() {
      this.$router.push({ path: "/addItem" });
    },
    handleChange(val) {
      console.log(val);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    /* elementResize.listenTo(document.getElementById("admin"), (element) => {
      if (document.body.offsetWidth > 768) {
        this.height = "45%";
      } else {
        this.height = "30%";
      }
      console.log(this.height == "30%");
    }); */
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
<style lang="scss" >
.admin {
  height: 100%;
  .el-scrollbar__wrap {
    overflow: scroll;
    width: 111.1%;
  }
  .computer-admin {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
  }
  .mobile-admin {
    height: 100%;
    .cardTitle {
      padding: 30px 10px 10px;
      font-size: 17px;
      font-weight: 600;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .el-card {
    border-radius: 1em;
  }
  .el-card__header {
    padding: 20px 10px;
  }
}
.el-collapse-item__header,
.el-collapse-item__wrap {
  background-color: unset;
}
</style>