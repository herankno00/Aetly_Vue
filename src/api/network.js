// 导入axios
import axios from 'axios';
import qs from 'qs'
 

// 进行一些全局配置
// 公共路由(网络请求地址)
export const baseURL = 'https://www.topo360.com/cloud/';
// export const baseURL = 'http://192.200.200.108:9900/'; // 马
// 请求响应超时时间
axios.defaults.timeout = 10000;

var asyncStatue = true;

// 封装接口请求
export function request(methodType,requestUrl,asyncStatue,param) {
  return axios({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    url: requestUrl,
    method: methodType,
    data: qs.stringify(param),
    asyncStatue: asyncStatue
  })
}
export function requests(methodType,requestUrl,asyncStatue,param) {
  return axios({
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    url: requestUrl,
    method: methodType,
   
    data: JSON.stringify(param),
    asyncStatue: asyncStatue
  })
}