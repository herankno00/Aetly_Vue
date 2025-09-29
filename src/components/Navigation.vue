<template>
  <div class="navigation-container">
    <div class="nav-header">
      <div class="user-info">
        <img 
          :src="userAvatar" 
          class="user-avatar"
          :alt="userName"
          @error="handleImageError"
        />
        <div class="user-details">
          <h3 class="user-name">{{ userName }}</h3>
          <p class="user-status">{{ userStatus }}</p>
          <p class="current-time">{{ currentTime }}</p>
        </div>
      </div>
      
      <button class="back-btn" @click="goBack" v-if="showBackButton">
        <span>← 返回</span>
      </button>
    </div>
    
    <div class="nav-categories" v-if="showCategories">
      <div 
        v-for="category in categories" 
        :key="category.key"
        class="category-item"
        :class="{ active: currentCategory === category.key }"
        @click="selectCategory(category)"
      >
        <div class="category-icon">
          {{ category.icon }}
        </div>
        <span class="category-name">{{ category.name }}</span>
      </div>
    </div>
    
    <div class="network-status" v-if="!isOnline">
      <span class="offline-indicator">离线模式</span>
    </div>
  </div>
</template>

<script>
import { NetworkStatus } from '../utils/errorHandler';

export default {
  name: 'Navigation',
  props: {
    userName: {
      type: String,
      default: '游客'
    },
    userStatus: {
      type: String,
      default: 'OFFLINE'
    },
    currentCategory: {
      type: String,
      default: ''
    },
    showBackButton: {
      type: Boolean,
      default: true
    },
    showCategories: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentTime: new Date().toLocaleString(),
      isOnline: NetworkStatus.isOnline(),
      categories: [
        { key: '记录', name: '记录', icon: '📝' },
        { key: 'c#', name: 'C#', icon: '💻' },
        { key: '游戏', name: '游戏', icon: '🎮' },
        { key: '动漫', name: '动漫', icon: '🎬' },
        { key: '音乐', name: '音乐', icon: '🎵' }
      ],
      defaultAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE1IiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik0yNSA3NUMyNSA2NS41IDM0LjUgNTcuNSA1MCA1Ny41Uzc1IDY1LjUgNzUgNzVIMjVaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo='
    };
  },
  computed: {
    userAvatar() {
      // Try to use QQ avatar, fallback to default
      if (this.userStatus !== 'OFFLINE') {
        return `http://q1.qlogo.cn/g?b=qq&nk=1600211151&s=100`;
      }
      return this.defaultAvatar;
    }
  },
  mounted() {
    // Update time every second
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date().toLocaleString();
    }, 1000);
    
    // Monitor network status
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
    goBack() {
      this.$emit('back');
      this.$router.push({ name: 'index' });
    },
    
    selectCategory(category) {
      this.$emit('category-change', category);
    },
    
    handleImageError(event) {
      event.target.src = this.defaultAvatar;
    }
  }
};
</script>

<style lang="less" scoped>
.navigation-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
}

.user-details {
  .user-name {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
  }
  
  .user-status, .current-time {
    margin: 5px 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
}

.nav-categories {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
}

.category-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.category-name {
  font-size: 0.9rem;
  text-align: center;
}

.network-status {
  margin-top: 15px;
  text-align: center;
}

.offline-indicator {
  background: rgba(255, 0, 0, 0.2);
  color: #ffcccc;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .navigation-container {
    padding: 15px;
    margin-bottom: 15px;
  }
  
  .nav-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-categories {
    justify-content: space-around;
  }
  
  .category-item {
    min-width: 60px;
    padding: 8px 10px;
  }
}
</style>