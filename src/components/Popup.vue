<template>
  <div id="popup" class="ol-popup" ref="popup">
    <a
      href="#"
      id="popup-closer"
      class="ol-popup-closer"
      ref="closer"
      @click="close"
    ></a>
    <div id="popup-content" ref="content"></div>
  </div>
</template>

<script>
import axios, { Axios } from "axios";
import { getForViewAndSize } from "ol/extent";
import "ol/ol.css";
import Overlay from "ol/Overlay";
export default {
  props: ["map", "popupsLayers"],
  data() {
    return {
      flag: false,
      popup: null,
    };
  },

  mounted() {
    console.log('popupvue')
    this.addPopup();
    console.log(this.popup);
    var container = document.getElementById("popup");
    var closer = document.getElementById("popup-closer");

    var _this = this;

    //注册map的点击事件
    this.map.on("singleclick", function (evt) {
      console.log('popup中的map点击事件')
      if (_this.flag == true) {
        _this.flag = false;
        return;
      }
      
      if (
        _this.popup.getPosition() == undefined ||
        !_this.isInDiv(evt, _this.popup)
      ) {
        //这里的this为this.map
        var view = this.getView();
        var viewResolution = view.getResolution();
        var layerss;
        console.log(viewResolution)
        //找到popup弹窗的图层是哪一个
        var j;
        for (var i = 0; i < _this.popupsLayers.length; i++) {
          console.log(_this.popupsLayers, "循环进去了");
          j = _this.popupsLayers.length - i - 1;
          if (_this.popupsLayers[j].get("visible") == true) {
            layerss = _this.popupsLayers[j];
1
            break;
          }
        }
        //判断是否没有图层被勾选
        if (i > 2) return;

        var urls = layerss
          .getSource()
          .getFeatureInfoUrl(
            evt.coordinate,
            viewResolution,
            view.getProjection(),
            { INFO_FORMAT: "application/json" }
          );

        //console.log(urls);

        axios.get(urls).then(
          (response) => {
            console.log('开始处理axios');
            if (response.data.features[0] == undefined) {
              return;
            } else {
              console.log(response.data.features[0].properties);


              _this.popup.setPosition(evt.coordinate);

              var url = layerss
                .getSource()
                .getFeatureInfoUrl(
                  evt.coordinate,
                  viewResolution,
                  view.getProjection(),
                  { INFO_FORMAT: "text/html", FEATURE_COUNT: 50 }
                );
              if (url) {
                document.getElementById("popup-content").innerHTML =
                  '<iframe seamless src="' + url + '"></iframe>';
              }
            }
            console.log('axios处理结束');
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    });
  },

  methods: {
    //判断鼠标点击的位置是否在某个div区域内，可用在右键菜单的显示与隐藏等
    isInDiv(event, popup) {
      var div = document.getElementById("popup");
      var x = event.clientX;
      var y = event.clientY;
      var divx1 = div.offsetLeft;
      var divy1 = div.offsetTop;
      var divx2 = div.offsetLeft + div.offsetWidth;
      var divy2 = div.offsetTop + div.offsetHeight;
      console.log(x < divx1 || x > divx2 || y < divy1 || y > divy2);
      return x < divx1 || x > divx2 || y < divy1 || y > divy2;
    },
    //添加popup弹窗，该函数会被挂载到mounted函数上
    addPopup() {
      this.popup = new Overlay({
        element: this.$refs.popup,
        autoPan: true,
        positioning: "bottom-center",
        stopEvent: false,
        autoPanAnimation: {
          duration: 250,
        },
      });
      console.log("addPopup函数被调用了");
      this.map.addOverlay(this.popup);
    },
    //popup弹窗的关闭函数
    close() {
      this.popup.setPosition(undefined);
      //判断是否刚点击过close，避免重复弹窗
      this.flag = true;
      return false;
    },
  },
  
};
</script>

<style scoped>
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
}

.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}

.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}

.ol-popup-closer {
  text-decoration: none;
  position: absolute;

  top: 2px;
  right: 8px;
}

.ol-popup-closer:after {
  content: "×";
  height: 15px;
  width: 15px;
}

/* #popup-content {
  font-size: 14px;
  font-family: "微软雅黑";
}

#popup-content.markerInfo {
  font-weight: bold;
} */

table.featureInfo,
table.featureInfo td,
table.featureInfo th {
  border: 1px solid #ddd;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  font-size: 90%;
  padding: 0.2em 0.1em;
}

table.featureInfo th {
  padding: 0.2em 0.2em;
  font-weight: bold;
  background: #eee;
}

table.featureInfo td {
  background: #fff;
}

table.featureInfo tr.odd td {
  background: #eee;
}

table.featureInfo caption {
  text-align: left;
  font-size: 100%;
  font-weight: bold;
  padding: 0.2em 0.2em;
}
</style>