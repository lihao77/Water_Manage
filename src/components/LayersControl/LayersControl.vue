<template>
  <div id="layerControl" class="layerControl" :style="{top:top}">
    <div class="title"><label>图层列表</label></div>
    <LayersControlItemVue
      v-for="(item, index) in layeritems"
      :key="index"
      :item="item"
    />
  </div>
</template>

<script>
import LayersControlItemVue from "./LayersControlItem.vue";
import "ol/ol.css";

//import Image from "ol/layer/Image";
export default {
  data() {
    return {
      layeritems: [],
      end:null,
    };
  },

  components: {
    LayersControlItemVue,
  },
  props: ["layers","top","start","stop"],

  methods: {
    //循环取出layers里的item存储到layeritems里面
    initLayerTreeInfo() {
      // var layeritems = new Array();
      if(this.stop == 99){
        this.end = this.layers.getLength()
        console.log(this.end)
      }
      else{
        this.end = this.stop
      }
      console.log(this.layers.getLength());

      for (var i = this.start; i < this.end; i++) {
        console.log(this.layers.item(i))
        this.layeritems[i-this.start] = this.layers.item(i);
      }
    },
  },

  beforeMount() {
    this.initLayerTreeInfo();
    console.log("这里是LayersControl",this.layeritems);
  },

  
};
</script>

<style scoped>
.layerControl {
  position: absolute;
  /* bottom: 5px; */
  min-width: 170px;
  /* max-height: 200px; */
  right: 0px;
  /* top: 5px; */
  z-index: 2001;
  color: #ffffff;
  background-color: #4c4e5a;
  border-width: 10px;
  border-radius: 10px;
  /* border-color: #000#000#000#000; */
}
.layerControl .title {
  font-weight: bold;
  font-size: 15px;
  margin: 10px;
}
</style>