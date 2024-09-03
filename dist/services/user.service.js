"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const User_model_1 = require("../models/User.model");
class UserService {
    async findAll() {
        return User_model_1.User.find();
    }
}
exports.userService = new UserService();
