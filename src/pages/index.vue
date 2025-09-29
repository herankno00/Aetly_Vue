<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="logo">
        <h1>Aetly</h1>
        <p>个人网站</p>
      </div>
      <div class="loading-spinner"></div>
      <p class="loading-text">正在加载...</p>
    </div>
  </div>
</template>
 
    
<script>
import * as api from "../api/api";
import { decrypt } from "../utils/decode";

export default {
  // @click="tocvclick"
  name: "index",
  data() {
    return { 
    };
  },
  computed: {},
  created() {},
  mounted() {
    // Add a small delay for better user experience
    setTimeout(() => {
      if (this._isMobile()) {
        this.$router.push({name: "Tkvalue"});
      } else {
        this.$router.push({name: "TkvalueCp"});
      }
    }, 1500);
  },
  methods: {
    
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
   
  },
};
</script>

<style lang="less" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  color: white;
}

.logo {
  margin-bottom: 30px;
  
  h1 {
    font-size: 3rem;
    margin: 0;
    font-weight: 300;
    letter-spacing: 2px;
  }
  
  p {
    font-size: 1.2rem;
    margin: 10px 0 0 0;
    opacity: 0.8;
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1rem;
  opacity: 0.7;
  margin-top: 10px;
}
</style>