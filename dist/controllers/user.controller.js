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
    async create(req, res, next) {
        try {
            const dto = req.body;
            const result = await user_service_1.userService.create(dto);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const id = String(req.params.userId);
            const result = await user_service_1.userService.getUserById(id);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserById(req, res, next) {
        try {
            const id = String(req.params.userId);
            const dto = req.body;
            const result = await user_service_1.userService.updateUserById(id, dto);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteUserById(req, res, next) {
        try {
            const userId = String(req.params.userId);
            const result = await user_service_1.userService.deleteUserById(userId);
            res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userController = new UserController();
