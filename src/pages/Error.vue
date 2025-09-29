<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <span v-if="errorType === '404'">🔍</span>
        <span v-else-if="errorType === 'network'">📡</span>
        <span v-else>⚠️</span>
      </div>
      
      <h1 class="error-title">{{ errorTitle }}</h1>
      <p class="error-message">{{ errorMessage }}</p>
      
      <div class="error-actions">
        <button class="btn btn-primary" @click="goHome">返回首页</button>
        <button class="btn btn-secondary" @click="goBack">返回上页</button>
        <button class="btn btn-secondary" @click="retry" v-if="errorType === 'network'">重试</button>
      </div>
      
      <div class="error-details" v-if="showDetails">
        <details>
          <summary>技术详情</summary>
          <pre>{{ errorDetails }}</pre>
        </details>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    errorType: {
      type: String,
      default: 'general'
    },
    errorDetails: {
      type: String,
      default: ''
    }
  },
  computed: {
    errorTitle() {
      const titles = {
        '404': '页面未找到',
        'network': '网络连接失败',
        'general': '出现错误'
      };
      return titles[this.errorType] || titles.general;
    },
    
    errorMessage() {
      const messages = {
        '404': '抱歉，您访问的页面不存在。请检查地址是否正确，或返回首页继续浏览。',
        'network': '无法连接到服务器，请检查您的网络连接，然后重试。',
        'general': '系统遇到了一些问题，我们正在努力修复。请稍后再试。'
      };
      return messages[this.errorType] || messages.general;
    },
    
    showDetails() {
      return this.errorDetails && process.env.NODE_ENV === 'development';
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'index' });
    },
    
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.goHome();
      }
    },
    
    retry() {
      location.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.error-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 600px;
  background: white;
  padding: 60px 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 5rem;
  margin-bottom: 30px;
  opacity: 0.7;
}

.error-title {
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 20px;
  font-weight: 300;
}

.error-message {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 40px;
}

.error-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.btn-secondary {
    background: #f8f9fa;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
      background: #e9ecef;
      transform: translateY(-1px);
    }
  }
}

.error-details {
  margin-top: 40px;
  text-align: left;
  
  details {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    
    summary {
      cursor: pointer;
      font-weight: 500;
      margin-bottom: 10px;
    }
    
    pre {
      background: #fff;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 0.9rem;
      color: #666;
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .error-content {
    padding: 40px 30px;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
}
</style>