import { baseURL, request, requests } from './network';
import { ErrorHandler } from '../utils/errorHandler';

// 封装接口请求
// export function 接口名() {
// return 封装的请求名('请求方式', `${公用地址}请求地址`, 开启异步请求, 传参)
// }

// 带错误处理的请求包装器
function withErrorHandling(requestPromise, context = '未知请求') {
  return requestPromise.catch(error => {
    const errorMessage = ErrorHandler.handleApiError(error);
    ErrorHandler.showError(errorMessage, context);
    throw error;
  });
}

// **********************************************首页**********************************************
// 获取昵称
export function getToken(params) {
  return withErrorHandling(
    request('get', `http://159.75.72.104:5000/api/Stks`, true, params),
    '获取用户信息'
  );
}

// 获取bilibili昵称
export function getTokenbilibili(params) {
  return withErrorHandling(
    request('get', `https://localhost:7231/api/Dmg?str=bilibili`, true, params),
    '获取Bilibili信息'
  );
}

// 获取数据
export function gettkvalue(params) {
  return withErrorHandling(
    request('post', `https://localhost:7231/api/qh`, true, params),
    '获取内容数据'
  );
}

export function getmkvalue(params) {
  return withErrorHandling(
    request('post', `https://localhost:7231/api/Dmg`, true, params),
    '获取动漫数据'
  );
}

//天气
export function gettqvalue(params) {
  return withErrorHandling(
    requests('post', `http://159.75.72.104:8888/LGI`, true, params),
    '获取天气信息'
  );
}

//ip
export function getipvalue(params) {
  return withErrorHandling(
    requests('post', `http://pv.sohu.com/cityjson?ie=utf-8`, true, params),
    '获取IP信息'
  );
}
export function dateFormat(fmt, date) {
    let ret
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
    }
    return fmt
}






