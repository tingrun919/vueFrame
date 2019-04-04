import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import store from './store'
// import './libs/iView'
import config from '@/config'
import 'iview/dist/styles/iview.css'
import './index.less'
import vueMoment from 'vue-moment'
import '_c/global'
if (process.env.NODE_ENV !== 'production') require('@/mock')
import iView from 'iview'

Vue.use(iView)
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
}).$mount('#app')
