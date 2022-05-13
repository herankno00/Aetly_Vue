<template>
  <div id="app">
    <keep-alive>
      <router-view class="Router" v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
      </router-view>
    </keep-alive>

    <router-view class="Router" v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
html, body, #app {
  background: #F0F7FF;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
input {
  border: none;
  outline: none;
}
a {
  text-decoration: none;
  color: inherit;
}
.Router {
  background: #fff;
}
</style>
