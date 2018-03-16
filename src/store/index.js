
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      masterData: {},
      monumentListData: {},
      monumentDetailsData : {}
    },
    mutations,
    getters,
    actions
  })
}
