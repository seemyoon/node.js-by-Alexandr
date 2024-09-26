import {Schema, model} from "mongoose";
import {IActionToken} from "../interfaces/action-token.interface";
import {ActionTokenTypeEnum} from "../enums/actionTokenType.enum";
import {User} from "./user.model";

const actionTokenSchema = new Schema(
    {
        token: {type: String, required: true},
        type: {type: String, required: true, enum: ActionTokenTypeEnum},
        _userId: {type: Schema.Types.ObjectId, required: true, ref: User},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const ActionToken = model<IActionToken>("actionToken", actionTokenSchema)