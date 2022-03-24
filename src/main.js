import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import iView from 'view-design';
import './assets/iconfont/iconfont.css'
import 'view-design/dist/styles/iview.css';
import './styles/index.less'
import dialog from '@/components/dialog'
import api from './api' // 导入api接口
import utils from './utils/utils.js' // 导入api接口
import plugin from './plugin/index.js' // 导入api接口
// import "lib-flexible/flexible.js";
import './utils/flexible'
import * as echarts from 'echarts';
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;
Vue.prototype.$utils = utils;

Vue.use(plugin)
Vue.use(iView);
Vue.use(dialog);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')