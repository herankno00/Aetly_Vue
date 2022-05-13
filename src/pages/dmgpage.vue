<template>
  <div
    id="bodyid"
    ref="bodyref"
    style="position: relative; background-size: 100% 100%; text-align: center"
  >
    <div class="divTOP" id="topdivid">
      <br />
      <img
        src="https://i0.hdslb.com/bfs/face/16b58fa9ce81a67cfd548018d629e291a5743e4d.jpg"
        style="
          left: 20px;
          border-style: groove;
          border-width: 10px;
          border-color: transparent;
        "
      />
      <p class="bt">标题</p>
      <span
        ><p
          style="
            font-size: 10px;
            border-style: groove;
            border-width: 10px;
            border-color: transparent;
          "
        >
          {{ ncx(nc) }}
        </p></span
      >
    </div>
    <div class="nrdiv">
      <div class="jumbotron" style="background-color: skyblue">
        <img src="" ref="tx" style="width: 100px" class="img-thumbnail" />
        <h1 style="font-size: 20px">{{ nc }}</h1>
        <p style="font-size: 10px">{{ tkvalue }}</p>
        <p style="font-size: 10px">{{ currentDate }}</p>
        <h6 id="Time" style="text-align: right"></h6>
      </div>
      <transition name>
        <div id="nr" style="">
          <div
            class="col-sm-4 row"
            v-for="(item, index) in nrlist"
            @click="content_ck(item)"
            :key="index"
          >
            <h3 style="word-wrap: break-word;;display: inline">{{ item.h1 }}</h3>
            <p style="word-wrap: break-word; word-break: break-all;display: inline;width:70%">{{ item.p1 }}</p>
            <p style="word-wrap: break-word; word-break: break-all;display: inline;width:70%">{{ item.p2 }}</p>
            <img v-if="vifs" src="../assets/dd/mknull.png" class="imgs" />
            <img v-if="!vifs" :src="'https://localhost:7231/api/qh?path=' + item.isrc" class="imgs" />
          </div>
        </div>
      </transition>
    </div>
    <el-dialog
      title=" "
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <span>{{ this.dialogp1 }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="footer"></div>
    <div
      class="footer"
      style="background-color: transparent; z-index: 99; opacity: 1"
    >
      <p style="display: inline">© 2021 - this -</p>
      <img
        style="width: 20px; display: inline"
        src="http://159.75.72.104:8888/LGI/id"
      />
      <br />
      <a
        href="https://mail.qq.com/"
        style="display: inline; text-decoration: underline"
        >1600211151@qq.com;</a
      >
      <p style="display: inline" ref="tq"></p>
    </div>
  </div>
</template>
 
 <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script >
import * as api from "../api/api";
import { decrypt } from "../utils/decode";

export default {
  // @click="tocvclick"
  name: "dmgpage",
  data() {
    return {
      tk: null,
      page: 1,
      count: 0,
      tkvalue: "_  _",
      nc: "",
      path: "",
      currentDate: new Date().toLocaleString(),
      screenWidth: document.documentElement.clientWidth, //屏幕宽度
      screenHeight: document.documentElement.clientHeight, //屏幕高度
      nrlist: [
        //  {
        //     h1:"123",
        //     p1:"",
        //     p2:"",
        //     isrc:"",
        //   },
      ],
      dialogVisible: false,
      dialogh1: "",
      dialogp1: "",
      vifs: true,
    };
  },
  watch: {
    // screenWidth: function (val) {
    //   //监听屏幕宽度变化
    //   var oIframe = document.getElementById("bodyid");
    //   oIframe.style.width = Number(val) + "px"; //'120'是页面布局调整，可去除
    // },
    // screenHeight: function () {
    //   //监听屏幕高度变化
    //   var oIframe = document.getElementById("bodyid");
    //   oIframe.style.height = Number(val) + "px"; //'120'是页面布局调整，可去除
    // },
  },

  computed: {},
  created() {},
  mounted() {
    api.gettqvalue((params = returnCitySN)).then((res) => {
      this.$refs.tq.innerHTML = "天气：" + res.data;
    });
    ////console.log(document.title);
    //拿昵称
    api.getTokenbilibili().then((res) => {
      ////console.log(res.data);
      this.$refs.tx.src = res.data[0];
      this.nc = res.data[1];

      //this.tkvalue = res.data.tk;
    });
    var ls = this.getCookie("type");

    var params = { index: this.page, type: ls };
    api.getmkvalue(params).then((res) => {
       console.log(res.data);
         
      res.data.forEach((element) => {
        if (ls == "音乐") {
          this.sjgsh(
            element.mk_name,
            element.mk_time,
            element.mk_singer.toString().replace("?", " ")
          );
        } else if (ls == "游戏") {
       console.log(ls)
         this. vifs=false
          this.sjgsh(
            element.gm_name,
            element.gm_text,
            "",
            element.gm_image_path 
          );
        } else {
          this.sjgsh(
            element.mk_name,
            element.mk_time,
            element.mk_singer.toString().replace("?", " ")
          );
        }
      });
    });

    // 时间
    setInterval(() => {
      this.currentDate = new Date().toLocaleString();
    }, 1000);

    setInterval(() => {
      this.tk = null;
    }, 1000);
    var _this = this;
    window.onresize = function () {
      // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth; //窗口宽度
      _this.screenHeight = document.documentElement.clientHeight; //窗口高度
    };

    window.addEventListener("scroll", this.handleScroll, true); // 监听（绑定）滚轮滚动事件
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    handleScroll: function () {
      var clients =
        document.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      var scrollTop = document.documentElement.scrollTop;
      var wholeHeight = document.documentElement.scrollHeight;
      // ////console.log(wholeHeight );
      // ////console.log(clients );
      // ////console.log(scrollTop );
      if (clients + scrollTop >= wholeHeight) {
        this.page += 1;
        //  ////console.log(    this.nrlist.length);

        //  ////console.log(this.page + "a");
        var ls = this.getCookie("type");
        var params = { index: this.page, type: ls };
        api.getmkvalue(params).then((res) => {
          //   //console.log(res.data.length)
          if (res.data.length > 0) {
            res.data.forEach((element) => {
                  if (ls == "音乐") {
          this.sjgsh(
            element.mk_name,
            element.mk_time,
            element.mk_singer.toString().replace("?", " ")
          );
        } else if (ls == "游戏") {
       console.log(ls)
         this. vifs=false
          this.sjgsh(
            element.gm_name,

            element.gm_text,
            "",
            element.gm_image_path 
          );
        } else {
          this.sjgsh(
            element.mk_name,
            element.mk_time,
            element.mk_singer.toString().replace("?", " ")
          );
        }
            });
          } else {
            this.open1("到底了");
          }
        });
      }
      if (scrollTop == 0) {
        //console.log("top");
      }
    },
    handleClose(done) {
      this.dialogp1 = "";
      done();
    },
    open1(str) {
      if (this.tk == null) {
        this.$message({
          showClose: true,
          message: str,
        });
      }
      this.tk = 1;
    },
    content_ck(t) {
      //console.log(t);
        var ls = this.getCookie("type");
      if  (ls=="音乐"){
      this.dialogp1 = "歌名：" + t.h1 + "_歌手：" + t.p2;

      }else if  (ls=="游戏"){
      this.dialogp1 = "游戏名：" + t.h1 + "角色：" + t.p1;

      }else {
      this.dialogp1 = "动漫名：" + t.h1 ;

      }
      this.dialogVisible = true;
    },
    // 不用了
    bgischk() {
      this.$refs.bodyref.className =
        "bodys" + (Math.floor(Math.random() * 5) + 1);
    },
    // 没用
    ncx(n) {
      return n;
    },
    // 没用
    load() {
      this.count += 2;
    },
    // 填充数组
    sjgsh(a, b, c, d) {
      this.nrlist.push({
        h1: a,
        p1: b,
        p2: c,
        isrc: d,
      });
    },
    // 返回
    TKclick() {
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style lang="less" scoped>
.bt {
  display: inline-block;
  position: absolute;
  font-size: 45px;
  background-color: red;
  top: 50px;
  left: 50%;
}
.nrdiv {
  width: 100%;
  height: 70%;
  align-content: center;
}
.div1 {
  position: fixed;
  bottom: 0;
  width: 100%;

  background-color: white;
  opacity: 0.6;
  text-align: center;
}
.footer {
  background-color: skyblue;
  opacity: 0.5;
  width: 100%;
  height: 10%;
  margin: 0 auto;
  overflow: hidden;
  position: fixed;
  bottom: 0;
}
.divTOP {
  width: 100%;
  opacity: 0.6;

  display: none;
  background-color: white;
}

.bodys5 {
  background: url("../assets/bodyimg/5.jpg");
}
.bodys4 {
  background: url("../assets/bodyimg/4.jpg");
}
.bodys3 {
  background: url("../assets/bodyimg/3.jpg");
}
.bodys2 {
  background: url("../assets/bodyimg/2.jpg");
}
.bodys1 {
  background: url("../assets/bodyimg/1.jpg");
}

.All-list {
  display: inline-block;

  width: 220px;
  height: 220px;
  border-style: solid;
  border-width: 10px;
  border-color: transparent;
}
.list-back {
  border-radius: 20px;
  position: absolute;
  background-color: white;
  display: inline-block;
  width: 220px;
  height: 220px;
  opacity: 0.5;
}
.list {
  z-index: 99;
  position: absolute;
  border-style: solid;
  border-width: 10px;
  border-color: transparent;

  width: 200px;
  height: 200px;

  display: inline-block;
}
.list-img {
  height: 100px;
}
.imgs {
  width: 100%;
}
.row {
  width: 100%;
  display: inline-block;
}
</style>