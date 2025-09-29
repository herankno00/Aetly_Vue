# Aetly Vue 个人网站

一个基于 Vue.js 2.x 构建的个人内容分享网站，支持多种内容分类（记录、技术、游戏、动漫、音乐）的展示和管理。

## ✨ 特性

- 🎨 现代化响应式设计
- 📱 移动端和桌面端适配
- 🌐 离线模式支持
- 🔄 智能错误处理
- 🎯 分类内容管理
- ⚡ 优化的用户体验

## 🚀 快速开始

### 环境要求

- Node.js >= 12.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install --legacy-peer-deps
```

### 开发模式

```bash
npm run serve
```

访问 `http://localhost:8080` 查看网站

### 生产构建

```bash
npm run build
```

构建文件将输出到 `dist/` 目录

## 📁 项目结构

```
src/
├── api/               # API 接口定义
│   ├── api.js        # 主要 API 方法
│   ├── network.js    # 网络请求配置
│   └── common.js     # 通用 API 工具
├── assets/           # 静态资源
│   ├── img/         # 图片资源
│   └── bodyimg/     # 背景图片
├── components/       # 可复用组件
│   ├── Navigation.vue    # 导航组件
│   └── ContentGrid.vue   # 内容展示组件
├── pages/            # 页面组件
│   ├── index.vue        # 首页（设备检测）
│   ├── Tkvalue.vue      # 移动端分类选择
│   ├── TkvalueCp.vue    # 桌面端分类选择
│   ├── allpage.vue      # 通用内容页面
│   ├── dmgpage.vue      # 专项内容页面
│   └── Error.vue        # 错误页面
├── router/           # 路由配置
├── store/            # Vuex 状态管理
├── utils/            # 工具函数
│   ├── errorHandler.js  # 错误处理工具
│   └── decode.js        # 解码工具
└── App.vue           # 根组件
```

## 🎨 页面说明

### 首页 (index.vue)
- 自动检测设备类型（移动端/桌面端）
- 显示加载动画
- 自动跳转到相应的导航页面

### 移动端导航 (Tkvalue.vue)
- 卡片式分类选择界面
- 触摸友好的交互设计
- 支持分类：记录、C#、游戏、动漫、音乐

### 桌面端导航 (TkvalueCp.vue)
- 现代化的桌面端界面
- 鼠标悬停效果
- 粒子动画背景

### 内容页面
- **allpage.vue**: 通用内容展示（记录、C# 技术文章）
- **dmgpage.vue**: 专项内容展示（游戏、动漫、音乐）

## 🔧 技术栈

- **前端框架**: Vue.js 2.6.11
- **路由管理**: Vue Router 3.2.0
- **状态管理**: Vuex 3.4.0
- **UI组件**: Element UI 2.15.6
- **网络请求**: Axios 0.24.0
- **样式预处理**: Less 3.7.1
- **加密解密**: CryptoJS 4.1.1

## 🌐 API 集成

网站支持以下 API 接口：

- 用户信息获取
- 内容数据拉取
- 天气信息显示
- IP 地理位置

### 离线模式

当网络不可用时，网站会自动切换到离线模式：
- 显示默认内容
- 提供基础功能
- 友好的离线提示

## 🎯 功能特性

### 错误处理
- 网络请求失败自动重试
- 友好的错误提示信息
- 自动降级到离线模式

### 响应式设计
- 移动端优先的设计理念
- 适配各种屏幕尺寸
- 触摸和鼠标交互优化

### 性能优化
- 懒加载图片
- 组件按需加载
- 优化的动画效果

## 🚀 部署

### 使用 Nginx

1. 构建项目：
```bash
npm run build
```

2. 将 `dist/` 目录内容部署到 Nginx：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 使用 Apache

在 `dist/` 目录创建 `.htaccess` 文件：
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## 🔍 故障排除

### 依赖安装问题
如果遇到依赖安装问题，尝试：
```bash
npm install --legacy-peer-deps --force
```

### 构建问题
清除缓存后重新构建：
```bash
npm run clean  # 如果有的话
rm -rf node_modules
npm install --legacy-peer-deps
npm run build
```

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

---

⭐ 如果这个项目对你有帮助，请给它一个星标！
