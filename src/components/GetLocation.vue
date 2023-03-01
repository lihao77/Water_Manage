<template>
    <el-button
      size="mini"
      @click="handleGetLocation"
      icon="el-icon-location-information"
      v-loading.fullscreen.lock="positioning"
      element-loading-text="定位中..."
      circle
    ></el-button>

</template>

<script>
import { getLocation} from "@/utils/bdGeoService";

export default {
  name: "GetLocation",
  computed:{
  },
  data() {
    return {
      BMap: null,
      geolocation: null, // Geolocation对象实例
      positioning: false, // 定位中
      positioningInterval: null, // 定位倒计时计时器
      countDown: 30, // 倒计时，单位秒
      location: {}, // 定位信息
      getLocationCity: "", // 定位城市
    };
  },
  created() {
  },
  mounted() {
    const _this = this;
    window.initBaiduMapScript = () => {
      _this.BMap = window.BMap;
    };
    getLocation("initBaiduMapScript");
  },
  methods: {
    handleGetLocation() {
      const _this = this;
      this.$confirm("需要获取您的位置信息", "位置授权", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.getLocation();
        })
        .catch(() => {
          this.$message({
            type: "error",
            duration: 800,
            message: "位置授权失败",
          });
        });
    },
    // 获取地理定位
    getLocation() {
      
      const _this = this;
      _this.geolocation = new _this.BMap.Geolocation();
      console.log(_this.geolocation)
      if (_this.geolocation) {
        // 开启SDK辅助定位，仅当使用环境为移动web混合开发，且开启了定位sdk辅助定位功能后生效
        _this.geolocation.enableSDKLocation();
        // 开始定位
        this.positioning = true;
        // 倒计时
        this.positioningInterval = setInterval(() => {
          if (this.countDown === 0) {
            this.countDown = 30;
            clearInterval(this.positioningInterval);
          } else {
            this.countDown--;
          }
        }, 1000);
        // 位置选项
        const positionOptions = {
          enableHighAccuracy: true, // 要求浏览器获取最佳结果
          timeout: 3, //    超时时间
          maximumAge: 0, // 允许返回指定时间内的缓存结果。如果此值为0，则浏览器将立即获取新定位结果
        };
        // 获取用户位置信息
        _this.geolocation.getCurrentPosition((position) => {
          _this.resetPositioning();
          // 获取定位结果状态码
          const statusCode = _this.geolocation.getStatus();
          let msg = "由于未知错误而无法检索设备的位置"; // 提示消息
          let msgType = "error"; // 消息类型
          // 判断结果状态码，为0代表获取成功，读取省市、经纬度
          switch (statusCode) {
            case 0:
              msgType = "success";
              msg = "获取地理位置定位请求成功";
              if (position) {
                // 数据变量定义
                let Lat = 0.0; // 经度
                let Lng = 0.0; // 纬度
                let province = "未知"; // 经度
                let city = "未知"; // 纬度

                // 坐标
                if (position.point) {
                  Lat = position.point.lat;
                  Lng = position.point.lng;
                }
                // 位置
                if (position.address) {
                  province = position.address.province;
                  city = position.address.city;
                }
                _this.location = {
                  province: province,
                  city: city,
                  Lat: Lat,
                  Lng: Lng,
                };
                console.log(_this.location)
                _this.getLocationCity = city;
                this.$bus.$emit('locationInfo',_this.location)
              } else {
                msg = "由于未知错误而无法检索设备的位置";
              }
              break;
            case 2:
              msg = "由于未知错误而无法检索设备的位置";
              break;
            case 4:
            case 5:
              msg = "位置服务请求非法";
              break;
            case 6:
              msg = "应用程序没有使用位置服务的权限";
              break;
            case 7:
              msg = "网络不可用或者无法连接到获取位置信息的卫星";
              break;
            case 8:
              msg = "无法在指定的最大超时间隔内检索位置信息";
              break;
            default:
              msg = "由于未知错误而无法检索设备的位置";
              break;
          }
          _this.$message({
            type: msgType,
            message: msg,
          });
        }, positionOptions);
      } else {
        _this.$message({
          type: msgType,
          message: "您的浏览器不支持地理位置服务",
        });
      }
    },
    // 重置定位相关数据
    resetPositioning() {
      this.positioning = false;
      this.location = null;
      this.countDown = 30;
      clearInterval(this.positioningInterval);
    },
  },
  watch: {
  },
};
</script>
