import Vue from 'vue'
import Router from 'vue-router'
import Seller from '../components/tab/seller'
import Goods from '../components/tab/goods'
import Ratings from '../components/tab/ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ],
  linkActiveClass: 'active'
})
