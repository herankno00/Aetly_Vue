<template>
  <div class="mobile-nav-container">
    <!-- 背景装饰 -->
    <div class="background-overlay">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>
    
    <!-- 主要内容 -->
    <div class="nav-content">
      <div class="header-section">
        <h1 class="app-title">Aetly</h1>
        <p class="app-subtitle">个人网站</p>
      </div>
      
      <div class="categories-section">
        <h2 class="section-title">选择分类</h2>
        <div class="categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.key"
            class="category-card"
            :class="{ 'active': currentCategory === category.key }"
            @click="selectCategory(category)"
          >
            <div class="category-icon">{{ category.icon }}</div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-desc">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部信息 -->
    <div class="footer-info">
      <p class="copyright">© 2024 Aetly - 个人网站</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tkvalue",
  data() {
    return {
      currentCategory: '',
      categories: [
        {
          key: '记录',
          name: '记录',
          icon: '📝',
          description: '日常记录与思考',
          route: 'allpage'
        },
        {
          key: 'c#',
          name: 'C#',
          icon: '💻',
          description: '编程技术相关',
          route: 'allpage'
        },
        {
          key: '游戏',
          name: '游戏',
          icon: '🎮',
          description: '游戏相关内容',
          route: 'dmgpage'
        },
        {
          key: '动漫',
          name: '动漫',
          icon: '🎬',
          description: '动漫作品分享',
          route: 'dmgpage'
        },
        {
          key: '音乐',
          name: '音乐',
          icon: '🎵',
          description: '音乐作品收藏',
          route: 'dmgpage'
        }
      ]
    };
  },
  methods: {
    selectCategory(category) {
      this.currentCategory = category.key;
      this.setCookie("type", category.key);
      
      // 添加点击反馈
      setTimeout(() => {
        this.$router.push({ name: category.route });
      }, 200);
    },
    
    setCookie(name, value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
  }
};
</script>

<style lang="less" scoped>
.mobile-nav-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  
  &.shape-1 {
    width: 200px;
    height: 200px;
    top: -50px;
    right: -50px;
    animation: float 6s ease-in-out infinite;
  }
  
  &.shape-2 {
    width: 150px;
    height: 150px;
    bottom: 100px;
    left: -30px;
    animation: float 4s ease-in-out infinite reverse;
  }
  
  &.shape-3 {
    width: 100px;
    height: 100px;
    top: 30%;
    right: 20px;
    animation: float 5s ease-in-out infinite;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.nav-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  z-index: 1;
  position: relative;
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
}

.app-title {
  font-size: 3.5rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 3px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 1.3rem;
  margin: 15px 0 0;
  opacity: 0.8;
  font-weight: 300;
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 30px;
  font-weight: 400;
  opacity: 0.9;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 400px;
  width: 100%;
}

.category-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 25px 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }
  
  &:active {
    transform: translateY(-2px) scale(0.98);
  }
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
  display: block;
}

.category-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px;
}

.category-desc {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
  line-height: 1.4;
}

.footer-info {
  text-align: center;
  padding: 20px;
  z-index: 1;
  position: relative;
}

.copyright {
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
}

// 小屏幕适配
@media (max-width: 480px) {
  .app-title {
    font-size: 2.8rem;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    max-width: 300px;
  }
  
  .category-card {
    padding: 20px 15px;
  }
  
  .category-icon {
    font-size: 2rem;
  }
  
  .nav-content {
    padding: 30px 15px;
  }
}

// 超小屏幕
@media (max-width: 360px) {
  .app-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }
  
  .category-card {
    padding: 18px 12px;
  }
}

// 横屏适配
@media (orientation: landscape) and (max-height: 500px) {
  .nav-content {
    padding: 20px;
  }
  
  .header-section {
    margin-bottom: 30px;
  }
  
  .app-title {
    font-size: 2.5rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  
  .category-card {
    padding: 15px 10px;
  }
  
  .category-icon {
    font-size: 1.8rem;
  }
}
</style>