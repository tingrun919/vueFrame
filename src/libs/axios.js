import axios from 'axios'
import Vue from 'vue'
import { setToken, getToken } from '@/libs/util'
import qs from 'qs'
import router from '@/router'
import { Message } from 'iview'
import xss from 'xss'
// import { Spin } from 'iview'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '无权访问',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '未找到该请求。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
const options = {
  whiteList: {
    a: ['href', 'title', 'target']
  },
  css: false
}

class HttpRequest {
  constructor (baseUrl = null) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
    if (!config.headers.Authorization) {
      const accessToken = getToken()
      if (accessToken) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers['Authorization'] = accessToken
        // config.headers['Authorization'] = 'Bearer ' + accessToken;
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  codeMessageGet (code) {
    if (![200, 304, 201].includes(code)) {
      if (code === 401) { // 匿名用户无权访问，跳转到登录页
        router.replace({
          path: '/401'
        })
      } else {
        Message.error(codeMessage[code])
        return Promise.reject(new Error())
      }
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      // if(!res){
      //   Message.error('系统异常，请稍后再试');
      //   return Promise.reject('系统异常，请稍后再试');
      // }
      const { data, status } = res
      this.codeMessageGet(status)
      const { data: dataResult, code, result } = data
      this.codeMessageGet(code)
      if (result == null || result.retCode !== 0) {
        if (result.retCode === 1001) {
          setToken('')
          router.replace({
            name: 'login'
          })
        } else {
          Message.error(result == null ? '系统异常，请稍后再试' : result.retMsg)
        }
        return Promise.reject(new Error())
      }
      return dataResult
    }, error => {
      this.destroy(url)
      if (error.response) {
        const { status } = error.response
        if (status === 401) { // 匿名用户无权访问，跳转到登录页
          router.replace({
            path: '/401'
          })
        } else {
          Message.error(codeMessage[status])
        }
        return Promise.reject(new Error())
      }
      Message.error('系统异常，请稍后再试!')
      return Promise.reject(new Error())
    })
  }

  xssFilter (params) {
    if (params != null && typeof params === 'object') {
      // 数组
      if (params instanceof Array) {
        params.forEach(y => {
          y = this.xssFilter(y)
        })
      } else { // 对象
        Object.keys(params).forEach(x => {
          if (typeof params[x] === 'string') {
            params[x] = xss(params[x], options)
          } else if (params[x] instanceof Array) {
            params[x].forEach(y => {
              y = this.xssFilter(y)
            })
          } else if (params[x] instanceof Date) {
            params[x] = Vue.moment(params[x]).format('YYYY-MM-DD')
          } else if (params[x] instanceof Object) {
            params[x] = this.xssFilter(params[x])
          } else {
            // 通过
          }
        })
      }
    } else if (typeof params === 'string') {
      // params = xss(params, options)
    }
    return params
  }

  request (options) {
    const instance = axios.create()
    options.method = options.method || 'get'
    options.method = options.method.toUpperCase()
    let method = options.method
    options.data = this.xssFilter(options.data || options.params)
    if (options.params) {
      delete options.params
    }
    let config = this.getInsideConfig()

    switch (method) {
      case 'GET':
        break
      case 'POST':
        config.headers['Content-Type'] = 'application/json'
        break
      case 'COMPLEX_POST':
        options.params = qs.stringify(options.params)
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
        options.method = 'POST'
        break
      case 'FILE_POST':
        config.headers['Content-Type'] = 'multipart/form-data'
        options.method = 'POST'
        break
      case 'PUT':
        config.headers['Content-Type'] = 'application/json'
        break
      case 'COMPLEX_PUT':
        options.params = qs.stringify(options.params)
        options.method = 'PUT'
        break
      case 'DELETE':
        config.headers['Content-Type'] = 'application/json'
        break
      case 'COMPLEX_DELETE':
        break
      default:
        options.method = 'GET'
        break
    }
    options = { ...config, ...options }
    options.baseURL = ''
    if (options.url === '/login/admin' || options.url === '/login/session' || options.url.indexOf('/admin') === 0) {
      options.url = '/lgn' + options.url
    } else if (options.url.indexOf('/configure') === 0) {
      options.url = '/pub' + options.url
    } else {
      options.url = '/api' + options.url
    }

    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
