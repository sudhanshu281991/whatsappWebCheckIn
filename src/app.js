import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'
import VueResource from 'vue-resource'
var VueScrollTo = require('vue-scrollto')



Vue.mixin(titleMixin)
Vue.use(Vuetify)
Vue.use(VueScrollTo)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(VueResource)


export function createApp () {
  const store = createStore()
  const router = createRouter()
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
