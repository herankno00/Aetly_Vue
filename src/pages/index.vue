<template>
  <div >
  </div>
</template>
 
    
<script>
import * as api from "../api/api";
import { decrypt } from "../utils/decode";

export default {
  // @click="tocvclick"
  name: "index",
  data() {
    return { 
    };
  },
  computed: {},
  created() {},
  mounted() {
   
 if (this._isMobile()) {
       this.$router.push({name:"Tkvalue"})
    } else {
       this.$router.push({name:"TkvalueCp"})
    }
  },
  methods: {
    
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    }
   
  },
};
</script>

<style lang="less" scoped>
</style>