import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/locations', name: 'locations', component: () => import('./views/Locations.vue') },
    { path: '/locations/new', name: 'new_location', component: () => import('./views/LocationsNew.vue') },
    { path: '/wishlist/:address(.*)', name: 'wishlist', component: () => import('./views/Wishlist.vue') }
  ]
})
