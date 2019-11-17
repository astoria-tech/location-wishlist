import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AdminSubmission from './components/AdminSubmission.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/list', name: 'list', component: () => import('./views/List.vue') },
    { path: '/wishlist/:address(.*)', name: 'wishlist', component: () => import('./views/Wishlist.vue') },
    { path: '/adminsubmission', name: 'adminsubmission', component: AdminSubmission }
  ]
})
