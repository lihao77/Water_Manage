import 'ol/ol.css';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style';
import { Cluster, Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer, Heatmap as HeatmapLayer } from 'ol/layer';


export function vectorGeoJson(jsonList, groupType, isCluster) {
    console.log("jsonList", jsonList)
    var geoFeatures = []
    //[0] 点数据，[1]popup弹窗数据
    var jsonListFeature = jsonList[0]
    var jsonListLable = jsonList[1]
    jsonListFeature.forEach((json,index) => {
        json.lableTips = jsonListLable
        let geoFeature = {
            'type': 'Feature',
            'properties': json,

            'geometry': {
                'type': 'Point',
                'coordinates': json.coordinates
            }
        }
        geoFeatures.push(geoFeature)
    });
    /* //例子，可行
    let geoFeature = {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [120, 30],
        },
    }
    geoFeatures.push(geoFeature) */


    
    var geoObject = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:4326',
            },
        },
        'features': geoFeatures,
    };
    console.log(geoObject)
    var zindex
    var pointImgStyle = undefined
    switch (groupType) {
        case '断面图层':
            zindex = 13
            pointImgStyle = new Icon({
                scale: 0.3,
                offset: [-15, -40],
                offsetOrigin: "bottom-right",
                size: [100, 100],
                opacity: 1,
                src: require("@/assets/section.png"),
            })

            break
        case '测站图层':
            zindex = 14
            pointImgStyle = new Icon({
                scale: 0.2,
                offset: [26.5, 0],
                offsetOrigin: "bottom-right",
                size: [200, 200],
                opacity: 1,
                src: require("@/assets/station.png"),
            })

            break
        case '定位':
            zindex = 13
            pointImgStyle = new Icon({
                scale: 0.6,
                offset: [-20, -40],
                offsetOrigin: "bottom-right",
                size: [100, 100],
                opacity: 1,
                src: require("@/assets/locate.png"),
            })

            break
        default:
            zindex = 11
            pointImgStyle = new CircleStyle({
                radius: 0,
                fill: null,
            })
    }

    var styles = {
        Point: [
            new Style({
                //点样式
                image: pointImgStyle
            }),
        ],
        LineString: [
            new Style({
                stroke: new Stroke({
                    //线的边界样式
                    color: "red",
                    width: 1,
                }),
            }),
        ],
        MultiLineString: [
            new Stroke({
                stroke: new Stroke({
                    //多线的边界样式
                    color: "green",
                    width: 1,
                }),
            }),
        ],
        MultiPoint: [
            new Style({
                image: pointImgStyle
            }),
        ],
        MultiPolygon: [
            new Style({
                stroke: new Stroke({
                    //多区的边界样式
                    color: "yellow",
                    width: 1,
                }),
                fill: new Fill({
                    //多区的填充样式
                    color: "rgba(255,255,0,0.1)",
                }),
            }),
        ],
        Polygon: [
            new Style({
                stroke: new Stroke({
                    //区的边界样式
                    color: "red",
                    lineDash: [4],
                    width: 3,
                }),
                fill: new Fill({
                    //区的填充样式
                    color: "rgba(0,0,255,0.1)",
                }),
            }),
        ],
        GeometryCollection: [
            new Style({
                stroke: new Stroke({
                    //集合要素的边界样式
                    color: "magenta",
                    width: 2,
                }),
                fill: new Fill({
                    //集合要素的边界样式
                    color: "magenta",
                    width: 2,
                }),
                fill: new Fill({
                    color: "magenta",
                }),
                image: new Circle({
                    radius: 10,
                    fill: null,
                    stroke: new Stroke({
                        color: "magenta",
                    }),
                }),
            }),
        ],
        Circle: [
            new Style({
                stroke: new Stroke({
                    //园的边界样式
                    color: "red",
                    width: 2,
                }),
                fill: new Fill({
                    //园的填充样式
                    color: "rgba(255,0,0,0.2)",
                }),
            }),
        ],
    };


    // 矢量源
    var vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoObject, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
        }),
    });
    // 样式函数
    var styleFunction = function (feature) {
        let style = styles[feature.getGeometry().getType()]
        return style;
    };


    if (isCluster == false) {
        // 矢量图层
        var vectorLayer = new VectorLayer({
            name: '断面图层',
            title: groupType,
            zIndex: zindex,
            source: vectorSource,
            style: styleFunction,
        });
    } else {
        //聚合标注
        var clusterSource = new Cluster({
            distance: 20,
            source: vectorSource
        })
        // 矢量图层
        var vectorLayer = new VectorLayer({
            name: '断面图层',
            title: groupType,
            zIndex: zindex,
            source: clusterSource,
            style: styleFunction,
        });
    }



    return vectorLayer


}