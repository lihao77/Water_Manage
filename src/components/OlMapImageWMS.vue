<template>
  <div id="main">
    <div id="map" class="map" ref="olmap"></div>
    <div ref="popupRef" id="popup" class="popup">
      <el-button
        type="text"
        icon="el-icon-close"
        ref="popupCloserRef"
        class="popupCloser"
        @click="closePopup"
      ></el-button>
      <el-descriptions
        title="该点信息"
        direction="vertical"
        :column="4"
        border
        size="small"
        v-if="featureProps"
      >
        <el-descriptions-item
          v-for="(item, index) in featureProps.lableTips"
          :key="index"
          :label="item.label"
          >{{ featureProps[item.prop] }}</el-descriptions-item
        >
      </el-descriptions>
    </div>
    <MousePositionControlVue :map="map" style="z-index: 50" />
  </div>
</template>

<script>
//导入基本模块
import "ol/ol.css";
import { Map, Overlay } from "ol";
//导入相关模块
//import Image from "ol/layer/Image";
import { baseLayers, mapView } from "../config/mapConfig";

import LayersControlVue from "./LayersControl/LayersControl.vue";
import MousePositionControlVue from "./MousePositionControl.vue";
import popupVue from "./Popup";

import { vectorGeoJson } from "../config/vectorConfig";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      map: null,
      popup: null,
      center: [120, 30],
      popupsLayers: [],
      format: "image/png",
      layers: [],
      view: null,
      source: null,
      vectorlayer_test: null,
      featureProps: undefined, // 所点击要素的属性信息
    };
  },
  computed: {
    ...mapGetters("map", ["layersInMap"]),
  },
  created() {},
  beforeMount() {
    this.view = mapView(this.center);
    this.map = new Map({
      layers: baseLayers(),
      view: this.view,
    }); // 初始化地图
    //添加矢量要素
    this.addVecterLayers();
  },
  mounted() {
    //地图渲染在element-ui上，涉及到displace:none，影响到地图渲染到容器，加一个定时器，变成异步操作
    setTimeout(() => {
      this.map.setTarget("map");
    }, 0);
    //修改地图的中心以及zoom的大小
    this.$bus.$on("centers", (center) => {
      this.view.setCenter(center);
      this.view.setZoom(12);
    });
    this.$bus.$on("show", () => {
      /*
       *可以在这里添加定时器，或者在olmapimageWMS里添加定时器
       *解决的问题是在display:none的情况下网页窗口变化导致ol地图不显示的问题
       */
      setTimeout(() => {
        this.map.updateSize();
        console.log(
          "我在OlMapImageWMS.vue中，tab页更新使用于解决地图不显示问题"
        );
      }, 0);
    });
    this.$bus.$on("locationInfo", (locationInfo) => {
      this.view.setCenter([locationInfo.Lng, locationInfo.Lat]);
      this.locationLayer(locationInfo);
    });
    this.initOverlay(); // 初始化弹框气泡
    this.clickFeature(); // 单击要素
  },
  activated() {
    setTimeout(() => {
      this.map.updateSize();
      console.log("我在OlMapImageWMS.vue中，tab页更新使用于解决地图不显示问题");
    }, 0);
  }, //如果页面有keep-alive缓存功能，这个函数会触发
  watch: {
    layersInMap: {
      // 监听图层参数变化
      handler: function (val) {
        this.setLayers();
      },
      deep: true,
    },
  },
  methods: {
    locationLayer(locationInfo) {
      let labelTips = [];
      locationInfo.coordinates = [locationInfo.Lng, locationInfo.Lat];
      let vectorInfo = [[locationInfo]];
      console.log(locationInfo);
      Object.keys(locationInfo).forEach((key) => {
        const item = { label: "", prop: "" };
        console.log(key);
        switch (key) {
          case "city":
            item.label = "所在城市";
            item.prop = "city";
            break;
          case "Lat":
            item.label = "纬度";
            item.prop = "Lat";
            break;
          case "Lng":
            item.label = "经度";
            item.prop = "Lng";
            break;
          case "province":
            item.label = "所属省份";
            item.prop = "province";
            break;
          case "coordinates":
            item.label = "坐标";
            item.prop = "coordinates";
            break;
        }
        labelTips.push(item);
      });

      vectorInfo.push(labelTips);
      const locationlayer = vectorGeoJson(vectorInfo, "定位", false);
      this.map.addLayer(locationlayer);
    },
    initMap() {},
    // 传递当前地图中的图层至图层选择器
    sentLayersIn() {
      let layersIn = [];
      console.log(this.map.getLayers());
      this.map.getLayers().forEach((layer) => {
        let layerValues = layer.values_;
        // 有标题的图层（传递至选项节点树中）
        if (layerValues.title) {
          let aLayer_ = {
            // default
            title: layerValues.title, // 图层名
            type: layerValues.type ? layerValues.type : "输出图层", // 图层所属类
            disabled: layerValues.source ? false : true, // 是否可选
            selected: false, // 是否已选
            opacity: layerValues.opacity, // 图层透明度
          };
          if (layerValues.title === "高德地图") {
            // 设置默认高德可见
            aLayer_.selected = true;
          }
          layersIn.push(aLayer_);
        }
      });
      console.log("layersIn", layersIn);
      this.$store.commit("map/SET_LAYERSINMAP", layersIn);
    },
    // 设置图层visible,opacity
    setLayers() {
      let _this = this;
      this.map.getLayers().forEach((layer) => {
        let layerValues = layer.values_;
        // 设置图层可视性和透明度
        let title_ = layerValues.title;
        console.log("title_", title_);
        //让定位图层不受图层控制器影响
        if (title_ && title_ != "定位") {
          let alayer = _this.layersInMap.filter((i) => i.title === title_);
          if (alayer.length) {
            layer.setVisible(alayer[0].selected);
            layer.setOpacity(parseFloat(alayer[0].opacity));
          } else {
            layer.setVisible(false);
          }
        }
      });
    },
    //添加矢量图层
    async addVecterLayers() {
      await this.$axios("http://47.98.181.209:9090/stationpoint").then(
        (res) => {
          const stationlayer = vectorGeoJson(res.data, "测站图层", true);
          this.map.addLayer(stationlayer);
          console.log("测站图层", stationlayer);
          //this.sentLayersIn();
        }
      );
      this.$axios("http://47.98.181.209:9090/sectionpoint").then((res) => {
        const sectionlayer = vectorGeoJson(res.data, "断面图层", true);
        this.map.addLayer(sectionlayer);
        console.log("断面图层", sectionlayer);
        this.sentLayersIn();
      });
    },
    // 初始化覆盖层
    initOverlay() {
      let _this = this;

      _this.popup = new Overlay({
        element: _this.$refs.popupRef,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      _this.map.addOverlay(_this.popup); // 添加覆盖层popup
      console.log(this.popup);
    },
    // 单击要素
    clickFeature() {
      let _this = this;
      this.map.on("singleclick", function (evt) {
        var clickCoord = evt.coordinate;
        var pixel = _this.map.getEventPixel(evt.originalEvent);
        var feature = _this.map.forEachFeatureAtPixel(
          pixel,
          function (feature) {
            return feature;
          }
        );
        /* console.log(
          "feature",
          feature.getProperties().hasOwnProperty("features")
        ); */
        if (feature && feature.getProperties().hasOwnProperty("features")) {
          if (feature.getProperties().features.length > 1) {
            _this.$notify({
              title: "提示",
              message: "该点聚合了多个点数据，请放大后查看",
              offset: 150,
              type: "warning",
            });
            _this.featureProps = undefined;
            _this.closePopup();
          } else {
            console.log(
              "_this.featureProps",
              feature.getProperties(),
              feature.getProperties().features[0]
            );
            _this.featureProps = feature.getProperties().features[0].values_;

            _this.popup.setPosition(
              feature.getProperties().features[0].values_.coordinates
            );
          }
        } else if (feature) {
          _this.featureProps = feature.values_;

          _this.popup.setPosition(feature.values_.coordinates);
          console.log(
            "_this.featureProps",
            feature,
            _this.featureProps,
            feature.coordinates
          );
        } else {
          _this.featureProps = undefined;
          _this.closePopup();
        }
      });
    },
    // 关闭弹框
    closePopup() {
      this.popup.setPosition(undefined);
    },
  },

  updated() {
    console.log("这里是map的updated");
    this.setLayers;
  },

  components: {
    LayersControlVue,
    popupVue,
    MousePositionControlVue,
  },
};
</script>,


<style scoped>
/* #main {
  position: relative;
  width: auto;
  height: calc(95vh - 137px);
} */
#map {
  /* width: 970px;
  height: 500px; */
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 500px;
}
.popup:after,
.popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.popupCloser {
  position: absolute;
  top: 0px;
  right: 8px;
}
</style>