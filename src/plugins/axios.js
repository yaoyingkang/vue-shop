"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  baseURL : 'http://localhost:8088/v1/'  //关键代码
};

const _axios = axios.create(config);

// 修改 axios 实例默认配置
// _axios.defaults.headers.post['Content-Type'] = 'application/json'
// _axios.defaults.headers.put['Content-Type'] = 'application/json'
// _axios.defaults.headers.patch['Content-Type'] = 'application/json'


_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (config.method === 'get') {
      if (config.params === undefined) {
        config.params = {}
      }
      config.params = {
        ...config.params,
        ...(config.params.filter
          ? {
          filter: JSON.stringify(config.params.filter)
          }
          :{})
      }
    }
    return config;
  },
  function(error) {
    // Do something with request error
  
   window.console.error(error)
    return Promise.reject(error);
  },
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if (response.status === 200) {
     // return checkResponseCode(response)
    } else {
      //window.console.log(response)
    }
    return response;
  },
  function(error) {
    // Do something with response error
    //后台服务异常  404 504 请求超时等
    //window.console.err(error, error.response, error.message)
    return Promise.reject(error);
  }
);




Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  window.console.log(options)
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
    },
  });
};

Vue.use(Plugin)

export default Plugin;
