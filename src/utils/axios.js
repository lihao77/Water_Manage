
import axios from "axios";
import router from '../router'
import { Notification } from 'element-ui';


const _axios = axios.create();

//配置请求的参数
_axios.interceptors.request.use(config => {
  //配置token
  console.log(config)
  if (localStorage.getItem('Authorization')) {
    config.headers.Authorization = localStorage.getItem('Authorization');
  }
  return config;
}, error => {
  return Promise.reject(error);
})
//配置响应的参数
_axios.interceptors.response.use(response => {
  return response
}, error => {
  const response = error.response;
  const { message } = error
  //当token过期或者不存在时，后台返回状态码401，此时页面跳转到登录页面
  //判断是否是axios的错误
  if (!response) {
    Notification({
      message: message,
      type: "error",
    });
    return Promise.reject(error);
  } else {
    if (response.status === 401) {
      localStorage.removeItem('Authorization')
      router.replace({ path: "/login" });
      Notification({
        message: "登录信息已过期,请重新登录",
        type: "error",
      });
      return Promise.reject(error);
    } else if (response.status === 403) {
      router.push({ path: "/page_403" });
    } else {
      return Promise.reject(error);
    }
  }



});

export default _axios
