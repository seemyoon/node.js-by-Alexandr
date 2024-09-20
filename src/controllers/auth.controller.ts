import {NextFunction, Request, Response} from "express";
import {ISignIn, IUser} from "../interfaces/user.interface";
import {authService} from "../service/auth.service";
import {ITokenPayload} from "../interfaces/token.interface";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IUser
            const data = await authService.signUp(dto)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as ISignIn
            const data = await authService.signIn(dto)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }

    }

    public async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.res.locals.refreshToken as string
            const jwTPayload = req.res.locals.jwtPayload as ITokenPayload

            const result = await authService.refresh(refreshToken, jwTPayload)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }

    }

}

export const authController = new AuthController();