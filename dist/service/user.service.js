"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repository/user.repository");
const user_validator_1 = require("../validators/user.validator");
const customApiError_1 = require("../errors/customApiError");
class UserService {
    async getListUsers() {
        return await user_repository_1.userRepository.getListUsers();
    }
    async create(dto) {
        const { error } = user_validator_1.UserValidators.createUser.validate(dto);
        if (error)
            throw new customApiError_1.ApiError("Invalid fields", 400);
        return await user_repository_1.userRepository.create(dto);
    }
    async getUserById(userId) {
        const user = await user_repository_1.userRepository.getUserById(userId);
        if (!user)
            throw new customApiError_1.ApiError("User not found", 404);
        return user;
    }
    async updateUserById(id, dto) {
        const { error } = user_validator_1.UserValidators.createUser.validate(dto);
        if (error)
            throw new customApiError_1.ApiError("Invalid fields", 400);
        return await user_repository_1.userRepository.updateUserById(id, dto);
    }
    async deleteUserById(userId) {
        return await user_repository_1.userRepository.deleteUserById(userId);
    }
}
exports.userService = new UserService();
