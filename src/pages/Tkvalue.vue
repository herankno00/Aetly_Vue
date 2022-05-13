<template>
  <div>
    <img
      class="tabii"
      src="../assets/img/a1.png"
      style="width: 100%"
      id="tab1"
    />
    <img
      class="tabii"
      src="../assets/img/a2.png"
      style="opacity: 0; width: 100%"
      id="tab2"
    />
    <img />
    <div
      id="box"
      class="tabii"
      style="background-color: transparent; width: 100%"
    ></div>
    <h1
      id="h1"
      align="center"
      style="position: absolute; width: 100%; opacity: 1; bottom: 10%; top: 80%"
    >
      记录
    </h1>
  </div>
</template>

<script>
export default {
  name: "Tkvalue",
  data() {
    return {};
  },
  created() {},
  mounted() {
    let _this = this;

    var telest = ["c#", "记录", "游戏", "动漫", "音乐"];
    var w = document.documentElement.clientWidth; //获取页面可见高度
    document.getElementById("h1").style.width = w;
    var h = document.documentElement.clientHeight;
    document.getElementById("tab1").style.background =
      "background-size:" + w + "px " + h + "px";
    document.getElementById("tab2").style.background =
      "background-size:" + w + "px " + h + "px";
    //定义变量，用于记录坐标和角度
    var startx, movex, endx, nx;
    var tab2 = 2;
    //
    var imagesnums = 0;
    var left = 0;
    //开始触摸函数，event为触摸对象
    function touchs(event) {
      event.preventDefault(); //阻止浏览器默认滚动事件
      var box = document.getElementById("box"); //获取DOM标签
      var touch;
      if (event.type == "touchstart") {
        //通过if语句判断event.type执行了哪个触摸事件
        console.log("开始");
        touch = event.touches[0]; //获取开始的位置数组的第一个触摸位置
        startx = Math.floor(touch.pageX); //获取第一个坐标的X轴
      } else if (event.type == "touchmove") {
        //触摸中的坐标获取
        // console.log('滑动中');
        touch = event.touches[0];
        movex = Math.floor(touch.pageX);

        var a = movex - startx;
        document.getElementById("tab1").style.left = a + "px";
        document.getElementById("tab1").style.opacity = 1 - Math.abs(a) / w;
        document.getElementById("tab2").style.opacity = Math.abs(a) / w;
        //  console.log(a + "px");
      } else if (event.type == "touchend" || event.type == "touchcancel") {
        //当手指离开屏幕或系统取消触摸事件的时候
        endx = Math.floor(event.changedTouches[0].pageX); //获取最后的坐标位置
        console.log("结束");
        nx = endx - startx; //获取开始位置和离开位置的距离
        if (Math.abs(nx) < 1) {
          switch (document.getElementById("h1").innerText) {
            case "记录":
              _this.setCookie("type", "记录");
              _this.$router.push({ name: "allpage" });

              break;
            case "c#":
              _this.setCookie("type", "c#");

              _this.$router.push({ name: "allpage" });

              break;
            case "游戏":
             _this.setCookie("type", "游戏");
              _this.$router.push({ name: "dmgpage" });

              break;
            case "音乐":
           _this.setCookie("type", "音乐");
              _this.$router.push({ name: "dmgpage" });


              break;
            case "动漫":
             _this.setCookie("type", "动漫");
              _this.$router.push({ name: "dmgpage" });

              break;
            default:
              break;
          }
        }

        if (Math.abs(nx) > w / 2) {
          //../assets/img/a2.png
          document.getElementById("tab1").src = require("../assets/img/a" +
            tab2 +
            ".png");
          if (tab2 == 5) {
            tab2 = 1;
            document.getElementById("tab2").src = require("../assets/img/a" +
              tab2 +
              ".png");
          } else {
            tab2++;
            document.getElementById("tab2").src = require("../assets/img/a" +
              tab2 +
              ".png");
          }
          console.log(tab2);
          document.getElementById("h1").innerText = telest[tab2 - 1];
        }
        document.getElementById("tab2").style.opacity = 0;
        document.getElementById("tab1").style.left = "0px";
        document.getElementById("tab1").style.opacity = 1;
      }
    }
    //添加触摸事件的监听，并直行自定义触摸函数
    document
      .getElementById("box")
      .addEventListener("touchstart", touchs, false);
    document.getElementById("box").addEventListener("touchmove", touchs, false);
    document.getElementById("box").addEventListener("touchend", touchs, false);
  },
  methods: {
    setCookie(name, value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
  },
};
</script>

<style lang="less" scoped>
.tabii {
  position: absolute;
  height: 100%;
}
</style>