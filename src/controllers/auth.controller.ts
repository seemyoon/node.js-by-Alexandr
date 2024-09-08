import {NextFunction, Request, Response} from "express";

import {IJwt} from "../models/IJwt";
import {authService} from "../services/auth.service";

interface IMessage {
    message: string;
}


class AuthController {
    public async login(req: Request, res: Response, next: NextFunction): Promise<Response<IJwt>> {
        try {
            const tokenPair = await authService.login(req.body)
            return res.status(201).json({...tokenPair})
        } catch (error) {
            next(error)
        }

    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<Response<IMessage>> {
        try {
            await authService.register(req.body)
            return res.status(201).json({message: "User was registered"})
        } catch (error) {
            next(error)
        }

    }

}

export const authController = new AuthController();