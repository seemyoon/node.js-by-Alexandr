import {Request, Response, NextFunction} from 'express';
import {UploadedFile} from "express-fileupload";
import {ApiError} from "../errors/customApiError";

class FileMiddleware {
    public isFileValid(key: string, config: {
        avatarSize: number,
        avatarTypes: string[]
    }) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const file = req.files?.[key] as UploadedFile;

                if (!file) throw new ApiError("file hasn't found", 400)
                if (file.size > config.avatarSize) throw new ApiError("file too big", 409)
                if (!config.avatarTypes.includes(file.mimetype)) throw new ApiError("invalid file type", 400)
                next()
            } catch (error) {
                next(error)
            }

        }
    }
}


export const fileMiddleware = new FileMiddleware()
