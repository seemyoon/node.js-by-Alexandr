import {model, Schema} from 'mongoose';

export enum Sex {
    Male = 'Male',
    Female = 'Female'
}

const userSchema = new Schema(
    {
        name:
            {
                type: String
            },
        age:
            {
                type: Number,
                min: 0,
                max: 150
            },
        email:
            {
                type: String,
                required: [true, "Email is required"],
                trim: true,
                lowercase: true,
                unique: true
            },
        password:
            {
                type: String,
                required: [true, "Password is required"],
            },
        sex:
            {
                type: String,
                enum: Sex
            }

    }, {
        timestamps: true,
        versionKey: false
    }
)

export const User = model("User", userSchema);