import {NextFunction, Request, Response} from "express";

import {ApiError} from "../errors/api.error";
import {userService} from "../services/user.service";
import {UserValidators} from "../validators/user.validators";

class UserMiddleware {
    public async findByIdOrThrow(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params
            const user = await userService.findById(id)

            if (!user) {
                throw new ApiError("User not found", 404);
            }
            next()
        } catch (error) {
            next(error)
        }

    }

    public async isValidRegister(req: Request, res: Response, next: NextFunction) {
        try {
            const {error} = UserValidators.createUser.validate(req.body);
            if (error) throw new ApiError(error.message, 404);

            next()
        } catch (error) {
            next(error)
        }

    }

}

export const userMiddleware = new UserMiddleware();