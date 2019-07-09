import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Playlists from'./views/Playlists.vue'
import Documentation from './views/Documentation.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/playlists',
      name: 'playlists',
      component: Playlists
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: Documentation
    }
  ]
})
