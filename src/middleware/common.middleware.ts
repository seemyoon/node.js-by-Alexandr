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
                req.body = await validator.validateAsync(req.body)
                next()
            } catch (error) {
                next(new ApiError(error.details[0].message, 400))
            }

        }

    }

    public isQueryValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.query = await validator.validateAsync(req.query)
                next()
            } catch (error) {
                next(new ApiError(error.details[0].message, 400))
            }
        }
    }

}

export const commonMiddleware = new CommonMiddleware();
