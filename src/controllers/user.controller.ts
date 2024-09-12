import {NextFunction, Request, Response} from "express";
import {userService} from "../service/user.service";
import {IUser} from "../interfaces/user.interface";

class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getListUsers();
            res.json(result)
        } catch (error) {
            next(error)
        }

    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IUser
            const result = await userService.create(dto)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.userId);
            const result = await userService.getUserById(id)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }

    }

    public async updateUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.userId);
            const dto = req.body as IUser
            const result = await userService.updateUserById(id, dto)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async deleteUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = Number(req.params.userId);
            const result = await userService.deleteUserById(userId)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export const userController = new UserController();