import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "https://localhost:5001";
    
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  async get(resource, params) {
      console.log(resource);
      //console.log(params);
    return Vue.axios.get(resource).catch(error => {
      //console.log(error);
      throw new Error(`[KT] ApiService ${error}`);
    });
  },
  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    console.log(params)
    return Vue.axios.post(`${resource}`,{Data: params}).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });;
  },
  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */

  update(resource, params) {
    console.log(params);
    return Vue.axios.post(`${resource}`, {Data:params}).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });;
  },
  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      // console.log(error);
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }

};

export default ApiService;
