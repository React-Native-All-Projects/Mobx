import { ApisauceInstance, create } from "apisauce"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api.config"

export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
   apisauce: ApisauceInstance
   /**
    * Configurable options.
    */
   | undefined

 /**
  * Configurable options.
  */
 config: ApiConfig

 /**
  * Creates the api.
  *
  * @param config The configuration to use.
  */
 constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
   this.config = config
 }

 async setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: { Accept: "application/json" }
    })

    this.apisauce.axiosInstance.interceptors.request.use(
      async (config) => {
        config.headers = await this.getHeaders(config.headers);
        return config;
      },
      error => {
        Promise.reject(error);
      }
    );

    // Response interceptor for API calls
    this.apisauce.axiosInstance.interceptors.response.use((response) => {
      return response;
    }, async (error) => {
      if (error && error.response && error.response.status === 401) {
        var token = 'My Token'
        if (token) {
          console.log("unauthorized")
        }

      }
      if (error && error.response && error.response.status === 403) {
        // ToDo: refresh AccessToken
      }
      return Promise.reject(error);
    });
  }

  async getHeaders(customHeaders: any = {}) {
    let token = 'My Token';
    var headers: any = {
      Accept: "application/json",
      ...customHeaders,
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    return headers
  };
}