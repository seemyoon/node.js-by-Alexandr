import {NextFunction, Request, Response} from "express";
import {userService} from "../service/user.service";
import {IUser} from "../interfaces/user.interface";
import {ITokenPayload} from "../interfaces/token.interface";


class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getListUsers();
            res.json(result)
        } catch (error) {
            next(error)
        }

    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.userId;
            const result = await userService.getById(id)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }

    }
    public async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            console.log(jwtPayload)
            const result = await userService.getMe(jwtPayload)
            res.json(result)
        } catch (error) {
            next(error)
        }

    }
    public async updateMe(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const dto = req.body as IUser
            const result = await userService.updateMe(jwtPayload, dto)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async deleteMe(req: Request, res: Response, next: NextFunction) {
        try {
            const jwtPayload =req.res.locals.jwtPayload as ITokenPayload;
            const result = await userService.deleteMe(jwtPayload)
            res.status(204).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController();