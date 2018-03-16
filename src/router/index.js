import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// route-level code splitting
const MonumentList = () => import('../views/monumentList.vue')



export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: `/home`,name:'MonumentList', component: MonumentList },
      { path: '/', redirect: `/home`},
      { path: '*', redirect: '/' }
    ]
  })
}
