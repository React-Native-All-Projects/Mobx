import { ApiResponse, create } from "apisauce"
import { responsApi } from "../../models/enum/respons.enum";
import { UsersParams } from "../../models/models/users";
import { Api } from "../config/api";
import { ResultState, GetUsersListResult } from "../config/api.respons";

export class UsersApi {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }

  async postUsers(extraParams?: string,body:UsersParams=new UsersParams()): Promise<ResultState> {
    try {
      // make the api call
      const response: ApiResponse<any> = this.api.apisauce ? await this.api.apisauce.post(
        "TestAPI?" + (extraParams || ''),body
      ) : <any>{}

      if(!response.ok){
        return { type: responsApi.bad }
      }else{
        return { type: responsApi.ok }
      }
    } catch (e: any) {
      console.log(e.message)
      return { type: responsApi.bad }
    }
  }

  async getUsers(extraParams?: string): Promise<GetUsersListResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = this.api.apisauce ? await this.api.apisauce.get(
        "TestAPI?" + (extraParams || '')
      ) : <any>{}

      // the typical ways to die when calling an api
      if (!response.ok) {
        return {type:responsApi.bad,data:[]}
      }

      const users = response.data;
      return {
        type: "ok",
        data:users
      }
    } catch (e: any) {
      console.log(e.message)
      return { type: responsApi.bad ,data:[]}
    }

  }

  async deleteUsers(extraParams?: string,body:any = {}): Promise<ResultState> {
    try {
      // make the api call
      const response: ApiResponse<any> = this.api.apisauce ? await this.api.apisauce.delete(
        `TestAPI?${extraParams}`,{},{data:body}) : <any>{}

      // the typical ways to die when calling an api
      if (!response.ok) {
        return { type: responsApi.bad }
      }else{
        return { type: responsApi.ok }
      }
    } catch (e: any) {
      console.log(e.message)
      return { type: responsApi.bad }
    }
  }
}
