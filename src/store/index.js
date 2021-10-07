import Vue from 'vue'
import Vuex from 'vuex'
import breadcrumbs from "./breadcrumbs.module";
import empleado from "./empleado.module";
import puestos from "./puestos.module";
import departamentos from "./departamentos.module";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    breadcrumbs,
    empleado,
    puestos,
    departamentos,
  }
})
