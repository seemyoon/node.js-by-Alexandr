import {Request, Response, NextFunction} from 'express';
import {ApiError} from "../errors/customApiError";
import {isObjectIdOrHexString} from "mongoose";
import {ObjectSchema} from "joi";

class CommonMiddleware {
    public isValid(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if (!isObjectIdOrHexString(req.params[key])) {
                    throw new ApiError("Invalid ID", 400)
                }
                next()
            } catch (error) {
                next(error)
            }

        }
    }

    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const {error} = await validator.validateAsync(req.body)
                if (error) throw new ApiError(error.message, 400)
                next()
            } catch (error) {
                next(error)
            }

        }

    }

}

export const commonMiddleware = new CommonMiddleware();
