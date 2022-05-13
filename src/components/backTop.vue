<template>
  <div class="backTop">
      <!-- 置顶图标 -->
        <div class="Stick" v-show="Stick" @click="toTop">
          <span>
            <i class="el-icon-upload2" style="font-size: 20px"></i>
          </span>
        </div>
  </div>
</template>

<script>
export default {
  name: 'backTop',
  data() {
    return {
        Stick: false
    }
  },
  computed: {
  },
  // 滚动监听事件
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  // 销毁滚动监听事件
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created() {
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // var offsetTop = document.querySelector('#searchBar').offsetTop
      // 显示置顶按钮
      if (scrollTop > 800) {
        this.Stick = true
      } else {
        this.Stick = false
      }
    //   console.log(scrollTop)
    },

    // 置顶
    toTop() {
      window.scrollTo(0, 0)
      // this.active = 0
    }
  }
}
</script>

<style scoped lang="less">
.backTop {
    .Stick {
    position: fixed;
    bottom: 5%;
    right: 2%;
    padding: 10px;
    color: #fff;
    border-radius: 8px;
    background: #0066ff;
    opacity: 0.6;
  }
}
</style>

