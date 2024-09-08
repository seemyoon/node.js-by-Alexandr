import Joi from "joi";

export class UserValidators {
    private static email = Joi.string()
        .min(6)
        .max(100)
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .required();

    private static password = Joi.string()
        .min(5)
        .max(40)
        .regex(/^[a-zA-Z0-9_@$!%*?&#]+$/)
        .required();

    static createUser = Joi.object({
        email: this.email,
        password: this.password
    });
}
