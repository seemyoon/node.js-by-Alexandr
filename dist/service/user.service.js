"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repository/user.repository");
const customApiError_1 = require("../errors/customApiError");
class UserService {
    async getListUsers() {
        return await user_repository_1.userRepository.getListUsers();
    }
    async getById(userId) {
        const user = await user_repository_1.userRepository.getById(userId);
        if (!user)
            throw new customApiError_1.ApiError("User not found", 404);
        return user;
    }
    async getMe(jwtPayload) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.userId);
        if (!user)
            throw new customApiError_1.ApiError("User not found", 404);
        return user;
    }
    async updateMe(jwtPayload, dto) {
        return await user_repository_1.userRepository.updateById(jwtPayload.userId, dto);
    }
    async deleteMe(jwtPayload) {
        return await user_repository_1.userRepository.deleteById(jwtPayload.userId);
    }
}
exports.userService = new UserService();
