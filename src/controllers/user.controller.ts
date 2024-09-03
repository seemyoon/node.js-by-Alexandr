import {NextFunction, Request, Response} from 'express';

import {users} from "../db/users.db";
import {IUser} from "../models/IUser";

class UserController {


    public async findAll(req: Request, res: Response): Promise<Response<IUser[]>> {
        try {
            return res.status(200).json(users)
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            })
        }

    }

    public async findById(req: Request, res: Response, next: NextFunction): Promise<Response<IUser>> {
        try {
            const {id} = req.params;
            const user = users[+id];

            return res.status(200).json(user)
        } catch (error) {
            next(error)
        }

    }

    public async create(req: Request, res: Response): Promise<Response<IUser>> {
        try {
            const newUser = req.body
            users.push(newUser)
            return res.status(201).json({message: "user was created"})
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            })
        }

    }

    public async updateById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const updateStateUser = req.body;
            users[+id] = updateStateUser
            res.status(200).json({
                message: "user was updated",
                data: updateStateUser[id]
            })
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            })
        }


    }

    public async deleteById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            users.splice(+id, 1);
            res.status(200).json({message: "user was deleted", data: id})
        } catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            })
        }


    }
}

export const userController = new UserController();
