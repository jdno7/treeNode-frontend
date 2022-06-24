import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class treeNodeApi {
    // set up a clean way to make our requests by using this.request in our API calls
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
        const url = `${BASE_URL}/${endpoint}`
        try {
          return (await axios({ url, method, data})).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }
    
    // API Routes
    static async getTree (){
        const res = await this.request('tree')
        return res
    }

    static async createNewFactory (data) {
      const res = await this.request('tree', data, "post")
      console.log(res)
      return (res)
    }
    static async removeFactory (id) {
      const res = await this.request(`tree/${id}`, undefined, "delete")
      console.log(res)
    }
}

export default treeNodeApi