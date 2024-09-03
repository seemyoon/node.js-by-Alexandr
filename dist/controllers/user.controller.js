"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const users_db_1 = require("../db/users.db");
const user_service_1 = require("../services/user.service");
class UserController {
    async findAll(req, res) {
        try {
            const usersFromDB = await user_service_1.userService.findAll();
            return res.status(200).json(usersFromDB);
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            });
        }
    }
    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const user = users_db_1.users[+id];
            return res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res) {
        try {
            const newUser = req.body;
            users_db_1.users.push(newUser);
            return res.status(201).json({ message: "user was created" });
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            });
        }
    }
    async updateById(req, res) {
        try {
            const { id } = req.params;
            const updateStateUser = req.body;
            users_db_1.users[+id] = updateStateUser;
            res.status(200).json({
                message: "user was updated",
                data: updateStateUser[id]
            });
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            });
        }
    }
    async deleteById(req, res) {
        try {
            const { id } = req.params;
            users_db_1.users.splice(+id, 1);
            res.status(200).json({ message: "user was deleted", data: id });
        }
        catch (error) {
            return res.status(400).json({
                message: error.message,
                status: error.status || 500,
            });
        }
    }
}
exports.userController = new UserController();
