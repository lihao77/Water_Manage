<template>
  <li>
    <label>{{ MyItemName }}</label>
    <input type="checkbox" name="layerName" v-model="isVisible" />
  </li>
</template>

<script>
export default {
  data() {
    return {
      MyItem: this.item,
      MyItemName: "",
      isVisible: false,
    };
  },

  props: ["item"],

  methods: {
    initItemInfo() {
      console.log("这里是item",this.MyItem);
      this.MyItemName = this.MyItem.get("title");
      //console.log()
      this.isVisible = this.MyItem.getVisible();
    },
  },

  watch: {
    isVisible(val) {
      //console.log("这里执行了");
      this.MyItem.setVisible(val);
    },
  },

  mounted() {
    //console.log("LayersControlItem组件的mounted被调用了");
    this.initItemInfo();
    this.$bus.$on("subitem2", (val) => {
      console.log("我是item 我收到消息了");
      if (val.get("name") === this.MyItemName) {
        this.MyItem = val;
        //this.MyItemName = this.MyItem.get("name");
        this.isVisible = this.MyItem.getVisible();
      }
    });
  },

  updated() {
    console.log("LayersControlItem组件的updata被调用了");
  },

  beforeDestroy() {
    this.$bus.$off("subitem2");
  },
};
</script>

<style scoped>
li {
  list-style: none;
  margin: 5px 10px;
  font-family: simsun;
}
label {
  font-size: 15px;
}
input {
  position: absolute;
  right: 7px;
}
</style>