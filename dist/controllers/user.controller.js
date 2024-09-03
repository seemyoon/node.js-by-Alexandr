"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async findAll(req, res, next) {
        try {
            const users = await user_service_1.userService.findAll();
            return res.status(200).json(users);
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await user_service_1.userService.findById(id);
            return res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const newUser = await user_service_1.userService.createUser(req.body);
            return res.status(201).json(newUser);
        }
        catch (error) {
            next(error);
        }
    }
    async updateById(req, res, next) {
        try {
            const updateUser = await user_service_1.userService.updateUser(req.params.id, req.body);
            return res.status(200).json(updateUser);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteById(req, res, next) {
        try {
            const deleteUser = await user_service_1.userService.deleteUser(req.params.id);
            return res.status(200).json(deleteUser);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userController = new UserController();
