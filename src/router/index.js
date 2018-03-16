import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// route-level code splitting
const dashboard = () => import('../views/dashboard.vue')



export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: `/home`,name:'dashboard', component: dashboard },
      { path: '/', redirect: `/home`},
      { path: '*', redirect: '/' }
    ]
  })
}
