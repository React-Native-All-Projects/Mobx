import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { UserModel, UsersParams } from "../../models/models/users";
import { UsersApi } from "../../services/apis/users";
import { withEnvironment } from "../config/extensions/with-environment";

export const UsersStoreModel = types
  .model("UsersStore")
  .volatile(() =>
  ({
    users: [] as UserModel[],
    loading: false as Boolean
  }))
  .extend(withEnvironment)
  .actions((self) => ({
    saveUsers: (data: UserModel[]) => {
      self.users = data;
    },
    changeLoading: (state: Boolean) => {
      self.loading = state;
    },
  }))
  .actions((self) => ({
    getUsers: async (params?:string) => {
      const api = new UsersApi(self.environment.api);
      self.changeLoading(true);
      const result = await api.getUsers(params)
      self.changeLoading(false);

      if (result.type === "ok") {
        self.saveUsers(result.data ?? []);
      } else {
        console.log(result.type)
      }
    },
    postUsers: async (params?:string,body?:UsersParams) => {
        const api = new UsersApi(self.environment.api);
        const result = await api.postUsers(params,body)
  
        if (result.type === "ok") {

        } else {
          console.log(result.type)
        }
      },
    deleteUser: async (params?:string,body?:UsersParams) => {
        const api = new UsersApi(self.environment.api);
        const result = await api.deleteUsers(params,body)
  
        if (result.type === "ok") {
            
        } else {
          console.log(result.type)
        }
      },
    resetUsers:()=>{
        self.saveUsers([]);
    }
  }))

export interface UsersStore extends Instance<typeof UsersStoreModel> { }
export interface UsersSnapshotOut extends SnapshotOut<typeof UsersStoreModel> { }
export interface UsersSnapshotIn extends SnapshotIn<typeof UsersStoreModel> { }
export const createUsersDefaultModel = () => types.optional(UsersStoreModel, {})
