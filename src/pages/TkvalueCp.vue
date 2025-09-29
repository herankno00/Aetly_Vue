<template>
  <div class="desktop-nav-container">
    <!-- 背景装饰 -->
    <div class="bg-particles">
      <div 
        v-for="i in 50" 
        :key="i" 
        class="particle"
        :style="getParticleStyle(i)"
      ></div>
    </div>
    
    <!-- 主要内容 -->
    <div class="main-content">
      <!-- 头部 -->
      <header class="nav-header">
        <div class="logo-section">
          <h1 class="app-logo">Aetly</h1>
          <p class="app-tagline">个人网站 · 内容分享平台</p>
        </div>
        
        <div class="header-actions">
          <div class="current-time">{{ currentTime }}</div>
          <div class="network-status" :class="{ offline: !isOnline }">
            {{ isOnline ? '在线' : '离线' }}
          </div>
        </div>
      </header>
      
      <!-- 分类选择区域 -->
      <main class="categories-main">
        <h2 class="main-title">选择您感兴趣的内容</h2>
        <p class="main-subtitle">探索不同类型的精彩内容</p>
        
        <div class="categories-container">
          <div 
            v-for="category in categories" 
            :key="category.key"
            class="category-card"
            :class="{ 
              'active': hoveredCategory === category.key,
              'selected': selectedCategory === category.key 
            }"
            @mouseenter="hoveredCategory = category.key"
            @mouseleave="hoveredCategory = ''"
            @click="selectCategory(category)"
          >
            <div class="card-inner">
              <div class="category-icon">{{ category.icon }}</div>
              <h3 class="category-title">{{ category.name }}</h3>
              <p class="category-desc">{{ category.description }}</p>
              <div class="category-stats">
                <span class="stat-item">{{ category.count }} 篇内容</span>
              </div>
            </div>
            <div class="card-hover-effect"></div>
          </div>
        </div>
      </main>
      
      <!-- 底部信息 -->
      <footer class="nav-footer">
        <div class="footer-links">
          <a href="#" class="footer-link">关于</a>
          <a href="#" class="footer-link">联系</a>
          <a href="#" class="footer-link">隐私</a>
        </div>
        <p class="copyright">© 2024 Aetly. All rights reserved.</p>
      </footer>
    </div>
    
    <!-- 选择提示 -->
    <div class="selection-hint" v-if="hoveredCategory">
      <span>点击进入 {{ getCategoryName(hoveredCategory) }}</span>
    </div>
  </div>
</template>
 
    
<script>
import { NetworkStatus } from "../utils/errorHandler";

export default {
  name: "TkvalueCp",
  data() {
    return {
      currentTime: new Date().toLocaleString(),
      isOnline: NetworkStatus.isOnline(),
      hoveredCategory: '',
      selectedCategory: '',
      categories: [
        {
          key: '记录',
          name: '记录',
          icon: '📝',
          description: '记录生活点滴，分享日常思考',
          count: 23,
          route: 'allpage'
        },
        {
          key: 'c#',
          name: 'C# 技术',
          icon: '💻',
          description: '编程技术文章，开发经验分享',
          count: 15,
          route: 'allpage'
        },
        {
          key: '游戏',
          name: '游戏世界',
          icon: '🎮',
          description: '游戏评测，攻略心得',
          count: 31,
          route: 'dmgpage'
        },
        {
          key: '动漫',
          name: '动漫天地',
          icon: '🎬',
          description: '动漫推荐，角色分析',
          count: 28,
          route: 'dmgpage'
        },
        {
          key: '音乐',
          name: '音乐空间',
          icon: '🎵',
          description: '音乐推荐，歌手介绍',
          count: 19,
          route: 'dmgpage'
        }
      ]
    };
  },
  mounted() {
    // 更新时间
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
    
    // 监听网络状态
    NetworkStatus.addNetworkListener((online) => {
      this.isOnline = online;
    });
  },
  beforeDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category.key;
      this.setCookie("type", category.key);
      
      // 添加选择动画效果
      setTimeout(() => {
        this.$router.push({ name: category.route });
      }, 300);
    },
    
    getCategoryName(key) {
      const category = this.categories.find(cat => cat.key === key);
      return category ? category.name : '';
    },
    
    getParticleStyle(index) {
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      
      return {
        width: size + 'px',
        height: size + 'px',
        left: x + '%',
        top: y + '%',
        animationDelay: delay + 's'
      };
    },
    
    setCookie(name, value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
  }
};
</script>

<style lang="less" scoped>
.desktop-nav-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.bg-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.6;
  }
}

.main-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  .app-logo {
    font-size: 2.5rem;
    font-weight: 300;
    margin: 0;
    letter-spacing: 2px;
  }
  
  .app-tagline {
    font-size: 1rem;
    margin: 5px 0 0;
    opacity: 0.8;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  
  .current-time {
    font-size: 0.95rem;
    opacity: 0.8;
  }
  
  .network-status {
    padding: 5px 12px;
    border-radius: 15px;
    background: rgba(0, 255, 0, 0.2);
    font-size: 0.85rem;
    
    &.offline {
      background: rgba(255, 0, 0, 0.2);
    }
  }
}

.categories-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 0;
  text-align: center;
}

.main-title {
  font-size: 2.8rem;
  font-weight: 300;
  margin: 0 0 15px;
  letter-spacing: 1px;
}

.main-subtitle {
  font-size: 1.2rem;
  margin: 0 0 60px;
  opacity: 0.8;
}

.categories-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-card {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px 30px;
  cursor: pointer;
  transition: all 0.4s ease;
  transform: translateY(0);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.15);
    
    &:before {
      left: 100%;
    }
    
    .category-icon {
      transform: scale(1.2) rotate(5deg);
    }
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px) scale(1.02);
  }
  
  &.selected {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(0.95);
    
    .category-icon {
      animation: pulse 0.6s ease-in-out;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

.card-inner {
  position: relative;
  z-index: 2;
}

.category-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
  display: block;
  transition: all 0.3s ease;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 15px;
}

.category-desc {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0 0 20px;
  line-height: 1.5;
}

.category-stats {
  .stat-item {
    font-size: 0.9rem;
    opacity: 0.7;
    background: rgba(255, 255, 255, 0.1);
    padding: 5px 10px;
    border-radius: 10px;
  }
}

.nav-footer {
  padding: 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-links {
  margin-bottom: 15px;
  
  .footer-link {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
}

.copyright {
  font-size: 0.9rem;
  opacity: 0.6;
  margin: 0;
}

.selection-hint {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 10;
  animation: fadeInUp 0.3s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .main-content {
    padding: 0 30px;
  }
  
  .categories-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }
  
  .main-title {
    font-size: 2.4rem;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 0 20px;
  }
  
  .nav-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .categories-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .category-card {
    padding: 30px 25px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .main-subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0 15px;
  }
  
  .category-card {
    padding: 25px 20px;
  }
  
  .category-icon {
    font-size: 3rem;
  }
  
  .main-title {
    font-size: 1.8rem;
  }
}
</style>