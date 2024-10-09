import joi from "joi";
import {regexConstant} from "../constants/regex.constant";
import {OrderEnum} from "../enums/order.enum";
import {UserListOrderByEnum} from "../enums/user-list-order-by.enum";

export class UserValidator {
    private static email = joi.string()
        .min(4)
        .max(40)
        .required()
        .regex(regexConstant.EMAIL)
    private static password = joi.string()
        .min(5)
        .max(40)
        .required()
        .regex(regexConstant.PASSWORD)
    private static name = joi.string()
        .min(4)
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
    public static signIn = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    })
    public static createUser = joi.object({
        email: this.email,
        password: this.password,
        age: this.age,
        phone: this.phone,
        name: this.name,
    })
    public static changePassword = joi.object({
        oldPassword: this.password.required(),
        password: this.password.required()
    })
    public static update = joi.object({
        age: this.age,
        phone: this.phone,
        name: this.name,
    })
    public static isQuery = joi.object({
        limit: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim().lowercase(),
        order: joi.string().valid(...Object.values(OrderEnum)),
        orderBy: joi.string().valid(...Object.values(UserListOrderByEnum))
    })

}

