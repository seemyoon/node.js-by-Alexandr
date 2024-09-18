import {Schema, model} from "mongoose";
import {IUser} from "../interfaces/user.interface";
import {RoleEnum} from "../enums/role.enum";

const UserSchema = new Schema(
    {
        name: {type: String, required: true},
        age: {type: Number, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, select: false},
        phone: {type: String, required: false},
        role: {type: String, enum: RoleEnum, default: RoleEnum.USER},
        isVerified: {type: Boolean, default: false},
        isDeleted: {type: Boolean, default: false},
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const User = model<IUser>("user", UserSchema);