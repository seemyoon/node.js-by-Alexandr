import Joi from "joi";

export class UserValidators {
    private static email = Joi.string()
        .min(2)
        .max(30)
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    public static userName = Joi.string()
        .min(2)
        .max(30)
    private static password = Joi.string()
        .min(6)
        .max(30)
        .regex(/^[a-zA-Z0-9_@$!%*?&#]+$/)
    static createUser = Joi.object(
        {
            email: this.email.required(),
            name: this.userName.required(),
            password: this.password.required()
        }
    )
}