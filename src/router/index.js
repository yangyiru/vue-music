import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../pages/recommend/index.vue'
import Rank from '../pages/rank/index.vue'
import Singer from '../pages/singer/index.vue'
import Search from '../pages/search/index.vue'
import SingerDetail from '../pages/singer-detail/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
