import joi from "joi";
import {regexConstant} from "../constants/regex.constants";

export class UserValidator {
    private static email = joi.string()
        .min(5)
        .max(40)
        .required()
        .regex(regexConstant.EMAIL)
    private static password = joi.string()
        .min(5)
        .max(40)
        .required()
        .regex(regexConstant.PASSWORD)
    private static name = joi.string()
        .min(5)
        .max(40)
        .required()
    private static age = joi.number()
        .min(4)
        .max(150)
        .required()
    private static phone = joi.string()
        .min(5)
        .max(40)
        .regex(regexConstant.PHONE)
    static createUser = joi.object({
        email: this.email,
        password: this.password,
        age: this.age,
        phone: this.phone,
        name: this.name,
    })
    static updateUser = joi.object({
        age: this.age,
        phone: this.phone,
        name: this.name,
    })
}

