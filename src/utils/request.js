import axios from 'axios'
import router from "../router"
import storage from 'store'
import {
  ACCESS_TOKEN_SYSTEM,
  USER_NAME_SYSTEM
} from "../store/mutations.js"
import {
  Message,
  Notice,
  Spin
} from 'view-design';


// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // timeout: 60 * 1000, // Timeout   备注：暂时注释掉，后期调整。
  withCredentials: true, //设置是否允许携带cookie
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    // token过期跳转到登录页
    if (error.response.data.code == 401 || error.response.data.code == 402) {
      storage.remove(ACCESS_TOKEN_SYSTEM)
      storage.remove(USER_NAME_SYSTEM)
      // Message.error(error.response.data.message)
      Notice.error({
        title: error.response.data.message,
        top: 50,
        duration: 5,
      });

      router.push("/login")
    }
  }
  // setTimeout(() => {
  //   Spin.hide();
  // }, 1000)
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN_SYSTEM)
  if (token) {
    config.headers['Authorization'] = token
  }
  // 请求时加载loading
  // Spin.show({
  //   render: (h) => {
  //     return h('div', [
  //       h('Icon', {
  //         'class': 'demo-spin-icon-load',
  //         props: {
  //           type: 'ios-loading',
  //           size: 18
  //         }
  //       }),
  //       h('div', 'Loading')
  //     ])
  //   }
  // });
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  // 请求成功之后删除loading
  // setTimeout(() => {
  //   Spin.hide();
  // }, 1000)
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}