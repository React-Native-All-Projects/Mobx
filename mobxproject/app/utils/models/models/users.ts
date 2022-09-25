import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const UserModel = types.model("User").volatile(() =>
(
  {
    username: types.string,
    password: types.string
  })
)

export interface UserModel extends Instance<typeof UserModel> { }
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> { }
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> { }
export const createUserDefaultModel = () => types.optional(UserModel, <any>{})


export class UsersParams{
  username:string = '';
  password:string = '';
}
