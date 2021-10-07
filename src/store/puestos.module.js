/* eslint-disable */
//import axios from "axios";
import ApiService from "@/store/api.service";
// action types
export const OBTENER_PUESTOS = "obtenerPuestos";
// mutation types
export const SET_PUESTOS = "setPuestos";
export const SET_PUESTO = "setPuesto";

const state = {
    puestos: [],
    puesto:[],
}

const getters = {
    obtenerPuestos(state) {
      return state.puestos;
    },
}

const actions = {
    /**
     * Obtener clientes (todos o por estado (activo, incativo, etc))
     * @param {} context 
     * @param {*} estadoId 
     * @returns 
     */
    async [OBTENER_PUESTOS](context) {

        return new Promise(resolve => {
            ApiService.get('/api/Puestos', '')
                .then(({ data }) => {
                    context.commit(SET_PUESTOS, data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    }
  }

const mutations = {
    [SET_PUESTOS](state, data) {
        state.puestos = data;
    },

    [SET_PUESTO](state, data) {
        state.puesto = data;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}