"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    async getListUsers() {
        return await user_model_1.User.find();
    }
    async create(dto) {
        return await user_model_1.User.create({ ...dto });
    }
    async getById(userId) {
        return await user_model_1.User.findById(userId);
    }
    async getByEmail(email) {
        return await user_model_1.User.findOne({ email }).select("+password");
    }
    async updateById(userId, dto) {
        return await user_model_1.User.findByIdAndUpdate(userId, dto, { new: true });
    }
    async deleteById(userId) {
        await user_model_1.User.deleteOne({ _id: userId });
    }
}
exports.userRepository = new UserRepository();
