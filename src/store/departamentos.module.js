/* eslint-disable */
//import axios from "axios";
import ApiService from "@/store/api.service";
// action types
export const OBTENER_DEPARTAMENTOS = "obtenerDepartamentos";
// mutation types
export const SET_DEPARTAMENTOS = "setDepartamentos";
export const SET_DEPARTAMENTO = "setDepartamento";

const state = {
    departamentos: [],
    departamento:[],
}

const getters = {
    obtenerDepartamentos(state) {
      return state.departamentos;
    },
}

const actions = {
    /**
     * @param {} context 
     * @param {*} estadoId 
     * @returns 
     */
    async [OBTENER_DEPARTAMENTOS](context) {

        return new Promise(resolve => {
            ApiService.get('/api/Departamentos', '')
                .then(({ data }) => {
                    console.log(data);
                    context.commit(SET_DEPARTAMENTOS, data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                });
        });       
    }
  }

const mutations = {
    [SET_DEPARTAMENTOS](state, data) {
        state.departamentos = data;
    },

    [SET_DEPARTAMENTO](state, data) {
        state.departamento = data;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}