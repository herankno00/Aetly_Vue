// 错误处理工具
export class ErrorHandler {
  static showError(message, context) {
    console.error(`[${context}] ${message}`);
    
    // 在生产环境中可以发送到错误监控服务
    if (process.env.NODE_ENV === 'production') {
      // 发送错误到监控服务
      // sendToErrorService(message, context);
    }
  }
  
  static handleApiError(error, defaultMessage = '网络请求失败') {
    if (error.response) {
      // 服务器返回错误状态码
      return `服务器错误: ${error.response.status}`;
    } else if (error.request) {
      // 请求已发出但未收到响应
      return '网络连接失败，请检查网络设置';
    } else {
      // 其他错误
      return defaultMessage;
    }
  }
  
  static createOfflineData() {
    // 创建离线模式下的默认数据
    return {
      name: '游客',
      token: 'OFFLINE_MODE',
      items: [
        {
          title: '欢迎访问',
          content_txt: '当前处于离线模式，部分功能可能无法使用',
          time: new Date().toLocaleString(),
          image_path: ''
        },
        {
          title: '网站功能',
          content_txt: '支持动漫、音乐、游戏等内容分类浏览',
          time: new Date().toLocaleString(),
          image_path: ''
        }
      ]
    };
  }
}

// 网络状态检测
export class NetworkStatus {
  static isOnline() {
    return navigator.onLine;
  }
  
  static addNetworkListener(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
  }
  
  static removeNetworkListener(callback) {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  }
}