import axios from "axios";
import Vue from "vue";
import { setToken, getToken } from '@/libs/util';
import qs from 'qs';
import xss from 'xss';
let config = {
  baseURL: "",
  timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  headers: {
    "Content-Type": "application/json;charset=utf-8;"
  }
};
const _axios = axios.create(config);
// 请求拦截器
_axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
_axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// eslint-disable-next-line no-unused-vars
Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
