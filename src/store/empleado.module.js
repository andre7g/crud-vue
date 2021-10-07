/* eslint-disable */
//import axios from "axios";
import ApiService from "@/store/api.service";
// action types
export const OBTENER_EMPLEADOS = "obtenerEmpleados";
export const OBTENER_EMPLEADO = "obtenerEmpleado";
export const REGISTRAR_EMPLEADO = "registrarEmpleado";
export const ACTUALIZAR_EMPLEADO = "actualizarEmpleado";
// mutation types
export const SET_EMPLEADOS = "setEmpleados";
export const SET_EMPLEADO = "setEmpleado";

const state = {
    empleados: [],
    empleado:[],
}

const getters = {
    obtenerEmpleados(state) {
      return state.empleados;
    },
}

const actions = {
    /**
     * Obtener clientes (todos o por estado (activo, incativo, etc))
     * @param {} context 
     * @param {*} estadoId 
     * @returns 
     */
    async [OBTENER_EMPLEADOS](context) {

        return new Promise(resolve => {
            //console.log(endpoint);
            ApiService.get('/api/Empleados', '')
                .then(({ data }) => {
                    console.log(data);
                    context.commit(SET_EMPLEADOS, data);
                    //console.log(data)
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)

                    //context.commit(SET_ERROR, response.data.errors);
                });
        });       
    },

    

    async [OBTENER_EMPLEADO](context, id){
        
        return new Promise(resolve => {
            ApiService.get(`/api/Empleados/${id}`)
                .then(({ data }) => {
                    context.commit(SET_EMPLEADO, data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    


    },
    async [REGISTRAR_EMPLEADO](context, datos){
        return new Promise(resolve => {
            ApiService.post('/api/Empleados', datos)
                .then(({ data }) => {
                    context.commit(SET_EMPLEADO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });   
    },
    async [ACTUALIZAR_EMPLEADO](context, datos){
        let id = datos.id;
        
        return new Promise(resolve => {
            ApiService.update(`apiconsume/update/${id}?endpoint=api/Indicadores/UpdateIndicador/`, datos)
                .then(({ data }) => {
                    context.commit(SET_EMPLEADO, data.data);
                    resolve(data)
                })
                .catch((error) => {
                    console.log(error)
                    //context.commit(SET_ERROR, response.data.errors);
                });
        });    
    }
  }

const mutations = {
    [SET_EMPLEADOS](state, data) {
        state.empleados = data;
    },

    [SET_EMPLEADO](state, data) {
        state.empleado = data;
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}