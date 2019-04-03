import Vue from 'vue'
import App from './App.vue'
import FastClick from 'fastclick'
import './styles/normalize.css'
import './libs/responsive'
import './styles/global.css'
import router from './router'
import store from './store'
import './libs/axios'
import './libs/mandMobile'

if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement) {
    targetElement.focus()
  }
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      FastClick.attach(document.body)
    },
    false
  )
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
