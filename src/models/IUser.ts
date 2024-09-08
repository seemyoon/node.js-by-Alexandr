import {Sex} from "./User.model";

export interface IUser {
    name: string;
    age?: number;
    email: string;
    password: string;
    sex?: Sex;
}
