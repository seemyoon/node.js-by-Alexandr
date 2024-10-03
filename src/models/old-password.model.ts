import {model, Schema} from "mongoose";
import {User} from "./user.model";
import {IOldPassword} from "../interfaces/old-password.interface";

const oldPasswordModelSchema = new Schema({
        password: {type: String, required: true},
        _userId: {type: Schema.Types.ObjectId, required: true, ref: User},
    },
    {
        timestamps: true,
        versionKey: false
    })
export const OldPassword = model<IOldPassword>("old-passwords", oldPasswordModelSchema)