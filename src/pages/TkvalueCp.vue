<template>
  <div 
    class="index"
    style="position: absolute; width: 100%; height: 100%"
    @mousemove="tocvmove"
    @click="toTk"
  >
    <img id="imga" v-show="a" src="../assets/img/off.jpg" />
    <img id="imgb" v-show="b" src="../assets/img/on.jpg" />
    <canvas
      id="Canvas"
      ref="Canvass"
      style="position: absolute; width: 100%; height: 100%"
    ></canvas>

    <canvas
      id="myCanvas"
      ref="Canvass2"
      style="position: absolute; width: 100%; height: 100%"
    ></canvas>
  </div>
</template>
 
    
<script>
import * as api from "../api/api";
import { decrypt } from "../utils/decode";

export default {
  // @click="tocvclick"
  name: "TkvalueCp",
  data() {
    return {
      cavs1: null,
      cavs2: null,
      wth: 0,
      hth: 0,
      a: false,
      b: false,
    };
  },
  computed: {},
  created() {},
  mounted() {
    var img1, img2;
    this.cavs1 = this.$refs.Canvass;
    this.cavs2 = this.$refs.Canvass2;
    img1 = document.getElementById("imga");
    img2 = document.getElementById("imgb");
    this.doDraw(img1, this.cavs1);
    this.doDraw(img2, this.cavs2);
    this.hth = document.documentElement.clientHeight;
    this.wth = document.documentElement.clientWidth;
 
  },
  methods: {
   setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
},
    doDraw(imageUrl, cv2) {
      var canvas = cv2;
      var a = setInterval(() => {
        canvas = cv2;
        if (!canvas) {
          return false;
        } else {
          clearInterval(a);
          var context = canvas.getContext("2d");
          var img = imageUrl;
          img.onload = function () {
            if (img.complete) {
              canvas.setAttribute("width", img.width);
              canvas.setAttribute("height", img.height);
              context.drawImage(img, 0, 0, img.width, img.height);
            }
          };
        }
      }, 1);
    },
    tocvmove(e) {
          this.hth = document.documentElement.clientHeight;
    this.wth = document.documentElement.clientWidth;

      if (this.wth / this.hth > 1.9) {
        var ctx = this.cavs2.getContext("2d");
        var img2 = document.getElementById("imgb");
        // console.log(img2.width);
        // console.log(this.wth);
        ctx.clearRect(0, 0, img2.width, img2.height);
        ctx.drawImage(img2, 0, 0, img2.width, img2.height);
        ctx.clearRect(
          e.x * (img2.width / this.wth) - 60,
          0,
          img2.width / 20,
          img2.height
        );
      } else {
      console.log("false")
      }
    },
    toTk(e) {
       
    var wths = document.documentElement.clientWidth;
      switch (e.x) {
        case e.x<wth/5:
            _this.setCookie("type", "记录");
              _this.$router.push({ name: "allpage" });
          break;
        case e.x<wth/5*2:
             _this.setCookie("type", "c#");
              _this.$router.push({ name: "allpage" });
          break;
        case e.x<wth/5*3:
             _this.setCookie("type", "游戏");
              _this.$router.push({ name: "allpage" });
          break;
        case e.x<wth/5*4:
             _this.setCookie("type", "音乐");
              _this.$router.push({ name: "allpage" });
          break;      
        default:
             _this.setCookie("type", "动漫");
              _this.$router.push({ name: "allpage" });
          break;
      } 
      this.$router.push({name:"Tkvalue"})
    }
  },
};
</script>

<style lang="less" scoped>
</style>