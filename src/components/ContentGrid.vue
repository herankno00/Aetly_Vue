<template>
  <div class="content-grid">
    <div class="grid-container">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="content-item"
        @click="onItemClick(item)"
      >
        <div class="item-header">
          <h3 class="item-title">{{ item.h1 || item.title || '无标题' }}</h3>
          <span class="item-time">{{ formatTime(item.p2 || item.time) }}</span>
        </div>
        
        <div class="item-content">
          <p class="item-description">
            {{ truncateText(item.p1 || item.content_txt || '暂无描述', 100) }}
          </p>
          
          <div class="item-image" v-if="item.isrc || item.image_path">
            <img 
              :src="getImageUrl(item.isrc || item.image_path)"
              :alt="item.h1 || item.title"
              @error="handleImageError"
              loading="lazy"
            />
          </div>
        </div>
        
        <div class="item-footer">
          <div class="item-category">
            {{ getCategoryIcon(currentCategory) }} {{ currentCategory || '未分类' }}
          </div>
          <div class="item-actions">
            <button class="action-btn" @click.stop="onItemAction(item, 'like')">
              👍
            </button>
            <button class="action-btn" @click.stop="onItemAction(item, 'share')">
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 加载更多提示 -->
    <div class="load-more" v-if="showLoadMore">
      <div class="loading-spinner" v-if="loading"></div>
      <span v-else>滑动加载更多</span>
    </div>
    
    <!-- 空状态 -->
    <div class="empty-state" v-if="items.length === 0 && !loading">
      <div class="empty-icon">📭</div>
      <h3>暂无内容</h3>
      <p>{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentGrid',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    currentCategory: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    showLoadMore: {
      type: Boolean,
      default: false
    },
    emptyMessage: {
      type: String,
      default: '当前分类暂无内容'
    }
  },
  methods: {
    onItemClick(item) {
      this.$emit('item-click', item);
    },
    
    onItemAction(item, action) {
      this.$emit('item-action', { item, action });
    },
    
    truncateText(text, maxLength) {
      if (!text) return '';
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },
    
    formatTime(timeStr) {
      if (!timeStr) return '';
      
      try {
        const date = new Date(timeStr);
        if (isNaN(date.getTime())) {
          return timeStr;
        }
        
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          if (hours === 0) {
            const minutes = Math.floor(diff / (1000 * 60));
            return minutes < 1 ? '刚刚' : `${minutes}分钟前`;
          }
          return `${hours}小时前`;
        } else if (days < 7) {
          return `${days}天前`;
        } else {
          return date.toLocaleDateString();
        }
      } catch {
        return timeStr;
      }
    },
    
    getImageUrl(imagePath) {
      if (!imagePath) return '';
      
      // If it's already a full URL, return as is
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      
      // Try to construct the image URL
      if (imagePath) {
        return `http://159.75.72.104:5000/api/qh?path=${imagePath}`;
      }
      
      return '';
    },
    
    getCategoryIcon(category) {
      const icons = {
        '记录': '📝',
        'c#': '💻',
        'C#': '💻',
        '游戏': '🎮',
        '动漫': '🎬',
        '音乐': '🎵'
      };
      return icons[category] || '📄';
    },
    
    handleImageError(event) {
      // Hide the image if it fails to load
      event.target.style.display = 'none';
    }
  }
};
</script>

<style lang="less" scoped>
.content-grid {
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
}

.content-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.item-header {
  padding: 20px 20px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.item-title {
  margin: 0 0 8px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  word-wrap: break-word;
}

.item-time {
  font-size: 0.85rem;
  color: #666;
}

.item-content {
  padding: 15px 20px;
}

.item-description {
  margin: 0 0 15px;
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
  word-wrap: break-word;
}

.item-image {
  text-align: center;
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.item-footer {
  padding: 15px 20px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafafa;
}

.item-category {
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 5px;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #e0e0e0;
  }
}

.load-more {
  text-align: center;
  padding: 30px;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #f0f0f0;
  border-top: 3px solid #666;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  
  .empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    opacity: 0.5;
  }
  
  h3 {
    margin: 0 0 10px;
    font-size: 1.5rem;
    color: #333;
  }
  
  p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.8;
  }
}

// 响应式优化
@media (max-width: 480px) {
  .content-grid {
    padding: 10px;
  }
  
  .item-header, .item-content, .item-footer {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .item-title {
    font-size: 1.1rem;
  }
  
  .item-description {
    font-size: 0.9rem;
  }
}
</style>