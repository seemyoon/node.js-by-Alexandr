import {NextFunction, Request, Response} from 'express';

import {IUser} from "../models/IUser";
import {userService} from "../services/user.service";

class UserController {

    public async findAll(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[]>> {
        try {
            const users = await userService.findAll()
            return res.status(200).json(users)
        } catch (error) {
            next(error)
        }

    }

    public async findById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const {id} = req.params;
            const user = await userService.findById(id);

            return res.status(200).json(user);
        } catch (error) {
            next(error)
        }

    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const newUser = await userService.createUser(req.body)
            return res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }

    }

    public async updateById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const updateUser = await userService.updateUser(req.params.id, req.body)
            return res.status(200).json(updateUser)
        } catch (error) {
            next(error)
        }


    }

    public async deleteById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const deleteUser = await userService.deleteUser(req.params.id)
            return res.status(200).json(deleteUser)
        } catch (error) {
            next(error)
        }


    }
}

export const userController = new UserController();
