import Vue from 'vue'
import Vuex from 'vuex'

import citas from '@/store/modules/citas.store';
import servicios from '@/store/modules/servicios.store';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    citas,
    servicios
  }
})
