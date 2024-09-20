"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../service/user.service");
class UserController {
    async getList(req, res, next) {
        try {
            const result = await user_service_1.userService.getListUsers();
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = req.params.userId;
            const result = await user_service_1.userService.getById(id);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            console.log(jwtPayload);
            const result = await user_service_1.userService.getMe(jwtPayload);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const dto = req.body;
            const result = await user_service_1.userService.updateMe(jwtPayload, dto);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const result = await user_service_1.userService.deleteMe(jwtPayload);
            res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userController = new UserController();
