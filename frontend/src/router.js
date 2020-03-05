import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/list', name: 'list', component: () => import('./views/List.vue') },
    { path: '/wishlist/:locationId(.*)', name: 'wishlist', component: () => import('./views/Wishlist.vue') },
    { path: '/obscurepath', name: 'submissionadmin', component: () => import('./components/SubmissionAdmin') },
    { path: '/new-location', name: 'new-location', component: () => import('./views/NewLocation.vue') }
  ]
})
