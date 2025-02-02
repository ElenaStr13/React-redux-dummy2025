import {IUser} from "./IUser.ts";

export type IUsersResponseModel = {
    users:IUser[]
    total: number;
    skip: number;
    limit: number;
}