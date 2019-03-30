
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./libs/iView";
import config from '@/config'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import vueMoment from 'vue-moment'
import _ from 'lodash';
import  '_c/global'; 
if (process.env.NODE_ENV !== 'production') require('@/mock')
import "babel-polyfill"
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config 
Vue.use(vueMoment) 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
