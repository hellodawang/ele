// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods'
import comment from './components/comment/comment'
import seller from './components/seller/seller'

Vue.use(VueRouter)
Vue.config.productionTip = false

// 配置路由
const routes = [
  {path: '/goods', component: goods},
  {path: '/comment', component: comment},
  {path: '/seller', component: seller}
]
// 创建router实例
const router = new VueRouter({
  routes: routes,
  linkActiveClass: 'active'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
// 设置默认显示的
router.push('/goods')
