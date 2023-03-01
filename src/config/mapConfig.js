import View from 'ol/View'
import {Group as LayerGroup, Tile as TileLayer} from 'ol/layer';
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from "ol/source/OSM"
import XYZ from 'ol/source/XYZ'

// 配置地图视图
export function mapView(zoomCenter) {
  return new View({
    projection: "EPSG:4326",    //使用这个坐标系
    center: zoomCenter,
    // center: [121.487899486,31.24916171],  //(上海)
    zoom: 10,  //地图缩放级别
  })
}


// 配置地图底图图层
export function baseLayers() {
  var gaode_cov = new TileLayer({         // 高德卫星
    title: '高德卫星',
    type: '卫星底图',
    source: new XYZ({
      url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}',
      wrapX: false,
      crossOrigin: 'anonymous',
    })
  })

  /* var offline_bm = new TileLayer({         // 离线地图
    title: '离线地图',
    type: '地图底图',
    // source: new XYZ({
    //   url: 'http://127.0.0.1:7080/streetmap/shenzhen/{z}/{x}/{y}.jpg'
    // })
  }) */
  var gaode_bm = new TileLayer({         // 高德地图
    title: '高德地图',
    type: '地图底图',
    source: new XYZ({
      url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
      wrapX: false,
      crossOrigin: 'anonymous',
    })
  })
  var osm_bm = new TileLayer({           // OSM地图
    title: 'OSM地图',
    type: '地图底图',
    source: new OSM()
  })
  var arcgis_bm = new TileLayer({         // ArcGIS地图
    title: 'ArcGIS地图',
    type: '地图底图',
    source: new TileArcGISRest({
      url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
      crossOrigin: 'anonymous',
    })
  })
  console.log("gaode_cov",gaode_cov)
  return [gaode_cov, gaode_bm, osm_bm, arcgis_bm];
}