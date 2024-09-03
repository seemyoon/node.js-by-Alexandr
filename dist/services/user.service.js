"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const User_model_1 = require("../models/User.model");
class UserService {
    async findAll() {
        return User_model_1.User.find();
    }
    async findById(id) {
        return User_model_1.User.findById(id);
    }
    async createUser(data) {
        return User_model_1.User.create({ ...data });
    }
    async updateUser(id, data) {
        return User_model_1.User.findByIdAndUpdate({ _id: id }, { ...data }, { returnDocument: "after" });
    }
    async deleteUser(id) {
        return User_model_1.User.findByIdAndDelete({ _id: id }, { returnDocument: "after" });
    }
}
exports.userService = new UserService();
