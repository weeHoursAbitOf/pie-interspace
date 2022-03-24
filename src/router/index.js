import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from "../store/index"
import { LOGIN_PAGE_NAME } from "../store/mutations.js"
Vue.use(Router)
const router = new Router({
  routes,
})
router.beforeEach((to, from, next) => {
  // if (to.meta.requireAuth) {
  //   if (store.state.user.token) {
  //     next()
  //   } else {
  //     next({
  //       name: LOGIN_PAGE_NAME
  //     })
  //   }
  // } else {
  //   next()
  // }
  next()
})
export default router
