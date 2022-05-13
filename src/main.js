
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/store'
import router from './router/router'
import QS from 'qs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'
import SlideVerify from '../node_modules/vue-monoplasty-slide-verify'
 
 
 
Vue.config.productionTip = false
Vue.prototype.qs = QS
Vue.use(Vuex)
Vue.use(ElementUI);
Vue.use(SlideVerify)
 
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
