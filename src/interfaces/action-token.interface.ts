import {ActionTokenTypeEnum} from "../enums/actionTokenType.enum";

export interface IActionToken {
    _id: string;
    token: string;
    type: ActionTokenTypeEnum;
    _userId: string
}