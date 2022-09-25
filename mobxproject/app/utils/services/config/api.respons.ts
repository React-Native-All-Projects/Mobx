import { UserModel } from "../../models/models/users";

export type GetUsersListResult = { type?:string; data: UserModel[] };

export type ResultState = { type?: string };
